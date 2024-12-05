import { runSolution } from '../utils.ts';

function ints(s, neg = true) {
  let reg = /\d+/g;
  if (neg) reg = /-?\d+/g;

  return [...s.matchAll(reg)].map((x) => +x[0]);
}

/** provide your solution as the return of this function */
export async function day5a(data: Buffer) {
  const [list, inp] = data
    ?.toString()
    ?.trim()
    ?.split('\n\n')
    ?.map((x) => x?.split('\n')?.map((y) => ints(y)));
  let [ret1, ret2] = [0, 0];

  const rules = {};
  for (const line of list) {
    rules[[line[0], line[1]]] = true;
  }

  for (const line of inp) {
    let changed = true;
    let everchanged = false;
    while (changed) {
      changed = false;
      for (let i = 0; i < line.length; i++) {
        for (let j = i + 1; j < line.length; j++) {
          if (rules[[line[j], line[i]]]) {
            changed = true;
            everchanged = true;
            const tmp = line[i];
            line[i] = line[j];
            line[j] = tmp;
          }
        }
      }
    }
    if (everchanged) ret2 += line[(line.length - 1) / 2];
    else ret1 += line[(line.length - 1) / 2];
  }
  return ret1;
}

await runSolution(day5a, { rawFile: true });
