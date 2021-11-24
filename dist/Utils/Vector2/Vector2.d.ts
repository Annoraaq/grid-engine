import { Position } from "../../GridEngine";
export declare class Vector2 {
    static get ZERO(): Vector2;
    static get ONE(): Vector2;
    static get UP(): Vector2;
    static get DOWN(): Vector2;
    static get LEFT(): Vector2;
    static get RIGHT(): Vector2;
    static get UP_LEFT(): Vector2;
    static get UP_RIGHT(): Vector2;
    static get DOWN_RIGHT(): Vector2;
    static get DOWN_LEFT(): Vector2;
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
    modulo(vector: Vector2): Vector2;
    scalarModulo(scalar: number): Vector2;
    scalarMult(scalar: number): Vector2;
    toString(): string;
}
