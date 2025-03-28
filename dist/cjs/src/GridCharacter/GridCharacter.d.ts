import { LayerVecPos } from "./../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { NumberOfDirections } from "./../Direction/Direction.js";
import { Direction } from "../Direction/Direction.js";
import { Subject } from "rxjs";
import { CharLayer, Position } from "../GridEngine.js";
import { Movement } from "../Movement/Movement.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import * as Phaser from "phaser";
import { GridTilemap } from "../GridTilemap/GridTilemap.js";
export declare const MAX_MOVEMENT_PROGRESS = 1000;
export type CharId = string;
export type GameObject = Phaser.GameObjects.Container | Phaser.GameObjects.Sprite;
export interface PositionChange {
    exitTile: Position;
    enterTile: Position;
    exitLayer: CharLayer;
    enterLayer: CharLayer;
}
export interface CharConfig {
    charLayer?: string;
    collidesWithTiles: boolean;
    collisionGroups?: string[];
    ignoreCollisionGroups?: string[];
    facingDirection?: Direction;
    ignoreMissingTiles?: boolean;
    labels?: string[];
    numberOfDirections: NumberOfDirections;
    speed: number;
    tileHeight?: number;
    tilemap: GridTilemap;
    tileWidth?: number;
}
export declare class GridCharacter {
    private id;
    protected tilemap: GridTilemap;
    private movementDirection;
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
    private movement?;
    private collidesWithTilesInternal;
    private collisionGroups;
    private ignoreCollisionGroups;
    private ignoreMissingTiles;
    private depthChanged$;
    private movementProgress;
    private labels;
    private numberOfDirections;
    private tileWidth;
    private tileHeight;
    private currentMovementReverted;
    constructor(id: string, config: CharConfig);
    getId(): string;
    getSpeed(): number;
    setSpeed(speed: number): void;
    setMovement(movement?: Movement): void;
    getMovement(): Movement | undefined;
    collidesWithTiles(): boolean;
    setCollidesWithTiles(collidesWithTiles: boolean): void;
    getIgnoreMissingTiles(): boolean;
    setIgnoreMissingTiles(ignoreMissingTiles: boolean): void;
    setTilePosition(tilePosition: LayerVecPos): void;
    getTilePos(): LayerVecPos;
    getNextTilePos(): LayerVecPos;
    getTileWidth(): number;
    getTileHeight(): number;
    move(direction: Direction): void;
    update(delta: number): void;
    getMovementDirection(): Direction;
    isBlockingDirection(direction: Direction): boolean;
    isTileBlocking(direction: Direction, layerInDirection: CharLayer): boolean;
    revertCurrentMovement(): void;
    isCurrentMovementReverted(): boolean;
    private isCharBlocking;
    isMoving(): boolean;
    turnTowards(direction: Direction): void;
    private changeFacingDirection;
    getFacingDirection(): Direction;
    getFacingPosition(): Vector2;
    addCollisionGroup(collisionGroup: string): void;
    setCollisionGroups(collisionGroups: string[]): void;
    setIgnoreCollisionGroups(ignoreCollisionGroups: string[]): void;
    getCollisionGroups(): string[];
    getIgnoreCollisionGroups(): string[];
    hasCollisionGroup(collisionGroup: string): boolean;
    removeCollisionGroup(collisionGroup: string): void;
    removeAllCollisionGroups(): void;
    addLabels(labels: string[]): void;
    getLabels(): string[];
    hasLabel(label: string): boolean;
    clearLabels(): void;
    removeLabels(labels: string[]): void;
    getNumberOfDirections(): NumberOfDirections;
    movementStarted(): Subject<Direction>;
    movementStopped(): Subject<Direction>;
    directionChanged(): Subject<Direction>;
    tilePositionSet(): Subject<LayerVecPos>;
    positionChangeStarted(): Subject<PositionChange>;
    positionChangeFinished(): Subject<PositionChange>;
    autoMovementSet(): Subject<Movement | undefined>;
    depthChanged(): Subject<LayerVecPos>;
    getMovementProgress(): number;
    setMovementProgress(progress: number): void;
    hasWalkedHalfATile(): boolean;
    willCrossTileBorderThisUpdate(delta: number): boolean;
    private updateCharacterPosition;
    private maxProgressForDelta;
    private get tilePos();
    private set tilePos(value);
    private startMoving;
    private tilePosInDirection;
    private shouldContinueMoving;
    private stopMoving;
    private fire;
    private someCharTile;
}
