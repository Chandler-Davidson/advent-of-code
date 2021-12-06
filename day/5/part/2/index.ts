import { count, create2DArray, getInputLinesMap, sum } from "utils";

type Line = {
  points: Point[];
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
  };
}

function findMaxPoint(lines: Line[]) {
  const points = lines.flatMap((l) => l.points.flatMap((p) => [p.x, p.y]));
  return Math.max(...points);
}

function createGrid(lines: Line[]): number[][] {
  const grid = create2DArray(findMaxPoint(lines), 0);

  function plotLine({ points }: Line) {
    const [start, end] = points;
    const xStep = start.x < end.x ? 1 : start.x == end.x ? 0 : -1;
    const yStep = start.y < end.y ? 1 : start.y == end.y ? 0 : -1;

    let x = start.x;
    let y = start.y;
    while (x != end.x + xStep || y != end.y + yStep) {
      grid[y][x] += 1;
      x += xStep;
      y += yStep;
    }
  }

  for (const line of lines) {
    plotLine(line);
  }

  return grid;
}

const lines = getInputLinesMap(parseLine);
const grid = createGrid(lines);
const overlapCount = sum(grid.map((r) => count(r, (c) => c > 1)));

console.log(`overlaps: ${overlapCount}`);
