import fs from 'fs';

async function main() {
    // const rows = getInput('example.txt');
    const rows = getInput('input.txt');

    let totalRemoved = 0;
    let totalToRemove = 1;

    while(totalToRemove > 0) {
        const cellsToRemove = findCellsToRemove(rows);
        totalToRemove = cellsToRemove.length;
        totalRemoved += totalToRemove;

        for (const [i, j] of cellsToRemove) {
            rows[i!]![j!] = '.'
        }
    }

    // Absolutely shocked that brute force worked
    console.log(`Accessible rolls: ${totalRemoved}`)
}

function findCellsToRemove(rows: string[][]) {
    const cellsToRemove = [];
    for (let i = 0; i < rows.length; i++) {
        const column = rows[i]!;
        for (let j = 0; j < column.length; j++) {
            const cell = column[j];
            if (cell !== '@') continue;

            const adjacentCellIndicies = [];

            if (i > 0) {
                if (j > 0) {
                    adjacentCellIndicies.push([i - 1, j - 1]);
                }
                adjacentCellIndicies.push([i - 1, j]);
                if (j < column.length - 1) {
                    adjacentCellIndicies.push([i - 1, j + 1]);
                }
            }

            if (j > 0) {
                adjacentCellIndicies.push([i, j - 1]);
            }
            if (j < column.length - 1) {
                adjacentCellIndicies.push([i, j + 1]);
            }

            if (i < rows.length - 1) {
                if (j > 0) {
                    adjacentCellIndicies.push([i + 1, j - 1]);
                }
                adjacentCellIndicies.push([i + 1, j]);
                if (j < column.length - 1) {
                    adjacentCellIndicies.push([i + 1, j + 1]);
                }
            }

            const adjacentRollsIndicies = adjacentCellIndicies.filter(([i, j]) => rows[i!]![j!] === '@');

            if (adjacentRollsIndicies.length < 4) {
                cellsToRemove.push([i, j]);
                // rows[i]![j] = '.';
            }
        }
    }

    return cellsToRemove;
}

function getInput(fileName: string): string[][] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    return rawInput.split('\n').map(row => row.split(''));
}

main();