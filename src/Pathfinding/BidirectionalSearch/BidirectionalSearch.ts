import {
  LayerPositionUtils,
  LayerVecPos,
} from "./../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import {
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "../ShortestPathAlgorithm.js";
import { VectorUtils } from "../../Utils/VectorUtils.js";
import { Queue } from "../../Datastructures/Queue/Queue.js";

interface ShortestPathTuple {
  previous: Map<string, LayerVecPos>;
  previous2: Map<string, LayerVecPos>;
  closestToTarget?: LayerVecPos;
  matchingPos?: LayerVecPos;
  steps: number;
  maxPathLengthReached: boolean;
}

interface QueueEntry {
  node: LayerVecPos;
  dist: number;
}

type Previous = Map<string, LayerVecPos>;

class Bfs {
  previous = new Map<string, LayerVecPos>();
  visited = new Map<string, number>();
  queue = new Queue<QueueEntry>();
  otherBfs?: Bfs;
  minMatchingNode: LayerVecPos | undefined;
  private minMatching = Infinity;
  private lastDist = 0;

  isNewFrontier(): boolean {
    const el = this.queue.peek();
    return !!(el && el.dist > this.lastDist);
  }

  step(neighbors: LayerVecPos[], node: LayerVecPos, dist: number): void {
    this.lastDist = dist;
    for (const neighbor of neighbors) {
      const nStr = LayerPositionUtils.toString(neighbor);
      if (!this.visited.has(nStr)) {
        this.previous.set(nStr, node);
        this.queue.enqueue({ node: neighbor, dist: dist + 1 });
        this.visited.set(nStr, dist + 1);
        const n = this.otherBfs?.visited.get(nStr);
        if (n !== undefined) {
          if (n < this.minMatching) {
            this.minMatching = n;
            this.minMatchingNode = neighbor;
          }
        }
      }
    }
  }
}

export class BidirectionalSearch extends ShortestPathAlgorithm {
  findShortestPathImpl(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult {
    const shortestPath = this.shortestPathBfs(startPos, targetPos);
    return {
      path: this.returnPath(
        shortestPath.previous,
        shortestPath.previous2,
        shortestPath.matchingPos,
        startPos,
        targetPos,
      ),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "BIDIRECTIONAL_SEARCH",
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
    if (LayerPositionUtils.equal(startNode, stopNode)) {
      return {
        previous: new Map(),
        previous2: new Map(),
        closestToTarget: startNode,
        steps: 0,
        maxPathLengthReached: false,
      };
    }
    const startBfs = new Bfs();
    const stopBfs = new Bfs();
    let steps = 0;
    startBfs.otherBfs = stopBfs;
    stopBfs.otherBfs = startBfs;

    let closestToTarget: LayerVecPos = startNode;
    let smallestDistToTarget: number = this.distance(
      startNode.position,
      stopNode.position,
    );
    startBfs.queue.enqueue({ node: startNode, dist: 0 });
    stopBfs.queue.enqueue({ node: stopNode, dist: 0 });
    startBfs.visited.set(LayerPositionUtils.toString(startNode), 0);
    stopBfs.visited.set(LayerPositionUtils.toString(stopNode), 0);

    while (
      this.shouldStop(startBfs.queue.size() > 0, stopBfs.queue.size() > 0)
    ) {
      const startDequeued = startBfs.queue.dequeue();
      if (!startDequeued) break;
      const { node, dist } = startDequeued;

      // This will actually allow paths that are one larger than the limit for
      // even path lenghts. However, since it is a performance setting it does
      // not matter. If the path length would be crucial, one could simply
      // filter out found paths exceeding the max length.
      if (
        dist + 1 + (stopBfs.queue.peek()?.dist || 0) >
        this.options.maxPathLength
      ) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(closestToTarget),
          steps,
          maxPathLengthReached: true,
        };
      }

      const distToTarget = this.distance(node.position, stopNode.position);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }

      steps++;
      startBfs.step(this.getNeighbors(node, stopNode), node, dist);
      if (startBfs.isNewFrontier() && startBfs.minMatchingNode) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(stopNode),
          matchingPos: startBfs.minMatchingNode,
          steps,
          maxPathLengthReached: false,
        };
      }
      const stopDequeued = stopBfs.queue.dequeue();
      if (!stopDequeued) continue;
      const { node: stopBfsNode, dist: stopBfsDist } = stopDequeued;

      steps++;
      stopBfs.step(
        this.getReverseNeighbors(stopBfsNode, stopNode),
        stopBfsNode,
        stopBfsDist,
      );
      if (stopBfs.isNewFrontier() && stopBfs.minMatchingNode) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(stopNode),
          matchingPos: stopBfs.minMatchingNode,
          steps,
          maxPathLengthReached: false,
        };
      }
    }
    return {
      previous: startBfs.previous,
      previous2: stopBfs.previous,
      closestToTarget: this.maybeClosestToTarget(closestToTarget),
      steps,
      maxPathLengthReached: false,
    };
  }

  private shouldStop(
    isStartBfsQueueSizeEmpty: boolean,
    isStopBfsQueueSizeEmpty: boolean,
  ) {
    if (this.options.calculateClosestToTarget) {
      return isStartBfsQueueSizeEmpty || isStopBfsQueueSizeEmpty;
    }
    return isStartBfsQueueSizeEmpty && isStopBfsQueueSizeEmpty;
  }

  /**
   * Returns closestToTarget if it is enabled in the options and undefined
   * otherwise.
   */
  private maybeClosestToTarget(pos: LayerVecPos): LayerVecPos | undefined {
    return this.options.calculateClosestToTarget ? pos : undefined;
  }

  private returnPath(
    startPathPrev: Previous,
    stopPathPrev: Previous,
    matchingPos: LayerVecPos | undefined,
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): LayerVecPos[] {
    if (matchingPos) {
      const startPath = this.getPathFromPrev(
        startPathPrev,
        startNode,
        matchingPos,
      ).reverse();
      const stopPath = this.getPathFromPrev(
        stopPathPrev,
        stopNode,
        matchingPos,
      );
      startPath.pop();
      return [...startPath, ...stopPath];
    } else {
      return this.getPathFromPrev(startPathPrev, startNode, stopNode).reverse();
    }
  }

  private getPathFromPrev(
    previous: Previous,
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
    return ret;
  }
}
