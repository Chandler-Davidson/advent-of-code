import fs from 'fs';

async function main() {
    const banks = getInput('example.txt');
    // const banks = getInput('input.txt');

    const joltages = banks.map((b, i) => {
        const [first, second] = findBatteries(b);
        const str = first.toString() + second.toString();

        console.log(`Battery ${i + 1}: ${str}`);
        return parseInt(str, 10);
    });

    const totalJoltage = sum(joltages);
    console.log(`Total joltage: ${totalJoltage}`)
}

function findBatteries(bank: number[]): [number, number] {
    const firstIndex = findFirstBattery(bank);
    const secondIndex = findSecondBattery(bank, firstIndex);

    const batteries = [bank[firstIndex], bank[secondIndex]];
    return batteries as [number, number];
}

function findFirstBattery(bank: number[]): number {
    // Exclude last digit
    const window = bank.slice(0, bank.length - 1);
    return indexOfLargest(window);
}

function findSecondBattery(bank: number[], firstBatteryIndex: number): number {
    const windowStart = firstBatteryIndex + 1;
    const window = bank.slice(windowStart);

    // Adjust index for window
    return windowStart + indexOfLargest(window);
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