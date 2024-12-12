import { getExample, getInput, isEven } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 0: Replaced by 1
// even # of digits: split in half, remove leading 0s
// else: * 2024

function blink(stones: string[]): string[] {
  for (let i = 0; i < stones.length; i++) {
    const stone = Number(stones[i]).toString();

    if (stone === "0") {
      stones[i] = "1";
    } else if (isEven(stone.length)) {
      const left = stone.slice(0, stone.length / 2);
      const right = stone.slice(stone.length / 2);
      stones.splice(i, 1, left, right);
      i += 1;
    } else {
      stones[i] = (parseInt(stone) * 2024).toString();
    }
  }

  return stones;
}

function main(input: string, blinks: number): number {
  let stones = input.split(" ");
  for (let i = 0; i < blinks; i++) {
    stones = blink(stones);
  }

  return stones.length;
}

Deno.test("example1", async () => {
  const input = "0 1 10 99 999";
  const result = main(input, 1);
  assertEquals(result, 7);
});

Deno.test("example2", async () => {
  const input = "125 17";
  const result = main(input, 6);
  assertEquals(result, 22);
});

Deno.test("example2.1", async () => {
  const input = "125 17";
  const result = main(input, 25);
  assertEquals(result, 55312);
});

Deno.test("solve", async () => {
  // Oof ~5.4s
  const input = await getInput(11);
  const result = main(input, 25);
  console.log(result);
});
