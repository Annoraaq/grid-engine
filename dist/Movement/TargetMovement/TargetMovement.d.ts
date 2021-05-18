import { NoPathFoundStrategy } from "./../../Algorithms/ShortestPath/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./../../Algorithms/ShortestPath/PathBlockedStrategy";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { NumberOfDirections } from "../../Direction/Direction";
import { Movement } from "../Movement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
export interface MoveToConfig {
    noPathFoundStrategy?: NoPathFoundStrategy;
    pathBlockedStrategy?: PathBlockedStrategy;
}
export declare class TargetMovement implements Movement {
    private tilemap;
    private targetPos;
    private distance;
    private character;
    private numberOfDirections;
    private shortestPath;
    private distOffset;
    private posOnPath;
    private noPathFoundStrategy;
    private pathBlockedStrategy;
    private stopped;
    constructor(tilemap: GridTilemap, targetPos: Vector2, distance?: number, config?: MoveToConfig);
    setPathBlockedStrategy(pathBlockedStrategy: PathBlockedStrategy): void;
    getPathBlockedStrategy(): PathBlockedStrategy;
    setNumberOfDirections(numberOfDirections: NumberOfDirections): void;
    setCharacter(character: GridCharacter): void;
    update(): void;
    getNeighbours: (pos: Vector2) => Vector2[];
    private isBlocking;
    private _getNeighbours;
    private getShortestPath;
    private getDir;
    private getDir8Directions;
    private getDir4Directions;
}
