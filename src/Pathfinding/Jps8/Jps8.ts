import { directionFromPos, isDiagonal } from "../../Direction/Direction.js";
import { Direction, NumberOfDirections } from "../../GridEngineHeadless.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { DistanceUtilsFactory } from "../../Utils/DistanceUtilsFactory/DistanceUtilsFactory.js";
import {
  LayerPositionUtils,
  LayerVecPos,
} from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { Jps4 } from "../Jps4/Jps4.js";
import { PathfindingOptions } from "../PathfindingOptions.js";

export class Jps8 extends Jps4 {
  constructor(gridTilemap: GridTilemap, po: PathfindingOptions = {}) {
    super(gridTilemap, po);
    this.distanceUtils = DistanceUtilsFactory.create(NumberOfDirections.EIGHT);
  }

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
      return undefined;
    }
    if (LayerPositionUtils.equal(node, stopNode)) {
      return { p: node, dist };
    }
    if (dist >= this.maxJumpSize) {
      return { p: node, dist };
    }
    if (this.getTransition(node.position, parent.layer) !== undefined) {
      return { p: node, dist };
    }
    if (this.hasForced(parent, node)) {
      return { p: node, dist };
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
        return { p: node, dist };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.LEFT),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        return { p: node, dist };
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
        return { p: node, dist };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.LEFT),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        return { p: node, dist };
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
        return { p: node, dist };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.RIGHT),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        return { p: node, dist };
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
        return { p: node, dist };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.RIGHT),
          stopNode,
          dist + 1,
        ) !== undefined
      ) {
        return { p: node, dist };
      }
    }

    return this.jump(
      node,
      this.getTilePosInDir(
        node,
        directionFromPos(parent.position, node.position),
      ),
      stopNode,
      dist + 1,
    );
  }
}
