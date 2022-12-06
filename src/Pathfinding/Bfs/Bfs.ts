import {
  GetNeighbors,
  LayerVecPos,
  ShortestPathAlgorithm,
} from "./../ShortestPathAlgorithm";
import { VectorUtils } from "../../Utils/VectorUtils";
import { Queue } from "../../Datastructures/Queue/Queue";

interface ShortestPathTuple {
  shortestDistance: number;
  previous: Map<string, LayerVecPos>;
  closestToTarget: LayerVecPos;
  steps: number;
}

interface QueueEntry {
  node: LayerVecPos;
  dist: number;
}

export class Bfs implements ShortestPathAlgorithm {
  getShortestPath(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
    getNeighbors: GetNeighbors
  ): { path: LayerVecPos[]; closestToTarget: LayerVecPos; steps: number } {
    const shortestPath = this.shortestPathBfs(
      startPos,
      targetPos,
      getNeighbors
    );
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
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

      const distToTarget = this.distance(node, stopNode);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }
      if (this.equal(node, stopNode)) {
        return { shortestDistance: dist, previous, closestToTarget, steps };
      }

      for (const neighbor of getNeighbors(node)) {
        if (!visited.has(this.pos2Str(neighbor))) {
          previous.set(this.pos2Str(neighbor), node);
          queue.enqueue({ node: neighbor, dist: dist + 1 });
          visited.add(this.pos2Str(neighbor));
        }
      }
    }
    return { shortestDistance: -1, previous, closestToTarget, steps };
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
