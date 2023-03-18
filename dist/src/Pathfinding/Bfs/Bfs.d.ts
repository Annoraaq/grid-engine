import { DistanceFn, GetNeighbors, LayerVecPos, ShortestPathAlgorithm, ShortestPathResult } from "./../ShortestPathAlgorithm";
export declare class Bfs implements ShortestPathAlgorithm {
    private maxPathLength;
    setMaxPathLength(maxPathLength: number): void;
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors, distance: DistanceFn): ShortestPathResult;
    private pos2Str;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
