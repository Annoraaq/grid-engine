import { Vector2 } from "./Vector2/Vector2.js";

export class VectorUtils {
  static vec2str(vec: Vector2): string {
    return `${vec.x}#${vec.y}`;
  }

  static equal(vec1: Vector2, vec2: Vector2): boolean {
    return VectorUtils.vec2str(vec1) == VectorUtils.vec2str(vec2);
  }

  static manhattanDistance(pos1: Vector2, pos2: Vector2): number {
    const xDist = Math.abs(pos1.x - pos2.x);
    const yDist = Math.abs(pos1.y - pos2.y);
    return xDist + yDist;
  }

  static chebyshevDistance(pos1: Vector2, pos2: Vector2): number {
    const xDist = Math.abs(pos1.x - pos2.x);
    const yDist = Math.abs(pos1.y - pos2.y);
    return Math.max(xDist, yDist);
  }

  static scalarMult(vec: Vector2, scalar: number): Vector2 {
    return vec.clone().multiply(new Vector2(scalar, scalar));
  }
}
