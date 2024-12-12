export function getExample(day: number): Promise<string> {
  return Deno.readTextFile(`./src/days/${day}/example.txt`);
}

export function getInput(day: number): Promise<string> {
  return Deno.readTextFile(`./src/days/${day}/input.txt`);
}

export function sum(numbers: number[]): number {
  return numbers.reduce((sum, number) => sum + number, 0);
}

export function isEven(number: number): boolean {
  return number % 2 === 0;
} 