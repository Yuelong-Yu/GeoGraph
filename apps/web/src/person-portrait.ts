import { withBasePath } from "./base-path.js";

export function personPortraitUrl(basePath: string, personSlug: string): string {
  return withBasePath(basePath, `characters/${personSlug}.png`);
}
