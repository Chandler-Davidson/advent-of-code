const text = await Deno.readTextFile("./input.txt");

const depths = text
  .split('\n')
  .map(l => parseInt(l));

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

const groupBy = (arr: number[], length: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr.slice(i, i + length));
  }

  return result;
}

const sum = (arr: number[]) => arr.reduce((acc, el) => acc + el, 0);

const groupSums = groupBy(depths, 3)
  .map(g => sum(g));

console.log(countIncreases(groupSums));