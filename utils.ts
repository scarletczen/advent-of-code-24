import chalk from 'chalk';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function runSolution(
  solution: (data: string[] | Buffer) => Promise<unknown>,
  options?: {
    rawFile: boolean;
  }
) {
  const data = await readData(options);
  const answer = await solution(data);
  console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
}

export async function readData(options?: { rawFile: boolean }) {
  const [_, fullPath, dataSet] = process.argv as
    | [string, string, string]
    | [string, string];
  const puzzle = fullPath.split('/').slice(-2).join('/');
  const [day, part] = puzzle
    .split('/')
    .map((x, i) => (i === 0 ? +x.split('-')[1] : x)) as [number, 'a' | 'b'];
  const fileName = createFileName(day, part, dataSet);
  let data: Buffer | string[];
  if (options?.rawFile) {
    data = await readFile(fileName);
    return data;
  } else {
    data = (await readFile(fileName)).toString().split('\n');
  }
  return data;
}

function createFileName(day: number, part: 'a' | 'b', dataSet?: string) {
  return join(`day-${day}`, `${part}.data${dataSet ? `.${dataSet}` : ''}.txt`);
}
