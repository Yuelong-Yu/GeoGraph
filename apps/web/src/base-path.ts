export function normalizeBasePath(basePath: string): string {
  const prefixed = basePath.startsWith("/") ? basePath : `/${basePath}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}

export function withBasePath(basePath: string, path: string): string {
  const normalizedBase = normalizeBasePath(basePath);
  const normalizedPath = path.replace(/^\/+/, "");
  return normalizedBase === "/" ? `/${normalizedPath}` : `${normalizedBase}${normalizedPath}`;
}
