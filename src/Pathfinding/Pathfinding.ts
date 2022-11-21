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
import { Vector2 } from "../Utils/Vector2/Vector2";
import {
  GetNeighbors,
  LayerPosition,
  ShortestPathAlgorithm,
} from "./ShortestPathAlgorithm";

interface PathfindingOptions {
  shortestPathAlgorithm?: ShortestPathAlgorithm;
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
  // TODO: replace by enum
  constructor(
    private shortestPathAlgo: ShortestPathAlgorithm,
    private gridTilemap: GridTilemap
  ) {}

  findShortestPath(
    source: LayerPosition,
    dest: LayerPosition,
    {
      shortestPathAlgorithm,
      pathWidth = 1,
      pathHeight = 1,
      numberOfDirections,
      isPositionAllowed = (_pos, _charLayer) => true,
      collisionGroups = [],
      ignoredChars = [],
      ignoreTiles = false,
      ignoreMapBounds = false,
      ignoreBlockedTarget = false,
    }: PathfindingOptions = {}
  ): { path: LayerPosition[]; closestToTarget: LayerPosition } {
    if (!shortestPathAlgorithm) {
      shortestPathAlgorithm = this.shortestPathAlgo;
    }
    const distanceUtils = DistanceUtilsFactory.create(
      numberOfDirections ?? NumberOfDirections.FOUR
    );

    const getNeighbors: GetNeighbors = (pos: LayerPosition) => {
      const neighbours = distanceUtils.neighbors(pos.position);
      console.log("urneighs", pos, neighbours);
      const transitionMappedNeighbors = neighbours.map((unblockedNeighbor) => {
        const transition = this.gridTilemap.getTransition(
          unblockedNeighbor,
          pos.layer
        );
        return {
          position: unblockedNeighbor,
          layer: transition || pos.layer,
        };
      });

      return transitionMappedNeighbors.filter((neighborPos) => {
        const positionAllowed = isPositionAllowed(
          neighborPos.position,
          neighborPos.layer
        );
        const tileBlocking =
          !ignoreTiles &&
          // TODO: the problem lies here. The reverseNeighbors funktion assumes that the getNeighbors function returns all neighbors.
          // Maybe the reverseNeighbors function should use the general neighbors function and then check via getNeigbors.
          this.hasBlockingTileFrom(
            pos,
            neighborPos,
            pathWidth,
            pathHeight,
            ignoreMapBounds
          );
        const inRange =
          ignoreMapBounds || this.gridTilemap.isInRange(neighborPos.position);

        const charBlocking = this.gridTilemap.hasBlockingChar(
          neighborPos.position,
          neighborPos.layer,
          collisionGroups,
          new Set(ignoredChars)
        );

        const isBlocking =
          positionAllowed && !tileBlocking && inRange && !charBlocking;

        return (
          isBlocking ||
          (ignoreBlockedTarget && LayerPositionUtils.equal(neighborPos, dest))
        );
      });
    };

    return shortestPathAlgorithm.getShortestPath(source, dest, getNeighbors);
  }

  private hasBlockingTileFrom(
    src: LayerPosition,
    dest: LayerPosition,
    pathWidth: number,
    pathHeight: number,
    ignoreMapBounds: boolean
  ): boolean {
    for (let x = dest.position.x; x < dest.position.x + pathWidth; x++) {
      for (let y = dest.position.y; y < dest.position.y + pathHeight; y++) {
        const res = this.gridTilemap.hasBlockingTile(
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
}
