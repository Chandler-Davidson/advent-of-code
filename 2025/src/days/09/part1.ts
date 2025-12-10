import fs from 'fs';

async function main() {
    // const positions = getInput('example.txt');
    const positions = getInput('input.txt');
    const areaMap = buildMap(positions);
    const sortedAreas = areaMap
        .flatMap(areas => areas)
        .sort((a, b) => b - a);

    const maxArea = sortedAreas[0];
    console.log(`Max Area: ${maxArea}`);
}

type Position = [number, number];

function getInput(fileName: string): Position[] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    const lines = rawInput.split('\n');
    return lines.map(l => l.split(',').map(Number) as Position);
}

function area(p1: Position, p2: Position): number {
    const length = Math.abs(p1[0] - p2[0]) + 1;
    const width = Math.abs(p1[1] - p2[1]) + 1;
    return length * width;
}

function buildMap(positions: Position[]): number[][] {
    const rows = [];
    for (let i = 0; i < positions.length; i++) {
        const src = positions[i]!;
        const columns = [];
        for (let j = 0; j < positions.length; j++) {
            const dest = positions[j]!;
            const areaSize = area(src, dest);
            columns.push(areaSize);
        }
        rows.push(columns);
    }
    return rows;
}

main();