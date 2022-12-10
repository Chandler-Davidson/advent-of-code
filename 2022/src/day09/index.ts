import run from "aocrunner";

type Move = [Direction, number];

type Direction = "U" | "D" | "L" | "R";

type Position = {
  x: number;
  y: number;
};

const parseInput = (rawInput: string): Move[] =>
  rawInput.split("\n").map((line) => {
    const [direction, amount] = line.split(" ");
    return [direction as Direction, parseInt(amount)];
  });

function moveDirection(position: Position, direction: Direction) {
  switch (direction) {
    case "U":
      position.y += 1;
      break;
    case "D":
      position.y -= 1;
      break;
    case "L":
      position.x -= 1;
      break;
    case "R":
      position.x += 1;
  }
}

function isTouching(knot1: Position, knot2: Position) {
  let dx = Math.abs(knot1.x - knot2.x);
  let dy = Math.abs(knot1.y - knot2.y);

  return dx <= 1 && dy <= 1;
}
function moveKnot(knot1: Position, knot2: Position) {
  let newCoords = { ...knot2 };
  let dx = knot2.x - knot1.x;
  let dy = knot2.y - knot1.y;

  if (dx > 0) newCoords.x--;
  else if (dx < 0) newCoords.x++;
  if (dy > 0) newCoords.y--;
  else if (dy < 0) newCoords.y++;

  return newCoords;
}

function findPositionsVisited(moves: Move[], knotCount: number) {
  const visitedPositions = new Set(["0,0"]);
  const positions = new Array(knotCount).fill(0).map(() => ({ x: 0, y: 0 }));

  for (const [direction, amount] of moves) {
    for (let i = 0; i < amount; i++) {
      moveDirection(positions[0], direction);

      for (let j = 1; j < positions.length; j++) {
        if (!isTouching(positions[j - 1], positions[j])) {
          positions[j] = moveKnot(positions[j - 1], positions[j]);
        }
      }

      visitedPositions.add(`${positions.at(-1).x},${positions.at(-1).y}`);
    }
  }

  return visitedPositions;
}

const part1 = (rawInput: string) => findPositionsVisited(parseInput(rawInput), 2).size;

const part2 = (rawInput: string) => findPositionsVisited(parseInput(rawInput), 10).size;

run({
  part1: {
    tests: [
      {
        input: `
        R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        R 5
        U 8
        L 8
        D 3
        R 17
        D 10
        L 25
        U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
