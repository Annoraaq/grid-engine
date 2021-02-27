import { DirectionVectors } from "./../Direction/Direction";
import { Direction } from "../Direction/Direction";
import * as Phaser from "phaser";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { WalkingAnimationMapping } from "../GridMovementPlugin";
import { Subject } from "rxjs";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export interface FrameRow {
  leftFoot: number;
  standing: number;
  rightFoot: number;
}

export type CharacterIndex = number;

export interface CharConfig {
  sprite: Phaser.GameObjects.Sprite;
  tilemap: GridTilemap;
  tileSize: number;
  speed: number;
  walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
  walkingAnimationEnabled: boolean;
  container?: Phaser.GameObjects.Container;
}

export class GridCharacter {
  private static readonly FRAMES_CHAR_ROW = 3;
  private static readonly FRAMES_CHAR_COL = 4;
  private directionToFrameRow: { [key in Direction]?: number } = {
    [Direction.DOWN]: 0,
    [Direction.LEFT]: 1,
    [Direction.RIGHT]: 2,
    [Direction.UP]: 3,
  };
  private movementDirection = Direction.NONE;
  private readonly speedPixelsPerSecond: number;
  private tileSizePixelsWalked = 0;
  private lastFootLeft = false;
  private readonly _tilePos = new Phaser.Math.Vector2(0, 0);
  private sprite: Phaser.GameObjects.Sprite;
  private container: Phaser.GameObjects.Container;
  private tilemap: GridTilemap;
  private tileSize: number;
  private speed: number;
  private characterIndex = 0;
  private walkingAnimationMapping: WalkingAnimationMapping;
  private walkingAnimation: boolean;
  private movementStarted$ = new Subject<Direction>();
  private movementStopped$ = new Subject<Direction>();
  private directionChanged$ = new Subject<Direction>();
  private lastMovementImpulse = Direction.NONE;

  constructor(private id: string, config: CharConfig) {
    if (typeof config.walkingAnimationMapping == "number") {
      this.characterIndex = config.walkingAnimationMapping;
    } else {
      this.walkingAnimationMapping = config.walkingAnimationMapping;
    }

    this.sprite = config.sprite;
    this.sprite.setOrigin(0, 0);
    this.container = config.container;
    this.tilemap = config.tilemap;
    this.tileSize = config.tileSize;
    this.speed = config.speed;
    this.walkingAnimation = config.walkingAnimationEnabled;

    if (this.walkingAnimation) {
      this.sprite.setFrame(this.framesOfDirection(Direction.DOWN).standing);
    }
    this.speedPixelsPerSecond = this.tileSize * this.speed;
    this.updateZindex();
  }

  getId(): string {
    return this.id;
  }

  getSpeed(): number {
    return this.speed;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  setWalkingAnimationMapping(walkingAnimationMapping: WalkingAnimationMapping) {
    this.walkingAnimationMapping = walkingAnimationMapping;
  }

  setTilePosition(tilePosition: Phaser.Math.Vector2): void {
    if (this.isMoving()) return;

    const offsetX =
      this.tileSize / 2 -
      Math.floor((this.sprite.width * this.sprite.scale) / 2);
    const offsetY = -(this.sprite.height * this.sprite.scale) + this.tileSize;

    this.tilePos = tilePosition;
    this.updateZindex();
    this.setPosition(
      new Vector2(
        tilePosition.x * this.tileSize + offsetX,
        tilePosition.y * this.tileSize + offsetY
      )
    );
  }

  getTilePos(): Phaser.Math.Vector2 {
    return this.tilePos;
  }

  move(direction: Direction): void {
    this.lastMovementImpulse = direction;
    if (direction == Direction.NONE) return;
    if (this.isMoving()) return;
    if (this.isBlockingDirection(direction)) {
      if (this.walkingAnimation) {
        this.setStandingFrame(direction);
      }
      this.directionChanged$.next(direction);
    } else {
      this.startMoving(direction);
    }
  }

  update(delta: number): void {
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
    return (
      this.tilemap.hasBlockingTile(this.tilePosInDirection(direction)) ||
      this.tilemap.hasBlockingChar(this.tilePosInDirection(direction))
    );
  }

  isMoving(): boolean {
    return this.movementDirection != Direction.NONE;
  }

  turnTowards(direction: Direction) {
    if (this.isMoving()) return;
    if (direction == Direction.NONE) return;
    if (this.walkingAnimation) {
      this.sprite.setFrame(this.framesOfDirection(direction).standing);
    }
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

  private get tilePos() {
    return this._tilePos.clone();
  }

  private set tilePos(newTilePos: Phaser.Math.Vector2) {
    this._tilePos.x = newTilePos.x;
    this._tilePos.y = newTilePos.y;
  }

  private updateZindex() {
    const gameObject = this.container || this.sprite;
    gameObject.setDepth(GridTilemap.FIRST_PLAYER_LAYER + this.tilePos.y);
  }

  private setStandingFrame(direction: Direction): void {
    if (!this.isCurrentFrameStanding(direction)) {
      this.lastFootLeft = !this.lastFootLeft;
    }
    this.sprite.setFrame(this.framesOfDirection(direction).standing);
  }

  private setWalkingFrame(direction: Direction): void {
    const frameRow = this.framesOfDirection(direction);
    this.sprite.setFrame(
      this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot
    );
  }

  private setPosition(position: Phaser.Math.Vector2): void {
    const gameObject = this.container || this.sprite;
    gameObject.x = position.x;
    gameObject.y = position.y;
  }

  private getPosition(): Phaser.Math.Vector2 {
    const gameObject = this.container || this.sprite;
    return new Phaser.Math.Vector2(gameObject.x, gameObject.y);
  }

  private isCurrentFrameStanding(direction: Direction): boolean {
    return (
      Number(this.sprite.frame.name) ==
      this.framesOfDirection(direction).standing
    );
  }

  private framesOfDirection(direction: Direction): FrameRow {
    if (this.walkingAnimationMapping) {
      return this.getFramesForAnimationMapping(direction);
    }
    return this.getFramesForCharIndex(direction);
  }

  private getFramesForAnimationMapping(direction: Direction): FrameRow {
    return this.walkingAnimationMapping[direction];
  }

  private getFramesForCharIndex(direction: Direction): FrameRow {
    const charsInRow =
      this.sprite.texture.source[0].width /
      this.sprite.width /
      GridCharacter.FRAMES_CHAR_ROW;
    const playerCharRow = Math.floor(this.characterIndex / charsInRow);
    const playerCharCol = this.characterIndex % charsInRow;
    const framesInRow = charsInRow * GridCharacter.FRAMES_CHAR_ROW;
    const framesInSameRowBefore = GridCharacter.FRAMES_CHAR_ROW * playerCharCol;
    const rows =
      this.directionToFrameRow[direction] +
      playerCharRow * GridCharacter.FRAMES_CHAR_COL;
    const startFrame = framesInSameRowBefore + rows * framesInRow;
    return {
      rightFoot: startFrame,
      standing: startFrame + 1,
      leftFoot: startFrame + 2,
    };
  }

  private startMoving(direction: Direction): void {
    this.movementStarted$.next(direction);
    this.movementDirection = direction;
    this.updateTilePos();
  }

  private updateTilePos() {
    this.tilePos = this.tilePos.add(DirectionVectors[this.movementDirection]);
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.getTilePos().add(DirectionVectors[direction]);
  }

  private updateCharacterPosition(delta: number): void {
    const pixelsToWalkThisUpdate = this.getSpeedPerDelta(delta);

    if (!this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.moveCharacterSprite(pixelsToWalkThisUpdate);
    } else if (this.shouldContinueMoving()) {
      this.moveCharacterSprite(pixelsToWalkThisUpdate);
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

  private getSpeedPerDelta(delta: number): number {
    const deltaInSeconds = delta / 1000;
    return this.speedPixelsPerSecond * deltaInSeconds;
  }

  private willCrossTileBorderThisUpdate(
    pixelsToWalkThisUpdate: number
  ): boolean {
    return this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= this.tileSize;
  }

  private moveCharacterSpriteRestOfTile(): void {
    this.moveCharacterSprite(this.tileSize - this.tileSizePixelsWalked);
  }

  private moveCharacterSprite(speed: number): void {
    const newPlayerPos = this.getPosition().add(this.movementDistance(speed));
    this.setPosition(newPlayerPos);
    this.tileSizePixelsWalked = this.tileSizePixelsWalked + speed;
    if (this.walkingAnimation) {
      this.updateCharacterFrame();
    }
    this.tileSizePixelsWalked = this.tileSizePixelsWalked % this.tileSize;
    if (this.hasWalkedHalfATile()) {
      this.updateZindex();
    }
  }

  private stopMoving(): void {
    this.movementStopped$.next(this.movementDirection);
    this.movementDirection = Direction.NONE;
  }

  private movementDistance(speed: number): Vector2 {
    return DirectionVectors[this.movementDirection]
      .clone()
      .multiply(new Vector2(speed));
  }

  private updateCharacterFrame(): void {
    if (this.hasWalkedHalfATile()) {
      this.setStandingFrame(this.movementDirection);
    } else {
      this.setWalkingFrame(this.movementDirection);
    }
  }

  private hasWalkedHalfATile(): boolean {
    return this.tileSizePixelsWalked > this.tileSize / 2;
  }
}
