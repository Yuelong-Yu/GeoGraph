import { MAX_YEAR, MIN_YEAR, nextHistoricYear, previousHistoricYear } from "@geograph/domain";
import { useEffect, useMemo, useState, type WheelEvent } from "react";
import { useI18n, type MessageKey } from "../i18n.js";

interface TimelineProps {
  year: number;
  playing: boolean;
  speed: number;
  canAdvance: boolean;
  onYearChange: (year: number) => void;
  onPlayingChange: (playing: boolean) => void;
  onSpeedChange: (speed: number) => void;
}

const LAST_BCE_INDEX = Math.abs(MIN_YEAR) - 1;
const MAX_INDEX = LAST_BCE_INDEX + MAX_YEAR;
const DISPLAY_CURVE = 3;
const DISPLAY_CURVE_RANGE = Math.expm1(DISPLAY_CURVE);
const SLIDER_SCALE = 100_000;

type CivilizationPeriod = {
  key: MessageKey;
  start: number;
  end: number;
  placement: "track" | "above" | "below";
};

// The central labels are the main wayfinding periods. Supporting periods sit
// above or below the track so that they remain legible without obscuring it.
const CIVILIZATION_PERIODS: CivilizationPeriod[] = [
  { key: "classicalAge", start: -500, end: 500, placement: "track" },
  { key: "medievalWorld", start: 500, end: 1450, placement: "track" },
  { key: "ageOfExploration", start: 1450, end: 1800, placement: "track" },
  { key: "industrialAge", start: 1760, end: 1945, placement: "track" },
  { key: "informationAge", start: 1970, end: 2021, placement: "track" },
  { key: "aiEra", start: 2012, end: MAX_YEAR, placement: "track" },
  { key: "renaissanceReformation", start: 1350, end: 1650, placement: "above" },
  { key: "enlightenmentRevolutions", start: 1650, end: 1800, placement: "above" },
  { key: "firstIndustrialRevolution", start: 1760, end: 1840, placement: "above" },
  { key: "secondIndustrialRevolution", start: 1870, end: 1914, placement: "above" },
  { key: "firstWorldWar", start: 1914, end: 1918, placement: "above" },
  { key: "secondWorldWar", start: 1939, end: 1945, placement: "above" },
  { key: "coldWarDecolonization", start: 1945, end: 1991, placement: "above" },
];

function yearToIndex(year: number) {
  return year < 0 ? year - MIN_YEAR : LAST_BCE_INDEX + year;
}

function indexToYear(index: number) {
  return index <= LAST_BCE_INDEX ? MIN_YEAR + index : index - LAST_BCE_INDEX;
}

// A forward-weighted logarithmic display: early history is compressed and the
// visual distance between later years increases. The inverse keeps the range
// input accurate down to individual historical years.
export function indexToTimelinePosition(index: number) {
  return Math.expm1(DISPLAY_CURVE * index / MAX_INDEX) / DISPLAY_CURVE_RANGE;
}

export function timelinePositionToIndex(position: number) {
  return MAX_INDEX * Math.log1p(Math.max(0, Math.min(1, position)) * DISPLAY_CURVE_RANGE) / DISPLAY_CURVE;
}

function positionWithinView(index: number, start: number, end: number) {
  const startPosition = indexToTimelinePosition(start);
  const span = indexToTimelinePosition(end) - startPosition;
  return (indexToTimelinePosition(index) - startPosition) / span;
}

function displayRangeToIndexRange(startPosition: number, endPosition: number): [number, number] {
  const start = Math.round(timelinePositionToIndex(startPosition));
  const end = Math.max(start + 1, Math.round(timelinePositionToIndex(endPosition)));
  return [Math.max(0, start), Math.min(MAX_INDEX, end)];
}

export function moveHistoricYears(year: number, years: number, direction: "previous" | "next") {
  let nextYear = year;
  for (let index = 0; index < years; index += 1) {
    if (direction === "previous") {
      if (nextYear === MIN_YEAR) break;
      nextYear = previousHistoricYear(nextYear);
    } else {
      if (nextYear === MAX_YEAR) break;
      nextYear = nextHistoricYear(nextYear);
    }
  }
  return nextYear;
}

export function Timeline(props: TimelineProps) {
  const { formatTick, formatYear, language, t } = useI18n();
  const {
    year, playing, speed, canAdvance, onYearChange, onPlayingChange, onSpeedChange,
  } = props;
  const [viewRange, setViewRange] = useState<[number, number]>([0, MAX_INDEX]);
  const currentIndex = yearToIndex(year);
  const viewStartPosition = indexToTimelinePosition(viewRange[0]);
  const viewEndPosition = indexToTimelinePosition(viewRange[1]);
  const sliderMin = Math.round(viewStartPosition * SLIDER_SCALE);
  const sliderMax = Math.round(viewEndPosition * SLIDER_SCALE);
  const sliderValue = Math.round(indexToTimelinePosition(currentIndex) * SLIDER_SCALE);

  useEffect(() => {
    const [start, end] = viewRange;
    if (currentIndex >= start && currentIndex <= end) return;
    const span = end - start;
    const nextStart = Math.max(0, Math.min(MAX_INDEX - span, currentIndex - Math.floor(span / 2)));
    setViewRange([nextStart, nextStart + span]);
  }, [currentIndex, viewRange]);

  const ticks = useMemo(() => {
    const candidates = Array.from({ length: 8 }, (_, index) => {
      const yearIndex = Math.round(viewRange[0] + (viewRange[1] - viewRange[0]) * index / 7);
      return {
        label: formatTick(indexToYear(yearIndex)),
        left: positionWithinView(yearIndex, viewRange[0], viewRange[1]) * 100,
      };
    });
    return candidates.filter((tick, index) => index === 0
      || index === candidates.length - 1
      || tick.left - candidates[index - 1]!.left >= 3);
  }, [formatTick, viewRange]);

  const visiblePeriods = useMemo(() => CIVILIZATION_PERIODS.flatMap((period) => {
    const start = Math.max(period.start, indexToYear(viewRange[0]));
    const end = Math.min(period.end, indexToYear(viewRange[1]));
    if (start > end) return [];
    const startIndex = yearToIndex(start);
    const endIndex = yearToIndex(end);
    return [{
      ...period,
      left: positionWithinView(startIndex, viewRange[0], viewRange[1]) * 100,
      width: Math.max((positionWithinView(endIndex, viewRange[0], viewRange[1])
        - positionWithinView(startIndex, viewRange[0], viewRange[1])) * 100, 0.7),
      active: year >= period.start && year <= period.end,
    }];
  }), [viewRange, year]);

  const zoomTimeline = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const displaySpan = viewEndPosition - viewStartPosition;
    if (event.shiftKey) {
      const shift = displaySpan * 0.12 * Math.sign(event.deltaY);
      const nextStart = Math.max(0, Math.min(1 - displaySpan, viewStartPosition + shift));
      setViewRange(displayRangeToIndexRange(nextStart, nextStart + displaySpan));
      return;
    }
    const nextSpan = Math.max(indexToTimelinePosition(25), Math.min(1, displaySpan * (event.deltaY > 0 ? 1.25 : 0.8)));
    const ratio = displaySpan === 0 ? 0.5 : (indexToTimelinePosition(currentIndex) - viewStartPosition) / displaySpan;
    const nextStart = Math.max(0, Math.min(1 - nextSpan, indexToTimelinePosition(currentIndex) - nextSpan * ratio));
    setViewRange(displayRangeToIndexRange(nextStart, nextStart + nextSpan));
  };

  useEffect(() => {
    if (!playing || !canAdvance) return;
    if (year === MAX_YEAR) {
      onPlayingChange(false);
      return;
    }

    let cancelled = false;
    const duration = 1_000 / speed;
    const timer = window.setTimeout(() => {
      if (!cancelled) onYearChange(nextHistoricYear(year));
    }, duration);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [canAdvance, onPlayingChange, onYearChange, playing, speed, year]);

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
    <section className={`timeline-shell timeline-${language}`} aria-label={t("timeline")}>
      <div className="timeline-status">
        <div>
          <span className="eyebrow">{t("currentEra")}</span>
          <output className="current-year" aria-live="polite">{formatYear(year)}</output>
        </div>
        <div className="timeline-controls">
          <button
            type="button"
            className="icon-button"
            aria-label={t("previousFrame")}
            title={t("previousFrame")}
            disabled={year === MIN_YEAR}
            onClick={() => onYearChange(moveHistoricYears(year, speed, "previous"))}
          >
            <svg className="frame-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14M18 5l-9 7 9 7" /></svg>
          </button>
          <button type="button" className="play-button" onClick={togglePlayback}>
            {replayFromStart ? t("replay") : playing ? t("pause") : t("play")}
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label={t("nextFrame")}
            title={t("nextFrame")}
            disabled={year === MAX_YEAR}
            onClick={() => onYearChange(moveHistoricYears(year, speed, "next"))}
          >
            <svg className="frame-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14M6 5l9 7-9 7" /></svg>
          </button>
        </div>
        <div className="playback-options">
          <label>
            {t("speed")}
            <select value={speed} onChange={(event) => onSpeedChange(Number(event.target.value))}>
              {[1, 5, 10, 50].map((value) => <option key={value} value={value}>{value} {t("yearsPerSecond")}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="timeline-track" onWheel={zoomTimeline} title={t("timelineHelp")}>
        <input
          aria-label={t("selectYear")}
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={sliderValue}
          onChange={(event) => onYearChange(indexToYear(Math.round(timelinePositionToIndex(Number(event.target.value) / SLIDER_SCALE))))}
        />
        <div className="civilization-periods" aria-label={t("civilizationPeriods")}>
          {visiblePeriods.map((period) => (
            <button
              type="button"
              key={period.key}
              className={`civilization-period ${period.placement} period-${period.key}${period.active ? " active" : ""}`}
              style={{ left: `${period.left}%`, width: `${period.width}%` }}
              onClick={() => onYearChange(period.start)}
              aria-label={`${t(period.key)} · ${formatYear(period.start)}–${formatYear(period.end)}`}
              title={`${t(period.key)} · ${formatYear(period.start)}–${formatYear(period.end)}`}
            >
              <span>{t(period.key)}</span>
            </button>
          ))}
        </div>
        <div className="timeline-ticks" aria-hidden="true">
          {ticks.map((tick, index) => (
            <span
              key={`${tick.label}-${index}`}
              className={index === 0 ? "start" : index === ticks.length - 1 ? "end" : undefined}
              style={{ left: `${tick.left}%` }}
            >
              {tick.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
