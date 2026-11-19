import {
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "./../ShortestPathAlgorithm.js";
import { VectorUtils } from "../../Utils/VectorUtils.js";
import { Queue } from "../../Datastructures/Queue/Queue.js";
import {
  LayerPositionUtils,
  LayerVecPos,
} from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";

interface ShortestPathTuple {
  previous: Map<string, LayerVecPos>;
  closestToTarget: LayerVecPos;
  steps: number;
  maxPathLengthReached: boolean;
}

interface QueueEntry {
  node: LayerVecPos;
  dist: number;
}

export interface FleePathResult {
  path: LayerVecPos[];
  farthestFromTarget: LayerVecPos;
  pathToFarthest: LayerVecPos[];
  steps: number;
  maxPathLengthReached: boolean;
}

export class Bfs extends ShortestPathAlgorithm {
  findShortestPathImpl(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult {
    const shortestPath = this.shortestPathBfs(startPos, targetPos);
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "BFS",
    };
  }

  findFleePath(
    startPos: LayerVecPos,
    avoidPos: LayerVecPos,
    minDistance: number,
  ): FleePathResult {
    if (this.options.ignoreLayers) {
      this.gridTilemap.fixCacheLayer(startPos.layer);
    }
    const res = this.findFleePathImpl(startPos, avoidPos, minDistance);
    this.gridTilemap.unfixCacheLayers();
    return res;
  }

  private findFleePathImpl(
    startNode: LayerVecPos,
    avoidNode: LayerVecPos,
    minDistance: number,
  ): FleePathResult {
    const previous = new Map<string, LayerVecPos>();
    const visited = new Set<string>();
    const queue: Queue<QueueEntry> = new Queue();
    let farthestFromTarget: LayerVecPos = startNode;
    let largestDistFromTarget: number = this.distance(
      startNode.position,
      avoidNode.position,
    );
    let steps = 0;

    queue.enqueue({ node: startNode, dist: 0 });
    visited.add(LayerPositionUtils.toString(startNode));

    while (queue.size() > 0) {
      const dequeued = queue.dequeue();
      steps++;
      if (!dequeued) break;
      const { node, dist } = dequeued;

      if (dist > this.options.maxPathLength) {
        return {
          path: [],
          farthestFromTarget,
          pathToFarthest: this.returnPath(
            previous,
            startNode,
            farthestFromTarget,
          ),
          steps,
          maxPathLengthReached: true,
        };
      }

      const distFromAvoid = this.distance(node.position, avoidNode.position);
      if (distFromAvoid > largestDistFromTarget) {
        largestDistFromTarget = distFromAvoid;
        farthestFromTarget = node;
      }

      if (distFromAvoid >= minDistance) {
        const path = this.returnPath(previous, startNode, node);
        return {
          path,
          farthestFromTarget: node,
          pathToFarthest: path,
          steps,
          maxPathLengthReached: false,
        };
      }

      const neighbors = this.getNeighbors(node, avoidNode);
      neighbors.sort((a, b) => {
        const gridDiff =
          this.distance(b.position, avoidNode.position) -
          this.distance(a.position, avoidNode.position);
        if (gridDiff !== 0) return gridDiff;
        const aDx = a.position.x - avoidNode.position.x;
        const aDy = a.position.y - avoidNode.position.y;
        const bDx = b.position.x - avoidNode.position.x;
        const bDy = b.position.y - avoidNode.position.y;
        return bDx * bDx + bDy * bDy - (aDx * aDx + aDy * aDy);
      });

      for (const neighbor of neighbors) {
        const key = LayerPositionUtils.toString(neighbor);
        if (!visited.has(key)) {
          previous.set(key, node);
          queue.enqueue({ node: neighbor, dist: dist + 1 });
          visited.add(key);
        }
      }
    }

    return {
      path: [],
      farthestFromTarget,
      pathToFarthest: this.returnPath(previous, startNode, farthestFromTarget),
      steps,
      maxPathLengthReached: false,
    };
  }

  private equal(layerPos1: LayerVecPos, layerPos2: LayerVecPos): boolean {
    if (!VectorUtils.equal(layerPos1.position, layerPos2.position))
      return false;
    return layerPos1.layer === layerPos2.layer;
  }

  private shortestPathBfs(
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): ShortestPathTuple {
    const previous = new Map<string, LayerVecPos>();
    const visited = new Set<string>();
    const queue: Queue<QueueEntry> = new Queue();
    let closestToTarget: LayerVecPos = startNode;
    let smallestDistToTarget: number = this.distance(
      startNode.position,
      stopNode.position,
    );
    let steps = 0;
    queue.enqueue({ node: startNode, dist: 0 });
    visited.add(LayerPositionUtils.toString(startNode));

    while (queue.size() > 0) {
      const dequeued = queue.dequeue();
      steps++;
      if (!dequeued) break;
      const { node, dist } = dequeued;
      if (dist > this.options.maxPathLength) {
        return {
          previous: new Map(),
          closestToTarget,
          steps,
          maxPathLengthReached: true,
        };
      }

      const distToTarget = this.distance(node.position, stopNode.position);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }
      if (this.equal(node, stopNode)) {
        return {
          previous,
          closestToTarget,
          steps,
          maxPathLengthReached: false,
        };
      }

      for (const neighbor of this.getNeighbors(node, stopNode)) {
        if (!visited.has(LayerPositionUtils.toString(neighbor))) {
          previous.set(LayerPositionUtils.toString(neighbor), node);
          queue.enqueue({ node: neighbor, dist: dist + 1 });
          visited.add(LayerPositionUtils.toString(neighbor));
        }
      }
    }
    return { previous, closestToTarget, steps, maxPathLengthReached: false };
  }

  private returnPath(
    previous: Map<string, LayerVecPos>,
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): LayerVecPos[] {
    const ret: LayerVecPos[] = [];
    let currentNode: LayerVecPos | undefined = stopNode;
    ret.push(currentNode);
    while (!this.equal(currentNode, startNode)) {
      currentNode = previous.get(LayerPositionUtils.toString(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret.reverse();
  }
}
