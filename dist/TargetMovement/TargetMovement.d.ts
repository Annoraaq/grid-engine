import { GridTilemap } from "./../GridTilemap/GridTilemap";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import * as Phaser from "phaser";
declare type Vector2 = Phaser.Math.Vector2;
declare const Vector2: typeof Phaser.Math.Vector2;
export declare class TargetMovement {
    private tilemap;
    private characters;
    constructor(tilemap: GridTilemap);
    addCharacter(character: GridCharacter, targetPos: Vector2, distance?: number, closestPointIfBlocked?: boolean): void;
    removeCharacter(charId: string): void;
    update(): void;
    isBlocking: (targetPos: Vector2) => (pos: Vector2) => boolean;
    clear(): void;
    private noPathExists;
    private getShortestPath;
    private getDirOnShortestPath;
}
export {};
