import { DirectionVectors } from "./../Direction/Direction";
import { Direction } from "../Direction/Direction";
import * as Phaser from "phaser";
import { GridTilemap } from "../GridTilemap/GridTilemap";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

interface FrameRow {
  leftFoot: number;
  standing: number;
  rightFoot: number;
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

  constructor(
    private id: string,
    private sprite: Phaser.GameObjects.Sprite,
    private characterIndex: number,
    private tileSize: number,
    private tilemap: GridTilemap,
    private speed: number
  ) {
    this.sprite.setFrame(this.framesOfDirection(Direction.DOWN).standing);
    this.speedPixelsPerSecond = this.tileSize * speed;
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

  setTilePosition(tilePosition: Phaser.Math.Vector2): void {
    if (this.isMoving()) return;
    this.tilePos = tilePosition.clone();
    this.updateZindex();
    this.sprite.setPosition(
      tilePosition.x * this.tileSize + this.playerOffsetX(),
      tilePosition.y * this.tileSize + this.playerOffsetY()
    );
  }

  getTilePos(): Phaser.Math.Vector2 {
    return this.tilePos.clone();
  }

  move(direction: Direction): void {
    if (this.isMoving()) return;
    if (this.isBlockingDirection(direction)) {
      this.setStandingFrame(direction);
    } else {
      this.startMoving(direction);
    }
  }

  update(delta: number): void {
    if (this.isMoving()) {
      this.updateCharacterPosition(delta);
    }
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

  private get tilePos() {
    return this._tilePos.clone();
  }

  private set tilePos(newTilePos: Phaser.Math.Vector2) {
    this._tilePos.x = newTilePos.x;
    this._tilePos.y = newTilePos.y;
    this.updateZindex();
  }

  private updateZindex() {
    this.sprite.setDepth(GridTilemap.FIRST_PLAYER_LAYER + this.tilePos.y);
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
    this.sprite.setPosition(position.x, position.y);
  }

  private getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getCenter();
  }

  private isCurrentFrameStanding(direction: Direction): boolean {
    return (
      Number(this.sprite.frame.name) ==
      this.framesOfDirection(direction).standing
    );
  }

  private playerOffsetX(): number {
    return this.tileSize / 2;
  }
  private playerOffsetY(): number {
    return -(this.sprite.height % this.tileSize) / 2;
  }

  private framesOfDirection(direction: Direction): FrameRow {
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
    this.tilePos = this.tilePos.add(DirectionVectors[direction]);
    this.movementDirection = direction;
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.getTilePos().add(DirectionVectors[direction]);
  }

  private updateCharacterPosition(delta: number): void {
    const pixelsToWalkThisUpdate = this.getIntegerPart(
      this.getSpeedPerDelta(delta)
    );

    if (this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.moveCharacterSpriteRestOfTile();
    } else {
      this.moveCharacterSprite(pixelsToWalkThisUpdate);
    }
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
    this.stopMoving();
  }

  private moveCharacterSprite(speed: number): void {
    const newPlayerPos = this.getPosition().add(this.movementDistance(speed));
    this.setPosition(newPlayerPos);
    this.tileSizePixelsWalked = this.tileSizePixelsWalked + speed;
    this.updateCharacterFrame(this.tileSizePixelsWalked);
    this.tileSizePixelsWalked = this.tileSizePixelsWalked % this.tileSize;
  }

  private stopMoving(): void {
    this.movementDirection = Direction.NONE;
  }

  private movementDistance(speed: number): Vector2 {
    return DirectionVectors[this.movementDirection]
      .clone()
      .multiply(new Vector2(speed));
  }

  private getIntegerPart(float: number): number {
    return Math.floor(float);
  }

  private getDecimalPlaces(float: number): number {
    return float % 1;
  }

  private updateCharacterFrame(tileSizePixelsWalked: number): void {
    if (this.hasWalkedHalfATile(tileSizePixelsWalked)) {
      this.setStandingFrame(this.movementDirection);
    } else {
      this.setWalkingFrame(this.movementDirection);
    }
  }

  private hasWalkedHalfATile(tileSizePixelsWalked: number): boolean {
    return tileSizePixelsWalked > this.tileSize / 2;
  }
}
