import { LayerPositionUtils } from "./../../Utils/LayerPositionUtils/LayerPositionUtils";
import {
  GetNeighbors,
  LayerVecPos,
  ShortestPathAlgorithm,
} from "../ShortestPathAlgorithm";
import { VectorUtils } from "../../Utils/VectorUtils";
import { Queue } from "../../Datastructures/Queue/Queue";

interface ShortestPathTuple {
  shortestDistance: number;
  previous: Map<string, LayerVecPos>;
  previous2: Map<string, LayerVecPos>;
  closestToTarget: LayerVecPos;
  matchingPos?: LayerVecPos;
  steps: number;
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

  step(neighbors: LayerVecPos[], node: LayerVecPos, dist: number) {
    for (const neighbor of neighbors) {
      if (!this.visited.has(LayerPositionUtils.toString(neighbor))) {
        this.previous.set(LayerPositionUtils.toString(neighbor), node);
        this.queue.enqueue({ node: neighbor, dist: dist + 1 });
        this.visited.set(LayerPositionUtils.toString(neighbor), dist + 1);
      }
    }
  }
}

export class BidirectionalSearch implements ShortestPathAlgorithm {
  getShortestPath(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
    getNeighbors: GetNeighbors,
    getReverseNeighbors: GetNeighbors
  ): { path: LayerVecPos[]; closestToTarget: LayerVecPos; steps: number } {
    const shortestPath = this.shortestPathBfs(
      startPos,
      targetPos,
      getNeighbors,
      getReverseNeighbors
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
      steps: shortestPath.steps,
    };
  }

  private distance(fromNode: LayerVecPos, toNode: LayerVecPos): number {
    return VectorUtils.manhattanDistance(fromNode.position, toNode.position);
  }

  private equal(layerPos1: LayerVecPos, layerPos2: LayerVecPos): boolean {
    if (!VectorUtils.equal(layerPos1.position, layerPos2.position))
      return false;
    return layerPos1.layer === layerPos2.layer;
  }

  private shortestPathBfs(
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
    getNeighbors: GetNeighbors,
    getReverseNeighbors: GetNeighbors
  ): ShortestPathTuple {
    const startBfs = new Bfs();
    const stopBfs = new Bfs();
    let steps = 0;
    startBfs.otherBfs = stopBfs;
    stopBfs.otherBfs = startBfs;

    let closestToTarget: LayerVecPos = startNode;
    let smallestDistToTarget: number = this.distance(startNode, stopNode);
    startBfs.queue.enqueue({ node: startNode, dist: 0 });
    stopBfs.queue.enqueue({ node: stopNode, dist: 0 });
    startBfs.visited.set(LayerPositionUtils.toString(startNode), 0);
    stopBfs.visited.set(LayerPositionUtils.toString(stopNode), 0);

    while (startBfs.queue.size() > 0 || stopBfs.queue.size() > 0) {
      const startDequeued = startBfs.queue.dequeue();
      if (!startDequeued) break;
      const { node, dist } = startDequeued;
      const distToTarget = this.distance(node, stopNode);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }

      if (stopBfs.visited.has(LayerPositionUtils.toString(node))) {
        return {
          shortestDistance:
            dist +
            (stopBfs.visited.get(LayerPositionUtils.toString(node)) ?? 0),
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: stopNode,
          matchingPos: node,
          steps,
        };
      }

      steps++;
      startBfs.step(getNeighbors(node), node, dist);
      const stopDequeued = stopBfs.queue.dequeue();
      if (!stopDequeued) continue;
      const { node: stopBfsNode, dist: stopBfsDist } = stopDequeued;
      if (startBfs.visited.has(LayerPositionUtils.toString(stopBfsNode))) {
        return {
          shortestDistance:
            stopBfsDist +
            (startBfs.visited.get(LayerPositionUtils.toString(stopBfsNode)) ??
              0),
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: stopNode,
          matchingPos: stopBfsNode,
          steps,
        };
      }

      steps++;
      stopBfs.step(getReverseNeighbors(stopBfsNode), stopBfsNode, stopBfsDist);
    }
    return {
      shortestDistance: -1,
      previous: startBfs.previous,
      previous2: stopBfs.previous,
      closestToTarget,
      steps,
    };
  }

  private returnPath(
    startPathPrev: Previous,
    stopPathPrev: Previous,
    matchingPos: LayerVecPos | undefined,
    startNode: LayerVecPos,
    stopNode: LayerVecPos
  ): LayerVecPos[] {
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
    startNode: LayerVecPos,
    stopNode: LayerVecPos
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
