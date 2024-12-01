import { runSolution } from '../utils.ts';
import * as _ from 'lodash';

const log = (v) => console.dir(v, { depth: null });
/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  console.log(data);
  return _.chain(data)
    .map((line) => line.split('   '))
    .unzip()
    .map((col) => col.map(Number))
    .thru(([left, right]) =>
      left.map((n) => right.filter((m) => m == n).length * n)
    )
    .sum()
    .tap(log)
    .value();
}

await runSolution(day1b);
