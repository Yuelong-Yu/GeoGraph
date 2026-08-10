import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { Person, PersonEvent } from "@geograph/domain";
import type { WorldData } from "./repositories/world-repository.js";

type SeedPerson = {
  slug: string;
  nameZh: string;
  nameEn: string;
  aliases: string[];
  birthYear: number;
  deathYear: number | null;
  primaryField: string;
  secondaryFields: string[];
  summary: string;
  events: Array<[number, number, string, string, number, number]>;
};

export async function loadDemoData(): Promise<WorldData> {
  const path = fileURLToPath(new URL("../../../data/seed/people.json", import.meta.url));
  const payload = JSON.parse(await readFile(path, "utf8")) as { people: SeedPerson[] };
  const people: Person[] = payload.people.map((person) => ({
    id: person.slug,
    slug: person.slug,
    name: person.nameZh,
    nameEn: person.nameEn,
    aliases: person.aliases,
    birthYear: person.birthYear,
    deathYear: person.deathYear,
    primaryField: person.primaryField,
    secondaryFields: person.secondaryFields,
    summary: person.summary,
  }));
  const personEvents: PersonEvent[] = payload.people.flatMap((person) => person.events.map((event) => ({
    id: `${person.slug}:${event[0]}:${event[1]}`,
    personId: person.slug,
    year: event[0],
    order: event[1],
    title: event[2],
    description: event[3],
    longitude: event[4],
    latitude: event[5],
  })));
  return { entities: [], territories: [], people, personEvents };
}
