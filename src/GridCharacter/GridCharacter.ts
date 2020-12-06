import { Direction } from "../Direction/Direction";
import { GridPhysics } from "../GridPhysics/GridPhysics";

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

  private gridPhysics: GridPhysics;

  lastFootLeft = false;

  constructor(
    private id: string,
    private sprite: Phaser.GameObjects.Sprite,
    private characterIndex: number,
    private tileSize: number,
    tilemap: Phaser.Tilemaps.Tilemap,
    speed: number
  ) {
    this.sprite.setFrame(this.framesOfDirection(Direction.DOWN).standing);
    this.gridPhysics = new GridPhysics(this, tilemap, tileSize, speed);
  }

  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getCenter();
  }

  getId(): string {
    return this.id;
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

  moveCharacter(direction: Direction): void {
    this.gridPhysics.moveCharacter(direction);
  }

  update(delta: number): void {
    this.gridPhysics.update(delta);
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
}
