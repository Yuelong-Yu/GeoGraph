// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { indexToTimelinePosition, Timeline, timelinePositionToIndex } from "./Timeline.js";

describe("timeline controls", () => {
  afterEach(cleanup);

  it("compresses early history and expands later history on the display scale", () => {
    expect(indexToTimelinePosition(1_535)).toBeLessThan(0.5);
    expect(timelinePositionToIndex(indexToTimelinePosition(1_535))).toBeCloseTo(1_535, 6);
  });

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

    await userEvent.click(screen.getByRole("button", { name: "Replay from start" }));
    expect(onYearChange).toHaveBeenCalledWith(-1046);
    expect(onPlayingChange).toHaveBeenCalledWith(true);
  });

  it("shows civilization periods and jumps to a selected period", async () => {
    const onYearChange = vi.fn();
    render(
      <Timeline
        year={1}
        playing={false}
        speed={5}
        mode="continuous"
        canAdvance
        onYearChange={onYearChange}
        onPlayingChange={vi.fn()}
        onSpeedChange={vi.fn()}
        onModeChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Human civilization periods")).toBeDefined();
    await userEvent.click(screen.getByRole("button", { name: /Age of Exploration/ }));
    expect(onYearChange).toHaveBeenCalledWith(1450);
  });
});
