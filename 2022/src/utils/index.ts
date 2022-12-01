/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

export const sum = (nums: number[] | string[]) => {
  if (nums.length === 0)
    return 0;
  
  if (typeof nums[0] === 'string') {
    // @ts-ignore
    return nums.reduce((acc, n) => acc + parseInt(n as string), 0);
  } else {
    return (nums as number[]).reduce((acc, n) => acc + n, 0);
  }
  
  
}

export const sortDescending = (nums: number[]) => nums.sort((a, b) => b - a);