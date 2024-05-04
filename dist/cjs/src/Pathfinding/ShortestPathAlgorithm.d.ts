import { GridTilemap } from "../GridTilemap/GridTilemap.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import { Direction } from "../Direction/Direction.js";
import { Concrete } from "../Utils/TypeUtils.js";
import { LayerVecPos } from "../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { PathfindingOptions } from "./PathfindingOptions.js";
/**
 * For guidance on picking the right algorithm check out
 * {@link https://annoraaq.github.io/grid-engine/p/pathfinding-performance/|
 * pathfinding performance}.
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
    private ignoredCharsSet;
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
    /**
     * This method is not the prettiest, but it minimizes the positions that have
     * to be checked in order to determine if a position is blocked for a
     * multi-tile character.
     */
    private isBlockingMultiTile;
    private checkLine;
}
