import { runSolution } from '../utils.ts';

type Coord = [number, number];

const Grid = {
  cells: [] as number[][],

  curDir: 0,
  directions: [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ] as Coord[],

  guardPos: [-1, -1] as Coord,
  initialPos: [-1, -1] as Coord,

  parseGrid(input: string[]) {
    this.cells = input.map((line, y) =>
      line.split('').map((char, x) => {
        if (char === '^') this.initialPos = [x, y];
        return char === '#' ? 1 : 0;
      })
    );
  },

  resetPosition() {
    this.guardPos = this.initialPos;
    this.curDir = 0;
  },

  runPatrol() {
    this.resetPosition();

    const visited = new Set<string>([this.guardPos.join(',')]);
    let iters = 0,
      escaped = false;

    do {
      const nextPos = [
        this.guardPos[0] + this.directions[this.curDir][0],
        this.guardPos[1] + this.directions[this.curDir][1],
      ] as Coord;

      const nextVal = this.cells[nextPos[1]]?.[nextPos[0]] ?? -1;

      if (nextVal < 0) {
        escaped = true;
        break;
      }

      if (nextVal === 1) {
        this.curDir = (this.curDir + 1) % 4;
      } else {
        this.guardPos = nextPos;

        visited.add(this.guardPos.join(','));
      }
    } while (iters++ < 6e3);

    return escaped ? visited : Infinity;
  },
};

export function part1(input: string[]) {
  Grid.parseGrid(input);
  const result = Grid.runPatrol();

  if (result instanceof Set) {
    return result.size;
  }

  return NaN;
}

export function part2(input: string[]) {
  Grid.parseGrid(input);

  const visited = Grid.runPatrol();
  let newObstacleCount = 0;

  if (visited instanceof Set) {
    for (const cs of visited) {
      const coord = cs.split(',').map(Number) as Coord;
      Grid.cells[coord[1]][coord[0]] = 1;

      const result = Grid.runPatrol();

      if (result === Infinity) {
        newObstacleCount += 1;
      }

      Grid.cells[coord[1]][coord[0]] = 0;
    }
  }

  return newObstacleCount;
}

/** provide your solution as the return of this function */
export async function day6b(data: Buffer) {
  return part2(data?.toString()?.split('\n'));
}

await runSolution(day6b, { rawFile: true });
