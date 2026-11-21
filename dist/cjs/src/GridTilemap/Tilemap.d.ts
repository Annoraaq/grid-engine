import { Direction } from "../Direction/Direction.js";
import { CharLayer, Position } from "../Position.js";
export type Orientation = "isometric" | "orthogonal";
export declare const CHAR_LAYER_PROP_NAME = "ge_charLayer";
/**
 * Custom function to determine whether a tile is blocking.
 *
 * When provided in {@link GridEngineConfigHeadless.isTileBlocking}, this
 * function replaces GridEngine's default tile collision logic (including
 * missing-tile checks and `ge_collide` tile properties).
 *
 * Beware that this method is called frequently (especially during pathfinding),
 * so keep it as fast as possible. If your custom collision logic is static or
 * changes infrequently, you can combine it with
 * {@link GridEngineConfigHeadless.cacheTileCollisions}.
 *
 * @param pos Tile position to check.
 * @param charLayer The character layer to check on (or `undefined` if no character layers exist).
 * @param direction The direction from which the tile is entered (the opposite of the movement direction, matching `ge_collide_<dir>`), or `undefined` when checking blocking without a specific direction (e.g. {@link IGridEngine.isTileBlocked}).
 * @param ignoreMissingTiles Whether missing tiles should be ignored (e.g. from character `ignoreMissingTiles` or pathfinding `ignoreMapBounds`).
 *
 * @category Configuration
 */
export type IsTileBlockingFn = (pos: Position, charLayer?: CharLayer, direction?: Direction, ignoreMissingTiles?: boolean) => boolean;
export interface Tile {
    getProperty(name: string): any;
    hasProperty(name: string): boolean;
}
export interface TileLayer {
    getName(): string | undefined;
    getProperty(name: string): string | undefined;
    hasProperty(name: string): boolean;
    getData(): Array<Array<Tile | undefined>>;
    isCharLayer(): boolean;
}
export interface Tilemap {
    getWidth(): number;
    getHeight(): number;
    getOrientation(): Orientation;
    getLayers(): TileLayer[];
    hasTileAt(x: number, y: number, layer?: string): boolean;
    getTileAt(x: number, y: number, layer?: string): Tile | undefined;
}
