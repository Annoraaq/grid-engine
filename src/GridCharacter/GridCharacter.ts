import { LayerPositionUtils } from "./../Utils/LayerPositionUtils/LayerPositionUtils";
import { LayerPosition } from "./../Pathfinding/ShortestPathAlgorithm";
import { CharacterAnimation } from "./CharacterAnimation/CharacterAnimation";
import { directionVector, oppositeDirection } from "./../Direction/Direction";
import { Direction } from "../Direction/Direction";
import { GridTilemap, LayerName } from "../GridTilemap/GridTilemap";
import { Subject } from "rxjs";
import { Position, WalkingAnimationMapping } from "../GridEngine";
import { Movement } from "../Movement/Movement";
import { Vector2 } from "../Utils/Vector2/Vector2";
import * as Phaser from "phaser";

const MAX_MOVEMENT_PROGRESS = 1000;

export type GameObject =
  | Phaser.GameObjects.Container
  | Phaser.GameObjects.Sprite;

/** Frame numbers for one movement direction */
export interface FrameRow {
  /** Frame number for animation frame with left foot in front */
  leftFoot: number;

  /** Frame number for animation frame standing (no foot in front) */
  standing: number;

  /** Frame number for animation frame with right foot in front */
  rightFoot: number;
}

export type CharacterIndex = number;

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
  charLayer?: string;
  collisionGroups?: string[];
  facingDirection?: Direction;
}

export class GridCharacter {
  protected tilemap: GridTilemap;

  private movementDirection = Direction.NONE;
  private _tilePos: LayerPosition = {
    position: new Vector2(0, 0),
    layer: undefined,
  };
  private speed: number;
  private movementStarted$ = new Subject<Direction>();
  private movementStopped$ = new Subject<Direction>();
  private directionChanged$ = new Subject<Direction>();
  private positionChangeStarted$ = new Subject<PositionChange>();
  private positionChangeFinished$ = new Subject<PositionChange>();
  private tilePositionSet$ = new Subject<LayerPosition>();
  private autoMovementSet$ = new Subject<Movement | undefined>();
  private lastMovementImpulse = Direction.NONE;
  private facingDirection: Direction = Direction.DOWN;
  private animation?: CharacterAnimation;
  private movement?: Movement;
  private walkingAnimationMapping?: WalkingAnimationMapping | number;
  private collidesWithTilesInternal: boolean;
  private collisionGroups: Set<string>;
  private depthChanged$ = new Subject<LayerPosition>();
  private movementProgress = 0;

  constructor(private id: string, config: CharConfig) {
    this.walkingAnimationMapping = config.walkingAnimationMapping;
    this.tilemap = config.tilemap;
    this.speed = config.speed;
    this.collidesWithTilesInternal = config.collidesWithTiles;
    this._tilePos.layer = config.charLayer;

    this.collisionGroups = new Set<string>(config.collisionGroups || []);

    if (config.facingDirection) {
      this.turnTowards(config.facingDirection);
    }
  }

  getId(): string {
    return this.id;
  }

  getSpeed(): number {
    return this.speed;
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  setMovement(movement?: Movement): void {
    this.autoMovementSet$.next(movement);
    this.movement = movement;
  }

  getMovement(): Movement | undefined {
    return this.movement;
  }

  collidesWithTiles(): boolean {
    return this.collidesWithTilesInternal;
  }

  getAnimation(): CharacterAnimation | undefined {
    return this.animation;
  }

  setTilePosition(tilePosition: LayerPosition): void {
    if (this.isMoving()) {
      this.movementStopped$.next(this.movementDirection);
    }
    this.tilePositionSet$.next({
      ...tilePosition,
    });
    this.fire(this.positionChangeStarted$, this.tilePos, tilePosition);
    this.fire(this.positionChangeFinished$, this.tilePos, tilePosition);
    this.movementDirection = Direction.NONE;
    this.lastMovementImpulse = Direction.NONE;
    this.tilePos = tilePosition;
    this.movementProgress = 0;
  }

  getTilePos(): LayerPosition {
    return this.tilePos;
  }

  getNextTilePos(): LayerPosition {
    if (!this.isMoving()) return this.tilePos;
    let layer: LayerName = this.tilePos.layer;
    const nextPos = this.tilePosInDirection(
      this.tilePos.position,
      this.movementDirection
    );
    const transitionLayer = this.tilemap.getTransition(
      nextPos,
      this.tilePos.layer
    );
    if (transitionLayer) {
      layer = transitionLayer;
    }

    return {
      position: this.tilePosInDirection(
        this.tilePos.position,
        this.movementDirection
      ),
      layer,
    };
  }

  move(direction: Direction): void {
    this.lastMovementImpulse = direction;
    if (direction == Direction.NONE) return;
    if (this.isMoving()) return;
    if (this.isBlockingDirection(direction)) {
      this.facingDirection = direction;
      this.animation?.setStandingFrame(direction);
      this.directionChanged$.next(direction);
    } else {
      this.startMoving(direction);
    }
  }

  getWalkingAnimationMapping(): WalkingAnimationMapping | number | undefined {
    return this.walkingAnimationMapping;
  }

  setAnimation(animation: CharacterAnimation): void {
    this.animation = animation;
  }

  update(delta: number): void {
    this.movement?.update(delta);
    if (this.isMoving()) {
      this.updateCharacterPosition(delta);
    }
    this.lastMovementImpulse = Direction.NONE;
  }

  getMovementDirection(): Direction {
    return this.movementDirection;
  }

  isBlockingDirection(direction: Direction): boolean {
    if (direction == Direction.NONE) return false;

    const tilePosInDir = this.tilePosInDirection(
      this.getNextTilePos().position,
      direction
    );

    const layerInDirection =
      this.tilemap.getTransition(tilePosInDir, this.getNextTilePos().layer) ||
      this.getNextTilePos().layer;

    if (
      this.collidesWithTilesInternal &&
      this.tilemap.hasBlockingTile(
        layerInDirection,
        tilePosInDir,
        oppositeDirection(direction)
      )
    ) {
      return true;
    }

    return this.tilemap.hasBlockingChar(
      tilePosInDir,
      layerInDirection,
      this.getCollisionGroups()
    );
  }

  isMoving(): boolean {
    return this.movementDirection != Direction.NONE;
  }

  turnTowards(direction: Direction): void {
    if (this.isMoving()) return;
    if (direction == Direction.NONE) return;
    this.facingDirection = direction;
    this.animation?.setStandingFrame(direction);
  }

  getFacingDirection(): Direction {
    return this.facingDirection;
  }

  getFacingPosition(): Vector2 {
    return this._tilePos.position.add(directionVector(this.facingDirection));
  }

  addCollisionGroup(collisionGroup: string): void {
    this.collisionGroups.add(collisionGroup);
  }

  setCollisionGroups(collisionGroups: string[]): void {
    this.collisionGroups = new Set(collisionGroups);
  }

  getCollisionGroups(): string[] {
    return Array.from(this.collisionGroups);
  }

  hasCollisionGroup(collisionGroup: string): boolean {
    return this.collisionGroups.has(collisionGroup);
  }

  removeCollisionGroup(collisionGroup: string): void {
    this.collisionGroups.delete(collisionGroup);
  }

  removeAllCollisionGroups(): void {
    this.collisionGroups.clear();
  }

  movementStarted(): Subject<Direction> {
    return this.movementStarted$;
  }

  movementStopped(): Subject<Direction> {
    return this.movementStopped$;
  }

  directionChanged(): Subject<Direction> {
    return this.directionChanged$;
  }

  tilePositionSet(): Subject<LayerPosition> {
    return this.tilePositionSet$;
  }

  positionChangeStarted(): Subject<PositionChange> {
    return this.positionChangeStarted$;
  }

  positionChangeFinished(): Subject<PositionChange> {
    return this.positionChangeFinished$;
  }

  autoMovementSet(): Subject<Movement | undefined> {
    return this.autoMovementSet$;
  }

  depthChanged(): Subject<LayerPosition> {
    return this.depthChanged$;
  }

  getMovementProgress(): number {
    return this.movementProgress;
  }

  hasWalkedHalfATile(): boolean {
    return this.movementProgress > MAX_MOVEMENT_PROGRESS / 2;
  }

  private updateCharacterPosition(delta: number): void {
    const millisecondsPerSecond = 1000;
    const deltaInSeconds = delta / millisecondsPerSecond;

    const maxProgressForDelta = Math.floor(
      deltaInSeconds * this.speed * MAX_MOVEMENT_PROGRESS
    );
    const willCrossTileBorderThisUpdate =
      MAX_MOVEMENT_PROGRESS - this.movementProgress <= maxProgressForDelta &&
      this.movementProgress < MAX_MOVEMENT_PROGRESS;

    const progressThisUpdate = willCrossTileBorderThisUpdate
      ? MAX_MOVEMENT_PROGRESS - this.movementProgress
      : maxProgressForDelta;

    const proportionToWalk = 1 - progressThisUpdate / maxProgressForDelta;

    this.movementProgress = Math.min(
      this.movementProgress + maxProgressForDelta,
      MAX_MOVEMENT_PROGRESS
    );

    if (willCrossTileBorderThisUpdate) {
      this.movementProgress = 0;
      if (this.shouldContinueMoving() && proportionToWalk > 0) {
        this.fire(
          this.positionChangeFinished$,
          this.tilePos,
          this.getNextTilePos()
        );
        this.tilePos = this.getNextTilePos();
        this.startMoving(this.lastMovementImpulse);
        this.updateCharacterPosition(delta * proportionToWalk);
      } else {
        this.stopMoving();
      }
    }
  }

  private get tilePos(): LayerPosition {
    return LayerPositionUtils.clone(this._tilePos);
  }

  private set tilePos(newTilePos: LayerPosition) {
    LayerPositionUtils.copyOver(newTilePos, this._tilePos);
  }

  private startMoving(direction: Direction): void {
    if (direction === Direction.NONE) return;
    if (direction != this.movementDirection) {
      this.movementStarted$.next(direction);
    }
    this.movementDirection = direction;
    this.facingDirection = direction;
    this.fire(this.positionChangeStarted$, this.tilePos, this.getNextTilePos());
  }

  private tilePosInDirection(pos: Vector2, direction: Direction): Vector2 {
    return pos.add(directionVector(this.tilemap.toMapDirection(direction)));
  }

  private shouldContinueMoving(): boolean {
    return (
      this.lastMovementImpulse !== Direction.NONE &&
      !this.isBlockingDirection(this.lastMovementImpulse)
    );
  }

  private stopMoving(): void {
    if (this.movementDirection === Direction.NONE) return;
    const exitTile = this.tilePos;
    const enterTile = this.getNextTilePos();
    const lastMovementDir = this.movementDirection;
    this.tilePos = this.getNextTilePos();
    this.movementDirection = Direction.NONE;
    this.movementStopped$.next(lastMovementDir);
    this.fire(this.positionChangeFinished$, exitTile, enterTile);
  }

  private fire(
    subject: Subject<PositionChange>,
    { position: exitTile, layer: exitLayer }: LayerPosition,
    { position: enterTile, layer: enterLayer }: LayerPosition
  ): void {
    subject.next({ exitTile, enterTile, exitLayer, enterLayer });
  }
}
