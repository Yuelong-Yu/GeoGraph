import type { Person, PersonEvent, PoliticalEntity, TerritoryVersion } from "@geograph/domain";

export interface WorldData {
  entities: PoliticalEntity[];
  territories: TerritoryVersion[];
  people: Person[];
  personEvents: PersonEvent[];
}

export interface SourceSummary {
  title: string;
  institution: string;
  url: string;
  license: string;
}

export interface EntityDetails {
  entity: PoliticalEntity;
  successors: PoliticalEntity[];
  futureControllers: Array<{ entity: PoliticalEntity; fromYear: number; toYear: number | null }>;
  sources: SourceSummary[];
}

export interface EntityPointContext {
  longitude: number;
  latitude: number;
  afterYear: number;
}

export interface PersonDetails {
  person: Person;
  events: PersonEvent[];
  sources: SourceSummary[];
}

export interface WorldRepository {
  getWorldData(year: number): Promise<WorldData>;
  getNextEventYear(afterYear: number): Promise<number | null>;
  searchPeople(query: string): Promise<Person[]>;
  getPerson(slug: string): Promise<PersonDetails | null>;
  getEntity(slug: string, context?: EntityPointContext): Promise<EntityDetails | null>;
}
