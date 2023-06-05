import { Direction } from "../../Direction/Direction";
import { GridTilemap } from "../GridTilemap";
import { Tilemap } from "../Tilemap";
import { Rect } from "../../Utils/Rect/Rect";
import { CharLayer } from "../../IGridEngine";
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
