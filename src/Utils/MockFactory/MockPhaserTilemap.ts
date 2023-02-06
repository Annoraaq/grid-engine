import { getBlockingProps } from "./MockFactory";

export function createPhaserTilemapLayerStub(
  name?: string
): Phaser.Tilemaps.TilemapLayer {
  const layer = {
    depth: 0,
    setDepth(d: number): Phaser.Tilemaps.TilemapLayer {
      this.depth = d;
      return this;
    },
    scale: 3,
    tileset: [createPhaserTilesetStub("Cloud City")],
    putTileAt(_a, _b, _c) {
      // do nothing
    },
  } as Phaser.Tilemaps.TilemapLayer;
  layer.layer = createPhaserTilemapLayerDataStub(layer, name, []);
  return layer;
}

function createPhaserTilemapLayerDataStub(
  tilemapLayer: Phaser.Tilemaps.TilemapLayer,
  name: string | undefined,
  properties: Array<{ name: string; value: string }>
): Phaser.Tilemaps.LayerData {
  return {
    name: name,
    tilemapLayer,
    properties: [
      ...properties,
      {
        name: "ge_charLayer",
        value: name,
      },
    ],
  } as Phaser.Tilemaps.LayerData;
}

function createPhaserTilesetStub(name: string): Phaser.Tilemaps.Tileset {
  return { name } as Phaser.Tilemaps.Tileset;
}

export function createPhaserTilemapStub(
  blockMap: Map<string | undefined, string[]>
): Phaser.Tilemaps.Tilemap {
  const tilemap: Phaser.Tilemaps.Tilemap = {
    orientation: Phaser.Tilemaps.Orientation.ORTHOGONAL.toString(),
    tileWidth: 16,
    tileHeight: 16,
    hasTileAt(tileX: number, tileY: number, layer?: string) {
      const l = layers.find((l) => l.layer.name === layer);
      if (!l) return false;
      const row = l.layer.data[tileY];
      if (!row) return false;
      return !!l.layer.data[tileY][tileX];
    },
    getTileAt(tileX: number, tileY: number, nonNull?: boolean, layer?: string) {
      const l = layers.find((l) => l.layer.name === layer);
      if (!l) return undefined;
      const row = l.layer.data[tileY];
      if (!row) return undefined;
      return l.layer.data[tileY][tileX];
    },

    createBlankLayer(
      name,
      tileset,
      _x,
      _y,
      width,
      height,
      _tileWidth,
      _tileHeight
    ) {
      const layer = {
        depth: 0,
        setDepth(d: number): Phaser.Tilemaps.TilemapLayer {
          this.depth = d;
          return this;
        },
        scale: 3,
        tileset: [tileset],
        width,
        height,
        putTileAt(
          a: number | Phaser.Tilemaps.Tile,
          tileX: number,
          tileY: number
        ) {
          if (this.layer.data[tileX] === undefined) {
            this.layer.data[tileX] = [];
          }
          this.layer.data[tileX][tileY] = a;
        },
        destroy() {
          // do nothing
        },
      } as Phaser.Tilemaps.TilemapLayer;
      layer.layer = createPhaserTilemapLayerDataStub(layer, name, []);
      layer.layer.data = [];
      this.layers.push(layer.layer);
      return layer;
    },

    getLayer(layer?: string | number | Phaser.Tilemaps.TilemapLayer) {
      return layers.find((l) => l.name == layer);
    },
  } as unknown as Phaser.Tilemaps.Tilemap;
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const layers: Phaser.Tilemaps.TilemapLayer[] = [];
  for (const [layerName, allRows] of blockMap.entries()) {
    let cnt = 0;
    const layer = createPhaserTilemapLayerStub(layerName);
    layer.layer.data = allRows.map((r) => {
      return [...r].map((c) => {
        if (c == "_") {
          return undefined as unknown as Phaser.Tilemaps.Tile;
        } else {
          return {
            properties: [
              ...Object.entries(getBlockingProps(c)).map(([key, val]) => {
                return {
                  name: key,
                  value: val,
                };
              }),
              { name: "id", value: cnt++ },
            ],
          } as Phaser.Tilemaps.Tile;
        }
      });
    });
    layer.height = layer.layer.data.length;
    layer.width = layer.layer.data[0].length;
    layer.layer.height = layer.layer.data.length;
    layer.layer.width = layer.layer.data[0].length;
    layer.destroy = function () {
      tilemap.layers = tilemap.layers.filter((l) => l !== this.layer);
    };
    layers.push(layer);
  }

  tilemap.layers = layers.map((l) => l.layer);
  tilemap.width = layers[0]?.layer.data?.[0]?.length ?? 0;
  tilemap.height = layers[0]?.layer.data?.length ?? 0;

  return tilemap;
}
