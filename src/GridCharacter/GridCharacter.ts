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
import { Utils } from "../Utils/Utils/Utils";
import { SpriteUtils } from "../Utils/SpriteUtils/SpriteUtils";

type GameObject = Phaser.GameObjects.Container | Phaser.GameObjects.Sprite;

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
  sprite?: Phaser.GameObjects.Sprite;
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
  private sprite?: Phaser.GameObjects.Sprite;
  private layerOverlaySprite?: Phaser.GameObjects.Sprite;
  private container?: Phaser.GameObjects.Container;
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
  private characterIndex = -1;
  private walkingAnimationMapping?: WalkingAnimationMapping;
  private collidesWithTilesInternal: boolean;
  private collisionGroups: Set<string>;

  constructor(private id: string, config: CharConfig) {
    if (typeof config.walkingAnimationMapping == "number") {
      this.characterIndex = config.walkingAnimationMapping;
    } else {
      this.walkingAnimationMapping = config.walkingAnimationMapping;
    }
    this.container = config.container;
    this.tilemap = config.tilemap;
    this.speed = config.speed;
    this.collidesWithTilesInternal = config.collidesWithTiles;
    this.customOffset = new Vector2(config.offsetX || 0, config.offsetY || 0);
    this._tilePos.layer = config.charLayer;

    this.sprite = config.sprite;
    this.layerOverlaySprite = config.layerOverlaySprite;
    this.collisionGroups = new Set<string>(config.collisionGroups || []);

    if (this.sprite) {
      this._setSprite(this.sprite);
      if (this.layerOverlaySprite) {
        this.initLayerOverlaySprite();
      }
    }
  }

  private updateAnimationSprite() {
    if (!this.sprite) return;

    if (!this.animation) {
      this.animation = new CharacterAnimation(
        this.walkingAnimationMapping,
        this.characterIndex,
        this.sprite.texture.source[0].width /
          this.sprite.width /
          CharacterAnimation.FRAMES_CHAR_ROW
      );

      this.animation.frameChange().subscribe((frameNo) => {
        this.sprite?.setFrame(frameNo);
      });
    }

    this.animation.setIsEnabled(
      this.walkingAnimationMapping !== undefined || this.characterIndex !== -1
    );
    this.animation.setStandingFrame(Direction.DOWN);
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

  getSprite(): Phaser.GameObjects.Sprite | undefined {
    return this.sprite;
  }

  setSprite(sprite: Phaser.GameObjects.Sprite): void {
    this._setSprite(sprite);
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
    const gameObject = this.gameObject();
    if (gameObject) {
      this.setPosition(
        this.tilemap
          .tilePosToPixelPos(tilePosition.position)
          .add(this.getOffset())
          .add(this.customOffset),
        gameObject
      );
    }
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
      this.animation?.setStandingFrame(direction);
      this.directionChanged$.next(direction);
    } else {
      this.startMoving(direction);
    }
  }

  update(delta: number): void {
    this.movement?.update(delta);
    if (this.isMoving() && this.sprite) {
      this.updateCharacterPosition(delta);
      this.updateZindex();
    }
    this.lastMovementImpulse = Direction.NONE;

    if (this.layerOverlaySprite && this.sprite) {
      SpriteUtils.copyOverImportantProperties(
        this.sprite,
        this.layerOverlaySprite
      );
      this.layerOverlaySprite.x = this.sprite.x + (this.container?.x || 0);
      this.layerOverlaySprite.y = this.sprite.y + (this.container?.y || 0);
    }
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

  private _setSprite(sprite: Phaser.GameObjects.Sprite): void {
    sprite.setOrigin(0, 0);
    if (this.sprite) {
      sprite.x = this.sprite.x;
      sprite.y = this.sprite.y;
    }
    this.sprite = sprite;
    this.updateAnimationSprite();
    this.updateZindex();
  }

  private getOffset(): Vector2 {
    const offsetX =
      this.tilemap.getTileWidth() / 2 -
      Math.floor((this.sprite?.displayWidth ?? 0) / 2);
    const offsetY =
      -(this.sprite?.displayHeight ?? 0) + this.tilemap.getTileHeight();
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

    const gameObject = this.gameObject();
    if (gameObject) {
      this.moveCharacterSprite(distToWalk, gameObject);
    }

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

  private gameObject():
    | Phaser.GameObjects.Container
    | Phaser.GameObjects.Sprite
    | undefined {
    return this.container || this.sprite;
  }

  private updateZindex() {
    const gameObject = this.gameObject();
    if (!gameObject) return;
    this.setDepth(gameObject, this.nextTilePos);

    if (this.layerOverlaySprite) {
      const posAbove = new Vector2({
        ...this.nextTilePos.position,
        y: this.nextTilePos.position.y - 1,
      });
      this.setDepth(this.layerOverlaySprite, {
        position: posAbove,
        layer: this.nextTilePos.layer,
      });
    }
  }

  private setDepth(gameObject: GameObject, position: LayerPosition): void {
    gameObject.setDepth(
      this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(position)) +
        this.getPaddedPixelDepth(gameObject)
    );
  }

  private getPaddedPixelDepth(gameObject: GameObject): number {
    return Utils.shiftPad(gameObject.y + gameObject.displayHeight, 7);
  }

  private getTransitionLayer(position: LayerPosition): LayerName {
    return (
      this.tilemap.getTransition(position.position, position.layer) ||
      position.layer
    );
  }

  private setPosition(position: Vector2, gameObject: GameObject): void {
    gameObject.x = position.x;
    gameObject.y = position.y;
  }

  private getPosition(gameObject: GameObject): Vector2 {
    return new Vector2(gameObject.x, gameObject.y);
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

  private moveCharacterSprite(speed: Vector2, gameObject: GameObject): void {
    const newPlayerPos = this.getPosition(gameObject).add(speed);
    this.setPosition(newPlayerPos, gameObject);
    this.tileSizePixelsWalked = this.tileSizePixelsWalked.add(speed.abs());

    if (this.sprite) {
      this.animation?.updateCharacterFrame(
        this.movementDirection,
        this.hasWalkedHalfATile(),
        Number(this.sprite.frame.name)
      );
    }
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

  private initLayerOverlaySprite(): void {
    if (!this.layerOverlaySprite) return;
    if (!this.sprite) return;
    this.layerOverlaySprite.scale = this.sprite.scale;
    const scaledTileHeight =
      this.tilemap.getTileHeight() / this.layerOverlaySprite.scale;
    this.layerOverlaySprite.setCrop(
      0,
      0,
      this.layerOverlaySprite.displayWidth,
      this.sprite.height - scaledTileHeight
    );
    this.layerOverlaySprite.setOrigin(0, 0);
  }
}
