import { Vector2 } from "../Utils/Vector2/Vector2";

export enum Direction {
  NONE = "none",
  LEFT = "left",
  UP_LEFT = "up-left",
  UP = "up",
  UP_RIGHT = "up-right",
  RIGHT = "right",
  DOWN_RIGHT = "down-right",
  DOWN = "down",
  DOWN_LEFT = "down-left",
}

export function directions(): Direction[] {
  return [
    Direction.UP,
    Direction.DOWN,
    Direction.LEFT,
    Direction.RIGHT,
    Direction.NONE,
    Direction.UP_LEFT,
    Direction.UP_RIGHT,
    Direction.DOWN_RIGHT,
    Direction.DOWN_LEFT,
  ];
}

export function isDiagonal(direction: Direction): boolean {
  const diagonals = [
    Direction.DOWN_LEFT,
    Direction.DOWN_RIGHT,
    Direction.UP_RIGHT,
    Direction.UP_LEFT,
  ];
  return diagonals.includes(direction);
}

export function turnCounterClockwise(direction: Direction): Direction {
  const mapping = {
    [Direction.LEFT]: Direction.DOWN_LEFT,
    [Direction.UP_LEFT]: Direction.LEFT,
    [Direction.UP]: Direction.UP_LEFT,
    [Direction.UP_RIGHT]: Direction.UP,
    [Direction.RIGHT]: Direction.UP_RIGHT,
    [Direction.DOWN_RIGHT]: Direction.RIGHT,
    [Direction.DOWN]: Direction.DOWN_RIGHT,
    [Direction.DOWN_LEFT]: Direction.DOWN,
    [Direction.NONE]: Direction.NONE,
  };
  return mapping[direction];
}

export function directionVector(direction: Direction): Vector2 {
  const directionVectors = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
    [Direction.NONE]: Vector2.ZERO,
    [Direction.UP_LEFT]: Vector2.UP_LEFT,
    [Direction.UP_RIGHT]: Vector2.UP_RIGHT,
    [Direction.DOWN_RIGHT]: Vector2.DOWN_RIGHT,
    [Direction.DOWN_LEFT]: Vector2.DOWN_LEFT,
  };
  return directionVectors[direction];
}

export function oppositeDirection(direction: Direction): Direction {
  const oppositeDirections = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
    [Direction.NONE]: Direction.NONE,
    [Direction.UP_LEFT]: Direction.DOWN_RIGHT,
    [Direction.UP_RIGHT]: Direction.DOWN_LEFT,
    [Direction.DOWN_RIGHT]: Direction.UP_LEFT,
    [Direction.DOWN_LEFT]: Direction.UP_RIGHT,
  };
  return oppositeDirections[direction];
}

export enum NumberOfDirections {
  FOUR = 4,
  EIGHT = 8,
}
