import { getInput } from "../util"

const solution = () => {
  const map = getInput(__dirname).split('\n');
  return traverseMap(map, {x: 3, y: 1});
}

type Coordinate = {
  x: number,
  y: number
};

class Toboggan {
  public position: Coordinate = { x: 0, y: 0 };
  public treesHit: number = 0;

  public move(slope: Coordinate) {
    const { x, y } = this.position;
    this.position = { x: x + slope.x, y: y + slope.y };
  }
}

const traverseMap = (map: string[], slope: Coordinate): number => {
  const getSquare = ({ x, y }: Coordinate) => map[y][x % (map[0].length - 1)];
  const tobog = new Toboggan();

  while (tobog.position.y < map.length - 1) {
    tobog.move(slope);

    const square = getSquare(tobog.position);
    if (square === '#')
      tobog.treesHit += 1;
  }

  return tobog.treesHit;
}

console.log(solution());