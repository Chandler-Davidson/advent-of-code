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

console.log(countIncreases(depths))