import { GridTilemap } from "../GridTilemap/GridTilemap.js";
import { DistanceUtilsFactory } from "../Utils/DistanceUtilsFactory/DistanceUtilsFactory.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import {
  Direction,
  directionFromPos,
  directionVector,
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
 * For guidance on picking the right algorithm check out
 * {@link https://annoraaq.github.io/grid-engine/p/pathfinding-performance/|
 * pathfinding performance}.
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

  private ignoredCharsSet: Set<CharId>;

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
    this.ignoredCharsSet = new Set(ignoredChars);
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

    return transitionMappedNeighbors.filter((neighborPos) => {
      return (
        !this.isBlocking(pos, neighborPos) ||
        (this.options.ignoreBlockedTarget &&
          LayerPositionUtils.equal(neighborPos, dest))
      );
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

    const tileBlocking =
      !this.options.ignoreTiles &&
      this.hasBlockingTileFrom(
        src,
        dest,
        this.options.pathWidth,
        this.options.pathHeight,
        this.options.ignoreMapBounds,
        this.gridTilemap,
      );

    if (tileBlocking) return true;

    const charBlocking = this.hasBlockingCharFrom(
      src,
      dest,
      this.options.pathWidth,
      this.options.pathHeight,
      this.options.collisionGroups,
      this.ignoredCharsSet,
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
    if (this.options.ignoreLayers) {
      return {
        position: pos.position.add(
          directionVector(this.gridTilemap.toMapDirection(dir)),
        ),
        layer: pos.layer,
      };
    }
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
    src: LayerVecPos,
    dest: LayerVecPos,
    pathWidth: number,
    pathHeight: number,
    collisionGroups: string[],
    ignoredChars: Set<CharId>,
    gridTilemap: GridTilemap,
  ): boolean {
    if (pathWidth === 1 && pathHeight === 1) {
      return gridTilemap.hasBlockingChar(
        dest.position,
        dest.layer,
        collisionGroups,
        ignoredChars,
      );
    }

    const isBlocking = (pos: Vector2) => {
      return gridTilemap.hasBlockingChar(
        pos,
        dest.layer,
        collisionGroups,
        ignoredChars,
      );
    };

    const dir = directionFromPos(src.position, dest.position);
    return this.isBlockingMultiTile(
      src,
      dir,
      pathWidth,
      pathHeight,
      isBlocking,
    );
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

    const dir = directionFromPos(src.position, dest.position);
    const isBlocking = (pos: Vector2) => {
      return gridTilemap.hasBlockingTile(pos, dest.layer, dir, ignoreMapBounds);
    };

    return this.isBlockingMultiTile(
      src,
      dir,
      pathWidth,
      pathHeight,
      isBlocking,
    );
  }

  /**
   * This method is not the prettiest, but it minimizes the positions that have
   * to be checked in order to determine if a position is blocked for a
   * multi-tile character.
   */
  private isBlockingMultiTile(
    src: LayerVecPos,
    dir: Direction,
    pathWidth: number,
    pathHeight: number,
    isBlocking: (pos: Vector2) => boolean,
  ) {
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

    switch (dir) {
      case Direction.RIGHT: {
        return this.checkLine(right, isBlocking);
      }
      case Direction.LEFT: {
        return this.checkLine(left, isBlocking);
      }
      case Direction.UP: {
        return this.checkLine(up, isBlocking);
      }
      case Direction.DOWN: {
        return this.checkLine(down, isBlocking);
      }
      case Direction.UP_LEFT: {
        return (
          // up
          this.checkLine(
            { src: up.src, dest: new Vector2(up.dest.x - 1, up.dest.y) },
            isBlocking,
          ) ||
          // left
          this.checkLine(
            {
              src: new Vector2(left.src.x, left.src.y - 1),
              dest: new Vector2(left.dest.x, left.dest.y - 1),
            },
            isBlocking,
          )
        );
      }
      case Direction.UP_RIGHT: {
        return (
          // up
          this.checkLine(
            {
              src: new Vector2(up.src.x + 1, up.src.y),
              dest: up.dest,
            },
            isBlocking,
          ) ||
          // right
          this.checkLine(
            {
              src: new Vector2(right.src.x, right.src.y - 1),
              dest: new Vector2(right.dest.x, right.dest.y - 1),
            },
            isBlocking,
          )
        );
      }
      case Direction.DOWN_LEFT: {
        return (
          // left
          this.checkLine(
            {
              src: new Vector2(left.src.x, left.src.y + 1),
              dest: new Vector2(left.dest.x, left.dest.y + 1),
            },
            isBlocking,
          ) ||
          // down
          this.checkLine(
            { src: down.src, dest: new Vector2(down.dest.x - 1, down.dest.y) },
            isBlocking,
          )
        );
      }
      case Direction.DOWN_RIGHT: {
        return (
          // down
          this.checkLine(
            { src: new Vector2(down.src.x + 1, down.src.y), dest: down.dest },
            isBlocking,
          ) ||
          // right
          this.checkLine(
            {
              src: new Vector2(right.src.x, right.src.y + 1),
              dest: new Vector2(right.dest.x, right.dest.y + 1),
            },
            isBlocking,
          )
        );
      }
    }
    return false;
  }

  private checkLine(line: Line, isBlocking: (pos: Vector2) => boolean) {
    for (let x = line.src.x; x <= line.dest.x; x++) {
      for (let y = line.src.y; y <= line.dest.y; y++) {
        const res = isBlocking(new Vector2(x, y));
        if (res) return true;
      }
    }
    return false;
  }
}
