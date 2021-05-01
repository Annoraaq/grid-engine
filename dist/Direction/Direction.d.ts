import * as Phaser from "phaser";
declare const Vector2: typeof Phaser.Math.Vector2;
declare type Vector2 = Phaser.Math.Vector2;
export declare enum Direction {
    NONE = "none",
    LEFT = "left",
    UP_LEFT = "up-left",
    UP = "up",
    UP_RIGHT = "up-right",
    RIGHT = "right",
    DOWN_RIGHT = "down-right",
    DOWN = "down",
    DOWN_LEFT = "down-left"
}
export declare function getDirections(numberOfDirections: NumberOfDirections): Direction[];
export declare function isDiagonal(direction: Direction): boolean;
export declare function turnCounterClockwise(direction: Direction): Direction;
export declare function directionVector(direction: Direction): Vector2;
export declare function oppositeDirection(direction: Direction): Direction;
export declare enum NumberOfDirections {
    FOUR = 4,
    EIGHT = 8
}
export {};
