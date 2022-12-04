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

export interface PathfindingOptions {
  shortestPathAlgorithm?: ShortestPathAlgorithmType;
  pathWidth?: number;
  pathHeight?: number;
  numberOfDirections?: NumberOfDirections;
  isPositionAllowed?: IsPositionAllowedFn;
  collisionGroups?: string[];
  ignoredChars?: CharId[];
  ignoreTiles?: boolean;
  ignoreMapBounds?: boolean;
  ignoreBlockedTarget?: boolean;
}

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
      getNeighbors,
      this.gridTilemap
    );

    const b = shortestPathAlgo.getShortestPath(
      source,
      dest,
      getNeighbors,
      getReverseNeighbors
    );

    return b;
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
      const positionAllowed = options.isPositionAllowed(
        neighborPos.position,
        neighborPos.layer
      );
      const tileBlocking =
        !options.ignoreTiles &&
        hasBlockingTileFrom(
          pos,
          neighborPos,
          options.pathWidth,
          options.pathHeight,
          options.ignoreMapBounds,
          gridTilemap
        );
      const inRange =
        options.ignoreMapBounds || gridTilemap.isInRange(neighborPos.position);

      const charBlocking = gridTilemap.hasBlockingChar(
        neighborPos.position,
        neighborPos.layer,
        options.collisionGroups,
        new Set(options.ignoredChars)
      );

      const isBlocking =
        charBlocking || tileBlocking || !inRange || !positionAllowed;

      return (
        !isBlocking ||
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
  getNeighbors: GetNeighbors,
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

    const inRange =
      options.ignoreMapBounds || gridTilemap.isInRange(pos.position);

    const positionAllowed = options.isPositionAllowed(pos.position, pos.layer);

    return transitionMappedNeighbors.filter((neighborPos) => {
      const tileBlocking =
        !options.ignoreTiles &&
        hasBlockingTileFrom(
          neighborPos,
          pos,
          options.pathWidth,
          options.pathHeight,
          options.ignoreMapBounds,
          gridTilemap
        );

      const charBlocking = gridTilemap.hasBlockingChar(
        neighborPos.position,
        neighborPos.layer,
        options.collisionGroups,
        new Set(options.ignoredChars)
      );

      const isBlocking =
        charBlocking || tileBlocking || !inRange || !positionAllowed;

      return (
        !isBlocking ||
        (options.ignoreBlockedTarget && LayerPositionUtils.equal(pos, dest))
      );
    });
  };

  return getReverseNeighbors;
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
