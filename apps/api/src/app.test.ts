import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";
import { MemoryWorldRepository } from "./repositories/memory.js";
import type { WorldData } from "./repositories/world-repository.js";

const fixture = {
  entities: [{ id: "qin", slug: "qin", name: "秦", primaryColor: "#D65A4A" }],
  territories: [{
    id: "qin-221",
    entityId: "qin",
    validFromYear: -221,
    validToYear: -207,
    controlType: "actual",
    geometry: { type: "Polygon", coordinates: [[[105, 34], [112, 34], [112, 40], [105, 34]]] },
  }],
  people: [{
    id: "newton",
    slug: "isaac-newton",
    name: "牛顿",
    nameEn: "Isaac Newton",
    aliases: ["Newton"],
    birthYear: 1643,
    deathYear: 1727,
    primaryField: "科学",
    secondaryFields: ["数学"],
  }],
  personEvents: [],
} satisfies WorldData;
const repository = new MemoryWorldRepository(fixture);

describe("world API", () => {
  it("returns the complete political state for a historical year", async () => {
    const app = createApp({ repository, logger: false });
    const response = await app.inject({ method: "GET", url: "/api/world?year=-214" });
    await app.close();
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      year: -214,
      territories: [{ entity: { name: "秦" }, color: "#D65A4A" }],
    });
  });

  it("finds a person when the query contains a small spelling error", async () => {
    const app = createApp({ repository, logger: false });
    const response = await app.inject({ method: "GET", url: "/api/people?q=newtn" });
    await app.close();
    expect(response.json()).toMatchObject({ people: [{ slug: "isaac-newton" }] });
  });

  it("returns every distinct primary person field", async () => {
    const app = createApp({ repository, logger: false });
    const response = await app.inject({ method: "GET", url: "/api/people/fields" });
    await app.close();
    expect(response.json()).toEqual({ fields: ["科学"] });
  });

  it("rejects an invalid point used to look up future controllers", async () => {
    const app = createApp({ repository, logger: false });
    const response = await app.inject({
      method: "GET",
      url: "/api/entities/qin?longitude=181&latitude=34&afterYear=-214",
    });
    await app.close();
    expect(response.statusCode).toBe(400);
  });

  it("does not misreport repository failures as invalid years", async () => {
    class FailingRepository extends MemoryWorldRepository {
      override async getWorldData(): Promise<WorldData> {
        throw new Error("database unavailable");
      }
    }
    const app = createApp({ repository: new FailingRepository(fixture), logger: false });
    const response = await app.inject({ method: "GET", url: "/api/world?year=-214" });
    await app.close();
    expect(response.statusCode).toBe(500);
  });
});
