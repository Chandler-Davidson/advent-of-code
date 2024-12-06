import { getInput } from "../util";

const solution = () => {
  const instructions = parseInstructions(getInput(__dirname));
  return boot(instructions);
}

type Instruction = {
  operation: OperationKey,
  value: number,
  hasRun: boolean,
};

type OperationKey = 'acc' | 'jmp' | 'nop';

type Operation = {[key in OperationKey]: (value: number) => number | null}

const parseInstructions = (input: string): Instruction[] => {
  return input
    .split('\r\n')
    .map(l => ({
      operation: l.slice(0, 3) as OperationKey,
      value: parseInt(l.slice(4)),
      hasRun: false
    }));
}

const boot = (instructions: Instruction[]): number => {
  let total = 0;

  const operations: Operation = {
    'acc': (value: number) => total += value,
    'jmp': (value: number) => i += value - 1,
    'nop': () => null
  };
  
  for (var i = 0; i < instructions.length; i++) {
    const { operation, value, hasRun } = instructions[i];
    
    if (hasRun)
      break;
    
    operations[operation](value);
    instructions[i].hasRun = true;
  }

  return total;
}

console.log(solution());