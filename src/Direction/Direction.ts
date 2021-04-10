import * as Phaser from "phaser";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

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

export const DirectionVectors: {
  [key in Direction]?: Vector2;
} = {
  [Direction.UP]: Vector2.UP,
  [Direction.DOWN]: Vector2.DOWN,
  [Direction.LEFT]: Vector2.LEFT,
  [Direction.RIGHT]: Vector2.RIGHT,
  [Direction.NONE]: Vector2.ZERO,
  [Direction.UP_LEFT]: new Vector2(-1, -1),
  [Direction.UP_RIGHT]: new Vector2(1, -1),
  [Direction.DOWN_RIGHT]: new Vector2(1, 1),
  [Direction.DOWN_LEFT]: new Vector2(-1, 1),
};

export const DirectionVectorsIsometric: {
  [key in Direction]?: Vector2;
} = {
  [Direction.DOWN]: new Vector2(-1, 1),
  [Direction.UP]: new Vector2(1, -1),
  [Direction.RIGHT]: new Vector2(1, 1),
  [Direction.LEFT]: new Vector2(-1, -1),
  [Direction.NONE]: Vector2.ZERO,
};

export const OppositeDirections: {
  [key in Direction]?: Direction;
} = {
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

export enum NumberOfDirections {
  FOUR = 4,
  EIGHT = 8,
}
