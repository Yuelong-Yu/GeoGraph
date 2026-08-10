import type { PersonDetails } from "./api.js";

export interface PersonFollowStart {
  year: number;
  longitude: number;
  latitude: number;
}

export function resolvePersonFollowStart(details: PersonDetails, currentYear: number): PersonFollowStart | null {
  const { person } = details;
  const withinLifetime = currentYear >= person.birthYear
    && (person.deathYear === null || currentYear <= person.deathYear);
  const birthEvent = details.events
    .filter((event) => event.year === person.birthYear)
    .sort((left, right) => left.order - right.order)[0];
  if (!birthEvent) return null;
  return {
    year: withinLifetime ? currentYear : person.birthYear,
    longitude: birthEvent.longitude,
    latitude: birthEvent.latitude,
  };
}
