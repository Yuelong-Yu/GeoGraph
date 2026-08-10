export const MIN_YEAR = -1046;
export const MAX_YEAR = 2026;

export function assertHistoricYear(year: number): number {
  if (!Number.isInteger(year) || year === 0 || year < MIN_YEAR || year > MAX_YEAR) {
    throw new RangeError(`Year must be an integer from ${MIN_YEAR} to -1 or 1 to ${MAX_YEAR}.`);
  }
  return year;
}

export function nextHistoricYear(year: number): number {
  assertHistoricYear(year);
  return year === -1 ? 1 : assertHistoricYear(year + 1);
}

export function previousHistoricYear(year: number): number {
  assertHistoricYear(year);
  return year === 1 ? -1 : assertHistoricYear(year - 1);
}
