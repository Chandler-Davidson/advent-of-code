import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 1. Convert each update into a map of value => index
// 2. Validate each rule by comparing index of each value
// 3. Return the middle page of each valid rule

function isValidUpdate(
  rules: [number, number][],
  update: number[],
): boolean {
  const updateMap = new Map<number, number>(
    update.map((value, index) => [value, index]),
  );

  for (const [first, second] of rules) {
    const firstIndex = updateMap.get(first);
    const secondIndex = updateMap.get(second);

    if (firstIndex === undefined || secondIndex === undefined) {
      continue;
    }

    if (firstIndex > secondIndex) {
      return false;
    }
  }

  return true;
}

function makeUpdateValid(
  rules: [number, number][],
  update: number[],
): number[] {
  const updateMap = new Map<number, number>(
    update.map((value, index) => [value, index]),
  );

  for (const [first, second] of rules) {
    const firstIndex = updateMap.get(first);
    const secondIndex = updateMap.get(second);

    if (firstIndex === undefined || secondIndex === undefined) {
      continue;
    }

    if (firstIndex > secondIndex) {
      update[update.indexOf(first)] = second;
      update[update.indexOf(second)] = first;
    }
  }

  return update;
}

function main(input: string): number {
  const sections = input.split("\r\n\r\n");
  const rules = sections[0].split("\r\n").map((line) =>
    line.split("|").map(Number)
  ) as [number, number][];
  const updates = sections[1].split("\r\n").map((line) =>
    line.split(",").map(Number)
  ) as number[][];

  const invalidUpdates = updates.filter((u) => !isValidUpdate(rules, u));
  const newUpdates = invalidUpdates.map((u) => {
    while (!isValidUpdate(rules, u)) {
      makeUpdateValid(rules, u);
    }

    return u;
  });
  const middlePages = newUpdates.map((u) => u[Math.floor(u.length / 2)]);

  return sum(middlePages);
}

Deno.test("example", async () => {
  const input = await getExample(5);
  const result = main(input);
  assertEquals(result, 123);
});

Deno.test("solve", async () => {
  const input = await getInput(5);
  const result = main(input);
  console.log(result);
});

// 5511 => too high
