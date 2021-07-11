import { Position } from "../../GridEngine";
export declare class Vector2 {
    static readonly ZERO: Vector2;
    static readonly UP: Vector2;
    static readonly DOWN: Vector2;
    static readonly LEFT: Vector2;
    static readonly RIGHT: Vector2;
    x: number;
    y: number;
    constructor(pos: Position);
    constructor(x: number, y: number);
    clone(): Vector2;
    add(vector: Vector2): Vector2;
    multiply(vector: Vector2): Vector2;
    divide(vector: Vector2): Vector2;
    subtract(vector: Vector2): Vector2;
    equals(vector: Vector2): boolean;
    abs(): Vector2;
    length(): number;
}
