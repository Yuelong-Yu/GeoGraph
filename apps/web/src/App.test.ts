import { describe, expect, it } from "vitest";
import { initialYear } from "./App.js";

describe("initialYear", () => {
  it("starts at 1 CE when the URL does not specify a year", () => {
    expect(initialYear("")).toBe(1);
  });

  it("keeps a valid year from the URL", () => {
    expect(initialYear("?year=-44")).toBe(-44);
  });

  it("falls back to 1 CE for an invalid URL year", () => {
    expect(initialYear("?year=0")).toBe(1);
  });
});
