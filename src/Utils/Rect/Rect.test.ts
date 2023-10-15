import { Vector2 } from "../Vector2/Vector2.js";
import { Rect } from "./Rect.js";

describe("Rect", () => {
  it("should create a rect", () => {
    const x = 10;
    const y = 20;
    const width = 30;
    const height = 40;
    const rect = new Rect(x, y, width, height);

    expect(rect).toBeTruthy();
    expect(rect.getX()).toEqual(x);
    expect(rect.getY()).toEqual(y);
    expect(rect.getWidth()).toEqual(width);
    expect(rect.getHeight()).toEqual(height);
  });

  it("should check positions in range", () => {
    const x = 10;
    const y = 20;
    const width = 30;
    const height = 40;
    const rect = new Rect(x, y, width, height);

    const inRange = { x: x + 10, y: y + 10 };
    const xTooSmall = { x: x - 1, y: y + 10 };
    const xMin = { x, y: y + 10 };
    const xMaxSize = { x: x + width - 1, y: y + 10 };
    const xTooLarge = { x: x + width, y: y + 10 };
    const yTooSmall = { x: x + 10, y: y - 1 };
    const yMin = { x: x + 10, y };
    const yMaxSize = { x: x + 10, y: y + height - 1 };
    const yTooLarge = { x: x + 10, y: y + height };

    expect(rect.isInRange(new Vector2(inRange))).toEqual(true);
    expect(rect.isInRange(new Vector2(xTooSmall))).toEqual(false);
    expect(rect.isInRange(new Vector2(xMin))).toEqual(true);
    expect(rect.isInRange(new Vector2(xMaxSize))).toEqual(true);
    expect(rect.isInRange(new Vector2(xTooLarge))).toEqual(false);
    expect(rect.isInRange(new Vector2(yTooSmall))).toEqual(false);
    expect(rect.isInRange(new Vector2(yMin))).toEqual(true);
    expect(rect.isInRange(new Vector2(yMaxSize))).toEqual(true);
    expect(rect.isInRange(new Vector2(yTooLarge))).toEqual(false);
  });
});
