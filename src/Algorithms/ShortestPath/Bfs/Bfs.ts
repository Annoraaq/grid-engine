import * as Phaser from "phaser";
import { VectorUtils } from "../../../Utils/VectorUtils";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

interface ShortestPathTuple {
  shortestDistance: number;
  previous: Map<string, Vector2>;
  closestToTarget: Vector2;
}

interface QueueEntry {
  node: Vector2;
  dist: number;
}

export class Bfs {
  static getShortestPath(
    startPos: Vector2,
    targetPos: Vector2,
    isBlocked: (pos: Vector2) => boolean
  ): { path: Vector2[]; closestToTarget: Vector2 } {
    const shortestPath = Bfs.shortestPathBfs(startPos, targetPos, isBlocked);
    return {
      path: Bfs.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
    };
  }

  private static shortestPathBfs(
    startNode: Vector2,
    stopNode: Vector2,
    isBlocked: (pos: Vector2) => boolean
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

      for (let neighbour of Bfs.getNeighbours(node, isBlocked)) {
        if (!visited.has(VectorUtils.vec2str(neighbour))) {
          previous.set(VectorUtils.vec2str(neighbour), node);
          queue.push({ node: neighbour, dist: dist + 1 });
          visited.add(VectorUtils.vec2str(neighbour));
        }
      }
    }
    return { shortestDistance: -1, previous, closestToTarget };
  }

  private static getNeighbours(
    pos: Vector2,
    isBlocked: (pos: Vector2) => boolean
  ): Vector2[] {
    return [
      new Vector2(pos.x, pos.y + 1),
      new Vector2(pos.x + 1, pos.y),
      new Vector2(pos.x - 1, pos.y),
      new Vector2(pos.x, pos.y - 1),
    ].filter((pos) => !isBlocked(pos));
  }

  private static returnPath(
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
