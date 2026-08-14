import { describe, expect, it } from "vitest";
import { withBasePath } from "./base-path.js";

describe("withBasePath", () => {
  it("keeps local root paths unchanged", () => {
    expect(withBasePath("/", "/api/world?year=2026")).toBe("/api/world?year=2026");
  });

  it("prefixes API and asset paths for a sub-path deployment", () => {
    expect(withBasePath("/geograph/", "/api/world?year=2026")).toBe("/geograph/api/world?year=2026");
    expect(withBasePath("/geograph/", "cesium/Workers")).toBe("/geograph/cesium/Workers");
  });
});
