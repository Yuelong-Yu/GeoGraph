import { Cartesian3, Cartographic, Math as CesiumMath } from "cesium";
import { describe, expect, it } from "vitest";
import { EARTH_AXIAL_TILT_DEGREES, fixedAxisCameraView } from "./fixed-axis-camera.js";

describe("fixedAxisCameraView", () => {
  it("keeps the camera pointed at the globe centre with the axial tilt pointing upper-right", () => {
    const { direction, up } = fixedAxisCameraView(35, 16_800_000);
    const projectedAxis = Cartesian3.normalize(
      Cartesian3.subtract(
        Cartesian3.UNIT_Z,
        Cartesian3.multiplyByScalar(direction, Cartesian3.dot(Cartesian3.UNIT_Z, direction), new Cartesian3()),
        new Cartesian3(),
      ),
      new Cartesian3(),
    );
    const screenTilt = CesiumMath.toDegrees(Math.acos(Cartesian3.dot(projectedAxis, up)));
    const screenRight = Cartesian3.normalize(Cartesian3.cross(direction, up, new Cartesian3()), new Cartesian3());

    expect(Cartesian3.dot(direction, up)).toBeCloseTo(0, 10);
    expect(screenTilt).toBeCloseTo(EARTH_AXIAL_TILT_DEGREES, 2);
    expect(Cartesian3.dot(Cartesian3.UNIT_Z, screenRight)).toBeGreaterThan(0);
  });

  it("views the globe from the northern mid-latitudes instead of the equator", () => {
    const { position } = fixedAxisCameraView(105, 16_800_000);

    expect(CesiumMath.toDegrees(Cartographic.fromCartesian(position).latitude)).toBeCloseTo(23.44, 2);
  });
});
