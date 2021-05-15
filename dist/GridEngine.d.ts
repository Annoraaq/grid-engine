import { MoveToConfig } from "./Movement/TargetMovement/TargetMovement";
import { CharacterIndex, FrameRow, PositionChange } from "./GridCharacter/GridCharacter";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { Observable } from "rxjs";
import { Vector2 } from "./Utils/Vector2/Vector2";
export declare type TileSizePerSecond = number;
export interface Position {
    x: number;
    y: number;
}
export interface GridEngineConfig {
    characters: CharacterData[];
    firstLayerAboveChar?: number;
    collisionTilePropertyName?: string;
    numberOfDirections?: NumberOfDirections;
}
export interface WalkingAnimationMapping {
    [Direction.UP]: FrameRow;
    [Direction.RIGHT]: FrameRow;
    [Direction.DOWN]: FrameRow;
    [Direction.LEFT]: FrameRow;
    [Direction.UP_LEFT]?: FrameRow;
    [Direction.UP_RIGHT]?: FrameRow;
    [Direction.DOWN_LEFT]?: FrameRow;
    [Direction.DOWN_RIGHT]?: FrameRow;
}
export interface CharacterData {
    id: string;
    sprite: Phaser.GameObjects.Sprite;
    walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
    walkingAnimationEnabled?: boolean;
    characterIndex?: number;
    speed?: TileSizePerSecond;
    startPosition?: Position;
    container?: Phaser.GameObjects.Container;
    offsetX?: number;
    offsetY?: number;
    facingDirection?: Direction;
}
export declare class GridEngine {
    private scene;
    private gridCharacters;
    private tilemap;
    private gridTilemap;
    private isCreated;
    private movementStopped$;
    private movementStarted$;
    private directionChanged$;
    private positionChanged$;
    private positionChangeFinished$;
    private charRemoved$;
    private numberOfDirections;
    constructor(scene: Phaser.Scene);
    boot(): void;
    destroy(): void;
    create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void;
    getPosition(charId: string): Position;
    moveLeft(charId: string): void;
    moveRight(charId: string): void;
    moveUp(charId: string): void;
    moveDown(charId: string): void;
    move(charId: string, direction: Direction): void;
    moveRandomly(charId: string, delay?: number, radius?: number): void;
    moveTo(charId: string, targetPos: Position, closestPointIfBlocked?: boolean): void;
    moveTo(charId: string, targetPos: Position, config?: MoveToConfig): void;
    stopMovingRandomly(charId: string): void;
    stopMovement(charId: string): void;
    setSpeed(charId: string, speed: number): void;
    setWalkingAnimationMapping(charId: string, walkingAnimationMapping: WalkingAnimationMapping): void;
    update(_time: number, delta: number): void;
    addCharacter(charData: CharacterData): void;
    hasCharacter(charId: string): boolean;
    removeCharacter(charId: string): void;
    removeAllCharacters(): void;
    getAllCharacters(): string[];
    follow(charId: string, charIdToFollow: string, distance?: number, closestPointIfBlocked?: boolean): void;
    stopFollowing(charId: string): void;
    isMoving(charId: string): boolean;
    getFacingDirection(charId: string): Direction;
    turnTowards(charId: string, direction: Direction): void;
    setPosition(charId: string, pos: Vector2): void;
    movementStarted(): Observable<[string, Direction]>;
    movementStopped(): Observable<[string, Direction]>;
    directionChanged(): Observable<[string, Direction]>;
    positionChanged(): Observable<{
        charId: string;
    } & PositionChange>;
    positionChangeFinished(): Observable<{
        charId: string;
    } & PositionChange>;
    private takeUntilCharRemoved;
    private initGuard;
    private unknownCharGuard;
    private createTilemap;
    private createCharacter;
    private addCharacters;
    private moveChar;
    private _stopMovement;
    private _isIsometric;
    private assembleMoveToConfig;
}
