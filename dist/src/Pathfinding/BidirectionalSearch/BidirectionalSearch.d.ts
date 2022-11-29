import { GetNeighbors, LayerVecPos, ShortestPathAlgorithm } from "../ShortestPathAlgorithm";
export declare class BidirectionalSearch implements ShortestPathAlgorithm {
    getShortestPath(startPos: LayerVecPos, targetPos: LayerVecPos, getNeighbors: GetNeighbors): {
        path: LayerVecPos[];
        closestToTarget: LayerVecPos;
    };
    /**
     * @returns A memoized version of getNeighbors to improve speed.
     * The main reason for this is that Bidirectional Search needs to check
     * reverse neighborhood for the BFS that comes from the target node. This
     * involves 4 further getNeighbors calls.
     */
    private createCachedGetNeighbors;
    private distance;
    private equal;
    private createReverseNeighbors;
    private shortestPathBfs;
    private returnPath;
    private getPathFromPrev;
}
