import { GetNeighbors, LayerVecPos, ShortestPathAlgorithm } from "./../ShortestPathAlgorithm";
export declare class Bfs implements ShortestPathAlgorithm {
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors): {
        path: LayerVecPos[];
        closestToTarget: LayerVecPos;
    };
    private distance;
    private pos2Str;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
