import type { PersonDetails, WorldResponse } from "../api.js";
import {
  ArcType,
  CallbackPositionProperty,
  Cartesian2,
  Cartesian3,
  Cartographic,
  Color,
  ColorMaterialProperty,
  defined,
  EllipsoidGeodesic,
  EllipsoidTerrainProvider,
  Entity,
  HorizontalOrigin,
  LabelStyle,
  Math as CesiumMath,
  NearFarScalar,
  PolygonHierarchy,
  PropertyBag,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  VerticalOrigin,
  Viewer,
  WebMapTileServiceImageryProvider,
  WebMercatorTilingScheme,
} from "cesium";
import { useEffect, useRef, useState } from "react";
import { afterNextSceneRender } from "../after-next-scene-render.js";
import { shouldAutoFollowCamera, type ManualCameraInputState } from "../camera-follow.js";
import { fixedAxisCameraView } from "../fixed-axis-camera.js";
import { filterPeopleByPrimaryFields } from "../person-fields.js";
import { personPortraitUrl } from "../person-portrait.js";
import { findInteriorLabelPlacement, isPointInsideTerritory } from "../territory-labels.js";
import { nextTerritoryDisplayMode, territoryDisplaySettings } from "../territory-display-mode.js";
import { zoomForTrackpadPinch } from "../trackpad-pinch.js";
import { useI18n } from "../i18n.js";

interface GlobeProps {
  world: WorldResponse | null;
  selectedEntitySlug: string | null;
  selectedPerson: PersonDetails | null;
  animateTransitions: boolean;
  frameDurationMs: number;
  followSelectedPerson: boolean;
  cameraTarget: { longitude: number; latitude: number; token: number } | null;
  selectedPersonFields: ReadonlySet<string> | null;
  onSelectEntity: (slug: string, point?: { longitude: number; latitude: number }) => void;
  onSelectPerson: (slug: string) => void;
}

function polygonsFromGeometry(geometry: WorldResponse["territories"][number]["geometry"]): number[][][][] {
  if (geometry.type === "Polygon") return [geometry.coordinates as number[][][]];
  return geometry.coordinates as number[][][][];
}

function animatedPosition(
  from: { longitude: number; latitude: number },
  to: { longitude: number; latitude: number },
  durationMs: number,
) {
  const startedAt = performance.now();
  const geodesic = new EllipsoidGeodesic(
    Cartographic.fromDegrees(from.longitude, from.latitude),
    Cartographic.fromDegrees(to.longitude, to.latitude),
  );
  return new CallbackPositionProperty(() => {
    const progress = Math.min(1, (performance.now() - startedAt) / durationMs);
    const point = geodesic.interpolateUsingFraction(progress);
    const stepBob = Math.abs(Math.sin(progress * Math.PI * 10)) * 4_500;
    const arc = Math.sin(progress * Math.PI) * 32_000;
    return Cartesian3.fromRadians(point.longitude, point.latitude, 85_000 + arc + stepBob);
  }, false);
}

const FIXED_AXIS_DEFAULT_LONGITUDE = 35;
const FIXED_AXIS_DEFAULT_HEIGHT = 16_800_000;

function setFixedAxisCamera(viewer: Viewer, longitude: number, height: number) {
  const view = fixedAxisCameraView(longitude, Math.max(400_000, height));
  viewer.camera.setView({
    destination: view.position,
    orientation: { direction: view.direction, up: view.up },
  });
}

export function Globe({
  world, selectedEntitySlug, selectedPerson, animateTransitions, frameDurationMs, onSelectEntity, onSelectPerson,
  followSelectedPerson, cameraTarget, selectedPersonFields,
}: GlobeProps) {
  const { personName, t, territoryLabel } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const previousWorldRef = useRef<WorldResponse | null>(null);
  const suppressFollowOnceRef = useRef(false);
  const manualCameraInputRef = useRef<ManualCameraInputState>({
    active: false,
    lastInputAt: Number.NEGATIVE_INFINITY,
  });
  const [hover, setHover] = useState<{ x: number; y: number; label: string } | null>(null);
  const [fixedAxisRotation, setFixedAxisRotation] = useState(true);
  const [territoryDisplayMode, setTerritoryDisplayMode] = useState<"names" | "names-hidden" | "layer-hidden" | "layer-restored">("names");
  const territoryLabelEntitiesRef = useRef<Entity[]>([]);
  const fixedAxisRotationRef = useRef(fixedAxisRotation);
  const fixedAxisLongitudeRef = useRef(FIXED_AXIS_DEFAULT_LONGITUDE);
  const fixedAxisDragRef = useRef({ active: false, lastX: 0, moved: false });
  fixedAxisRotationRef.current = fixedAxisRotation;
  const selectionHandlers = useRef({ onSelectEntity, onSelectPerson });
  selectionHandlers.current = { onSelectEntity, onSelectPerson };
  const { layerVisible: showTerritoryLayer, namesVisible: showTerritoryNames, nextAction: territoryDisplayNextAction } = territoryDisplaySettings(territoryDisplayMode);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const viewer = new Viewer(container, {
      animation: false,
      baseLayer: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      selectionIndicator: false,
      skyBox: false,
      timeline: false,
      terrainProvider: new EllipsoidTerrainProvider(),
    });
    viewer.scene.globe.baseColor = Color.fromCssColorString("#082a43");
    if (viewer.scene.sun) viewer.scene.sun.show = false;
    if (viewer.scene.moon) viewer.scene.moon.show = false;
    viewer.scene.backgroundColor = Color.fromCssColorString("#03080d");
    if (viewer.scene.skyAtmosphere) viewer.scene.skyAtmosphere.show = true;
    viewer.scene.globe.enableLighting = false;
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(35, 24, 16_800_000),
    });
    viewer.imageryLayers.addImageryProvider(new WebMapTileServiceImageryProvider({
      url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_NextGeneration/default/GoogleMapsCompatible_Level8/{TileMatrix}/{TileRow}/{TileCol}.jpeg",
      layer: "BlueMarble_NextGeneration",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible_Level8",
      tilingScheme: new WebMercatorTilingScheme(),
      maximumLevel: 8,
      credit: "NASA GIBS / Blue Marble Next Generation",
    }));
    viewerRef.current = viewer;

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement: { position: Cartesian2 }) => {
      if (fixedAxisRotationRef.current && fixedAxisDragRef.current.moved) {
        fixedAxisDragRef.current.moved = false;
        return;
      }
      const picked = viewer.scene.pick(movement.position) as { id?: Entity } | undefined;
      if (!defined(picked?.id)) return;
      const properties = picked.id.properties;
      const kind = properties?.kind?.getValue() as string | undefined;
      const slug = properties?.slug?.getValue() as string | undefined;
      if (!slug) return;
      if (kind === "territory") {
        const position = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        const cartographic = position ? Cartographic.fromCartesian(position) : null;
        selectionHandlers.current.onSelectEntity(slug, cartographic ? {
          longitude: CesiumMath.toDegrees(cartographic.longitude),
          latitude: CesiumMath.toDegrees(cartographic.latitude),
        } : undefined);
      }
      if (kind === "person") selectionHandlers.current.onSelectPerson(slug);
    }, ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction((movement: { endPosition: Cartesian2 }) => {
      const drag = fixedAxisDragRef.current;
      if (fixedAxisRotationRef.current && drag.active) {
        const deltaX = movement.endPosition.x - drag.lastX;
        if (deltaX !== 0) {
          drag.lastX = movement.endPosition.x;
          drag.moved = true;
          fixedAxisLongitudeRef.current -= deltaX * 0.32;
          setFixedAxisCamera(
            viewer,
            fixedAxisLongitudeRef.current,
            Cartographic.fromCartesian(viewer.camera.position).height,
          );
        }
      }
      const picked = viewer.scene.pick(movement.endPosition) as { id?: Entity } | undefined;
      const properties = picked?.id?.properties;
      const label = properties?.label?.getValue() as string | undefined;
      setHover(label ? { x: movement.endPosition.x, y: movement.endPosition.y, label } : null);
    }, ScreenSpaceEventType.MOUSE_MOVE);
    const beginManualCameraInput = () => {
      viewer.camera.cancelFlight();
      manualCameraInputRef.current = { active: true, lastInputAt: performance.now() };
    };
    const endManualCameraInput = () => {
      manualCameraInputRef.current = { active: false, lastInputAt: performance.now() };
    };
    const noteManualCameraInput = () => {
      viewer.camera.cancelFlight();
      manualCameraInputRef.current = { active: false, lastInputAt: performance.now() };
    };
    const zoomChromiumPinch = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      event.stopPropagation();
      const height = Cartographic.fromCartesian(viewer.camera.position).height;
      zoomForTrackpadPinch(viewer.camera, height, 1, Math.exp(-event.deltaY * 0.0025));
      noteManualCameraInput();
    };
    let previousWebkitPinchScale = 1;
    const beginWebkitPinch = (event: Event) => {
      event.preventDefault();
      const scale = (event as Event & { scale?: number }).scale;
      previousWebkitPinchScale = typeof scale === "number" && scale > 0 ? scale : 1;
      noteManualCameraInput();
    };
    const zoomWebkitPinch = (event: Event) => {
      event.preventDefault();
      const scale = (event as Event & { scale?: number }).scale;
      if (typeof scale !== "number" || scale <= 0 || scale === previousWebkitPinchScale) return;
      const height = Cartographic.fromCartesian(viewer.camera.position).height;
      previousWebkitPinchScale = zoomForTrackpadPinch(viewer.camera, height, previousWebkitPinchScale, scale);
      noteManualCameraInput();
    };
    const endWebkitPinch = () => { previousWebkitPinchScale = 1; };
    container.addEventListener("wheel", zoomChromiumPinch, { passive: false, capture: true });
    container.addEventListener("gesturestart", beginWebkitPinch, { passive: false, capture: true });
    container.addEventListener("gesturechange", zoomWebkitPinch, { passive: false, capture: true });
    container.addEventListener("gestureend", endWebkitPinch, { capture: true });
    handler.setInputAction((movement: { position: Cartesian2 }) => {
      beginManualCameraInput();
      if (!fixedAxisRotationRef.current) return;
      fixedAxisDragRef.current = { active: true, lastX: movement.position.x, moved: false };
    }, ScreenSpaceEventType.LEFT_DOWN);
    for (const eventType of [ScreenSpaceEventType.RIGHT_DOWN, ScreenSpaceEventType.MIDDLE_DOWN]) {
      handler.setInputAction(beginManualCameraInput, eventType);
    }
    handler.setInputAction(() => {
      endManualCameraInput();
      fixedAxisDragRef.current.active = false;
    }, ScreenSpaceEventType.LEFT_UP);
    for (const eventType of [ScreenSpaceEventType.RIGHT_UP, ScreenSpaceEventType.MIDDLE_UP]) {
      handler.setInputAction(endManualCameraInput, eventType);
    }
    handler.setInputAction(noteManualCameraInput, ScreenSpaceEventType.WHEEL);
    return () => {
      container.removeEventListener("wheel", zoomChromiumPinch, { capture: true });
      container.removeEventListener("gesturestart", beginWebkitPinch, { capture: true });
      container.removeEventListener("gesturechange", zoomWebkitPinch, { capture: true });
      container.removeEventListener("gestureend", endWebkitPinch, { capture: true });
      handler.destroy();
      viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const controller = viewer.scene.screenSpaceCameraController;
    controller.enableRotate = !fixedAxisRotation;
    controller.enableTilt = !fixedAxisRotation;
    controller.enableLook = !fixedAxisRotation;
    controller.enableTranslate = !fixedAxisRotation;
    if (!fixedAxisRotation) return;
    const position = Cartographic.fromCartesian(viewer.camera.position);
    fixedAxisLongitudeRef.current = CesiumMath.toDegrees(position.longitude);
    setFixedAxisCamera(viewer, fixedAxisLongitudeRef.current, position.height);
  }, [fixedAxisRotation]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !cameraTarget) return;
    suppressFollowOnceRef.current = true;
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(cameraTarget.longitude, cameraTarget.latitude, 4_600_000),
      duration: 0.8,
    });
  }, [cameraTarget]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !world) return;
    const previousWorld = previousWorldRef.current;
    viewer.entities.removeAll();
    territoryLabelEntitiesRef.current = [];

    if (showTerritoryLayer) for (const territory of world.territories) {
      const alpha = territory.controlType === "actual" ? 0.62 : territory.controlType === "claim" ? 0.22 : 0.38;
      for (const ringSet of polygonsFromGeometry(territory.geometry)) {
        const outer = ringSet[0];
        if (!outer || outer.length < 3) continue;
        const positions = outer.map(([longitude = 0, latitude = 0]) => Cartesian3.fromDegrees(longitude, latitude, 4_000));
        const holes = ringSet.slice(1)
          .filter((ring) => ring.length >= 3)
          .map((ring) => new PolygonHierarchy(
            ring.map(([longitude = 0, latitude = 0]) => Cartesian3.fromDegrees(longitude, latitude, 4_000)),
          ));
        viewer.entities.add({
          polygon: {
            hierarchy: new PolygonHierarchy(positions, holes),
            material: new ColorMaterialProperty(Color.fromCssColorString(territory.color).withAlpha(alpha)),
            outline: true,
            outlineColor: Color.fromCssColorString(territory.color).brighten(0.35, new Color()).withAlpha(0.95),
          },
          properties: new PropertyBag({ kind: "territory", slug: territory.entity.slug, label: territoryLabel(territory.entity) ?? "" }),
        });
        if (territory.entity.slug === selectedEntitySlug) {
          viewer.entities.add({
            polyline: {
              positions: [...positions, positions[0] ?? positions.at(-1)!],
              width: 4,
              material: Color.WHITE.withAlpha(0.96),
              arcType: ArcType.GEODESIC,
            },
          });
        }
      }
    }

    const clearTerritoryLabels = () => {
      for (const entity of territoryLabelEntitiesRef.current) viewer.entities.remove(entity);
      territoryLabelEntitiesRef.current = [];
    };
    let cancelPendingTerritoryLabelPlacement: () => void = () => {};
    let territoryLabelPlacementPending = false;
    let territoryLabelRefreshTimer: ReturnType<typeof setTimeout> | undefined;
    const placeTerritoryLabels = () => {
      clearTerritoryLabels();
      if (!showTerritoryNames || viewer.isDestroyed()) return;
      const measurementContext = document.createElement("canvas").getContext("2d");
      if (!measurementContext) return;
      measurementContext.font = "600 12px system-ui";
      const labelCandidates = new Map<string, {
        slug: string;
        text: string;
        longitude: number;
        latitude: number;
        availableWidth: number;
      }>();

      for (const territory of world.territories) {
        const labelText = territoryLabel(territory.entity);
        if (!labelText) continue;
        for (const ringSet of polygonsFromGeometry(territory.geometry)) {
          const projectedRings = ringSet.map((ring) => ring.flatMap(([longitude = 0, latitude = 0]) => {
            const projected = viewer.scene.cartesianToCanvasCoordinates(Cartesian3.fromDegrees(longitude, latitude));
            return projected && Number.isFinite(projected.x) && Number.isFinite(projected.y)
              ? [[projected.x, projected.y]] : [];
          }));
          const allRingsProjected = projectedRings.every((ring, index) => ring.length === ringSet[index]?.length);
          const placement = allRingsProjected
            ? findInteriorLabelPlacement(projectedRings, measurementContext.measureText(labelText).width, 12)
            : null;
          const surfacePosition = placement
            ? viewer.camera.pickEllipsoid(new Cartesian2(placement.x, placement.y), viewer.scene.globe.ellipsoid)
            : undefined;
          if (!placement || !surfacePosition) continue;
          const location = Cartographic.fromCartesian(surfacePosition);
          const longitude = CesiumMath.toDegrees(location.longitude);
          const latitude = CesiumMath.toDegrees(location.latitude);
          if (!isPointInsideTerritory({ x: longitude, y: latitude }, ringSet)) continue;
          const existing = labelCandidates.get(territory.entity.slug);
          if (!existing || placement.availableWidth > existing.availableWidth) {
            labelCandidates.set(territory.entity.slug, {
              slug: territory.entity.slug,
              text: labelText,
              longitude,
              latitude,
              availableWidth: placement.availableWidth,
            });
          }
        }
      }

      for (const candidate of labelCandidates.values()) {
        territoryLabelEntitiesRef.current.push(viewer.entities.add({
          position: Cartesian3.fromDegrees(candidate.longitude, candidate.latitude, 62_000),
          label: {
            text: candidate.text,
            font: "600 12px system-ui",
            fillColor: Color.WHITE.withAlpha(0.96),
            outlineColor: Color.BLACK.withAlpha(0.92),
            outlineWidth: 3,
            style: LabelStyle.FILL_AND_OUTLINE,
            horizontalOrigin: HorizontalOrigin.CENTER,
            verticalOrigin: VerticalOrigin.CENTER,
          },
          properties: new PropertyBag({ kind: "territory", slug: candidate.slug, label: candidate.text }),
        }));
      }
    };
    const scheduleTerritoryLabelPlacement = () => {
      if (viewer.isDestroyed()) return;
      if (territoryLabelRefreshTimer !== undefined) clearTimeout(territoryLabelRefreshTimer);
      territoryLabelRefreshTimer = setTimeout(() => {
        territoryLabelRefreshTimer = undefined;
        if (territoryLabelPlacementPending || viewer.isDestroyed()) return;
        territoryLabelPlacementPending = true;
        cancelPendingTerritoryLabelPlacement = afterNextSceneRender(viewer.scene, () => {
          territoryLabelPlacementPending = false;
          placeTerritoryLabels();
        });
      }, 120);
    };
    const refreshTerritoryLabelsAfterCameraMove = () => scheduleTerritoryLabelPlacement();
    if (showTerritoryNames) {
      viewer.camera.changed.addEventListener(refreshTerritoryLabelsAfterCameraMove);
      scheduleTerritoryLabelPlacement();
    }

    const visiblePeople = filterPeopleByPrimaryFields(world.people, selectedPersonFields);
    const selectedPersonVisible = selectedPerson !== null
      && (selectedPersonFields === null || selectedPersonFields.has(selectedPerson.person.primaryField));
    for (const { person, state } of visiblePeople) {
      const selected = selectedPerson?.person.slug === person.slug;
      const previousState = previousWorld?.people.find((item) => item.person.id === person.id)?.state;
      const moved = previousState !== undefined
        && (previousState.longitude !== state.longitude || previousState.latitude !== state.latitude);
      const canAnimate = animateTransitions && moved && frameDurationMs >= 120;
      const position = canAnimate
        ? animatedPosition(previousState, state, frameDurationMs)
        : Cartesian3.fromDegrees(state.longitude, state.latitude, 85_000);

      if (canAnimate) {
        viewer.entities.add({
          polyline: {
            positions: [
              Cartesian3.fromDegrees(previousState.longitude, previousState.latitude, 50_000),
              Cartesian3.fromDegrees(state.longitude, state.latitude, 50_000),
            ],
            width: selected ? 3 : 1.5,
            material: Color.fromCssColorString(selected ? "#f4c96b" : "#8bcac0").withAlpha(0.6),
            arcType: ArcType.GEODESIC,
          },
        });
      }
      viewer.entities.add({
        position,
        billboard: {
          image: personPortraitUrl(import.meta.env.BASE_URL, person.slug),
          width: selected ? 62 : 48,
          height: selected ? 92 : 72,
          verticalOrigin: VerticalOrigin.BOTTOM,
          horizontalOrigin: HorizontalOrigin.CENTER,
          color: Color.WHITE.withAlpha(state.opacity),
          scaleByDistance: new NearFarScalar(1_000_000, 1.2, 22_000_000, 0.65),
        },
        label: {
          text: personName(person),
          font: selected ? "700 16px system-ui" : "600 14px system-ui",
          fillColor: Color.WHITE.withAlpha(state.opacity),
          outlineColor: Color.BLACK.withAlpha(0.8),
          outlineWidth: 4,
          style: LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cartesian2(0, selected ? -104 : -82),
          verticalOrigin: VerticalOrigin.BOTTOM,
          scaleByDistance: new NearFarScalar(1_000_000, 1.1, 20_000_000, 0.55),
        },
        properties: new PropertyBag({ kind: "person", slug: person.slug, label: personName(person) }),
      });
    }

    if (selectedPersonVisible && selectedPerson && world.year >= selectedPerson.person.birthYear
      && (selectedPerson.person.deathYear === null || world.year <= selectedPerson.person.deathYear)) {
      const pastEvents = selectedPerson.events.filter((event) => event.year <= world.year);
      if (pastEvents.length > 1) {
        viewer.entities.add({
          polyline: {
            positions: pastEvents.map((event) => Cartesian3.fromDegrees(event.longitude, event.latitude, 50_000)),
            width: 2.5,
            material: Color.fromCssColorString("#f4c96b").withAlpha(0.58),
            arcType: ArcType.GEODESIC,
          },
        });
      }
    }
    if (followSelectedPerson && selectedPersonVisible && selectedPerson) {
      if (suppressFollowOnceRef.current) {
        suppressFollowOnceRef.current = false;
      } else if (shouldAutoFollowCamera(manualCameraInputRef.current, performance.now())) {
        const selectedState = world.people.find((item) => item.person.slug === selectedPerson.person.slug)?.state;
        if (selectedState) {
          viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(selectedState.longitude, selectedState.latitude, 4_600_000),
            duration: Math.min(0.8, frameDurationMs / 1_000),
          });
        }
      }
    }
    previousWorldRef.current = world;
    return () => {
      if (territoryLabelRefreshTimer !== undefined) clearTimeout(territoryLabelRefreshTimer);
      cancelPendingTerritoryLabelPlacement();
      viewer.camera.changed.removeEventListener(refreshTerritoryLabelsAfterCameraMove);
      clearTerritoryLabels();
    };
  }, [animateTransitions, followSelectedPerson, frameDurationMs, personName, selectedEntitySlug, selectedPerson, selectedPersonFields, showTerritoryLayer, showTerritoryNames, t, territoryLabel, world]);

  return (
    <>
      <div ref={containerRef} className="globe-canvas" aria-label={t("interactiveGlobe")} />
      <button
        type="button"
        className="reset-view"
        onClick={() => {
          const viewer = viewerRef.current;
          if (!viewer) return;
          if (fixedAxisRotation) {
            fixedAxisLongitudeRef.current = FIXED_AXIS_DEFAULT_LONGITUDE;
            setFixedAxisCamera(viewer, FIXED_AXIS_DEFAULT_LONGITUDE, FIXED_AXIS_DEFAULT_HEIGHT);
            return;
          }
          viewer.camera.flyTo({ destination: Cartesian3.fromDegrees(35, 24, FIXED_AXIS_DEFAULT_HEIGHT), duration: 0.8 });
        }}
      >
        {t("globalView")}
      </button>
      <button
        type="button"
        className="fixed-axis-toggle"
        aria-pressed={fixedAxisRotation}
        onClick={() => setFixedAxisRotation((fixed) => !fixed)}
      >
        {fixedAxisRotation ? t("fixedAxisRotation") : t("freeRotation")}
      </button>
      <button
        type="button"
        className="territory-name-toggle"
        aria-label={t(territoryDisplayNextAction)}
        onClick={() => setTerritoryDisplayMode(nextTerritoryDisplayMode)}
      >
        {t(territoryDisplayNextAction)}
      </button>
      {hover && <div className="globe-tooltip" style={{ left: hover.x + 12, top: hover.y + 12 }}>{hover.label}</div>}
    </>
  );
}
