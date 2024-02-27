import { ShortestPathAlgorithm, ShortestPathResult } from "./../ShortestPathAlgorithm.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
export declare class Bfs extends ShortestPathAlgorithm {
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
