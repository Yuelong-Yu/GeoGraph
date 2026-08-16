import type { Person, PersonEvent, PersonState, ResolvedTerritory } from "@geograph/domain";
import { withBasePath } from "./base-path.js";

export interface WorldResponse {
  year: number;
  coverage: "基础" | "部分" | "较完整";
  territories: ResolvedTerritory[];
  people: Array<{ person: Person; state: PersonState }>;
}

export interface PersonDetails {
  person: Person;
  events: PersonEvent[];
  sources: Array<{ title: string; institution: string; url: string; license: string }>;
}

export interface EntityDetails {
  entity: ResolvedTerritory["entity"];
  successors: ResolvedTerritory["entity"][];
  futureControllers: Array<{
    entity: ResolvedTerritory["entity"];
    fromYear: number;
    toYear: number | null;
  }>;
  sources: Array<{ title: string; institution: string; url: string; license: string }>;
}

async function requestJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(withBasePath(import.meta.env.BASE_URL, url), signal ? { signal } : {});
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);
  return response.json() as Promise<T>;
}

const worldCache = new Map<number, WorldResponse>();

function rememberWorld(world: WorldResponse) {
  worldCache.set(world.year, world);
  if (worldCache.size > 96) {
    const oldestYear = worldCache.keys().next().value as number | undefined;
    if (oldestYear !== undefined) worldCache.delete(oldestYear);
  }
  return world;
}

export function fetchWorld(year: number, signal?: AbortSignal): Promise<WorldResponse> {
  const cached = worldCache.get(year);
  if (cached) return Promise.resolve(cached);
  return requestJson<WorldResponse>(`/api/world?year=${year}`, signal).then(rememberWorld);
}

export function prefetchWorld(year: number) {
  if (worldCache.has(year)) return;
  void fetchWorld(year).catch(() => undefined);
}

export function searchPeople(query: string, signal?: AbortSignal) {
  return requestJson<{ people: Person[] }>(`/api/people?q=${encodeURIComponent(query)}`, signal);
}

export function fetchPersonFields(signal?: AbortSignal) {
  return requestJson<{ fields: string[] }>("/api/people/fields", signal);
}

export function fetchPerson(slug: string, signal?: AbortSignal) {
  return requestJson<PersonDetails>(`/api/people/${encodeURIComponent(slug)}`, signal);
}

export function fetchEntity(
  slug: string,
  point?: { longitude: number; latitude: number; afterYear: number },
  signal?: AbortSignal,
) {
  const query = point ? `?${new URLSearchParams({
    longitude: String(point.longitude),
    latitude: String(point.latitude),
    afterYear: String(point.afterYear),
  }).toString()}` : "";
  return requestJson<EntityDetails>(`/api/entities/${encodeURIComponent(slug)}${query}`, signal);
}
