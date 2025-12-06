import fs from 'fs';

async function main() {
    // const { operandRows, operatorsRow } = getInput('example.txt');
    const { operandRows, operatorsRow } = getInput('input.txt');

    const answers = [];
    for (let i = 0; i < operatorsRow.length; i++) {
        const operator = operatorsRow[i]!;

        const operands = operandRows.map(r => r[i]!);
        const firstEl = operands[0]!;
        const restOfArr = operands.slice(1);

        const columnAnswer = restOfArr.reduce((acc, el) => applyOperation(acc, el, operator), firstEl);
        answers.push(columnAnswer);
    }

    const sum = answers.reduce((acc, el) => acc + el, 0);
    console.log(`Sum of answers:${sum}`);
}

type Operator = '*' | '+';

function applyOperation(acc: number, n: number, operator: Operator) {
    switch (operator) {
        case '+':
            return acc + n;
        case '*':
            return acc * n;
        default:
            throw new Error('Missing operator')
    }
}

function getInput(fileName: string) {
    const whitespaceRegex = /\s+/g;
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    const lines = rawInput.split('\n');

    const operandRows = lines
    .slice(0, lines.length - 1)
    .map(line => line
        .split(whitespaceRegex)
        .filter(s => s)
        .map(Number))

    const operatorsRow = lines
    .at(-1)!
    .split(whitespaceRegex)
    .filter(s => s) as Operator[];

    return { operandRows, operatorsRow }
}

main();