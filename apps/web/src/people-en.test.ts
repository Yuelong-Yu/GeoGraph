import { describe, expect, it } from "vitest";
import part1 from "../../../data/seed/people-expansion-40-part1.json" with { type: "json" };
import part2 from "../../../data/seed/people-expansion-40-part2.json" with { type: "json" };
import part3 from "../../../data/seed/people-expansion-40-part3.json" with { type: "json" };
import { newEnglishPeople } from "./people-en.js";

type SeedPerson = {
  slug: string;
  events: Array<Array<string | number>>;
};

describe("English copy for the 40-person expansion", () => {
  it("covers every person and every event in all expansion files", async () => {
    const payloads = [part1, part2, part3] as Array<{ people: SeedPerson[] }>;
    const people = payloads.flatMap((payload) => payload.people);

    expect(people).toHaveLength(40);
    for (const person of people) {
      const translation = newEnglishPeople[person.slug];
      expect(translation, person.slug).toBeDefined();
      if (!translation) throw new Error(`Missing English translation for ${person.slug}`);
      expect(Object.keys(translation.events).sort(), person.slug).toEqual(
        person.events.map((event) => `${event[0]}:${event[1]}`).sort(),
      );
    }
  });
});
