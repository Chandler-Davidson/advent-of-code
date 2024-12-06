import { getInput } from '../util';

export const solution = () => {
  const arr = getInput(__dirname).split('\n').map(l => parseInt(l));
  return findEntriesThatSum(arr, 2020)
    .reduce((acc, el) => acc * el, 1);
}

const findEntriesThatSum = (arr: number[], sum: number): [number, number] => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      const left = arr[i];
      const right = arr[j];

      if (left + right === sum)
        return [left, right];
    }
  }

  return [-1, -1];
}

console.log(solution());