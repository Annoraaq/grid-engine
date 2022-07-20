import { LayerName } from "../GridTilemap/GridTilemap";
import { Vector2 } from "../Utils/Vector2/Vector2";
export interface LayerPosition {
    position: Vector2;
    layer: LayerName;
}
export declare type GetNeighbors = (pos: LayerPosition) => LayerPosition[];
export interface ShortestPath {
    path: LayerPosition[];
    distOffset: number;
}
export interface ShortestPathAlgorithm {
    getShortestPath(startPos: LayerPosition, targetPos: LayerPosition, getNeighbors: GetNeighbors): {
        path: LayerPosition[];
        closestToTarget: LayerPosition;
    };
}
