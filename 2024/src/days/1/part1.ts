import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 1. Create two lists
// 2. Sort the lists
// 3. Find the distance between each pair
// 4. Sum

function getLists(input: string): number[][] {
  const left: number[] = [];
  const right: number[] = [];

  input.split('\r\n').forEach((line) => {
    const [a, b] = line.split(/[^\w]+/);
    left.push(parseInt(a));
    right.push(parseInt(b));
  });

  return [left, right];
}

function main(input: string): number {
  const lists = getLists(input);
  const sortedLists = lists.map((list) => list.sort((a, b) => a - b));
  const distances = sortedLists[0].map((_, index) => {
    return Math.abs(sortedLists[0][index] - sortedLists[1][index]);
  });
  return sum(distances);
}

Deno.test("example", async () => {
  const input = await getExample(1);
  const result = main(input);
  assertEquals(result, 11);
});

Deno.test("solve", async () => {
  const input = await getInput(1);
  const result = main(input);
  console.log(result);
})