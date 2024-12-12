import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// Topographic map (0 lowest - 9 highest)
// Hiking trails are as long as possible, gradual ascent (increase by a height of exactly 1), no diagonal steps
// A trailhead is a 0, it's score is based on the # of reachable 9's.

// Find each trailhead's score, then return the sum.

function findTrailheads(map: string[][]): [number, number][] {
  const trailheads: [number, number][] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cell = map[i][j];
      if (cell === "0") {
        trailheads.push([i, j]);
      }
    }
  }

  return trailheads;
}

function isInBounds(map: string[][], x: number, y: number): boolean {
  return x >= 0 && x < map.length && y >= 0 && y < map[x].length;
}

function isGradual(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  map: string[][],
): boolean {
  return Number(map[x2][y2]) - Number(map[x1][y1]) === 1;
}

function findNextSteps(
  x: number,
  y: number,
  map: string[][],
): [number, number][] {
  const possibleSteps: [number, number][] = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];

  return possibleSteps.filter(([x1, y1]) =>
    isInBounds(map, x1, y1) && isGradual(x, y, x1, y1, map)
  );
}

function findScore(map: string[][], trailhead: [number, number]): number {
  const visited = new Set<string>();
  const steps = [trailhead];
  let score = 0;

  while (steps.length > 0) {
    const [x, y] = steps.pop()!;
    const key = `${x},${y}`;
    if (visited.has(key)) {
      continue;
    }

    visited.add(key);
    const cell = Number(map[x][y]);

    if (cell === 9) {
      score++;
    }

    steps.push(...findNextSteps(x, y, map));
  }
  return score;
}

function main(input: string): number {
  const map = input.split("\r\n").map((row) => row.split(""));
  const trailheads = findTrailheads(map);
  const scores = trailheads.map((trailhead) => findScore(map, trailhead));

  return sum(scores);
}

Deno.test("examples", async () => {
  const solutions = [1, 2, 4, 3, 36];

  for (let i = 0; i < solutions.length; i++) {
    const input = await Deno.readTextFile(
      `./src/days/10/examples1/example${i + 1}.txt`,
    );
    const result = main(input);
    assertEquals(result, solutions[i]);
  }
});

Deno.test("solve", async () => {
  const input = await getInput(10);
  const result = main(input);
  console.log(result);
});
