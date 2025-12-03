import fs from 'fs';

// CSV of ranges
// 11-22, 95-115
// Invalid IDs are repeating digits: 55, 6464, 123123

async function main() {
    // const ranges = getInput('example.txt');
    const ranges = getInput('input.txt');

    const repeatingInvalidIds = [];
    for (const [start, end] of ranges) {
        for (let i = start; i <= end; i++) {
            if (hasRepeatedDigits(i)) {
                console.log(`Invalid ID: ${i}`)
                repeatingInvalidIds.push(i);
            }
        }
    }

    console.log(`Sum of IDs: ${sum(repeatingInvalidIds)}`);
}

function sum(arr: number[]) {
    return arr.reduce((acc, el) => acc + el, 0);
}

function hasRepeatedDigits(n: number) {
    const str = n.toString();

    if (str.length % 2 !== 0) {
        return false;
    }

    const midpoint = str.length / 2;
    const front = str.slice(0, midpoint);
    const end = str.slice(midpoint);
    return front === end;
}

type Range = [number, number];

function getInput(fileName: string): Range[] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    return rawInput.split(',').map(r => r.split('-').map(Number) as Range);
}

main();