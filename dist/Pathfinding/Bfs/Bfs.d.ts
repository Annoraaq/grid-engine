import { LayerPosition, ShortestPathAlgorithm } from "./../ShortestPathAlgorithm";
export declare class Bfs implements ShortestPathAlgorithm {
    getShortestPath(startPos: LayerPosition, targetPos: LayerPosition, getNeighbours: (pos: LayerPosition) => LayerPosition[]): {
        path: LayerPosition[];
        closestToTarget: LayerPosition;
    };
    private distance;
    private pos2Str;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
