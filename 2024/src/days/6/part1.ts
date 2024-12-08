import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 1. Create the map
// 2. Simulate the guard's path's until they leave the map
// 2.1 If there is something directly in front of you, turn right 90 degrees.
// 2.2 Otherwise, take a step forward.
// 3. Count the number of unique tiles visited

class Map {
  constructor(
    private map: string[][],
    private guardLocation: [number, number],
  ) {}

  public step(): void {
    const guardChar = this.map[this.guardLocation[0]][this.guardLocation[1]];
    const nextLocation = this.getNextLocation(this.guardLocation, guardChar);

    if (!this.isNextStepValid()) {
      return;
    }

    if (this.map[nextLocation[0]][nextLocation[1]] === "#") {
      this.turnRight(guardChar);
    } else {
      // Mark last step
      this.map[this.guardLocation[0]][this.guardLocation[1]] = "X";

      // Mark next position
      this.map[nextLocation[0]][nextLocation[1]] = guardChar;
      this.guardLocation = nextLocation;
    }
  }

  turnRight(guardChar: string) {
    const guardCharIndex = guardCharacters.indexOf(guardChar);

    const nextGuardChar =
      guardCharacters[(guardCharIndex + 1) % guardCharacters.length] as string;

    this.map[this.guardLocation[0]][this.guardLocation[1]] = nextGuardChar;
  }

  getNextLocation(
    [x, y]: [number, number],
    guardChar: string,
  ): [number, number] {
    switch (guardChar) {
      case "^":
        return [x - 1, y];
      case ">":
        return [x, y + 1];
      case "v":
        return [x + 1, y];
      case "<":
        return [x, y - 1];
    }

    throw new Error("Invalid guard character");
  }

  isNextStepValid(): boolean {
    const nextLocation = this.getNextLocation(
      this.guardLocation,
      this.map[this.guardLocation[0]][this.guardLocation[1]],
    );
    return this.isInMap(nextLocation);
  }

  isInMap([x, y]: [number, number]): boolean {
    return x >= 0 && x < this.map.length && y >= 0 && y < this.map[0].length;
  }
}

const guardCharacters = ["^", ">", "v", "<"];
const isGuard = (char: string) => guardCharacters.includes(char);

function main(input: string): number {
  const matrix = input.split("\r\n").map((row) => row.split(""));
  const map = new Map(matrix, findGuard(matrix));

  while (map.isNextStepValid()) {
    map.step();
  }

  return countVisitedTiles(matrix) + 1;
}

function countVisitedTiles(matrix: string[][]): number {
  return sum(matrix.map((row) => row.filter((char) => char === "X").length));
}

function findGuard(matrix: string[][]): [number, number] {
  for (let i = 0; i < matrix.length; i++) {
    const j = matrix[i].findIndex(isGuard);
    if (j !== -1) {
      return [i, j];
    }
  }

  throw new Error("Guard not found");
}

Deno.test("example", async () => {
  const input = await getExample(6);
  const result = main(input);
  assertEquals(result, 41);
});

Deno.test("solve", async () => {
  const input = await getInput(6);
  const result = main(input);
  console.log(result);
});
