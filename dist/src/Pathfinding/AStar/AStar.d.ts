import { LayerVecPos, ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm";
export declare class AStar extends ShortestPathAlgorithm {
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private shortestPathBfs;
    private returnPath;
}
