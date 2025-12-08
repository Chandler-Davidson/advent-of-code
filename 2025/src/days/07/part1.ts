import fs from 'fs';

async function main() {
    // const map = getInput('example.txt');
    const map = getInput('input.txt');

    let beamSplitCount = 0;
    const startPoint = map[0]!.indexOf('S');
    let beamIndicies = [startPoint];

    for (let i = 0; i < map.length - 1; i++) {
        const newBeamIndicies = [];

        for (const j of beamIndicies) {
            const nextSpot = map[i + 1]![j]!;

            if (nextSpot === '.') {
                map[i + 1]![j] = '|';
                newBeamIndicies.push(j);
            } else if (nextSpot === '^') {
                newBeamIndicies.push(j - 1)
                newBeamIndicies.push(j + 1)
                map[i + 1]![j - 1] = '|';
                map[i + 1]![j + 1] = '|';


                beamSplitCount += 1;
            } else if (nextSpot === '|') {
                // Do nothing
            }
        }

        beamIndicies = newBeamIndicies;
    }

    console.log(`Beam split ${beamSplitCount} times`);
}

function getInput(fileName: string): string[][] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    const lines = rawInput.split('\n');
    return lines.map(l => l.split(''));
}

main();