import * as Phaser from "phaser";
type Vector2 = Phaser.Math.Vector2;

export class VectorUtils {
  static vec2str(vec: Vector2) {
    return `${vec.x}#${vec.y}`;
  }

  static equal(vec1: Vector2, vec2: Vector2) {
    return VectorUtils.vec2str(vec1) == VectorUtils.vec2str(vec2);
  }
}
