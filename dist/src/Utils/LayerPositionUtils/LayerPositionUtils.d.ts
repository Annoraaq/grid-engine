import { LayerPosition } from "../../GridEngine";
import { LayerVecPos } from "./../../Pathfinding/ShortestPathAlgorithm";
export declare class LayerPositionUtils {
    static equal(position: LayerVecPos, otherPosition: LayerVecPos): boolean;
    static copyOver(source: LayerVecPos, target: LayerVecPos): void;
    static clone(layerPosition: LayerVecPos): LayerVecPos;
    static toString(layerPosition: LayerVecPos): string;
    static toInternal(layerPosition: LayerPosition): LayerVecPos;
    static fromInternal(layerPosition: LayerVecPos): LayerPosition;
}
