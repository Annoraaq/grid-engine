import {
  LayerVecPos,
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "../ShortestPathAlgorithm";
import { VectorUtils } from "../../Utils/VectorUtils";
import { MinFibonacciHeap } from "mnemonist";
import {
  Direction,
  directionFromPos,
  directionVector,
  isHorizontal,
  turnClockwise,
} from "../../Direction/Direction";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { LayerPositionUtils } from "../../Utils/LayerPositionUtils/LayerPositionUtils";
import { DistanceUtilsFactory } from "../../Utils/DistanceUtilsFactory/DistanceUtilsFactory";

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

  private maxFrontierSize = 0;

  private maxJumpSize = 0;

  findShortestPath(
    startPos: LayerVecPos,
    targetPos: LayerVecPos
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
    stopNode: LayerVecPos
  ): ShortestPathTuple {
    let steps = 0;
    const previous = new Map<string, LayerVecPos>();
    this.g = new Map<string, number>();
    this.f = new Map<string, number>();
    this.closestToTarget = startNode;
    this.smallestDistToTarget = this.distance(
      startNode.position,
      stopNode.position
    );

    this.openSet = new MinFibonacciHeap(
      (a, b) => safeGet(this.f, a) - safeGet(this.f, b)
    );

    this.openSet.push(startNode);
    const sourceStr = LayerPositionUtils.toString(startNode);
    this.g.set(sourceStr, 0);
    this.f.set(sourceStr, h(startNode, stopNode));

    this.maxFrontierSize = Math.max(this.maxFrontierSize, this.openSet.size);
    while (this.openSet.size > 0) {
      const current = this.openSet.pop();
      if (!current) break;
      steps++;

      if (LayerPositionUtils.equal(current, stopNode)) {
        return {
          previous,
          closestToTarget: stopNode,
          steps,
          maxPathLengthReached: false,
        };
      }

      if (safeGet(this.g, current) + 1 > this.options.maxPathLength) {
        return {
          previous: new Map(),
          closestToTarget: this.closestToTarget,
          steps,
          maxPathLengthReached: true,
        };
      }

      this.updateClosestToTarget(current, stopNode);

      for (const neighbor of this.getNeighborsInternal(
        current,
        previous.get(LayerPositionUtils.toString(current)),
        stopNode
      )) {
        const pStr = LayerPositionUtils.toString(neighbor.p);
        const tentativeG = safeGet(this.g, current) + neighbor.dist;
        if (!this.g.has(pStr) || tentativeG < safeGet(this.g, neighbor.p)) {
          previous.set(pStr, current);
          this.g.set(pStr, tentativeG);
          this.f.set(pStr, tentativeG + h(neighbor.p, stopNode));
          this.openSet.push(neighbor.p);
        }
      }
    }

    return {
      previous,
      closestToTarget: this.closestToTarget,
      steps,
      maxPathLengthReached: false,
    };
  }

  private updateClosestToTarget(node: LayerVecPos, stopNode: LayerVecPos) {
    const distToTarget = this.distance(node.position, stopNode.position);
    if (distToTarget < this.smallestDistToTarget) {
      this.smallestDistToTarget = distToTarget;
      this.closestToTarget = node;
    }
  }

  private getNeighborsInternal(
    node: LayerVecPos,
    parent: LayerVecPos | undefined,
    stopNode: LayerVecPos
  ): { p: LayerVecPos; dist: number }[] {
    if (!parent) {
      return this.getNeighbors(node, stopNode).map((n) => ({ p: n, dist: 1 }));
    }
    const pruned = this.prune(parent, node);

    const successors: { p: LayerVecPos; dist: number }[] = [];
    for (const p of pruned) {
      const j = this.jump(node, p, stopNode, 1);
      if (j) {
        successors.push(j);
      }
    }

    return successors;
  }

  private jump(
    parent: LayerVecPos,
    node: LayerVecPos,
    stopNode: LayerVecPos,
    dist: number
  ): { p: LayerVecPos; dist: number } | undefined {
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
    if (this.getTransition(node.position, node.layer) !== undefined) {
      return { p: node, dist };
    }
    // horizontal
    if (parent.position.x != node.position.x) return { p: node, dist };
    if (this.getForced(parent, node).length > 0) {
      return { p: node, dist };
    }

    this.updateClosestToTarget(node, stopNode);
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

  private getForced(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    const res: LayerVecPos[] = [];

    // if parent is more than one step away (jump), take the closest one:
    const distanceUtils = DistanceUtilsFactory.create(
      this.options.numberOfDirections
    );

    const newParent = this.getTilePosInDir(
      node,
      distanceUtils.direction(node.position, parent.position)
    );
    const { topLeft, downLeft, top, bottom } = this.normalizedPositions(
      newParent,
      node
    );

    // vertical
    if (newParent.position.x == node.position.x) {
      if (
        (this.isBlocking(parent, downLeft) ||
          this.getTransition(downLeft.position, downLeft.layer) !==
            undefined) &&
        !this.isBlocking(node, bottom)
      ) {
        res.push(bottom);
      }
      if (
        (this.isBlocking(parent, topLeft) ||
          this.getTransition(topLeft.position, topLeft.layer) !== undefined) &&
        !this.isBlocking(node, top)
      ) {
        res.push(top);
      }
    }

    return res;
  }

  private prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    const { right, top, bottom } = this.normalizedPositions(parent, node);
    const forced = this.getForced(parent, node);
    const dir = directionFromPos(parent.position, node.position);

    if (isHorizontal(dir)) {
      return [right, top, bottom];
    }
    return [right, ...forced];
  }

  private normalizedPositions(
    parent: LayerVecPos,
    node: LayerVecPos
  ): {
    topLeft: LayerVecPos;
    downLeft: LayerVecPos;
    downRight: LayerVecPos;
    topRight: LayerVecPos;
    top: LayerVecPos;
    bottom: LayerVecPos;
    right: LayerVecPos;
  } {
    const dir = directionFromPos(parent.position, node.position);

    function posInDir(pos: LayerVecPos, dir: Direction): LayerVecPos {
      return {
        ...pos,
        position: pos.position.add(directionVector(dir)),
      };
    }

    function turnTimes(dir: Direction, times: number) {
      return [...Array(times)].reduce((acc) => turnClockwise(acc), dir);
    }

    const turn = (times: number) => ({
      topLeft: posInDir(node, turnTimes(Direction.UP_LEFT, times)),
      downLeft: posInDir(node, turnTimes(Direction.DOWN_LEFT, times)),
      downRight: posInDir(node, turnTimes(Direction.DOWN_RIGHT, times)),
      topRight: posInDir(node, turnTimes(Direction.UP_RIGHT, times)),
      top: posInDir(node, turnTimes(Direction.UP, times)),
      bottom: posInDir(node, turnTimes(Direction.DOWN, times)),
      right: posInDir(node, turnTimes(Direction.RIGHT, times)),
    });

    if (dir === Direction.RIGHT) {
      // case 1 p->n:
      return turn(0);
    } else if (dir === Direction.LEFT) {
      // case 2 n<-p:
      return turn(4);
    } else if (dir === Direction.DOWN) {
      // case 3 p
      //        n
      return turn(2);
    } else {
      // case 4 n
      //        p
      return turn(6);
    }
  }

  private returnPath(
    previous: Map<string, LayerVecPos>,
    startNode: LayerVecPos,
    stopNode: LayerVecPos
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
        ret.push(...this.fillPath(currentNode, prevNode));
      } else {
        ret.push(prevNode);
      }
      currentNode = prevNode;
    }
    return ret.reverse();
  }

  private fillPath(src: LayerVecPos, target: LayerVecPos): LayerVecPos[] {
    let current = src;
    const res: LayerVecPos[] = [];
    while (!LayerPositionUtils.equal(current, target)) {
      const dir = directionFromPos(current.position, target.position);
      current = this.getTilePosInDir(current, dir);
      res.push(current);
    }
    return res;
  }
}
function h(src: LayerVecPos, dest: LayerVecPos) {
  return VectorUtils.manhattanDistance(src.position, dest.position);
}

function safeGet(map: Map<string, number>, position: LayerVecPos): number {
  return map.get(LayerPositionUtils.toString(position)) ?? Number.MAX_VALUE;
}
