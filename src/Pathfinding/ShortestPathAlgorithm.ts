import { LayerName } from "../GridTilemap/GridTilemap";
import { Vector2 } from "../Utils/Vector2/Vector2";

export interface LayerVecPos {
  position: Vector2;
  layer: LayerName;
}

export type GetNeighbors = (pos: LayerVecPos) => LayerVecPos[];

export interface ShortestPath {
  path: LayerVecPos[];
  distOffset: number;
}

export interface ShortestPathAlgorithm {
  getShortestPath(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
    getNeighbors: GetNeighbors
  ): { path: LayerVecPos[]; closestToTarget: LayerVecPos };
}
