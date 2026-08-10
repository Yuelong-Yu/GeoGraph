function editDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        (current[rightIndex - 1] ?? 0) + 1,
        (previous[rightIndex] ?? 0) + 1,
        (previous[rightIndex - 1] ?? 0) + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length] ?? Number.POSITIVE_INFINITY;
}

export function isFuzzyMatch(candidate: string, query: string): boolean {
  const normalizedCandidate = candidate.trim().toLocaleLowerCase();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery || normalizedCandidate.includes(normalizedQuery)) return true;

  return normalizedCandidate
    .split(/[\s\-_/]+/)
    .some((token) => editDistance(token, normalizedQuery) <= Math.max(1, Math.floor(normalizedQuery.length * 0.2)));
}
