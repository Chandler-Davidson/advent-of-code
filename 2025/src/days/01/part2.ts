import fs from 'fs';

async function main() {
    // const rotations = getInput('example.txt');
    const rotations = getInput('input.txt');

    let timeHitZero = 0;
    rotations.reduce((dial, {direction, degrees}) => {
        timeHitZero += Math.trunc(degrees / 100);

        if (direction === 'L') {
            if (dial != 0 && dial - (mod(degrees, 100)) < 0) {
                timeHitZero++;
            }
            dial -= degrees;
        } else {
            if (dial + (mod(degrees, 100)) > 100) {
                timeHitZero++;
            }
            dial += degrees;
        }

        dial = mod(dial, 100);
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

function mod(a: number, b: number) {
    return ((a % b) + b) % b;
}