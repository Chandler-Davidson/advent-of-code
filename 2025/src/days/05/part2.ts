import fs from 'fs';

async function main() {
    // let ranges = getInput('example.txt');
    let ranges = getInput('input.txt');

    ranges = sortRanges(ranges);
    ranges = consolidateRanges(ranges);

    const total = ranges.reduce((acc, range) => acc + (range[1] - range[0]) + 1, 0);

    console.log(`# of fresh Ids: ${total}`)
}

function sortRanges(ranges: Range[]): Range[] {
    return ranges.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }

        return a[0] - b[0];
    });
}

function consolidateRanges(ranges: Range[]): Range[] {
    const result: Range[] = [ranges[0]!];

    for (let i = 1; i < ranges.length; i++) {
        const currentRange = ranges[i]!;
        const lastRangeInResult = result[result.length - 1]!;

        // Check for overlap
        // Current start <= last end && current end > last start
        if (currentRange[0] <= lastRangeInResult[1] && currentRange[1] > lastRangeInResult[0]) {
            // Merge ranges
            lastRangeInResult[1] = Math.max(lastRangeInResult[1], currentRange[1]);
        } else {
            result.push(currentRange);
        }
    }

    return result;
}

type Range = [number, number];

function getInput(fileName: string): Range[] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');

    const [rangeLines] = rawInput.split('\n\n');
    const ranges = rangeLines?.split('\n').map(line => line?.split('-').map(Number)) as [number, number][];

    return ranges;
}

main();