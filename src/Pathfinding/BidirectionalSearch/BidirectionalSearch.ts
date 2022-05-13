import { LayerPositionUtils } from "./../../Utils/LayerPositionUtils/LayerPositionUtils";
import { LayerPosition, ShortestPathAlgorithm } from "../ShortestPathAlgorithm";
import { VectorUtils } from "../../Utils/VectorUtils";
import { Queue } from "../../Datastructures/Queue/Queue";

interface ShortestPathTuple {
  shortestDistance: number;
  previous: Map<string, LayerPosition>;
  previous2: Map<string, LayerPosition>;
  closestToTarget: LayerPosition;
  matchingPos?: LayerPosition;
}

interface QueueEntry {
  node: LayerPosition;
  dist: number;
}

type Previous = Map<string, LayerPosition>;

class Bfs {
  previous = new Map<string, LayerPosition>();
  visited = new Map<string, number>();
  queue = new Queue<QueueEntry>();
  otherBfs?: Bfs;

  step(neighbours: LayerPosition[], node: LayerPosition, dist: number) {
    for (const neighbour of neighbours) {
      if (!this.visited.has(LayerPositionUtils.toString(neighbour))) {
        this.previous.set(LayerPositionUtils.toString(neighbour), node);
        this.queue.enqueue({ node: neighbour, dist: dist + 1 });
        this.visited.set(LayerPositionUtils.toString(neighbour), dist + 1);
      }
    }
  }
}

export class BidirectionalSearch implements ShortestPathAlgorithm {
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
      path: this.returnPath(
        shortestPath.previous,
        shortestPath.previous2,
        shortestPath.matchingPos,
        startPos,
        targetPos
      ),
      closestToTarget: shortestPath.closestToTarget,
    };
  }

  private distance(fromNode: LayerPosition, toNode: LayerPosition): number {
    return VectorUtils.manhattanDistance(fromNode.position, toNode.position);
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
    const startBfs = new Bfs();
    const stopBfs = new Bfs();
    startBfs.otherBfs = stopBfs;
    stopBfs.otherBfs = startBfs;

    let closestToTarget: LayerPosition = startNode;
    let smallestDistToTarget: number = this.distance(startNode, stopNode);
    startBfs.queue.enqueue({ node: startNode, dist: 0 });
    stopBfs.queue.enqueue({ node: stopNode, dist: 0 });
    startBfs.visited.set(LayerPositionUtils.toString(startNode), 0);
    stopBfs.visited.set(LayerPositionUtils.toString(stopNode), 0);

    while (startBfs.queue.size() > 0 && stopBfs.queue.size() > 0) {
      const { node, dist } = startBfs.queue.dequeue();
      const distToTarget = this.distance(node, stopNode);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }

      if (stopBfs.visited.has(LayerPositionUtils.toString(node))) {
        return {
          shortestDistance:
            dist + stopBfs.visited.get(LayerPositionUtils.toString(node)),
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: stopNode,
          matchingPos: node,
        };
      }

      startBfs.step(getNeighbours(node), node, dist);

      const { node: stopBfsNode, dist: stopBfsDist } = stopBfs.queue.dequeue();
      if (startBfs.visited.has(LayerPositionUtils.toString(stopBfsNode))) {
        return {
          shortestDistance:
            stopBfsDist +
            startBfs.visited.get(LayerPositionUtils.toString(stopBfsNode)),
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: stopNode,
          matchingPos: stopBfsNode,
        };
      }

      stopBfs.step(getNeighbours(stopBfsNode), stopBfsNode, stopBfsDist);
    }
    return {
      shortestDistance: -1,
      previous: startBfs.previous,
      previous2: stopBfs.previous,
      closestToTarget,
    };
  }

  private returnPath(
    startPathPrev: Previous,
    stopPathPrev: Previous,
    matchingPos: LayerPosition | undefined,
    startNode: LayerPosition,
    stopNode: LayerPosition
  ): LayerPosition[] {
    if (matchingPos) {
      const startPath = this.getPathFromPrev(
        startPathPrev,
        startNode,
        matchingPos
      ).reverse();
      const stopPath = this.getPathFromPrev(
        stopPathPrev,
        stopNode,
        matchingPos
      );
      startPath.pop();
      return [...startPath, ...stopPath];
    } else {
      return this.getPathFromPrev(startPathPrev, startNode, stopNode).reverse();
    }
  }

  private getPathFromPrev(
    previous: Previous,
    startNode: LayerPosition,
    stopNode: LayerPosition
  ): LayerPosition[] {
    const ret: LayerPosition[] = [];
    let currentNode: LayerPosition = stopNode;
    ret.push(currentNode);
    while (!this.equal(currentNode, startNode)) {
      currentNode = previous.get(LayerPositionUtils.toString(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret;
  }
}
