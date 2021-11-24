import { Direction } from "../../Direction/Direction";
import { Vector2 } from "../Vector2/Vector2";
import { DistanceUtils } from "../DistanceUtils";
export declare class DistanceUtils8 implements DistanceUtils {
    distance(pos1: Vector2, pos2: Vector2): number;
    neighbours(pos: Vector2): Vector2[];
    direction(from: Vector2, to: Vector2): Direction;
    getDirections(): Direction[];
}
