import { GlobalConfig } from "./../GlobalConfig/GlobalConfig";
import { Direction } from "./../Direction/Direction";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { CharBlockCache } from "./CharBlockCache/CharBlockCache";
import { Rect } from "../Utils/Rect/Rect";

export class GridTilemap {
  private static readonly MAX_PLAYER_LAYERS = 1;
  private static readonly ALWAYS_TOP_PROP_NAME = "ge_alwaysTop";
  private static readonly CHAR_LAYER_PROP_NAME = "ge_charLayer";
  private static readonly HEIGHT_SHIFT_PROP_NAME = "ge_heightShift";
  private static readonly ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  private characters = new Map<string, GridCharacter>();
  private charBlockCache: CharBlockCache = new CharBlockCache();
  private visLayerDepths = new Map<string, number>();
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

  isBlocking(charLayer: string, pos: Vector2, direction?: Direction): boolean {
    return (
      this.hasNoTile(pos, charLayer) ||
      this.hasBlockingTile(charLayer, pos, direction) ||
      this.hasBlockingChar(pos, charLayer)
    );
  }

  hasBlockingTile(
    charLayer: string,
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

  hasNoTile(pos: Vector2, charLayer: string): boolean {
    return !this.getCollisionRelevantLayers(charLayer).some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.name)
    );
  }

  hasBlockingChar(pos: Vector2, layer: string): boolean {
    return this.charBlockCache.isCharBlockingAt(pos, layer);
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
    return this.visLayerDepths.get(layerName) || 0;
  }

  isInRange(pos: Vector2): boolean {
    const rect = new Rect(0, 0, this.tilemap.width, this.tilemap.height);
    return rect.isInRange(pos);
  }

  getTileSize(): Vector2 {
    return new Vector2(this.getTileWidth(), this.getTileHeight());
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
    let offset = 0;
    const onTopLayers = [];
    this.tilemap.layers.forEach((layerData, layerIndex) => {
      if (this.isLayerAlwaysOnTop(layerData)) {
        onTopLayers.push(layerData);
      }
      if (this.hasLayerProp(layerData, GridTilemap.HEIGHT_SHIFT_PROP_NAME)) {
        this.createLayerForEachRow(layerData, layerIndex, offset);
        layersToDelete.push(layerData.tilemapLayer);
        offset += layerData.height;
      } else {
        layerData.tilemapLayer.setDepth(layerIndex + offset);
      }

      if (this.isCharLayer(layerData)) {
        this.visLayerDepths.set(
          this.getLayerProp(layerData, GridTilemap.CHAR_LAYER_PROP_NAME),
          layerIndex + offset
        );
        offset += GridTilemap.MAX_PLAYER_LAYERS;
      }
    });

    layersToDelete.forEach((layer) => layer.destroy());
    if (this.visLayerDepths.size == 0) {
      onTopLayers.forEach((layer, layerIndex) => {
        layer.tilemapLayer.setDepth(
          GridTilemap.MAX_PLAYER_LAYERS +
            layerIndex +
            offset +
            this.tilemap.layers.length -
            onTopLayers.length
        );
      });
    }
  }

  private createLayerForEachRow(
    layer: Phaser.Tilemaps.LayerData,
    layerIndex: number,
    offset: number
  ) {
    const heightShift = this.getLayerProp(
      layer,
      GridTilemap.HEIGHT_SHIFT_PROP_NAME
    );
    for (let row = 0; row < layer.height; row++) {
      const newLayer = this.tilemap.createBlankLayer(
        `${layerIndex}#${row}`,
        layer.tilemapLayer.tileset
      );
      for (let col = 0; col < layer.width; col++) {
        newLayer.putTileAt(layer.data[row][col], col, row);
      }

      newLayer.scale = layer.tilemapLayer.scale;

      const makeHigherThanPlayerWhenOnSameLevel = 0.5;
      newLayer.setDepth(
        offset + row + heightShift - 1 + makeHigherThanPlayerWhenOnSameLevel
      );
    }
  }
}
