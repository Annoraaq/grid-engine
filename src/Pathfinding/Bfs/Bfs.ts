import {
  LayerPosition,
  ShortestPathAlgorithm,
} from "./../ShortestPathAlgorithm";
import { VectorUtils } from "../../Utils/VectorUtils";
import { Queue } from "../../Datastructures/Queue/Queue";

interface ShortestPathTuple {
  shortestDistance: number;
  previous: Map<string, LayerPosition>;
  closestToTarget: LayerPosition;
}

interface QueueEntry {
  node: LayerPosition;
  dist: number;
}

export class Bfs implements ShortestPathAlgorithm {
  getShortestPath(
    startPos: LayerPosition,
    targetPos: LayerPosition,
    getNeighbours: (pos: LayerPosition) => LayerPosition[]
  ): { path: LayerPosition[]; closestToTarget: LayerPosition } {
    const shortestPath = this.shortestPathBfs(
      startPos,
      targetPos,
      getNeighbours
    );
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
    };
  }

  private distance(fromNode: LayerPosition, toNode: LayerPosition): number {
    return VectorUtils.manhattanDistance(fromNode.position, toNode.position);
  }

  private pos2Str(layerPos: LayerPosition): string {
    return `${layerPos.position.toString()}#${layerPos.layer}`;
  }

  private equal(layerPos1: LayerPosition, layerPos2: LayerPosition): boolean {
    if (!VectorUtils.equal(layerPos1.position, layerPos2.position))
      return false;
    return layerPos1.layer === layerPos2.layer;
  }

  private shortestPathBfs(
    startNode: LayerPosition,
    stopNode: LayerPosition,
    getNeighbours: (pos: LayerPosition) => LayerPosition[]
  ): ShortestPathTuple {
    const previous = new Map<string, LayerPosition>();
    const visited = new Set<string>();
    const queue: Queue<QueueEntry> = new Queue();
    let closestToTarget: LayerPosition = startNode;
    let smallestDistToTarget: number = this.distance(startNode, stopNode);
    queue.enqueue({ node: startNode, dist: 0 });
    visited.add(this.pos2Str(startNode));

    while (queue.size() > 0) {
      const { node, dist } = queue.dequeue();
      const distToTarget = this.distance(node, stopNode);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }
      if (this.equal(node, stopNode)) {
        return { shortestDistance: dist, previous, closestToTarget };
      }

      for (const neighbour of getNeighbours(node)) {
        if (!visited.has(this.pos2Str(neighbour))) {
          previous.set(this.pos2Str(neighbour), node);
          queue.enqueue({ node: neighbour, dist: dist + 1 });
          visited.add(this.pos2Str(neighbour));
        }
      }
    }
    return { shortestDistance: -1, previous, closestToTarget };
  }

  private returnPath(
    previous: Map<string, LayerPosition>,
    startNode: LayerPosition,
    stopNode: LayerPosition
  ): LayerPosition[] {
    const ret: LayerPosition[] = [];
    let currentNode: LayerPosition = stopNode;
    ret.push(currentNode);
    while (!this.equal(currentNode, startNode)) {
      currentNode = previous.get(this.pos2Str(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret.reverse();
  }
}
