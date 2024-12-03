import { runSolution } from '../utils.ts';

const regexToFilterOutCleanMemory = /mul\((\d{1,3}),(\d{1,3})\)/g;
const doOperation = /do\(\)/;
const dontOperation = /don't\(\)/;

function calculateTotal(tokens, considerOperations = false) {
  let solutionTotal = 0;
  let mulEnabled = true;

  tokens.forEach((token) => {
    if (considerOperations) {
      if (doOperation.test(token)) {
        mulEnabled = true;
      } else if (dontOperation.test(token)) {
        mulEnabled = false;
      } else if (mulEnabled) {
        solutionTotal += extractAndSumMul(token);
      }
    } else {
      solutionTotal += extractAndSumMul(token);
    }
  });

  return solutionTotal;
}

function extractAndSumMul(token) {
  let total = 0;
  let match;
  while ((match = regexToFilterOutCleanMemory.exec(token)) !== null) {
    total += match[1] * match[2];
  }
  return total;
}

/** provide your solution as the return of this function */
export async function day3a(data: string) {
  const operationTokens = data?.split(/(?=mul\(|do\(\)|don't\(\))/);
  const partTwoTotal = calculateTotal(operationTokens, true);

  return partTwoTotal;
}

await runSolution(day3a, { rawFile: true });
