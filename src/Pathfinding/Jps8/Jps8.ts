import { directionFromPos, isDiagonal } from "../../Direction/Direction";
import {
  Direction,
  NumberOfDirections,
  PathfindingOptions,
} from "../../GridEngineHeadless";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { DistanceUtilsFactory } from "../../Utils/DistanceUtilsFactory/DistanceUtilsFactory";
import { LayerPositionUtils } from "../../Utils/LayerPositionUtils/LayerPositionUtils";
import { Jps4 } from "../Jps4/Jps4";
import { LayerVecPos } from "../ShortestPathAlgorithm";

export class Jps8 extends Jps4 {
  constructor(gridTilemap: GridTilemap, po: PathfindingOptions = {}) {
    super(gridTilemap, po);
    this.distanceUtils = DistanceUtilsFactory.create(NumberOfDirections.EIGHT);
  }

  protected getForced(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    const res: LayerVecPos[] = [];

    // if parent is more than one step away (jump), take the closest one:

    const newParent = this.posInDir(
      node,
      this.distanceUtils.direction(node.position, parent.position)
    );
    const { topLeft, downLeft, top, bottom, topRight, downRight } =
      this.normalizedPositions(newParent, node);

    const dir = this.distanceUtils.direction(parent.position, node.position);

    const blockOrTrans = (src: LayerVecPos, dest: LayerVecPos) => {
      return (
        this.isBlocking(src, dest) ||
        this.getTransition(dest.position, dest.layer) !== undefined
      );
    };

    if (isDiagonal(dir)) {
      if (blockOrTrans(parent, topLeft) && !this.isBlocking(node, top)) {
        res.push(top);
      }

      if (
        blockOrTrans(parent, topLeft) &&
        (blockOrTrans(parent, downLeft) || blockOrTrans(downLeft, topLeft)) &&
        !this.isBlocking(node, topLeft)
      ) {
        res.push(topLeft);
      }

      if (blockOrTrans(parent, downLeft) && !this.isBlocking(node, bottom)) {
        res.push(bottom);
      }

      if (
        blockOrTrans(parent, downLeft) &&
        (blockOrTrans(parent, topLeft) || blockOrTrans(topLeft, downLeft)) &&
        !this.isBlocking(node, downLeft)
      ) {
        res.push(downLeft);
      }
    } else {
      if (
        blockOrTrans(parent, top) &&
        (blockOrTrans(parent, topLeft) || blockOrTrans(topLeft, top))
      ) {
        if (!this.isBlocking(node, topLeft)) {
          res.push(topLeft);
        }
        if (!this.isBlocking(node, top)) {
          res.push(top);
        }
      }

      if (
        blockOrTrans(parent, top) &&
        (blockOrTrans(parent, topLeft) ||
          blockOrTrans(topLeft, top) ||
          blockOrTrans(top, topRight)) &&
        !this.isBlocking(node, topRight)
      ) {
        res.push(topRight);
      }

      if (
        blockOrTrans(parent, bottom) &&
        (blockOrTrans(parent, downLeft) || blockOrTrans(downLeft, top))
      ) {
        if (!this.isBlocking(node, downLeft)) {
          res.push(downLeft);
        }
        if (!this.isBlocking(node, bottom)) {
          res.push(bottom);
        }
      }

      if (
        blockOrTrans(parent, bottom) &&
        (blockOrTrans(parent, downLeft) ||
          blockOrTrans(topLeft, bottom) ||
          blockOrTrans(top, downRight)) &&
        !this.isBlocking(node, downRight)
      ) {
        res.push(downRight);
      }
    }

    return res;
  }

  protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    // console.log("prune2");
    const { right, topRight, downRight } = this.normalizedPositions(
      parent,
      node
    );
    const forced = this.getForced(parent, node);
    const dir = directionFromPos(parent.position, node.position);

    if (isDiagonal(dir)) {
      return [right, topRight, downRight, ...forced];
    }
    return [right, ...forced];
  }

  protected jump(
    parent: LayerVecPos,
    node: LayerVecPos,
    stopNode: LayerVecPos,
    dist: number
  ): { p: LayerVecPos; dist: number } | undefined {
    const dir = this.distanceUtils.direction(parent.position, node.position);
    if (
      this.isBlocking(parent, node) &&
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
    if (this.getForced(parent, node).length > 0) {
      return { p: node, dist };
    }
    this.updateClosestToTarget(node, stopNode);

    if (dir === Direction.UP_LEFT) {
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.UP),
          stopNode,
          dist + 1
        ) !== undefined
      ) {
        return { p: node, dist };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.LEFT),
          stopNode,
          dist + 1
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
          dist + 1
        ) !== undefined
      ) {
        return { p: node, dist };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.LEFT),
          stopNode,
          dist + 1
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
          dist + 1
        ) !== undefined
      ) {
        return { p: node, dist };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.RIGHT),
          stopNode,
          dist + 1
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
          dist + 1
        ) !== undefined
      ) {
        return { p: node, dist };
      }
      if (
        this.jump(
          node,
          this.getTilePosInDir(node, Direction.RIGHT),
          stopNode,
          dist + 1
        ) !== undefined
      ) {
        return { p: node, dist };
      }
    }

    return this.jump(
      node,
      this.getTilePosInDir(
        node,
        directionFromPos(parent.position, node.position)
      ),
      stopNode,
      dist + 1
    );
  }
}
