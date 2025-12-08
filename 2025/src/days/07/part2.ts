import fs from 'fs';

async function main() {
    // const map = getInput('example.txt');
    const map = getInput('input.txt');

    let beams: Record<number, number> = { [ map[0]!.indexOf('S')]: 1 };
    const lines = map.filter(l => l.some(c => c === '^'));
    for (const line of lines) {
        const newBeams: Record<number, number> = {};

        for (const [i, count] of Object.entries(beams)) {
            const index = Number(i);
            if (line[index] === '^') {
                newBeams[index - 1] =  (newBeams[index - 1] || 0) + count;
                newBeams[index + 1] = (newBeams[index + 1] || 0) + count;
                
            } else {
                newBeams[index] = (newBeams[index] || 0) + count;
            }
        }

        beams = newBeams;
    }

    const beamCount = Object.values(beams).reduce((a, b) => a + b, 0);
    console.log(`# of beams: ${beamCount}`);
}

function getInput(fileName: string): string[][] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    const lines = rawInput.split('\n');
    return lines.map(l => l.split(''));
}

main();