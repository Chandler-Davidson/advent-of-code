import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// Antenna's (0-9a-A) are placed in a grid
// When a pair of antennas form a line, they create two antinodes.
// The antinodes are placed on the same line, opposite the distance between the antennas.

function buildFrequencyMap(map: string[][]): Map<string, number[][]> {
  // Frequency to coordinates
  // { A: [ [0, 0], [1, 1] ] }
  const frequenciesMap = new Map<string, number[][]>();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cell = map[i][j];

      if (cell !== "." && cell !== "#") {
        if (frequenciesMap.has(cell)) {
          frequenciesMap.get(cell)!.push([i, j]);
        } else {
          frequenciesMap.set(cell, [[i, j]]);
        }
      }
    }
  }

  return frequenciesMap;
}

function isInBounds(
  [x, y]: number[],
  [rows, columns]: [number, number],
): boolean {
  return x >= 0 && x < rows && y >= 0 && y < columns;
}

function findAntinodes(
  frequenciesMap: Map<string, number[][]>,
  mapSize: [number, number],
): number[][] {
  const antinodes: number[][] = [];
  for (const [_, coordinates] of frequenciesMap) {
    if (coordinates.length < 2) {
      continue;
    }

    for (const [y, x] of coordinates) {
      for (const [y2, x2] of coordinates) {
        if (y === y2 && x === x2) {
          continue;
        }

        // Calculate the delta between the two antennas
        const dx = x2 - x;
        const dy = y2 - y;

        const newAntinodes = [[y - dy, x - dx], [y2 + dy, x2 + dx]]
          .filter((a) => isInBounds(a, mapSize));

        antinodes.push(...newAntinodes);
      }
    }
  }

  return antinodes;
}

function main(input: string): number {
  const map = input.split("\r\n").map((line) => line.split(""));
  const frequenciesMap = buildFrequencyMap(map);
  const mapSize: [number, number] = [map.length, map[0].length];
  const antinodes = findAntinodes(frequenciesMap, mapSize);
  const distinctAntinodes = [...new Set(antinodes.map((a) => a.join(",")))];

  return distinctAntinodes.length;
}

Deno.test("example", async () => {
  const input = await getExample(8);
  const result = main(input);
  assertEquals(result, 14);
});

Deno.test("example", async () => {
  const input = await Deno.readTextFile(`./src/days/8/smallExample.txt`);
  const result = main(input);
  assertEquals(result, 14);
});

Deno.test("solve", async () => {
  const input = await getInput(8);
  const result = main(input);
  console.log(result);
});
