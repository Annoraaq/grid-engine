import {
  LayerPositionUtils,
  LayerVecPos,
} from "./../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import {
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "../ShortestPathAlgorithm.js";
import { VectorUtils } from "../../Utils/VectorUtils.js";
import { Queue } from "../../Datastructures/Queue/Queue.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { PathfindingOptions } from "../PathfindingOptions.js";

interface ShortestPathTuple {
  previous: Map<number, LayerVecPos>;
  previous2: Map<number, LayerVecPos>;
  closestToTarget?: LayerVecPos;
  matchingPos?: LayerVecPos;
  steps: number;
  maxPathLengthReached: boolean;
}

interface QueueEntry {
  node: LayerVecPos;
  dist: number;
}

type Previous = Map<number, LayerVecPos>;

const MAX_NEGATIVE_COORD_OFFSET = 100_000;
const MIN_SPATIAL_DIMENSION = 2 * MAX_NEGATIVE_COORD_OFFSET;

class Bfs {
  previous = new Map<number, LayerVecPos>();
  visited = new Map<number, number>();
  queue = new Queue<QueueEntry>();
  otherBfs?: Bfs;
  minMatchingNode: LayerVecPos | undefined;
  private minMatching = Infinity;
  private lastDist = 0;

  constructor(private getNodeId: (pos: LayerVecPos) => number) {}

  isNewFrontier(): boolean {
    const el = this.queue.peek();
    return !!(el && el.dist > this.lastDist);
  }

  step(neighbors: LayerVecPos[], node: LayerVecPos, dist: number): void {
    this.lastDist = dist;
    for (const neighbor of neighbors) {
      const nId = this.getNodeId(neighbor);
      if (!this.visited.has(nId)) {
        this.previous.set(nId, node);
        this.queue.enqueue({ node: neighbor, dist: dist + 1 });
        this.visited.set(nId, dist + 1);
        const n = this.otherBfs?.visited.get(nId);
        if (n !== undefined) {
          if (n < this.minMatching) {
            this.minMatching = n;
            this.minMatchingNode = neighbor;
          }
        }
      }
    }
  }
}

export class BidirectionalSearch extends ShortestPathAlgorithm {
  private spatialWidth: number;
  private planeSize: number;

  constructor(gridTilemap: GridTilemap, options: PathfindingOptions = {}) {
    super(gridTilemap, options);

    const mapWidth = Number.isFinite(this.gridTilemap.getWidth())
      ? this.gridTilemap.getWidth()
      : 1000;
    const mapHeight = Number.isFinite(this.gridTilemap.getHeight())
      ? this.gridTilemap.getHeight()
      : 1000;

    this.spatialWidth = Math.max(
      mapWidth + 2 * MAX_NEGATIVE_COORD_OFFSET,
      MIN_SPATIAL_DIMENSION,
    );
    const spatialHeight = Math.max(
      mapHeight + 2 * MAX_NEGATIVE_COORD_OFFSET,
      MIN_SPATIAL_DIMENSION,
    );
    this.planeSize = this.spatialWidth * spatialHeight;
  }

  private getLayerIndex(layerName?: string): number {
    if (!layerName) return 0;
    let hash = 0;
    for (let i = 0; i < layerName.length; i++) {
      hash = (hash * 31 + layerName.charCodeAt(i)) & 0xffff;
    }
    return hash + 1;
  }

  private getNodeId(pos: LayerVecPos): number {
    const layerIndex = this.getLayerIndex(pos.layer);
    const shiftedX = pos.position.x + MAX_NEGATIVE_COORD_OFFSET;
    const shiftedY = pos.position.y + MAX_NEGATIVE_COORD_OFFSET;
    return (
      layerIndex * this.planeSize + shiftedY * this.spatialWidth + shiftedX
    );
  }

  findShortestPathImpl(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult {
    const shortestPath = this.shortestPathBfs(startPos, targetPos);
    return {
      path: this.returnPath(
        shortestPath.previous,
        shortestPath.previous2,
        shortestPath.matchingPos,
        startPos,
        targetPos,
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
    if (this.options.ignoreLayers) return true;
    return layerPos1.layer === layerPos2.layer;
  }

  private shortestPathBfs(
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): ShortestPathTuple {
    if (LayerPositionUtils.equal(startNode, stopNode)) {
      return {
        previous: new Map(),
        previous2: new Map(),
        closestToTarget: startNode,
        steps: 0,
        maxPathLengthReached: false,
      };
    }
    const getId = (pos: LayerVecPos) => this.getNodeId(pos);
    const startBfs = new Bfs(getId);
    const stopBfs = new Bfs(getId);
    let steps = 0;
    startBfs.otherBfs = stopBfs;
    stopBfs.otherBfs = startBfs;

    let closestToTarget: LayerVecPos = startNode;
    let smallestDistToTarget: number = this.distance(
      startNode.position,
      stopNode.position,
    );
    startBfs.queue.enqueue({ node: startNode, dist: 0 });
    stopBfs.queue.enqueue({ node: stopNode, dist: 0 });
    startBfs.visited.set(this.getNodeId(startNode), 0);
    stopBfs.visited.set(this.getNodeId(stopNode), 0);

    while (
      this.shouldStop(startBfs.queue.size() > 0, stopBfs.queue.size() > 0)
    ) {
      const startDequeued = startBfs.queue.dequeue();
      if (!startDequeued) break;
      const { node, dist } = startDequeued;

      // This will actually allow paths that are one larger than the limit for
      // even path lenghts. However, since it is a performance setting it does
      // not matter. If the path length would be crucial, one could simply
      // filter out found paths exceeding the max length.
      if (
        dist + 1 + (stopBfs.queue.peek()?.dist || 0) >
        this.options.maxPathLength
      ) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(closestToTarget),
          steps,
          maxPathLengthReached: true,
        };
      }

      const distToTarget = this.distance(node.position, stopNode.position);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }

      steps++;
      startBfs.step(this.getNeighbors(node, stopNode), node, dist);
      if (startBfs.isNewFrontier() && startBfs.minMatchingNode) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(stopNode),
          matchingPos: startBfs.minMatchingNode,
          steps,
          maxPathLengthReached: false,
        };
      }
      const stopDequeued = stopBfs.queue.dequeue();
      if (!stopDequeued) continue;
      const { node: stopBfsNode, dist: stopBfsDist } = stopDequeued;

      steps++;
      stopBfs.step(
        this.getReverseNeighbors(stopBfsNode, startNode),
        stopBfsNode,
        stopBfsDist,
      );
      if (stopBfs.isNewFrontier() && stopBfs.minMatchingNode) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(stopNode),
          matchingPos: stopBfs.minMatchingNode,
          steps,
          maxPathLengthReached: false,
        };
      }
    }
    return {
      previous: startBfs.previous,
      previous2: stopBfs.previous,
      closestToTarget: this.maybeClosestToTarget(closestToTarget),
      steps,
      maxPathLengthReached: false,
    };
  }

  private shouldStop(
    isStartBfsQueueSizeEmpty: boolean,
    isStopBfsQueueSizeEmpty: boolean,
  ) {
    if (this.options.calculateClosestToTarget) {
      return isStartBfsQueueSizeEmpty || isStopBfsQueueSizeEmpty;
    }
    return isStartBfsQueueSizeEmpty && isStopBfsQueueSizeEmpty;
  }

  /**
   * Returns closestToTarget if it is enabled in the options and undefined
   * otherwise.
   */
  private maybeClosestToTarget(pos: LayerVecPos): LayerVecPos | undefined {
    return this.options.calculateClosestToTarget ? pos : undefined;
  }

  private returnPath(
    startPathPrev: Previous,
    stopPathPrev: Previous,
    matchingPos: LayerVecPos | undefined,
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): LayerVecPos[] {
    if (matchingPos) {
      const startPath = this.getPathFromPrev(
        startPathPrev,
        startNode,
        matchingPos,
      ).reverse();
      const stopPath = this.getPathFromPrev(
        stopPathPrev,
        stopNode,
        matchingPos,
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
    stopNode: LayerVecPos,
  ): LayerVecPos[] {
    const ret: LayerVecPos[] = [];
    let currentNode: LayerVecPos | undefined = stopNode;
    ret.push(currentNode);
    while (!this.equal(currentNode, startNode)) {
      currentNode = previous.get(this.getNodeId(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret;
  }
}
