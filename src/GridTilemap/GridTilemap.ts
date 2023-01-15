import { GlobalConfig } from "./../GlobalConfig/GlobalConfig";
import {
  Direction,
  directionVector,
  turnClockwise,
  turnCounterClockwise,
} from "./../Direction/Direction";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { CharBlockCache } from "./CharBlockCache/CharBlockCache";
import { Rect } from "../Utils/Rect/Rect";
import { VectorUtils } from "../Utils/VectorUtils";
import { Utils } from "../Utils/Utils/Utils";
import { CharId, GridCharacter } from "../GridCharacter/GridCharacter";
import { LayerVecPos } from "../Pathfinding/ShortestPathAlgorithm";
import { CharLayer } from "../GridEngine";
import { TileLayer, Tilemap } from "./Tilemap";

export class GridTilemap {
  private static readonly ALWAYS_TOP_PROP_NAME = "ge_alwaysTop";
  private static readonly CHAR_LAYER_PROP_NAME = "ge_charLayer";
  private static readonly HEIGHT_SHIFT_PROP_NAME = "ge_heightShift";
  private static readonly ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  private static readonly Z_INDEX_PADDING = 7;
  private characters = new Map<string, GridCharacter>();
  private charBlockCache: CharBlockCache = new CharBlockCache();
  private charLayerDepths = new Map<CharLayer, number>();
  private transitions: Map<CharLayer, Map<CharLayer, CharLayer>> = new Map();

  constructor(private tilemap: Tilemap) {
    this.setLayerDepths();
  }

  addCharacter(character: GridCharacter): void {
    this.characters.set(character.getId(), character);
    if (character.getNextTilePos().layer === undefined) {
      character.setTilePosition({
        ...character.getNextTilePos(),
        layer: this.getLowestCharLayer(),
      });
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

  getCharactersAt(position: Vector2, layer: string): Set<GridCharacter> {
    return this.charBlockCache.getCharactersAt(position, layer);
  }

  hasBlockingTile(
    pos: Vector2,
    charLayer: string | undefined,
    direction?: Direction,
    ignoreHasTile?: boolean
  ): boolean {
    if (!ignoreHasTile && this.hasNoTile(pos, charLayer)) return true;
    return this.getCollisionRelevantLayers(charLayer).some((layer) =>
      this.isLayerBlockingAt(layer, pos, direction)
    );
  }

  getTransition(pos: Vector2, fromLayer?: string): string | undefined {
    const transitions = this.transitions.get(pos.toString());

    if (transitions) {
      return transitions.get(fromLayer);
    }
  }

  setTransition(pos: Vector2, fromLayer: CharLayer, toLayer: CharLayer): void {
    if (!this.transitions.has(pos.toString())) {
      this.transitions.set(pos.toString(), new Map());
    }
    this.transitions.get(pos.toString())?.set(fromLayer, toLayer);
  }

  getTransitions(): Map<CharLayer, Map<CharLayer, CharLayer>> {
    return new Map(
      [...this.transitions].map(([pos, map]) => [pos, new Map(map)])
    );
  }

  hasNoTile(pos: Vector2, charLayer?: string): boolean {
    return !this.getCollisionRelevantLayers(charLayer).some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.getName())
    );
  }

  hasBlockingChar(
    pos: Vector2,
    layer: string | undefined,
    collisionGroups: string[],
    exclude = new Set<CharId>()
  ): boolean {
    return this.charBlockCache.isCharBlockingAt(
      pos,
      layer,
      collisionGroups,
      exclude
    );
  }

  getTileWidth(): number {
    const tilemapScale = this.tilemap.getLayers()[0].getScale();
    return this.tilemap.getTileWidth() * tilemapScale;
  }

  getTileHeight(): number {
    const tilemapScale = this.tilemap.getLayers()[0].getScale();
    return this.tilemap.getTileHeight() * tilemapScale;
  }

  getDepthOfCharLayer(layerName: CharLayer): number {
    return this.charLayerDepths.get(layerName) ?? 0;
  }

  isInRange(pos: Vector2): boolean {
    const rect = new Rect(
      0,
      0,
      this.tilemap.getWidth(),
      this.tilemap.getHeight()
    );
    return rect.isInRange(pos);
  }

  getTileSize(): Vector2 {
    return new Vector2(this.getTileWidth(), this.getTileHeight());
  }

  tilePosToPixelPos(tilePosition: Vector2): Vector2 {
    if (this.isIsometric()) {
      return VectorUtils.scalarMult(this.getTileSize(), 0.5).multiply(
        new Vector2(
          tilePosition.x - tilePosition.y,
          tilePosition.x + tilePosition.y
        )
      );
    }
    return tilePosition.clone().multiply(this.getTileSize());
  }

  getTileDistance(direction: Direction): Vector2 {
    if (this.isIsometric()) {
      switch (direction) {
        case Direction.DOWN_LEFT:
        case Direction.DOWN_RIGHT:
        case Direction.UP_LEFT:
        case Direction.UP_RIGHT:
          return VectorUtils.scalarMult(this.getTileSize(), 0.5);
        default:
          return this.getTileSize();
      }
    }
    return this.getTileSize();
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
    direction: Direction
  ): LayerVecPos {
    const posInDir = position.position.add(
      directionVector(this.toMapDirection(direction))
    );

    const transition =
      this.getTransition(posInDir, position.layer) || position.layer;
    return {
      position: posInDir,
      layer: transition,
    };
  }

  private isLayerBlockingAt(
    layer: TileLayer,
    pos: Vector2,
    direction?: Direction
  ): boolean {
    const collidesPropName =
      GridTilemap.ONE_WAY_COLLIDE_PROP_PREFIX + direction;

    const tile = this.tilemap.getTileAt(pos.x, pos.y, layer.getName());
    return Boolean(
      tile?.getProperties() &&
        (tile.getProperties()[GlobalConfig.get().collisionTilePropertyName] ||
          tile.getProperties()[collidesPropName])
    );
  }

  private getCharLayerIndexes(): number[] {
    return this.tilemap
      .getLayers()
      .map((layer, index) => ({ layer, index }))
      .filter(({ layer }) => this.isCharLayer(layer))
      .map(({ index }) => index);
  }

  private findPrevAndCharLayer(charLayer: string): {
    prevIndex: number;
    charLayerIndex: number;
  } {
    const indexes = this.getCharLayerIndexes();

    const charLayerIndex = indexes.findIndex((index) => {
      return (
        this.getLayerProp(
          this.tilemap.getLayers()[index],
          GridTilemap.CHAR_LAYER_PROP_NAME
        ) == charLayer
      );
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

    const { prevIndex, charLayerIndex } = this.findPrevAndCharLayer(charLayer);

    return this.tilemap.getLayers().slice(prevIndex + 1, charLayerIndex + 1);
  }

  private getLowestCharLayer(): string | undefined {
    const charLayer = this.tilemap.getLayers().find((layer) => {
      return this.hasLayerProp(layer, GridTilemap.CHAR_LAYER_PROP_NAME);
    });

    if (charLayer) {
      return this.getLayerProp(charLayer, GridTilemap.CHAR_LAYER_PROP_NAME);
    }
  }

  private getLayerProp(layer: TileLayer, name: string): string | undefined {
    const prop = layer.getProperties()[name];
    return prop;
  }

  private hasLayerProp(layer: TileLayer, name: string): boolean {
    return this.getLayerProp(layer, name) != undefined;
  }

  private isLayerAlwaysOnTop(layer: TileLayer): boolean {
    return this.hasLayerProp(layer, GridTilemap.ALWAYS_TOP_PROP_NAME);
  }

  private isCharLayer(layer: TileLayer): boolean {
    return this.hasLayerProp(layer, GridTilemap.CHAR_LAYER_PROP_NAME);
  }

  private setLayerDepths() {
    const layersToDelete: TileLayer[] = [];
    let offset = -1;
    const alwaysOnTopLayers = this.tilemap
      .getLayers()
      .filter((l) => this.isLayerAlwaysOnTop(l));
    const otherLayers = this.tilemap
      .getLayers()
      .filter((l) => !this.isLayerAlwaysOnTop(l));
    otherLayers.forEach((layer) => {
      if (this.hasLayerProp(layer, GridTilemap.HEIGHT_SHIFT_PROP_NAME)) {
        this.createHeightShiftLayers(layer, offset);
        layersToDelete.push(layer);
      } else {
        this.setDepth(layer, ++offset);
      }
    });
    this.charLayerDepths.set(undefined, offset);
    alwaysOnTopLayers.forEach((layer, layerIndex) => {
      layer.setDepth(layerIndex + 1 + offset);
    });

    layersToDelete.forEach((layer) => layer.destroy());
  }

  private setDepth(layer: TileLayer, depth: number): void {
    layer.setDepth(depth);
    if (this.isCharLayer(layer)) {
      this.charLayerDepths.set(
        this.getLayerProp(layer, GridTilemap.CHAR_LAYER_PROP_NAME),
        depth
      );
    }
  }

  private createHeightShiftLayers(layer: TileLayer, offset: number) {
    let heightShift = Number(
      this.getLayerProp(layer, GridTilemap.HEIGHT_SHIFT_PROP_NAME)
    );
    if (isNaN(heightShift)) heightShift = 0;

    const makeHigherThanCharWhenOnSameLevel = 1;
    for (let row = 0; row < layer.getHeight(); row++) {
      const newLayer = this.copyLayer(layer, row);
      newLayer.setScale(layer.getScale());
      newLayer.setDepth(
        offset +
          Utils.shiftPad(
            (row + heightShift) * this.getTileHeight() +
              makeHigherThanCharWhenOnSameLevel,
            GridTilemap.Z_INDEX_PADDING
          )
      );
    }
  }

  private copyLayer(layer: TileLayer, row: number): TileLayer {
    return this.tilemap.copyLayer(layer, `${layer.getName()}#${row}`, row);
  }
}
