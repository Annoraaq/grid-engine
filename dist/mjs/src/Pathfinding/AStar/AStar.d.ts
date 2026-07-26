import { ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
export declare class AStar extends ShortestPathAlgorithm {
    private spatialWidth;
    private planeSize;
    constructor(gridTilemap: GridTilemap, options?: PathfindingOptions);
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    /**
     * Encodes a 3D position (x, y, charLayer) into a unique integer ID.
     * Uses plane-filling arithmetic to avoid string creation during A* search:
     *   ID = layerIndex * planeSize + shiftedY * spatialWidth + shiftedX
     */
    private getNodeId;
    private shortestPathBfs;
    private returnPath;
}
