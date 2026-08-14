import { Cartesian3, Math as CesiumMath } from "cesium";
import { describe, expect, it } from "vitest";
import { EARTH_AXIAL_TILT_DEGREES, fixedAxisCameraView } from "./fixed-axis-camera.js";

describe("fixedAxisCameraView", () => {
  it("keeps the camera pointed at the globe centre with a 23.44 degree axial tilt", () => {
    const { direction, up } = fixedAxisCameraView(35, 16_800_000);
    const angleBetweenAxisAndUp = CesiumMath.toDegrees(Math.acos(Cartesian3.dot(Cartesian3.UNIT_Z, up)));

    expect(Cartesian3.dot(direction, up)).toBeCloseTo(0, 10);
    expect(angleBetweenAxisAndUp).toBeCloseTo(EARTH_AXIAL_TILT_DEGREES, 2);
  });
});
