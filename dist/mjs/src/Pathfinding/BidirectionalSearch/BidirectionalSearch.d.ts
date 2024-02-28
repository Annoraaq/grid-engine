import { LayerVecPos } from "./../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm.js";
export declare class BidirectionalSearch extends ShortestPathAlgorithm {
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private equal;
    private shortestPathBfs;
    private shouldStop;
    /**
     * Returns closestToTarget if it is enabled in the options and undefined
     * otherwise.
     */
    private maybeClosestToTarget;
    private returnPath;
    private getPathFromPrev;
}
