import { getInput, range, sum } from 'utils';

const initialFish = getInput().split(',').map(f => parseInt(f));
const fishCount = range(9).map(() => 0);

// Fill fish
for (const fish of initialFish) {
  fishCount[fish] += 1;
}

// Simualte days
for (let i = 1; i <= 256; i++) {
  const zeros = fishCount[0];

  for (let i = 0; i < 8; i++) {
    fishCount[i] = fishCount[i + 1];
  }

  fishCount[6] += zeros;
  fishCount[8] = zeros;
}

console.log(`fish: ${sum(fishCount)}`);