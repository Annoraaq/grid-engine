import { LayerPositionUtils } from "./../../Utils/LayerPositionUtils/LayerPositionUtils";
import {
  LayerVecPos,
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "../ShortestPathAlgorithm";
import { VectorUtils } from "../../Utils/VectorUtils";
import { Queue } from "../../Datastructures/Queue/Queue";

interface ShortestPathTuple {
  previous: Map<string, LayerVecPos>;
  previous2: Map<string, LayerVecPos>;
  closestToTarget: LayerVecPos;
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

export class BidirectionalSearch extends ShortestPathAlgorithm {
  findShortestPath(
    startPos: LayerVecPos,
    targetPos: LayerVecPos
  ): ShortestPathResult {
    const shortestPath = this.shortestPathBfs(startPos, targetPos);
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
    stopNode: LayerVecPos
  ): ShortestPathTuple {
    const startBfs = new Bfs();
    const stopBfs = new Bfs();
    let steps = 0;
    startBfs.otherBfs = stopBfs;
    stopBfs.otherBfs = startBfs;

    let closestToTarget: LayerVecPos = startNode;
    let smallestDistToTarget: number = this.distance(
      startNode.position,
      stopNode.position
    );
    startBfs.queue.enqueue({ node: startNode, dist: 0 });
    stopBfs.queue.enqueue({ node: stopNode, dist: 0 });
    startBfs.visited.set(LayerPositionUtils.toString(startNode), 0);
    stopBfs.visited.set(LayerPositionUtils.toString(stopNode), 0);

    while (startBfs.queue.size() > 0 || stopBfs.queue.size() > 0) {
      const startDequeued = startBfs.queue.dequeue();
      if (!startDequeued) break;
      const { node, dist } = startDequeued;

      // This will actually allow paths that are one larger than the limit for
      // even path lenghts. However, since it is a performance setting it does
      // not matter.  If the path length would be crucial, one could simply
      // filter out found paths exceeding the max length.
      if (
        dist + 1 + (stopBfs.queue.peek()?.dist || 0) >
        this.options.maxPathLength
      ) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget,
          steps,
          maxPathLengthReached: true,
        };
      }

      const distToTarget = this.distance(node.position, stopNode.position);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }

      if (stopBfs.visited.has(LayerPositionUtils.toString(node))) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: stopNode,
          matchingPos: node,
          steps,
          maxPathLengthReached: false,
        };
      }

      steps++;
      startBfs.step(this.getNeighbors(node, stopNode), node, dist);
      const stopDequeued = stopBfs.queue.dequeue();
      if (!stopDequeued) continue;
      const { node: stopBfsNode, dist: stopBfsDist } = stopDequeued;
      if (startBfs.visited.has(LayerPositionUtils.toString(stopBfsNode))) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: stopNode,
          matchingPos: stopBfsNode,
          steps,
          maxPathLengthReached: false,
        };
      }

      steps++;
      stopBfs.step(
        this.getReverseNeighbors(stopBfsNode, stopNode),
        stopBfsNode,
        stopBfsDist
      );
    }
    return {
      previous: startBfs.previous,
      previous2: stopBfs.previous,
      closestToTarget,
      steps,
      maxPathLengthReached: false,
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
