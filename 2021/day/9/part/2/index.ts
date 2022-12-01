import { getInputLines, sort } from 'utils';

type Point = [number, number];

type Side = {
  height: string,
  i: number,
  j: number
};

function findLowPoints(map: string[]): Point[] {
  const lowPoints = [];

  const lineLength = map[0].length;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < lineLength; j++) {
      const point = parseInt(map[i][j]);
      const surrounding = [];

      if (i > 0) {
        surrounding.push(map[i - 1][j]);
      }

      if (i < map.length - 1) {
        surrounding.push(map[i + 1][j]);
      }

      if (j > 0)
        surrounding.push(map[i][j - 1]);
      if (j < lineLength - 1)
        surrounding.push(map[i][j + 1]);

      const min = Math.min(...surrounding.map(n => parseInt(n)));
      if (point < min)
        lowPoints.push([i, j]);
    }
  }

  return lowPoints as Point[];
}

function findBasinSize(map: string[], lowPoint: Point): number {
  const visitedPoints: Set<string> = new Set();
  const side = (i: number, j: number) => ({ height: map[i][j], i, j });

  function findSurroundingHigherPoints([i, j]: Point) {
    if (visitedPoints.has(i + ',' + j))
      return;

    visitedPoints.add(i + ',' + j);

    const left = j > 0 ? side(i, j - 1) : null;
    const right = j < map[0].length - 1 ? side(i, j + 1) : null;
    const top = i > 0 ? side(i - 1, j) : null;
    const bottom = i < map.length - 1 ? side(i + 1, j) : null;

    const higherSides = [left, right, top, bottom]
      .filter(s => s && parseInt(s.height) > parseInt(map[i][j]) && s.height !== '9') as Side[];

    for (const { i, j } of higherSides) {
      findSurroundingHigherPoints([i, j]);
    }
  }

  findSurroundingHigherPoints(lowPoint);
  return visitedPoints.size;
}

const grid = getInputLines();
const basinSizes = findLowPoints(grid).map(p => findBasinSize(grid, p));
const largestBasinSizes = sort(basinSizes, (a, b) => b - a).slice(0, 3);
const product = largestBasinSizes.reduce((acc, el) => acc * el, 1);

console.log(`product: ${product}`);