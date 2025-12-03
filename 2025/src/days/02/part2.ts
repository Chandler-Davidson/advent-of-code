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
            if (isMadeOfRepeatingSubstrings(i.toString())) {
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

function isMadeOfRepeatingSubstrings(str: string): boolean {
    return /^(.+)\1+$/.test(str);
}

type Range = [number, number];

function getInput(fileName: string): Range[] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    return rawInput.split(',').map(r => r.split('-').map(Number) as Range);
}

main();