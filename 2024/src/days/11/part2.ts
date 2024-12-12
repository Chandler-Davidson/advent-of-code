import { getExample, getInput, isEven, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 0: Replaced by 1
// even # of digits: split in half, remove leading 0s
// else: * 2024

// Instead of individual instances, count occurrences. Order doesn't matter
function blink(stones: Map<string, number>): Map<string, number> {
  const newStones = new Map<string, number>();

  for (const [carving, quantity] of stones.entries()) {
    if (carving === "0") {
      newStones.set("1", (newStones.get("1") ?? 0) + quantity);
    } else if (isEven(carving.length)) {
      const middle = carving.length / 2;
      const [left, right] = [carving.slice(0, middle), carving.slice(middle)]
        .map((c) => Number(c).toString());

      newStones.set(left, (newStones.get(left) ?? 0) + quantity);
      newStones.set(right, (newStones.get(right) ?? 0) + quantity);
    } else {
      const newCarving = (Number(carving) * 2024).toString();
      newStones.set(newCarving, (newStones.get(newCarving) ?? 0) + quantity);
    }
  }

  return newStones;
}

function main(input: string, blinks: number): number {
  let stones = new Map(input.split(" ").map((stone) => [stone, 1]));

  for (let i = 0; i < blinks; i++) {
    stones = blink(stones);
  }

  return sum([...stones.values().map(Number)]);
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
  // 43.494299999999996 ms
  const start = performance.now();
  const input = await getInput(11);
  const result = main(input, 75);

  console.log(result);
  const end = performance.now();
  console.log("Duration:", end - start, "ms");
});
