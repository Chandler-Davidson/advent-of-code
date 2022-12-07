import run from "aocrunner";
import { sum } from "../utils/index.js";

function getDirectorySizes(lines: string[]) {
  const directorySizes = new Map();
  const directoryStack = [];
  for (const line of lines) {
    if (line[0] === "$") {
      const [_, command, dir] = line.split(" ");
      if (command === "cd") {
        if (dir === "..") {
          directoryStack.pop();
        } else {
          directoryStack.push(directoryStack.join("/") + dir);
        }
      }
    } else {
      const [sizeOrDir] = line.split(" ");
      if (sizeOrDir !== "dir") {
        const fileSize = parseInt(sizeOrDir);
        for (const dir of directoryStack) {
          directorySizes.set(dir, (directorySizes.get(dir) ?? 0) + fileSize);
        }
      }
    }
  }

  return directorySizes;
}

const part1 = (input: string) => {
  return sum([...getDirectorySizes(input.split("\n")).values()].filter((s) => s <= 100000));
};

const part2 = (input: string) => {
  const directories = getDirectorySizes(input.split("\n"));

  const diskSize = 70000000;
  const installSize = 30000000;
  const spaceUsed = directories.get("/");
  const spaceNeeded = installSize - (diskSize - spaceUsed);
  return Math.min(...[...directories.values()].filter((s) => s >= spaceNeeded));
};

run({
  part1: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        dir a
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k
        $ cd a
        $ ls
        1234 asdf.txt
        `,
        expected: 96671,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k
        `,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
