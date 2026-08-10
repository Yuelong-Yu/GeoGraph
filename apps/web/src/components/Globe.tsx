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
  TileMapServiceImageryProvider,
  VerticalOrigin,
  Viewer,
} from "cesium";
import { useEffect, useRef, useState } from "react";
import { groupPeopleForGlobe } from "../person-clustering.js";
import { findInteriorLabelPlacement, isPointInsideTerritory } from "../territory-labels.js";
import { useI18n } from "../i18n.js";

interface GlobeProps {
  world: WorldResponse | null;
  selectedEntitySlug: string | null;
  selectedPerson: PersonDetails | null;
  animateTransitions: boolean;
  frameDurationMs: number;
  followSelectedPerson: boolean;
  cameraTarget: { longitude: number; latitude: number; token: number } | null;
  onExitFollow: () => void;
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

export function Globe({
  world, selectedEntitySlug, selectedPerson, animateTransitions, frameDurationMs, onSelectEntity, onSelectPerson,
  followSelectedPerson, cameraTarget, onExitFollow,
}: GlobeProps) {
  const { personName, t, territoryLabel } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const previousWorldRef = useRef<WorldResponse | null>(null);
  const suppressFollowOnceRef = useRef(false);
  const [hover, setHover] = useState<{ x: number; y: number; label: string } | null>(null);
  const [cameraHeight, setCameraHeight] = useState(16_800_000);
  const [showTerritoryNames, setShowTerritoryNames] = useState(false);
  const selectionHandlers = useRef({ onSelectEntity, onSelectPerson, onExitFollow });
  selectionHandlers.current = { onSelectEntity, onSelectPerson, onExitFollow };

  useEffect(() => {
    if (!containerRef.current) return;
    const viewer = new Viewer(containerRef.current, {
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
    viewer.scene.globe.baseColor = Color.fromCssColorString("#17242b");
    if (viewer.scene.sun) viewer.scene.sun.show = false;
    if (viewer.scene.moon) viewer.scene.moon.show = false;
    viewer.scene.backgroundColor = Color.fromCssColorString("#03080d");
    if (viewer.scene.skyAtmosphere) viewer.scene.skyAtmosphere.show = true;
    viewer.scene.globe.enableLighting = false;
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(35, 24, 16_800_000),
    });
    void TileMapServiceImageryProvider.fromUrl("/cesium/Assets/Textures/NaturalEarthII").then((provider) => {
      if (viewer.isDestroyed()) return;
      const layer = viewer.imageryLayers.addImageryProvider(provider);
      layer.brightness = 0.58;
      layer.contrast = 1.18;
      layer.saturation = 0.32;
      layer.gamma = 0.92;
    });
    viewerRef.current = viewer;

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement: { position: Cartesian2 }) => {
      const picked = viewer.scene.pick(movement.position) as { id?: Entity } | undefined;
      if (!defined(picked?.id)) return;
      const properties = picked.id.properties;
      const kind = properties?.kind?.getValue() as string | undefined;
      if (kind === "cluster") {
        const longitude = properties?.longitude?.getValue() as number | undefined;
        const latitude = properties?.latitude?.getValue() as number | undefined;
        if (longitude !== undefined && latitude !== undefined) {
          viewer.camera.flyTo({ destination: Cartesian3.fromDegrees(longitude, latitude, 2_500_000), duration: 0.8 });
        }
        return;
      }
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
      const picked = viewer.scene.pick(movement.endPosition) as { id?: Entity } | undefined;
      const properties = picked?.id?.properties;
      const label = properties?.label?.getValue() as string | undefined;
      setHover(label ? { x: movement.endPosition.x, y: movement.endPosition.y, label } : null);
    }, ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(() => selectionHandlers.current.onExitFollow(), ScreenSpaceEventType.LEFT_DOWN);
    const updateCameraHeight = () => setCameraHeight(Cartographic.fromCartesian(viewer.camera.position).height);
    viewer.camera.moveEnd.addEventListener(updateCameraHeight);

    return () => {
      viewer.camera.moveEnd.removeEventListener(updateCameraHeight);
      handler.destroy();
      viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

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
    const labelCandidates = new Map<string, {
      slug: string;
      text: string;
      longitude: number;
      latitude: number;
      availableWidth: number;
    }>();
    const measurementContext = showTerritoryNames ? document.createElement("canvas").getContext("2d") : null;
    if (measurementContext) measurementContext.font = "600 12px system-ui";

    for (const territory of world.territories) {
      const alpha = territory.controlType === "actual" ? 0.72 : territory.controlType === "claim" ? 0.28 : 0.46;
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
        const labelText = territoryLabel(territory.entity);
        if (measurementContext && labelText) {
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
          if (placement && surfacePosition) {
            const location = Cartographic.fromCartesian(surfacePosition);
            const longitude = CesiumMath.toDegrees(location.longitude);
            const latitude = CesiumMath.toDegrees(location.latitude);
            if (isPointInsideTerritory({ x: longitude, y: latitude }, ringSet)) {
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
        }
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

    for (const candidate of labelCandidates.values()) {
      viewer.entities.add({
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
      });
    }

    const groupedPeople = groupPeopleForGlobe(world.people, selectedPerson?.person.slug ?? null, cameraHeight);
    for (const cluster of groupedPeople.clusters) {
      viewer.entities.add({
        position: Cartesian3.fromDegrees(cluster.longitude, cluster.latitude, 95_000),
        point: {
          pixelSize: 38,
          color: Color.fromCssColorString("#18343a").withAlpha(0.94),
          outlineColor: Color.fromCssColorString("#f4c96b"),
          outlineWidth: 2,
          scaleByDistance: new NearFarScalar(1_000_000, 1.15, 22_000_000, 0.8),
        },
        label: {
          text: `${cluster.items.length} ${t("peopleCluster")}`,
          font: "700 13px system-ui",
          fillColor: Color.WHITE,
          outlineColor: Color.BLACK.withAlpha(0.85),
          outlineWidth: 3,
          style: LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: VerticalOrigin.CENTER,
        },
        properties: new PropertyBag({
          kind: "cluster",
          longitude: cluster.longitude,
          latitude: cluster.latitude,
          label: `${cluster.items.length} ${t("clusterHint")}`,
        }),
      });
    }

    for (const { person, state } of groupedPeople.individuals) {
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
          image: `/characters/${person.slug}.png`,
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

    if (selectedPerson && world.year >= selectedPerson.person.birthYear
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
    if (followSelectedPerson && selectedPerson) {
      if (suppressFollowOnceRef.current) {
        suppressFollowOnceRef.current = false;
      } else {
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
  }, [animateTransitions, cameraHeight, followSelectedPerson, frameDurationMs, personName, selectedEntitySlug, selectedPerson, showTerritoryNames, t, territoryLabel, world]);

  return (
    <>
      <div ref={containerRef} className="globe-canvas" aria-label={t("interactiveGlobe")} />
      <button
        type="button"
        className="reset-view"
        onClick={() => viewerRef.current?.camera.flyTo({ destination: Cartesian3.fromDegrees(35, 24, 16_800_000), duration: 0.8 })}
      >
        {t("globalView")}
      </button>
      <button
        type="button"
        className="territory-name-toggle"
        aria-pressed={showTerritoryNames}
        onClick={() => setShowTerritoryNames((visible) => !visible)}
      >
        {showTerritoryNames ? t("hideTerritoryNames") : t("showTerritoryNames")}
      </button>
      {hover && <div className="globe-tooltip" style={{ left: hover.x + 12, top: hover.y + 12 }}>{hover.label}</div>}
    </>
  );
}
