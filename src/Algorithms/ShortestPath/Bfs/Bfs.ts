import * as Phaser from "phaser";
import { VectorUtils } from "../../../Utils/VectorUtils";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

interface ShortestPathTuple {
  shortestDistance: number;
  previous: Map<string, Vector2>;
}

interface QueueEntry {
  node: Vector2;
  dist: number;
}

export class Bfs {
  static getShortestPath(startPos: Vector2, targetPos: Vector2): Vector2[] {
    return Bfs.returnPath(
      Bfs.shortestPathBfs(startPos, targetPos).previous,
      startPos,
      targetPos
    );
  }

  private static shortestPathBfs(
    startNode: Vector2,
    stopNode: Vector2
  ): ShortestPathTuple {
    const previous = new Map<string, Vector2>();
    const visited = new Set<string>();
    const queue: QueueEntry[] = [];
    queue.push({ node: startNode, dist: 0 });
    visited.add(startNode.toString());

    while (queue.length > 0) {
      const { node, dist } = queue.shift();
      if (VectorUtils.equal(node, stopNode)) {
        return { shortestDistance: dist, previous };
      }

      for (let neighbour of Bfs.getNeighbours(node)) {
        if (!visited.has(VectorUtils.vec2str(neighbour))) {
          previous.set(VectorUtils.vec2str(neighbour), node);
          queue.push({ node: neighbour, dist: dist + 1 });
          visited.add(VectorUtils.vec2str(neighbour));
        }
      }
    }
    return { shortestDistance: -1, previous };
  }

  private static getNeighbours(pos: Vector2): Vector2[] {
    return [
      new Vector2(pos.x, pos.y + 1),
      new Vector2(pos.x + 1, pos.y),
      new Vector2(pos.x - 1, pos.y),
      new Vector2(pos.x, pos.y - 1),
    ];
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
      ret.push(currentNode);
    }
    return ret.reverse();
  }
}
