import { NumberOfDirections } from "../Direction/Direction";
import { CharId } from "../GridCharacter/GridCharacter";
import { Position } from "../GridEngine";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { Concrete } from "../Utils/TypeUtils";
import { GetNeighbors, LayerVecPos, ShortestPathAlgorithmType } from "./ShortestPathAlgorithm";
/**
 * Configuration object for pathfinding.
 */
export interface PathfindingOptions {
    /** Algorithm used for Pathfinding. */
    shortestPathAlgorithm?: ShortestPathAlgorithmType;
    /**
     * Consecutive tiles in x-dimension that need to fit in the path.
     * This is useful for characters that span over multiple tiles.
     */
    pathWidth?: number;
    /**
     * Consecutive tiles in y-dimension that need to fit in the path.
     * This is useful for characters that span over multiple tiles.
     */
    pathHeight?: number;
    /**
     * The number of directions to consider.
     */
    numberOfDirections?: NumberOfDirections;
    /**
     * Function to specify whether a certain position is allowed for pathfinding.
     * If the function returns false, the tile will be consindered as blocked.
     *
     * It can be used to restrict pathfinding to specific regions.
     *
     * Beware that this method can become a performance bottleneck easily. So be
     * careful and keep it as efficient as possible. An asymptotic runtime
     * complexity of O(1) is recommended.
     */
    isPositionAllowed?: IsPositionAllowedFn;
    /**
     * The collision groups to consider for pathfinding.
     */
    collisionGroups?: string[];
    /**
     * Set of characters to ignore at collision checking.
     */
    ignoredChars?: CharId[];
    /**
     * If set to `true`, tile collisions will be ignored.
     */
    ignoreTiles?: boolean;
    /**
     * If set to `true`, map boundaries are ignored. By default, positions
     * outside of the boundaries of the tilemap are considered to be blocking,
     * even if {@link PathfindingOptions.ignoreTiles} is set to `false`.
     */
    ignoreMapBounds?: boolean;
    /**
     * If set to `true`, pathfinding will find a path, even if the target is
     * blocked. This is a common use case if you want to find the shortest path
     * to a blocking character.
     */
    ignoreBlockedTarget?: boolean;
}
/**
 * Function to specify whether a certain position is allowed for pathfinding.
 * If the function returns false, the tile will be consindered as blocked.
 *
 * It can be used to restrict pathfinding to specific regions.
 *
 * Beware that this method can become a performance bottleneck easily. So be
 * careful and keep it as efficient as possible. An asymptotic runtime
 * complexity of O(1) is recommended.
 */
export type IsPositionAllowedFn = (pos: Position, charLayer?: string) => boolean;
export declare class Pathfinding {
    private shortestPathAlgorithm;
    private gridTilemap;
    constructor(shortestPathAlgorithm: ShortestPathAlgorithmType, gridTilemap: GridTilemap);
    findShortestPath(source: LayerVecPos, dest: LayerVecPos, { shortestPathAlgorithm, pathWidth, pathHeight, numberOfDirections, isPositionAllowed, collisionGroups, ignoredChars, ignoreTiles, ignoreMapBounds, ignoreBlockedTarget, }?: PathfindingOptions): {
        path: LayerVecPos[];
        closestToTarget: LayerVecPos;
        steps: number;
    };
}
export declare function createGetNeighbors(options: Concrete<PathfindingOptions>, dest: LayerVecPos, gridTilemap: GridTilemap): GetNeighbors;
export declare function createReverseNeighbors(options: Concrete<PathfindingOptions>, dest: LayerVecPos, gridTilemap: GridTilemap): GetNeighbors;
export declare function isBlocking(src: LayerVecPos, dest: LayerVecPos, gridTilemap: GridTilemap, options: Concrete<PathfindingOptions>): boolean;
