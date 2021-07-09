import { Position } from "../../GridEngine";

export class Vector2 {
  static readonly ZERO = new Vector2(0, 0);
  static readonly UP = new Vector2(0, -1);
  static readonly DOWN = new Vector2(0, 1);
  static readonly LEFT = new Vector2(-1, 0);
  static readonly RIGHT = new Vector2(1, 0);

  public x: number;
  public y: number;

  constructor(pos: Position);
  constructor(x: number, y: number);
  constructor(x: number | Position, y?: number) {
    if (typeof x === "number") {
      this.x = x;
      this.y = y || 0;
    } else {
      this.x = x.x;
      this.y = x.y;
    }
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  multiply(vector: Vector2): Vector2 {
    return new Vector2(this.x * vector.x, this.y * vector.y);
  }

  divide(vector: Vector2): Vector2 {
    return new Vector2(this.x / vector.x, this.y / vector.y);
  }

  subtract(vector: Vector2): Vector2 {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  equals(vector: Vector2): boolean {
    return this.x === vector.x && this.y === vector.y;
  }

  abs(): Vector2 {
    return new Vector2(Math.abs(this.x), Math.abs(this.y));
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  static min(vector1: Vector2, vector2: Vector2): Vector2 {
    if (vector1.x + vector1.y - vector2.x - vector2.y > 0) {
      return vector2;
    }
    return vector1;
  }
}
