import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import { Finished, MoveToConfig } from "./Movement/TargetMovement/TargetMovement";
import { CharacterIndex, FrameRow, PositionChange } from "./GridCharacter/GridCharacter";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { Observable } from "rxjs";
export { Direction };
export declare type TileSizePerSecond = number;
export interface Position {
    x: number;
    y: number;
}
export interface GridEngineConfig {
    characters: CharacterData[];
    collisionTilePropertyName?: string;
    numberOfDirections?: NumberOfDirections;
    characterCollisionStrategy?: CollisionStrategy;
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
    speed?: TileSizePerSecond;
    startPosition?: Position;
    container?: Phaser.GameObjects.Container;
    offsetX?: number;
    offsetY?: number;
    facingDirection?: Direction;
    collides?: boolean;
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
    private positionChangeStarted$;
    private positionChangeFinished$;
    private charRemoved$;
    constructor(scene: Phaser.Scene);
    boot(): void;
    destroy(): void;
    create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void;
    getPosition(charId: string): Position;
    move(charId: string, direction: Direction): void;
    moveRandomly(charId: string, delay?: number, radius?: number): void;
    moveTo(charId: string, targetPos: Position, config?: MoveToConfig): Observable<{
        charId: string;
    } & Finished>;
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
    isMoving(charId: string): boolean;
    getFacingDirection(charId: string): Direction;
    getFacingPosition(charId: string): Position;
    turnTowards(charId: string, direction: Direction): void;
    setPosition(charId: string, pos: Position): void;
    getSprite(charId: string): Phaser.GameObjects.Sprite;
    setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void;
    movementStarted(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    movementStopped(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    directionChanged(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    positionChangeStarted(): Observable<{
        charId: string;
    } & PositionChange>;
    positionChangeFinished(): Observable<{
        charId: string;
    } & PositionChange>;
    private setConfigDefaults;
    private takeUntilCharRemoved;
    private initGuard;
    private unknownCharGuard;
    private createCharacter;
    private addCharacters;
    private moveChar;
    private _isIsometric;
    private assembleMoveToConfig;
}
