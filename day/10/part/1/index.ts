import { getInputLines, sum } from 'utils'

type OpeningBracket = '(' | '[' | '{' | '<';

type CloseingBracket = ')' | ']' | '}' | '>';

type Bracket = OpeningBracket | CloseingBracket;

const openingBrackets = new Set(['(', '[', '{', '<']);
const closeToOpen: { [key: string]: OpeningBracket } = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
};

const bracketScores: { [key: string]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

function findIllegalCharacter(line: Bracket[]): CloseingBracket | null {
  const isOpening = (c: Bracket) => openingBrackets.has(c);
  const stack: Bracket[] = [];

  for (const char of line) {
    if (isOpening(char)) {
      stack.push(char);
    } else {
      const lastChar = stack.pop() as Bracket;
      if (closeToOpen[char] !== lastChar) {
        return char as CloseingBracket;
      }
    }
  }

  return null;
}

const lines = getInputLines().map(l => [...l] as Bracket[]);
const chars = lines.map(findIllegalCharacter).filter(c => c);
const score = sum(chars.map(c => bracketScores[c as string]));

console.log(score);