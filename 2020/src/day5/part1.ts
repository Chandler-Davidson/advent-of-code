import { getInput } from "../util";

const solution = (): number => {
  const ids = getInput(__dirname)
    .split('\n')
    .map(getSeatId);
  
  return Math.max(...ids);
}

const getSeatId = (pass: string): number => {
  const row = findRow(pass);
  const col = findCol(pass);

 return row * 8 + col;
}

const findRow = (pass: string): number => {
  const rowData = pass.slice(0, 7);
  return findSeat(0, 127, 'F', 'B', rowData);
}

const findCol = (pass: string): number => {
  const colData = pass.slice(7);
  return findSeat(0, 7, 'L', 'R', colData);
}

const findSeat = (lower: number, upper: number, lowerHalfChar: string, upperHalfChar: string, pass: string): number => {
  for (const c of pass) {
    if (c === lowerHalfChar)
      upper = Math.floor((upper + lower) / 2);
    else if (c === upperHalfChar)
      lower = Math.ceil((upper + lower) / 2);
  }

  return upper;
}


console.log(solution());