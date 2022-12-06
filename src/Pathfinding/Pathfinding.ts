import {
  directionFromPos,
  NumberOfDirections,
  oppositeDirection,
} from "../Direction/Direction";
import { CharId } from "../GridCharacter/GridCharacter";
import { Position } from "../GridEngine";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { DistanceUtilsFactory } from "../Utils/DistanceUtilsFactory/DistanceUtilsFactory";
import { LayerPositionUtils } from "../Utils/LayerPositionUtils/LayerPositionUtils";
import { Concrete } from "../Utils/TypeUtils";
import { Vector2 } from "../Utils/Vector2/Vector2";
import {
  GetNeighbors,
  LayerVecPos,
  shortestPathAlgorithmFactory,
  ShortestPathAlgorithmType,
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
  constructor(
    private shortestPathAlgorithm: ShortestPathAlgorithmType,
    private gridTilemap: GridTilemap
  ) {}

  findShortestPath(
    source: LayerVecPos,
    dest: LayerVecPos,
    {
      shortestPathAlgorithm,
      pathWidth = 1,
      pathHeight = 1,
      numberOfDirections = NumberOfDirections.FOUR,
      isPositionAllowed = (_pos, _charLayer) => true,
      collisionGroups = [],
      ignoredChars = [],
      ignoreTiles = false,
      ignoreMapBounds = false,
      ignoreBlockedTarget = false,
    }: PathfindingOptions = {}
  ): { path: LayerVecPos[]; closestToTarget: LayerVecPos; steps: number } {
    const shortestPathAlgo = shortestPathAlgorithmFactory(
      shortestPathAlgorithm ?? this.shortestPathAlgorithm
    );

    const ops: Concrete<PathfindingOptions> = {
      shortestPathAlgorithm:
        shortestPathAlgorithm || this.shortestPathAlgorithm,
      pathWidth,
      pathHeight,
      numberOfDirections,
      isPositionAllowed,
      collisionGroups,
      ignoredChars,
      ignoreTiles,
      ignoreMapBounds,
      ignoreBlockedTarget,
    };

    const getNeighbors = createGetNeighbors(ops, dest, this.gridTilemap);
    const getReverseNeighbors = createReverseNeighbors(
      ops,
      dest,
      this.gridTilemap
    );

    return shortestPathAlgo.getShortestPath(
      source,
      dest,
      getNeighbors,
      getReverseNeighbors
    );
  }
}

export function createGetNeighbors(
  options: Concrete<PathfindingOptions>,
  dest: LayerVecPos,
  gridTilemap: GridTilemap
): GetNeighbors {
  const distanceUtils = DistanceUtilsFactory.create(
    options.numberOfDirections ?? NumberOfDirections.FOUR
  );
  const getNeighbors: GetNeighbors = (pos: LayerVecPos) => {
    const neighbours = distanceUtils.neighbors(pos.position);
    const transitionMappedNeighbors = neighbours.map((unblockedNeighbor) => {
      const transition = gridTilemap.getTransition(
        unblockedNeighbor,
        pos.layer
      );
      return {
        position: unblockedNeighbor,
        layer: transition || pos.layer,
      };
    });

    return transitionMappedNeighbors.filter((neighborPos) => {
      return (
        !isBlocking(pos, neighborPos, gridTilemap, options) ||
        (options.ignoreBlockedTarget &&
          LayerPositionUtils.equal(neighborPos, dest))
      );
    });
  };

  return getNeighbors;
}

export function createReverseNeighbors(
  options: Concrete<PathfindingOptions>,
  dest: LayerVecPos,
  gridTilemap: GridTilemap
): GetNeighbors {
  const distanceUtils = DistanceUtilsFactory.create(
    options.numberOfDirections ?? NumberOfDirections.FOUR
  );
  const getReverseNeighbors: GetNeighbors = (pos: LayerVecPos) => {
    const neighbours = distanceUtils.neighbors(pos.position);
    const transitions = gridTilemap.getTransitions();
    const toCurrentLayer = [...transitions.keys()]
      .filter((key) => key === pos.position.toString())
      .map((k) => transitions.get(k))
      .map((v) => {
        if (!v) return [];
        return [...v.keys()].filter((k) => v.get(k) === pos.layer);
      })
      .flat();

    const transFromLayer = gridTilemap.getTransition(pos.position, pos.layer);
    if (!(transFromLayer && transFromLayer !== pos.layer)) {
      toCurrentLayer.push(pos.layer);
    }

    const transitionMappedNeighbors = neighbours
      .map((unblockedNeighbor) => {
        return toCurrentLayer.map((lay) => {
          return {
            position: unblockedNeighbor,
            layer: lay || pos.layer,
          };
        });
      })
      .flat();

    return transitionMappedNeighbors.filter((neighborPos) => {
      return (
        !isBlocking(neighborPos, pos, gridTilemap, options) ||
        (options.ignoreBlockedTarget && LayerPositionUtils.equal(pos, dest))
      );
    });
  };

  return getReverseNeighbors;
}

export function isBlocking(
  src: LayerVecPos,
  dest: LayerVecPos,
  gridTilemap: GridTilemap,
  options: Concrete<PathfindingOptions>
): boolean {
  const positionAllowed = options.isPositionAllowed(dest.position, dest.layer);
  const tileBlocking =
    !options.ignoreTiles &&
    hasBlockingTileFrom(
      src,
      dest,
      options.pathWidth,
      options.pathHeight,
      options.ignoreMapBounds,
      gridTilemap
    );
  const inRange =
    options.ignoreMapBounds || gridTilemap.isInRange(dest.position);

  const charBlocking = hasBlockingCharFrom(
    dest,
    options.pathWidth,
    options.pathHeight,
    options.collisionGroups,
    options.ignoredChars,
    gridTilemap
  );

  return charBlocking || tileBlocking || !inRange || !positionAllowed;
}

function hasBlockingCharFrom(
  pos: LayerVecPos,
  pathWidth: number,
  pathHeight: number,
  collisionGroups: string[],
  ignoredChars: CharId[],
  gridTilemap: GridTilemap
): boolean {
  for (let x = pos.position.x; x < pos.position.x + pathWidth; x++) {
    for (let y = pos.position.y; y < pos.position.y + pathHeight; y++) {
      const res = gridTilemap.hasBlockingChar(
        new Vector2(x, y),
        pos.layer,
        collisionGroups,
        new Set(ignoredChars)
      );

      if (res) return true;
    }
  }
  return false;
}

function hasBlockingTileFrom(
  src: LayerVecPos,
  dest: LayerVecPos,
  pathWidth: number,
  pathHeight: number,
  ignoreMapBounds: boolean,
  gridTilemap: GridTilemap
): boolean {
  for (let x = dest.position.x; x < dest.position.x + pathWidth; x++) {
    for (let y = dest.position.y; y < dest.position.y + pathHeight; y++) {
      const res = gridTilemap.hasBlockingTile(
        new Vector2(x, y),
        dest.layer,
        oppositeDirection(directionFromPos(src.position, dest.position)),
        ignoreMapBounds
      );

      if (res) return true;
    }
  }
  return false;
}
