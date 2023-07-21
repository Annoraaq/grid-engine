import { CharLayer, Direction } from "../GridEngine";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { PathfindingOptions } from "./Pathfinding";
import { Concrete } from "../Utils/TypeUtils";
export interface LayerVecPos {
    position: Vector2;
    layer: CharLayer;
}
/**
 * BFS: (Breadth first search) Simple algorithm. It can find the shortest path
 * in O(4ᵈ) (resp O(8ᵈ) for 8 directions). d is the length of the shortest path.
 *
 * BIDIRECTIONAL_SEARCH: This algorithm starts 2 BFS, one from the start and
 * one from the end position. It has a performance of O(4^(d/2))
 * (resp O(8^(d/2))).
 *
 * @category Pathfinding
 */
export type ShortestPathAlgorithmType = "BFS" | "BIDIRECTIONAL_SEARCH" | "A_STAR" | "JPS";
export interface ShortestPath {
    path: LayerVecPos[];
    distOffset: number;
}
export interface ShortestPathResult {
    path: LayerVecPos[];
    closestToTarget?: LayerVecPos;
    steps: number;
    maxPathLengthReached: boolean;
    algorithmUsed: ShortestPathAlgorithmType;
}
export declare abstract class ShortestPathAlgorithm {
    protected gridTilemap: GridTilemap;
    protected options: Concrete<PathfindingOptions>;
    findShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    abstract findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    constructor(gridTilemap: GridTilemap, { shortestPathAlgorithm, pathWidth, pathHeight, numberOfDirections, isPositionAllowed, collisionGroups, ignoredChars, ignoreTiles, ignoreMapBounds, ignoreBlockedTarget, maxPathLength, ignoreLayers, considerCosts, calculateClosestToTarget, }?: PathfindingOptions);
    getNeighbors(pos: LayerVecPos, dest: LayerVecPos): LayerVecPos[];
    getTransition(pos: Vector2, fromLayer?: string): string | undefined;
    getCosts(src: Vector2, dest: LayerVecPos): number;
    isBlocking(src: LayerVecPos, dest: LayerVecPos): boolean;
    distance(fromNode: Vector2, toNode: Vector2): number;
    getTilePosInDir(pos: LayerVecPos, dir: Direction): LayerVecPos;
    getReverseNeighbors(pos: LayerVecPos, dest: LayerVecPos): LayerVecPos[];
    private hasBlockingCharFrom;
    private hasBlockingTileFrom;
}
