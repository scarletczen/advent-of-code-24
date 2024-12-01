import { runSolution } from '../utils.ts';
import _ from 'lodash';

const log = (v) => console.dir(v, { depth: null });

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  return _.chain(data)
    .map((line) => line.split('   '))
    .unzip()
    .map((col) => col.map(Number))
    .map((col) => col.sort((a, b) => a - b))
    .thru((v) => _.zip(...v))
    .map(([a, b]) => Math.abs(a - b))
    .sum()
    .tap(log)
    .value();
}

await runSolution(day1a);
