import { getInput } from "../util"

const solution = (): number => {
  const groups = getGroupings(getInput(__dirname));
    
  return groups.reduce((acc, el) => acc + [...el].length, 0);
}

const getGroupings = (input: string): Set<string>[] => {
  return input
    .split('\r\n\r\n')
    .map(g => g.replace(/\r\n/g, ''))
    .map(g => new Set(g));
}

console.log(solution());