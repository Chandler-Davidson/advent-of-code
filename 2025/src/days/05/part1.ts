import fs from 'fs';

async function main() {
    // const { ranges, ids } = getInput('example.txt');
    const { ranges, ids } = getInput('input.txt');
    
    const freshIds = ids.filter(id => isFresh(ranges, id));
    console.log(`# of fresh Ids: ${freshIds.length}`)
}

function isFresh(ranges: Range[], id: number) {
    for (const [start, end] of ranges) {
        if (id >= start && id <= end) {
            return true;
        }
    }

    return false;
}

type Range = [number, number];

function getInput(fileName: string): {ranges: Range[], ids: number[]} {
    const rawInput = fs.readFileSync(fileName, 'utf-8');

    const [rangeLines, idLines] = rawInput.split('\n\n');
    const ranges = rangeLines?.split('\n').map(line => line?.split('-').map(Number)) as [number, number][];
    const ids = idLines?.split('\n').map(Number) as number[];

    return {ranges, ids};
}

main();