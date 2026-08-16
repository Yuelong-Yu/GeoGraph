import { describe, expect, it } from "vitest";
import {
  MOBILE_DETAILS_MIN_HEIGHT,
  mobileDetailsHeightForPointer,
} from "./mobile-panel-resize.js";

describe("mobileDetailsHeightForPointer", () => {
  it("shrinks the details panel when its divider is dragged down", () => {
    expect(mobileDetailsHeightForPointer(600, 500, 480)).toBe(160);
  });

  it("keeps the details panel within its available range", () => {
    expect(mobileDetailsHeightForPointer(600, 500, 0)).toBe(304);
    expect(mobileDetailsHeightForPointer(600, 500, 590)).toBe(MOBILE_DETAILS_MIN_HEIGHT);
  });
});
