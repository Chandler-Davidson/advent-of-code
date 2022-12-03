import run from "aocrunner";
import { groupBy, intersection, sum } from "../utils/index.js";

const isLowerCase = (letter: string) => {
  return letter.toLowerCase() === letter;
};

const getPriority = (letter: string): number => {
  const shift = isLowerCase(letter) ? 96 : 38;
  return letter.charCodeAt(0) - shift;
};

const part1 = (rawInput: string) => {
  const knapsacks = rawInput.split("\n").map((line) => {
    const middle = line.length / 2;
    return [line.slice(0, middle), line.slice(middle)];
  });

  return sum(knapsacks.map((compartments) => getPriority(intersection(...compartments)[0])));
};

const part2 = (rawInput: string) => {
  const groups = groupBy(rawInput.split("\n"), 3);
  sum(groups.map((group) => getPriority(intersection(...group)[0])));
};

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
