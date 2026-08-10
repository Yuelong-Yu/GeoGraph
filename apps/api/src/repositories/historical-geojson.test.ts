import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { HistoricalGeoJsonRepository } from "./historical-geojson.js";

const snapshot = {
  type: "FeatureCollection" as const,
  features: [{
    type: "Feature" as const,
    properties: { NAME: "Song dynasty", BORDERPRECISION: 2 },
    geometry: {
      type: "MultiPolygon" as const,
      coordinates: [[[[100, 20], [125, 20], [125, 42], [100, 42], [100, 20]]]],
    },
  }],
};

describe("historical GeoJSON repository", () => {
  it("serves clickable territories from the latest snapshot at or before the requested year", async () => {
    const repository = new HistoricalGeoJsonRepository(
      [{ year: 1000, filename: "world_1000.geojson" }],
      { entities: [], territories: [], people: [], personEvents: [] },
      async () => snapshot,
    );
    const app = createApp({ repository, logger: false });

    const response = await app.inject({ method: "GET", url: "/api/world?year=1041" });
    await app.close();

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      territories: [{ entity: { name: "Song dynasty" }, color: expect.stringMatching(/^#[0-9A-F]{6}$/) }],
    });
  });

  it("uses China's fixed identity colour for Taiwan", async () => {
    const repository = new HistoricalGeoJsonRepository(
      [{ year: 2010, filename: "world_2010.geojson" }],
      { entities: [], territories: [], people: [], personEvents: [] },
      async () => ({
        type: "FeatureCollection",
        features: ["China", "Taiwan", "Taiwanese Tribes"].map((name, index) => ({
          type: "Feature" as const,
          properties: { NAME: name, BORDERPRECISION: 3 },
          geometry: {
            type: "MultiPolygon" as const,
            coordinates: [[[[100 + index, 20], [101 + index, 20], [101 + index, 21], [100 + index, 21], [100 + index, 20]]]],
          },
        })),
      }),
    );
    const app = createApp({ repository, logger: false });

    const response = await app.inject({ method: "GET", url: "/api/world?year=2026" });
    await app.close();
    const territories = response.json().territories as Array<{ entity: { name: string }; color: string }>;

    expect(territories.find((territory) => territory.entity.name === "Taiwan")?.color)
      .toBe(territories.find((territory) => territory.entity.name === "China")?.color);
    expect(territories.find((territory) => territory.entity.name === "Taiwanese Tribes")?.color)
      .not.toBe(territories.find((territory) => territory.entity.name === "China")?.color);
  });
});
