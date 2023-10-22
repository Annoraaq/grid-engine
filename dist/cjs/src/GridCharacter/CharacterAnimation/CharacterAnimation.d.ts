import { Direction } from "./../../Direction/Direction.js";
import { WalkingAnimationMapping } from "../../GridEngine.js";
import { Observable } from "rxjs";
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
export declare class CharacterAnimation {
    private walkingAnimationMapping;
    private charsInRow;
    static readonly FRAMES_CHAR_ROW = 3;
    private static readonly FRAMES_CHAR_COL;
    private lastFootLeft;
    private directionToFrameRow;
    private _isEnabled;
    private frameChange$;
    constructor(walkingAnimationMapping: WalkingAnimationMapping | number | undefined, charsInRow: number);
    frameChange(): Observable<number>;
    setIsEnabled(isEnabled: boolean): void;
    isEnabled(): boolean;
    updateCharacterFrame(movementDirection: Direction, hasWalkedHalfATile: boolean, currentFrame: number): void;
    setStandingFrame(direction: Direction): void;
    setWalkingAnimationMapping(walkingAnimationMapping?: WalkingAnimationMapping | number): void;
    getWalkingAnimationMapping(): WalkingAnimationMapping | number | undefined;
    getCharsInRow(): number;
    private setStandingFrameDuringWalk;
    private setWalkingFrame;
    private _setStandingFrame;
    private isCurrentFrameStanding;
    private framesOfDirection;
    private getFramesForAnimationMapping;
    private fallbackDirection;
    private getFramesForCharIndex;
}
