import { GlobalConfig } from "./../GlobalConfig/GlobalConfig";
import { Direction } from "./../Direction/Direction";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { CharBlockCache } from "./CharBlockCache/CharBlockCache";

export class GridTilemap {
  private static readonly MAX_PLAYER_LAYERS = 1000;
  static readonly FIRST_PLAYER_LAYER = 1000;
  private static readonly ALWAYS_TOP_PROP_NAME = "ge_alwaysTop";
  private static readonly HEIGHT_SHIFT_PROP_NAME = "ge_heightShift";
  private static readonly ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  private characters = new Map<string, GridCharacter>();
  private charBlockCache: CharBlockCache = new CharBlockCache();

  constructor(
    private tilemap: Phaser.Tilemaps.Tilemap,
    private firstLayerAboveChar?: number
  ) {
    this.setLayerDepths();
  }

  addCharacter(character: GridCharacter): void {
    this.characters.set(character.getId(), character);
    this.charBlockCache.addCharacter(character);
  }

  removeCharacter(charId: string): void {
    this.charBlockCache.removeCharacter(this.characters.get(charId));
    this.characters.delete(charId);
  }

  getCharacters(): GridCharacter[] {
    return [...this.characters.values()];
  }

  isBlocking(pos: Vector2, direction?: Direction): boolean {
    return (
      this.hasNoTile(pos) ||
      this.hasBlockingTile(pos, direction) ||
      this.hasBlockingChar(pos)
    );
  }

  hasBlockingTile(pos: Vector2, direction?: Direction): boolean {
    if (this.hasNoTile(pos)) return true;

    const collidesPropName =
      GridTilemap.ONE_WAY_COLLIDE_PROP_PREFIX + direction;
    return this.tilemap.layers.some((layer) => {
      const tile = this.tilemap.getTileAt(pos.x, pos.y, false, layer.name);
      return (
        tile?.properties &&
        (tile.properties[GlobalConfig.get().collisionTilePropertyName] ||
          tile.properties[collidesPropName])
      );
    });
  }

  hasNoTile(pos: Vector2): boolean {
    return !this.tilemap.layers.some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.name)
    );
  }

  hasBlockingChar(pos: Vector2): boolean {
    return this.charBlockCache.isCharBlockingAt(pos);
  }

  getTileWidth(): number {
    const tilemapScale = this.tilemap.layers[0].tilemapLayer.scale;
    return this.tilemap.tileWidth * tilemapScale;
  }

  getTileHeight(): number {
    const tilemapScale = this.tilemap.layers[0].tilemapLayer.scale;
    return this.tilemap.tileHeight * tilemapScale;
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

  private isLayerAlwaysOnTop(
    layerData: Phaser.Tilemaps.LayerData,
    layerIndex: number
  ): boolean {
    return (
      layerIndex >= this.firstLayerAboveChar ||
      this.hasLayerProp(layerData, GridTilemap.ALWAYS_TOP_PROP_NAME)
    );
  }

  private setLayerDepths() {
    const layersToDelete: Phaser.Tilemaps.TilemapLayer[] = [];
    this.tilemap.layers.forEach((layerData, layerIndex) => {
      if (this.isLayerAlwaysOnTop(layerData, layerIndex)) {
        layerData.tilemapLayer.setDepth(
          GridTilemap.FIRST_PLAYER_LAYER +
            GridTilemap.MAX_PLAYER_LAYERS +
            layerIndex
        );
      } else if (
        this.hasLayerProp(layerData, GridTilemap.HEIGHT_SHIFT_PROP_NAME)
      ) {
        this.createLayerForEachRow(layerData, layerIndex);
        layersToDelete.push(layerData.tilemapLayer);
      } else {
        layerData.tilemapLayer.setDepth(layerIndex);
      }
    });
    layersToDelete.forEach((layer) => layer.destroy());
  }

  private createLayerForEachRow(
    layer: Phaser.Tilemaps.LayerData,
    layerIndex: number
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
        GridTilemap.FIRST_PLAYER_LAYER +
          row +
          heightShift -
          1 +
          makeHigherThanPlayerWhenOnSameLevel
      );
    }
  }
}
