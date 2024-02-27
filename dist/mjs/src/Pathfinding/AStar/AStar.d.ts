import { ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
export declare class AStar extends ShortestPathAlgorithm {
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private shortestPathBfs;
    private returnPath;
}
