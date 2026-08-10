import { MAX_YEAR, MIN_YEAR, nextHistoricYear, previousHistoricYear } from "@geograph/domain";
import { useEffect, useMemo, useState, type WheelEvent } from "react";

export type PlaybackMode = "continuous" | "events";

interface TimelineProps {
  year: number;
  playing: boolean;
  speed: number;
  mode: PlaybackMode;
  canAdvance: boolean;
  onYearChange: (year: number) => void;
  onPlayingChange: (playing: boolean) => void;
  onSpeedChange: (speed: number) => void;
  onModeChange: (mode: PlaybackMode) => void;
  requestNextEvent?: (year: number) => Promise<number | null>;
}

const LAST_BCE_INDEX = Math.abs(MIN_YEAR) - 1;
const MAX_INDEX = LAST_BCE_INDEX + MAX_YEAR;

function yearToIndex(year: number) {
  return year < 0 ? year - MIN_YEAR : LAST_BCE_INDEX + year;
}

function indexToYear(index: number) {
  return index <= LAST_BCE_INDEX ? MIN_YEAR + index : index - LAST_BCE_INDEX;
}

export function formatYear(year: number) {
  return year < 0 ? `公元前 ${Math.abs(year)} 年` : `公元 ${year} 年`;
}

function formatTick(year: number) {
  return year < 0 ? `前${Math.abs(year)}` : String(year);
}

export function Timeline(props: TimelineProps) {
  const {
    year, playing, speed, mode, canAdvance, onYearChange, onPlayingChange,
    onSpeedChange, onModeChange, requestNextEvent,
  } = props;
  const [viewRange, setViewRange] = useState<[number, number]>([0, MAX_INDEX]);
  const currentIndex = yearToIndex(year);

  useEffect(() => {
    const [start, end] = viewRange;
    if (currentIndex >= start && currentIndex <= end) return;
    const span = end - start;
    const nextStart = Math.max(0, Math.min(MAX_INDEX - span, currentIndex - Math.floor(span / 2)));
    setViewRange([nextStart, nextStart + span]);
  }, [currentIndex, viewRange]);

  const ticks = useMemo(() => Array.from({ length: 8 }, (_, index) => {
    const position = Math.round(viewRange[0] + (viewRange[1] - viewRange[0]) * index / 7);
    return formatTick(indexToYear(position));
  }), [viewRange]);

  const zoomTimeline = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const [start, end] = viewRange;
    const span = end - start;
    if (event.shiftKey) {
      const shift = Math.round(span * 0.12) * Math.sign(event.deltaY);
      const nextStart = Math.max(0, Math.min(MAX_INDEX - span, start + shift));
      setViewRange([nextStart, nextStart + span]);
      return;
    }
    const nextSpan = Math.max(25, Math.min(MAX_INDEX, Math.round(span * (event.deltaY > 0 ? 1.25 : 0.8))));
    const ratio = span === 0 ? 0.5 : (currentIndex - start) / span;
    const nextStart = Math.max(0, Math.min(MAX_INDEX - nextSpan, Math.round(currentIndex - nextSpan * ratio)));
    setViewRange([nextStart, nextStart + nextSpan]);
  };

  useEffect(() => {
    if (!playing || !canAdvance) return;
    if (year === MAX_YEAR) {
      onPlayingChange(false);
      return;
    }

    let cancelled = false;
    const duration = mode === "events" ? 1_000 : 1_000 / speed;
    const timer = window.setTimeout(() => {
      if (mode === "events" && requestNextEvent) {
        void requestNextEvent(year).then((next) => {
          if (cancelled) return;
          if (next === null) onPlayingChange(false);
          else onYearChange(next);
        });
      } else {
        onYearChange(nextHistoricYear(year));
      }
    }, duration);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [canAdvance, mode, onPlayingChange, onYearChange, playing, requestNextEvent, speed, year]);

  const replayFromStart = year === MAX_YEAR && !playing;
  const togglePlayback = () => {
    if (replayFromStart) {
      onYearChange(MIN_YEAR);
      onPlayingChange(true);
      return;
    }
    onPlayingChange(!playing);
  };

  return (
    <section className="timeline-shell" aria-label="历史时间轴">
      <div className="timeline-status">
        <div>
          <span className="eyebrow">当前纪年</span>
          <output className="current-year" aria-live="polite">{formatYear(year)}</output>
        </div>
        <div className="timeline-controls">
          <button
            type="button"
            className="icon-button"
            aria-label="前一年"
            disabled={year === MIN_YEAR}
            onClick={() => onYearChange(previousHistoricYear(year))}
          >
            −1
          </button>
          <button type="button" className="play-button" onClick={togglePlayback}>
            {replayFromStart ? "从头播放" : playing ? "暂停" : "播放"}
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="后一年"
            disabled={year === MAX_YEAR}
            onClick={() => onYearChange(nextHistoricYear(year))}
          >
            +1
          </button>
        </div>
        <div className="playback-options">
          <label>
            模式
            <select value={mode} onChange={(event) => onModeChange(event.target.value as PlaybackMode)}>
              <option value="continuous">连续年份</option>
              <option value="events">历史事件</option>
            </select>
          </label>
          <label>
            速度
            <select value={speed} disabled={mode === "events"} onChange={(event) => onSpeedChange(Number(event.target.value))}>
              {[1, 5, 10, 50].map((value) => <option key={value} value={value}>{value} 年/秒</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="timeline-track" onWheel={zoomTimeline} title="滚轮缩放时间范围，Shift + 滚轮平移">
        <input
          aria-label="选择年份"
          type="range"
          min={viewRange[0]}
          max={viewRange[1]}
          value={yearToIndex(year)}
          onChange={(event) => onYearChange(indexToYear(Number(event.target.value)))}
        />
        <div className="timeline-ticks" aria-hidden="true">
          {ticks.map((tick, index) => <span key={`${tick}-${index}`}>{tick}</span>)}
        </div>
      </div>
    </section>
  );
}
