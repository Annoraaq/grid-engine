import { Direction } from "./../../Direction/Direction.js";
import { WalkingAnimationMapping } from "../../GridEngine.js";
import { Observable, Subject } from "rxjs";

export type CharacterIndex = number;

/** Frame numbers for one movement direction */
export interface FrameRow {
  /** Frame number for animation frame with left foot in front */
  leftFoot: number;

  /** Frame number for animation frame standing (no foot in front) */
  standing: number;

  /** Frame number for animation frame with right foot in front */
  rightFoot: number;
}

export class CharacterAnimation {
  static readonly FRAMES_CHAR_ROW = 3;
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
  private frameChange$ = new Subject<number>();

  constructor(
    private walkingAnimationMapping:
      | WalkingAnimationMapping
      | number
      | undefined,
    private charsInRow: number,
  ) {
    this.setWalkingAnimationMapping(walkingAnimationMapping);
  }

  frameChange(): Observable<number> {
    return this.frameChange$;
  }

  setIsEnabled(isEnabled: boolean): void {
    this._isEnabled = isEnabled;
  }

  isEnabled(): boolean {
    return this._isEnabled;
  }

  updateCharacterFrame(
    movementDirection: Direction,
    hasWalkedHalfATile: boolean,
    currentFrame: number,
  ): void {
    if (this._isEnabled) {
      if (hasWalkedHalfATile) {
        this.setStandingFrameDuringWalk(movementDirection, currentFrame);
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
    walkingAnimationMapping?: WalkingAnimationMapping | number,
  ): void {
    this.walkingAnimationMapping = walkingAnimationMapping;
    this._isEnabled = this.walkingAnimationMapping !== undefined;
  }

  getWalkingAnimationMapping(): WalkingAnimationMapping | number | undefined {
    return this.walkingAnimationMapping;
  }

  getCharsInRow(): number {
    return this.charsInRow;
  }

  private setStandingFrameDuringWalk(
    direction: Direction,
    currentFrame: number,
  ): void {
    if (!this.isCurrentFrameStanding(direction, currentFrame)) {
      this.lastFootLeft = !this.lastFootLeft;
    }
    this._setStandingFrame(direction);
  }

  private setWalkingFrame(direction: Direction): void {
    const frameRow = this.framesOfDirection(direction);
    if (frameRow)
      this.frameChange$.next(
        this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot,
      );
  }

  private _setStandingFrame(direction: Direction): void {
    const framesOfDirection = this.framesOfDirection(direction);
    if (framesOfDirection) {
      this.frameChange$.next(framesOfDirection.standing);
    }
  }

  private isCurrentFrameStanding(
    direction: Direction,
    currentFrame: number,
  ): boolean {
    return currentFrame === this.framesOfDirection(direction)?.standing;
  }

  private framesOfDirection(direction: Direction): FrameRow | undefined {
    if (typeof this.walkingAnimationMapping === "number") {
      return this.getFramesForCharIndex(
        direction,
        this.walkingAnimationMapping,
      );
    }
    return this.getFramesForAnimationMapping(direction);
  }

  private getFramesForAnimationMapping(
    direction: Direction,
  ): FrameRow | undefined {
    if (!this.walkingAnimationMapping) return;
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

  private getFramesForCharIndex(
    direction: Direction,
    characterIndex: number,
  ): FrameRow {
    const playerCharRow = Math.floor(characterIndex / this.charsInRow);
    const playerCharCol = characterIndex % this.charsInRow;
    const framesInRow = this.charsInRow * CharacterAnimation.FRAMES_CHAR_ROW;
    const framesInSameRowBefore =
      CharacterAnimation.FRAMES_CHAR_ROW * playerCharCol;
    const rows =
      (this.directionToFrameRow[direction] ?? 0) +
      playerCharRow * CharacterAnimation.FRAMES_CHAR_COL;
    const startFrame = framesInSameRowBefore + rows * framesInRow;
    return {
      rightFoot: startFrame,
      standing: startFrame + 1,
      leftFoot: startFrame + 2,
    };
  }
}
