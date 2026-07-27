import {
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "./../ShortestPathAlgorithm.js";
import { VectorUtils } from "../../Utils/VectorUtils.js";
import { Queue } from "../../Datastructures/Queue/Queue.js";
import {
  LayerVecPos,
} from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { PathfindingOptions } from "../PathfindingOptions.js";

interface ShortestPathTuple {
  previous: Map<number, LayerVecPos>;
  closestToTarget: LayerVecPos;
  steps: number;
  maxPathLengthReached: boolean;
}

interface QueueEntry {
  node: LayerVecPos;
  dist: number;
}

const MAX_NEGATIVE_COORD_OFFSET = 100_000;
const MIN_SPATIAL_DIMENSION = 2 * MAX_NEGATIVE_COORD_OFFSET;

export class Bfs extends ShortestPathAlgorithm {
  private spatialWidth: number;
  private planeSize: number;

  constructor(gridTilemap: GridTilemap, options: PathfindingOptions = {}) {
    super(gridTilemap, options);

    const mapWidth = Number.isFinite(this.gridTilemap.getWidth())
      ? this.gridTilemap.getWidth()
      : 0;
    const mapHeight = Number.isFinite(this.gridTilemap.getHeight())
      ? this.gridTilemap.getHeight()
      : 0;

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

  private getLayerIndex(
    layerMap: Map<string | undefined, number>,
    layerName?: string,
  ): number {
    if (layerName === undefined) return 0;
    let idx = layerMap.get(layerName);
    if (idx === undefined) {
      idx = layerMap.size + 1;
      layerMap.set(layerName, idx);
    }
    return idx;
  }

  private getNodeId(
    pos: LayerVecPos,
    layerMap: Map<string | undefined, number>,
  ): number {
    const layerIndex = this.getLayerIndex(layerMap, pos.layer);
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
    const layerMap = new Map<string | undefined, number>();
    const shortestPath = this.shortestPathBfs(startPos, targetPos, layerMap);
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos, layerMap),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "BFS",
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
    layerMap: Map<string | undefined, number>,
  ): ShortestPathTuple {
    const previous = new Map<number, LayerVecPos>();
    const visited = new Set<number>();
    const queue: Queue<QueueEntry> = new Queue();
    let closestToTarget: LayerVecPos = startNode;
    let smallestDistToTarget: number = this.distance(
      startNode.position,
      stopNode.position,
    );
    let steps = 0;
    queue.enqueue({ node: startNode, dist: 0 });
    visited.add(this.getNodeId(startNode, layerMap));

    while (queue.size() > 0) {
      const dequeued = queue.dequeue();
      steps++;
      if (!dequeued) break;
      const { node, dist } = dequeued;
      if (dist > this.options.maxPathLength) {
        return {
          previous: new Map(),
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
      if (this.equal(node, stopNode)) {
        return {
          previous,
          closestToTarget,
          steps,
          maxPathLengthReached: false,
        };
      }

      for (const neighbor of this.getNeighbors(node, stopNode)) {
        const neighborId = this.getNodeId(neighbor, layerMap);
        if (!visited.has(neighborId)) {
          previous.set(neighborId, node);
          queue.enqueue({ node: neighbor, dist: dist + 1 });
          visited.add(neighborId);
        }
      }
    }
    return { previous, closestToTarget, steps, maxPathLengthReached: false };
  }

  private returnPath(
    previous: Map<number, LayerVecPos>,
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
    layerMap: Map<string | undefined, number>,
  ): LayerVecPos[] {
    const ret: LayerVecPos[] = [];
    let currentNode: LayerVecPos | undefined = stopNode;
    ret.push(currentNode);
    while (!this.equal(currentNode, startNode)) {
      currentNode = previous.get(this.getNodeId(currentNode, layerMap));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret.reverse();
  }
}
