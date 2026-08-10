import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { PoliticalEntity, PolygonGeometry, TerritoryVersion } from "@geograph/domain";
import { MemoryWorldRepository } from "./memory.js";
import type {
  EntityPointContext,
  PersonDetails,
  WorldData,
  WorldRepository,
} from "./world-repository.js";

const RAW_ROOT = "https://raw.githubusercontent.com/aourednik/historical-basemaps/master";
const SOURCE = {
  title: "Historical boundaries of world countries and cultural regions",
  institution: "André Ourednik and contributors",
  url: "https://github.com/aourednik/historical-basemaps",
  license: "GPL-3.0",
};

export interface HistoricalSnapshot {
  year: number;
  filename: string;
}

interface GeoJsonCollection {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties?: { NAME?: string | null; BORDERPRECISION?: number | null } | null;
    geometry?: PolygonGeometry | null;
  }>;
}

type SnapshotLoader = (snapshot: HistoricalSnapshot) => Promise<GeoJsonCollection>;

function entitySlug(name: string) {
  const readable = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  const suffix = createHash("sha1").update(name).digest("hex").slice(0, 8);
  return `${readable || "entity"}-${suffix}`;
}

function colorFor(name: string) {
  const normalized = name.trim().toLowerCase();
  const colorIdentity = normalized === "taiwan"
    || normalized === "taiwan (republic of china)"
    || normalized === "china"
    || normalized === "people's republic of china"
    || normalized === "republic of china"
    ? "China" : name;
  const digest = createHash("sha256").update(colorIdentity).digest();
  const hue = digest.readUInt16BE(0) / 65_535;
  const saturation = 0.48 + digest[2]! / 255 * 0.18;
  const lightness = 0.48 + digest[3]! / 255 * 0.12;
  const maximum = lightness <= 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
  const minimum = 2 * lightness - maximum;
  const channel = (value: number) => {
    const normalized = (value + 1) % 1;
    if (normalized < 1 / 6) return minimum + (maximum - minimum) * normalized * 6;
    if (normalized < 1 / 2) return maximum;
    if (normalized < 2 / 3) return minimum + (maximum - minimum) * (2 / 3 - normalized) * 6;
    return minimum;
  };
  return `#${[channel(hue + 1 / 3), channel(hue), channel(hue - 1 / 3)]
    .map((value) => Math.round(value * 255).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

async function readOrDownload(path: string, url: string) {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Historical data download failed with ${response.status}: ${url}`);
    const body = await response.text();
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, body, "utf8");
    return body;
  }
}

export class HistoricalGeoJsonRepository implements WorldRepository {
  private readonly peopleRepository: MemoryWorldRepository;
  private readonly snapshotCache = new Map<string, { entities: PoliticalEntity[]; territories: TerritoryVersion[] }>();
  private readonly snapshotPromises = new Map<string, Promise<{ entities: PoliticalEntity[]; territories: TerritoryVersion[] }>>();
  private readonly entityCache = new Map<string, PoliticalEntity>();

  constructor(
    private readonly snapshots: HistoricalSnapshot[],
    private readonly peopleData: WorldData,
    private readonly loadSnapshot: SnapshotLoader,
  ) {
    this.snapshots = [...snapshots].filter((snapshot) => snapshot.year !== 0).sort((a, b) => a.year - b.year);
    this.peopleRepository = new MemoryWorldRepository(peopleData);
  }

  static async create(peopleData: WorldData, cacheRoot = process.env.HISTORICAL_CACHE_DIR
    ?? fileURLToPath(new URL("../../../../data/historical-cache/", import.meta.url))) {
    const indexPath = `${cacheRoot}/index.json`;
    const index = JSON.parse(await readOrDownload(indexPath, `${RAW_ROOT}/index.json`)) as { years: HistoricalSnapshot[] };
    return new HistoricalGeoJsonRepository(index.years, peopleData, async (snapshot) => {
      const snapshotPath = `${cacheRoot}/geojson/${snapshot.filename}`;
      return JSON.parse(await readOrDownload(snapshotPath, `${RAW_ROOT}/geojson/${snapshot.filename}`)) as GeoJsonCollection;
    });
  }

  private async resolveSnapshot(year: number) {
    const snapshot = this.snapshots.filter((candidate) => candidate.year <= year).at(-1);
    if (!snapshot) return { entities: [], territories: [] };
    const cached = this.snapshotCache.get(snapshot.filename);
    if (cached) return cached;
    const inFlight = this.snapshotPromises.get(snapshot.filename);
    if (inFlight) return inFlight;

    const loading = this.loadSnapshot(snapshot).then((collection) => {
      const entities = new Map<string, PoliticalEntity>();
      const territories: TerritoryVersion[] = [];
      collection.features.forEach((feature, featureIndex) => {
        const name = feature.properties?.NAME?.trim();
        const geometry = feature.geometry;
        if (!name || !geometry || !["Polygon", "MultiPolygon"].includes(geometry.type)) return;
        const slug = entitySlug(name);
        const entity: PoliticalEntity = {
          id: slug,
          slug,
          name,
          nameEn: name,
          aliases: [],
          primaryColor: colorFor(name),
          summary: `该疆域来自 ${snapshot.year < 0 ? `公元前 ${Math.abs(snapshot.year)}` : `公元 ${snapshot.year}`} 年历史快照。`,
        };
        entities.set(slug, entity);
        this.entityCache.set(slug, entity);
        territories.push({
          id: `${snapshot.year}:${featureIndex}:${slug}`,
          entityId: slug,
          validFromYear: snapshot.year,
          validToYear: null,
          controlType: (feature.properties?.BORDERPRECISION ?? 1) <= 1 ? "uncertain" : "actual",
          geometry,
        });
      });
      const resolved = { entities: [...entities.values()], territories };
      this.snapshotCache.set(snapshot.filename, resolved);
      if (this.snapshotCache.size > 6) this.snapshotCache.delete(this.snapshotCache.keys().next().value!);
      return resolved;
    }).finally(() => this.snapshotPromises.delete(snapshot.filename));
    this.snapshotPromises.set(snapshot.filename, loading);
    return loading;
  }

  async getWorldData(year: number): Promise<WorldData> {
    const snapshot = await this.resolveSnapshot(year);
    return { ...snapshot, people: this.peopleData.people, personEvents: this.peopleData.personEvents };
  }

  async getNextEventYear(afterYear: number) {
    const boundaryYear = this.snapshots.find((snapshot) => snapshot.year > afterYear && snapshot.year <= 2026)?.year ?? null;
    const personYear = await this.peopleRepository.getNextEventYear(afterYear);
    if (boundaryYear === null) return personYear;
    if (personYear === null) return boundaryYear;
    return Math.min(boundaryYear, personYear);
  }

  searchPeople(query: string) {
    return this.peopleRepository.searchPeople(query);
  }

  listPersonFields() {
    return this.peopleRepository.listPersonFields();
  }

  getPerson(slug: string): Promise<PersonDetails | null> {
    return this.peopleRepository.getPerson(slug);
  }

  async getEntity(slug: string, _context?: EntityPointContext) {
    const entity = this.entityCache.get(slug);
    return entity ? { entity, successors: [], futureControllers: [], sources: [SOURCE] } : null;
  }
}
