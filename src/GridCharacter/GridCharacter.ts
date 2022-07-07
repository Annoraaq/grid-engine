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
  offsetX?: number;
  offsetY?: number;
  charLayer?: string;
  collisionGroups?: string[];
  facingDirection?: Direction;
}

export class GridCharacter {
  protected customOffset: Vector2;
  protected tilemap: GridTilemap;

  private movementDirection = Direction.NONE;
  private tileSizePixelsWalked: Vector2 = Vector2.ZERO;
  private _nextTilePos: LayerPosition = {
    position: new Vector2(0, 0),
    layer: undefined,
  };
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
  private pixelPositionChanged$ = new Subject<Vector2>();
  private depthChanged$ = new Subject<LayerPosition>();
  private pixelPosition = new Vector2(0, 0);
  private movementProgress = 0;

  // TODO: move this to GridCharPhaser as soon as GridChar will be made
  // independent of pixel positions and will get a "movement progress" instead
  engineOffset = new Vector2(0, 0);

  constructor(private id: string, config: CharConfig) {
    this.walkingAnimationMapping = config.walkingAnimationMapping;
    this.tilemap = config.tilemap;
    this.speed = config.speed;
    this.collidesWithTilesInternal = config.collidesWithTiles;
    this.customOffset = new Vector2(config.offsetX || 0, config.offsetY || 0);
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
    this.nextTilePos = tilePosition;
    this.fire(this.positionChangeStarted$, this.tilePos, this.nextTilePos);
    this.fire(this.positionChangeFinished$, this.tilePos, this.nextTilePos);
    this.movementDirection = Direction.NONE;
    this.lastMovementImpulse = Direction.NONE;
    this.tilePos = tilePosition;
    this.setPixelPosition(
      this.tilemap
        .tilePosToPixelPos(tilePosition.position)
        .add(this.engineOffset)
        .add(this.customOffset)
    );
  }

  getOffsetX(): number {
    return this.customOffset.x;
  }

  getOffsetY(): number {
    return this.customOffset.y;
  }

  getTilePos(): LayerPosition {
    return this.tilePos;
  }

  getNextTilePos(): LayerPosition {
    return this.nextTilePos;
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

    const tilePosInDir = this.tilePosInDirection(direction);

    const layerInDirection =
      this.tilemap.getTransition(tilePosInDir, this.nextTilePos.layer) ||
      this.nextTilePos.layer;

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

  pixelPositionChanged(): Subject<Vector2> {
    return this.pixelPositionChanged$;
  }

  depthChanged(): Subject<LayerPosition> {
    return this.depthChanged$;
  }

  getPixelPos(): Vector2 {
    return this.pixelPosition.clone();
  }

  getMovementProgress(): number {
    return this.movementProgress;
  }

  private updateCharacterPosition(delta: number): void {
    const maxMovementForDelta = this.getSpeedPerDelta(delta);
    const millisecondsPerSecond = 1000;
    const deltaInSeconds = delta / millisecondsPerSecond;
    const distToNextTile = this.getDistToNextTile();

    const maxMovementForDelta2 = Math.floor(
      deltaInSeconds * this.speed * MAX_MOVEMENT_PROGRESS
    );
    const willCrossTileBorderThisUpdate =
      MAX_MOVEMENT_PROGRESS - this.movementProgress <= maxMovementForDelta2;

    const distToWalk = willCrossTileBorderThisUpdate
      ? distToNextTile
      : maxMovementForDelta;

    this.movementProgress += maxMovementForDelta2;
    this.movementProgress %= MAX_MOVEMENT_PROGRESS;
    this.moveCharacterSprite(distToWalk);

    if (willCrossTileBorderThisUpdate) {
      if (this.shouldContinueMoving()) {
        this.fire(this.positionChangeFinished$, this.tilePos, this.nextTilePos);
        this.startMoving(this.lastMovementImpulse);
        this.movementProgress = 0;

        this.updateCharacterPosition(
          delta * this.getProportionWalked(maxMovementForDelta, distToNextTile)
        );
      } else {
        this.movementProgress = 0;
        this.stopMoving();
      }
    }
  }

  private speedPixelsPerSecond(direction: Direction): Vector2 {
    return directionVector(direction)
      .abs()
      .multiply(this.tilemap.getTileDistance(direction))
      .scalarMult(this.speed);
  }

  private get nextTilePos(): LayerPosition {
    return {
      position: this._nextTilePos.position.clone(),
      layer: this._nextTilePos.layer,
    };
  }

  private set nextTilePos(newTilePos: LayerPosition) {
    LayerPositionUtils.copyOver(newTilePos, this._nextTilePos);
  }

  private get tilePos(): LayerPosition {
    return LayerPositionUtils.clone(this._tilePos);
  }

  private set tilePos(newTilePos: LayerPosition) {
    LayerPositionUtils.copyOver(newTilePos, this._tilePos);
  }

  private setPixelPosition(position: Vector2): void {
    this.pixelPosition = new Vector2(position);
    this.pixelPositionChanged$.next(new Vector2(this.pixelPosition));
  }

  private getPixelPosition(): Vector2 {
    return new Vector2(this.pixelPosition);
  }

  private startMoving(direction: Direction): void {
    if (direction === Direction.NONE) return;
    if (direction != this.movementDirection) {
      this.movementStarted$.next(direction);
    }
    this.movementDirection = direction;
    this.facingDirection = direction;
    this.updateTilePos();
  }

  private updateTilePos() {
    this.tilePos = this.nextTilePos;
    const newTilePos = this.tilePosInDirection(this.movementDirection);
    const trans = this.tilemap.getTransition(newTilePos, this.tilePos.layer);

    const newLayer = trans || this.tilePos.layer;
    this.nextTilePos = { position: newTilePos, layer: newLayer };
    this.fire(this.positionChangeStarted$, this.tilePos, this.nextTilePos);
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.nextTilePos.position.add(
      directionVector(this.tilemap.toMapDirection(direction))
    );
  }

  private getDistToNextTile(): Vector2 {
    return this.tilemap
      .getTileDistance(this.movementDirection)
      .subtract(this.tileSizePixelsWalked)
      .multiply(directionVector(this.movementDirection));
  }

  private getProportionWalked(
    maxMovementForDelta: Vector2,
    distToNextTile: Vector2
  ): number {
    const toWalkOnNextTileThisUpdate =
      maxMovementForDelta.subtract(distToNextTile);
    const propVec = toWalkOnNextTileThisUpdate.divide(maxMovementForDelta);
    if (isNaN(propVec.x)) propVec.x = 0;
    return Math.max(Math.abs(propVec.x), Math.abs(propVec.y));
  }

  private shouldContinueMoving(): boolean {
    return (
      this.lastMovementImpulse !== Direction.NONE &&
      !this.isBlockingDirection(this.lastMovementImpulse)
    );
  }

  private getSpeedPerDelta(delta: number): Vector2 {
    const deltaInSeconds = delta / 1000;
    return this.speedPixelsPerSecond(this.movementDirection)
      .scalarMult(deltaInSeconds)
      .multiply(directionVector(this.movementDirection));
  }

  private moveCharacterSprite(speed: Vector2): void {
    const newPlayerPos = this.getPixelPosition().add(speed);
    this.tileSizePixelsWalked = this.tileSizePixelsWalked.add(speed.abs());
    this.setPixelPosition(newPlayerPos);

    this.tileSizePixelsWalked = this.tileSizePixelsWalked.modulo(
      this.tilemap.getTileDistance(this.movementDirection)
    );
  }

  private stopMoving(): void {
    if (this.movementDirection === Direction.NONE) return;
    const exitTile = this.tilePos;
    const enterTile = this.nextTilePos;
    const lastMovementDir = this.movementDirection;
    this.tilePos = this.nextTilePos;
    this.movementDirection = Direction.NONE;
    this.movementStopped$.next(lastMovementDir);
    this.fire(this.positionChangeFinished$, exitTile, enterTile);
  }

  hasWalkedHalfATile(): boolean {
    return this.movementProgress > MAX_MOVEMENT_PROGRESS / 2;
  }

  private fire(
    subject: Subject<PositionChange>,
    { position: exitTile, layer: exitLayer }: LayerPosition,
    { position: enterTile, layer: enterLayer }: LayerPosition
  ): void {
    subject.next({ exitTile, enterTile, exitLayer, enterLayer });
  }
}
