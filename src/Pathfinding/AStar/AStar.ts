import {
  ShortestPathAlgorithm,
  ShortestPathResult,
} from "../ShortestPathAlgorithm.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
import { VectorUtils } from "../../Utils/VectorUtils.js";
import { MinFibonacciHeap } from "mnemonist";

import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";

interface HeapEntry {
  node: LayerVecPos;
  id: number;
}

interface ShortestPathTuple {
  previous: Map<number, LayerVecPos>;
  closestToTarget: LayerVecPos;
  steps: number;
  maxPathLengthReached: boolean;
}

/**
 * Maximum negative coordinate offset allowed for pathfinding (e.g. -100,000).
 * Shifting x and y by this offset ensures all grid coordinates map to positive integers.
 */
const MAX_NEGATIVE_COORD_OFFSET = 100_000;

/**
 * Minimum spatial dimension span allocated per axis to support coordinates in the range
 * [-MAX_NEGATIVE_COORD_OFFSET, +MAX_NEGATIVE_COORD_OFFSET].
 */
const MIN_SPATIAL_DIMENSION = 2 * MAX_NEGATIVE_COORD_OFFSET;

export class AStar extends ShortestPathAlgorithm {
  private spatialWidth: number;
  private planeSize: number;

  constructor(gridTilemap: GridTilemap, options: PathfindingOptions = {}) {
    super(gridTilemap, options);

    // Calculate total coordinate span for X and Y axes, ensuring enough room for
    // negative coordinates (via MAX_NEGATIVE_COORD_OFFSET) and map bounds.
    this.spatialWidth = Math.max(
      this.gridTilemap.getWidth() + 2 * MAX_NEGATIVE_COORD_OFFSET,
      MIN_SPATIAL_DIMENSION,
    );
    const spatialHeight = Math.max(
      this.gridTilemap.getHeight() + 2 * MAX_NEGATIVE_COORD_OFFSET,
      MIN_SPATIAL_DIMENSION,
    );

    // planeSize represents the total 2D ID range allocated per layer plane.
    this.planeSize = this.spatialWidth * spatialHeight;
  }

  findShortestPathImpl(
    startPos: LayerVecPos,
    targetPos: LayerVecPos,
  ): ShortestPathResult {
    const shortestPath = this.shortestPathBfs(startPos, targetPos);
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "A_STAR",
    };
  }

  /**
   * Encodes a 3D position (x, y, charLayer) into a unique integer ID.
   * Uses plane-filling arithmetic to avoid string creation during A* search:
   *   ID = layerIndex * planeSize + shiftedY * spatialWidth + shiftedX
   */
  private getNodeId(pos: LayerVecPos): number {
    const layerIndex = this.gridTilemap.getLayerIndex(pos.layer);
    const shiftedX = pos.position.x + MAX_NEGATIVE_COORD_OFFSET;
    const shiftedY = pos.position.y + MAX_NEGATIVE_COORD_OFFSET;
    return (
      layerIndex * this.planeSize + shiftedY * this.spatialWidth + shiftedX
    );
  }

  private shortestPathBfs(
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): ShortestPathTuple {
    const previous = new Map<number, LayerVecPos>();
    const g = new Map<number, number>();
    const f = new Map<number, number>();
    const openSet = new MinFibonacciHeap<HeapEntry>(
      (a, b) =>
        (f.get(a.id) ?? Number.MAX_VALUE) - (f.get(b.id) ?? Number.MAX_VALUE),
    );
    let closestToTarget: LayerVecPos = startNode;
    let smallestDistToTarget: number = this.distance(
      startNode.position,
      stopNode.position,
    );
    let steps = 0;

    const startNodeId = this.getNodeId(startNode);
    openSet.push({ node: startNode, id: startNodeId });
    g.set(startNodeId, 0);
    f.set(startNodeId, this.distance(startNode.position, stopNode.position));

    while (openSet.size > 0) {
      const currentEntry = openSet.pop();
      if (!currentEntry) break;
      const current = currentEntry.node;
      const currentId = currentEntry.id;
      steps++;

      const distToTarget = this.distance(current.position, stopNode.position);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = current;
      }

      if (equal(current, stopNode)) {
        return {
          previous,
          closestToTarget,
          steps,
          maxPathLengthReached: false,
        };
      }

      if (
        (g.get(currentId) ?? Number.MAX_VALUE) + 1 >
        this.options.maxPathLength
      ) {
        return {
          previous: new Map(),
          closestToTarget,
          steps,
          maxPathLengthReached: true,
        };
      }

      for (const neighbor of this.getNeighbors(current, stopNode)) {
        const neighborId = this.getNodeId(neighbor);
        const tentativeG =
          (g.get(currentId) ?? Number.MAX_VALUE) +
          this.getCosts(current.position, neighbor);
        if (
          !g.has(neighborId) ||
          tentativeG < (g.get(neighborId) ?? Number.MAX_VALUE)
        ) {
          previous.set(neighborId, current);
          g.set(neighborId, tentativeG);
          f.set(
            neighborId,
            tentativeG + this.distance(neighbor.position, stopNode.position),
          );
          openSet.push({ node: neighbor, id: neighborId });
        }
      }
    }
    return { previous, closestToTarget, steps, maxPathLengthReached: false };
  }

  private returnPath(
    previous: Map<number, LayerVecPos>,
    startNode: LayerVecPos,
    stopNode: LayerVecPos,
  ): LayerVecPos[] {
    const ret: LayerVecPos[] = [];
    let currentNode: LayerVecPos | undefined = stopNode;
    ret.push(currentNode);
    while (!equal(currentNode, startNode)) {
      const currentId = this.getNodeId(currentNode);
      currentNode = previous.get(currentId);
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret.reverse();
  }
}

function equal(layerPos1: LayerVecPos, layerPos2: LayerVecPos): boolean {
  if (!VectorUtils.equal(layerPos1.position, layerPos2.position)) return false;
  return layerPos1.layer === layerPos2.layer;
}
