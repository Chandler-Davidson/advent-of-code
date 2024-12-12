import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 1. Create two lists
// 2. For each number in the left list,
  // 2.1 Count # of times it appears in the right list
  // 2.2 Left number * the count
// 3. Sum

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

function countOccurrences(list: number[]): Map<number, number> {
  return list.reduce((acc, number) => {
    acc[number] = (acc[number] || 0) + 1;
    return acc;
  }, {} as Map<number, number>);
}

function main(input: string): number {
  const [left, right] = getLists(input);
  const rightOccurrences = countOccurrences(right);
  const similarityScores = left.map((number) => number * (rightOccurrences[number] || 0));

  return sum(similarityScores);
}

Deno.test("example", async () => {
  const input = await getExample(1);
  const result = main(input);
  assertEquals(result, 31);
});

Deno.test("solve", async () => {
  const input = await getInput(1);
  const result = main(input);
  console.log(result);
})