import { getInput } from "../util"

const solution = () => {
  const passportTuples = getInput(__dirname)
    .split('\r\n\r\n')
    .map(p => p.split(/ |\r\n/g));

  const requiredKeys = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
  ];

  const invalidPassports = passportTuples.filter(p => {
    for (const k of requiredKeys) {
      if (p.findIndex(c => c.includes(`${k}:`)) === -1)
        return true;
    }
  });

  return passportTuples.length - invalidPassports.length;
}

console.log(solution());