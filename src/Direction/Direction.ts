import * as Phaser from "phaser";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export enum Direction {
  NONE = "none",
  LEFT = "left",
  UP = "up",
  RIGHT = "right",
  DOWN = "down",
}

export const DirectionVectors: {
  [key in Direction]?: Vector2;
} = {
  [Direction.UP]: Vector2.UP,
  [Direction.DOWN]: Vector2.DOWN,
  [Direction.LEFT]: Vector2.LEFT,
  [Direction.RIGHT]: Vector2.RIGHT,
  [Direction.NONE]: Vector2.ZERO,
};

export function oppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
    default:
      return Direction.NONE;
  }
}
