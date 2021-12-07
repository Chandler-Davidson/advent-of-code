import { getInput, sum, memo } from 'utils';

function calcFuel(distance: string): number {
  let total = 0;
  let distanceNum = parseInt(distance)
  for (; distanceNum > 0; distanceNum--) {
    total += distanceNum;
  }

  return total;
}

const positions = getInput().split(',').map(n => parseInt(n));

const maxPosition = Math.max(...positions);
const memoedCalcFuel = memo(calcFuel);

const sumOfFuels = [];
for (let target = 0; target < maxPosition; target++) {
  const fuelUsed = [];
  for (const position of positions) {
    const distanceFromTarget = Math.abs(position - target);
    fuelUsed.push(memoedCalcFuel(distanceFromTarget.toString()));
  }

  sumOfFuels.push(sum(fuelUsed));
}

const minFuel = Math.min(...sumOfFuels);
const indexOfFuel = sumOfFuels.indexOf(minFuel);

console.log(`position: ${indexOfFuel}`);
console.log(`fuel used: ${minFuel}`);
