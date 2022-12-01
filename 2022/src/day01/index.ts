import run from "aocrunner";
import { sortDescending, sum } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput.split('\n\n').map(line => line.split('\n')).map(sum);

const part1 = (rawInput: string) => {
  const elfCalories = parseInput(rawInput);
  return Math.max(...elfCalories);
};

const part2 = (rawInput: string) => {
  const elfCalories = parseInput(rawInput);
  return sum(sortDescending(elfCalories).slice(0, 3));
};


run({
  part1: {
    tests: [
      {
        input:
          `
          1000
          2000
          3000
          
          4000
          
          5000
          6000
          
          7000
          8000
          9000
          
          10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input:
          `
          1000
          2000
          3000
          
          4000
          
          5000
          6000
          
          7000
          8000
          9000
          
          10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
