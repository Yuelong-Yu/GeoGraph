import type { Person, PersonEvent, PoliticalEntity, PolygonGeometry, TerritoryVersion } from "@geograph/domain";
import type { Pool } from "pg";
import type { EntityPointContext, WorldData, WorldRepository } from "./world-repository.js";

type EntityRow = {
  id: string; slug: string; name_zh: string; name_en: string | null; aliases: string[];
  summary: string; primary_color: string;
};
type TerritoryRow = {
  id: string; entity_id: string; valid_from_year: number; valid_to_year: number | null;
  control_type: TerritoryVersion["controlType"]; geometry: string;
};
type PersonRow = {
  id: string; slug: string; name_zh: string; name_en: string | null; aliases: string[];
  birth_year: number; death_year: number | null; primary_field: string; secondary_fields: string[]; summary: string;
};
type EventRow = {
  id: string; person_id: string; event_year: number; event_order: number; title: string; description: string;
  longitude: number; latitude: number;
};
type SourceRow = { title: string; institution: string; url: string; license: string };
type FutureControllerRow = EntityRow & { valid_from_year: number; valid_to_year: number | null };

function mapEntity(row: EntityRow): PoliticalEntity {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name_zh,
    ...(row.name_en ? { nameEn: row.name_en } : {}),
    aliases: row.aliases,
    primaryColor: row.primary_color,
    summary: row.summary,
  };
}

function mapPerson(row: PersonRow): Person {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name_zh,
    ...(row.name_en ? { nameEn: row.name_en } : {}),
    aliases: row.aliases,
    birthYear: row.birth_year,
    deathYear: row.death_year,
    primaryField: row.primary_field,
    secondaryFields: row.secondary_fields,
    summary: row.summary,
  };
}

function mapEvent(row: EventRow): PersonEvent {
  return {
    id: row.id,
    personId: row.person_id,
    year: row.event_year,
    order: row.event_order,
    title: row.title,
    description: row.description,
    longitude: row.longitude,
    latitude: row.latitude,
  };
}

export class PostgresWorldRepository implements WorldRepository {
  constructor(private readonly pool: Pool) {}

  async getWorldData(year: number): Promise<WorldData> {
    const [entityRows, territoryRows, personRows, eventRows] = await Promise.all([
      this.pool.query<EntityRow>(`
        SELECT DISTINCT pe.id, pe.slug, pe.name_zh, pe.name_en, pe.aliases, pe.summary, pe.primary_color
        FROM political_entities pe
        JOIN territory_versions tv ON tv.entity_id = pe.id
        WHERE tv.valid_from_year <= $1 AND (tv.valid_to_year IS NULL OR tv.valid_to_year >= $1)
      `, [year]),
      this.pool.query<TerritoryRow>(`
        SELECT id, entity_id, valid_from_year, valid_to_year, control_type,
          ST_AsGeoJSON(
            CASE WHEN ST_NPoints(geometry) > 2500
              THEN ST_SimplifyPreserveTopology(geometry, 0.025)
              ELSE geometry
            END
          ) AS geometry
        FROM territory_versions
        WHERE valid_from_year <= $1 AND (valid_to_year IS NULL OR valid_to_year >= $1)
      `, [year]),
      this.pool.query<PersonRow>(`
        SELECT id, slug, name_zh, name_en, aliases, birth_year, death_year, primary_field, secondary_fields, summary
        FROM people
        WHERE birth_year <= $1 AND (death_year IS NULL OR death_year >= $1)
      `, [year]),
      this.pool.query<EventRow>(`
        SELECT e.id, e.person_id, e.event_year, e.event_order, e.title, e.description, e.longitude, e.latitude
        FROM person_events e JOIN people p ON p.id = e.person_id
        WHERE p.birth_year <= $1 AND (p.death_year IS NULL OR p.death_year >= $1) AND e.event_year <= $1
      `, [year]),
    ]);

    return {
      entities: entityRows.rows.map(mapEntity),
      territories: territoryRows.rows.map((row) => ({
        id: row.id,
        entityId: row.entity_id,
        validFromYear: row.valid_from_year,
        validToYear: row.valid_to_year,
        controlType: row.control_type,
        geometry: JSON.parse(row.geometry) as PolygonGeometry,
      })),
      people: personRows.rows.map(mapPerson),
      personEvents: eventRows.rows.map(mapEvent),
    };
  }

  async getNextEventYear(afterYear: number): Promise<number | null> {
    const result = await this.pool.query<{ year: number }>(`
      WITH event_years AS (
        SELECT valid_from_year AS year FROM territory_versions
        UNION SELECT CASE WHEN valid_to_year = -1 THEN 1 ELSE valid_to_year + 1 END FROM territory_versions WHERE valid_to_year IS NOT NULL
        UNION SELECT birth_year FROM people
        UNION SELECT CASE WHEN death_year = -1 THEN 1 ELSE death_year + 1 END FROM people WHERE death_year IS NOT NULL
        UNION SELECT event_year FROM person_events
      )
      SELECT min(year)::integer AS year FROM event_years WHERE year > $1 AND year <= 2026
    `, [afterYear]);
    return result.rows[0]?.year ?? null;
  }

  async searchPeople(query: string): Promise<Person[]> {
    const result = await this.pool.query<PersonRow>(`
      SELECT id, slug, name_zh, name_en, aliases, birth_year, death_year, primary_field, secondary_fields, summary
      FROM people
      WHERE $1 = '' OR name_zh % $1 OR coalesce(name_en, '') % $1
        OR name_zh ILIKE '%' || $1 || '%' OR coalesce(name_en, '') ILIKE '%' || $1 || '%'
        OR EXISTS (SELECT 1 FROM unnest(aliases) alias WHERE alias % $1 OR alias ILIKE '%' || $1 || '%')
      ORDER BY greatest(similarity(name_zh, $1), similarity(coalesce(name_en, ''), $1)) DESC, name_zh
      LIMIT 30
    `, [query.trim()]);
    return result.rows.map(mapPerson);
  }

  async getPerson(slug: string) {
    const personResult = await this.pool.query<PersonRow>(`
      SELECT id, slug, name_zh, name_en, aliases, birth_year, death_year, primary_field, secondary_fields, summary
      FROM people WHERE slug = $1
    `, [slug]);
    const row = personResult.rows[0];
    if (!row) return null;
    const [eventResult, sourceResult] = await Promise.all([
      this.pool.query<EventRow>(`
        SELECT id, person_id, event_year, event_order, title, description, longitude, latitude
        FROM person_events WHERE person_id = $1 ORDER BY event_year, event_order
      `, [row.id]),
      this.pool.query<SourceRow>(`
        SELECT DISTINCT s.title, s.author_or_institution AS institution, s.url, s.license
        FROM sources s
        LEFT JOIN people p ON p.source_id = s.id
        LEFT JOIN person_events e ON e.source_id = s.id
        WHERE p.id = $1 OR e.person_id = $1 ORDER BY s.title
      `, [row.id]),
    ]);
    return { person: mapPerson(row), events: eventResult.rows.map(mapEvent), sources: sourceResult.rows };
  }

  async getEntity(slug: string, context?: EntityPointContext) {
    const result = await this.pool.query<EntityRow>(`
      SELECT id, slug, name_zh, name_en, aliases, summary, primary_color
      FROM political_entities WHERE slug = $1
    `, [slug]);
    const row = result.rows[0];
    if (!row) return null;
    const [successors, sources, futureControllers] = await Promise.all([
      this.pool.query<EntityRow>(`
        SELECT pe.id, pe.slug, pe.name_zh, pe.name_en, pe.aliases, pe.summary, pe.primary_color
        FROM successor_relations sr JOIN political_entities pe ON pe.id = sr.successor_id
        WHERE sr.predecessor_id = $1 ORDER BY pe.name_zh
      `, [row.id]),
      this.pool.query<SourceRow>(`
        SELECT DISTINCT s.title, s.author_or_institution AS institution, s.url, s.license
        FROM territory_versions tv JOIN sources s ON s.id = tv.source_id
        WHERE tv.entity_id = $1 ORDER BY s.title
      `, [row.id]),
      context ? this.pool.query<FutureControllerRow>(`
        SELECT * FROM (
          SELECT DISTINCT ON (pe.id)
            pe.id, pe.slug, pe.name_zh, pe.name_en, pe.aliases, pe.summary, pe.primary_color,
            tv.valid_from_year, tv.valid_to_year
          FROM territory_versions tv
          JOIN political_entities pe ON pe.id = tv.entity_id
          WHERE pe.id <> $1
            AND tv.valid_from_year > $2
            AND ST_Covers(tv.geometry, ST_SetSRID(ST_Point($3, $4), 4326))
          ORDER BY pe.id, tv.valid_from_year
        ) first_control
        ORDER BY valid_from_year
        LIMIT 20
      `, [row.id, context.afterYear, context.longitude, context.latitude]) : Promise.resolve({ rows: [] as FutureControllerRow[] }),
    ]);
    return {
      entity: mapEntity(row),
      successors: successors.rows.map(mapEntity),
      futureControllers: futureControllers.rows.map((controller) => ({
        entity: mapEntity(controller),
        fromYear: controller.valid_from_year,
        toYear: controller.valid_to_year,
      })),
      sources: sources.rows,
    };
  }
}
