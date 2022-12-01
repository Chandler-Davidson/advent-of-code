import { count, create2DArray, getInputLinesMap, sum } from "utils";

type Line = {
  points: Point[];
  slope: number;
};

type Point = {
  x: number;
  y: number;
};

function parseLine(line: string): Line {
  const points = line.split("->").map((side) =>
    side.trim().split(",").map((c) => parseInt(c))
  ).map(([x, y]) => ({
    x,
    y,
  }));

  return {
    points,
    slope: findSlope(points),
  };
}

function findSlope(points: Point[]) {
  const [first, second] = points;
  return (first.y - second.y) / (first.x - second.x);
}

function findLength(points: Point[]) {
  const [first, second] = points;
  return Math.sqrt(
    Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2),
  );
}

function findMaxPoint(lines: Line[]) {
  const points = lines.flatMap((l) => l.points.flatMap((p) => [p.x, p.y]));
  return Math.max(...points);
}

function findStartingPoint(points: Point[], slope: number): Point {
  if (slope == 0) {
    return points.sort((a, b) => a.x - b.x)[0];
  } else {
    return points.sort((a, b) => a.y - b.y)[0];
  }
}

function createGrid(lines: Line[]): number[][] {
  const grid = create2DArray(findMaxPoint(lines), 0);

  function plotLine({ points, slope }: Line) {
    const length = findLength(points);
    const start = findStartingPoint(points, slope);

    for (let i = 0; i <= length; i++) {
      if (slope == 0) {
        grid[start.y][start.x + i] += 1;
      } else {
        grid[start.y + i][start.x] += 1;
      }
    }
  }

  for (const line of lines) {
    plotLine(line);
  }

  return grid;
}

const rightAngleSlopes = new Set([-Infinity, 0, Infinity]);
const lines = getInputLinesMap(parseLine).filter(({ slope }) =>
  rightAngleSlopes.has(slope)
);
const grid = createGrid(lines);
const overlapCount = sum(grid.map((r) => count(r, (c) => c > 1)));

console.log(`overlaps: ${overlapCount}`);
