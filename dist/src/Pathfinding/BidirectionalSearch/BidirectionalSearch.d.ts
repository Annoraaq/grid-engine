import { DistanceFn, GetNeighbors, LayerVecPos, ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm";
export declare class BidirectionalSearch implements ShortestPathAlgorithm {
    private maxPathLength;
    setMaxPathLength(maxPathLength: number): void;
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors, distance: DistanceFn, getReverseNeighbors: GetNeighbors): ShortestPathResult;
    private equal;
    private shortestPathBfs;
    private returnPath;
    private getPathFromPrev;
}
