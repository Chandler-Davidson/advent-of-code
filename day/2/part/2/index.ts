import { getInputLines } from '/utils/index.ts';

type orientation = 'forward' | 'down' | 'up';
type direction = {
  orientation: orientation,
  amount: number
};


function main(lines: string[]) {
  let x = 0;
  let y = 0;
  let aim = 0;
  const mappings = {
    'forward': (amount: number) => {
      x += amount;
      y += aim * amount;
    },
    'down': (amount: number) => aim += amount,
    'up': (amount: number) => aim -= amount
  };

  for (const {orientation, amount} of lines.map(parseDirection)) {
    mappings[orientation](amount);
  }

  return [x, y];
}

function parseDirection(line: string): direction {
  const [orientation, amount] = line.split(' ');
  return {
    orientation: (orientation as orientation),
    amount: parseInt(amount)
  };
}

const [x, y] = main(getInputLines());
console.log(`x: ${x}, y: ${y}`);
console.log(`x * y: ${x * y}`);