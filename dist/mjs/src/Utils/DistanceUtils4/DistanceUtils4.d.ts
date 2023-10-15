import { Direction } from "../../Direction/Direction.js";
import { Vector2 } from "../Vector2/Vector2.js";
import { DistanceUtils } from "../DistanceUtils.js";
export declare class DistanceUtils4 implements DistanceUtils {
    distance(pos1: Vector2, pos2: Vector2): number;
    direction(from: Vector2, to: Vector2): Direction;
    neighbors(pos: Vector2): Vector2[];
    getDirections(): Direction[];
}
