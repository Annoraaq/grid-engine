import * as Phaser from "phaser";

export class VectorUtils {
  static vec2str(vec: Phaser.Math.Vector2) {
    return `${vec.x}#${vec.y}`;
  }
}
