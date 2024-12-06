import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

type Operator = "mul";

type Operation = {
  operator: Operator;
  operands: [number, number];
};

// 1. Find valid operations
  // 2. Filter if prefaced by don't()
// 2. Compute operations and sum
function getOperations(input: string): Operation[] {
  const enablers = [...input.matchAll(/don't\(\)|do\(\)/g)].reverse();
  const operations = [
    ...input.matchAll(/(mul)\(([\d]{1,3}),([\d]{1,3})\)/g) ?? [],
  ];

  return operations.filter((op) => {
    const lastEnabler = enablers.find((e) => e.index < op.index);
    return lastEnabler === undefined || lastEnabler?.[0] === "do()";
  }).map((g) => ({
    operator: g[1] as Operator,
    operands: [parseInt(g[2]), parseInt(g[3])],
  }));
}

function main(input: string): number {
  const operations = getOperations(input);
  return sum(operations.map(({ operator, operands }) => {
    switch (operator) {
      case "mul":
        return operands[0] * operands[1];
    }
  }));
}

Deno.test("example", async () => {
  const input =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
  const result = main(input);
  assertEquals(result, 48);
});

Deno.test("solve", async () => {
  const input = await getInput(3);
  const result = main(input);
  console.log(result);
});

// 101195306 => too high
