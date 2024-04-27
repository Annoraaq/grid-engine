import {
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "../ShortestPathAlgorithm.js";
import { MinFibonacciHeap } from "mnemonist";
import {
  Direction,
  directionFromPos,
  directionVector,
} from "../../Direction/Direction.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import {
  LayerPositionUtils,
  LayerVecPos,
} from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { VectorUtils } from "../../Utils/VectorUtils.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
import { Position } from "../../Position.js";

interface ShortestPathTuple {
  previous: Map<string, LayerVecPos>;
  closestToTarget: LayerVecPos;
  steps: number;
  maxPathLengthReached: boolean;
}

export class Jps4 extends ShortestPathAlgorithm {
  private openSet: MinFibonacciHeap<LayerVecPos> = new MinFibonacciHeap();
  private g: Map<string, number> = new Map<string, number>();
  private f: Map<string, number> = new Map<string, number>();
  private closestToTarget: LayerVecPos = {
    position: new Vector2(0, 0),
    layer: undefined,
  };
  private smallestDistToTarget = 0;

  protected steps = 0;
  protected visits: Position[] = [];

  private maxFrontierSize = 0;

  protected maxJumpSize = 0;

  constructor(gridTilemap: GridTilemap, po: PathfindingOptions = {}) {
    super(gridTilemap, po);
  }

  findShortestPathImpl(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult {
    this.maxJumpSize = this.distance(startPos.position, targetPos.position);
    const shortestPath = this.shortestPath(startPos, targetPos);
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "JPS",
    };
  }

  private shortestPath(
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): ShortestPathTuple {
    this.steps = 0;
    const previous = new Map<string, LayerVecPos>();
    this.g = new Map<string, number>();
    this.f = new Map<string, number>();
    this.closestToTarget = startNode;
    this.smallestDistToTarget = this.distance(
      startNode.position,
      stopNode.position,
    );

    this.openSet = new MinFibonacciHeap(
      (a, b) => safeGet(this.f, a) - safeGet(this.f, b),
    );

    this.openSet.push(startNode);
    const sourceStr = LayerPositionUtils.toString(startNode);
    this.g.set(sourceStr, 0);
    this.f.set(sourceStr, this.distance(startNode.position, stopNode.position));

    this.maxFrontierSize = Math.max(this.maxFrontierSize, this.openSet.size);
    while (this.openSet.size > 0) {
      const current = this.openSet.pop();
      if (!current) break;
      this.steps++;

      if (LayerPositionUtils.equal(current, stopNode)) {
        return {
          previous,
          closestToTarget: stopNode,
          steps: this.steps,
          maxPathLengthReached: false,
        };
      }

      if (safeGet(this.g, current) + 1 > this.options.maxPathLength) {
        return {
          previous: new Map(),
          closestToTarget: this.closestToTarget,
          steps: this.steps,
          maxPathLengthReached: true,
        };
      }

      this.updateClosestToTarget(current, stopNode);

      for (const neighbor of this.getNeighborsInternal(
        current,
        previous.get(LayerPositionUtils.toString(current)),
        stopNode,
      )) {
        const pStr = LayerPositionUtils.toString(neighbor.p);
        const tentativeG = safeGet(this.g, current) + neighbor.dist;
        if (!this.g.has(pStr) || tentativeG < safeGet(this.g, neighbor.p)) {
          previous.set(pStr, current);
          this.g.set(pStr, tentativeG);
          this.f.set(
            pStr,
            tentativeG + this.distance(neighbor.p.position, stopNode.position),
          );
          this.openSet.push(neighbor.p);
        }
      }
    }

    return {
      previous,
      closestToTarget: this.closestToTarget,
      steps: this.steps,
      maxPathLengthReached: false,
    };
  }

  protected updateClosestToTarget(node: LayerVecPos, stopNode: LayerVecPos) {
    const distToTarget = this.distance(node.position, stopNode.position);
    if (distToTarget < this.smallestDistToTarget) {
      this.smallestDistToTarget = distToTarget;
      this.closestToTarget = node;
    }
  }

  protected addIfNotBlocked(
    arr: LayerVecPos[],
    src: LayerVecPos,
    target: LayerVecPos,
  ) {
    if (!this.blockOrTrans(src, target)) {
      arr.push(target);
    }
  }

  protected blockOrTrans(src: LayerVecPos, dest: LayerVecPos) {
    return (
      this.isBlocking(src, dest) ||
      this.getTransition(dest.position, dest.layer) !== undefined
    );
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

    const pruned = this.prune(parent, node)
      .filter(
        (neighbor) => !this.isBlockingIgnoreTarget(node, neighbor, stopNode),
      )
      .map((unblockedNeighbor) => {
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
      if (this.isHorizontal(node.position, p.position)) {
        successors.push({ p, dist: 1 });
      } else {
        const j = this.jump(
          node,
          p,
          stopNode,
          1,
          directionFromPos(node.position, p.position),
        );
        if (j) {
          successors.push(j);
        }
      }
    }

    return successors;
  }

  private isBlockingIgnoreTarget(
    src: LayerVecPos,
    target: LayerVecPos,
    stopNode: LayerVecPos,
  ): boolean {
    return (
      this.isBlocking(src, target) &&
      !(
        this.options.ignoreBlockedTarget &&
        LayerPositionUtils.equal(target, stopNode)
      )
    );
  }

  protected jump(
    parent: LayerVecPos,
    node: LayerVecPos,
    stopNode: LayerVecPos,
    dist: number,
    dir: Direction,
  ): { p: LayerVecPos; dist: number } | undefined {
    if (this.isBlockingIgnoreTarget(parent, node, stopNode)) {
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
    return this.jump(
      node,
      this.getTilePosInDir(node, dir),
      stopNode,
      dist + 1,
      dir,
    );
  }

  private isHorizontal(p1: Position, p2: Position): boolean {
    return p1.y === p2.y;
  }

  protected getForced(
    parent: LayerVecPos,
    node: LayerVecPos,
    downLeft: LayerVecPos,
    bottom: LayerVecPos,
    topLeft: LayerVecPos,
    top: LayerVecPos,
  ): LayerVecPos[] {
    const res: LayerVecPos[] = [];

    const newParent = parent;

    if (
      this.blockOrTrans(newParent, downLeft) ||
      this.blockOrTrans(downLeft, bottom)
    ) {
      this.addIfNotBlocked(res, node, bottom);
    }
    if (
      this.blockOrTrans(newParent, topLeft) ||
      this.blockOrTrans(topLeft, top)
    ) {
      this.addIfNotBlocked(res, node, top);
    }

    return res;
  }

  protected hasForced(parent: LayerVecPos, node: LayerVecPos): boolean {
    const { topLeft, downLeft, top, bottom } = this.normalizedPositions(
      parent,
      node,
    );

    if (
      this.blockOrTrans(parent, downLeft) ||
      this.blockOrTrans(downLeft, bottom)
    ) {
      if (!this.blockOrTrans(node, bottom)) {
        return true;
      }
    }
    if (this.blockOrTrans(parent, topLeft) || this.blockOrTrans(topLeft, top)) {
      if (!this.blockOrTrans(node, top)) {
        return true;
      }
    }

    return false;
  }

  protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    const { right, top, bottom, downLeft, topLeft } = this.normalizedPositions(
      parent,
      node,
    );
    if (this.isHorizontal(parent.position, node.position)) {
      return [right, top, bottom];
    }
    return [
      right,
      ...this.getForced(parent, node, downLeft, bottom, topLeft, top),
    ];
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
  } {
    // case 1 p->n:
    if (parent.position.x < node.position.x) {
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
      };
      // case 2 n<-p:
    } else if (parent.position.x > node.position.x) {
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
      };
      // case 3 p
      //        n
    } else if (parent.position.y < node.position.y) {
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
      };
      // case 4 n
      //        p
    } else {
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
      };
    }
  }

  protected posInDir(pos: LayerVecPos, dir: Direction): LayerVecPos {
    return {
      position: pos.position.add(directionVector(dir)),
      layer: pos.layer,
    };
  }

  private returnPath(
    previous: Map<string, LayerVecPos>,
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): LayerVecPos[] {
    const ret: LayerVecPos[] = [];
    let currentNode: LayerVecPos | undefined = stopNode;
    ret.push(currentNode);
    while (!LayerPositionUtils.equal(currentNode, startNode)) {
      const prevNode = previous.get(LayerPositionUtils.toString(currentNode));
      if (!prevNode) {
        return [];
      }
      if (this.distance(prevNode.position, currentNode.position) > 1) {
        this.fillPath(currentNode, prevNode, ret);
      } else {
        ret.push(prevNode);
      }
      currentNode = prevNode;
    }
    return ret.reverse();
  }

  private fillPath(src: LayerVecPos, target: LayerVecPos, ret: LayerVecPos[]) {
    let current = src;
    do {
      const dir = directionFromPos(current.position, target.position);
      current = this.getTilePosInDir(current, dir);
      ret.push(current);
    } while (!VectorUtils.equal(current.position, target.position));
  }
}

function safeGet(map: Map<string, number>, position: LayerVecPos): number {
  return map.get(LayerPositionUtils.toString(position)) ?? Number.MAX_VALUE;
}
