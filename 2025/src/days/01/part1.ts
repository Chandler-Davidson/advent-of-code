import fs from 'fs';

async function main() {
    // const rotations = getInput('example.txt');
    const rotations = getInput('input.txt');

    let timeHitZero = 0;
    rotations.reduce((dial, {direction, degrees}) => {
        dial += direction === 'L' ? -degrees : degrees;
        dial = (dial + 100) % 100;

        if (dial === 0) {
            timeHitZero++;
        }

        console.log(`Rotated ${direction}${degrees}, new position: ${dial}`);

        return dial;
    }, 50);

    console.log(`Times hit zero: ${timeHitZero}`);
}

type Rotation = {
    direction: 'L' | 'R';
    degrees: number;
}

function getInput(fileName: string): Rotation[] { 
const rawInput = fs.readFileSync(fileName, 'utf-8');
    return rawInput.split('\n').map(line => {
        const direction = line.charAt(0) as 'L' | 'R';
        const degrees = parseInt(line.slice(1), 10);
        return { direction, degrees };
    });
}

main();