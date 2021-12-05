import { getInputLines } from 'utils';

type orientation = 'forward' | 'down' | 'up';
type direction = {
  orientation: orientation,
  amount: number
};


function main(lines: string[]) {
  let x = 0;
  let y = 0;
  const mappings = {
    'forward': (amount: number) => x += amount,
    'down': (amount: number) => y += amount,
    'up': (amount: number) => y -= amount
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