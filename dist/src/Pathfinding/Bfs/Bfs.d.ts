import { LayerVecPos, ShortestPathAlgorithm, ShortestPathResult } from "./../ShortestPathAlgorithm";
export declare class Bfs extends ShortestPathAlgorithm {
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
