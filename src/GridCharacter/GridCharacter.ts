import {
  LayerPositionUtils,
  LayerVecPos,
} from "./../Utils/LayerPositionUtils/LayerPositionUtils.js";
import {
  directionVector,
  NumberOfDirections,
  oppositeDirection,
} from "./../Direction/Direction.js";
import { Direction } from "../Direction/Direction.js";
import { Subject } from "rxjs";
import { CharLayer, Position } from "../GridEngine.js";
import { Movement } from "../Movement/Movement.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import * as Phaser from "phaser";
import { GridTilemap } from "../GridTilemap/GridTilemap.js";

export const MAX_MOVEMENT_PROGRESS = 1000;

export type CharId = string;

export type GameObject =
  | Phaser.GameObjects.Container
  | Phaser.GameObjects.Sprite;

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

export class GridCharacter {
  protected tilemap: GridTilemap;

  private movementDirection = Direction.NONE;
  private _tilePos: LayerVecPos = {
    position: new Vector2(0, 0),
    layer: undefined,
  };
  private speed: number;
  private movementStarted$ = new Subject<Direction>();
  private movementStopped$ = new Subject<Direction>();
  private directionChanged$ = new Subject<Direction>();
  private positionChangeStarted$ = new Subject<PositionChange>();
  private positionChangeFinished$ = new Subject<PositionChange>();
  private tilePositionSet$ = new Subject<LayerVecPos>();
  private autoMovementSet$ = new Subject<Movement | undefined>();
  private lastMovementImpulse = Direction.NONE;
  private facingDirection: Direction = Direction.DOWN;
  private movement?: Movement;
  private collidesWithTilesInternal: boolean;
  private collisionGroups: Set<string>;
  private ignoreCollisionGroups: Set<string>;
  private ignoreMissingTiles: boolean;
  private depthChanged$ = new Subject<LayerVecPos>();
  private movementProgress = 0;
  private labels: Set<string>;
  private numberOfDirections: NumberOfDirections;
  private tileWidth: number;
  private tileHeight: number;

  constructor(
    private id: string,
    config: CharConfig,
  ) {
    this.tilemap = config.tilemap;
    this.speed = config.speed;
    this.collidesWithTilesInternal = config.collidesWithTiles;
    this._tilePos.layer = config.charLayer;

    this.ignoreMissingTiles = config.ignoreMissingTiles ?? false;
    this.collisionGroups = new Set<string>(config.collisionGroups || []);
    this.ignoreCollisionGroups = new Set<string>(
      config.ignoreCollisionGroups || [],
    );
    this.labels = new Set<string>(config.labels || []);

    this.numberOfDirections = config.numberOfDirections;

    if (config.facingDirection) {
      this.turnTowards(config.facingDirection);
    }

    this.tileWidth = config.tileWidth ?? 1;
    this.tileHeight = config.tileHeight ?? 1;
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

  setCollidesWithTiles(collidesWithTiles: boolean): void {
    this.collidesWithTilesInternal = collidesWithTiles;
  }

  getIgnoreMissingTiles(): boolean {
    return this.ignoreMissingTiles;
  }

  setIgnoreMissingTiles(ignoreMissingTiles: boolean): void {
    this.ignoreMissingTiles = ignoreMissingTiles;
  }

  setTilePosition(tilePosition: LayerVecPos): void {
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

  getTilePos(): LayerVecPos {
    return this.tilePos;
  }

  getNextTilePos(): LayerVecPos {
    if (!this.isMoving()) return this.tilePos;
    let layer: CharLayer = this.tilePos.layer;
    const nextPos = this.tilePosInDirection(
      this.tilePos.position,
      this.movementDirection,
    );
    const transitionLayer = this.tilemap.getTransition(
      nextPos,
      this.tilePos.layer,
    );
    if (transitionLayer) {
      layer = transitionLayer;
    }

    return {
      position: this.tilePosInDirection(
        this.tilePos.position,
        this.movementDirection,
      ),
      layer,
    };
  }

  getTileWidth(): number {
    return this.tileWidth;
  }

  getTileHeight(): number {
    return this.tileHeight;
  }

  move(direction: Direction): void {
    this.lastMovementImpulse = direction;
    if (direction == Direction.NONE) return;
    if (this.isMoving()) return;
    if (this.isBlockingDirection(direction)) {
      this.changeFacingDirection(direction);
    } else {
      this.startMoving(direction);
    }
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
      direction,
    );

    const layerInDirection =
      this.tilemap.getTransition(tilePosInDir, this.getNextTilePos().layer) ||
      this.getNextTilePos().layer;

    if (this.collidesWithTilesInternal) {
      const isTileBlocking = this.isTileBlocking(direction, layerInDirection);
      if (isTileBlocking) return true;
    }

    return this.isCharBlocking(direction, layerInDirection);
  }

  isTileBlocking(direction: Direction, layerInDirection: CharLayer): boolean {
    return this.someCharTile((x, y) => {
      const tilePosInDir = this.tilePosInDirection(
        new Vector2(x, y),
        direction,
      );
      return this.tilemap.hasBlockingTile(
        tilePosInDir,
        layerInDirection,
        oppositeDirection(direction),
        this.ignoreMissingTiles,
      );
    });
  }

  private isCharBlocking(
    direction: Direction,
    layerInDirection: CharLayer,
  ): boolean {
    return this.someCharTile((x, y) => {
      const tilePosInDir = this.tilePosInDirection(
        new Vector2(x, y),
        direction,
      );
      return this.tilemap.hasBlockingChar(
        tilePosInDir,
        layerInDirection,
        this.getCollisionGroups(),
        new Set([this.getId()]),
        this.ignoreCollisionGroups,
      );
    });
  }

  isMoving(): boolean {
    return this.movementDirection != Direction.NONE;
  }

  turnTowards(direction: Direction): void {
    if (this.isMoving()) return;
    if (direction == Direction.NONE) return;
    this.changeFacingDirection(direction);
  }

  private changeFacingDirection(newDirection: Direction): void {
    if (this.facingDirection === newDirection) return;
    this.facingDirection = newDirection;
    this.directionChanged$.next(newDirection);
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

  setIgnoreCollisionGroups(ignoreCollisionGroups: string[]): void {
    this.ignoreCollisionGroups = new Set(ignoreCollisionGroups);
  }

  getCollisionGroups(): string[] {
    return Array.from(this.collisionGroups);
  }

  getIgnoreCollisionGroups(): string[] {
    return Array.from(this.ignoreCollisionGroups);
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

  addLabels(labels: string[]): void {
    for (const label of labels) {
      this.labels.add(label);
    }
  }

  getLabels(): string[] {
    return [...this.labels.values()];
  }

  hasLabel(label: string): boolean {
    return this.labels.has(label);
  }

  clearLabels(): void {
    this.labels.clear();
  }

  removeLabels(labels: string[]): void {
    for (const label of labels) {
      this.labels.delete(label);
    }
  }

  getNumberOfDirections(): NumberOfDirections {
    return this.numberOfDirections;
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

  tilePositionSet(): Subject<LayerVecPos> {
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

  depthChanged(): Subject<LayerVecPos> {
    return this.depthChanged$;
  }

  getMovementProgress(): number {
    return this.movementProgress;
  }

  setMovementProgress(progress: number): void {
    const newProgress = Math.max(0, Math.min(MAX_MOVEMENT_PROGRESS, progress));
    this.movementProgress = newProgress;
  }

  hasWalkedHalfATile(): boolean {
    return this.movementProgress > MAX_MOVEMENT_PROGRESS / 2;
  }

  willCrossTileBorderThisUpdate(delta: number): boolean {
    return (
      this.movementProgress + this.maxProgressForDelta(delta) >=
      MAX_MOVEMENT_PROGRESS
    );
  }

  private updateCharacterPosition(delta: number): void {
    const willCrossTileBorderThisUpdate =
      this.willCrossTileBorderThisUpdate(delta);

    const progressThisUpdate = willCrossTileBorderThisUpdate
      ? MAX_MOVEMENT_PROGRESS - this.movementProgress
      : this.maxProgressForDelta(delta);

    const proportionToWalk =
      1 - progressThisUpdate / this.maxProgressForDelta(delta);

    this.movementProgress = Math.min(
      this.movementProgress + this.maxProgressForDelta(delta),
      MAX_MOVEMENT_PROGRESS,
    );

    if (willCrossTileBorderThisUpdate) {
      this.movementProgress = 0;
      if (this.shouldContinueMoving()) {
        this.fire(
          this.positionChangeFinished$,
          this.tilePos,
          this.getNextTilePos(),
        );
        this.tilePos = this.getNextTilePos();
        this.startMoving(this.lastMovementImpulse);
        if (proportionToWalk > 0) {
          this.updateCharacterPosition(delta * proportionToWalk);
        }
      } else {
        this.stopMoving();
      }
    }
  }

  private maxProgressForDelta(delta: number): number {
    const millisecondsPerSecond = 1000;
    const deltaInSeconds = delta / millisecondsPerSecond;
    return Math.floor(deltaInSeconds * this.speed * MAX_MOVEMENT_PROGRESS);
  }

  private get tilePos(): LayerVecPos {
    return LayerPositionUtils.clone(this._tilePos);
  }

  private set tilePos(newTilePos: LayerVecPos) {
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
    { position: exitTile, layer: exitLayer }: LayerVecPos,
    { position: enterTile, layer: enterLayer }: LayerVecPos,
  ): void {
    subject.next({ exitTile, enterTile, exitLayer, enterLayer });
  }

  private someCharTile(predicate: (x: number, y: number) => boolean): boolean {
    const tilePos = this.getNextTilePos().position;
    for (let x = tilePos.x; x < tilePos.x + this.getTileWidth(); x++) {
      for (let y = tilePos.y; y < tilePos.y + this.getTileHeight(); y++) {
        if (predicate(x, y)) return true;
      }
    }
    return false;
  }
}
