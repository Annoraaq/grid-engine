import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import * as Phaser from "phaser";
import { NumberOfDirections } from "../../Direction/Direction";
import { Movement } from "../Movement";
declare type Vector2 = Phaser.Math.Vector2;
declare const Vector2: typeof Phaser.Math.Vector2;
export declare class TargetMovement implements Movement {
    private tilemap;
    private targetPos;
    private distance;
    private closestPointIfBlocked;
    private character;
    private numberOfDirections;
    constructor(tilemap: GridTilemap, targetPos: Vector2, distance?: number, closestPointIfBlocked?: boolean);
    setNumberOfDirections(numberOfDirections: NumberOfDirections): void;
    setCharacter(character: GridCharacter): void;
    update(): void;
    getNeighbours: (pos: Vector2) => Vector2[];
    private isBlocking;
    private _getNeighbours;
    private noPathExists;
    private getShortestPath;
    private getDirOnShortestPath;
}
export {};
