import { sum, getInputNumbers } from '/utils/index.ts';

function countIncreases(arr: number[]) {
  let total = 0;
  for (let i = 1; i < arr.length; i++) {
    const prev = arr[i - 1];
    const curr = arr[i];

    if (curr > prev)
      total += 1;
  }

  return total;
}

const groupBy = (arr: number[], length: number) =>
  arr.reduce((acc, _, i, arr) => [...acc, arr.slice(i, i + length)], [] as number[][]);

const groupSums = groupBy(getInputNumbers(), 3).map(g => sum(g));

console.log(countIncreases(groupSums));