import { CharacterIndex, FrameRow, PositionChange } from "./GridCharacter/GridCharacter";
import "phaser";
import { Direction } from "./Direction/Direction";
import { Observable } from "rxjs";
export declare type TileSizePerSecond = number;
export interface GridMovementConfig {
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
    startPosition?: Phaser.Math.Vector2;
    container?: Phaser.GameObjects.Container;
    offsetX?: number;
    offsetY?: number;
    facingDirection?: Direction;
}
export declare class GridMovementPlugin extends Phaser.Plugins.ScenePlugin {
    scene: Phaser.Scene;
    private gridCharacters;
    private tilemap;
    private gridTilemap;
    private randomMovement;
    private targetMovement;
    private followMovement;
    private isCreated;
    private movementStopped$;
    private movementStarted$;
    private directionChanged$;
    private positionChanged$;
    private charRemoved$;
    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);
    boot(): void;
    create(tilemap: Phaser.Tilemaps.Tilemap, config: GridMovementConfig): void;
    getPosition(charId: string): Phaser.Math.Vector2;
    moveLeft(charId: string): void;
    moveRight(charId: string): void;
    moveUp(charId: string): void;
    moveDown(charId: string): void;
    moveRandomly(charId: string, delay?: number, radius?: number): void;
    moveTo(charId: string, targetPos: Phaser.Math.Vector2, closestPointIfBlocked?: boolean): void;
    stopMovingRandomly(charId: string): void;
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
    private takeUntilCharRemoved;
    private initGuard;
    private unknownCharGuard;
    private createTilemap;
    private getTileSize;
    private addCharacters;
}
