import { Position } from "../../Position.js";

export class Vector2 {
  static get ZERO(): Vector2 {
    return new Vector2(0, 0);
  }

  static get ONE(): Vector2 {
    return new Vector2(1, 1);
  }

  static get UP(): Vector2 {
    return new Vector2(0, -1);
  }

  static get DOWN(): Vector2 {
    return new Vector2(0, 1);
  }

  static get LEFT(): Vector2 {
    return new Vector2(-1, 0);
  }

  static get RIGHT(): Vector2 {
    return new Vector2(1, 0);
  }

  static get UP_LEFT(): Vector2 {
    return new Vector2(-1, -1);
  }

  static get UP_RIGHT(): Vector2 {
    return new Vector2(1, -1);
  }

  static get DOWN_RIGHT(): Vector2 {
    return new Vector2(1, 1);
  }

  static get DOWN_LEFT(): Vector2 {
    return new Vector2(-1, 1);
  }

  x: number;
  y: number;

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

  modulo(vector: Vector2): Vector2 {
    return new Vector2(this.x % vector.x, this.y % vector.y);
  }

  scalarModulo(scalar: number): Vector2 {
    return new Vector2(this.x % scalar, this.y % scalar);
  }

  scalarMult(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  toPosition(): Position {
    return { x: this.x, y: this.y };
  }

  toString(): string {
    return `${this.x}#${this.y}`;
  }
}
