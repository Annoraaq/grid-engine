import { NumberOfDirections } from "../Direction/Direction.js";
import { GridTilemap } from "../GridTilemap/GridTilemap.js";
import { LayerVecPos } from "../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { AStar } from "./AStar/AStar.js";
import { Bfs } from "./Bfs/Bfs.js";
import { BidirectionalSearch } from "./BidirectionalSearch/BidirectionalSearch.js";
import { Jps4 } from "./Jps4/Jps4.js";
import { Jps8 } from "./Jps8/Jps8.js";
import { PathfindingOptions } from "./PathfindingOptions.js";
import {
  ShortestPathAlgorithm,
  ShortestPathAlgorithmType,
  ShortestPathResult,
} from "./ShortestPathAlgorithm.js";

export class Pathfinding {
  constructor(private gridTilemap: GridTilemap) {}

  findShortestPath(
    source: LayerVecPos,
    dest: LayerVecPos,
    pathfindingOptions: PathfindingOptions = {},
  ): ShortestPathResult {
    const shortestPathAlgo = shortestPathAlgorithmFactory(
      pathfindingOptions.shortestPathAlgorithm || "BIDIRECTIONAL_SEARCH",
      this.gridTilemap,
      pathfindingOptions,
    );

    return shortestPathAlgo.findShortestPath(source, dest);
  }
}

function shortestPathAlgorithmFactory(
  type: ShortestPathAlgorithmType,
  gridTilemap: GridTilemap,
  options: PathfindingOptions,
): ShortestPathAlgorithm {
  switch (type) {
    case "BIDIRECTIONAL_SEARCH":
      return new BidirectionalSearch(gridTilemap, options);
    case "A_STAR":
      return new AStar(gridTilemap, options);
    case "JPS":
      if (options.numberOfDirections === NumberOfDirections.EIGHT) {
        return new Jps8(gridTilemap, options);
      }
      return new Jps4(gridTilemap, options);
  }
  return new Bfs(gridTilemap, options);
}
