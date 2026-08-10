import { describe, expect, it } from "vitest";
import { nextHistoricYear, previousHistoricYear } from "./chronology.js";

describe("historical chronology", () => {
  it("moves directly between 1 BCE and 1 CE without exposing year zero", () => {
    expect(nextHistoricYear(-1)).toBe(1);
    expect(previousHistoricYear(1)).toBe(-1);
  });
});
