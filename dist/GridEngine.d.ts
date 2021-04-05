import { CharacterIndex, FrameRow, PositionChange } from "./GridCharacter/GridCharacter";
import "phaser";
import { Direction } from "./Direction/Direction";
import { Observable } from "rxjs";
declare const Vector2: typeof Phaser.Math.Vector2;
declare type Vector2 = Phaser.Math.Vector2;
export declare type TileSizePerSecond = number;
export interface GridEngineConfig {
    characters: CharacterData[];
    firstLayerAboveChar?: number;
    collisionTilePropertyName?: string;
}
export interface WalkingAnimationMapping {
    [Direction.UP]: FrameRow;
    [Direction.RIGHT]: FrameRow;
    [Direction.DOWN]: FrameRow;
    [Direction.LEFT]: FrameRow;
}
export interface CharacterData {
    id: string;
    sprite: Phaser.GameObjects.Sprite;
    walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
    walkingAnimationEnabled?: boolean;
    characterIndex?: number;
    speed?: TileSizePerSecond;
    startPosition?: Vector2;
    container?: Phaser.GameObjects.Container;
    offsetX?: number;
    offsetY?: number;
    facingDirection?: Direction;
}
export declare class GridEngine extends Phaser.Plugins.ScenePlugin {
    scene: Phaser.Scene;
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
    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);
    boot(): void;
    create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void;
    getPosition(charId: string): Vector2;
    moveLeft(charId: string): void;
    moveRight(charId: string): void;
    moveUp(charId: string): void;
    moveDown(charId: string): void;
    move(charId: string, direction: Direction): void;
    moveRandomly(charId: string, delay?: number, radius?: number): void;
    moveTo(charId: string, targetPos: Vector2, closestPointIfBlocked?: boolean): void;
    stopMovingRandomly(charId: string): void;
    stopMovement(charId: string): void;
    private _stopMovement;
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
    private addCharacters;
    private moveChar;
}
export {};
