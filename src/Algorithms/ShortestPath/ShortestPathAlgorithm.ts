import * as Phaser from "phaser";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export interface ShortestPathAlgorithm {
  getShortestPath(
    startPos: Vector2,
    targetPos: Vector2,
    getNeighbours: (pos: Vector2) => Vector2[]
  ): { path: Vector2[]; closestToTarget: Vector2 };
}
