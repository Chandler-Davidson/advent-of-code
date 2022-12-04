import run from "aocrunner";
import { count } from "../utils/index.js";

type Range = [number, number];

const getPairs = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.split(",").map((pair) => pair.split("-").map((n) => parseInt(n)))) as Range[][];

const isDuplicated = ([a, b]: Range[]) => (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);

const hasOverlap = ([a, b]: Range[]) => (a[0] <= b[0] && a[1] >= b[0]) || (b[0] <= a[0] && b[1] >= a[0]);

const part1 = (rawInput: string) => count(getPairs(rawInput), isDuplicated);

const part2 = (rawInput: string) => count(getPairs(rawInput), hasOverlap);

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
