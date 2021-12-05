import { getInputLines } from "utils";

type bit = "0" | "1";

type bitCount = {
  "0": number;
  "1": number;
};

function getGammaRate(lines: string[]): string {
  const mostCommonBits: bitCount[] = [];
  const lineLength = lines[0].length;

  for (let i = 0; i < lineLength; i++) {
    mostCommonBits.push({ "0": 0, "1": 0 });

    for (let j = 0; j < lines.length; j++) {
      const bit = lines[j][i] as bit;
      mostCommonBits[i][bit] += 1;
    }
  }

  return mostCommonBits.map(findMaxBitRecord).join("");
}

function findMaxBitRecord(bit: bitCount) {
  return bit["0"] > bit["1"] ? "0" : "1";
}

function findRates(gammaRate: string) {
  return [gammaRate, invertBinaryString(gammaRate)];
}

function invertBinaryString(binary: string) {
  return [...binary].map((x) => x == "1" ? "0" : "1").join("");
}

const [gammaRate, epsilonRate] = findRates(getGammaRate(getInputLines()));
console.log(`gamma: ${gammaRate}, epsilonRate: ${epsilonRate}`);
console.log(`product: ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`);
