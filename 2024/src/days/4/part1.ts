import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

const XMAS = "XMAS";

function getDirections(
  matrix: string[][],
  letter: string,
  x: number,
  y: number,
): string[] {
  const directions: string[] = [];

  if (matrix[x - 1]?.[y] === letter) {
    directions.push("up");
  }
  if (matrix[x - 1]?.[y - 1] === letter) {
    directions.push("left-up");
  }
  if (matrix[x]?.[y - 1] === letter) {
    directions.push("left");
  }
  if (matrix[x + 1]?.[y - 1] === letter) {
    directions.push("left-down");
  }
  if (matrix[x + 1]?.[y] === letter) {
    directions.push("down");
  }
  if (matrix[x + 1]?.[y + 1] === letter) {
    directions.push("right-down");
  }
  if (matrix[x]?.[y + 1] === letter) {
    directions.push("right");
  }
  if (matrix[x - 1]?.[y + 1] === letter) {
    directions.push("right-up");
  }

  return directions;
}

function getLetter(
  matrix: string[][],
  x: number,
  y: number,
  z: number,
  direction: string,
): string | undefined {
  if (direction === "up") {
    return matrix[x - z]?.[y];
  } else if (direction === "left-up") {
    return matrix[x - z]?.[y - z];
  } else if (direction === "left") {
    return matrix[x]?.[y - z];
  } else if (direction === "left-down") {
    return matrix[x + z]?.[y - z];
  } else if (direction === "down") {
    return matrix[x + z]?.[y];
  } else if (direction === "right-down") {
    return matrix[x + z]?.[y + z];
  } else if (direction === "right") {
    return matrix[x]?.[y + z];
  } else if (direction === "right-up") {
    return matrix[x - z]?.[y + z];
  } else {
    throw new Error("Invalid direction");
  }
}

// 1. Find the X
// 2. Find the direction by finding the next letter (M)
// 3. Check the remaining letters in the same direction
// 4. If all letters are found, increment the count

function main(input: string): number {
  let count = 0;
  const matrix = input.split("\r\n").map((row) => row.split(""));

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      const char = matrix[x][y];
      if (char !== "X") {
        continue;
      }

      const directions = getDirections(matrix, "M", x, y);
      if (directions.length === 0) {
        continue;
      }

      for (const direction of directions) {
        for (let z = 2; z < XMAS.length; z++) {
          const foundLetter = getLetter(matrix, x, y, z, direction);
          if (foundLetter !== XMAS[z]) {
            break;
          }

          if (z === XMAS.length - 1) {
            count += 1;
          }
        }
      }
    }
  }

  return count;
}

Deno.test("small example", async () => {
  const input = await Deno.readTextFile(`./src/days/4/smallExample.txt`);
  const result = main(input);
  assertEquals(result, 18);
});

Deno.test("example", async () => {
  const input = await getExample(4);
  const result = main(input);
  assertEquals(result, 18);
});

Deno.test("solve", async () => {
  const input = await getInput(4);
  const result = main(input);
  console.log(result);
});

// 2559 => too high
