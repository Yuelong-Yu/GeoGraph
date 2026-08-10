// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Timeline } from "./Timeline.js";

describe("timeline controls", () => {
  it("offers to replay from 1046 BCE when the view is at 2026", async () => {
    const onYearChange = vi.fn();
    const onPlayingChange = vi.fn();
    render(
      <Timeline
        year={2026}
        playing={false}
        speed={5}
        mode="continuous"
        canAdvance
        onYearChange={onYearChange}
        onPlayingChange={onPlayingChange}
        onSpeedChange={vi.fn()}
        onModeChange={vi.fn()}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "从头播放" }));
    expect(onYearChange).toHaveBeenCalledWith(-1046);
    expect(onPlayingChange).toHaveBeenCalledWith(true);
  });
});
