import { CharLayer, LayerPosition } from "../../Position.js";
import { Vector2 } from "../Vector2/Vector2.js";
export interface LayerVecPos {
    position: Vector2;
    layer: CharLayer;
}
export declare class LayerPositionUtils {
    static equal(position: LayerVecPos, otherPosition: LayerVecPos): boolean;
    static copyOver(source: LayerVecPos, target: LayerVecPos): void;
    static clone(layerPosition: LayerVecPos): LayerVecPos;
    static toString(layerPosition: LayerVecPos): string;
    static toInternal(layerPosition: LayerPosition): LayerVecPos;
    static fromInternal(layerPosition: LayerVecPos): LayerPosition;
}
