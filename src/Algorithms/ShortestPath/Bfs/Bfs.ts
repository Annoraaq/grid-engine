import { ShortestPathAlgorithm } from "./../ShortestPathAlgorithm";
import { VectorUtils } from "../../../Utils/VectorUtils";
import { Vector2 } from "../../../Utils/Vector2/Vector2";

interface ShortestPathTuple {
  shortestDistance: number;
  previous: Map<string, Vector2>;
  closestToTarget: Vector2;
}

interface QueueEntry {
  node: Vector2;
  dist: number;
}

export class Bfs implements ShortestPathAlgorithm {
  getShortestPath(
    startPos: Vector2,
    targetPos: Vector2,
    getNeighbours: (pos: Vector2) => Vector2[]
  ): { path: Vector2[]; closestToTarget: Vector2 } {
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

  private shortestPathBfs(
    startNode: Vector2,
    stopNode: Vector2,
    getNeighbours: (pos: Vector2) => Vector2[]
  ): ShortestPathTuple {
    const previous = new Map<string, Vector2>();
    const visited = new Set<string>();
    const queue: QueueEntry[] = [];
    let closestToTarget: Vector2 = startNode;
    let smallestDistToTarget: number = VectorUtils.manhattanDistance(
      startNode,
      stopNode
    );
    queue.push({ node: startNode, dist: 0 });
    visited.add(VectorUtils.vec2str(startNode));

    while (queue.length > 0) {
      const { node, dist } = queue.shift();
      const distToTarget = VectorUtils.manhattanDistance(node, stopNode);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }
      if (VectorUtils.equal(node, stopNode)) {
        return { shortestDistance: dist, previous, closestToTarget };
      }

      for (const neighbour of getNeighbours(node)) {
        if (!visited.has(VectorUtils.vec2str(neighbour))) {
          previous.set(VectorUtils.vec2str(neighbour), node);
          queue.push({ node: neighbour, dist: dist + 1 });
          visited.add(VectorUtils.vec2str(neighbour));
        }
      }
    }
    return { shortestDistance: -1, previous, closestToTarget };
  }

  private returnPath(
    previous: Map<string, Vector2>,
    startNode: Vector2,
    stopNode: Vector2
  ): Vector2[] {
    const ret: Vector2[] = [];
    let currentNode: Vector2 = stopNode;
    ret.push(currentNode);
    while (!VectorUtils.equal(currentNode, startNode)) {
      currentNode = previous.get(VectorUtils.vec2str(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret.reverse();
  }
}
