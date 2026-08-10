import type { EntityDetails, PersonDetails, WorldResponse } from "./api.js";
import { MAX_YEAR, nextHistoricYear } from "@geograph/domain";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchEntity, fetchNextEvent, fetchPerson, fetchWorld, prefetchWorld } from "./api.js";
import { DetailsPanel } from "./components/DetailsPanel.js";
import { Globe } from "./components/Globe.js";
import { PersonSearch } from "./components/PersonSearch.js";
import { Timeline, type PlaybackMode } from "./components/Timeline.js";

function initialYear() {
  const value = Number(new URLSearchParams(window.location.search).get("year") ?? 2026);
  return Number.isInteger(value) && value !== 0 && value >= -1046 && value <= 2026 ? value : 2026;
}

function initialSpeed() {
  const value = Number(localStorage.getItem("geograph-speed") ?? 5);
  return [1, 5, 10, 50].includes(value) ? value : 5;
}

export default function App() {
  const [year, setYear] = useState(initialYear);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const [mode, setMode] = useState<PlaybackMode>("continuous");
  const [world, setWorld] = useState<WorldResponse | null>(null);
  const [loadedYear, setLoadedYear] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"entity" | "person">("entity");
  const [entity, setEntity] = useState<EntityDetails | null>(null);
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const [followingPerson, setFollowingPerson] = useState(false);
  const [cameraTarget, setCameraTarget] = useState<{ longitude: number; latitude: number; token: number } | null>(null);
  const yearRef = useRef(year);
  yearRef.current = year;

  useEffect(() => {
    localStorage.setItem("geograph-speed", String(speed));
  }, [speed]);

  useEffect(() => {
    const controller = new AbortController();
    setLoadedYear(null);
    setError(null);
    void fetchWorld(year, controller.signal)
      .then((nextWorld) => { setWorld(nextWorld); setLoadedYear(year); })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : "世界数据加载失败");
      });
    return () => controller.abort();
  }, [year]);

  useEffect(() => {
    if (loadedYear !== year || year === MAX_YEAR || mode !== "continuous" || speed > 10) return;
    let nextYear = year;
    for (let index = 0; index < 3 && nextYear < MAX_YEAR; index += 1) {
      nextYear = nextHistoricYear(nextYear);
      prefetchWorld(nextYear);
    }
  }, [loadedYear, mode, speed, year]);

  const selectEntity = useCallback((slug: string, point?: { longitude: number; latitude: number }) => {
    setActiveTab("entity");
    const context = point ? { ...point, afterYear: yearRef.current } : undefined;
    void fetchEntity(slug, context).then(setEntity).catch(() => setEntity(null));
  }, []);

  const selectPerson = useCallback((slug: string) => {
    setActiveTab("person");
    void fetchPerson(slug).then(setPerson).catch(() => setPerson(null));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const personSlug = params.get("person");
    const entitySlug = params.get("entity");
    if (personSlug) selectPerson(personSlug);
    else if (entitySlug) selectEntity(entitySlug);
  }, [selectEntity, selectPerson]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("year", String(year));
    if (person) params.set("person", person.person.slug);
    if (entity) params.set("entity", entity.entity.slug);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [entity, person, year]);

  const selectedEntitySlug = entity?.entity.slug ?? null;
  const status = useMemo(() => {
    if (error) return "连接中断";
    if (loadedYear !== year) return "同步历史切片…";
    return `资料覆盖：${world?.coverage ?? "基础"}`;
  }, [error, loadedYear, world?.coverage, year]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark" /><div><strong>GeoGraph</strong><small>时间中的世界</small></div></div>
        <PersonSearch onSelect={selectPerson} />
        <div className="top-actions">
          <button type="button" className="share-button" onClick={() => {
            void navigator.clipboard.writeText(window.location.href).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1_500);
            });
          }}>{copied ? "已复制" : "复制视图"}</button>
          <div className={`sync-status ${error ? "error" : ""}`}><i />{status}</div>
        </div>
      </header>

      <div className="workspace">
        <section className="globe-stage">
          <Globe
            world={world}
            selectedEntitySlug={selectedEntitySlug}
            selectedPerson={person}
            animateTransitions={playing}
            frameDurationMs={mode === "events" ? 1_000 : 1_000 / speed}
            followSelectedPerson={followingPerson}
            cameraTarget={cameraTarget}
            onExitFollow={() => setFollowingPerson(false)}
            onSelectEntity={selectEntity}
            onSelectPerson={selectPerson}
          />
          <div className="map-legend">
            <span><i className="actual" />实际控制</span>
            <span><i className="claim" />法理宣称</span>
            <span><i className="uncertain" />不确定边疆</span>
          </div>
          <div className="interaction-hint">左键拖动旋转 · 滚轮缩放 · 点击查看</div>
        </section>
        <DetailsPanel
          activeTab={activeTab}
          entity={entity}
          person={person}
          year={year}
          onTabChange={setActiveTab}
          onJumpToEvent={(eventYear, longitude, latitude) => {
            setYear(eventYear);
            setCameraTarget({ longitude, latitude, token: performance.now() });
          }}
          followingPerson={followingPerson}
          onFollowingPersonChange={setFollowingPerson}
        />
      </div>

      <Timeline
        year={year}
        playing={playing}
        speed={speed}
        mode={mode}
        canAdvance={loadedYear === year && !error}
        onYearChange={setYear}
        onPlayingChange={setPlaying}
        onSpeedChange={setSpeed}
        onModeChange={setMode}
        requestNextEvent={fetchNextEvent}
      />
    </main>
  );
}
