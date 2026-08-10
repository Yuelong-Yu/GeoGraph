import { describe, expect, it } from "vitest";
import { resolveTerritories, type PoliticalEntity, type TerritoryVersion } from "./world-state.js";

const qin: PoliticalEntity = { id: "qin", slug: "qin", name: "秦", primaryColor: "#D65A4A" };
const versions: TerritoryVersion[] = [
  { id: "qin-221", entityId: qin.id, validFromYear: -221, validToYear: -215, controlType: "actual", geometry: { type: "Polygon", coordinates: [[[105, 34], [112, 34], [112, 40], [105, 34]]] } },
  { id: "qin-214", entityId: qin.id, validFromYear: -214, validToYear: -207, controlType: "actual", geometry: { type: "Polygon", coordinates: [[[103, 22], [113, 22], [113, 40], [103, 22]]] } },
];

describe("annual territory snapshots", () => {
  it("switches discrete versions at their effective year while preserving the entity color", () => {
    expect(resolveTerritories([qin], versions, -215)[0]).toMatchObject({ versionId: "qin-221", color: "#D65A4A" });
    expect(resolveTerritories([qin], versions, -214)[0]).toMatchObject({ versionId: "qin-214", color: "#D65A4A" });
  });
});
