import { Direction } from "../../Direction/Direction.js";
import { GridTilemap } from "../GridTilemap.js";
import { Tilemap } from "../Tilemap.js";
import { Rect } from "../../Utils/Rect/Rect.js";
import { CharLayer } from "../../Position.js";
export declare class TileCollisionCache {
    private tilemap;
    private gridTilemap;
    private fixedLayer?;
    constructor(tilemap: Tilemap, gridTilemap: GridTilemap);
    private tileCollisionCache;
    fixLayer(layer: CharLayer): void;
    unfixLayers(): void;
    rebuild(rect?: Rect): void;
    hasTileAt(x: number, y: number, layer?: string): boolean | undefined;
    isBlockingFrom(x: number, y: number, layer?: string, direction?: Direction, ignoreHasTile?: boolean): boolean | undefined;
}
