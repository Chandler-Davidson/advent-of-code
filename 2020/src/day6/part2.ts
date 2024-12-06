import { getInput } from "../util"

const solution = (): number => {
  const groups = getGroups(getInput(__dirname));
  const sets = getSets(groups);

  return findCommonElements(groups, sets)
    .join('').length;
}

const getGroups = (input: string) => {
  return input
    .split('\r\n\r\n')
    .map(g => g.split('\r\n'));
}

const getSets = (groups: string[][]) => {
  return groups
  .map(g => g.flatMap(c => c.split('')))
  .map(g => new Set(g));
}

const findCommonElements = (groups: string[][], sets: Set<string>[]) => {
  return groups.map((g, i) => {
    return [...sets[i]].reduce((common, k) => {

      return (g.every(t => t.includes(k)))
        ? common + k
        : common;
    }, '');
  })
}

console.log(solution());