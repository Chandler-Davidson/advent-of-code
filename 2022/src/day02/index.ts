import run from "aocrunner";

type Abbreviation = "A" | "B" | "C" | "X" | "Y" | "Z";
type Throw = {
  name: "rock" | "paper" | "scissors";
  points: number;
};
type GameState = "win" | "loss" | "draw";

const State: Record<GameState, GameState> = {
  win: "win",
  loss: "loss",
  draw: "draw",
};
const stateToPoints: Record<GameState, number> = {
  win: 6,
  draw: 3,
  loss: 0,
};

const rock: Throw = { name: "rock", points: 1 };
const paper: Throw = { name: "paper", points: 2 };
const scissors: Throw = { name: "scissors", points: 3 };

const abbrevToThrow: Record<Abbreviation, Throw> = {
  A: rock,
  B: paper,
  C: scissors,
  X: rock,
  Y: paper,
  Z: scissors,
};
const abbrevToState: Record<"X" | "Y" | "Z", GameState> = {
  X: State.loss,
  Y: State.draw,
  Z: State.win,
};

const getGameState = ({ name: a }: Throw, { name: b }: Throw): GameState => {
  if (a === b) return State.draw;

  switch (a) {
    case "rock":
      return b === "paper" ? State.win : State.loss;
    case "paper":
      return b === "scissors" ? State.win : State.loss;
    case "scissors":
      return b === "rock" ? State.win : State.loss;
  }
};

const findThrowNeeded = ({ name, points }: Throw, gameState: GameState): Throw => {
  if (gameState === "draw") return { name, points };

  switch (name) {
    case "rock":
      return gameState === State.win ? abbrevToThrow["B"] : abbrevToThrow["C"];
    case "paper":
      return gameState === State.win ? abbrevToThrow["C"] : abbrevToThrow["A"];
    case "scissors":
      return gameState === State.win ? abbrevToThrow["A"] : abbrevToThrow["B"];
  }
};

const getScore = ([throw1, throw2]: Throw[]): number => {
  const points = stateToPoints[getGameState(throw1, throw2)];
  return points + throw2.points;
};

const parseInput = (rawInput: string): [Abbreviation, Abbreviation][] =>
  rawInput.split("\n").map((line) => line.split(" ")) as [Abbreviation, Abbreviation][];

const part1 = (rawInput: string) =>
  parseInput(rawInput).reduce((total, throws) => total + getScore(throws.map((t) => abbrevToThrow[t])), 0);

const part2 = (rawInput: string) =>
  parseInput(rawInput).reduce((total, [throw1, state]) => {
    const { points: throwPoints } = findThrowNeeded(abbrevToThrow[throw1], abbrevToState[state]);
    return total + stateToPoints[abbrevToState[state]] + throwPoints;
  }, 0);

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
