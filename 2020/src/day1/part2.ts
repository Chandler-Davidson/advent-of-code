import { getInput } from '../util';

export const solution = () => {
  const arr = getInput(__dirname).split('\n').map(l => parseInt(l));
  return findEntriesThatSum(arr, 2020)
  .reduce((acc, el) => acc * el, 1);
}

const findEntriesThatSum = (arr: number[], sum: number): [number, number, number] => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      for (let k = 2; k < arr.length; k++) {
        const left = arr[i];
        const middle = arr[j];
        const right = arr[k];

        if (left + middle + right === sum)
          return [left, middle, right];
      }
    }
  }

  return [0, 0, 0];
}

console.log(solution());