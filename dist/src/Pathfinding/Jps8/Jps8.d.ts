import { PathfindingOptions } from "../../GridEngineHeadless";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { Jps4 } from "../Jps4/Jps4";
import { LayerVecPos } from "../ShortestPathAlgorithm";
export declare class Jps8 extends Jps4 {
    constructor(gridTilemap: GridTilemap, po?: PathfindingOptions);
    protected getForced(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[];
    protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[];
    protected jump(parent: LayerVecPos, node: LayerVecPos, stopNode: LayerVecPos, dist: number): {
        p: LayerVecPos;
        dist: number;
    } | undefined;
}
