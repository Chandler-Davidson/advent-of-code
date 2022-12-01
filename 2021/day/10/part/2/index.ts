import { getInputLines, invertObject, median } from 'utils'

type OpeningBracket = '(' | '[' | '{' | '<';

type CloseingBracket = ')' | ']' | '}' | '>';

type Bracket = OpeningBracket | CloseingBracket;

function findMissingCharacters(line: Bracket[]): CloseingBracket[] {
  const closeToOpen: { [key: string]: OpeningBracket } = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
  };
  const openToClose = invertObject(closeToOpen);
  const openingBrackets = new Set(Object.keys(openToClose));
  const isOpening = (c: Bracket) => openingBrackets.has(c);

  const stack: Bracket[] = [];
  for (const char of line) {
    if (isOpening(char)) {
      stack.push(char);
    } else {
      const lastChar = stack.pop() as Bracket;
      if (closeToOpen[char] !== lastChar) { // Corrupted line
        return [];
      }
    }
  }

  // Inverse of remaining brackets in reverse order
  return stack.map(c => openToClose[c]).reverse();
}

function findScore(brackets: CloseingBracket[]) {
  const bracketScores: { [key: string]: number } = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  };

  return brackets.reduce((acc, el) => (acc * 5) + bracketScores[el], 0);
}

const lines = getInputLines().map(l => [...l] as Bracket[]);
const missingChars = lines.map(findMissingCharacters).filter(({ length }) => length);
const scores = missingChars.map(findScore);
const middleScore = median(scores);

console.log(middleScore);