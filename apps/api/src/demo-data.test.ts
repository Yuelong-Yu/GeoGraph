import { describe, expect, it } from "vitest";
import { loadDemoData } from "./demo-data.js";

const addedPeople = [
  "confucius",
  "siddhartha-gautama",
  "aristotle",
  "alexander-the-great",
  "jesus-of-nazareth",
  "muhammad",
  "avicenna",
  "genghis-khan",
  "johannes-gutenberg",
  "christopher-columbus",
  "leonardo-da-vinci",
  "martin-luther",
  "galileo-galilei",
  "james-watt",
  "adam-smith",
  "charles-darwin",
  "karl-marx",
  "marie-curie",
  "mahatma-gandhi",
  "alan-turing",
] as const;

describe("reviewed people seed", () => {
  it("loads all 26 people and the 20-person expansion", async () => {
    const data = await loadDemoData();
    const slugs = data.people.map((person) => person.slug);

    expect(data.people).toHaveLength(26);
    expect(new Set(slugs).size).toBe(26);
    expect(slugs).toEqual(expect.arrayContaining(addedPeople));
    expect(data.personEvents).toHaveLength(242);
  });

  it("gives every person a valid, ordered route beginning at the birth year", async () => {
    const data = await loadDemoData();

    for (const person of data.people) {
      const events = data.personEvents.filter((event) => event.personId === person.id);
      expect(events.length, person.slug).toBeGreaterThan(0);
      expect(events.some((event) => event.year === person.birthYear), person.slug).toBe(true);

      const keys = events.map((event) => `${event.year}:${event.order}`);
      expect(new Set(keys).size, person.slug).toBe(keys.length);
      expect(events, person.slug).toEqual([...events].sort((left, right) => left.year - right.year || left.order - right.order));

      for (const event of events) {
        expect(event.year, event.id).toBeGreaterThanOrEqual(person.birthYear);
        if (person.deathYear !== null) expect(event.year, event.id).toBeLessThanOrEqual(person.deathYear);
        expect(event.longitude, event.id).toBeGreaterThanOrEqual(-180);
        expect(event.longitude, event.id).toBeLessThanOrEqual(180);
        expect(event.latitude, event.id).toBeGreaterThanOrEqual(-90);
        expect(event.latitude, event.id).toBeLessThanOrEqual(90);
      }
    }
  });
});
