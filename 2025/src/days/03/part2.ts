import fs from 'fs';

async function main() {
    const banks = getInput('example.txt');
    // const banks = getInput('input.txt');

    const joltages = banks.map((b, i) => {
        const str = findJoltage(b);
        console.log(`Battery ${i + 1}: ${str}`);
        return parseInt(str, 10);
    });

    const totalJoltage = sum(joltages);
    console.log(`Total joltage: ${totalJoltage}`)
}

// 811111111111119
// 81111111111   9

function findJoltage(bank: number[]): string {
    let index = 0;
    let battery = '';
    while (battery.length < 12) {
        index = findNextBattery(bank, index);
        battery += bank[index];
        // Step index
        index += 1;
    }

    return battery;
}

// Recursively build battery
function findNextBattery(bank: number[], index: number): number {
    const batterySize = 12;
    const window = bank.slice(index, bank.length - batterySize);

    // Adjust index for window start
    return index + indexOfLargest(window);
}

function indexOfLargest(arr: number[]): number {
    let largestIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[largestIndex];
        const next = arr[i];

        if (next! > curr!) {
            largestIndex = i;
        }
    }

    return largestIndex;
}

function sum(arr: number[]): number {
    return arr.reduce((acc, el) => acc + el, 0);
}

function getInput(fileName: string): number[][] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    return rawInput.split('\n').map(line => line.split('').map(Number));
}

main();