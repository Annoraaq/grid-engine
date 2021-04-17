import { Direction } from "../../Direction/Direction";
import { GridCharacter } from "../GridCharacter";
declare const Vector2: typeof Phaser.Math.Vector2;
declare type Vector2 = Phaser.Math.Vector2;
export declare class IsometricGridCharacter extends GridCharacter {
    protected tilePosToPixelPos(tilePosition: Vector2): Vector2;
    protected getTileDistance(direction: Direction): Vector2;
    protected toMapDirection(direction: Direction): Direction;
}
export {};
