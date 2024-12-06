import { countOccurrences, getInput } from "../util";

export const solution = () => {
  return getInput(__dirname)
    .split('\r\n')
    .map(parse)
    .reduce((acc, [policy, password]) => isPasswordValid(policy, password) ? acc + 1 : acc, 0);
}

type Policy = {
  lowerLimit: number,
  upperLimit: number,
  letter: string
};

const parse = (line: string): [Policy, string] => {
  return [{
      lowerLimit: parseInt(line.match(/^[\d]+/)?.[0] as string),
      upperLimit: parseInt(line.match(/-([\d]+)/)?.[1] as string),
      letter: line.match(/(\w):/)?.[1] as string
    },
    line.match(/[\w]+$/)?.[0] as string
  ];
}

const isPasswordValid = (policy: Policy, password: string) => {
  const occurrences = countOccurrences(password, policy.letter);

  return occurrences >= policy.lowerLimit &&
    occurrences <= policy.upperLimit;
}

console.log(solution());