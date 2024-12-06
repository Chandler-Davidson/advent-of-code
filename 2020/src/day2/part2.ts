import { getInput } from "../util";

export const solution = () => {
  return getInput(__dirname)
    .split('\r\n')
    .map(parse)
    .reduce((acc, [policy, password]) => isPasswordValid(policy, password) ? acc + 1 : acc, 0);
}

type Policy = {
  lowerPosition: number,
  upperPosition: number,
  letter: string
};

const parse = (line: string): [Policy, string] => {
  return [{
      lowerPosition: parseInt(line.match(/^[\d]+/)?.[0] as string),
      upperPosition: parseInt(line.match(/-([\d]+)/)?.[1] as string),
      letter: line.match(/(\w):/)?.[1] as string
    },
    line.match(/[\w]+$/)?.[0] as string
  ];
}

const isPasswordValid = (policy: Policy, password: string) => {
  const { upperPosition, lowerPosition, letter } = policy;

  const left = password[lowerPosition - 1] === letter;
  const right = password[upperPosition - 1] === letter;

  return left !== right;
}

console.log(solution());