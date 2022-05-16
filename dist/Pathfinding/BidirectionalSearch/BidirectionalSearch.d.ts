import { LayerPosition, ShortestPathAlgorithm } from "../ShortestPathAlgorithm";
export declare class BidirectionalSearch implements ShortestPathAlgorithm {
    getShortestPath(startPos: LayerPosition, targetPos: LayerPosition, getNeighbours: (pos: LayerPosition) => LayerPosition[]): {
        path: LayerPosition[];
        closestToTarget: LayerPosition;
    };
    private distance;
    private equal;
    private shortestPathBfs;
    private returnPath;
    private getPathFromPrev;
}
