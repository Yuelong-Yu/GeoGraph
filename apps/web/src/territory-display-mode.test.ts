import { describe, expect, it } from "vitest";
import { nextTerritoryDisplayMode, territoryDisplaySettings } from "./territory-display-mode.js";

describe("territory display mode", () => {
  it("cycles names, layer visibility, and restored layer visibility in order", () => {
    expect(territoryDisplaySettings("names")).toEqual({ layerVisible: true, namesVisible: true, nextAction: "hideTerritoryNames" });
    expect(nextTerritoryDisplayMode("names")).toBe("names-hidden");
    expect(territoryDisplaySettings("names-hidden")).toEqual({ layerVisible: true, namesVisible: false, nextAction: "hideTerritoryLayer" });
    expect(nextTerritoryDisplayMode("names-hidden")).toBe("layer-hidden");
    expect(territoryDisplaySettings("layer-hidden")).toEqual({ layerVisible: false, namesVisible: false, nextAction: "showTerritoryLayer" });
    expect(nextTerritoryDisplayMode("layer-hidden")).toBe("layer-restored");
    expect(territoryDisplaySettings("layer-restored")).toEqual({ layerVisible: true, namesVisible: false, nextAction: "showTerritoryNames" });
    expect(nextTerritoryDisplayMode("layer-restored")).toBe("names");
  });
});
