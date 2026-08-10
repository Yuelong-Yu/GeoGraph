import { describe, expect, it } from "vitest";
import { MANUAL_CAMERA_INPUT_GRACE_MS, shouldAutoFollowCamera } from "./camera-follow.js";

describe("person-follow camera priority", () => {
  it("gives active mouse input priority over automatic following", () => {
    expect(shouldAutoFollowCamera({ active: true, lastInputAt: 1_000 }, 10_000)).toBe(false);
  });

  it("keeps manual camera control during the grace period", () => {
    expect(shouldAutoFollowCamera(
      { active: false, lastInputAt: 1_000 },
      1_000 + MANUAL_CAMERA_INPUT_GRACE_MS - 1,
    )).toBe(false);
  });

  it("allows automatic following to resume after the grace period", () => {
    expect(shouldAutoFollowCamera(
      { active: false, lastInputAt: 1_000 },
      1_000 + MANUAL_CAMERA_INPUT_GRACE_MS,
    )).toBe(true);
  });
});
