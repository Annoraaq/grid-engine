import { LayerPositionUtils } from "./../Utils/LayerPositionUtils/LayerPositionUtils";
import { LayerVecPos } from "./../Pathfinding/ShortestPathAlgorithm";
import {
  directionVector,
  NumberOfDirections,
  oppositeDirection,
} from "./../Direction/Direction";
import { Direction } from "../Direction/Direction";
import { Subject } from "rxjs";
import { CharLayer, Position } from "../GridEngine";
import { Movement } from "../Movement/Movement";
import { Vector2 } from "../Utils/Vector2/Vector2";
import * as Phaser from "phaser";
import { GridTilemap } from "../GridTilemap/GridTilemap";

const MAX_MOVEMENT_PROGRESS = 1000;

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
  tilemap: GridTilemap;
  speed: number;
  collidesWithTiles: boolean;
  numberOfDirections: NumberOfDirections;
  charLayer?: string;
  collisionGroups?: string[];
  facingDirection?: Direction;
  labels?: string[];
  tileWidth?: number;
  tileHeight?: number;
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
  private depthChanged$ = new Subject<LayerVecPos>();
  private movementProgress = 0;
  private labels: Set<string>;
  private numberOfDirections: NumberOfDirections;
  private tileWidth: number;
  private tileHeight: number;

  constructor(private id: string, config: CharConfig) {
    this.tilemap = config.tilemap;
    this.speed = config.speed;
    this.collidesWithTilesInternal = config.collidesWithTiles;
    this._tilePos.layer = config.charLayer;

    this.collisionGroups = new Set<string>(config.collisionGroups || []);
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
      direction
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
        direction
      );
      return this.tilemap.hasBlockingTile(
        tilePosInDir,
        layerInDirection,
        oppositeDirection(direction)
      );
    });
  }

  private isCharBlocking(
    direction: Direction,
    layerInDirection: CharLayer
  ): boolean {
    return this.someCharTile((x, y) => {
      const tilePosInDir = this.tilePosInDirection(
        new Vector2(x, y),
        direction
      );
      return this.tilemap.hasBlockingChar(
        tilePosInDir,
        layerInDirection,
        this.getCollisionGroups(),
        new Set([this.getId()])
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
    { position: enterTile, layer: enterLayer }: LayerVecPos
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
