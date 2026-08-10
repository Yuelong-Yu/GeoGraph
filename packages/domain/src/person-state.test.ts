import { describe, expect, it } from "vitest";
import { resolvePersonState, type Person, type PersonEvent } from "./person-state.js";

const person: Person = {
  id: "newton",
  slug: "isaac-newton",
  name: "牛顿",
  birthYear: 1643,
  deathYear: 1727,
  primaryField: "科学",
  secondaryFields: ["数学"],
};

const events: PersonEvent[] = [
  { id: "birth", personId: person.id, year: 1643, order: 1, title: "出生", longitude: -0.63, latitude: 52.81 },
  { id: "cambridge", personId: person.id, year: 1661, order: 1, title: "进入剑桥", longitude: 0.12, latitude: 52.2 },
];

describe("person state on the globe", () => {
  it("uses the last known place, dims carried-forward positions, and hides outside the lifespan", () => {
    expect(resolvePersonState(person, events, 1661)).toMatchObject({ eventId: "cambridge", opacity: 1 });
    expect(resolvePersonState(person, events, 1700)).toMatchObject({ eventId: "cambridge", opacity: 0.58 });
    expect(resolvePersonState(person, events, 1730)).toBeNull();
  });
});
