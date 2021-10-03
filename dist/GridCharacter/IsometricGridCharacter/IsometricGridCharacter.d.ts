import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { Direction } from "../../Direction/Direction";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { GridCharacter } from "../GridCharacter";
export declare class IsometricGridCharacter extends GridCharacter {
    protected tilePosToPixelPos(tilePosition: Vector2): Vector2;
    protected getTileDistance(direction: Direction): Vector2;
    protected toMapDirection(direction: Direction): Direction;
    protected mapDepth(nextTilePos: LayerPosition): number;
}
