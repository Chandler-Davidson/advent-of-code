import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// Count # of safe reports
// Safe =
  // 1. all increasing or all decreasing
  // 2. Two adjacent levels differ by at least one and at most three (slowly increasing)

function isSafe(report: number[]): boolean {
  let isIncreasing = false;
  let isDecreasing = false;

  for (let i = 0; i < report.length - 1; i++) {
    const curr = report[i];
    const next = report[i + 1];
    
    const diff = Math.abs(next - curr);

    if (diff < 1 || diff > 3) {
      return false;
    }

    if (curr == next) {
      return false;
    }
    else if (curr < next) {
      if (isDecreasing) {
        return false;
      }
      isIncreasing = true;
    } else if (curr > next) {
      if (isIncreasing) {
        return false;
      }
      isDecreasing = true;
    }
  }

  return true;
}


function main(input: string): number {
  const reports = input.split("\r\n").map(line => line.split(" ").map(num => parseInt(num)));
  const safeReports = reports.filter(report => isSafe(report));
  return safeReports.length;
}

Deno.test("example", async () => {
  const input = await getExample(2);
  const result = main(input);
  assertEquals(result, 2);
});

Deno.test("solve", async () => {
  const input = await getInput(2);
  const result = main(input);
  console.log(result);
})