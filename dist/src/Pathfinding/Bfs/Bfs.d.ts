import { GetNeighbors, LayerPosition, ShortestPathAlgorithm } from "./../ShortestPathAlgorithm";
export declare class Bfs implements ShortestPathAlgorithm {
    getShortestPath(startPos: LayerPosition, targetPos: LayerPosition, getNeighbors: GetNeighbors): {
        path: LayerPosition[];
        closestToTarget: LayerPosition;
    };
    private distance;
    private pos2Str;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
