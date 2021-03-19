import * as Phaser from "phaser";
declare type Vector2 = Phaser.Math.Vector2;
export declare class VectorUtils {
    static vec2str(vec: Vector2): string;
    static equal(vec1: Vector2, vec2: Vector2): boolean;
    static manhattanDistance(pos1: Vector2, pos2: Vector2): number;
}
export {};
