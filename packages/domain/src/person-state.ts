import { assertHistoricYear } from "./chronology.js";

export interface Person {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  aliases?: string[];
  birthYear: number;
  deathYear: number | null;
  primaryField: string;
  secondaryFields: string[];
  summary?: string;
}

export interface PersonEvent {
  id: string;
  personId: string;
  year: number;
  order: number;
  title: string;
  description?: string;
  longitude: number;
  latitude: number;
}

export interface PersonState {
  personId: string;
  eventId: string;
  longitude: number;
  latitude: number;
  opacity: number;
  isExactYear: boolean;
}

export function resolvePersonState(person: Person, events: PersonEvent[], year: number): PersonState | null {
  assertHistoricYear(year);
  if (year < person.birthYear || (person.deathYear !== null && year > person.deathYear)) {
    return null;
  }

  const lastEvent = events
    .filter((event) => event.personId === person.id && event.year <= year)
    .sort((a, b) => b.year - a.year || b.order - a.order)[0];

  if (!lastEvent) return null;
  const isExactYear = lastEvent.year === year;
  return {
    personId: person.id,
    eventId: lastEvent.id,
    longitude: lastEvent.longitude,
    latitude: lastEvent.latitude,
    opacity: isExactYear ? 1 : 0.58,
    isExactYear,
  };
}
