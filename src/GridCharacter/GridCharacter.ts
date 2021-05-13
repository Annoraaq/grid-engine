import { CharacterAnimation } from "./CharacterAnimation/CharacterAnimation";
import { VectorUtils } from "./../Utils/VectorUtils";
import { directionVector, oppositeDirection } from "./../Direction/Direction";
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
  walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
  container?: Phaser.GameObjects.Container;
  offsetX?: number;
  offsetY?: number;
}

export class GridCharacter {
  protected tileSize: Vector2;
  protected customOffset: Vector2;

  private movementDirection = Direction.NONE;
  private speedPixelsPerSecond: { [key in Direction]: Vector2 };
  private tileSizePixelsWalked: Vector2 = Vector2.ZERO.clone();
  private _nextTilePos = new Vector2(0, 0);
  private _tilePos = new Vector2(0, 0);
  private sprite: Phaser.GameObjects.Sprite;
  private container?: Phaser.GameObjects.Container;
  private tilemap: GridTilemap;
  private speed: number;
  private movementStarted$ = new Subject<Direction>();
  private movementStopped$ = new Subject<Direction>();
  private directionChanged$ = new Subject<Direction>();
  private positionChanged$ = new Subject<PositionChange>();
  private positionChangeFinished$ = new Subject<PositionChange>();
  private autoMovementSet$ = new Subject<void>();
  private lastMovementImpulse = Direction.NONE;
  private facingDirection: Direction = Direction.DOWN;
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
    this.tileSize = config.tileSize.clone();

    this.animation = new CharacterAnimation(
      this.sprite,
      walkingAnimationMapping,
      characterIndex
    );
    this.animation.setIsEnabled(config.walkingAnimationEnabled);
    this.animation.setStandingFrame(Direction.DOWN);

    this.speedPixelsPerSecond = this.createSpeedPixelsPerSecond();

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
    this.autoMovementSet$.next();
    this.movement = movement;
    this.movement?.setCharacter(this);
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
    if (this.isMoving()) {
      this.movementStopped$.next(this.movementDirection);
    }
    this.positionChanged$.next({
      exitTile: this.tilePos,
      enterTile: tilePosition,
    });
    this.positionChangeFinished$.next({
      exitTile: this.tilePos,
      enterTile: tilePosition,
    });
    this.movementDirection = Direction.NONE;
    this.nextTilePos = tilePosition;
    this.tilePos = tilePosition;
    this.updateZindex();
    this.setPosition(
      this.tilePosToPixelPos(tilePosition)
        .add(this.getOffset())
        .add(this.customOffset)
    );
  }

  getTilePos(): Vector2 {
    return this.tilePos;
  }

  getNextTilePos(): Vector2 {
    return this.nextTilePos;
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
      this.updateZindex();
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
        oppositeDirection(this.toMapDirection(direction))
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

  autoMovementSet(): Subject<void> {
    return this.autoMovementSet$;
  }

  protected tilePosToPixelPos(tilePosition: Vector2): Vector2 {
    return tilePosition.clone().multiply(this.tileSize);
  }

  protected getTileDistance(direction: Direction): Vector2 {
    if (direction === Direction.NONE) return Vector2.ZERO.clone();
    return this.tileSize.clone();
  }

  protected toMapDirection(direction: Direction): Direction {
    return direction;
  }

  private getOffset(): Vector2 {
    const offsetX =
      this.tileSize.x / 2 -
      Math.floor((this.sprite.width * this.sprite.scale) / 2);
    const offsetY = -(this.sprite.height * this.sprite.scale) + this.tileSize.y;
    return new Vector2(offsetX, offsetY);
  }

  private createSpeedPixelsPerSecond(): { [key in Direction]: Vector2 } {
    const speedPixelsPerSecond = {
      [Direction.LEFT]: new Vector2(this.tileSize.x, 0),
      [Direction.RIGHT]: new Vector2(this.tileSize.x, 0),
      [Direction.UP]: new Vector2(0, this.tileSize.y),
      [Direction.DOWN]: new Vector2(0, this.tileSize.y),
      [Direction.UP_LEFT]: this.getTileDistance(Direction.UP_LEFT),
      [Direction.UP_RIGHT]: this.getTileDistance(Direction.UP_RIGHT),
      [Direction.DOWN_LEFT]: this.getTileDistance(Direction.DOWN_LEFT),
      [Direction.DOWN_RIGHT]: this.getTileDistance(Direction.DOWN_RIGHT),
      [Direction.NONE]: Vector2.ZERO.clone(),
    };

    Object.entries(speedPixelsPerSecond).forEach(([key, val]) => {
      speedPixelsPerSecond[key] = VectorUtils.scalarMult(val, this.speed);
    });
    return speedPixelsPerSecond;
  }

  private get nextTilePos(): Vector2 {
    return this._nextTilePos.clone();
  }

  private set nextTilePos(newTilePos: Vector2) {
    this._nextTilePos.x = newTilePos.x;
    this._nextTilePos.y = newTilePos.y;
  }

  private get tilePos(): Vector2 {
    return this._tilePos.clone();
  }

  private set tilePos(newTilePos: Vector2) {
    this._tilePos.x = newTilePos.x;
    this._tilePos.y = newTilePos.y;
  }

  private updateZindex() {
    const gameObject = this.container || this.sprite;
    gameObject.setDepth(
      GridTilemap.FIRST_PLAYER_LAYER + this.mapDepth(this.nextTilePos)
    );
  }

  protected mapDepth(nextTilePos: Vector2): number {
    return nextTilePos.y;
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
      directionVector(this.toMapDirection(this.movementDirection))
    );
    this.positionChanged$.next({
      exitTile: this.nextTilePos,
      enterTile: newTilePos,
    });
    this.nextTilePos = newTilePos;
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.nextTilePos.add(
      directionVector(this.toMapDirection(direction))
    );
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
    return this.speedPixelsPerSecond[this.movementDirection]
      .clone()
      .multiply(new Vector2(deltaInSeconds, deltaInSeconds))
      .multiply(directionVector(this.movementDirection));
  }

  private willCrossTileBorderThisUpdate(
    pixelsToWalkThisUpdate: Vector2
  ): boolean {
    return (
      this.tileSizePixelsWalked.x + Math.abs(pixelsToWalkThisUpdate.x) >=
        this.getTileDistance(this.movementDirection).x ||
      this.tileSizePixelsWalked.y + Math.abs(pixelsToWalkThisUpdate.y) >=
        this.getTileDistance(this.movementDirection).y
    );
  }

  private moveCharacterSpriteRestOfTile(): void {
    this.moveCharacterSprite(
      this.getTileDistance(this.movementDirection)
        .clone()
        .subtract(this.tileSizePixelsWalked)
        .multiply(directionVector(this.movementDirection))
    );
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
    this.tileSizePixelsWalked.x %= this.getTileDistance(
      this.movementDirection
    ).x;
    this.tileSizePixelsWalked.y %= this.getTileDistance(
      this.movementDirection
    ).y;
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
      this.tileSizePixelsWalked.x >
        this.getTileDistance(this.movementDirection).x / 2 ||
      this.tileSizePixelsWalked.y >
        this.getTileDistance(this.movementDirection).y / 2
    );
  }
}
