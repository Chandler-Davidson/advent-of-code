import { chunk, getInputLines, sum } from "utils";

type board = {
  key: number;
  marked: boolean;
}[][];

function mapLinesToBoard(lines: string[]) {
  return lines.map((l) =>
    [...l.trim().split(/[\s]+/g)].map((c) => ({
      key: parseInt(c),
      marked: false,
    }))
  );
}

function getInputs(lines: string[]): [number[], board[]] {
  const draws = lines[0].split(",").map((d) => parseInt(d));
  const boardLines = lines.slice(2).filter((l) => l != "");
  const boards = chunk(boardLines, 5).map(mapLinesToBoard);
  return [draws, boards];
}

function findLastWinningBoard(
  draws: number[],
  boards: board[],
): [number, number] {
  function addDrawToBoards(draw: number) {
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      for (let j = 0; j < board.length; j++) {
        const row = board[j];
        for (let k = 0; k < row.length; k++) {
          const { key } = row[k];
          if (key == draw) {
            boards[i][j][k].marked = true;
          }
        }
      }
    }
  }

  const winningBoards: number[] = [];

  function checkForWinningBoard(): number[] {
    const newWinners: number[] = [];
    for (let i = 0; i < boards.length; i++) {
      if (winningBoards.includes(i)) {
        continue;
      }

      const board = boards[i];

      // Vertical check
      for (let j = 0; j < board.length; j++) {
        const row = board[j];

        let count = 0;
        for (let k = 0; k < row.length; k++) {
          const { marked } = row[k];

          if (marked) {
            count += 1;
          }

          if (count == 5) {
            newWinners.push(i);
          }
        }
      }

      if (newWinners.includes(i)) {
        continue;
      }

      // Horizontal check
      for (let j = 0; j < board.length; j++) {
        let count = 0;
        for (let k = 0; k < board.length; k++) {
          const { marked } = board[k][j];

          if (marked) {
            count += 1;
          }

          if (count == 5) {
            newWinners.push(i);
          }
        }
      }
    }

    return newWinners;
  }

  function playGame(): [number, number] {
    for (const draw of draws) {
      addDrawToBoards(draw);

      winningBoards.push(...checkForWinningBoard());
      if (winningBoards.length == boards.length) {
        return [draw, winningBoards.at(-1) as number];
      }
    }

    throw "Entering the danger zone ⚠, prepare for the unexpected";
  }

  return playGame();
}

function findScore(lastDraw: number, board: board) {
  const unmarkedSum = sum(
    board.flatMap((r) => r).map(({ key, marked }) => marked ? 0 : key),
  );

  return [unmarkedSum, lastDraw * unmarkedSum];
}

const [draws, boards] = getInputs(getInputLines());
const [lastDraw, boardIndex] = findLastWinningBoard(draws, boards);
const [unmarkedSum, score] = findScore(lastDraw, boards[boardIndex]);
console.log(`last draw: ${lastDraw}, winning board: ${boardIndex}`);
console.log(`unmarkedSum: ${unmarkedSum}, score: ${score}`);
