import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// Topographic map (0 lowest - 9 highest)
// Hiking trails are as long as possible, gradual ascent (increase by a height of exactly 1), no diagonal steps
// A trailhead's rating is the number of unique paths that end at a 9.

// Find each trailhead's rating, then return the sum.

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

function findRating(map: string[][], [x, y]: [number, number]): number {
  const visitedMap: boolean[][] = Array.from(
    { length: map.length },
    () => Array.from({ length: map[0].length }, () => false),
  );

  const queue: [number, number][] = [[x, y]];
  let count = 0;

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    visitedMap[x][y] = true;

    const nextSteps = findNextSteps(x, y, map);
    if (map[x][y] === "9") {
      count++;
    }

    for (const [x1, y1] of nextSteps) {
      if (!visitedMap[x1][y1]) {
        queue.push([x1, y1]);
      }
    }
  }

  return count;
}

function main(input: string): number {
  const map = input.split("\r\n").map((row) => row.split(""));
  const trailheads = findTrailheads(map);
  const scores = trailheads.map((trailhead) => findRating(map, trailhead));

  return sum(scores);
}

Deno.test("examples", async () => {
  const solutions = [3, 13, 227, 81];

  for (let i = 0; i < solutions.length; i++) {
    const input = await Deno.readTextFile(
      `./src/days/10/examples2/example${i + 1}.txt`,
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
