import { describe, expect, it } from "vitest";
import { personPortraitUrl } from "./person-portrait.js";

describe("personPortraitUrl", () => {
  it("keeps portrait requests under the configured sub-path", () => {
    expect(personPortraitUrl("/", "mao-zedong")).toBe("/characters/mao-zedong.png");
    expect(personPortraitUrl("/geograph/", "mao-zedong")).toBe("/geograph/characters/mao-zedong.png");
  });
});
