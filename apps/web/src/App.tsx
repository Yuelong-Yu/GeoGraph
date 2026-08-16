import type { EntityDetails, PersonDetails, WorldResponse } from "./api.js";
import { MAX_YEAR, nextHistoricYear } from "@geograph/domain";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchEntity, fetchPerson, fetchPersonFields, fetchWorld, prefetchWorld } from "./api.js";
import { DetailsPanel } from "./components/DetailsPanel.js";
import { Globe, type GlobeHandle } from "./components/Globe.js";
import { PersonSearch } from "./components/PersonSearch.js";
import { PersonFieldFilter } from "./components/PersonFieldFilter.js";
import { Timeline } from "./components/Timeline.js";
import { useI18n } from "./i18n.js";
import { resolvePersonFollowStart } from "./person-follow.js";
import { nextTerritoryDisplayMode, territoryDisplaySettings, type TerritoryDisplayMode } from "./territory-display-mode.js";

export function initialYear(search = window.location.search) {
  const value = Number(new URLSearchParams(search).get("year") ?? 1);
  return Number.isInteger(value) && value !== 0 && value >= -1046 && value <= 2026 ? value : 1;
}

function initialSpeed() {
  const value = Number(localStorage.getItem("geograph-speed") ?? 5);
  return [1, 5, 10, 50].includes(value) ? value : 5;
}

export default function App() {
  const { language, t, toggleLanguage } = useI18n();
  const [year, setYear] = useState(initialYear);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const [world, setWorld] = useState<WorldResponse | null>(null);
  const [loadedYear, setLoadedYear] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"entity" | "person">("person");
  const [entity, setEntity] = useState<EntityDetails | null>(null);
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [followingPerson, setFollowingPerson] = useState(false);
  const [cameraTarget, setCameraTarget] = useState<{ longitude: number; latitude: number; token: number } | null>(null);
  const [personFields, setPersonFields] = useState<string[]>([]);
  const [selectedPersonFields, setSelectedPersonFields] = useState<Set<string> | null>(null);
  const [fixedAxisRotation, setFixedAxisRotation] = useState(true);
  const [territoryDisplayMode, setTerritoryDisplayMode] = useState<TerritoryDisplayMode>("names");
  const globeRef = useRef<GlobeHandle>(null);
  const initialParamsRef = useRef(new URLSearchParams(window.location.search));
  const initialSelectionHandledRef = useRef(false);
  const yearRef = useRef(year);
  yearRef.current = year;

  useEffect(() => {
    localStorage.setItem("geograph-speed", String(speed));
  }, [speed]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchPersonFields(controller.signal)
      .then(({ fields }) => setPersonFields(fields))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoadedYear(null);
    setError(null);
    void fetchWorld(year, controller.signal)
      .then((nextWorld) => { setWorld(nextWorld); setLoadedYear(year); })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : "World data could not be loaded");
      });
    return () => controller.abort();
  }, [year]);

  useEffect(() => {
    if (loadedYear !== year || year === MAX_YEAR || speed > 10) return;
    let nextYear = year;
    for (let index = 0; index < 3 && nextYear < MAX_YEAR; index += 1) {
      nextYear = nextHistoricYear(nextYear);
      prefetchWorld(nextYear);
    }
  }, [loadedYear, speed, year]);

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
    if (initialSelectionHandledRef.current) return;
    const params = initialParamsRef.current;
    const personSlug = params.get("person");
    const entitySlug = params.get("entity");
    if (entitySlug && loadedYear !== year) return;
    initialSelectionHandledRef.current = true;
    if (personSlug) selectPerson(personSlug);
    else if (entitySlug) selectEntity(entitySlug);
  }, [loadedYear, selectEntity, selectPerson, year]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("year", String(year));
    if (person) params.set("person", person.person.slug);
    if (entity) params.set("entity", entity.entity.slug);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [entity, person, year]);

  const selectedEntitySlug = entity?.entity.slug ?? null;
  const changeFollowingPerson = useCallback((following: boolean) => {
    setFollowingPerson(following);
    if (!following || !person) return;
    const start = resolvePersonFollowStart(person, yearRef.current);
    const outsideLifetime = yearRef.current < person.person.birthYear
      || (person.person.deathYear !== null && yearRef.current > person.person.deathYear);
    const nextYear = start?.year ?? (outsideLifetime ? person.person.birthYear : yearRef.current);
    if (nextYear !== yearRef.current) setYear(nextYear);
    if (start) {
      setCameraTarget({ longitude: start.longitude, latitude: start.latitude, token: performance.now() });
    }
    setPlaying(true);
  }, [person]);

  const territoryDisplayNextAction = territoryDisplaySettings(territoryDisplayMode).nextAction;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark" /><div><strong>GeoGraph</strong><small>{t("brandTagline")}</small></div></div>
        <PersonSearch onSelect={selectPerson} />
        <div className="top-actions">
          <button type="button" className="header-globe-control" onClick={() => globeRef.current?.resetView()}>
            {t("globalView")}
          </button>
          <button
            type="button"
            className="header-globe-control"
            aria-pressed={fixedAxisRotation}
            onClick={() => setFixedAxisRotation((fixed) => !fixed)}
          >
            {fixedAxisRotation ? t("fixedAxisRotation") : t("freeRotation")}
          </button>
          <button
            type="button"
            className="header-globe-control"
            aria-label={t(territoryDisplayNextAction)}
            onClick={() => setTerritoryDisplayMode(nextTerritoryDisplayMode)}
          >
            {t(territoryDisplayNextAction)}
          </button>
          <button type="button" className="language-toggle" onClick={toggleLanguage}>
            {language === "en" ? "中" : "En"}
          </button>
        </div>
      </header>

      <div className="workspace">
        <section className="globe-stage">
          <Globe
            ref={globeRef}
            world={world}
            selectedEntitySlug={selectedEntitySlug}
            selectedPerson={person}
            animateTransitions={playing}
            frameDurationMs={1_000 / speed}
            followSelectedPerson={followingPerson}
            cameraTarget={cameraTarget}
            selectedPersonFields={selectedPersonFields}
            fixedAxisRotation={fixedAxisRotation}
            territoryDisplayMode={territoryDisplayMode}
            onSelectEntity={selectEntity}
            onSelectPerson={selectPerson}
          />
          <PersonFieldFilter
            fields={personFields}
            selectedFields={selectedPersonFields}
            onSelectedFieldsChange={setSelectedPersonFields}
          />
          <div className="interaction-hint">{t("interactionHint")}</div>
        </section>
        <DetailsPanel
          activeTab={activeTab}
          entity={entity}
          person={person}
          activePeople={world?.people.map(({ person: activePerson }) => activePerson) ?? []}
          year={year}
          onTabChange={setActiveTab}
          onJumpToEvent={(eventYear, longitude, latitude) => {
            setYear(eventYear);
            setCameraTarget({ longitude, latitude, token: performance.now() });
          }}
          onSelectPerson={selectPerson}
          onShowActivePeople={() => {
            setFollowingPerson(false);
            setPerson(null);
          }}
          followingPerson={followingPerson}
          onFollowingPersonChange={changeFollowingPerson}
        />
      </div>

      <Timeline
        year={year}
        playing={playing}
        speed={speed}
        canAdvance={loadedYear === year && !error}
        onYearChange={setYear}
        onPlayingChange={setPlaying}
        onSpeedChange={setSpeed}
      />
    </main>
  );
}
