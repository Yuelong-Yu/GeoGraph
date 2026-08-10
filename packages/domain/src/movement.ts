import type { PersonEvent } from "./person-state.js";

export interface PersonMovement {
  mode: "walk" | "snap";
  from: { longitude: number; latitude: number };
  to: { longitude: number; latitude: number };
  durationMs: number;
  distanceKm: number;
}

const MIN_VISIBLE_FRAME_MS = 120;

function greatCircleDistanceKm(a: PersonEvent, b: PersonEvent): number {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const lat1 = radians(a.latitude);
  const lat2 = radians(b.latitude);
  const deltaLat = lat2 - lat1;
  const deltaLon = radians(b.longitude - a.longitude);
  const value = Math.sin(deltaLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  return 6_371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

export function resolveMovement(
  personId: string,
  events: PersonEvent[],
  arrivalYear: number,
  frameDurationMs: number,
): PersonMovement | null {
  const ordered = events
    .filter((event) => event.personId === personId)
    .sort((a, b) => a.year - b.year || a.order - b.order);
  const destination = ordered.filter((event) => event.year === arrivalYear).at(-1);
  if (!destination) return null;
  const origin = ordered.filter((event) => event.year < arrivalYear).at(-1);
  if (!origin || (origin.longitude === destination.longitude && origin.latitude === destination.latitude)) return null;

  const canAnimate = frameDurationMs >= MIN_VISIBLE_FRAME_MS;
  return {
    mode: canAnimate ? "walk" : "snap",
    from: { longitude: origin.longitude, latitude: origin.latitude },
    to: { longitude: destination.longitude, latitude: destination.latitude },
    durationMs: canAnimate ? frameDurationMs : 0,
    distanceKm: greatCircleDistanceKm(origin, destination),
  };
}
