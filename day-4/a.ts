import { runSolution } from '../utils.ts';

export const getTrimmedLines = (data: string) => {
  const lines = data.split('\n');
  return lines.map((line) => line.trim()).filter((line) => line);
};

class WordBuilder {
  private x: number;
  private y: number;
  private grid: string[];
  private word: string;

  constructor(grid: string[], x: number, y: number) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    if (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
      this.word = grid[x].charAt(y);
    } else {
      this.word = '';
    }
  }

  public navigate(xOffset: number, yOffset: number) {
    this.x += xOffset;
    this.y += yOffset;
    if (
      this.x >= 0 &&
      this.x < this.grid.length &&
      this.y >= 0 &&
      this.y < this.grid[this.x].length
    ) {
      this.word += this.grid[this.x][this.y];
    }
    return this;
  }

  public getWord() {
    return this.word;
  }
}

const countXmasInstancesAtCoordinate = (
  grid: string[],
  x: number,
  y: number
) => {
  let xmasInstances = 0;

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const check = new WordBuilder(grid, x, y);
      for (let i = 0; i < 3; i++) {
        check.navigate(xOffset, yOffset);
      }
      if (check.getWord() === 'XMAS') xmasInstances++;
    }
  }

  return xmasInstances;
};

/** provide your solution as the return of this function */
export async function day4a(data: Buffer) {
  const fileData = data?.toString();
  let xmasInstances = 0;
  const grid = getTrimmedLines(fileData);
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 'X') {
        xmasInstances += countXmasInstancesAtCoordinate(grid, x, y);
      }
    }
  }
  return xmasInstances;
}

await runSolution(day4a, { rawFile: true });
