import { describe, expect, it, vi } from "vitest";
import { zoomForTrackpadPinch } from "./trackpad-pinch.js";

describe("zoomForTrackpadPinch", () => {
  it("turns a pinch-out scale into a bounded camera zoom-in", () => {
    const camera = { zoomIn: vi.fn(), zoomOut: vi.fn() };

    const nextScale = zoomForTrackpadPinch(camera, 16_800_000, 1, 1.1);

    expect(nextScale).toBe(1.1);
    expect(camera.zoomIn).toHaveBeenCalledWith(expect.any(Number));
    expect(camera.zoomIn.mock.calls[0]?.[0]).toBeGreaterThan(30_000);
    expect(camera.zoomOut).not.toHaveBeenCalled();
  });
});
