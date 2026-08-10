import { describe, expect, it } from "vitest";
import { resolveMovement } from "./movement.js";
import type { PersonEvent } from "./person-state.js";

const events: PersonEvent[] = [
  { id: "a", personId: "p", year: 1900, order: 1, title: "A", longitude: 0, latitude: 0 },
  { id: "b", personId: "p", year: 1901, order: 1, title: "B", longitude: 10, latitude: 0 },
];

describe("person movement within one timeline frame", () => {
  it("animates when the frame is visible and snaps when the frame is too short", () => {
    expect(resolveMovement("p", events, 1901, 1_000)).toMatchObject({ mode: "walk", durationMs: 1_000 });
    expect(resolveMovement("p", events, 1901, 20)).toMatchObject({ mode: "snap", durationMs: 0 });
  });
});
