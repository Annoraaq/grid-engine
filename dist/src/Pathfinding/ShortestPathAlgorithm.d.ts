import { CharLayer } from "../GridEngine";
import { Vector2 } from "../Utils/Vector2/Vector2";
export interface LayerVecPos {
    position: Vector2;
    layer: CharLayer;
}
export type GetNeighbors = (pos: LayerVecPos) => LayerVecPos[];
/**
 * BFS: (Breadth first search) Simple algorithm. It can find the shortest path
 * in O(4ᵈ) (resp O(8ᵈ) for 8 directions). d is the length of the shortest path.
 *
 * BIDIRECTIONAL_SEARCH: This algorithm starts 2 BFS, one from the start and
 * one from the end position. It has a performance of O(4^(d/2))
 * (resp O(8^(d/2))).
 */
export type ShortestPathAlgorithmType = "BFS" | "BIDIRECTIONAL_SEARCH";
export interface ShortestPath {
    path: LayerVecPos[];
    distOffset: number;
}
export interface ShortestPathAlgorithm {
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors, getReverseNeighbors: GetNeighbors): {
        path: LayerVecPos[];
        closestToTarget: LayerVecPos;
        steps: number;
    };
}
export declare function shortestPathAlgorithmFactory(type: ShortestPathAlgorithmType): ShortestPathAlgorithm;
