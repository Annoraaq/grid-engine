import { ShortestPathAlgorithm, ShortestPathResult } from "./../ShortestPathAlgorithm.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
export interface FleePathResult {
    path: LayerVecPos[];
    farthestFromTarget: LayerVecPos;
    pathToFarthest: LayerVecPos[];
    steps: number;
    maxPathLengthReached: boolean;
}
export declare class Bfs extends ShortestPathAlgorithm {
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    findFleePath(startPos: LayerVecPos, avoidPos: LayerVecPos, minDistance: number): FleePathResult;
    private findFleePathImpl;
    private equal;
    private shortestPathBfs;
    private returnPath;
}
