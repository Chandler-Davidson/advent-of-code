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

type Operation = {[key in OperationKey]: (value: number) => void}

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
    'acc': (value: number) => { total += value; i += 1;},
    'jmp': (value: number) => i += value,
    'nop': () => i += 1
  };

  for (var i = 0; i < instructions.length;) {
    const { operation, value } = instructions[i];
    const prevIndex = i;
    const prevTotal = total;
    operations[operation](value);

    // Revert operation
    const nextOperation = instructions[i];
    if (nextOperation.hasRun) {
      i = prevIndex;
      total = prevTotal;
      operations[operation === 'jmp' ? 'nop' : 'jmp'](value);
    }


    instructions[i].hasRun = true;
    
    // const nextInstruction = instructions[i];
    // if (nextInstruction.hasRun)
    //   nextInstruction.operation =
    //     nextInstruction.operation === 'jmp'
    //       ? 'nop' : 'jmp';
  }

  return total;
}

console.log(solution());