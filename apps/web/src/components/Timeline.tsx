import { MAX_YEAR, MIN_YEAR, nextHistoricYear, previousHistoricYear } from "@geograph/domain";
import { useEffect, useMemo, useState, type WheelEvent } from "react";
import { useI18n, type MessageKey } from "../i18n.js";

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
  { key: "firstIndustrialRevolution", start: 1760, end: 1840, placement: "track" },
  { key: "secondIndustrialRevolution", start: 1870, end: 1914, placement: "track" },
  { key: "firstWorldWar", start: 1914, end: 1918, placement: "below" },
  { key: "secondWorldWar", start: 1939, end: 1945, placement: "below" },
  { key: "informationAge", start: 1970, end: MAX_YEAR, placement: "track" },
  { key: "aiBiotechEra", start: 2010, end: MAX_YEAR, placement: "track" },
  { key: "renaissanceReformation", start: 1350, end: 1650, placement: "above" },
  { key: "industrialAge", start: 1760, end: 1945, placement: "above" },
  { key: "globalizationNetworkSociety", start: 1991, end: MAX_YEAR, placement: "above" },
  { key: "enlightenmentRevolutions", start: 1650, end: 1800, placement: "below" },
  { key: "coldWarDecolonization", start: 1945, end: 1991, placement: "below" },
];

function yearToIndex(year: number) {
  return year < 0 ? year - MIN_YEAR : LAST_BCE_INDEX + year;
}

function indexToYear(index: number) {
  return index <= LAST_BCE_INDEX ? MIN_YEAR + index : index - LAST_BCE_INDEX;
}

export function Timeline(props: TimelineProps) {
  const { formatTick, formatYear, t } = useI18n();
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
  }), [formatTick, viewRange]);

  const visiblePeriods = useMemo(() => CIVILIZATION_PERIODS.flatMap((period) => {
    const start = Math.max(period.start, indexToYear(viewRange[0]));
    const end = Math.min(period.end, indexToYear(viewRange[1]));
    if (start > end) return [];
    const startIndex = yearToIndex(start);
    const endIndex = yearToIndex(end);
    const span = viewRange[1] - viewRange[0];
    return [{
      ...period,
      left: ((startIndex - viewRange[0]) / span) * 100,
      width: Math.max(((endIndex - startIndex) / span) * 100, 0.7),
      active: year >= period.start && year <= period.end,
    }];
  }), [viewRange, year]);

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
    <section className="timeline-shell" aria-label={t("timeline")}>
      <div className="timeline-status">
        <div>
          <span className="eyebrow">{t("currentEra")}</span>
          <output className="current-year" aria-live="polite">{formatYear(year)}</output>
        </div>
        <div className="timeline-controls">
          <button
            type="button"
            className="icon-button"
            aria-label={t("previousYear")}
            disabled={year === MIN_YEAR}
            onClick={() => onYearChange(previousHistoricYear(year))}
          >
            −1
          </button>
          <button type="button" className="play-button" onClick={togglePlayback}>
            {replayFromStart ? t("replay") : playing ? t("pause") : t("play")}
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label={t("nextYear")}
            disabled={year === MAX_YEAR}
            onClick={() => onYearChange(nextHistoricYear(year))}
          >
            +1
          </button>
        </div>
        <div className="playback-options">
          <label>
            {t("mode")}
            <select value={mode} onChange={(event) => onModeChange(event.target.value as PlaybackMode)}>
              <option value="continuous">{t("continuousYears")}</option>
              <option value="events">{t("historicalEvents")}</option>
            </select>
          </label>
          <label>
            {t("speed")}
            <select value={speed} disabled={mode === "events"} onChange={(event) => onSpeedChange(Number(event.target.value))}>
              {[1, 5, 10, 50].map((value) => <option key={value} value={value}>{value} {t("yearsPerSecond")}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="timeline-track" onWheel={zoomTimeline} title={t("timelineHelp")}>
        <input
          aria-label={t("selectYear")}
          type="range"
          min={viewRange[0]}
          max={viewRange[1]}
          value={yearToIndex(year)}
          onChange={(event) => onYearChange(indexToYear(Number(event.target.value)))}
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
          {ticks.map((tick, index) => <span key={`${tick}-${index}`}>{tick}</span>)}
        </div>
      </div>
    </section>
  );
}
