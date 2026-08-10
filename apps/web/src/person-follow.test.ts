import type { PersonDetails } from "./api.js";
import { describe, expect, it } from "vitest";
import { resolvePersonFollowStart } from "./person-follow.js";

const napoleon: PersonDetails = {
  person: {
    id: "napoleon-bonaparte",
    slug: "napoleon-bonaparte",
    name: "拿破仑·波拿巴",
    nameEn: "Napoleon Bonaparte",
    birthYear: 1769,
    deathYear: 1821,
    primaryField: "政治",
    secondaryFields: [],
  },
  events: [
    { id: "later", personId: "napoleon-bonaparte", year: 1804, order: 1, title: "加冕", longitude: 2.352, latitude: 48.857 },
    { id: "birth", personId: "napoleon-bonaparte", year: 1769, order: 1, title: "出生", longitude: 8.738, latitude: 41.919 },
  ],
  sources: [],
};

describe("person follow start", () => {
  it("jumps an out-of-lifetime year to birth and targets the birthplace", () => {
    expect(resolvePersonFollowStart(napoleon, 1900)).toEqual({
      year: 1769,
      longitude: 8.738,
      latitude: 41.919,
    });
    expect(resolvePersonFollowStart(napoleon, 1700)?.year).toBe(1769);
  });

  it("keeps an in-lifetime year but still targets the birthplace", () => {
    expect(resolvePersonFollowStart(napoleon, 1804)).toEqual({
      year: 1804,
      longitude: 8.738,
      latitude: 41.919,
    });
  });
});
