import {
  GetNeighbors,
  LayerVecPos,
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "./../ShortestPathAlgorithm";
import { VectorUtils } from "../../Utils/VectorUtils";
import { Queue } from "../../Datastructures/Queue/Queue";

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

export class Bfs implements ShortestPathAlgorithm {
  private maxPathLength = Infinity;

  setMaxPathLength(maxPathLength: number) {
    this.maxPathLength = maxPathLength;
  }

  getShortestPath(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
    getNeighbors: GetNeighbors
  ): ShortestPathResult {
    const shortestPath = this.shortestPathBfs(
      startPos,
      targetPos,
      getNeighbors
    );
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
    };
  }

  private distance(fromNode: LayerVecPos, toNode: LayerVecPos): number {
    return VectorUtils.manhattanDistance(fromNode.position, toNode.position);
  }

  private pos2Str(layerPos: LayerVecPos): string {
    return `${layerPos.position.toString()}#${layerPos.layer}`;
  }

  private equal(layerPos1: LayerVecPos, layerPos2: LayerVecPos): boolean {
    if (!VectorUtils.equal(layerPos1.position, layerPos2.position))
      return false;
    return layerPos1.layer === layerPos2.layer;
  }

  private shortestPathBfs(
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
    getNeighbors: GetNeighbors
  ): ShortestPathTuple {
    const previous = new Map<string, LayerVecPos>();
    const visited = new Set<string>();
    const queue: Queue<QueueEntry> = new Queue();
    let closestToTarget: LayerVecPos = startNode;
    let smallestDistToTarget: number = this.distance(startNode, stopNode);
    let steps = 0;
    queue.enqueue({ node: startNode, dist: 0 });
    visited.add(this.pos2Str(startNode));

    while (queue.size() > 0) {
      const dequeued = queue.dequeue();
      steps++;
      if (!dequeued) break;
      const { node, dist } = dequeued;
      if (dist > this.maxPathLength) {
        return {
          previous: new Map(),
          closestToTarget,
          steps,
          maxPathLengthReached: true,
        };
      }

      const distToTarget = this.distance(node, stopNode);
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

      for (const neighbor of getNeighbors(node)) {
        if (!visited.has(this.pos2Str(neighbor))) {
          previous.set(this.pos2Str(neighbor), node);
          queue.enqueue({ node: neighbor, dist: dist + 1 });
          visited.add(this.pos2Str(neighbor));
        }
      }
    }
    return { previous, closestToTarget, steps, maxPathLengthReached: false };
  }

  private returnPath(
    previous: Map<string, LayerVecPos>,
    startNode: LayerVecPos,
    stopNode: LayerVecPos
  ): LayerVecPos[] {
    const ret: LayerVecPos[] = [];
    let currentNode: LayerVecPos | undefined = stopNode;
    ret.push(currentNode);
    while (!this.equal(currentNode, startNode)) {
      currentNode = previous.get(this.pos2Str(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret.reverse();
  }
}
