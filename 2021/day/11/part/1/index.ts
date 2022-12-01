import { getInputGrid } from "utils";

type Position = [number, number];

function simulateSteps(grid: number[][], steps: number): number {
  let totalFlashes = 0;

  for (let i = 0; i < steps; i++) {
    const flashedPositions = new Set<string>();

    // This is bad, but needs access to flashedPositions
    // Instead of fixing, I'm going to hangout with Jules
    // deno-lint-ignore no-inner-declarations
    function flash(position: Position): void {
      const [x, y] = position;

      if (flashedPositions.has(`${x},${y}`)) {
        return;
      }

      grid[x][y] = 0;
      flashedPositions.add(`${x},${y}`);

      const left = y > 0 ? [x, y - 1] : null;
      const right = y < grid[0].length - 1 ? [x, y + 1] : null;
      const top = x > 0 ? [x - 1, y] : null;
      const bottom = x < grid.length - 1 ? [x + 1, y] : null;
      const topLeft = top && left ? [x - 1, y - 1] : null;
      const topRight = top && right ? [x - 1, y + 1] : null;
      const bottomLeft = bottom && left ? [x + 1, y - 1] : null;
      const bottomRight = bottom && right ? [x + 1, y + 1] : null;

      const validPositions = [
        left,
        right,
        top,
        bottom,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
      ].filter((p) => p) as Position[];
      for (const [x, y] of validPositions) {
        if (flashedPositions.has(`${x},${y}`)) continue;

        grid[x][y] += 1;
        const energy = grid[x][y];
        if (energy > 9) {
          flash([x, y]);
        }
      }
    }

    // increment all
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] += 1;
      }
    }

    // Run flashes
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const energy = grid[i][j];

        if (energy > 9) {
          flash([i, j]);
        }
      }
    }

    totalFlashes += flashedPositions.size;
  }

  return totalFlashes;
}

const numberGrid = getInputGrid().map((r) => r.map((c) => parseInt(c)));
const total = simulateSteps(numberGrid, 100);
console.log(total);
