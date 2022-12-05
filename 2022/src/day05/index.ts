import run from "aocrunner";

type Stack = string[];

type Procedure = {
  amount: number,
  start: number,
  destination: number
};

const getStacks = (input: string): Stack[] => {
  const lines = input.split('\n');
  const stacks = [];

  for (let charIndex = 1; charIndex < lines[0].length; charIndex += 4) {
    stacks.push([]);
    for (let lineIndex = 0; lineIndex < lines.length - 1; lineIndex++) {
      const crate = lines[lineIndex][charIndex];
      if (crate !== ' ') {
        stacks.at(-1).push(crate);
      }
    }
  }

  return stacks;
}

const getProcedures = (input: string): Procedure[] => input.split('\n')
  .map(line => line.split(' '))
  .map(parts => parts.filter((_, i) => i % 2 !== 0).map(s => parseInt(s)))
  .map(([amount, start, destination]) => ({
    amount, start: start - 1, destination: destination - 1
  }));


const parseInput = (rawInput: string): [Stack[], Procedure[]] => {
  const [stackPart, procedurePart] = rawInput.split('\n\n');
  return [getStacks(stackPart), getProcedures(procedurePart)];
}

const getTopCrates = (state: Stack[]): string =>
  state.map(stack => stack[0]).join('');

const moveCrates = (state: Stack[], procedures: Procedure[], reverseOrder: boolean) => {
  for (const { amount, start, destination } of procedures) {
    const crates = state[start].splice(0, amount);

    if (reverseOrder) {
      crates.reverse();
    }

    state[destination].unshift(...crates);
  }

  return state;
}

const part1 = (rawInput: string) =>
  getTopCrates(moveCrates(...parseInput(rawInput), true));


const part2 = (rawInput: string) =>
  getTopCrates(moveCrates(...parseInput(rawInput), false));

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
