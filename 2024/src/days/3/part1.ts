import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

type Operator = 'mul';

type Operation = {
  operator: Operator;
  operands: [number, number];
}

// 1. Find valid operations
// 2. Compute operations and sum
function getOperations(input: string): Operation[] {
  const matches = [...input.matchAll(/(mul)\(([\d]{1,3}),([\d]{1,3})\)/g) ?? []];
  return matches.map(g => ({
    operator: g[1] as Operator,
    operands: [parseInt(g[2]), parseInt(g[3])]
  }));
}

function main(input: string): number {
  const operations = getOperations(input);
  return sum(operations.map(({ operator, operands }) => {
    switch (operator) {
      case 'mul':
        return operands[0] * operands[1];
    }
  }));
}

Deno.test("example", async () => {
  const input = await getExample(3);
  const result = main(input);
  assertEquals(result, 161);
});

Deno.test("solve", async () => {
  const input = await getInput(3);
  const result = main(input);
  console.log(result);
})