import { Vector2 } from "../Utils/Vector2/Vector2.js";
import { Direction, directionFromPos } from "./Direction.js";

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
});
