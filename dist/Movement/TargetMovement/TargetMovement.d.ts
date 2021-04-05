import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import * as Phaser from "phaser";
import { Movement } from "../Movement";
declare type Vector2 = Phaser.Math.Vector2;
declare const Vector2: typeof Phaser.Math.Vector2;
export declare class TargetMovement implements Movement {
    private tilemap;
    private targetPos;
    private distance;
    private closestPointIfBlocked;
    private character;
    constructor(tilemap: GridTilemap, targetPos: Vector2, distance?: number, closestPointIfBlocked?: boolean);
    setCharacter(character: GridCharacter): void;
    update(): void;
    isBlocking: (targetPos: Vector2) => (pos: Vector2) => boolean;
    private noPathExists;
    private getShortestPath;
    private getDirOnShortestPath;
}
export {};
