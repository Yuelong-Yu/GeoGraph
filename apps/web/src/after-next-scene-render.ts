interface ScenePostRenderEvent {
  addEventListener(listener: () => void): void;
  removeEventListener(listener: () => void): void;
}

export function afterNextSceneRender(
  scene: { postRender: ScenePostRenderEvent },
  callback: () => void,
) {
  let cancelled = false;
  const listener = () => {
    scene.postRender.removeEventListener(listener);
    if (!cancelled) callback();
  };
  scene.postRender.addEventListener(listener);
  return () => {
    cancelled = true;
    scene.postRender.removeEventListener(listener);
  };
}
