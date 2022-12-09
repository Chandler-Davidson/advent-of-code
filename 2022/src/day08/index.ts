import run from "aocrunner";

const part1 = (rawInput: string) => {
  const lines = rawInput.split("\n");
  const length = lines[0].length;
  let total = length * 4 - 4;

  for (let i = 1; i < length - 1; i++) {
    for (let j = 1; j < length - 1; j++) {
      const treeHeight = parseInt(lines[i][j]);
      const up = lines.slice(0, i).map((l) => l[j]);
      const down = lines.slice(i + 1).map((l) => l[j]);
      const left = lines[i].slice(0, j).split("");
      const right = lines[i].slice(j + 1).split("");

      const directions = [up, down, left, right];
      if (directions.some((d) => d.every((height) => parseInt(height) < treeHeight))) {
        total += 1;
      }
    }
  }

  return total;
};

const part2 = (rawInput: string) => {
  const lines = rawInput.split("\n");
  const length = lines[0].length;
  const scores = [];

  for (let i = 1; i < length - 1; i++) {
    for (let j = 1; j < length - 1; j++) {
      const treeHeight = parseInt(lines[i][j]);
      const up = lines
        .slice(0, i)
        .map((l) => l[j])
        .reverse();
      const down = lines.slice(i + 1).map((l) => l[j]);
      const left = lines[i].slice(0, j).split("").reverse();
      const right = lines[i].slice(j + 1).split("");

      const directions = [up, down, left, right];
      const viewingDistances = directions.map((dir) => {
        let directionScore = 0;
        for (let height of dir) {
          directionScore += 1;
          if (parseInt(height) >= treeHeight) {
            break;
          }
        }

        return directionScore;
      });

      const scenicScore = viewingDistances.reduce((acc, s) => acc * s, 1);
      scores.push(scenicScore);
    }
  }

  return Math.max(...scores);
};

run({
  part1: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
