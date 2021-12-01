import { getInputPath } from "./input.ts";

export function getInput(): string {
  return Deno.readTextFileSync(getInputPath());
}

export function getInputLines(): string[] {
  const newLineRegex = /\r?\n/;
  return getInput().split(newLineRegex);
}

export function getInputNumbers(): number[] {
  return getInputLines().map((l) => parseInt(l));
}

export function count<T>(
  arr: Iterable<T>,
  predicate: (item: T) => boolean,
): number {
  let total = 0;

  for (const item of arr) {
    if (predicate(item)) {
      total += 1;
    }
  }

  return total;
}

export function sum(arr: number[]) {
  return arr.reduce((acc, el) => acc + el, 0);
}
