import { CharLayer, Direction } from "../../GridEngine.js";
import { Utils } from "../../Utils/Utils/Utils.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { VectorUtils } from "../../Utils/VectorUtils.js";

export class GridTilemapPhaser {
  private static readonly ALWAYS_TOP_PROP_NAME = "ge_alwaysTop";
  private static readonly CHAR_LAYER_PROP_NAME = "ge_charLayer";
  private static readonly HEIGHT_SHIFT_PROP_NAME = "ge_heightShift";
  static readonly Z_INDEX_PADDING = 7;
  private charLayerDepths = new Map<CharLayer, number>();

  constructor(private tilemap: Phaser.Tilemaps.Tilemap) {
    this.setLayerDepths();
  }

  getTileWidth(): number {
    const tilemapScale = this.tilemap.layers[0]?.tilemapLayer.scale ?? 1;
    return this.tilemap.tileWidth * tilemapScale;
  }

  getTileHeight(): number {
    const tilemapScale = this.tilemap.layers[0]?.tilemapLayer.scale ?? 1;
    return this.tilemap.tileHeight * tilemapScale;
  }

  getDepthOfCharLayer(layerName: CharLayer): number {
    return this.charLayerDepths.get(layerName) ?? 0;
  }

  tilePosToPixelPos(tilePosition: Vector2): Vector2 {
    if (this.isIsometric()) {
      return VectorUtils.scalarMult(this.getTileSize(), 0.5).multiply(
        new Vector2(
          tilePosition.x - tilePosition.y,
          tilePosition.x + tilePosition.y,
        ),
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

  private getTileSize(): Vector2 {
    return new Vector2(this.getTileWidth(), this.getTileHeight());
  }

  private isIsometric(): boolean {
    // Against the documentation of phaser, tilemap seems to be a number instead
    // of a string. Therefore the intentional type coercion here.
    return (
      this.tilemap.orientation ==
      Phaser.Tilemaps.Orientation.ISOMETRIC.toString()
    );
  }

  private isLayerAlwaysOnTop(layerData: Phaser.Tilemaps.LayerData): boolean {
    return this.hasLayerProp(layerData, GridTilemapPhaser.ALWAYS_TOP_PROP_NAME);
  }

  private isCharLayer(layerData: Phaser.Tilemaps.LayerData): boolean {
    return this.hasLayerProp(layerData, GridTilemapPhaser.CHAR_LAYER_PROP_NAME);
  }

  private setLayerDepths() {
    const layersToDelete: Phaser.Tilemaps.TilemapLayer[] = [];
    let offset = -1;
    const alwaysOnTopLayers = this.tilemap.layers.filter((l) =>
      this.isLayerAlwaysOnTop(l),
    );
    const otherLayers = this.tilemap.layers.filter(
      (l) => !this.isLayerAlwaysOnTop(l),
    );
    otherLayers.forEach((layerData) => {
      if (
        this.hasLayerProp(layerData, GridTilemapPhaser.HEIGHT_SHIFT_PROP_NAME)
      ) {
        this.createHeightShiftLayers(layerData, offset);
        layersToDelete.push(layerData.tilemapLayer);
      } else {
        this.setDepth(layerData, ++offset);
      }
    });
    this.charLayerDepths.set(undefined, offset);
    alwaysOnTopLayers.forEach((layer, layerIndex) => {
      layer.tilemapLayer.setDepth(layerIndex + 1 + offset);
    });

    layersToDelete.forEach((layer) => layer.destroy());
  }

  private setDepth(layerData: Phaser.Tilemaps.LayerData, depth: number): void {
    layerData.tilemapLayer.setDepth(depth);
    if (this.isCharLayer(layerData)) {
      this.charLayerDepths.set(
        this.getLayerProp(layerData, GridTilemapPhaser.CHAR_LAYER_PROP_NAME),
        depth,
      );
    }
  }

  private createHeightShiftLayers(
    layer: Phaser.Tilemaps.LayerData,
    offset: number,
  ) {
    let heightShift = this.getLayerProp(
      layer,
      GridTilemapPhaser.HEIGHT_SHIFT_PROP_NAME,
    );
    if (isNaN(heightShift)) heightShift = 0;

    const makeHigherThanCharWhenOnSameLevel = 1;
    for (let row = 0; row < layer.height; row++) {
      const newLayer = this.copyLayer(layer, row);
      if (newLayer) {
        newLayer.scale = layer.tilemapLayer.scale;
        const tileHeight = this.isIsometric()
          ? this.getTileHeight() / 2
          : this.getTileHeight();
        newLayer.setDepth(
          offset +
            Utils.shiftPad(
              (row + heightShift) * tileHeight +
                makeHigherThanCharWhenOnSameLevel,
              GridTilemapPhaser.Z_INDEX_PADDING,
            ),
        );
      }
    }
  }

  private getLayerProp(layer: Phaser.Tilemaps.LayerData, name: string): any {
    const layerProps = layer.properties as [{ name: any; value: any }];
    const prop = layerProps.find((el) => el.name == name);
    return prop?.value;
  }

  private hasLayerProp(
    layer: Phaser.Tilemaps.LayerData,
    name: string,
  ): boolean {
    return this.getLayerProp(layer, name) != undefined;
  }

  private copyLayer(
    layerData: Phaser.Tilemaps.LayerData,
    row: number,
  ): Phaser.Tilemaps.TilemapLayer | undefined {
    const name = `${layerData.name}#${row}`;
    const newLayer = this.tilemap.createBlankLayer(
      name,
      layerData.tilemapLayer.tileset,
    );

    if (!newLayer) return undefined;

    // Somehow phaser does not catch the name through the createBlankLayer
    // method.
    newLayer.name = name;
    if (this.isIsometric()) {
      for (let r = row; r >= 0; r--) {
        const col = row - r;
        newLayer.putTileAt(layerData.data[r][col], col, r);
      }
    } else {
      for (let col = 0; col < layerData.width; col++) {
        newLayer.putTileAt(layerData.data[row][col], col, row);
      }
    }
    return newLayer;
  }
}
