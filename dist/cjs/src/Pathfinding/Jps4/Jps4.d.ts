import { ShortestPathAlgorithm, ShortestPathResult } from "../ShortestPathAlgorithm.js";
import { Direction } from "../../Direction/Direction.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
import { Position } from "../../Position.js";
export declare class Jps4 extends ShortestPathAlgorithm {
    private openSet;
    private g;
    private f;
    private closestToTarget;
    private smallestDistToTarget;
    protected steps: number;
    protected visits: Position[];
    private maxFrontierSize;
    protected maxJumpSize: number;
    constructor(gridTilemap: GridTilemap, po?: PathfindingOptions);
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    private shortestPath;
    protected updateClosestToTarget(node: LayerVecPos, stopNode: LayerVecPos): void;
    protected addIfNotBlocked(arr: LayerVecPos[], src: LayerVecPos, target: LayerVecPos): void;
    protected blockOrTrans(src: LayerVecPos, dest: LayerVecPos): boolean;
    protected getNeighborsInternal(node: LayerVecPos, parent: LayerVecPos | undefined, stopNode: LayerVecPos): {
        p: LayerVecPos;
        dist: number;
    }[];
    private isBlockingIgnoreTarget;
    protected jump(parent: LayerVecPos, node: LayerVecPos, stopNode: LayerVecPos, dist: number, dir: Direction): {
        p: LayerVecPos;
        dist: number;
    } | undefined;
    private isHorizontal;
    protected getForced(parent: LayerVecPos, node: LayerVecPos, downLeft: LayerVecPos, bottom: LayerVecPos, topLeft: LayerVecPos, top: LayerVecPos): LayerVecPos[];
    protected hasForced(parent: LayerVecPos, node: LayerVecPos): boolean;
    protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[];
    protected normalizedPositions(parent: LayerVecPos, node: LayerVecPos): {
        topLeft: LayerVecPos;
        downLeft: LayerVecPos;
        top: LayerVecPos;
        bottom: LayerVecPos;
        right: LayerVecPos;
    };
    protected posInDir(pos: LayerVecPos, dir: Direction): LayerVecPos;
    private returnPath;
    private fillPath;
}
