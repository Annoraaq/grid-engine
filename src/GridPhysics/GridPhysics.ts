import { Direction } from "../Direction/Direction";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import { TileSizePerSecond } from "../GridMovementPlugin";
import * as Phaser from "phaser";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export class GridPhysics {
  private movementDirection: Map<string, Direction>;
  private readonly speedPixelsPerSecond: number;
  private tileSizePixelsWalked: number = 0;
  private decimalPlacesLeft = 0;
  private characters: Map<string, GridCharacter>;
  private movementDirectionVectors: {
    [key in Direction]?: Vector2;
  } = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
  };

  constructor(
    characters: GridCharacter[],
    private tileMap: Phaser.Tilemaps.Tilemap,
    private tileSize: number,
    private speed: TileSizePerSecond
  ) {
    this.speedPixelsPerSecond = this.tileSize * this.speed;
    this.characters = new Map(characters.map((char) => [char.getId(), char]));
    this.movementDirection = new Map(
      characters.map((char) => [char.getId(), Direction.NONE])
    );
  }

  moveCharacter(characterId: string, direction: Direction): void {
    if (!this.characters.has(characterId)) return;
    if (this.isMoving(characterId)) return;
    if (this.isBlockingDirection(characterId, direction)) {
      this.characters.get(characterId).setStandingFrame(direction);
    } else {
      this.startMoving(characterId, direction);
    }
  }

  update(delta: number): void {
    [...this.characters.keys()].forEach((characterId) => {
      if (this.isMoving(characterId)) {
        this.updateCharacterPosition(characterId, delta);
      }
    });
  }

  getMovementDirection(characterId: string): Direction {
    return this.movementDirection.get(characterId);
  }

  private isMoving(characterId: string): boolean {
    return this.movementDirection.get(characterId) != Direction.NONE;
  }

  private startMoving(characterId: string, direction: Direction): void {
    this.movementDirection.set(characterId, direction);
  }

  private tilePosInDirection(
    characterId: string,
    direction: Direction
  ): Vector2 {
    return this.characters
      .get(characterId)
      .getTilePos()
      .add(this.movementDirectionVectors[direction]);
  }

  private isBlockingDirection(
    characterId: string,
    direction: Direction
  ): boolean {
    return this.hasBlockingTile(
      this.tilePosInDirection(characterId, direction)
    );
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

  private updateCharacterPosition(characterId: string, delta: number): void {
    const pixelsToWalkThisUpdate = this.getIntegerPart(
      this.getSpeedPerDelta(delta) + this.decimalPlacesLeft
    );
    this.decimalPlacesLeft = this.getDecimalPlaces(
      this.getSpeedPerDelta(delta) + this.decimalPlacesLeft
    );

    if (this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.moveCharacterSpriteRestOfTile(characterId);
    } else {
      this.moveCharacterSprite(characterId, pixelsToWalkThisUpdate);
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

  private moveCharacterSpriteRestOfTile(characterId: string): void {
    this.moveCharacterSprite(
      characterId,
      this.tileSize - this.tileSizePixelsWalked
    );
    this.stopMoving(characterId);
  }

  private moveCharacterSprite(characterId: string, speed: number): void {
    const newPlayerPos = this.characters
      .get(characterId)
      .getPosition()
      .add(this.movementDistance(characterId, speed));
    this.characters.get(characterId).setPosition(newPlayerPos);
    this.tileSizePixelsWalked += speed;
    this.updateCharacterFrame(characterId, this.tileSizePixelsWalked);
    this.tileSizePixelsWalked %= this.tileSize;
  }

  private updateCharacterFrame(
    characterId: string,
    tileSizePixelsWalked: number
  ): void {
    if (this.hasWalkedHalfATile(tileSizePixelsWalked)) {
      this.characters
        .get(characterId)
        .setStandingFrame(this.movementDirection.get(characterId));
    } else {
      this.characters
        .get(characterId)
        .setWalkingFrame(this.movementDirection.get(characterId));
    }
  }

  private hasWalkedHalfATile(tileSizePixelsWalked: number): boolean {
    return tileSizePixelsWalked > this.tileSize / 2;
  }

  private stopMoving(characterId: string): void {
    this.movementDirection.set(characterId, Direction.NONE);
  }

  private movementDistance(characterId: string, speed: number): Vector2 {
    return this.movementDirectionVectors[
      this.movementDirection.get(characterId)
    ]
      .clone()
      .multiply(new Vector2(speed));
  }
}
