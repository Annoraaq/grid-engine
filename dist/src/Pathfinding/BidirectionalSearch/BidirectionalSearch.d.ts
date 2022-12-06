import { GetNeighbors, LayerVecPos, ShortestPathAlgorithm } from "../ShortestPathAlgorithm";
export declare class BidirectionalSearch implements ShortestPathAlgorithm {
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors, getReverseNeighbors: GetNeighbors): {
        path: LayerVecPos[];
        closestToTarget: LayerVecPos;
        steps: number;
    };
    private distance;
    private equal;
    private shortestPathBfs;
    private returnPath;
    private getPathFromPrev;
}
