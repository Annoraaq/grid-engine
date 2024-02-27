import { NumberOfDirections } from "../Direction/Direction.js";
import { CharId } from "../GridCharacter/GridCharacter.js";
import { Position } from "../Position.js";
import { ShortestPathAlgorithmType } from "./ShortestPathAlgorithm.js";

/**
 * Configuration object for pathfinding.
 *
 * @category Pathfinding
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

  /**
   * If this is set, the algorithm will stop once it reaches a path length of
   * this value. This is useful to avoid running out of memory on large or
   * infinite maps.
   */
  maxPathLength?: number;

  /**
   * If set to `true`, pathfinding will only be performed on the char layer of
   * the start position. If you don't use char layers, activating this setting
   * can improve pathfinding performance.
   *
   * @default false
   */
  ignoreLayers?: boolean;

  /**
   * Only considered by A* algorithm.
   * If set to `true`, pathfinding will consider costs. Costs are set via tile
   * properties.
   *
   * @default false
   */
  considerCosts?: boolean;

  /**
   * If `true`, {@link PathfindingResult.closestToTarget} is calculated.
   * Otherwise it is ignored in some algorithms and will not be set in {@link PathfindingResult}.
   * Depending on the used pathfinding algorithm (like for BIDIRECTIONAL_SEARCH)
   * it can be faster if it is disabled. It will not be ignored in algorithms
   * where it does not come with a performance penalty (like BFS).
   *
   * @default true
   */
  calculateClosestToTarget?: boolean;
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
 *
 * @category Pathfinding
 */
export type IsPositionAllowedFn = (
  pos: Position,
  charLayer?: string,
) => boolean;
