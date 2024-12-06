import { getInput } from "../util";

const solution = (): number => {
  const input = getInput(__dirname).split('\r\n');
  const bags = parseBags(input);
  
  return countBags(bags);
  
  //return bags.filter(b => canHold(b, 'shiny gold bag')).length;
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

  const canHold = (bag: Bag, color: string): boolean => {
    if (bag.contents.find(c => c.color === color))
      return true;
    
    const children = bag.contents.map(c => bags.find(t => t.color === c.color) as Bag);
    for (const child of children) {
      if (canHold(child, color))
        return true;
    }

    return false;
  }

  return bags.filter(b => canHold(b, 'shiny gold bag')).length;
}

console.log(solution());