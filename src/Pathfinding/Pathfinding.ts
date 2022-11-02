import {
  directionFromPos,
  NumberOfDirections,
  oppositeDirection,
} from "../Direction/Direction";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { DistanceUtilsFactory } from "../Utils/DistanceUtilsFactory/DistanceUtilsFactory";
import { Vector2 } from "../Utils/Vector2/Vector2";
import {
  GetNeighbors,
  LayerPosition,
  ShortestPath,
  ShortestPathAlgorithm,
} from "./ShortestPathAlgorithm";

interface PathfindingOptions {
  shortestPathAlgorithm?: ShortestPathAlgorithm;
  pathWidth?: number;
  pathHeight?: number;
  numberOfDirections?: NumberOfDirections;
}

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
    }: // numberOfDirections = NumberOfDirections.FOUR,
    PathfindingOptions = {}
  ): ShortestPath {
    if (!shortestPathAlgorithm) {
      shortestPathAlgorithm = this.shortestPathAlgo;
    }
    const distanceUtils = DistanceUtilsFactory.create(NumberOfDirections.FOUR);

    const getNeighbors: GetNeighbors = (pos: LayerPosition) => {
      const neighbours = distanceUtils.neighbors(pos.position);
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

      return transitionMappedNeighbors.filter(
        (neighborPos) =>
          !this.isBlockingFrom(pos, neighborPos, pathWidth, pathHeight)
      );
    };

    const { path: shortestPath } = shortestPathAlgorithm.getShortestPath(
      source,
      dest,
      getNeighbors
    );
    return {
      path: shortestPath,
      distOffset: 0,
    };
  }

  private isBlockingFrom = (
    srcPos: LayerPosition,
    destPos: LayerPosition,
    pathWidth: number,
    pathHeight: number
  ): boolean => {
    if (!this.gridTilemap.isInRange(destPos.position)) return true;

    return this.hasBlockingTileFrom(srcPos, destPos, pathWidth, pathHeight);
  };

  private hasBlockingTileFrom(
    src: LayerPosition,
    dest: LayerPosition,
    pathWidth: number,
    pathHeight: number
  ): boolean {
    for (let x = dest.position.x; x < dest.position.x + pathWidth; x++) {
      for (let y = dest.position.y; y < dest.position.y + pathHeight; y++) {
        const res = this.gridTilemap.hasBlockingTile(
          new Vector2(x, y),
          dest.layer,
          oppositeDirection(directionFromPos(src.position, dest.position))
        );

        if (res) return true;
      }
    }
    return false;
  }
}
