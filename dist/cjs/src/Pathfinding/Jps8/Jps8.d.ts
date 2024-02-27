import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { Jps4 } from "../Jps4/Jps4.js";
import { PathfindingOptions } from "../PathfindingOptions.js";
export declare class Jps8 extends Jps4 {
    constructor(gridTilemap: GridTilemap, po?: PathfindingOptions);
    protected getForced(parent: LayerVecPos, node: LayerVecPos): Set<LayerVecPos>;
    protected hasForced(parent: LayerVecPos, node: LayerVecPos): boolean;
    protected prune(parent: LayerVecPos, node: LayerVecPos): LayerVecPos[];
    protected jump(parent: LayerVecPos, node: LayerVecPos, stopNode: LayerVecPos, dist: number): {
        p: LayerVecPos;
        dist: number;
    } | undefined;
}
