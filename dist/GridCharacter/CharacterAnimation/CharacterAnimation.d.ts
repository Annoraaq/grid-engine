import { Direction } from "./../../Direction/Direction";
import { WalkingAnimationMapping } from "../../GridEngine";
export declare class CharacterAnimation {
    private sprite;
    private walkingAnimationMapping;
    private characterIndex;
    private static readonly FRAMES_CHAR_ROW;
    private static readonly FRAMES_CHAR_COL;
    private lastFootLeft;
    private directionToFrameRow;
    private _isEnabled;
    constructor(sprite: Phaser.GameObjects.Sprite, walkingAnimationMapping: WalkingAnimationMapping | undefined, characterIndex: number);
    setIsEnabled(isEnabled: boolean): void;
    isEnabled(): boolean;
    updateCharacterFrame(movementDirection: Direction, hasWalkedHalfATile: boolean): void;
    setStandingFrame(direction: Direction): void;
    setWalkingAnimationMapping(walkingAnimationMapping: WalkingAnimationMapping): void;
    setCharacterIndex(characterIndex: number): void;
    getWalkingAnimationMapping(): WalkingAnimationMapping | undefined;
    getCharacterIndex(): number;
    private setStandingFrameDuringWalk;
    private setWalkingFrame;
    private _setStandingFrame;
    private isCurrentFrameStanding;
    private framesOfDirection;
    private getFramesForAnimationMapping;
    private fallbackDirection;
    private getFramesForCharIndex;
}
