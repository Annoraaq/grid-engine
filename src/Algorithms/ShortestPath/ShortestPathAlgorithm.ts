import { Vector2 } from "../../Utils/Vector2/Vector2";

export interface ShortestPathAlgorithm {
  getShortestPath(
    startPos: Vector2,
    targetPos: Vector2,
    getNeighbours: (pos: Vector2) => Vector2[]
  ): { path: Vector2[]; closestToTarget: Vector2 };
}
