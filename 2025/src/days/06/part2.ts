import fs from 'fs';

async function main() {
    // const { operandRows, operatorsRow } = getInput('example.txt');
    const { operandRows, operatorsRow } = getInput('input.txt');
    
    const answers = [];
    for (let i = 0; i < operatorsRow.length; i++) {
        const operator = operatorsRow[i]!;

        const operands = operandRows[i]!;
        const firstEl = operands[0]!;
        const restOfArr = operands.slice(1);

        const columnAnswer = restOfArr.filter(n => !isNaN(n)).reduce((acc, el) => applyOperation(acc, el, operator), firstEl);
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

    const operatorsRow = lines
    .at(-1)!
    .split(whitespaceRegex)
    .filter(s => s) as Operator[];

    const operandRows = lines
    .slice(0, lines.length - 1)
    .map(line => {
        const revLine= line.split('').reverse();
        return revLine.map(c => c === ' ' ? NaN : Number(c));
    });

    // operandRows.reverse();
    operatorsRow.reverse();

    const operands: number[][] = [[]];
    for (let i = 0; i < operandRows[0]!.length; i++) {
        // Empty column between numbers
        const isSeparator = operandRows.every((_, j) => isNaN(operandRows[j]![i]!));
        if (isSeparator) {
            operands.push([]);
            continue;
        }
        
        // Build the next number by row
        let numberStr = '';
        for (let j = 0; j < operandRows.length; j++) {
            const number = operandRows[j]![i]!;
            if (!isNaN(number)) {
                numberStr += operandRows[j]![i]!;
            }
        }

        // Add to the current operand set
        operands.at(-1)!.push(Number(numberStr));
    }


    return { operandRows: operands, operatorsRow }
}

main();