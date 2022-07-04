import { GridTilemap } from "./../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { CharacterData } from "../../GridEngine";
export declare class GridCharacterPhaser {
    private charData;
    private scene;
    private tilemap;
    private layerOverlay;
    private sprite?;
    private layerOverlaySprite?;
    private container?;
    private newSpriteSet$;
    private gridCharacter;
    constructor(charData: CharacterData, scene: Phaser.Scene, tilemap: GridTilemap, layerOverlay: boolean);
    getGridCharacter(): GridCharacter;
    setSprite(sprite?: Phaser.GameObjects.Sprite): void;
    getSprite(): Phaser.GameObjects.Sprite | undefined;
    getLayerOverlaySprite(): Phaser.GameObjects.Sprite | undefined;
    setContainer(container?: Phaser.GameObjects.Container): void;
    getContainer(): Phaser.GameObjects.Container | undefined;
    private createChar;
    private resetAnimation;
    private updateOverlaySprite;
    private updateDepth;
    private setDepth;
    private getPaddedPixelDepth;
    private getTransitionLayer;
}
