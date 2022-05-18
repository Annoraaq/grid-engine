import { GlobalConfig } from "./../GlobalConfig/GlobalConfig";
import { Direction, turnCounterClockwise } from "./../Direction/Direction";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { CharBlockCache } from "./CharBlockCache/CharBlockCache";
import { Rect } from "../Utils/Rect/Rect";
import { VectorUtils } from "../Utils/VectorUtils";
import { Utils } from "../Utils/Utils/Utils";

export class GridTilemap {
  private static readonly ALWAYS_TOP_PROP_NAME = "ge_alwaysTop";
  private static readonly CHAR_LAYER_PROP_NAME = "ge_charLayer";
  private static readonly HEIGHT_SHIFT_PROP_NAME = "ge_heightShift";
  private static readonly ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  private static readonly Z_INDEX_PADDING = 7;
  private characters = new Map<string, GridCharacter>();
  private charBlockCache: CharBlockCache = new CharBlockCache();
  private charLayerDepths = new Map<string, number>();
  private transitions: Map<string, Map<string, string>> = new Map();

  constructor(private tilemap: Phaser.Tilemaps.Tilemap) {
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
    this.charBlockCache.removeCharacter(this.characters.get(charId));
    this.characters.delete(charId);
  }

  getCharacters(): GridCharacter[] {
    return [...this.characters.values()];
  }

  getCharactersAt(position: Vector2, layer: string): Set<GridCharacter> {
    return this.charBlockCache.getCharactersAt(position, layer);
  }

  isBlocking(
    charLayer: string | undefined,
    pos: Vector2,
    collisionGroups: string[],
    direction?: Direction
  ): boolean {
    return (
      this.hasBlockingTile(charLayer, pos, direction) ||
      this.hasBlockingChar(pos, charLayer, collisionGroups)
    );
  }

  hasBlockingTile(
    charLayer: string | undefined,
    pos: Vector2,
    direction?: Direction
  ): boolean {
    if (this.hasNoTile(pos, charLayer)) return true;
    return this.getCollisionRelevantLayers(charLayer).some((layer) =>
      this.isLayerBlockingAt(layer, pos, direction)
    );
  }

  getTransition(pos: Vector2, fromLayer: string): string | undefined {
    const transitions = this.transitions.get(pos.toString());

    if (transitions) {
      return transitions.get(fromLayer);
    }
  }

  setTransition(pos: Vector2, fromLayer: string, toLayer: string): void {
    if (!this.transitions.has(pos.toString())) {
      this.transitions.set(pos.toString(), new Map());
    }
    this.transitions.get(pos.toString()).set(fromLayer, toLayer);
  }

  getTransitions(): Map<string, Map<string, string>> {
    return new Map(
      [...this.transitions].map(([pos, map]) => [pos, new Map(map)])
    );
  }

  hasNoTile(pos: Vector2, charLayer?: string): boolean {
    return !this.getCollisionRelevantLayers(charLayer).some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.name)
    );
  }

  hasBlockingChar(
    pos: Vector2,
    layer: string | undefined,
    collisionGroups: string[]
  ): boolean {
    return this.charBlockCache.isCharBlockingAt(pos, layer, collisionGroups);
  }

  getTileWidth(): number {
    const tilemapScale = this.tilemap.layers[0].tilemapLayer.scale;
    return this.tilemap.tileWidth * tilemapScale;
  }

  getTileHeight(): number {
    const tilemapScale = this.tilemap.layers[0].tilemapLayer.scale;
    return this.tilemap.tileHeight * tilemapScale;
  }

  getDepthOfCharLayer(layerName: string): number {
    return this.charLayerDepths.get(layerName) || 0;
  }

  isInRange(pos: Vector2): boolean {
    const rect = new Rect(0, 0, this.tilemap.width, this.tilemap.height);
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

  isIsometric(): boolean {
    // Against the documentation of phaser, tilemap seems to be a number instead
    // of a string. Therefore the intentional type coercion here.
    return (
      this.tilemap.orientation ==
      Phaser.Tilemaps.Orientation.ISOMETRIC.toString()
    );
  }

  private isLayerBlockingAt(
    layer: Phaser.Tilemaps.LayerData,
    pos: Vector2,
    direction?: Direction
  ): boolean {
    const collidesPropName =
      GridTilemap.ONE_WAY_COLLIDE_PROP_PREFIX + direction;

    const tile = this.tilemap.getTileAt(pos.x, pos.y, false, layer.name);
    return Boolean(
      tile?.properties &&
        (tile.properties[GlobalConfig.get().collisionTilePropertyName] ||
          tile.properties[collidesPropName])
    );
  }

  private getCharLayerIndexes(): number[] {
    return this.tilemap.layers
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
          this.tilemap.layers[index],
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

  private getCollisionRelevantLayers(
    charLayer: string
  ): Phaser.Tilemaps.LayerData[] {
    if (!charLayer) return this.tilemap.layers;

    const { prevIndex, charLayerIndex } = this.findPrevAndCharLayer(charLayer);

    return this.tilemap.layers.slice(prevIndex + 1, charLayerIndex + 1);
  }

  private getLowestCharLayer(): string | undefined {
    const charLayer = this.tilemap.layers.find((layer) => {
      return this.hasLayerProp(layer, GridTilemap.CHAR_LAYER_PROP_NAME);
    });

    if (charLayer) {
      return this.getLayerProp(charLayer, GridTilemap.CHAR_LAYER_PROP_NAME);
    }
  }

  private getLayerProp(layer: Phaser.Tilemaps.LayerData, name: string): any {
    const layerProps = layer.properties as [{ name: any; value: any }];
    const prop = layerProps.find((el) => el.name == name);
    return prop?.value;
  }

  private hasLayerProp(
    layer: Phaser.Tilemaps.LayerData,
    name: string
  ): boolean {
    return this.getLayerProp(layer, name) != undefined;
  }

  private isLayerAlwaysOnTop(layerData: Phaser.Tilemaps.LayerData): boolean {
    return this.hasLayerProp(layerData, GridTilemap.ALWAYS_TOP_PROP_NAME);
  }

  private isCharLayer(layerData: Phaser.Tilemaps.LayerData): boolean {
    return this.hasLayerProp(layerData, GridTilemap.CHAR_LAYER_PROP_NAME);
  }

  private setLayerDepths() {
    const layersToDelete: Phaser.Tilemaps.TilemapLayer[] = [];
    let offset = -1;
    const alwaysOnTopLayers = this.tilemap.layers.filter((l) =>
      this.isLayerAlwaysOnTop(l)
    );
    const otherLayers = this.tilemap.layers.filter(
      (l) => !this.isLayerAlwaysOnTop(l)
    );
    otherLayers.forEach((layerData) => {
      if (this.hasLayerProp(layerData, GridTilemap.HEIGHT_SHIFT_PROP_NAME)) {
        this.createHeightShiftLayers(layerData, offset);
        layersToDelete.push(layerData.tilemapLayer);
      } else {
        this.setDepth(layerData, ++offset);
      }
    });
    otherLayers.forEach((layerData) => {
      if (this.isCharLayer(layerData)) return;
      this.charLayerDepths.set(undefined, offset);
    });
    alwaysOnTopLayers.forEach((layer, layerIndex) => {
      layer.tilemapLayer.setDepth(layerIndex + 1 + offset);
    });

    layersToDelete.forEach((layer) => layer.destroy());
  }

  private setDepth(layerData: Phaser.Tilemaps.LayerData, depth: number): void {
    layerData.tilemapLayer.setDepth(depth);
    if (this.isCharLayer(layerData)) {
      this.charLayerDepths.set(
        this.getLayerProp(layerData, GridTilemap.CHAR_LAYER_PROP_NAME),
        depth
      );
    }
  }

  private createHeightShiftLayers(
    layer: Phaser.Tilemaps.LayerData,
    offset: number
  ) {
    const heightShift = this.getLayerProp(
      layer,
      GridTilemap.HEIGHT_SHIFT_PROP_NAME
    );
    const makeHigherThanCharWhenOnSameLevel = 1;
    for (let row = 0; row < layer.height; row++) {
      const newLayer = this.copyLayer(layer, row);
      newLayer.scale = layer.tilemapLayer.scale;
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

  private copyLayer(
    layerData: Phaser.Tilemaps.LayerData,
    row: number
  ): Phaser.Tilemaps.TilemapLayer {
    const newLayer = this.tilemap.createBlankLayer(
      `${layerData.name}#${row}`,
      layerData.tilemapLayer.tileset
    );
    for (let col = 0; col < layerData.width; col++) {
      newLayer.putTileAt(layerData.data[row][col], col, row);
    }
    return newLayer;
  }
}
