import { LayerPositionUtils } from "./../Utils/LayerPositionUtils/LayerPositionUtils";
import { LayerPosition } from "./../Pathfinding/ShortestPathAlgorithm";
import { CharacterAnimation } from "./CharacterAnimation/CharacterAnimation";
import { directionVector, oppositeDirection } from "./../Direction/Direction";
import { Direction } from "../Direction/Direction";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { Subject } from "rxjs";
import { Position, WalkingAnimationMapping } from "../GridEngine";
import { Movement } from "../Movement/Movement";
import { Vector2 } from "../Utils/Vector2/Vector2";
import * as Phaser from "phaser";
import { GridSprite } from "../GridSprite/GridSprite";
import { Utils } from "../Utils/Utils/Utils";

export interface FrameRow {
  leftFoot: number;
  standing: number;
  rightFoot: number;
}

export type CharacterIndex = number;

export interface PositionChange {
  exitTile: Position;
  enterTile: Position;
  exitLayer: string;
  enterLayer: string;
}

export interface CharConfig {
  sprite: GridSprite;
  // sprite2: Phaser.GameObjects.Sprite;
  tilemap: GridTilemap;
  speed: number;
  collides: boolean;
  walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
  container?: Phaser.GameObjects.Container;
  offsetX?: number;
  offsetY?: number;
  charLayer?: string;
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
  private sprite: GridSprite;
  private sprite2: Phaser.GameObjects.Sprite;
  private container?: Phaser.GameObjects.Container;
  private speed: number;
  private movementStarted$ = new Subject<Direction>();
  private movementStopped$ = new Subject<Direction>();
  private directionChanged$ = new Subject<Direction>();
  private positionChangeStarted$ = new Subject<PositionChange>();
  private positionChangeFinished$ = new Subject<PositionChange>();
  private tilePositionSet$ = new Subject<LayerPosition>();
  private autoMovementSet$ = new Subject<Movement>();
  private lastMovementImpulse = Direction.NONE;
  private facingDirection: Direction = Direction.DOWN;
  private animation: CharacterAnimation;
  private movement: Movement;
  private characterIndex = -1;
  private walkingAnimationMapping: WalkingAnimationMapping;
  private collides: boolean;

  constructor(private id: string, config: CharConfig) {
    if (typeof config.walkingAnimationMapping == "number") {
      this.characterIndex = config.walkingAnimationMapping;
    } else {
      this.walkingAnimationMapping = config.walkingAnimationMapping;
    }

    this.container = config.container;
    this.tilemap = config.tilemap;
    this.speed = config.speed;
    this.collides = config.collides;
    this.customOffset = new Vector2(config.offsetX || 0, config.offsetY || 0);
    this._tilePos.layer = config.charLayer;

    this.sprite = config.sprite;
    // this.sprite2 = config.sprite2;
    this._setSprite(this.sprite);

    // this.sprite2.setOrigin(0, 0);
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

  getSprite(): GridSprite {
    return this.sprite;
  }

  setSprite(sprite: GridSprite): void {
    this._setSprite(sprite);
  }

  setMovement(movement: Movement): void {
    this.autoMovementSet$.next(movement);
    this.movement = movement;
  }

  getMovement(): Movement {
    return this.movement;
  }

  getCollides(): boolean {
    return this.collides;
  }

  setWalkingAnimationMapping(
    walkingAnimationMapping: WalkingAnimationMapping | number
  ): void {
    if (typeof walkingAnimationMapping == "number") {
      this.animation.setCharacterIndex(walkingAnimationMapping);
    } else {
      this.animation.setWalkingAnimationMapping(walkingAnimationMapping);
    }
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
    // this.nextTilePos = tilePosition;
    this.tilePos = tilePosition;
    this.setPosition(
      this.tilemap
        .tilePosToPixelPos(tilePosition.position)
        .add(this.getOffset())
        .add(this.customOffset)
    );
    this.updateZindex();
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
    // mirror sprite
    // this.sprite2.x = this.sprite.x;
    // this.sprite2.y = this.sprite.y;
    // this.sprite2.tint = this.sprite.tint;
    // this.sprite2.alpha = this.sprite.alpha;
    // this.sprite2.scale = this.sprite.scale;
    // this.sprite2.setFrame(this.sprite.frame.name);
    // this.sprite2.active = this.sprite.active;
    // this.sprite2.alphaBottomLeft = this.sprite.alphaBottomLeft;
    // this.sprite2.alphaBottomRight = this.sprite.alphaBottomRight;
    // this.sprite2.alphaTopLeft = this.sprite.alphaTopLeft;
    // this.sprite2.alphaTopRight = this.sprite.alphaTopRight;
    // this.sprite2.angle = this.sprite.angle;
  }

  getMovementDirection(): Direction {
    return this.movementDirection;
  }

  isBlockingDirection(direction: Direction): boolean {
    if (direction == Direction.NONE) return false;
    if (!this.collides) return false;
    const tilePosInDir = this.tilePosInDirection(direction);

    const layerInDirection =
      this.tilemap.getTransition(tilePosInDir, this.nextTilePos.layer) ||
      this.nextTilePos.layer;
    return this.tilemap.isBlocking(
      layerInDirection,
      tilePosInDir,
      oppositeDirection(this.tilemap.toMapDirection(direction))
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

  getFacingPosition(): Vector2 {
    return this._tilePos.position.add(directionVector(this.facingDirection));
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

  autoMovementSet(): Subject<Movement> {
    return this.autoMovementSet$;
  }

  isColliding(): boolean {
    return this.collides;
  }

  private _setSprite(sprite: GridSprite): void {
    sprite.x = this.sprite.x;
    sprite.y = this.sprite.y;
    this.sprite = sprite;
    this.animation = new CharacterAnimation(
      this.sprite.getRawSprite(),
      this.walkingAnimationMapping,
      this.characterIndex
    );

    this.animation.setIsEnabled(
      this.walkingAnimationMapping !== undefined || this.characterIndex !== -1
    );
    this.animation.setStandingFrame(Direction.DOWN);

    this.updateZindex();
  }

  private getOffset(): Vector2 {
    const offsetX =
      this.tilemap.getTileWidth() / 2 -
      Math.floor(this.sprite.getScaledWidth() / 2);
    const offsetY =
      -this.sprite.getScaledHeight() + this.tilemap.getTileHeight();
    return new Vector2(offsetX, offsetY);
  }

  private updateCharacterPosition(delta: number): void {
    const maxMovementForDelta = this.getSpeedPerDelta(delta);
    const distToNextTile = this.getDistToNextTile();
    const willCrossTileBorderThisUpdate =
      distToNextTile.length() <= maxMovementForDelta.length();

    const distToWalk = willCrossTileBorderThisUpdate
      ? distToNextTile
      : maxMovementForDelta;

    this.moveCharacterSprite(distToWalk);

    if (willCrossTileBorderThisUpdate) {
      if (this.shouldContinueMoving()) {
        this.fire(this.positionChangeFinished$, this.tilePos, this.nextTilePos);
        this.startMoving(this.lastMovementImpulse);

        this.updateCharacterPosition(
          delta * this.getProportionWalked(maxMovementForDelta, distToNextTile)
        );
      } else {
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

  private gameObject(): Phaser.GameObjects.Container | GridSprite {
    return this.container || this.sprite;
  }

  private updateZindex() {
    // get layer of top pos
    const trans =
      this.tilemap.getTransition(
        new Vector2({
          ...this.nextTilePos.position,
          y: this.nextTilePos.position.y - 1,
        }),
        this.nextTilePos.layer
      ) ||
      this.tilemap.getTransition(
        this.nextTilePos.position,
        this.nextTilePos.layer
      );

    const tilePosLayerDepth = this.tilemap.getDepthOfCharLayer(
      this.tilePos.layer
    );
    const nextTilePosLayerDepth = this.tilemap.getDepthOfCharLayer(
      this.nextTilePos.layer
    );
    const levelingUp = tilePosLayerDepth < nextTilePosLayerDepth;
    const levelingDown = tilePosLayerDepth > nextTilePosLayerDepth;

    const overlapUp =
      this.tilemap.getDepthOfCharLayer(this.nextTilePos.layer) <
      this.tilemap.getDepthOfCharLayer(trans);

    if (trans || overlapUp || levelingUp) {
      // this.sprite2.setDepth(
      //   this.tilemap.getDepthOfCharLayer(trans || this.nextTilePos.layer) +
      //     this.shiftPad(this.sprite2.y, 7)
      // );
      // this.sprite2.visible = true;
    } else {
      // this.sprite2.visible = false;
    }

    let layer = this.tilePos.layer;
    if (levelingDown) layer = this.nextTilePos.layer;
    this.gameObject().setDepth(
      this.tilemap.getDepthOfCharLayer(layer) +
        Utils.shiftPad(this.gameObject().y, 7)
    );
  }

  private setPosition(position: Vector2): void {
    this.gameObject().x = position.x;
    this.gameObject().y = position.y;
    // this.sprite.x = position.x;
    // this.sprite.y = position.y;
  }

  private getPosition(): Vector2 {
    return new Vector2(this.gameObject().x, this.gameObject().y);
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
    const newPlayerPos = this.getPosition().add(speed);
    this.setPosition(newPlayerPos);
    this.tileSizePixelsWalked = this.tileSizePixelsWalked
      .add(speed.abs())
      .modulo(this.tilemap.getTileDistance(this.movementDirection));

    this.animation.updateCharacterFrame(
      this.movementDirection,
      this.hasWalkedHalfATile()
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

  private hasWalkedHalfATile(): boolean {
    return (
      this.tileSizePixelsWalked.x >
        this.tilemap.getTileDistance(this.movementDirection).x / 2 ||
      this.tileSizePixelsWalked.y >
        this.tilemap.getTileDistance(this.movementDirection).y / 2
    );
  }

  private fire(
    subject: Subject<PositionChange>,
    { position: exitTile, layer: exitLayer }: LayerPosition,
    { position: enterTile, layer: enterLayer }: LayerPosition
  ): void {
    subject.next({ exitTile, enterTile, exitLayer, enterLayer });
  }
}
