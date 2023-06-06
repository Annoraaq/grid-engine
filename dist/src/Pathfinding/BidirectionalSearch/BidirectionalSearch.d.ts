import { LayerVecPos, ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm";
export declare class BidirectionalSearch extends ShortestPathAlgorithm {
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private equal;
    private shortestPathBfs;
    private returnPath;
    private getPathFromPrev;
}
