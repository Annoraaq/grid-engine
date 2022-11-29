import { CharLayer } from "../GridEngine";
import { Vector2 } from "../Utils/Vector2/Vector2";
export interface LayerVecPos {
    position: Vector2;
    layer: CharLayer;
}
export declare type GetNeighbors = (pos: LayerVecPos) => LayerVecPos[];
export interface ShortestPath {
    path: LayerVecPos[];
    distOffset: number;
}
export interface ShortestPathAlgorithm {
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors): {
        path: LayerVecPos[];
        closestToTarget: LayerVecPos;
    };
}
