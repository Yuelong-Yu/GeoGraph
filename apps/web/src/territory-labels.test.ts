import { describe, expect, it } from "vitest";
import { findInteriorLabelPlacement } from "./territory-labels.js";

describe("territory label placement", () => {
  it("places a 12px label only when its complete width fits inside the territory", () => {
    const wideTerritory = [[[0, 0], [200, 0], [200, 80], [0, 80], [0, 0]]];
    const narrowTerritory = [[[0, 0], [90, 0], [90, 80], [0, 80], [0, 0]]];

    expect(findInteriorLabelPlacement(wideTerritory, 120, 12)).toMatchObject({ x: 100, y: 40 });
    expect(findInteriorLabelPlacement(narrowTerritory, 120, 12)).toBeNull();
  });
});
