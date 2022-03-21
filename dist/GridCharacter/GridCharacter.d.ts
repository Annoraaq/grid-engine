import { LayerPosition } from "./../Pathfinding/ShortestPathAlgorithm";
import { Direction } from "../Direction/Direction";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { Subject } from "rxjs";
import { Position, WalkingAnimationMapping } from "../GridEngine";
import { Movement } from "../Movement/Movement";
import { Vector2 } from "../Utils/Vector2/Vector2";
import * as Phaser from "phaser";
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
    exitLayer: string;
    enterLayer: string;
}
export interface CharConfig {
    sprite: Phaser.GameObjects.Sprite;
    layerOverlaySprite?: Phaser.GameObjects.Sprite;
    tilemap: GridTilemap;
    speed: number;
    collidesWithTiles: boolean;
    walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
    container?: Phaser.GameObjects.Container;
    offsetX?: number;
    offsetY?: number;
    charLayer?: string;
    collisionGroups?: string[];
}
export declare class GridCharacter {
    private id;
    protected customOffset: Vector2;
    protected tilemap: GridTilemap;
    private movementDirection;
    private tileSizePixelsWalked;
    private _nextTilePos;
    private _tilePos;
    private sprite;
    private layerOverlaySprite;
    private container?;
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
    private animation;
    private movement;
    private characterIndex;
    private walkingAnimationMapping;
    private collidesWithTilesInternal;
    private collisionGroups;
    constructor(id: string, config: CharConfig);
    getId(): string;
    getSpeed(): number;
    setSpeed(speed: number): void;
    getSprite(): Phaser.GameObjects.Sprite;
    setSprite(sprite: Phaser.GameObjects.Sprite): void;
    setMovement(movement: Movement): void;
    getMovement(): Movement;
    collidesWithTiles(): boolean;
    setWalkingAnimationMapping(walkingAnimationMapping: WalkingAnimationMapping | number): void;
    setTilePosition(tilePosition: LayerPosition): void;
    getTilePos(): LayerPosition;
    getNextTilePos(): LayerPosition;
    move(direction: Direction): void;
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
    autoMovementSet(): Subject<Movement>;
    private _setSprite;
    private getOffset;
    private updateCharacterPosition;
    private speedPixelsPerSecond;
    private get nextTilePos();
    private set nextTilePos(value);
    private get tilePos();
    private set tilePos(value);
    private gameObject;
    private updateZindex;
    private setDepth;
    private getPaddedPixelDepth;
    private getTransitionLayer;
    private setPosition;
    private getPosition;
    private startMoving;
    private updateTilePos;
    private tilePosInDirection;
    private getDistToNextTile;
    private getProportionWalked;
    private shouldContinueMoving;
    private getSpeedPerDelta;
    private moveCharacterSprite;
    private stopMoving;
    private hasWalkedHalfATile;
    private fire;
    private initLayerOverlaySprite;
}
