import { getExample, getInput } from "#utils";
import { assertEquals } from "jsr:@std/assert";


function main(input: string): number {
}

Deno.test("example", async () => {
  const input = await getExample(__day__);
  const result = main(input);
  assertEquals(result, _);
});

Deno.test("solve", async () => {
  const input = await getInput(__day__);
  const result = main(input);
  console.log(result);
})