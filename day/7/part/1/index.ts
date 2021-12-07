import { getInput, sum, median } from 'utils';

const positions = getInput().split(',').map(n => parseInt(n));
const medianPosition = median(positions);
const distancesFromAverage = positions.map(p => Math.abs(medianPosition - p));
const fuelSpent = sum(distancesFromAverage);

console.log(`average position: ${medianPosition}`);
console.log(`total fuel: ${fuelSpent}`);