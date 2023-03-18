import { GetNeighbors, LayerVecPos, ShortestPathAlgorithm, ShortestPathResult } from "./../ShortestPathAlgorithm";
export declare class Bfs implements ShortestPathAlgorithm {
    private maxPathLength;
    setMaxPathLength(maxPathLength: number): void;
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors): ShortestPathResult;
    private distance;
    private pos2Str;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
