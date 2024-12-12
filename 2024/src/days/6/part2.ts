import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 1. Create the map
// 2. Simulate the guard's path's until they leave the map
// 2.1 If there is something directly in front of you, turn right 90 degrees.
// 2.2 Otherwise, take a step forward.
// 3. Count the number of unique tiles visited

enum Direction {
  Up = "^",
  Right = ">",
  Down = "v",
  Left = "<",
}

const directions: Direction[] = [
  Direction.Up,
  Direction.Right,
  Direction.Down,
  Direction.Left,
];

class Point {
  constructor(
    public x: number,
    public y: number,
    public isObstacle: boolean,
    public directionTraveled?: Direction,
  ) {}
}

class Guard {
  constructor(
    public position: { x: number; y: number },
    public direction: Direction,
  ) {}

  public getNextLocation(): [number, number] {
    switch (this.direction) {
      case "^":
        return [this.position.x - 1, this.position.y];
      case ">":
        return [this.position.x, this.position.y + 1];
      case "v":
        return [this.position.x + 1, this.position.y];
      case "<":
        return [this.position.x, this.position.y - 1];
    }

    throw new Error("Invalid guard character");
  }

  turnRight() {
    const charIndex = directions.indexOf(this.direction);
    const nextDirection =
      directions[(charIndex + 1) % directions.length] as Direction;

    this.direction = nextDirection;
  }
}

class Game {
  constructor(
    private map: Point[][],
    private guard: Guard,
  ) {}

  public step(): void {
    const nextLocation = this.guard.getNextLocation();

    if (!this.isNextStepValid()) {
      return;
    }

    if (this.map[nextLocation[0]][nextLocation[1]].isObstacle) {
      this.guard.turnRight();
    } else {
      // Mark last step's direction
      const { x, y } = this.guard.position;
      this.map[x][y].directionTraveled = this.guard.direction;

      // Mark new position
      this.guard.position = { x: nextLocation[0], y: nextLocation[1] };
    }
  }

  isNextStepValid(): boolean {
    return this.isInMap(this.guard.getNextLocation());
  }

  isInMap([x, y]: [number, number]): boolean {
    return x >= 0 && x < this.map.length && y >= 0 && y < this.map[0].length;
  }
}

function buildMap(
  matrix: string[][],
): Point[][] {
  return matrix.map((row, i) =>
    row.map((char, j) => new Point(i, j, char === "#"))
  );
}

const guardCharacters = ["^", ">", "v", "<"];
const isGuard = (char: string) => guardCharacters.includes(char);

function main(input: string): number {
  const matrix = input.split("\r\n").map((row) => row.split(""));
  const map = buildMap(matrix);
  const game = new Game(map, new Guard(findGuard(matrix), Direction.Up));

  while (game.isNextStepValid()) {
    game.step();
  }

  return countVisitedTiles(matrix) + 1;
}

function countVisitedTiles(matrix: string[][]): number {
  return sum(matrix.map((row) => row.filter((char) => char === "X").length));
}

function findGuard(matrix: string[][]): { x: number; y: number } {
  for (let i = 0; i < matrix.length; i++) {
    const j = matrix[i].findIndex(isGuard);
    if (j !== -1) {
      return { x: i, y: j };
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
