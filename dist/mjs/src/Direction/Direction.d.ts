import { Position } from "../Position.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
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
export declare const dirToNumber: {
    up: number;
    "up-right": number;
    right: number;
    "down-right": number;
    down: number;
    "down-left": number;
    left: number;
    "up-left": number;
    none: number;
};
export declare const numberToDir: Direction[];
export declare function directions(): Direction[];
export declare function isDiagonal(direction: Direction): boolean;
export declare function isHorizontal(direction: Direction): boolean;
export declare function isVertical(direction: Direction): boolean;
export declare function turnCounterClockwise(direction: Direction, times?: number): Direction;
export declare function turnClockwise(direction: Direction, times?: number): Direction;
export declare function directionVector(direction: Direction): Vector2;
export declare function oppositeDirection(direction: Direction): Direction;
/**
 * Helper function that returns the direction from a source to a target
 * position.
 *
 * For example:
 * `directionFromPos({x:1, y:1}, {{x:2, y:1}}) = Direction.RIGHT`
 *
 * @category Helpers
 */
export declare function directionFromPos(src: Position, dest: Position): Direction;
export declare enum NumberOfDirections {
    FOUR = 4,
    EIGHT = 8
}
export declare function isDirection(val: any): val is Direction;
