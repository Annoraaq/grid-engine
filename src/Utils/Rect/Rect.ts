import { Vector2 } from "../Vector2/Vector2.js";

export class Rect {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
  ) {}

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  isInRange(pos: Vector2): boolean {
    return (
      pos.x >= this.x &&
      pos.x < this.x + this.width &&
      pos.y >= this.y &&
      pos.y < this.y + this.height
    );
  }
}
