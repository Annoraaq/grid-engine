import { Direction } from "../../GridEngineHeadless.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { Jps4 } from "../Jps4/Jps4.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
import { ShortestPathResult } from "../ShortestPathAlgorithm.js";
export declare class Jps8 extends Jps4 {
    private jumpCache;
    constructor(gridTilemap: GridTilemap, po?: PathfindingOptions);
    findShortestPathImpl(startPos: LayerVecPos, targetPos: LayerVecPos): ShortestPathResult;
    protected getNeighborsInternal(node: LayerVecPos, parent: LayerVecPos | undefined, stopNode: LayerVecPos): {
        p: LayerVecPos;
        dist: number;
    }[];
    protected getForced(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[];
    protected hasForced(parent: LayerVecPos, node: LayerVecPos): boolean;
    protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[];
    protected jump(parent: LayerVecPos, node: LayerVecPos, stopNode: LayerVecPos, dist: number, dir: Direction): {
        p: LayerVecPos;
        dist: number;
    } | undefined;
    protected normalizedPositions(parent: LayerVecPos, node: LayerVecPos): {
        topLeft: LayerVecPos;
        downLeft: LayerVecPos;
        top: LayerVecPos;
        bottom: LayerVecPos;
        right: LayerVecPos;
        downRight: LayerVecPos;
        topRight: LayerVecPos;
    };
}
