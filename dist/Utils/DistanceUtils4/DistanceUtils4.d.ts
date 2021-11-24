import { Direction } from "../../Direction/Direction";
import { Vector2 } from "../Vector2/Vector2";
import { DistanceUtils } from "../DistanceUtils";
export declare class DistanceUtils4 implements DistanceUtils {
    distance(pos1: Vector2, pos2: Vector2): number;
    direction(from: Vector2, to: Vector2): Direction;
    neighbours(pos: Vector2): Vector2[];
    getDirections(): Direction[];
}
