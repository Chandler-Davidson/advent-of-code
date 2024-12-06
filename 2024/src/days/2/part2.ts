import { getExample, getInput, sum } from "#utils";
import { assertEquals } from "jsr:@std/assert";

// Count # of safe reports
// Safe =
// 1. all increasing or all decreasing
// 2. Two adjacent levels differ by at least one and at most three (slowly increasing)

// interface SafetyResult {
//   reportIndex: number;
//   safe: boolean;
//   failedIndex: number;
// }

function isSafe(levels: number[]) {
	const differences: number[] = [];

	for (let i = 1; i < levels.length; i++) {
		differences.push(levels[i] - levels[i - 1]);
	}

	const increasing = differences.every((d) => d >= 1 && d <= 3);
	const decreasing = differences.every((d) => d <= -1 && d >= -3);

	return increasing || decreasing;
}

function main(input: string): number {
  const reports = input.split("\r\n").map((line) =>
    line.split(" ").map((num) => parseInt(num))
  );

  let safe = 0;
  let madeSafe = 0;

  for (const report of reports) {
    let tolerable = false;

		for (let i = 0; i < report.length; i++) {
			const removed = [...report.slice(0, i), ...report.slice(i + 1)];

			if (isSafe(removed)) {
				tolerable = true;
				break;
			}
		}

		if (isSafe(report)) safe++;
		if (isSafe(report) || tolerable) madeSafe++;
  }
  
  return madeSafe;
}

Deno.test("example", async () => {  
  const input = await getExample(2);
  const result = main(input);
  assertEquals(result, 4);
});

Deno.test("solve", async () => {
  const input = await getInput(2);
  const result = main(input);
  console.log(result);
});

// 370 => too low