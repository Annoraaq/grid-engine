import {
  LayerVecPos,
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "../ShortestPathAlgorithm.js";
import { MinFibonacciHeap } from "mnemonist";
import {
  Direction,
  directionFromPos,
  directionVector,
  isHorizontal,
  isVertical,
  NumberOfDirections,
  turnClockwise,
} from "../../Direction/Direction.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { LayerPositionUtils } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { DistanceUtilsFactory } from "../../Utils/DistanceUtilsFactory/DistanceUtilsFactory.js";
import { DistanceUtils } from "../../Utils/DistanceUtils.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { PathfindingOptions } from "../Pathfinding.js";
import { VectorUtils } from "../../Utils/VectorUtils.js";

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

  private steps = 0;

  private maxFrontierSize = 0;

  protected maxJumpSize = 0;

  private turnOrder = {
    [Direction.RIGHT]: 0,
    [Direction.DOWN_RIGHT]: 1,
    [Direction.DOWN]: 2,
    [Direction.DOWN_LEFT]: 3,
    [Direction.LEFT]: 4,
    [Direction.UP_LEFT]: 5,
    [Direction.UP]: 6,
    [Direction.UP_RIGHT]: 7,
  };

  private turnTimes: Map<Direction, Map<number, Direction>> = createTurnTimes();

  protected distanceUtils: DistanceUtils;

  constructor(gridTilemap: GridTilemap, po: PathfindingOptions = {}) {
    super(gridTilemap, po);
    this.distanceUtils = DistanceUtilsFactory.create(NumberOfDirections.FOUR);
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

  private getNeighborsInternal(
    node: LayerVecPos,
    parent: LayerVecPos | undefined,
    stopNode: LayerVecPos,
  ): { p: LayerVecPos; dist: number }[] {
    if (!parent || node.layer !== parent.layer) {
      return this.getNeighbors(node, stopNode).map((n) => ({ p: n, dist: 1 }));
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
      const j = this.jump(node, p, stopNode, 1);
      if (j) {
        successors.push(j);
      }
    }

    return successors;
  }

  protected jump(
    parent: LayerVecPos,
    node: LayerVecPos,
    stopNode: LayerVecPos,
    dist: number,
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
    if (isHorizontal(dir)) return { p: node, dist };
    if (this.getForced(parent, node).length > 0) {
      return { p: node, dist };
    }

    this.updateClosestToTarget(node, stopNode);
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

  protected getForced(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    const res: LayerVecPos[] = [];

    // if parent is more than one step away (jump), take the closest one:
    const newParent = this.posInDir(
      node,
      this.distanceUtils.direction(node.position, parent.position),
    );
    const { topLeft, downLeft, top, bottom } = this.normalizedPositions(
      newParent,
      node,
    );

    const blockOrTrans = (src: LayerVecPos, dest: LayerVecPos) => {
      return (
        this.isBlocking(src, dest) ||
        this.getTransition(dest.position, dest.layer) !== undefined
      );
    };

    const dir = this.distanceUtils.direction(parent.position, node.position);
    if (isVertical(dir)) {
      if (
        (blockOrTrans(newParent, downLeft) || blockOrTrans(downLeft, bottom)) &&
        !this.isBlocking(node, bottom)
      ) {
        res.push(bottom);
      }
      if (
        (blockOrTrans(newParent, topLeft) || blockOrTrans(topLeft, top)) &&
        !this.isBlocking(node, top)
      ) {
        res.push(top);
      }
    }

    return res;
  }

  protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[] {
    const { right, top, bottom } = this.normalizedPositions(parent, node);
    const forced = this.getForced(parent, node);
    const dir = directionFromPos(parent.position, node.position);

    if (isHorizontal(dir)) {
      return [right, top, bottom];
    }
    return [right, ...forced];
  }

  protected normalizedPositions(
    parent: LayerVecPos,
    node: LayerVecPos,
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

    return {
      topLeft: this.posInDir(
        node,
        this.turnTimes.get(Direction.UP_LEFT)?.get(this.turnOrder[dir]) ||
          Direction.UP_LEFT,
      ),
      downLeft: this.posInDir(
        node,
        this.turnTimes.get(Direction.DOWN_LEFT)?.get(this.turnOrder[dir]) ||
          Direction.DOWN_LEFT,
      ),
      downRight: this.posInDir(
        node,
        this.turnTimes.get(Direction.DOWN_RIGHT)?.get(this.turnOrder[dir]) ||
          Direction.DOWN_RIGHT,
      ),
      topRight: this.posInDir(
        node,
        this.turnTimes.get(Direction.UP_RIGHT)?.get(this.turnOrder[dir]) ||
          Direction.UP_RIGHT,
      ),
      top: this.posInDir(
        node,
        this.turnTimes.get(Direction.UP)?.get(this.turnOrder[dir]) ||
          Direction.UP,
      ),
      bottom: this.posInDir(
        node,
        this.turnTimes.get(Direction.DOWN)?.get(this.turnOrder[dir]) ||
          Direction.DOWN,
      ),
      right: this.posInDir(
        node,
        this.turnTimes.get(Direction.RIGHT)?.get(this.turnOrder[dir]) ||
          Direction.RIGHT,
      ),
    };
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

function createTurnTimes(): Map<Direction, Map<number, Direction>> {
  const dirs = [
    Direction.RIGHT,
    Direction.DOWN_RIGHT,
    Direction.DOWN,
    Direction.DOWN_LEFT,
    Direction.LEFT,
    Direction.UP_LEFT,
    Direction.UP,
    Direction.UP_RIGHT,
  ];
  const dirMap: Map<Direction, Map<number, Direction>> = new Map();

  for (let i = 0; i < dirs.length; i++) {
    const subMap: Map<number, Direction> = new Map();
    let currentDir = dirs[i];
    subMap.set(0, currentDir);
    for (let j = 1; j <= 7; j++) {
      currentDir = turnClockwise(currentDir);
      subMap.set(j, currentDir);
    }
    dirMap.set(dirs[i], subMap);
  }

  return dirMap;
}
