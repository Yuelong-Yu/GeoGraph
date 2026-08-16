export type TerritoryDisplayMode = "names" | "names-hidden" | "layer-hidden" | "layer-restored";

export type TerritoryDisplayAction = "hideTerritoryNames" | "hideTerritoryLayer" | "showTerritoryLayer" | "showTerritoryNames";

export function territoryDisplaySettings(mode: TerritoryDisplayMode) {
  switch (mode) {
    case "names":
      return { layerVisible: true, namesVisible: true, nextAction: "hideTerritoryNames" as const };
    case "names-hidden":
      return { layerVisible: true, namesVisible: false, nextAction: "hideTerritoryLayer" as const };
    case "layer-hidden":
      return { layerVisible: false, namesVisible: false, nextAction: "showTerritoryLayer" as const };
    case "layer-restored":
      return { layerVisible: true, namesVisible: false, nextAction: "showTerritoryNames" as const };
  }
}

export function nextTerritoryDisplayMode(mode: TerritoryDisplayMode): TerritoryDisplayMode {
  switch (mode) {
    case "names": return "names-hidden";
    case "names-hidden": return "layer-hidden";
    case "layer-hidden": return "layer-restored";
    case "layer-restored": return "names";
  }
}
