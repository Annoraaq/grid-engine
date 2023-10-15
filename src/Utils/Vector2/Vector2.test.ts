import { Vector2 } from "./Vector2.js";

describe("Vector2", () => {
  it("should create", () => {
    const v = new Vector2(3, 4);
    expect(v.x).toEqual(3);
    expect(v.y).toEqual(4);
  });

  it("should create from Position", () => {
    const v = new Vector2({ x: 4, y: 5 });
    expect(v.x).toEqual(4);
    expect(v.y).toEqual(5);
  });

  it("should clone", () => {
    const v = new Vector2({ x: 4, y: 5 });
    const cloned = v.clone();
    v.x = 5;
    v.y = 7;
    expect(v.x).toEqual(5);
    expect(v.y).toEqual(7);
    expect(cloned.x).toEqual(4);
    expect(cloned.y).toEqual(5);
  });

  it("should add immutlably componentwise", () => {
    const v = new Vector2({ x: 4, y: 5 });
    const v2 = new Vector2({ x: 1, y: 1 });
    const added = v.add(v2);
    expect(added.x).toEqual(5);
    expect(added.y).toEqual(6);
    added.x = 1;
    expect(v.x).toEqual(4);
  });

  it("should multiply immutably componentwise", () => {
    const v = new Vector2({ x: 4, y: 5 });
    const v2 = new Vector2({ x: 2, y: 2 });
    const multiplied = v.multiply(v2);
    expect(multiplied.x).toEqual(8);
    expect(multiplied.y).toEqual(10);
    multiplied.x = 1;
    expect(v.x).toEqual(4);
  });

  it("should subtract immutably componentwise", () => {
    const v = new Vector2({ x: 4, y: 5 });
    const v2 = new Vector2({ x: 1, y: 1 });
    const subtracted = v.subtract(v2);
    expect(subtracted.x).toEqual(3);
    expect(subtracted.y).toEqual(4);
    subtracted.x = 1;
    expect(v.x).toEqual(4);
  });

  it("should detect equality", () => {
    const v = new Vector2({ x: 4, y: 5 });
    const bothDifferent = new Vector2({ x: 1, y: 1 });
    const yDifferent = new Vector2({ x: 4, y: 1 });
    const xDifferent = new Vector2({ x: 4, y: 1 });
    const equal = new Vector2({ x: 4, y: 5 });
    expect(v.equals(bothDifferent)).toBe(false);
    expect(v.equals(yDifferent)).toBe(false);
    expect(v.equals(xDifferent)).toBe(false);
    expect(v.equals(equal)).toBe(true);
    expect(equal.equals(v)).toBe(true);
  });

  it("should divide", () => {
    const v = new Vector2({ x: 4, y: 6 });
    const v2 = new Vector2({ x: 2, y: 3 });
    expect(v.divide(v2)).toEqual(new Vector2(2, 2));
  });

  it("should return absolute value", () => {
    const v = new Vector2({ x: -4, y: -6 });
    expect(v.abs()).toEqual(new Vector2(4, 6));
  });

  it("should return length", () => {
    const v = new Vector2({ x: 4, y: -3 });
    expect(v.length()).toEqual(5);
  });

  it("should convert to string", () => {
    const v = new Vector2({ x: 4, y: -3 });
    expect(v.toString()).toEqual("4#-3");
  });

  it("should multiply with scalar", () => {
    const v = new Vector2({ x: 4, y: -3 });
    expect(v.scalarMult(3)).toEqual(new Vector2(12, -9));
  });

  it("should modulo with vector", () => {
    const v = new Vector2({ x: 5, y: 9 });
    const modV = new Vector2({ x: 2, y: 5 });
    expect(v.modulo(modV)).toEqual(new Vector2(1, 4));
  });

  it("should modulo with scalar", () => {
    const v = new Vector2({ x: 5, y: 9 });
    const mod = 5;
    expect(v.scalarModulo(mod)).toEqual(new Vector2(0, 4));
  });

  it("should convert to position", () => {
    const v = new Vector2({ x: 5, y: 9 });
    expect(v.toPosition()).toEqual({ x: 5, y: 9 });
  });
});
