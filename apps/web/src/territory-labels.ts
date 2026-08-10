export interface ScreenPoint {
  x: number;
  y: number;
}

export interface LabelPlacement extends ScreenPoint {
  availableWidth: number;
}

function pointInRing(point: ScreenPoint, ring: number[][]) {
  let inside = false;
  for (let current = 0, previous = ring.length - 1; current < ring.length; previous = current, current += 1) {
    const currentPoint = ring[current];
    const previousPoint = ring[previous];
    if (!currentPoint || !previousPoint) continue;
    let currentX = currentPoint[0] ?? 0;
    let previousX = previousPoint[0] ?? 0;
    while (currentX - point.x > 180) currentX -= 360;
    while (currentX - point.x < -180) currentX += 360;
    while (previousX - point.x > 180) previousX -= 360;
    while (previousX - point.x < -180) previousX += 360;
    const currentY = currentPoint[1] ?? 0;
    const previousY = previousPoint[1] ?? 0;
    const crosses = (currentY > point.y) !== (previousY > point.y)
      && point.x < (previousX - currentX) * (point.y - currentY) / (previousY - currentY) + currentX;
    if (crosses) inside = !inside;
  }
  return inside;
}

export function isPointInsideTerritory(point: ScreenPoint, rings: number[][][]) {
  return pointInRing(point, rings[0] ?? []) && !rings.slice(1).some((hole) => pointInRing(point, hole));
}

type Interval = [number, number];

function scanlineIntervals(ring: number[][], y: number): Interval[] {
  const intersections: number[] = [];
  for (let index = 0; index < ring.length; index += 1) {
    const start = ring[index];
    const end = ring[(index + 1) % ring.length];
    if (!start || !end) continue;
    const [startX = 0, startY = 0] = start;
    const [endX = 0, endY = 0] = end;
    if ((startY <= y && endY > y) || (endY <= y && startY > y)) {
      intersections.push(startX + (y - startY) * (endX - startX) / (endY - startY));
    }
  }
  intersections.sort((left, right) => left - right);
  const intervals: Interval[] = [];
  for (let index = 0; index + 1 < intersections.length; index += 2) {
    intervals.push([intersections[index]!, intersections[index + 1]!]);
  }
  return intervals;
}

function subtractIntervals(intervals: Interval[], cuts: Interval[]) {
  return cuts.reduce<Interval[]>((remaining, [cutStart, cutEnd]) => remaining.flatMap(([start, end]) => {
    if (cutEnd <= start || cutStart >= end) return [[start, end]];
    return [
      ...(cutStart > start ? [[start, Math.min(cutStart, end)] as Interval] : []),
      ...(cutEnd < end ? [[Math.max(cutEnd, start), end] as Interval] : []),
    ];
  }), intervals);
}

function interiorIntervals(rings: number[][][], y: number) {
  let intervals = scanlineIntervals(rings[0] ?? [], y);
  for (const hole of rings.slice(1)) intervals = subtractIntervals(intervals, scanlineIntervals(hole, y));
  return intervals;
}

function intervalContaining(intervals: Interval[], x: number) {
  return intervals.find(([start, end]) => start <= x && end >= x);
}

export function findInteriorLabelPlacement(
  rings: number[][][],
  labelWidth: number,
  labelHeight: number,
): LabelPlacement | null {
  const outer = rings[0];
  if (!outer || outer.length < 3) return null;
  const yValues = outer.map((point) => point[1] ?? 0);
  const minimumY = Math.min(...yValues);
  const maximumY = Math.max(...yValues);
  const halfWidth = labelWidth / 2 + 4;
  const halfHeight = labelHeight / 2 + 2;
  if (maximumY - minimumY < halfHeight * 2) return null;

  const centerY = (minimumY + maximumY) / 2;
  const candidateRows = [centerY];
  for (let offset = 4; centerY - offset >= minimumY + halfHeight || centerY + offset <= maximumY - halfHeight; offset += 4) {
    if (centerY - offset >= minimumY + halfHeight) candidateRows.push(centerY - offset);
    if (centerY + offset <= maximumY - halfHeight) candidateRows.push(centerY + offset);
  }

  let best: LabelPlacement | null = null;
  for (const y of candidateRows) {
    const middleIntervals = interiorIntervals(rings, y);
    for (const [start, end] of middleIntervals) {
      if (end - start < halfWidth * 2) continue;
      const x = (start + end) / 2;
      const top = intervalContaining(interiorIntervals(rings, y - halfHeight), x);
      const bottom = intervalContaining(interiorIntervals(rings, y + halfHeight), x);
      if (!top || !bottom) continue;
      const left = Math.max(start, top[0], bottom[0]);
      const right = Math.min(end, top[1], bottom[1]);
      const availableWidth = right - left;
      if (availableWidth < halfWidth * 2) continue;
      const placement = { x: (left + right) / 2, y, availableWidth };
      if (!best || placement.availableWidth > best.availableWidth) best = placement;
    }
  }
  return best;
}
