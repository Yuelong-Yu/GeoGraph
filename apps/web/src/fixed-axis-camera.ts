import { Cartesian3, Math as CesiumMath } from "cesium";

export const EARTH_AXIAL_TILT_DEGREES = 23.44;
export const FIXED_AXIS_VIEW_LATITUDE_DEGREES = 23.44;

export interface FixedAxisCameraView {
  position: Cartesian3;
  direction: Cartesian3;
  up: Cartesian3;
}

export function fixedAxisCameraView(longitude: number, height: number): FixedAxisCameraView {
  const position = Cartesian3.fromDegrees(longitude, FIXED_AXIS_VIEW_LATITUDE_DEGREES, height);
  const direction = Cartesian3.normalize(Cartesian3.negate(position, new Cartesian3()), new Cartesian3());
  const earthAxis = Cartesian3.UNIT_Z;
  const upright = Cartesian3.normalize(
    Cartesian3.subtract(
      earthAxis,
      Cartesian3.multiplyByScalar(direction, Cartesian3.dot(earthAxis, direction), new Cartesian3()),
      new Cartesian3(),
    ),
    new Cartesian3(),
  );
  const right = Cartesian3.normalize(Cartesian3.cross(direction, upright, new Cartesian3()), new Cartesian3());
  const tilt = CesiumMath.toRadians(EARTH_AXIAL_TILT_DEGREES);
  const up = Cartesian3.normalize(
    Cartesian3.subtract(
      Cartesian3.multiplyByScalar(upright, Math.cos(tilt), new Cartesian3()),
      Cartesian3.multiplyByScalar(right, Math.sin(tilt), new Cartesian3()),
      new Cartesian3(),
    ),
    new Cartesian3(),
  );
  return { position, direction, up };
}
