import { CharLayer, Direction } from "../../GridEngine.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
export declare class GridTilemapPhaser {
    private tilemap;
    private static readonly ALWAYS_TOP_PROP_NAME;
    private static readonly CHAR_LAYER_PROP_NAME;
    private static readonly HEIGHT_SHIFT_PROP_NAME;
    static readonly Z_INDEX_PADDING = 7;
    private charLayerDepths;
    constructor(tilemap: Phaser.Tilemaps.Tilemap);
    getTileWidth(): number;
    getTileHeight(): number;
    getDepthOfCharLayer(layerName: CharLayer): number;
    tilePosToPixelPos(tilePosition: Vector2): Vector2;
    getTileDistance(direction: Direction): Vector2;
    private getTileSize;
    private isIsometric;
    private isLayerAlwaysOnTop;
    private isCharLayer;
    private setLayerDepths;
    private setDepth;
    private createHeightShiftLayers;
    private getLayerProp;
    private hasLayerProp;
    private copyLayer;
}
