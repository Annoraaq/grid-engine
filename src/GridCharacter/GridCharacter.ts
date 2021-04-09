import { CharacterAnimation } from "./CharacterAnimation/CharacterAnimation";
import { VectorUtils } from "./../Utils/VectorUtils";
import {
  DirectionVectors,
  DirectionVectorsIsometric,
  oppositeDirection,
} from "./../Direction/Direction";
import { Direction } from "../Direction/Direction";
import * as Phaser from "phaser";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { Subject } from "rxjs";
import { WalkingAnimationMapping } from "../GridEngine";
import { Movement } from "../Movement/Movement";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export interface FrameRow {
  leftFoot: number;
  standing: number;
  rightFoot: number;
}

export type CharacterIndex = number;

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

export class GridCharacter {
  private movementDirection = Direction.NONE;
  private speedPixelsPerSecond: Vector2;
  private tileSizePixelsWalked: Vector2 = Vector2.ZERO.clone();
  private _nextTilePos = new Vector2(0, 0);
  private _tilePos = new Vector2(0, 0);
  private sprite: Phaser.GameObjects.Sprite;
  private container?: Phaser.GameObjects.Container;
  private tilemap: GridTilemap;
  private tileDistance: Vector2;
  private tileSize: Vector2;
  private speed: number;
  private customOffset: Vector2;
  private movementStarted$ = new Subject<Direction>();
  private movementStopped$ = new Subject<Direction>();
  private directionChanged$ = new Subject<Direction>();
  private positionChanged$ = new Subject<PositionChange>();
  private positionChangeFinished$ = new Subject<PositionChange>();
  private lastMovementImpulse = Direction.NONE;
  private facingDirection: Direction = Direction.DOWN;
  private isIsometric: boolean;
  private animation: CharacterAnimation;
  private movement: Movement;

  constructor(private id: string, config: CharConfig) {
    let characterIndex = 0;
    let walkingAnimationMapping: WalkingAnimationMapping;
    if (typeof config.walkingAnimationMapping == "number") {
      characterIndex = config.walkingAnimationMapping;
    } else {
      walkingAnimationMapping = config.walkingAnimationMapping;
    }

    this.sprite = config.sprite;
    this.sprite.setOrigin(0, 0);
    this.container = config.container;
    this.tilemap = config.tilemap;
    this.speed = config.speed;
    this.customOffset = new Vector2(config.offsetX || 0, config.offsetY || 0);
    this.isIsometric = config.isometric;
    this.tileSize = config.tileSize.clone();
    this.tileDistance = config.tileSize.clone();
    if (this.isIsometric) {
      this.tileDistance = VectorUtils.scalarMult(this.tileDistance, 0.5);
    }

    this.animation = new CharacterAnimation(
      this.sprite,
      walkingAnimationMapping,
      characterIndex
    );
    this.animation.setIsEnabled(config.walkingAnimationEnabled);
    this.animation.setStandingFrame(Direction.DOWN);

    this.speedPixelsPerSecond = VectorUtils.scalarMult(
      this.tileDistance,
      this.speed
    );
    this.updateZindex();
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

  setMovement(movement: Movement): void {
    this.movement = movement;
    this.movement.setCharacter(this);
  }

  getMovement(): Movement {
    return this.movement;
  }

  setWalkingAnimationMapping(
    walkingAnimationMapping: WalkingAnimationMapping
  ): void {
    this.animation.setWalkingAnimationMapping(walkingAnimationMapping);
  }

  setTilePosition(tilePosition: Vector2): void {
    if (this.isMoving()) return;
    this.nextTilePos = tilePosition;
    this.tilePos = tilePosition;
    this.updateZindex();
    this.setPosition(
      tilePosition
        .clone()
        .multiply(this.tileDistance)
        .add(this.getOffset())
        .add(this.customOffset)
    );
  }

  getTilePos(): Vector2 {
    return this.tilePos;
  }

  move(direction: Direction): void {
    this.lastMovementImpulse = direction;
    if (direction == Direction.NONE) return;
    if (this.isMoving()) return;
    if (this.isBlockingDirection(direction)) {
      this.facingDirection = direction;
      this.animation.setStandingFrame(direction);
      this.directionChanged$.next(direction);
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

  isBlockingTile(tilePos: Vector2): boolean {
    return this.nextTilePos.equals(tilePos) || this.tilePos.equals(tilePos);
  }

  isBlockingDirection(direction: Direction): boolean {
    if (direction == Direction.NONE) return false;
    return (
      this.tilemap.hasBlockingTile(
        this.tilePosInDirection(direction),
        oppositeDirection(direction)
      ) || this.tilemap.hasBlockingChar(this.tilePosInDirection(direction))
    );
  }

  isMoving(): boolean {
    return this.movementDirection != Direction.NONE;
  }

  turnTowards(direction: Direction): void {
    if (this.isMoving()) return;
    if (direction == Direction.NONE) return;
    this.facingDirection = direction;
    this.animation.setStandingFrame(direction);
  }

  getFacingDirection(): Direction {
    return this.facingDirection;
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

  positionChanged(): Subject<PositionChange> {
    return this.positionChanged$;
  }

  positionChangeFinished(): Subject<PositionChange> {
    return this.positionChangeFinished$;
  }

  private getOffset(): Vector2 {
    const offsetX =
      this.tileSize.x / 2 -
      Math.floor((this.sprite.width * this.sprite.scale) / 2);
    const offsetY = -(this.sprite.height * this.sprite.scale) + this.tileSize.y;
    return new Vector2(offsetX, offsetY);
  }

  private get nextTilePos() {
    return this._nextTilePos.clone();
  }

  private set nextTilePos(newTilePos: Vector2) {
    this._nextTilePos.x = newTilePos.x;
    this._nextTilePos.y = newTilePos.y;
  }

  private get tilePos() {
    return this._tilePos.clone();
  }

  private set tilePos(newTilePos: Vector2) {
    this._tilePos.x = newTilePos.x;
    this._tilePos.y = newTilePos.y;
  }

  private updateZindex() {
    const gameObject = this.container || this.sprite;
    gameObject.setDepth(GridTilemap.FIRST_PLAYER_LAYER + this.nextTilePos.y);
  }

  private setPosition(position: Vector2): void {
    const gameObject = this.container || this.sprite;
    gameObject.x = position.x;
    gameObject.y = position.y;
  }

  private getPosition(): Vector2 {
    const gameObject = this.container || this.sprite;
    return new Vector2(gameObject.x, gameObject.y);
  }

  private startMoving(direction: Direction): void {
    this.movementStarted$.next(direction);
    this.movementDirection = direction;
    this.facingDirection = direction;
    this.updateTilePos();
  }

  private updateTilePos() {
    this.tilePos = this.nextTilePos;
    const newTilePos = this.nextTilePos.add(
      DirectionVectors[this.movementDirection]
    );
    this.positionChanged$.next({
      exitTile: this.nextTilePos,
      enterTile: newTilePos,
    });
    this.nextTilePos = newTilePos;
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.nextTilePos.add(DirectionVectors[direction]);
  }

  private updateCharacterPosition(delta: number): void {
    const pixelsToWalkThisUpdate = this.getSpeedPerDelta(delta);

    if (!this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.moveCharacterSprite(pixelsToWalkThisUpdate);
    } else if (this.shouldContinueMoving()) {
      this.moveCharacterSprite(pixelsToWalkThisUpdate);
      this.positionChangeFinished$.next({
        exitTile: this.tilePos,
        enterTile: this.nextTilePos,
      });
      this.updateTilePos();
    } else {
      this.moveCharacterSpriteRestOfTile();
      this.stopMoving();
    }
  }

  private shouldContinueMoving(): boolean {
    return (
      this.movementDirection == this.lastMovementImpulse &&
      !this.isBlockingDirection(this.lastMovementImpulse)
    );
  }

  private getSpeedPerDelta(delta: number): Vector2 {
    const deltaInSeconds = delta / 1000;
    return this.speedPixelsPerSecond
      .clone()
      .multiply(new Vector2(deltaInSeconds, deltaInSeconds))
      .multiply(this.getDirectionVecs()[this.movementDirection]);
  }

  private willCrossTileBorderThisUpdate(
    pixelsToWalkThisUpdate: Vector2
  ): boolean {
    return (
      this.tileSizePixelsWalked.x + Math.abs(pixelsToWalkThisUpdate.x) >=
        this.tileDistance.x ||
      this.tileSizePixelsWalked.y + Math.abs(pixelsToWalkThisUpdate.y) >=
        this.tileDistance.y
    );
  }

  private moveCharacterSpriteRestOfTile(): void {
    this.moveCharacterSprite(
      this.tileDistance
        .clone()
        .subtract(this.tileSizePixelsWalked)
        .multiply(this.getDirectionVecs()[this.movementDirection])
    );
  }

  private getDirectionVecs(): { [key in Direction]?: Vector2 } {
    if (this.isIsometric) {
      return DirectionVectorsIsometric;
    }
    return DirectionVectors;
  }

  private moveCharacterSprite(speed: Vector2): void {
    const newPlayerPos = this.getPosition().add(speed);
    this.setPosition(newPlayerPos);
    this.tileSizePixelsWalked.x += Math.abs(speed.x);
    this.tileSizePixelsWalked.y += Math.abs(speed.y);
    this.animation.updateCharacterFrame(
      this.movementDirection,
      this.hasWalkedHalfATile()
    );
    this.tileSizePixelsWalked.x %= this.tileDistance.x;
    this.tileSizePixelsWalked.y %= this.tileDistance.y;
    if (this.hasWalkedHalfATile()) {
      this.updateZindex();
    }
  }

  private stopMoving(): void {
    this.movementStopped$.next(this.movementDirection);
    this.positionChangeFinished$.next({
      exitTile: this.tilePos,
      enterTile: this.nextTilePos,
    });
    this.movementDirection = Direction.NONE;
    this.tilePos = this.nextTilePos;
  }

  private hasWalkedHalfATile(): boolean {
    return (
      this.tileSizePixelsWalked.x > this.tileDistance.x / 2 ||
      this.tileSizePixelsWalked.y > this.tileDistance.y / 2
    );
  }
}
