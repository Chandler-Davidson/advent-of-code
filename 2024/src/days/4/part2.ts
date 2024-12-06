import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 1. Find the center of the X (A)
// 2. Check one corner for an M, opposite corner for an S
// 3. Do the same for the opposite diagonal
// 4. Increment the count

function main(input: string): number {
  let count = 0;
  const matrix = input.split("\r\n").map((row) => row.split(""));

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      const char = matrix[x][y];
      if (char !== "A") {
        continue;
      }

      const topLeft = matrix[x - 1]?.[y - 1];
      const topRight = matrix[x - 1]?.[y + 1];
      const bottomLeft = matrix[x + 1]?.[y - 1];
      const bottomRight = matrix[x + 1]?.[y + 1];
      if (
        ((topLeft === "M" && bottomRight === "S") ||
          (topLeft === "S" && bottomRight === "M")) &&
        ((topRight === "M" && bottomLeft === "S") ||
          (topRight === "S" && bottomLeft === "M"))
      ) {
        count += 1;
      }
    }
  }

  return count;
}

Deno.test("small example", async () => {
  const input = await Deno.readTextFile(`./src/days/4/smallExample1.txt`);
  const result = main(input);
  assertEquals(result, 1);
});

Deno.test("example", async () => {
  const input = await Deno.readTextFile(`./src/days/4/example1.txt`);
  const result = main(input);
  assertEquals(result, 9);
});

Deno.test("solve", async () => {
  const input = await getInput(4);
  const result = main(input);
  console.log(result);
});

// 2559 => too high
