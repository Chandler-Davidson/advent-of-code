import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// 1. Filter the equations that have valid solutions
// 2.1. Create an array of each possible variation of the equation
// 2. Sum the solutions

type Equation = {
  solution: number;
  operands: string[];
};

function main(input: string): number {
  const equations = input.split("\r\n").map((line) => {
    const parts = line.split(": ");
    return {
      solution: Number(parts[0]),
      operands: parts[1].split(" "), //.map(Number),
    } as Equation;
  });

  const validEquations = equations.filter((equation) => {
    const perm = [...permutate(["+", "*"], equation.operands.length - 1)];
    for (const p of perm) {
      if (isValid(equation, p)) {
        return true;
      }
    }

    return false;
  });

  return sum(validEquations.map((e) => e.solution));
}

function* permutate<T>(items: T[], count: number) {
  yield* req([]);

  function* req(array: T[]): Generator<T[], void, unknown> {
    if (array.length == count) {
      yield array;
      return;
    }
    for (const item of items) {
      yield* req(array.concat(item));
    }
  }
}

function isValid(equation: Equation, operators: string[]): boolean {
  let equationStr = "(".repeat(equation.operands.length - 1) +
    equation.operands[0];

  for (let i = 0; i < operators.length; i++) {
    equationStr += ` ${operators[i]} ${equation.operands[i + 1]})`;
  }

  // Javascript go brrrr...
  return eval(equationStr) === equation.solution;
}

Deno.test("example", async () => {
  const input = await getExample(7);
  const result = main(input);

  assertEquals(result, 3749);
});

Deno.test("solve", async () => {
  const input = await getInput(7);
  const result = main(input);
  console.log(result);
});
