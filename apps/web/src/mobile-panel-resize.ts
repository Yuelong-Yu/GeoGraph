export const MOBILE_DETAILS_MIN_HEIGHT = 160;
export const MOBILE_GLOBE_MIN_HEIGHT = 180;
export const MOBILE_PANEL_RESIZER_HEIGHT = 16;

export function mobileDetailsHeightForPointer(
  workspaceBottom: number,
  workspaceHeight: number,
  pointerY: number,
): number {
  const maximum = Math.max(
    MOBILE_DETAILS_MIN_HEIGHT,
    workspaceHeight - MOBILE_GLOBE_MIN_HEIGHT - MOBILE_PANEL_RESIZER_HEIGHT,
  );
  return Math.min(maximum, Math.max(MOBILE_DETAILS_MIN_HEIGHT, workspaceBottom - pointerY));
}
