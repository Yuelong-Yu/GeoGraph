interface GlobePersonItem {
  person: { slug: string };
  state: { longitude: number; latitude: number };
}

export interface PersonCluster<T> {
  items: T[];
  longitude: number;
  latitude: number;
}

export function groupPeopleForGlobe<T extends GlobePersonItem>(
  people: T[],
  selectedSlug: string | null,
  cameraHeight: number,
): { individuals: T[]; clusters: Array<PersonCluster<T>> } {
  const selected = people.filter((item) => item.person.slug === selectedSlug);
  const candidates = people.filter((item) => item.person.slug !== selectedSlug);
  const cellDegrees = cameraHeight >= 12_000_000 ? 30
    : cameraHeight >= 7_000_000 ? 15
      : candidates.length >= 60 ? 5 : 0;
  if (cellDegrees === 0) return { individuals: [...selected, ...candidates], clusters: [] };

  const cells = new Map<string, T[]>();
  for (const item of candidates) {
    const longitudeCell = Math.floor((item.state.longitude + 180) / cellDegrees);
    const latitudeCell = Math.floor((item.state.latitude + 90) / cellDegrees);
    const key = `${longitudeCell}:${latitudeCell}`;
    const cell = cells.get(key) ?? [];
    cell.push(item);
    cells.set(key, cell);
  }

  const individuals = [...selected];
  const clusters: Array<PersonCluster<T>> = [];
  for (const items of cells.values()) {
    if (items.length === 1) {
      individuals.push(items[0]!);
      continue;
    }
    clusters.push({
      items,
      longitude: items.reduce((sum, item) => sum + item.state.longitude, 0) / items.length,
      latitude: items.reduce((sum, item) => sum + item.state.latitude, 0) / items.length,
    });
  }
  return { individuals, clusters };
}
