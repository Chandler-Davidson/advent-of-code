import fs from 'fs';

async function main() {
    // const NUMBER_OF_CONNECTIONS = 10;
    // const positions = getInput('example.txt');

    const NUMBER_OF_CONNECTIONS = 1000;
    const positions = getInput('input.txt');

    const distanceMap = buildMap(positions);
    const indexesOfClosest = getSortedDistances(distanceMap);

    const circuts = joinCircuts(indexesOfClosest, NUMBER_OF_CONNECTIONS);
    
    const topCircutLengths = circuts
        .map(c => c.length)
        .sort((a,b) => b - a)
        .slice(0, 3);

    for (const length of topCircutLengths) {
        console.log(`Circut length: ${length}`);
    }
    console.log(`Product of 3 largest circuts: ${topCircutLengths.reduce((acc, el) => acc * el, 1)}`);
}

type Position = [number, number, number]

function getInput(fileName: string): Position[] {
    const rawInput = fs.readFileSync(fileName, 'utf-8');
    const lines = rawInput.split('\n');
    return lines.map(l => l.split(',').map(Number) as Position);
}

function buildMap(pos: Position[]): number[][] {
    const rows = [];
    for (let i = 0; i < pos.length; i++) {
        const src = pos[i]!;
        const columns = [];
        for (let j = 0; j < pos.length; j++) {
            const dest = pos[j]!;
            const distance = getDistance(src, dest);
            columns.push(distance);
        }

        rows.push(columns);
    }

    return rows;
}

function getDistance(a: Position, b: Position): number {
    const sqr = (n: number) => Math.pow(n, 2);
    return Math.sqrt(sqr(b[0] - a[0]) + sqr(b[1] - a[1]) + sqr(b[2] - a[2]));
}

type JunctionDistance = {
    srcIndex: number,
    destIndex: number
    distance: number,
};

function getSortedDistances(distances: number[][]): JunctionDistance[] {
    const distanceByIndex = distances
        .flatMap((distances, srcIndex) => distances
            .map((distance, destIndex) => ({ srcIndex, destIndex, distance })))
        .filter(d => d.srcIndex !== d.destIndex) // Filter out self to self
        .sort((a, b) => a.distance - b.distance);

    return distanceByIndex;
}

function joinCircuts(distances: JunctionDistance[], maxConnections: number): number[][] {
    const circuts: number[][] = [];
    let index = 0;
    let connectionsCount = 0;
    while (connectionsCount < maxConnections) {
        const { srcIndex, destIndex } = distances[index]!;
        
        const circutIndexOfSrc = circuts.findIndex(junctions => junctions?.includes(srcIndex));
        const circutIndexOfDest = circuts.findIndex(junctions => junctions?.includes(destIndex));
        
        // Same
        if (circutIndexOfSrc === circutIndexOfDest) {
            // Both don't exist in a circut
            if (circutIndexOfSrc === -1) {
                circuts.push([srcIndex, destIndex]);
                connectionsCount += 1;
            } 
            
            // Both exist in the same circut
            else {
                // Count duplicate connections
                connectionsCount += 1;
            }
        } else {
            // Src doesn't exist in circut
            if (circutIndexOfSrc === -1) {
                circuts[circutIndexOfDest]!.push(srcIndex);
                connectionsCount += 1;
            } 
            // Dest doesn't exist in circut
            else if (circutIndexOfDest === -1) {
                circuts[circutIndexOfSrc]!.push(destIndex);
                connectionsCount += 1;
            } 
            // Both exist in circut, need to combine
            else {
                const srcCircut = circuts[circutIndexOfSrc]!;
                const destCircut = circuts[circutIndexOfDest]!;

                const newCircut = [ ...srcCircut, ...destCircut ];
                circuts.splice(Math.max(circutIndexOfSrc, circutIndexOfDest), 1);
                circuts.splice(Math.min(circutIndexOfSrc, circutIndexOfDest), 1);

                circuts.push(newCircut);
                connectionsCount += 1;
            }
        }

        // Dedupe pairs
        index += 2;
    }

    return circuts;
}

main();