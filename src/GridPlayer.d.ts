import { Direction } from "./Direction";
export declare class GridPlayer {
    private sprite;
    private characterIndex;
    private tileSize;
    private static readonly FRAMES_CHAR_ROW;
    private static readonly FRAMES_CHAR_COL;
    private directionToFrameRow;
    private charsInRow;
    lastFootLeft: boolean;
    constructor(sprite: Phaser.GameObjects.Sprite, characterIndex: number, tileSize: number);
    getPosition(): Phaser.Math.Vector2;
    setTilePosition(tilePosition: Phaser.Math.Vector2): void;
    setPosition(position: Phaser.Math.Vector2): void;
    setWalkingFrame(direction: Direction): void;
    setStandingFrame(direction: Direction): void;
    getTilePos(): Phaser.Math.Vector2;
    private isCurrentFrameStanding;
    private playerOffsetX;
    private playerOffsetY;
    private framesOfDirection;
}
