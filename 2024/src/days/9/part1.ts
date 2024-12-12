import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 12345 => 0..111....22222
// [
//   { id: 0, size: 1 }
//   // 2 blocks free
//   { id: 1, size: 3 },
//   // 4 blocks free
//   { id: 2, size: 5 }
// ]

// 1. Take the right most file blocks and fill the empty space from left to right
// 12345 => 0..111....22222
// () =>    022111222......

// 2. Calculate filesystem checksum => sum(block ID * block position)

function expandBlocks(blocks: string[]): string[] {
  const expanded: string[] = [];

  for (let i = 0; i < blocks.length; i++) {
    if (i % 2 === 0) {
      expanded.push((i / 2).toString().repeat(Number(blocks[i])));
    } else {
      expanded.push(".".repeat(Number(blocks[i])));
    }
  }

  return expanded.join("").split("");
}

function sortBlocks(blocks: string[]): string[] {
  let lPointer = 0;
  for (let rPointer = blocks.length - 1; rPointer > 0; rPointer--) {
    if (lPointer === rPointer) {
      return blocks;
    }

    const left = blocks[lPointer];
    const right = blocks[rPointer];

    if (right === ".") {
      continue;
    }

    // Skip empty blocks
    if (left !== ".") {
      lPointer++;
      rPointer++;
      continue;
    }

    blocks[lPointer] = right;
    blocks[rPointer] = ".";

    lPointer++;
  }

  return blocks;
}

function checksum(blocks: string[]): number {
  return sum(
    blocks
      .filter((block) => block !== ".")
      .map((block, index) => Number(block) * index),
  );
}

function main(input: string): number {
  const expanded = expandBlocks(input.split(""));
  const sorted = sortBlocks(expanded);
  const sum = checksum(sorted);

  return sum;
}

Deno.test("small example", () => {
  const input = "12345";
  const result = main(input);
  assertEquals(result, 60);
});

Deno.test("example", async () => {
  const input = await getExample(9);
  const result = main(input);
  assertEquals(result, 1928);
});

Deno.test("solve", async () => {
  const input = await getInput(9);
  const result = main(input);
  console.log(result);
});

// 89813169309 => too low