import { describe, expect, it } from "vitest";
import { groupPeopleForGlobe } from "./person-clustering.js";

const people = [
  { person: { slug: "newton" }, state: { longitude: 0, latitude: 52 } },
  { person: { slug: "napoleon" }, state: { longitude: 2, latitude: 49 } },
  { person: { slug: "einstein" }, state: { longitude: 8, latitude: 47 } },
];

describe("person clustering", () => {
  it("clusters nearby people at globe scale but keeps the selected person separate", () => {
    const result = groupPeopleForGlobe(people, "newton", 15_000_000);
    expect(result.clusters).toHaveLength(1);
    expect(result.clusters[0]?.items.map((item) => item.person.slug)).toEqual(["napoleon", "einstein"]);
    expect(result.individuals.map((item) => item.person.slug)).toEqual(["newton"]);
  });

  it("expands people into individuals at close range", () => {
    const result = groupPeopleForGlobe(people, null, 2_500_000);
    expect(result.clusters).toHaveLength(0);
    expect(result.individuals).toHaveLength(3);
  });
});
