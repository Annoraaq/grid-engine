import { Direction } from "../Direction/Direction";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import { TileSizePerSecond } from "../GridMovementPlugin";
import * as Phaser from "phaser";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export class GridPhysics {
  private movementDirection = Direction.NONE;
  private readonly speedPixelsPerSecond: number;
  private tileSizePixelsWalked = 0;
  private decimalPlacesLeft = 0;
  private movementDirectionVectors: {
    [key in Direction]?: Vector2;
  } = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
  };

  constructor(
    private character: GridCharacter,
    private tileMap: Phaser.Tilemaps.Tilemap,
    private tileSize: number,
    private speed: TileSizePerSecond
  ) {
    this.speedPixelsPerSecond = this.tileSize * this.speed;
  }

  moveCharacter(direction: Direction): void {
    if (this.isMoving()) return;
    if (this.isBlockingDirection(direction)) {
      this.character.setStandingFrame(direction);
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

  private isMoving(): boolean {
    return this.movementDirection != Direction.NONE;
  }

  private startMoving(direction: Direction): void {
    this.movementDirection = direction;
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.character
      .getTilePos()
      .add(this.movementDirectionVectors[direction]);
  }

  private isBlockingDirection(direction: Direction): boolean {
    return this.hasBlockingTile(this.tilePosInDirection(direction));
  }

  private hasNoTile(pos: Vector2): boolean {
    return !this.tileMap.layers.some((layer) =>
      this.tileMap.hasTileAt(pos.x, pos.y, layer.name)
    );
  }

  private hasBlockingTile(pos: Vector2): boolean {
    if (this.hasNoTile(pos)) return true;
    return this.tileMap.layers.some((layer) => {
      const tile = this.tileMap.getTileAt(pos.x, pos.y, false, layer.name);
      return tile && tile.properties.collides;
    });
  }

  private updateCharacterPosition(delta: number): void {
    const pixelsToWalkThisUpdate = this.getIntegerPart(
      this.getSpeedPerDelta(delta) + this.decimalPlacesLeft
    );
    this.decimalPlacesLeft = this.getDecimalPlaces(
      this.getSpeedPerDelta(delta) + this.decimalPlacesLeft
    );

    if (this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.moveCharacterSpriteRestOfTile();
    } else {
      this.moveCharacterSprite(pixelsToWalkThisUpdate);
    }
  }

  private getIntegerPart(float: number): number {
    return Math.floor(float);
  }

  private getDecimalPlaces(float: number): number {
    return float % 1;
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
    const newPlayerPos = this.character
      .getPosition()
      .add(this.movementDistance(speed));
    this.character.setPosition(newPlayerPos);
    this.tileSizePixelsWalked = this.tileSizePixelsWalked + speed;
    this.updateCharacterFrame(this.tileSizePixelsWalked);
    this.tileSizePixelsWalked = this.tileSizePixelsWalked % this.tileSize;
  }

  private updateCharacterFrame(tileSizePixelsWalked: number): void {
    if (this.hasWalkedHalfATile(tileSizePixelsWalked)) {
      this.character.setStandingFrame(this.movementDirection);
    } else {
      this.character.setWalkingFrame(this.movementDirection);
    }
  }

  private hasWalkedHalfATile(tileSizePixelsWalked: number): boolean {
    return tileSizePixelsWalked > this.tileSize / 2;
  }

  private stopMoving(): void {
    this.movementDirection = Direction.NONE;
  }

  private movementDistance(speed: number): Vector2 {
    return this.movementDirectionVectors[this.movementDirection]
      .clone()
      .multiply(new Vector2(speed));
  }
}
