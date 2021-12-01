import { parse } from 'https://deno.land/std/flags/mod.ts';
import { join } from 'https://deno.land/std/path/mod.ts';

function getWorkingDirPath(): string | null {
  const path = new URL(Deno.cwd()).pathname;
  return path.includes("part") ? path : null;
}

function getExplicitArguments(): { day: string; part: string } {
  const requiredArgs = [
    ["d", "day"],
    ["p", "part"],
  ];

  const args = parse(Deno.args);
  const argKvps = requiredArgs.map((
    [short, full],
  ) => [full, args[short] ?? args[full]]);

  return argKvps.some((_, value) => value == undefined)
    ? null
    : Object.fromEntries(argKvps);
}

function getArgsPath(): string | null {
  const { day, part } = getExplicitArguments();

  return (day && part) ? join(Deno.cwd(), "day", day, "part", part) : null;
}

export function getInputPath(): string {
  const path = getWorkingDirPath() ?? getArgsPath();

  if (!path) {
    throw "Missing required arguments!\nEither set working directory to a single part OR include the flags: '-day 1 -part 2'";
  }

  return path.replace(/part\\\d/, 'input.txt');;
}