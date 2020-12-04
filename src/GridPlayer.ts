import { Grid } from "matter";
import { Direction } from "./Direction";

interface FrameRow {
  leftFoot: number;
  standing: number;
  rightFoot: number;
}

export class GridPlayer {
  private static readonly FRAMES_CHAR_ROW = 3;
  private static readonly FRAMES_CHAR_COL = 4;
  private directionToFrameRow: { [key in Direction]?: number } = {
    [Direction.DOWN]: 0,
    [Direction.LEFT]: 1,
    [Direction.RIGHT]: 2,
    [Direction.UP]: 3,
  };
  private charsInRow: number;

  public lastFootLeft = false;

  constructor(
    private sprite: Phaser.GameObjects.Sprite,
    private characterIndex: number,
    private tileSize: number
  ) {
    this.charsInRow =
      this.sprite.texture.source[0].width /
      this.sprite.width /
      GridPlayer.FRAMES_CHAR_ROW;
    this.sprite.setFrame(this.framesOfDirection(Direction.DOWN).standing);
  }

  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getCenter();
  }

  setTilePosition(tilePosition: Phaser.Math.Vector2): void {
    this.sprite.setPosition(
      tilePosition.x * this.tileSize + this.playerOffsetX(),
      tilePosition.y * this.tileSize + this.playerOffsetY()
    );
  }

  setPosition(position: Phaser.Math.Vector2): void {
    this.sprite.setPosition(position.x, position.y);
  }

  setWalkingFrame(direction: Direction): void {
    const frameRow = this.framesOfDirection(direction);
    this.sprite.setFrame(
      this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot
    );
  }

  setStandingFrame(direction: Direction): void {
    if (this.isCurrentFrameStanding(direction)) {
      this.lastFootLeft = !this.lastFootLeft;
    }
    this.sprite.setFrame(this.framesOfDirection(direction).standing);
  }

  getTilePos(): Phaser.Math.Vector2 {
    const x =
      (this.sprite.getCenter().x - this.playerOffsetX()) / this.tileSize;
    const y =
      (this.sprite.getCenter().y - this.playerOffsetY()) / this.tileSize;
    return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y));
  }

  private isCurrentFrameStanding(direction: Direction): boolean {
    return (
      Number(this.sprite.frame.name) !=
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
    const playerCharRow = Math.floor(this.characterIndex / this.charsInRow);
    const playerCharCol = this.characterIndex % this.charsInRow;
    const framesInRow = this.charsInRow * GridPlayer.FRAMES_CHAR_ROW;
    const framesInSameRowBefore = GridPlayer.FRAMES_CHAR_ROW * playerCharCol;
    const rows =
      this.directionToFrameRow[direction] +
      playerCharRow * GridPlayer.FRAMES_CHAR_COL;
    const startFrame = framesInSameRowBefore + rows * framesInRow;
    return {
      leftFoot: startFrame,
      standing: startFrame + 1,
      rightFoot: startFrame + 2,
    };
  }
}
