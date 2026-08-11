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

const secondExpansion = [
  "cyrus-the-great", "ashoka", "julius-caesar", "augustus", "constantine-i",
  "suleiman-the-magnificent", "george-washington", "simon-bolivar", "abraham-lincoln",
  "franklin-d-roosevelt", "vladimir-lenin", "adolf-hitler", "mao-zedong", "plato",
  "ibn-khaldun", "niccolo-machiavelli", "john-locke", "jean-jacques-rousseau",
  "mary-wollstonecraft", "john-maynard-keynes", "archimedes", "al-khwarizmi",
  "ibn-al-haytham", "johannes-kepler", "michael-faraday", "james-clerk-maxwell",
  "louis-pasteur", "gregor-mendel", "florence-nightingale", "alexander-fleming",
  "claude-shannon", "cai-lun", "ada-lovelace", "thomas-edison", "tim-berners-lee",
  "zheng-he", "william-shakespeare", "martin-luther-king-jr", "nelson-mandela",
  "rachel-carson",
] as const;

describe("reviewed people seed", () => {
  it("loads all 66 people and both reviewed expansions", async () => {
    const data = await loadDemoData();
    const slugs = data.people.map((person) => person.slug);

    expect(data.people).toHaveLength(66);
    expect(new Set(slugs).size).toBe(66);
    expect(slugs).toEqual(expect.arrayContaining([...addedPeople, ...secondExpansion]));
    expect(data.personEvents).toHaveLength(619);
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
