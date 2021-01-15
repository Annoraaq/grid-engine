import * as Phaser from "phaser";
import { VectorUtils } from "../../../Utils/VectorUtils";

export class Bfs {
  static getShortestPath(
    startPos: Phaser.Math.Vector2,
    targetPos: Phaser.Math.Vector2
  ) {
    const returnPath = (previous, startNode, stopNode) => {
      const ret = [];
      let currentNode = stopNode;
      ret.push(currentNode);
      while (
        VectorUtils.vec2str(currentNode) != VectorUtils.vec2str(startNode)
      ) {
        currentNode = previous.get(VectorUtils.vec2str(currentNode));
        ret.push(currentNode);
      }
      return ret.reverse();
    };

    const getNeighbours = (pos: Phaser.Math.Vector2) => {
      return [
        new Phaser.Math.Vector2(pos.x, pos.y + 1),
        new Phaser.Math.Vector2(pos.x + 1, pos.y),
        new Phaser.Math.Vector2(pos.x - 1, pos.y),
        new Phaser.Math.Vector2(pos.x, pos.y - 1),
      ];
    };

    const shortestPathBfs = (startNode, stopNode) => {
      const previous = new Map();
      const visited = new Set();
      const queue = [];
      queue.push({ node: startNode, dist: 0 });
      visited.add(startNode.toString());

      while (queue.length > 0) {
        const { node, dist } = queue.shift();
        if (VectorUtils.vec2str(node) === VectorUtils.vec2str(stopNode)) {
          return { shortestDistande: dist, previous };
        }

        for (let neighbour of getNeighbours(node)) {
          if (!visited.has(VectorUtils.vec2str(neighbour))) {
            previous.set(VectorUtils.vec2str(neighbour), node);
            queue.push({ node: neighbour, dist: dist + 1 });
            visited.add(VectorUtils.vec2str(neighbour));
          }
        }
      }
      return { shortestDistance: -1, previous };
    };

    return returnPath(
      shortestPathBfs(startPos, targetPos).previous,
      startPos,
      targetPos
    );
  }
}
