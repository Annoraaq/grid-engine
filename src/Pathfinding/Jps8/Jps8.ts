import { directionFromPos, isDiagonal } from "../../Direction/Direction.js";
import { Direction, NumberOfDirections } from "../../GridEngineHeadless.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { CharLayer } from "../../Position.js";
import { DistanceUtilsFactory } from "../../Utils/DistanceUtilsFactory/DistanceUtilsFactory.js";
import {
  LayerPositionUtils,
  LayerVecPos,
} from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { Jps4 } from "../Jps4/Jps4.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
import { ShortestPathResult } from "../ShortestPathAlgorithm.js";

export class Jps8 extends Jps4 {
  constructor(gridTilemap: GridTilemap, po: PathfindingOptions = {}) {
    super(gridTilemap, po);
    this.distanceUtils = DistanceUtilsFactory.create(NumberOfDirections.EIGHT);
  }
  findShortestPathImpl(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult {
    this.jumpCache = new JumpCache();
    return super.findShortestPathImpl(startPos, targetPos);
  }

  private jumpCache: JumpCache = new JumpCache();

  protected getForced(
    parent: LayerVecPos,
    node: LayerVecPos,
  ): Set<LayerVecPos> {
    const res = new Set<LayerVecPos>();

    // if parent is more than one step away (jump), take the closest one:
    const newParent = this.posInDir(
      node,
      this.distanceUtils.direction(node.position, parent.position),
    );
    const { topLeft, downLeft, top, bottom, topRight, downRight } =
      this.normalizedPositions(newParent, node);

    const dir = this.distanceUtils.direction(parent.position, node.position);

    if (isDiagonal(dir)) {
      if (this.blockOrTrans(newParent, topLeft)) {
        this.addIfNotBlocked(res, node, top);
        this.addIfNotBlocked(res, node, topRight);

        if (this.blockOrTrans(downLeft, topLeft)) {
          this.addIfNotBlocked(res, node, topLeft);
        }
      }

      if (this.blockOrTrans(newParent, downLeft)) {
        this.addIfNotBlocked(res, node, bottom);
        this.addIfNotBlocked(res, node, downRight);

        if (this.blockOrTrans(topLeft, downLeft)) {
          this.addIfNotBlocked(res, node, downLeft);
        }
      }

      if (this.blockOrTrans(topLeft, top)) {
        this.addIfNotBlocked(res, node, top);
      }

      if (this.blockOrTrans(downLeft, bottom)) {
        this.addIfNotBlocked(res, node, bottom);
      }

      if (this.blockOrTrans(topLeft, topRight)) {
        this.addIfNotBlocked(res, node, topRight);
      }

      if (this.blockOrTrans(downLeft, downRight)) {
        this.addIfNotBlocked(res, node, downRight);
      }
    } else {
      if (
        this.blockOrTrans(newParent, top) ||
        this.blockOrTrans(top, topRight)
      ) {
        this.addIfNotBlocked(res, node, topRight);
      }
      if (
        this.blockOrTrans(newParent, bottom) ||
        this.blockOrTrans(bottom, downRight)
      ) {
        this.addIfNotBlocked(res, node, downRight);
      }

      if (
        this.blockOrTrans(newParent, topLeft) &&
        this.blockOrTrans(newParent, top)
      ) {
        this.addIfNotBlocked(res, node, top);
        this.addIfNotBlocked(res, node, topLeft);
      }
      if (
        this.blockOrTrans(newParent, downLeft) &&
        this.blockOrTrans(newParent, bottom)
      ) {
        this.addIfNotBlocked(res, node, bottom);
        this.addIfNotBlocked(res, node, downLeft);
      }

      if (
        this.blockOrTrans(topLeft, top) &&
        this.blockOrTrans(newParent, top)
      ) {
        this.addIfNotBlocked(res, node, top);
      }
      if (
        this.blockOrTrans(downLeft, bottom) &&
        this.blockOrTrans(newParent, bottom)
      ) {
        this.addIfNotBlocked(res, node, bottom);
      }
    }

    return res;
  }

  protected hasForced(parent: LayerVecPos, node: LayerVecPos): boolean {
    // if parent is more than one step away (jump), take the closest one:

    const newParent = this.posInDir(
      node,
      this.distanceUtils.direction(node.position, parent.position),
    );
    const { topLeft, downLeft, top, bottom, topRight, downRight } =
      this.normalizedPositions(newParent, node);

    const dir = this.distanceUtils.direction(parent.position, node.position);

    if (isDiagonal(dir)) {
      if (this.blockOrTrans(newParent, topLeft)) {
        if (
          !this.blockOrTrans(node, top) ||
          !this.blockOrTrans(node, topRight)
        ) {
          return true;
        }

        if (this.blockOrTrans(downLeft, topLeft)) {
          if (!this.blockOrTrans(node, topLeft)) {
            return true;
          }
        }
      }

      if (this.blockOrTrans(newParent, downLeft)) {
        if (
          !this.blockOrTrans(node, bottom) ||
          !this.blockOrTrans(node, downRight)
        ) {
          return true;
        }

        if (this.blockOrTrans(topLeft, downLeft)) {
          if (!this.blockOrTrans(node, downLeft)) {
            return true;
          }
        }
      }

      if (this.blockOrTrans(topLeft, top)) {
        if (!this.blockOrTrans(node, top)) {
          return true;
        }
      }

      if (this.blockOrTrans(downLeft, bottom)) {
        if (!this.blockOrTrans(node, bottom)) {
          return true;
        }
      }

      if (this.blockOrTrans(topLeft, topRight)) {
        if (!this.blockOrTrans(node, topRight)) {
          return true;
        }
      }

      if (this.blockOrTrans(downLeft, downRight)) {
        if (!this.blockOrTrans(node, downRight)) {
          return true;
        }
      }
    } else {
      if (
        this.blockOrTrans(newParent, top) ||
        this.blockOrTrans(top, topRight)
      ) {
        if (!this.blockOrTrans(node, topRight)) {
          return true;
        }
      }
      if (
        this.blockOrTrans(newParent, bottom) ||
        this.blockOrTrans(bottom, downRight)
      ) {
        if (!this.blockOrTrans(node, downRight)) {
          return true;
        }
      }

      if (
        this.blockOrTrans(newParent, topLeft) &&
        this.blockOrTrans(newParent, top)
      ) {
        if (
          !this.blockOrTrans(node, top) ||
          !this.blockOrTrans(node, topLeft)
        ) {
          return true;
        }
      }
      if (
        this.blockOrTrans(newParent, downLeft) &&
        this.blockOrTrans(newParent, bottom)
      ) {
        if (
          !this.blockOrTrans(node, bottom) ||
          !this.blockOrTrans(node, downLeft)
        ) {
          return true;
        }
      }

      if (
        this.blockOrTrans(topLeft, top) &&
        this.blockOrTrans(newParent, top)
      ) {
        if (!this.blockOrTrans(node, top)) {
          return true;
        }
      }
      if (
        this.blockOrTrans(downLeft, bottom) &&
        this.blockOrTrans(newParent, bottom)
      ) {
        if (!this.blockOrTrans(node, bottom)) {
          return true;
        }
      }
    }

    return false;
  }

  protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    const { top, right, topRight, downRight, bottom } =
      this.normalizedPositions(parent, node);
    const forced = this.getForced(parent, node);
    const dir = directionFromPos(parent.position, node.position);

    if (isDiagonal(dir)) {
      return [top, right, topRight, downRight, bottom, ...forced];
    }
    return [right, ...forced];
  }

  protected jump(
    parent: LayerVecPos,
    node: LayerVecPos,
    stopNode: LayerVecPos,
    dist: number,
  ): { p: LayerVecPos; dist: number } | undefined {
    const memo = this.jumpCache.get(parent, node);
    if (memo !== null) return memo;

    const dir = this.distanceUtils.direction(parent.position, node.position);
    const parentDirPos = this.getTilePosInDir(
      node,
      this.distanceUtils.direction(node.position, parent.position),
    );
    if (
      this.isBlocking(parentDirPos, node) &&
      !(
        LayerPositionUtils.equal(node, stopNode) &&
        this.options.ignoreBlockedTarget
      )
    ) {
      this.jumpCache.set(parent, node, undefined);
      return undefined;
    }
    if (LayerPositionUtils.equal(node, stopNode)) {
      this.jumpCache.set(parent, node, { p: node, dist: 1 });
      return { p: node, dist: 1 };
    }
    if (dist >= this.maxJumpSize) {
      this.jumpCache.set(parent, node, { p: node, dist: 1 });
      return { p: node, dist };
    }
    if (this.getTransition(node.position, parent.layer) !== undefined) {
      this.jumpCache.set(parent, node, { p: node, dist: 1 });
      return { p: node, dist: 1 };
    }
    if (this.hasForced(parent, node)) {
      this.jumpCache.set(parent, node, { p: node, dist: 1 });
      return { p: node, dist: 1 };
    }
    this.updateClosestToTarget(node, stopNode);

    if (dir === Direction.UP_LEFT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.UP),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 1 });
        return { p: node, dist: 1 };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.LEFT),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 1 });
        return { p: node, dist: 1 };
      }
    } else if (dir === Direction.DOWN_LEFT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.DOWN),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 1 });
        return { p: node, dist: 1 };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.LEFT),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 1 });
        return { p: node, dist: 1 };
      }
    } else if (dir === Direction.UP_RIGHT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.UP),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 1 });
        return { p: node, dist: 1 };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.RIGHT),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 1 });
        return { p: node, dist: 1 };
      }
    } else if (dir === Direction.DOWN_RIGHT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.DOWN),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 1 });
        return { p: node, dist: 1 };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.RIGHT),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 1 });
        return { p: node, dist: 1 };
      }
    }

    const res = this.jump(
      node,
      this.getTilePosInDir(node, dir),
      stopNode,
      dist + 1,
    );

    if (res) {
      const clone = {
        p: res?.p,
        dist: res?.dist + 1,
      };
      this.jumpCache.set(parent, node, clone);
      return clone;
    }
    this.jumpCache.set(parent, node, res);
    return res;
  }
}

class JumpCache {
  private memo: Map<
    /* parentX */ number,
    Map<
      /* parentY */ number,
      Map<
        /* parentLayer */ CharLayer,
        Map<
          /* nodeX */ number,
          Map<
            /*nodeY*/ number,
            Map<
              /* nodeLayer */ CharLayer,
              { p: LayerVecPos; dist: number } | null
            >
          >
        >
      >
    >
  > = new Map();

  set(
    parent: LayerVecPos,
    node: LayerVecPos,
    val: { p: LayerVecPos; dist: number } | undefined,
  ) {
    let pX = this.memo.get(parent.position.x);
    if (!pX) {
      pX = new Map();
      this.memo.set(parent.position.x, pX);
    }

    let pY = pX.get(parent.position.y);
    if (!pY) {
      pY = new Map();
      pX.set(parent.position.y, pY);
    }

    let pL = pY.get(parent.layer);
    if (!pL) {
      pL = new Map();
      pY.set(parent.layer, pL);
    }

    let nX = pL.get(node.position.x);
    if (!nX) {
      nX = new Map();
      pL.set(node.position.x, nX);
    }

    let nY = nX.get(node.position.y);
    if (!nY) {
      nY = new Map();
      nX.set(node.position.y, nY);
    }

    const nL = nY.get(node.layer);
    if (!nL) {
      if (val === undefined) {
        nY.set(node.layer, null);
      } else {
        nY.set(node.layer, val);
      }
    }
  }

  /**
   * Returns null if no entry was found. undefined is a valid cached result.
   */
  get(
    parent: LayerVecPos,
    node: LayerVecPos,
  ): { p: LayerVecPos; dist: number } | undefined | null {
    const pX = this.memo.get(parent.position.x);
    if (!pX) return null;

    const pY = pX.get(parent.position.y);
    if (!pY) return null;

    const pL = pY.get(parent.layer);
    if (!pL) return null;

    const nX = pL.get(node.position.x);
    if (!nX) return null;

    const nY = nX.get(node.position.y);
    if (!nY) return null;

    const nL = nY.get(node.layer);
    if (nL === undefined) {
      return null;
    } else if (nL === null) {
      return undefined;
    }

    return nL;
  }
}
