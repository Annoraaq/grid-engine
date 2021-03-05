import { Direction } from "./../Direction/Direction";
import * as Phaser from "phaser";
import { GridCharacter } from "../GridCharacter/GridCharacter";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export class GridTilemap {
  private static readonly MAX_PLAYER_LAYERS = 1000;
  static readonly FIRST_PLAYER_LAYER = 1000;
  private static readonly ALWAYS_TOP_PROP_NAME = "gm_alwaysTop";
  private static readonly HEIGHT_SHIFT_PROP_NAME = "gm_heightShift";
  private characters = new Map<string, GridCharacter>();
  constructor(
    private tilemap: Phaser.Tilemaps.Tilemap,
    private firstLayerAboveChar?: number
  ) {
    this.setLayerDepths();
  }

  addCharacter(character: GridCharacter) {
    this.characters.set(character.getId(), character);
  }

  removeCharacter(charId: string) {
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

    const collidesPropName = `gm_collide_${direction}`;
    return this.tilemap.layers.some((layer) => {
      const tile = this.tilemap.getTileAt(pos.x, pos.y, false, layer.name);
      return (
        tile?.properties?.collides ||
        (tile?.properties && tile?.properties[collidesPropName])
      );
    });
  }

  hasNoTile(pos: Vector2): boolean {
    return !this.tilemap.layers.some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.name)
    );
  }

  hasBlockingChar(pos: Vector2): boolean {
    return [...this.characters.values()].some((char) =>
      char.getTilePos().equals(pos)
    );
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
