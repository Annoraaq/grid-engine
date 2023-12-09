import { Vector2 } from "../Utils/Vector2/Vector2.js";
import {
  Direction,
  directionFromPos,
  turnClockwise,
  turnCounterClockwise,
} from "./Direction.js";

describe("Direction", () => {
  it("should get direction from pos", () => {
    const base = new Vector2(5, 5);
    const up = new Vector2(5, 4);
    const down = new Vector2(5, 6);
    const left = new Vector2(4, 5);
    const right = new Vector2(6, 5);
    const downLeft = new Vector2(4, 6);
    const upLeft = new Vector2(4, 4);
    const downRight = new Vector2(6, 6);
    const upRight = new Vector2(6, 4);

    expect(directionFromPos(base, up)).toBe(Direction.UP);
    expect(directionFromPos(base, down)).toBe(Direction.DOWN);
    expect(directionFromPos(base, left)).toBe(Direction.LEFT);
    expect(directionFromPos(base, right)).toBe(Direction.RIGHT);
    expect(directionFromPos(base, downLeft)).toBe(Direction.DOWN_LEFT);
    expect(directionFromPos(base, upLeft)).toBe(Direction.UP_LEFT);
    expect(directionFromPos(base, downRight)).toBe(Direction.DOWN_RIGHT);
    expect(directionFromPos(base, upRight)).toBe(Direction.UP_RIGHT);
    expect(directionFromPos(base, base)).toBe(Direction.NONE);
  });

  it("gets clockwise mapping", () => {
    expect(turnClockwise(Direction.UP)).toBe(Direction.UP_RIGHT);
    expect(turnClockwise(Direction.UP_RIGHT)).toBe(Direction.RIGHT);
    expect(turnClockwise(Direction.RIGHT)).toBe(Direction.DOWN_RIGHT);
    expect(turnClockwise(Direction.DOWN_RIGHT)).toBe(Direction.DOWN);
    expect(turnClockwise(Direction.DOWN)).toBe(Direction.DOWN_LEFT);
    expect(turnClockwise(Direction.DOWN_LEFT)).toBe(Direction.LEFT);
    expect(turnClockwise(Direction.LEFT)).toBe(Direction.UP_LEFT);
    expect(turnClockwise(Direction.UP_LEFT)).toBe(Direction.UP);

    // 2 times
    expect(turnClockwise(Direction.UP, 2)).toBe(Direction.RIGHT);
    expect(turnClockwise(Direction.UP_RIGHT, 2)).toBe(Direction.DOWN_RIGHT);
    expect(turnClockwise(Direction.RIGHT, 2)).toBe(Direction.DOWN);
    expect(turnClockwise(Direction.DOWN_RIGHT, 2)).toBe(Direction.DOWN_LEFT);
    expect(turnClockwise(Direction.DOWN, 2)).toBe(Direction.LEFT);
    expect(turnClockwise(Direction.DOWN_LEFT, 2)).toBe(Direction.UP_LEFT);
    expect(turnClockwise(Direction.LEFT, 2)).toBe(Direction.UP);
    expect(turnClockwise(Direction.UP_LEFT, 2)).toBe(Direction.UP_RIGHT);

    // 3 times
    expect(turnClockwise(Direction.UP, 3)).toBe(Direction.DOWN_RIGHT);
    expect(turnClockwise(Direction.UP_RIGHT, 3)).toBe(Direction.DOWN);
    expect(turnClockwise(Direction.RIGHT, 3)).toBe(Direction.DOWN_LEFT);
    expect(turnClockwise(Direction.DOWN_RIGHT, 3)).toBe(Direction.LEFT);
    expect(turnClockwise(Direction.DOWN, 3)).toBe(Direction.UP_LEFT);
    expect(turnClockwise(Direction.DOWN_LEFT, 3)).toBe(Direction.UP);
    expect(turnClockwise(Direction.LEFT, 3)).toBe(Direction.UP_RIGHT);
    expect(turnClockwise(Direction.UP_LEFT, 3)).toBe(Direction.RIGHT);

    expect(turnClockwise(Direction.LEFT, 8)).toBe(Direction.LEFT);
    expect(turnClockwise(Direction.LEFT, 9)).toBe(Direction.UP_LEFT);
  });

  it("gets counter-clockwise mapping", () => {
    expect(turnCounterClockwise(Direction.UP)).toBe(Direction.UP_LEFT);
    expect(turnCounterClockwise(Direction.UP_RIGHT)).toBe(Direction.UP);
    expect(turnCounterClockwise(Direction.RIGHT)).toBe(Direction.UP_RIGHT);
    expect(turnCounterClockwise(Direction.DOWN_RIGHT)).toBe(Direction.RIGHT);
    expect(turnCounterClockwise(Direction.DOWN)).toBe(Direction.DOWN_RIGHT);
    expect(turnCounterClockwise(Direction.DOWN_LEFT)).toBe(Direction.DOWN);
    expect(turnCounterClockwise(Direction.LEFT)).toBe(Direction.DOWN_LEFT);
    expect(turnCounterClockwise(Direction.UP_LEFT)).toBe(Direction.LEFT);

    // 2 times
    expect(turnCounterClockwise(Direction.UP, 2)).toBe(Direction.LEFT);
    expect(turnCounterClockwise(Direction.UP_RIGHT, 2)).toBe(Direction.UP_LEFT);
    expect(turnCounterClockwise(Direction.RIGHT, 2)).toBe(Direction.UP);
    expect(turnCounterClockwise(Direction.DOWN_RIGHT, 2)).toBe(
      Direction.UP_RIGHT,
    );
    expect(turnCounterClockwise(Direction.DOWN, 2)).toBe(Direction.RIGHT);
    expect(turnCounterClockwise(Direction.DOWN_LEFT, 2)).toBe(
      Direction.DOWN_RIGHT,
    );
    expect(turnCounterClockwise(Direction.LEFT, 2)).toBe(Direction.DOWN);
    expect(turnCounterClockwise(Direction.UP_LEFT, 2)).toBe(
      Direction.DOWN_LEFT,
    );

    // 3 times
    expect(turnCounterClockwise(Direction.UP, 3)).toBe(Direction.DOWN_LEFT);
    expect(turnCounterClockwise(Direction.UP_RIGHT, 3)).toBe(Direction.LEFT);
    expect(turnCounterClockwise(Direction.RIGHT, 3)).toBe(Direction.UP_LEFT);
    expect(turnCounterClockwise(Direction.DOWN_RIGHT, 3)).toBe(Direction.UP);
    expect(turnCounterClockwise(Direction.DOWN, 3)).toBe(Direction.UP_RIGHT);
    expect(turnCounterClockwise(Direction.DOWN_LEFT, 3)).toBe(Direction.RIGHT);
    expect(turnCounterClockwise(Direction.LEFT, 3)).toBe(Direction.DOWN_RIGHT);
    expect(turnCounterClockwise(Direction.UP_LEFT, 3)).toBe(Direction.DOWN);

    expect(turnCounterClockwise(Direction.LEFT, 8)).toBe(Direction.LEFT);
    expect(turnCounterClockwise(Direction.LEFT, 9)).toBe(Direction.DOWN_LEFT);
  });
});
