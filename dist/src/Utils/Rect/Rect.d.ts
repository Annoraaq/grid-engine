import { Vector2 } from "../Vector2/Vector2";
export declare class Rect {
    private x;
    private y;
    private width;
    private height;
    constructor(x: number, y: number, width: number, height: number);
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    isInRange(pos: Vector2): boolean;
}
