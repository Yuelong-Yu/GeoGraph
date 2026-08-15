export interface PinchZoomCamera {
  zoomIn(distance: number): void;
  zoomOut(distance: number): void;
}

export function zoomForTrackpadPinch(
  camera: PinchZoomCamera,
  height: number,
  previousScale: number,
  scale: number,
) {
  if (height <= 0 || previousScale <= 0 || scale <= 0 || scale === previousScale) return previousScale;
  const ratio = scale / previousScale;
  const distance = Math.min(2_000_000, Math.max(30_000, height * Math.abs(Math.log(ratio)) * 0.75));
  if (ratio > 1) camera.zoomIn(distance);
  else camera.zoomOut(distance);
  return scale;
}
