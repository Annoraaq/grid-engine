import { ShortestPathAlgorithm, ShortestPathResult } from "./../ShortestPathAlgorithm.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
export declare class Bfs extends ShortestPathAlgorithm {
    private spatialWidth;
    private planeSize;
    constructor(gridTilemap: GridTilemap, options?: PathfindingOptions);
    private getLayerIndex;
    private getNodeId;
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
