import { runSolution } from '../utils.ts';

function isSafe(report: number[]) {
  let allIncreasing = null;
  for (let i = 0; i < report.length - 1; i++) {
    const level = report[i];
    const nextLevel = report[i + 1];
    const diff = nextLevel - level;

    const diffAbs = Math.abs(diff);
    if (diffAbs < 1 || diffAbs > 3) {
      return false;
    }

    if (allIncreasing === null) {
      allIncreasing = diff > 0;
    } else if ((allIncreasing && diff < 0) || (!allIncreasing && diff > 0)) {
      return false;
    }
  }

  return true;
}

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  const reports = data.map((line) => {
    return line.split(' ').map((e) => Number(e));
  });

  const safeReports = [];

  for (const report of reports) {
    if (isSafe(report)) {
      safeReports.push(report);
    }
  }

  return safeReports?.length;
}

await runSolution(day2a);
