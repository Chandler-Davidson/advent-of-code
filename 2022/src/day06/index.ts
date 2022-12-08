import run from "aocrunner";

const findMarker = (input: string, length: number) => {
  for (let i = 0; i < input.length - 4; i++) {
    const str = input.slice(i, i + length);
    const unique = new Set([...str]);
    if (unique.size === length)
      return i + length;
  }
}

const part1 = (rawInput: string) => findMarker(rawInput, 4);

const part2 = (rawInput: string) => findMarker(rawInput, 14);

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
