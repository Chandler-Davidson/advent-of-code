import { getInputLines, sum } from 'utils';

function findLowPoints(map: string[]) {
  const lowPoints = [];

  const lineLength = map[0].length;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < lineLength; j++) {
      const point = parseInt(map[i][j]);
      const surrounding = [];

      // 1 2 3
      // 4 X 5
      // 6 7 8

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
        lowPoints.push(point);
    }
  }

  return lowPoints;
}

function findRiskLevel(points: number[]): number {
  return sum(points) + points.length
}

const map = getInputLines();
const lowPoints = findLowPoints(map);
const riskLevel = findRiskLevel(lowPoints);

console.log(`risk: ${riskLevel}`);  