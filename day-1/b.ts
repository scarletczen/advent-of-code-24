import { runSolution } from '../utils.ts';
import _ from 'lodash';

const log = (v) => console.dir(v, { depth: null });
/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  return _.chain(data)
    .map((line) => line.split('   '))
    .unzip()
    .map((col) => col.map(Number))
    .thru(
      ([left, right]) => left.map((n) => right.filter((m) => m == n).length * n) // occurrences of left array element in right array multiplied by the element
    )
    .sum()
    .tap(log)
    .value();
}

await runSolution(day1b);
