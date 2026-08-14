import { describe, expect, it, vi } from "vitest";
import { afterNextSceneRender } from "./after-next-scene-render.js";

function sceneHarness() {
  const listeners = new Set<() => void>();
  return {
    scene: {
      postRender: {
        addEventListener: (listener: () => void) => listeners.add(listener),
        removeEventListener: (listener: () => void) => listeners.delete(listener),
      },
    },
    render: () => [...listeners].forEach((listener) => listener()),
  };
}

describe("afterNextSceneRender", () => {
  it("runs after the next render only once", () => {
    const harness = sceneHarness();
    const callback = vi.fn();
    afterNextSceneRender(harness.scene, callback);

    harness.render();
    harness.render();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not run a cancelled callback", () => {
    const harness = sceneHarness();
    const callback = vi.fn();
    const cancel = afterNextSceneRender(harness.scene, callback);

    cancel();
    harness.render();

    expect(callback).not.toHaveBeenCalled();
  });
});
