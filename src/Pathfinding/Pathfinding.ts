import { NumberOfDirections } from "../Direction/Direction";
import { CharId } from "../GridCharacter/GridCharacter";
import { Position } from "../GridEngine";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { AStar } from "./AStar/AStar";
import { Bfs } from "./Bfs/Bfs";
import { BidirectionalSearch } from "./BidirectionalSearch/BidirectionalSearch";
import { Jps4 } from "./Jps4/Jps4";
import {
  LayerVecPos,
  ShortestPathAlgorithm,
  ShortestPathAlgorithmType,
  ShortestPathResult,
} from "./ShortestPathAlgorithm";

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

  /**
   * If this is set, the algorithm will stop once it reaches a path length of
   * this value. This is useful to avoid running out of memory on large or
   * infinite maps.
   */
  maxPathLength?: number;
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
export type IsPositionAllowedFn = (
  pos: Position,
  charLayer?: string
) => boolean;

export class Pathfinding {
  constructor(private gridTilemap: GridTilemap) {}

  findShortestPath(
    source: LayerVecPos,
    dest: LayerVecPos,
    pathfindingOptions: PathfindingOptions = {}
  ): ShortestPathResult {
    const shortestPathAlgo = shortestPathAlgorithmFactory(
      pathfindingOptions.shortestPathAlgorithm || "BIDIRECTIONAL_SEARCH",
      this.gridTilemap,
      pathfindingOptions
    );

    return shortestPathAlgo.findShortestPath(source, dest);
  }
}

function shortestPathAlgorithmFactory(
  type: ShortestPathAlgorithmType,
  gridTilemap: GridTilemap,
  options: PathfindingOptions
): ShortestPathAlgorithm {
  switch (type) {
    case "BIDIRECTIONAL_SEARCH":
      return new BidirectionalSearch(gridTilemap, options);
    case "A_STAR":
      return new AStar(gridTilemap, options);
    case "JPS":
      return new Jps4(gridTilemap, options);
  }
  return new Bfs(gridTilemap, options);
}
