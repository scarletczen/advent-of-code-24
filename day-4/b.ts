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

const isXmasAtCoordinate = (grid: string[], x: number, y: number) => {
  const firstSlash = new WordBuilder(grid, x - 1, y - 1)
    .navigate(1, 1)
    .navigate(1, 1)
    .getWord();
  const secondSlash = new WordBuilder(grid, x - 1, y + 1)
    .navigate(1, -1)
    .navigate(1, -1)
    .getWord();

  return (
    (firstSlash === 'MAS' || firstSlash === 'SAM') &&
    (secondSlash === 'MAS' || secondSlash === 'SAM')
  );
};

/** provide your solution as the return of this function */
export async function day4b(data: Buffer) {
  const fileData = data?.toString();
  let xmasInstances = 0;
  const grid = getTrimmedLines(fileData);

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 'A' && isXmasAtCoordinate(grid, x, y)) {
        xmasInstances++;
      }
    }
  }

  return xmasInstances;
}

await runSolution(day4b, { rawFile: true });
