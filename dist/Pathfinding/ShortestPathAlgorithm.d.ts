import { LayerName } from "../GridTilemap/GridTilemap";
import { Vector2 } from "../Utils/Vector2/Vector2";
export interface LayerPosition {
    position: Vector2;
    layer: LayerName;
}
export interface ShortestPathAlgorithm {
    getShortestPath(startPos: LayerPosition, targetPos: LayerPosition, getNeighbours: (pos: LayerPosition) => LayerPosition[]): {
        path: LayerPosition[];
        closestToTarget: LayerPosition;
    };
}
