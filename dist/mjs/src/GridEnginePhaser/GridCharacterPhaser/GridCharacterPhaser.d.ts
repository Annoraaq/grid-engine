import { CharacterData, GridEngineHeadless, WalkingAnimationMapping } from "../../GridEngine.js";
import { CharacterAnimation } from "../../GridCharacter/CharacterAnimation/CharacterAnimation.js";
import { Direction } from "../../Direction/Direction.js";
import { GridTilemapPhaser } from "../GridTilemapPhaser/GridTilemapPhaser.js";
export declare class GridCharacterPhaser {
    private charData;
    private scene;
    private tilemap;
    private geHeadless;
    private customOffset;
    private depthOffset;
    private sprite?;
    private layerOverlaySprite?;
    private container?;
    private cachedContainerBounds?;
    private newSpriteSet$;
    private destroy$;
    private walkingAnimationMapping?;
    private animation?;
    constructor(charData: CharacterData, scene: Phaser.Scene, tilemap: GridTilemapPhaser, layerOverlay: boolean, geHeadless: GridEngineHeadless);
    destroy(): void;
    setSprite(sprite?: Phaser.GameObjects.Sprite): void;
    getSprite(): Phaser.GameObjects.Sprite | undefined;
    getLayerOverlaySprite(): Phaser.GameObjects.Sprite | undefined;
    setContainer(container?: Phaser.GameObjects.Container): void;
    getContainer(): Phaser.GameObjects.Container | undefined;
    getOffsetX(): number;
    setOffsetX(offsetX: number): void;
    getOffsetY(): number;
    setOffsetY(offsetY: number): void;
    getWalkingAnimationMapping(): WalkingAnimationMapping | number | undefined;
    turnTowards(direction: Direction): void;
    getAnimation(): CharacterAnimation | undefined;
    setAnimation(animation: CharacterAnimation): void;
    update(_delta: number): void;
    getDepthOffset(): number;
    private getEngineOffset;
    private updatePixelPos;
    private getGameObj;
    private updateGridChar;
    private resetAnimation;
    private updateOverlaySprite;
    private updateDepth;
    private setSpriteDepth;
    private setContainerDepth;
    private getPaddedPixelDepthContainer;
    private getPaddedPixelDepthSprite;
    private getTransitionLayer;
}
