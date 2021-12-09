import { getInputLines } from 'utils';

// # of segments to display : digit
const digitSegmentCounts: { [key: number]: number } = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

function mapSegmentToDigit(segment: string): number | null {
  const length = segment.length;
  const isUnique = length in digitSegmentCounts;

  return isUnique ? digitSegmentCounts[length] : null;
}

const segments = getInputLines().map(l => l.split(' | ')).map(([_, digits]) => digits.split(' ')).flatMap(s => s);
const digits = segments.map(mapSegmentToDigit).filter(d => d);
console.log(`digits: ${digits.length}`);