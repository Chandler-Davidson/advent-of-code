import fs from 'fs';
import path from 'path';

export const getInput = (dir: string) => fs.readFileSync(path.join(dir, 'input.txt'), { encoding: 'utf-8' });

export const countOccurrences = (str: string, substr: string) => (str.match(new RegExp(substr, 'g')) || []).length;