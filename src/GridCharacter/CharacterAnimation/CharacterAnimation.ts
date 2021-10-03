import { Direction } from "./../../Direction/Direction";
import { FrameRow } from "./../GridCharacter";
import { WalkingAnimationMapping } from "../../GridEngine";

export class CharacterAnimation {
  private static readonly FRAMES_CHAR_ROW = 3;
  private static readonly FRAMES_CHAR_COL = 4;
  private lastFootLeft = false;
  private directionToFrameRow: { [key in Direction]?: number } = {
    [Direction.DOWN]: 0,
    [Direction.DOWN_LEFT]: 1,
    [Direction.DOWN_RIGHT]: 2,
    [Direction.LEFT]: 1,
    [Direction.RIGHT]: 2,
    [Direction.UP]: 3,
    [Direction.UP_LEFT]: 1,
    [Direction.UP_RIGHT]: 2,
  };
  private _isEnabled = true;

  constructor(
    private sprite: Phaser.GameObjects.Sprite,
    private walkingAnimationMapping: WalkingAnimationMapping | undefined,
    private characterIndex: number
  ) {}

  setIsEnabled(isEnabled: boolean): void {
    this._isEnabled = isEnabled;
  }

  isEnabled(): boolean {
    return this._isEnabled;
  }

  updateCharacterFrame(
    movementDirection: Direction,
    hasWalkedHalfATile: boolean
  ): void {
    if (this._isEnabled) {
      if (hasWalkedHalfATile) {
        this.setStandingFrameDuringWalk(movementDirection);
      } else {
        this.setWalkingFrame(movementDirection);
      }
    }
  }

  setStandingFrame(direction: Direction): void {
    if (this._isEnabled) {
      this._setStandingFrame(direction);
    }
  }

  setWalkingAnimationMapping(
    walkingAnimationMapping: WalkingAnimationMapping
  ): void {
    this.walkingAnimationMapping = walkingAnimationMapping;
    this._isEnabled = this.walkingAnimationMapping !== undefined;
  }

  setCharacterIndex(characterIndex: number): void {
    this.characterIndex = characterIndex;
    this._isEnabled = this.characterIndex !== -1;
  }

  getWalkingAnimationMapping(): WalkingAnimationMapping | undefined {
    return this.walkingAnimationMapping;
  }

  getCharacterIndex(): number {
    return this.characterIndex;
  }

  private setStandingFrameDuringWalk(direction: Direction): void {
    if (!this.isCurrentFrameStanding(direction)) {
      this.lastFootLeft = !this.lastFootLeft;
    }
    this._setStandingFrame(direction);
  }

  private setWalkingFrame(direction: Direction): void {
    const frameRow = this.framesOfDirection(direction);
    this.sprite.setFrame(
      this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot
    );
  }

  private _setStandingFrame(direction: Direction): void {
    this.sprite.setFrame(this.framesOfDirection(direction).standing);
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
    return (
      this.walkingAnimationMapping[direction] ||
      this.walkingAnimationMapping[this.fallbackDirection(direction)]
    );
  }

  private fallbackDirection(direction: Direction): Direction {
    switch (direction) {
      case Direction.DOWN_LEFT:
        return Direction.LEFT;
      case Direction.DOWN_RIGHT:
        return Direction.RIGHT;
      case Direction.UP_LEFT:
        return Direction.LEFT;
      case Direction.UP_RIGHT:
        return Direction.RIGHT;
    }

    return direction;
  }

  private getFramesForCharIndex(direction: Direction): FrameRow {
    const charsInRow =
      this.sprite.texture.source[0].width /
      this.sprite.width /
      CharacterAnimation.FRAMES_CHAR_ROW;
    const playerCharRow = Math.floor(this.characterIndex / charsInRow);
    const playerCharCol = this.characterIndex % charsInRow;
    const framesInRow = charsInRow * CharacterAnimation.FRAMES_CHAR_ROW;
    const framesInSameRowBefore =
      CharacterAnimation.FRAMES_CHAR_ROW * playerCharCol;
    const rows =
      this.directionToFrameRow[direction] +
      playerCharRow * CharacterAnimation.FRAMES_CHAR_COL;
    const startFrame = framesInSameRowBefore + rows * framesInRow;
    return {
      rightFoot: startFrame,
      standing: startFrame + 1,
      leftFoot: startFrame + 2,
    };
  }
}
