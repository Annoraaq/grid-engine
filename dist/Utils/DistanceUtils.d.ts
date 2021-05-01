import { NumberOfDirections } from "./../Direction/Direction";
import * as Phaser from "phaser";
declare type Vector2 = Phaser.Math.Vector2;
declare const Vector2: typeof Phaser.Math.Vector2;
export declare class DistanceUtils {
    static distance(pos1: Vector2, pos2: Vector2, numberOfDirections: NumberOfDirections): number;
}
export {};
