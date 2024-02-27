import { GridTilemap } from "../GridTilemap/GridTilemap.js";
import { LayerVecPos } from "../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { PathfindingOptions } from "./PathfindingOptions.js";
import { ShortestPathResult } from "./ShortestPathAlgorithm.js";
export declare class Pathfinding {
    private gridTilemap;
    constructor(gridTilemap: GridTilemap);
    findShortestPath(source: LayerVecPos, dest: LayerVecPos, pathfindingOptions?: PathfindingOptions): ShortestPathResult;
}
