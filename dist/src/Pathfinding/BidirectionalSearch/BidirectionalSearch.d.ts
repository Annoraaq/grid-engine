import { LayerVecPos, ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm";
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
