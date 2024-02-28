import {
  Direction,
  directionVector,
  directions,
  turnClockwise,
  turnCounterClockwise,
} from "./../Direction/Direction.js";
import { CharBlockCache } from "./CharBlockCache/CharBlockCache.js";
import { Rect } from "../Utils/Rect/Rect.js";
import { CharId, GridCharacter } from "../GridCharacter/GridCharacter.js";
import { CollisionStrategy } from "../Collisions/CollisionStrategy.js";
import { CharLayer } from "../GridEngine.js";
import { CHAR_LAYER_PROP_NAME, TileLayer, Tilemap } from "./Tilemap.js";
import { TileCollisionCache } from "./TileCollisionCache/TileCollisionCache.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import { LayerVecPos } from "../Utils/LayerPositionUtils/LayerPositionUtils.js";

const TILE_COST_PROPERTY_NAME = "ge_cost";
export class GridTilemap {
  private static readonly ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  private characters = new Map<string, GridCharacter>();
  private charBlockCache: CharBlockCache;
  private transitions: Map<
    string /* Position */,
    Map<CharLayer /* sourceLayer */, CharLayer /* targetLayer */>
  > = new Map();

  private reverseTransitions: Map<
    string /* Position */,
    Map<CharLayer /* targetLayer */, Set<CharLayer> /* sourceLayers */>
  > = new Map();

  private collidesPropNames: Map<Direction, string> = new Map();
  private tileCostPropNames: Map<Direction, string> = new Map();

  // Cache collision relevant layers for each frame so they don't have to be
  // computed for each tile check.
  private collisionRelevantLayersFrameCache: Map<CharLayer, TileLayer[]> =
    new Map();

  private tileCollisionCache?: TileCollisionCache;

  constructor(
    private tilemap: Tilemap,
    private collisionTilePropertyName: string,
    collisionStrategy: CollisionStrategy,
    collisionGroupRelation: Map<string, Set<string>> | undefined = undefined,
    private useTileCollisionCache = false,
  ) {
    this.charBlockCache = new CharBlockCache(
      collisionStrategy,
      collisionGroupRelation,
    );

    // Performance optimization for pathfinding.
    // It saves us repeated string concatenation.
    for (const dir of directions()) {
      this.collidesPropNames.set(
        dir,
        GridTilemap.ONE_WAY_COLLIDE_PROP_PREFIX + dir,
      );
      this.tileCostPropNames.set(dir, `${TILE_COST_PROPERTY_NAME}_${dir}`);
    }

    if (this.useTileCollisionCache) {
      this.tileCollisionCache = new TileCollisionCache(tilemap, this);
      this.tileCollisionCache.rebuild();
    }
  }

  fixCacheLayer(layer: CharLayer): void {
    this.tileCollisionCache?.fixLayer(layer);
  }

  unfixCacheLayers(): void {
    this.tileCollisionCache?.unfixLayers();
  }

  addCharacter(character: GridCharacter): void {
    this.characters.set(character.getId(), character);
    const layer = character.getNextTilePos().layer;
    if (layer === undefined) {
      character.setTilePosition({
        ...character.getNextTilePos(),
        layer: this.getLowestCharLayer(),
      });
    } else if (!this.getCharLayerNames().includes(layer)) {
      console.warn(
        `Char layer '${layer}' of character '${character.getId()}' is unknown.`,
      );
    }
    this.charBlockCache.addCharacter(character);
  }

  removeCharacter(charId: string): void {
    const gridChar = this.characters.get(charId);
    if (!gridChar) return;
    this.charBlockCache.removeCharacter(gridChar);
    this.characters.delete(charId);
  }

  getCharacters(): GridCharacter[] {
    return [...this.characters.values()];
  }

  getCharactersAt(position: Vector2, layer?: string): Set<GridCharacter> {
    return this.charBlockCache.getCharactersAt(position, layer);
  }

  rebuildTileCollisionCache(rect?: Rect): void {
    this.tileCollisionCache?.rebuild(rect);
  }

  // Performance critical method.
  hasBlockingTileUncached(
    pos: Vector2,
    charLayer: string | undefined,
    direction?: Direction,
    ignoreHasTile?: boolean,
  ): boolean {
    if (!ignoreHasTile && this.hasNoTileUncached(pos, charLayer)) return true;

    // Keep out of loop for performance.
    const crl = this.getCollisionRelevantLayers(charLayer);
    for (const layer of crl) {
      if (this.isLayerBlockingAt(layer.getName(), pos, direction)) {
        return true;
      }
    }
    return false;
  }

  hasBlockingTile(
    pos: Vector2,
    charLayer: string | undefined,
    direction?: Direction,
    ignoreHasTile?: boolean,
  ): boolean {
    const cached = this.tileCollisionCache?.isBlockingFrom(
      pos.x,
      pos.y,
      charLayer,
      direction,
      ignoreHasTile,
    );
    if (cached !== undefined) return cached;
    return this.hasBlockingTileUncached(
      pos,
      charLayer,
      direction,
      ignoreHasTile,
    );
  }

  getTransition(pos: Vector2, fromLayer?: string): string | undefined {
    const transitions = this.transitions.get(pos.toString());

    if (transitions) {
      return transitions.get(fromLayer);
    }
  }

  getReverseTransitions(
    pos: Vector2,
    targetLayer?: string,
  ): Set<CharLayer> | undefined {
    const reverseTransitions = this.reverseTransitions.get(pos.toString());

    if (reverseTransitions) {
      return reverseTransitions.get(targetLayer);
    }
  }

  setTransition(pos: Vector2, fromLayer: CharLayer, toLayer: CharLayer): void {
    if (!this.transitions.has(pos.toString())) {
      this.transitions.set(pos.toString(), new Map());
    }
    if (!this.reverseTransitions.has(pos.toString())) {
      this.reverseTransitions.set(pos.toString(), new Map());
    }
    this.transitions.get(pos.toString())?.set(fromLayer, toLayer);
    if (!this.reverseTransitions.get(pos.toString())?.has(toLayer)) {
      this.reverseTransitions.get(pos.toString())?.set(toLayer, new Set());
    }
    this.reverseTransitions.get(pos.toString())?.get(toLayer)?.add(fromLayer);
  }

  getTransitions(): Map<CharLayer, Map<CharLayer, CharLayer>> {
    return new Map(
      [...this.transitions].map(([pos, map]) => [pos, new Map(map)]),
    );
  }

  getTileCosts(pos: LayerVecPos, srcDir?: Direction): number {
    const crl = this.getCollisionRelevantLayers(pos.layer);
    let maxCost = 1;
    for (const layer of crl) {
      maxCost = Math.max(
        maxCost,
        this.getTileCostsForLayer({ ...pos, layer: layer.getName() }, srcDir),
      );
    }
    return maxCost;
  }

  private getTileCostsForLayer(dest: LayerVecPos, dir?: Direction): number {
    const tile = this.tilemap.getTileAt(
      dest.position.x,
      dest.position.y,
      dest.layer,
    );
    return (
      (dir && tile?.getProperty(this.tileCostPropNames.get(dir) || "")) ||
      tile?.getProperty(TILE_COST_PROPERTY_NAME) ||
      1
    );
  }

  hasNoTileUncached(pos: Vector2, charLayer?: string): boolean {
    const crl = this.getCollisionRelevantLayers(charLayer);
    return !crl.some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.getName()),
    );
  }

  hasNoTile(pos: Vector2, charLayer?: string): boolean {
    const cached = this.tileCollisionCache?.hasTileAt(pos.x, pos.y, charLayer);
    if (cached !== undefined) {
      return cached;
    }
    return this.hasNoTileUncached(pos, charLayer);
  }

  hasBlockingChar(
    pos: Vector2,
    layer: string | undefined,
    collisionGroups: string[],
    exclude = new Set<CharId>(),
    ignoreCollisionGroups = new Set<string>(),
  ): boolean {
    return this.charBlockCache.isCharBlockingAt(
      pos,
      layer,
      collisionGroups,
      exclude,
      ignoreCollisionGroups,
    );
  }

  isInRange(pos: Vector2): boolean {
    const rect = new Rect(
      0,
      0,
      this.tilemap.getWidth(),
      this.tilemap.getHeight(),
    );
    return rect.isInRange(pos);
  }

  toMapDirection(direction: Direction): Direction {
    if (this.isIsometric()) {
      return turnCounterClockwise(direction);
    }
    return direction;
  }

  fromMapDirection(direction: Direction): Direction {
    if (this.isIsometric()) {
      return turnClockwise(direction);
    }
    return direction;
  }

  isIsometric(): boolean {
    return this.tilemap.getOrientation() === "isometric";
  }

  getTilePosInDirection(
    position: LayerVecPos,
    direction: Direction,
  ): LayerVecPos {
    const posInDir = position.position.add(
      directionVector(this.toMapDirection(direction)),
    );

    const transition =
      this.getTransition(posInDir, position.layer) || position.layer;
    return {
      position: posInDir,
      layer: transition,
    };
  }

  invalidateFrameCache() {
    this.collisionRelevantLayersFrameCache.clear();
  }

  // This method is performance critical for pathfinding.
  private isLayerBlockingAt(
    layerName: string | undefined,
    pos: Vector2,
    direction?: Direction,
  ): boolean {
    const tile = this.tilemap.getTileAt(pos.x, pos.y, layerName);
    if (!tile) return false;
    return !!(
      tile.getProperty(this.collisionTilePropertyName) ||
      (direction &&
        tile.getProperty(this.collidesPropNames.get(direction) || ""))
    );
  }

  private getCharLayerIndexes(): number[] {
    return this.tilemap
      .getLayers()
      .map((layer, index) => ({ layer, index }))
      .filter(({ layer }) => layer.isCharLayer())
      .map(({ index }) => index);
  }

  private findPrevAndCharLayer(charLayer: string): {
    prevIndex: number;
    charLayerIndex: number;
  } {
    const indexes = this.getCharLayerIndexes();
    const layers = this.tilemap.getLayers();

    const charLayerIndex = indexes.findIndex((index) => {
      return layers[index].getProperty(CHAR_LAYER_PROP_NAME) == charLayer;
    });

    if (charLayerIndex == 0) {
      return { prevIndex: -1, charLayerIndex: indexes[charLayerIndex] };
    }

    return {
      prevIndex: indexes[charLayerIndex - 1],
      charLayerIndex: indexes[charLayerIndex],
    };
  }

  private getCollisionRelevantLayers(charLayer?: string): TileLayer[] {
    if (!charLayer) return this.tilemap.getLayers();

    const cached = this.collisionRelevantLayersFrameCache.get(charLayer);
    if (cached) return cached;

    const { prevIndex, charLayerIndex } = this.findPrevAndCharLayer(charLayer);

    const computed = this.tilemap
      .getLayers()
      .slice(prevIndex + 1, charLayerIndex + 1);
    this.collisionRelevantLayersFrameCache.set(charLayer, computed);
    return computed;
  }

  private getLowestCharLayer(): string | undefined {
    for (const layer of this.tilemap.getLayers()) {
      if (layer.isCharLayer()) return layer.getProperty(CHAR_LAYER_PROP_NAME);
    }
    return undefined;
  }

  private getCharLayerNames(): string[] {
    return this.tilemap
      .getLayers()
      .filter((l) => l.isCharLayer())
      .map((l) => l.getProperty(CHAR_LAYER_PROP_NAME))
      .filter(isDefined);
  }
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
