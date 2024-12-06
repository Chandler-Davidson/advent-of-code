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

  const tests = {
    byr: (n: string) => {
      const a = parseInt(n);
      return a >= 1920 && a <= 2002
    },
    iyr: (n: string) => {
      const a = parseInt(n);
      return a >= 2010 && a <= 2020
    },
    eyr: (n: string) => {
      const a = parseInt(n);
      return a >= 2020 && a <= 2030
    },
    hgt: (n: string) => {
      const inches = n.includes('in');
      const a = parseInt(n.slice(0, n.length - 2));

      return inches
        ? a >= 59 && a <= 76
        : a >= 150 && a <= 193;
    },
    hcl: (n: string) => {
      return n.match(/#[a-z\d]{6}/) !== null;
    },
    ecl: (n: string) => {
      const colors = [
        'amb',
        'blu',
        'brn',
        'gry',
        'grn',
        'hzl',
        'oth',
      ];

      return colors.includes(n);
    },
    'pid': (n: string) => n.toString().length === 9,
  }

  const invalidPassports = passportTuples.filter(p => {
    for (const k of requiredKeys) {
      // @ts-ignore

      const doesntHaveKey = p.findIndex(c => c.includes(`${k}:`)) === -1;

      if (doesntHaveKey)
        return true;

      const key = p.find(c => c.includes(`${k}:`));
      const value = key?.split(':')[1];
      // @ts-ignore
      const failedTest = tests[k.slice(0, 3)](value) === false;

      if (failedTest)
        return true;
    }
  });

  return passportTuples.length - invalidPassports.length;
}

console.log(solution());