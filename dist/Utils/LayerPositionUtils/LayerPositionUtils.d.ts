import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
export declare class LayerPositionUtils {
    static equal(position: LayerPosition, otherPosition: LayerPosition): boolean;
    static copyOver(source: LayerPosition, target: LayerPosition): void;
    static clone(layerPosition: LayerPosition): LayerPosition;
    static toString(layerPosition: LayerPosition): string;
}
