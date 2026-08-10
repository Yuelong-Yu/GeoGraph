export const MANUAL_CAMERA_INPUT_GRACE_MS = 1_200;

export interface ManualCameraInputState {
  active: boolean;
  lastInputAt: number;
}

export function shouldAutoFollowCamera(
  manualInput: ManualCameraInputState,
  now: number,
  graceMs = MANUAL_CAMERA_INPUT_GRACE_MS,
) {
  return !manualInput.active && now - manualInput.lastInputAt >= graceMs;
}
