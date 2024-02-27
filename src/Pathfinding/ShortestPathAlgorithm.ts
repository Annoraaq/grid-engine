import { GridTilemap } from "../GridTilemap/GridTilemap.js";
import { DistanceUtilsFactory } from "../Utils/DistanceUtilsFactory/DistanceUtilsFactory.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import {
  Direction,
  directionFromPos,
  NumberOfDirections,
} from "../Direction/Direction.js";
import { Concrete } from "../Utils/TypeUtils.js";
import {
  LayerPositionUtils,
  LayerVecPos,
} from "../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { CharId } from "../GridCharacter/GridCharacter.js";
import { VectorUtils } from "../Utils/VectorUtils.js";
import { PathfindingOptions } from "./PathfindingOptions.js";
import { CharLayer } from "../Position.js";

type Line = { src: Vector2; dest: Vector2 };

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
export type ShortestPathAlgorithmType =
  | "BFS"
  | "BIDIRECTIONAL_SEARCH"
  | "A_STAR"
  | "JPS";

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

export abstract class ShortestPathAlgorithm {
  protected options: Concrete<PathfindingOptions>;

  findShortestPath(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult {
    if (this.options.ignoreLayers) {
      this.gridTilemap.fixCacheLayer(startPos.layer);
      targetPos.layer = startPos.layer;
    }
    const res = this.findShortestPathImpl(startPos, targetPos);
    this.gridTilemap.unfixCacheLayers();

    return res;
  }

  abstract findShortestPathImpl(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult;

  constructor(
    protected gridTilemap: GridTilemap,
    {
      shortestPathAlgorithm = "BFS",
      pathWidth = 1,
      pathHeight = 1,
      numberOfDirections = NumberOfDirections.FOUR,
      isPositionAllowed = (_pos, _charLayer) => true,
      collisionGroups = [],
      ignoredChars = [],
      ignoreTiles = false,
      ignoreMapBounds = false,
      ignoreBlockedTarget = false,
      maxPathLength = Infinity,
      ignoreLayers = false,
      considerCosts = false,
      calculateClosestToTarget = true,
    }: PathfindingOptions = {},
  ) {
    this.options = {
      shortestPathAlgorithm,
      pathWidth,
      pathHeight,
      numberOfDirections,
      isPositionAllowed,
      collisionGroups,
      ignoredChars,
      ignoreTiles,
      ignoreMapBounds,
      ignoreBlockedTarget,
      maxPathLength,
      ignoreLayers,
      considerCosts,
      calculateClosestToTarget,
    };
  }

  getNeighbors(pos: LayerVecPos, dest: LayerVecPos): LayerVecPos[] {
    const distanceUtils = DistanceUtilsFactory.create(
      this.options.numberOfDirections ?? NumberOfDirections.FOUR,
    );
    const neighbours = distanceUtils.neighbors(pos.position);
    const transitionMappedNeighbors = neighbours.map((unblockedNeighbor) => {
      let transition = pos.layer;
      if (!this.options.ignoreLayers) {
        transition = this.gridTilemap.getTransition(
          unblockedNeighbor,
          pos.layer,
        );
      }

      return {
        position: unblockedNeighbor,
        layer: transition || pos.layer,
      };
    });

    // console.log("---", transitionMappedNeighbors);
    return transitionMappedNeighbors.filter((neighborPos) => {
      const ib = this.isBlocking(pos, neighborPos);
      // console.log("ib", neighborPos, ib);

      // console.log("nn", LayerPositionUtils.equal(neighborPos, dest));
      const t =
        !ib ||
        (this.options.ignoreBlockedTarget &&
          LayerPositionUtils.equal(neighborPos, dest));
      // console.log("check neigh", neighborPos, t);
      return t;
    });
  }

  getTransition(pos: Vector2, fromLayer?: string): string | undefined {
    if (this.options.ignoreLayers) return undefined;
    return this.gridTilemap.getTransition(pos, fromLayer);
  }

  getCosts(src: Vector2, dest: LayerVecPos): number {
    if (!this.options.considerCosts) return 1;

    const dir = directionFromPos(dest.position, src);
    return this.gridTilemap.getTileCosts(dest, dir);
  }

  isBlocking(src: LayerVecPos, dest: LayerVecPos): boolean {
    // All the early returns are for performance.

    const inRange =
      this.options.ignoreMapBounds || this.gridTilemap.isInRange(dest.position);

    if (!inRange) return true;

    const positionAllowed = this.options.isPositionAllowed(
      dest.position,
      dest.layer,
    );

    if (!positionAllowed) return true;

    const hbtf = this.hasBlockingTileFrom(
      src,
      dest,
      this.options.pathWidth,
      this.options.pathHeight,
      this.options.ignoreMapBounds,
      this.gridTilemap,
    );

    const tileBlocking = !this.options.ignoreTiles && hbtf;
    if (tileBlocking) return true;

    const charBlocking = this.hasBlockingCharFrom(
      dest,
      this.options.pathWidth,
      this.options.pathHeight,
      this.options.collisionGroups,
      this.options.ignoredChars,
      this.gridTilemap,
    );

    return charBlocking;
  }

  distance(fromNode: Vector2, toNode: Vector2): number {
    const distance =
      this.options.numberOfDirections === NumberOfDirections.FOUR
        ? VectorUtils.manhattanDistance
        : VectorUtils.chebyshevDistance;
    return distance(fromNode, toNode);
  }

  getTilePosInDir(pos: LayerVecPos, dir: Direction): LayerVecPos {
    return this.gridTilemap.getTilePosInDirection(pos, dir);
  }

  getReverseNeighbors(pos: LayerVecPos, dest: LayerVecPos): LayerVecPos[] {
    const distanceUtils = DistanceUtilsFactory.create(
      this.options.numberOfDirections ?? NumberOfDirections.FOUR,
    );
    const neighbors = distanceUtils.neighbors(pos.position);

    let toCurrentLayerArr: CharLayer[] | undefined = undefined;
    if (!this.options.ignoreLayers) {
      const toCurrentLayer = this.gridTilemap.getReverseTransitions(
        pos.position,
        pos.layer,
      );
      toCurrentLayerArr = toCurrentLayer ? [...toCurrentLayer] : undefined;
    }

    const transitionMappedNeighbors = neighbors
      .map((neighbor) => {
        if (!toCurrentLayerArr) {
          return [
            {
              position: neighbor,
              layer: pos.layer,
            },
          ];
        }
        return toCurrentLayerArr.map((lay) => {
          return {
            position: neighbor,
            layer: lay || pos.layer,
          };
        });
      })
      .flat();

    return transitionMappedNeighbors.filter((neighborPos) => {
      return (
        !this.isBlocking(neighborPos, pos) ||
        (this.options.ignoreBlockedTarget &&
          LayerPositionUtils.equal(pos, dest))
      );
    });
  }

  private hasBlockingCharFrom(
    pos: LayerVecPos,
    pathWidth: number,
    pathHeight: number,
    collisionGroups: string[],
    ignoredChars: CharId[],
    gridTilemap: GridTilemap,
  ): boolean {
    for (let x = pos.position.x; x < pos.position.x + pathWidth; x++) {
      for (let y = pos.position.y; y < pos.position.y + pathHeight; y++) {
        const res = gridTilemap.hasBlockingChar(
          new Vector2(x, y),
          pos.layer,
          collisionGroups,
          new Set(ignoredChars),
        );

        if (res) return true;
      }
    }
    return false;
  }

  private hasBlockingTileFrom(
    src: LayerVecPos,
    dest: LayerVecPos,
    pathWidth: number,
    pathHeight: number,
    ignoreMapBounds: boolean,
    gridTilemap: GridTilemap,
  ): boolean {
    if (pathWidth === 1 && pathHeight === 1) {
      return gridTilemap.hasBlockingTile(
        dest.position,
        dest.layer,
        directionFromPos(dest.position, src.position),
        ignoreMapBounds,
      );
    }

    // TODO shortcut for single size path
    const dir = directionFromPos(src.position, dest.position);
    // if (
    //   dest.position.x === 2 &&
    //   dest.position.y === 0 &&
    //   dest.layer === "testCharLayer"
    // ) {
    //   console.log("DIR checki", dir);
    // }

    const right: Line = {
      src: new Vector2(src.position.x + pathWidth, src.position.y),
      dest: new Vector2(
        src.position.x + pathWidth,
        src.position.y + pathHeight - 1,
      ),
    };
    const left: Line = {
      src: new Vector2(src.position.x - 1, src.position.y),
      dest: new Vector2(src.position.x - 1, src.position.y + pathHeight - 1),
    };
    const up: Line = {
      src: new Vector2(src.position.x, src.position.y - 1),
      dest: new Vector2(src.position.x + pathWidth - 1, src.position.y - 1),
    };
    const down: Line = {
      src: new Vector2(src.position.x, src.position.y + pathHeight),
      dest: new Vector2(
        src.position.x + pathWidth - 1,
        src.position.y + pathHeight,
      ),
    };

    // 1. get the border from dir
    switch (dir) {
      case Direction.RIGHT: {
        return this.checkDir(right, gridTilemap, dest, dir, ignoreMapBounds);
      }
      case Direction.LEFT: {
        // console.log("check left");
        return this.checkDir(left, gridTilemap, dest, dir, ignoreMapBounds);
      }
      case Direction.UP: {
        // console.log("check up");
        return this.checkDir(up, gridTilemap, dest, dir, ignoreMapBounds);
      }
      case Direction.DOWN: {
        // console.log("check down");
        return this.checkDir(down, gridTilemap, dest, dir, ignoreMapBounds);
      }
      case Direction.UP_LEFT: {
        // console.log("check up left");
        const upRes = this.checkDir(
          { src: up.src, dest: new Vector2(up.dest.x - 1, up.dest.y) },
          gridTilemap,
          dest,
          dir,
          ignoreMapBounds,
        );
        const leftRes = this.checkDir(
          {
            src: new Vector2(left.src.x, left.src.y - 1),
            dest: new Vector2(left.dest.x, left.dest.y - 1),
          },
          gridTilemap,
          dest,
          dir,
          ignoreMapBounds,
        );
        // TODO optimize: only check leftRes if upRes did not return true.
        return upRes || leftRes;
      }
      case Direction.UP_RIGHT: {
        // console.log("check up right");
        const upRes = this.checkDir(
          {
            src: new Vector2(up.src.x + 1, up.src.y),
            dest: up.dest,
          },
          gridTilemap,
          dest,
          dir,
          ignoreMapBounds,
        );
        const rightRes = this.checkDir(
          {
            src: new Vector2(right.src.x, right.src.y - 1),
            dest: new Vector2(right.dest.x, right.dest.y - 1),
          },
          gridTilemap,
          dest,
          dir,
          ignoreMapBounds,
        );
        return upRes || rightRes;
      }
      case Direction.DOWN_LEFT: {
        // console.log("check down left");
        const leftRes = this.checkDir(
          {
            src: new Vector2(left.src.x, left.src.y + 1),
            dest: new Vector2(left.dest.x, left.dest.y + 1),
          },
          gridTilemap,
          dest,
          dir,
          ignoreMapBounds,
        );
        const downRes = this.checkDir(
          { src: down.src, dest: new Vector2(down.dest.x - 1, down.dest.y) },
          gridTilemap,
          dest,
          dir,
          ignoreMapBounds,
        );
        return downRes || leftRes;
      }
      case Direction.DOWN_RIGHT: {
        // console.log("checkdown", {
        //   src: down.src,
        //   dest: new Vector2(down.dest.x + 1, down.dest.y),
        // });
        const downRes = this.checkDir(
          { src: new Vector2(down.src.x + 1, down.src.y), dest: down.dest },
          gridTilemap,
          dest,
          dir,
          ignoreMapBounds,
        );
        // console.log("checkright");
        const rightRes = this.checkDir(
          {
            src: new Vector2(right.src.x, right.src.y + 1),
            dest: new Vector2(right.dest.x, right.dest.y + 1),
          },
          gridTilemap,
          dest,
          dir,
          ignoreMapBounds,
        );

        return downRes || rightRes;
      }
    }
    return false;
  }

  private checkDir(
    line: Line,
    gridTilemap: GridTilemap,
    dest: LayerVecPos,
    dir: Direction,
    ignoreMapBounds: boolean,
  ) {
    for (let x = line.src.x; x <= line.dest.x; x++) {
      for (let y = line.src.y; y <= line.dest.y; y++) {
        const res = gridTilemap.hasBlockingTile(
          new Vector2(x, y),
          dest.layer,
          dir,
          ignoreMapBounds,
        );
        if (res) return true;
      }
    }
    return false;
  }
}
