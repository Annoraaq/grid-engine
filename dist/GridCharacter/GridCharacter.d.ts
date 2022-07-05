import { LayerPosition } from "./../Pathfinding/ShortestPathAlgorithm";
import { CharacterAnimation } from "./CharacterAnimation/CharacterAnimation";
import { Direction } from "../Direction/Direction";
import { GridTilemap, LayerName } from "../GridTilemap/GridTilemap";
import { Subject } from "rxjs";
import { Position, WalkingAnimationMapping } from "../GridEngine";
import { Movement } from "../Movement/Movement";
import { Vector2 } from "../Utils/Vector2/Vector2";
import * as Phaser from "phaser";
export declare type GameObject = Phaser.GameObjects.Container | Phaser.GameObjects.Sprite;
/** Frame numbers for one movement direction */
export interface FrameRow {
    /** Frame number for animation frame with left foot in front */
    leftFoot: number;
    /** Frame number for animation frame standing (no foot in front) */
    standing: number;
    /** Frame number for animation frame with right foot in front */
    rightFoot: number;
}
export declare type CharacterIndex = number;
export interface PositionChange {
    exitTile: Position;
    enterTile: Position;
    exitLayer: LayerName;
    enterLayer: LayerName;
}
export interface CharConfig {
    tilemap: GridTilemap;
    speed: number;
    collidesWithTiles: boolean;
    walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
    offsetX?: number;
    offsetY?: number;
    charLayer?: string;
    collisionGroups?: string[];
    facingDirection?: Direction;
}
export declare class GridCharacter {
    private id;
    protected customOffset: Vector2;
    protected tilemap: GridTilemap;
    private movementDirection;
    private tileSizePixelsWalked;
    private _nextTilePos;
    private _tilePos;
    private speed;
    private movementStarted$;
    private movementStopped$;
    private directionChanged$;
    private positionChangeStarted$;
    private positionChangeFinished$;
    private tilePositionSet$;
    private autoMovementSet$;
    private lastMovementImpulse;
    private facingDirection;
    private animation?;
    private movement?;
    private walkingAnimationMapping?;
    private collidesWithTilesInternal;
    private collisionGroups;
    private pixelPositionChanged$;
    private depthChanged$;
    private pixelPosition;
    engineOffset: Vector2;
    constructor(id: string, config: CharConfig);
    getId(): string;
    getSpeed(): number;
    setSpeed(speed: number): void;
    setMovement(movement?: Movement): void;
    getMovement(): Movement | undefined;
    collidesWithTiles(): boolean;
    getAnimation(): CharacterAnimation | undefined;
    setTilePosition(tilePosition: LayerPosition): void;
    getOffsetX(): number;
    getOffsetY(): number;
    getTilePos(): LayerPosition;
    getNextTilePos(): LayerPosition;
    move(direction: Direction): void;
    getWalkingAnimationMapping(): WalkingAnimationMapping | number | undefined;
    setAnimation(animation: CharacterAnimation): void;
    update(delta: number): void;
    getMovementDirection(): Direction;
    isBlockingDirection(direction: Direction): boolean;
    isMoving(): boolean;
    turnTowards(direction: Direction): void;
    getFacingDirection(): Direction;
    getFacingPosition(): Vector2;
    addCollisionGroup(collisionGroup: string): void;
    setCollisionGroups(collisionGroups: string[]): void;
    getCollisionGroups(): string[];
    hasCollisionGroup(collisionGroup: string): boolean;
    removeCollisionGroup(collisionGroup: string): void;
    removeAllCollisionGroups(): void;
    movementStarted(): Subject<Direction>;
    movementStopped(): Subject<Direction>;
    directionChanged(): Subject<Direction>;
    tilePositionSet(): Subject<LayerPosition>;
    positionChangeStarted(): Subject<PositionChange>;
    positionChangeFinished(): Subject<PositionChange>;
    autoMovementSet(): Subject<Movement | undefined>;
    pixelPositionChanged(): Subject<Vector2>;
    depthChanged(): Subject<LayerPosition>;
    getPixelPos(): Vector2;
    private updateCharacterPosition;
    private speedPixelsPerSecond;
    private get nextTilePos();
    private set nextTilePos(value);
    private get tilePos();
    private set tilePos(value);
    private setPixelPosition;
    private getPixelPosition;
    private startMoving;
    private updateTilePos;
    private tilePosInDirection;
    private getDistToNextTile;
    private getProportionWalked;
    private shouldContinueMoving;
    private getSpeedPerDelta;
    private moveCharacterSprite;
    private stopMoving;
    hasWalkedHalfATile(): boolean;
    private fire;
}
