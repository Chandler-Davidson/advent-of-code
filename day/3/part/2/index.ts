import { getInputLines } from "/utils/utils.ts";

type bit = "0" | "1";

type bitCount = {
  "0": number;
  "1": number;
};

type comparisonFunc = (bit: bitCount) => "1" | "0";

function findColumnBit(
  columnIndex: number,
  lines: string[],
  comparisonFunc: comparisonFunc,
): string {
  const mostCommonBit: bitCount = { "0": 0, "1": 0 };

  for (const line of lines) {
    const bit = line[columnIndex] as bit;
    mostCommonBit[bit] += 1;
  }

  return comparisonFunc(mostCommonBit);
}

function findRating(lines: string[], comparison: comparisonFunc) {
  const lineLength = lines[0].length;

  for (let col = 0; col < lineLength; col++) {
    const columnBit = findColumnBit(col, lines, comparison);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (lines.length == 1) {
        return line;
      }

      if (line[col] != columnBit) {
        lines.splice(i, 1);
        i -= 1;
      }
    }
  }

  return lines[0];
}

function findMaxBitRecord(bit: bitCount) {
  return bit["1"] >= bit["0"] ? "1" : "0";
}

function findMinBitRecord(bit: bitCount) {
  return bit["0"] <= bit["1"] ? "0" : "1";
}

const binaryRatings = [findMaxBitRecord, findMinBitRecord].map((f) =>
  findRating(getInputLines(), f)
);
const [oxygenRating, scrubberRating] = binaryRatings.map((r) => parseInt(r, 2));

console.log(`oxygen: ${oxygenRating}`);
console.log(`scrubber: ${scrubberRating}`);
console.log(`product: ${oxygenRating * scrubberRating}`);
