import { directionFromPos, isDiagonal } from "../../Direction/Direction.js";
import { Direction } from "../../GridEngineHeadless.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { CharLayer } from "../../Position.js";
import {
  LayerPositionUtils,
  LayerVecPos,
} from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { Jps4 } from "../Jps4/Jps4.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
import { ShortestPathResult } from "../ShortestPathAlgorithm.js";

export class Jps8 extends Jps4 {
  private jumpCache: JumpCache = new JumpCache();
  constructor(gridTilemap: GridTilemap, po: PathfindingOptions = {}) {
    super(gridTilemap, po);
  }

  findShortestPathImpl(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult {
    this.jumpCache = new JumpCache();
    return super.findShortestPathImpl(startPos, targetPos);
  }

  protected getNeighborsInternal(
    node: LayerVecPos,
    parent: LayerVecPos | undefined,
    stopNode: LayerVecPos,
  ): { p: LayerVecPos; dist: number }[] {
    if (!parent || node.layer !== parent.layer) {
      return this.getNeighbors(node, stopNode).map((n) => ({
        p: n,
        dist: 1,
      }));
    }

    const pruned = this.prune(parent, node).map((unblockedNeighbor) => {
      const transition = this.getTransition(
        unblockedNeighbor.position,
        node.layer,
      );
      return {
        position: unblockedNeighbor.position,
        layer: transition || node.layer,
      };
    });

    const successors: { p: LayerVecPos; dist: number }[] = [];
    for (const p of pruned) {
      const j = this.jump(
        node,
        p,
        stopNode,
        1,
        directionFromPos(node.position, p.position),
      );
      if (j) {
        j.dist = this.distance(node.position, j.p.position);
        successors.push(j);
      }
    }

    return successors;
  }

  protected getForced(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    const res: LayerVecPos[] = [];

    const { topLeft, downLeft, top, bottom, topRight, downRight } =
      this.normalizedPositions(parent, node);

    const dir = directionFromPos(parent.position, node.position);

    if (isDiagonal(dir)) {
      if (this.blockOrTrans(parent, topLeft)) {
        this.addIfNotBlocked(res, node, top);
        this.addIfNotBlocked(res, node, topRight);

        if (this.blockOrTrans(downLeft, topLeft)) {
          this.addIfNotBlocked(res, node, topLeft);
        }
      }

      if (this.blockOrTrans(parent, downLeft)) {
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
      if (this.blockOrTrans(parent, top) || this.blockOrTrans(top, topRight)) {
        this.addIfNotBlocked(res, node, topRight);
      }
      if (
        this.blockOrTrans(parent, bottom) ||
        this.blockOrTrans(bottom, downRight)
      ) {
        this.addIfNotBlocked(res, node, downRight);
      }

      if (
        this.blockOrTrans(parent, topLeft) &&
        this.blockOrTrans(parent, top)
      ) {
        this.addIfNotBlocked(res, node, top);
        this.addIfNotBlocked(res, node, topLeft);
      }
      if (
        this.blockOrTrans(parent, downLeft) &&
        this.blockOrTrans(parent, bottom)
      ) {
        this.addIfNotBlocked(res, node, bottom);
        this.addIfNotBlocked(res, node, downLeft);
      }

      if (this.blockOrTrans(topLeft, top) && this.blockOrTrans(parent, top)) {
        this.addIfNotBlocked(res, node, top);
      }
      if (
        this.blockOrTrans(downLeft, bottom) &&
        this.blockOrTrans(parent, bottom)
      ) {
        this.addIfNotBlocked(res, node, bottom);
      }
    }

    return res;
  }

  protected hasForced(parent: LayerVecPos, node: LayerVecPos) {
    const { topLeft, downLeft, top, bottom, topRight, downRight } =
      this.normalizedPositions(parent, node);

    const dir = directionFromPos(parent.position, node.position);

    if (isDiagonal(dir)) {
      if (this.blockOrTrans(parent, topLeft)) {
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

      if (this.blockOrTrans(parent, downLeft)) {
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
      if (this.blockOrTrans(parent, top) || this.blockOrTrans(top, topRight)) {
        if (!this.blockOrTrans(node, topRight)) {
          return true;
        }
      }
      if (
        this.blockOrTrans(parent, bottom) ||
        this.blockOrTrans(bottom, downRight)
      ) {
        if (!this.blockOrTrans(node, downRight)) {
          return true;
        }
      }

      if (
        this.blockOrTrans(parent, topLeft) &&
        this.blockOrTrans(parent, top)
      ) {
        if (
          !this.blockOrTrans(node, top) ||
          !this.blockOrTrans(node, topLeft)
        ) {
          return true;
        }
      }
      if (
        this.blockOrTrans(parent, downLeft) &&
        this.blockOrTrans(parent, bottom)
      ) {
        if (
          !this.blockOrTrans(node, bottom) ||
          !this.blockOrTrans(node, downLeft)
        ) {
          return true;
        }
      }

      if (this.blockOrTrans(topLeft, top) && this.blockOrTrans(parent, top)) {
        if (!this.blockOrTrans(node, top)) {
          return true;
        }
      }
      if (
        this.blockOrTrans(downLeft, bottom) &&
        this.blockOrTrans(parent, bottom)
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
    dir: Direction,
  ): { p: LayerVecPos; dist: number } | undefined {
    const memo = this.jumpCache.get(parent, node);
    if (memo !== null) return memo;
    if (
      this.isBlocking(parent, node) &&
      !(
        LayerPositionUtils.equal(node, stopNode) &&
        this.options.ignoreBlockedTarget
      )
    ) {
      this.jumpCache.set(parent, node, undefined);
      return undefined;
    }
    if (LayerPositionUtils.equal(node, stopNode)) {
      this.jumpCache.set(parent, node, { p: node, dist: 0 });
      return { p: node, dist: 0 };
    }
    if (dist >= this.maxJumpSize) {
      this.jumpCache.set(parent, node, { p: node, dist: 0 });
      return { p: node, dist: 0 };
    }
    if (this.getTransition(node.position, parent.layer) !== undefined) {
      this.jumpCache.set(parent, node, { p: node, dist: 0 });
      return { p: node, dist: 0 };
    }
    if (this.hasForced(parent, node)) {
      this.jumpCache.set(parent, node, { p: node, dist: 0 });
      return { p: node, dist: 0 };
    }
    this.updateClosestToTarget(node, stopNode);

    if (dir === Direction.UP_LEFT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.UP),
          stopNode,
          dist + 1,
          Direction.UP,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.LEFT),
          stopNode,
          dist + 1,
          Direction.LEFT,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
    } else if (dir === Direction.DOWN_LEFT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.DOWN),
          stopNode,
          dist + 1,
          Direction.DOWN,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.LEFT),
          stopNode,
          dist + 1,
          Direction.LEFT,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
    } else if (dir === Direction.UP_RIGHT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.UP),
          stopNode,
          dist + 1,
          Direction.UP,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.RIGHT),
          stopNode,
          dist + 1,
          Direction.RIGHT,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
    } else if (dir === Direction.DOWN_RIGHT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.DOWN),
          stopNode,
          dist + 1,
          Direction.DOWN,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.RIGHT),
          stopNode,
          dist + 1,
          Direction.RIGHT,
        ) !== undefined
      ) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
    }

    const res = this.jump(
      node,
      this.getTilePosInDir(node, dir),
      stopNode,
      dist + 1,
      dir,
    );
    this.jumpCache.set(parent, node, res);
    return res;
  }

  protected normalizedPositions(
    parent: LayerVecPos,
    node: LayerVecPos,
  ): {
    topLeft: LayerVecPos;
    downLeft: LayerVecPos;
    top: LayerVecPos;
    bottom: LayerVecPos;
    right: LayerVecPos;
    downRight: LayerVecPos;
    topRight: LayerVecPos;
  } {
    // case 1 p->n:
    if (
      parent.position.x < node.position.x &&
      parent.position.y === node.position.y
    ) {
      return {
        topLeft: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer,
        },
        downLeft: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer,
        },
        top: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer,
        },
        bottom: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer,
        },
        right: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer,
        },
        topRight: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer,
        },
        downRight: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer,
        },
      };
      // case 2 n<-p:
    } else if (
      parent.position.x > node.position.x &&
      parent.position.y === node.position.y
    ) {
      return {
        topLeft: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer,
        },
        downLeft: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer,
        },
        top: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer,
        },
        bottom: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer,
        },
        right: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer,
        },
        topRight: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer,
        },
        downRight: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer,
        },
      };
      // case 3 p
      //        n
    } else if (
      parent.position.y < node.position.y &&
      parent.position.x === node.position.x
    ) {
      return {
        topLeft: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer,
        },
        downLeft: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer,
        },
        top: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer,
        },
        bottom: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer,
        },
        right: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer,
        },
        topRight: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer,
        },
        downRight: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer,
        },
      };
      // case 4 n
      //        p
    } else if (
      parent.position.y > node.position.y &&
      parent.position.x === node.position.x
    ) {
      return {
        topLeft: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer,
        },
        downLeft: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer,
        },
        top: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer,
        },
        bottom: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer,
        },
        right: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer,
        },
        topRight: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer,
        },
        downRight: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer,
        },
      };
      // case 5 p
      //        .n
    } else if (
      parent.position.y < node.position.y &&
      parent.position.x < node.position.x
    ) {
      return {
        topLeft: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer,
        },
        downLeft: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer,
        },
        top: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer,
        },
        bottom: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer,
        },
        right: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer,
        },
        topRight: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer,
        },
        downRight: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer,
        },
      };
      // case 6 ..p
      //        .n
    } else if (
      parent.position.y < node.position.y &&
      parent.position.x > node.position.x
    ) {
      return {
        topLeft: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer,
        },
        downLeft: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer,
        },
        top: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer,
        },
        bottom: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer,
        },
        right: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer,
        },
        topRight: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer,
        },
        downRight: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer,
        },
      };
      // case 7 .n.
      //        p
    } else if (
      parent.position.y > node.position.y &&
      parent.position.x < node.position.x
    ) {
      return {
        topLeft: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer,
        },
        downLeft: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer,
        },
        top: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer,
        },
        bottom: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer,
        },
        right: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer,
        },
        topRight: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer,
        },
        downRight: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer,
        },
      };
      // case 8 .n.
      //        ..p
    } else {
      return {
        topLeft: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer,
        },
        downLeft: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer,
        },
        top: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer,
        },
        bottom: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer,
        },
        right: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer,
        },
        topRight: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer,
        },
        downRight: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer,
        },
      };
    }
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
