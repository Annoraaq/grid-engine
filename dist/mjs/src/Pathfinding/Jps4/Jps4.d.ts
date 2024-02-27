import { ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm.js";
import { Direction } from "../../Direction/Direction.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { DistanceUtils } from "../../Utils/DistanceUtils.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
export declare class Jps4 extends ShortestPathAlgorithm {
    private openSet;
    private g;
    private f;
    private closestToTarget;
    private smallestDistToTarget;
    private steps;
    private maxFrontierSize;
    protected maxJumpSize: number;
    private turnOrder;
    private turnTimes;
    protected distanceUtils: DistanceUtils;
    constructor(gridTilemap: GridTilemap, po?: PathfindingOptions);
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private shortestPath;
    protected updateClosestToTarget(node: LayerVecPos, stopNode: LayerVecPos): void;
    protected addIfNotBlocked(set: Set<LayerVecPos>, src: LayerVecPos, target: LayerVecPos): void;
    protected blockOrTrans(src: LayerVecPos, dest: LayerVecPos): boolean;
    private getNeighborsInternal;
    protected jump(parent: LayerVecPos, node: LayerVecPos, stopNode: LayerVecPos, dist: number): {
        p: LayerVecPos;
        dist: number;
    } | undefined;
    protected getForced(parent: LayerVecPos, node: LayerVecPos): Set<LayerVecPos>;
    protected hasForced(parent: LayerVecPos, node: LayerVecPos): boolean;
    protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[];
    protected normalizedPositions(parent: LayerVecPos, node: LayerVecPos): {
        topLeft: LayerVecPos;
        downLeft: LayerVecPos;
        downRight: LayerVecPos;
        topRight: LayerVecPos;
        top: LayerVecPos;
        bottom: LayerVecPos;
        right: LayerVecPos;
    };
    protected posInDir(pos: LayerVecPos, dir: Direction): LayerVecPos;
    private returnPath;
    private fillPath;
}
