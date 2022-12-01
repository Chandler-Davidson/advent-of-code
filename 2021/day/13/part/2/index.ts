import { getInput, create2DArray } from 'utils';

type Grid = string[][];
type Fold = ['x' | 'y', number]
type Position = [number, number];

function getInputs(): [Position[], Fold[]] {
  const [positionLines, foldLines] = getInput().split('\r\n\r\n').map(section => section.split('\r\n'));
  const positions = positionLines.map(l => l.split(',').map(n => parseInt(n))) as Position[];
  const folds = foldLines.map(l => (l.split(' ').at(-1) ?? '').split('=')).map(([s, p]) => [s, parseInt(p)]) as Fold[];

  return [positions, folds];
}

function buildGrid(positions: Position[]): Grid {
  const maxWidth = Math.max(...positions.map(([p]) => p));
  const maxHeight = Math.max(...positions.map(([_, p]) => p));
  const grid = create2DArray([maxWidth, maxHeight], ' ');

  for (const [x, y] of positions) {
    grid[y][x] = '#';
  }

  return grid;
}

function applyFolds(positions: Position[], folds: Fold[]) {
  function horizontalFold(fold: number): Position[] {
    return positions.map(([x, y]) => {
      if (y < fold)
        return [x, y];

      return [x, fold - (y - fold)];
    });
  }

  function verticalFold(fold: number): Position[] {
    return positions.map(([x, y]) => {
      if (x < fold)
        return [x, y];

      return [fold - (x - fold), y];
    });
  }

  for (const [slope, position] of folds) {
    const foldFunc = slope == 'x' ? verticalFold : horizontalFold;
    positions = distinct(foldFunc(position));
  }

  return positions;
}

function distinct(positions: Position[]): Position[] {
  const serialized = positions.map(([x, y]) => x + ',' + y);
  const set = new Set(serialized);
  return [...set].map(p => p.split(',').map(c => parseInt(c))) as Position[];
}

const [positions, folds] = getInputs();
const origami = applyFolds(positions, folds);
const grid = buildGrid(origami);

for (const row of grid) {
  console.log(row.join(''))
}