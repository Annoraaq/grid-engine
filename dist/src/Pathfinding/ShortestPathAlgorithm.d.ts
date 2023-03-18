import { CharLayer } from "../GridEngine";
import { Vector2 } from "../Utils/Vector2/Vector2";
export interface LayerVecPos {
    position: Vector2;
    layer: CharLayer;
}
export type GetNeighbors = (pos: LayerVecPos) => LayerVecPos[];
export type DistanceFn = (fromNode: Vector2, toNode: Vector2) => number;
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
export interface ShortestPathResult {
    path: LayerVecPos[];
    closestToTarget: LayerVecPos;
    steps: number;
    maxPathLengthReached: boolean;
}
export interface ShortestPathAlgorithm {
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors, distance: DistanceFn, getReverseNeighbors: GetNeighbors): ShortestPathResult;
    setMaxPathLength(maxPathLength: number): void;
}
export declare function shortestPathAlgorithmFactory(type: ShortestPathAlgorithmType): ShortestPathAlgorithm;
