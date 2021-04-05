import { Direction } from "../Direction/Direction";
import * as Phaser from "phaser";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { Subject } from "rxjs";
import { WalkingAnimationMapping } from "../GridEngine";
import { Movement } from "../Movement/Movement";
declare const Vector2: typeof Phaser.Math.Vector2;
declare type Vector2 = Phaser.Math.Vector2;
export interface FrameRow {
    leftFoot: number;
    standing: number;
    rightFoot: number;
}
export declare type CharacterIndex = number;
export interface PositionChange {
    exitTile: Vector2;
    enterTile: Vector2;
}
export interface CharConfig {
    sprite: Phaser.GameObjects.Sprite;
    tilemap: GridTilemap;
    tileSize: Vector2;
    speed: number;
    walkingAnimationEnabled: boolean;
    isometric: boolean;
    walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
    container?: Phaser.GameObjects.Container;
    offsetX?: number;
    offsetY?: number;
}
export declare class GridCharacter {
    private id;
    private movementDirection;
    private speedPixelsPerSecond;
    private tileSizePixelsWalked;
    private _nextTilePos;
    private _tilePos;
    private sprite;
    private container?;
    private tilemap;
    private tileDistance;
    private tileSize;
    private speed;
    private customOffset;
    private movementStarted$;
    private movementStopped$;
    private directionChanged$;
    private positionChanged$;
    private positionChangeFinished$;
    private lastMovementImpulse;
    private facingDirection;
    private isIsometric;
    private animation;
    private movement;
    constructor(id: string, config: CharConfig);
    getId(): string;
    getSpeed(): number;
    setSpeed(speed: number): void;
    setMovement(movement: Movement): void;
    getMovement(): Movement;
    setWalkingAnimationMapping(walkingAnimationMapping: WalkingAnimationMapping): void;
    setTilePosition(tilePosition: Vector2): void;
    getTilePos(): Vector2;
    move(direction: Direction): void;
    update(delta: number): void;
    getMovementDirection(): Direction;
    isBlockingTile(tilePos: Vector2): boolean;
    isBlockingDirection(direction: Direction): boolean;
    isMoving(): boolean;
    turnTowards(direction: Direction): void;
    getFacingDirection(): Direction;
    movementStarted(): Subject<Direction>;
    movementStopped(): Subject<Direction>;
    directionChanged(): Subject<Direction>;
    positionChanged(): Subject<PositionChange>;
    positionChangeFinished(): Subject<PositionChange>;
    private getOffset;
    private get nextTilePos();
    private set nextTilePos(value);
    private get tilePos();
    private set tilePos(value);
    private updateZindex;
    private setPosition;
    private getPosition;
    private startMoving;
    private updateTilePos;
    private tilePosInDirection;
    private updateCharacterPosition;
    private shouldContinueMoving;
    private getSpeedPerDelta;
    private willCrossTileBorderThisUpdate;
    private moveCharacterSpriteRestOfTile;
    private getDirectionVecs;
    private moveCharacterSprite;
    private stopMoving;
    private hasWalkedHalfATile;
}
export {};
