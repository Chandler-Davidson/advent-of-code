import { getInput } from "../util";

const solution = (): number => {
  const input = getInput(__dirname).split('\r\n');
  const bags = parseBags(input);
  
  return countBags(bags);
}

type Bag = {
  color: string,
  contents: Contents[]
}

type Contents = {
  count: number,
  color: string
}

const parseBags = (lines: string[]): Bag[] => {
  return lines.map(l => ({
    color: l.match(/^([\w ]+ bag)s /)?.[1] as string,
    contents: parseContents(l.match(/\d[\w, ]+/g)?.[0] as string)
  }));
}

const parseContents = (contents: string): Contents[] => {
  if (!contents)
    return [];
  
  return contents.replace('.', '').split(', ').map(c => ({
    count: parseInt(c[0]),
    color: c.slice(2).replace('bags', 'bag')
  }));
}

const countBags = (bags: Bag[]): number => {
  let total = 0;

  const count = (bag: Bag) => {
    for (const child of bag.contents) {
      const b = bags.find(t => t.color === child.color) as Bag;
    }
  }
}

console.log(solution());