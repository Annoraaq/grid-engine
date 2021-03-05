import * as Phaser from "phaser";
declare const Vector2: typeof Phaser.Math.Vector2;
declare type Vector2 = Phaser.Math.Vector2;
export declare enum Direction {
    NONE = "none",
    LEFT = "left",
    UP = "up",
    RIGHT = "right",
    DOWN = "down"
}
export declare const DirectionVectors: {
    [key in Direction]?: Vector2;
};
export declare function oppositeDirection(direction: Direction): Direction;
export {};
