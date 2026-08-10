import { assertHistoricYear } from "./chronology.js";

export type PolygonGeometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};

export interface PoliticalEntity {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  aliases?: string[];
  primaryColor: string;
  summary?: string;
}

export interface TerritoryVersion {
  id: string;
  entityId: string;
  validFromYear: number;
  validToYear: number | null;
  controlType: "actual" | "claim" | "disputed" | "uncertain";
  geometry: PolygonGeometry;
}

export interface ResolvedTerritory extends TerritoryVersion {
  versionId: string;
  entity: PoliticalEntity;
  color: string;
}

export function resolveTerritories(
  entities: PoliticalEntity[],
  versions: TerritoryVersion[],
  year: number,
): ResolvedTerritory[] {
  assertHistoricYear(year);
  const entitiesById = new Map(entities.map((entity) => [entity.id, entity]));

  return versions.flatMap((version) => {
    if (version.validFromYear > year || (version.validToYear !== null && version.validToYear < year)) return [];
    const entity = entitiesById.get(version.entityId);
    if (!entity) return [];
    return [{ ...version, versionId: version.id, entity, color: entity.primaryColor }];
  });
}
