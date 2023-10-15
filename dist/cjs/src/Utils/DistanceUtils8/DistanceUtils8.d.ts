import { Direction } from "../../Direction/Direction.js";
import { Vector2 } from "../Vector2/Vector2.js";
import { DistanceUtils } from "../DistanceUtils.js";
export declare class DistanceUtils8 implements DistanceUtils {
    distance(pos1: Vector2, pos2: Vector2): number;
    neighbors(pos: Vector2): Vector2[];
    direction(from: Vector2, to: Vector2): Direction;
    getDirections(): Direction[];
}
