import fs from 'fs';

async function main() {
    // const rows = getInput('example.txt');
    const rows = getInput('input.txt');

    let total = 0;
    for (let i = 0; i < rows.length; i++) {
        const column = rows[i]!;
        for (let j = 0; j < column.length; j++) {
            const cell = column[j];
            if (cell !== '@') continue;

            const adjacentCells = [];

            if (i > 0) {
                if (j > 0) {
                    adjacentCells.push(rows[i - 1]?.[j - 1]);
                }
                adjacentCells.push(rows[i - 1]?.[j]);
                if (j < column.length - 1) {
                    adjacentCells.push(rows[i - 1]?.[j + 1]);
                }
            }

            if (j > 0) {
                adjacentCells.push(rows[i]?.[j - 1]);
            }
            if (j < column.length - 1) {
                adjacentCells.push(rows[i]?.[j + 1]);
            }

            if (i < rows.length - 1) {
                if (j > 0) {
                    adjacentCells.push(rows[i + 1]?.[j - 1]);
                }
                adjacentCells.push(rows[i + 1]?.[j]);
                if (j < column.length - 1) {
                    adjacentCells.push(rows[i + 1]?.[j + 1]);
                }
            }

            const numberOfAdjacentRolls = adjacentCells.filter(c => c && c === '@').length;

            if (numberOfAdjacentRolls < 4) {
                total += 1
            }
        }

    }

    console.log(`Accessible rolls: ${total}`)
}

function getInput(fileName: string): string[][] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    return rawInput.split('\n').map(row => row.split(''));
}

main();