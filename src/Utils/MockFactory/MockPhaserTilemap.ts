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
  const layers: Phaser.Tilemaps.TilemapLayer[] = [];
  for (const [layerName, allRows] of blockMap.entries()) {
    const layer = createPhaserTilemapLayerStub(layerName);
    layer.layer.data = allRows.map((r) => {
      return [...r].map((c) => {
        if (c === "#") {
          return {
            properties: {
              ge_collide: "true",
            },
          } as Phaser.Tilemaps.Tile;
        }

        return {} as Phaser.Tilemaps.Tile;
      });
    });
    layers.push(layer);
  }

  const tilemap: Phaser.Tilemaps.Tilemap = {
    orientation: Phaser.Tilemaps.Orientation.ORTHOGONAL.toString(),
    layers: layers.map((l) => l.layer),
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
      x,
      y,
      width,
      height,
      tileWidth,
      tileHeight
    ) {
      return {} as Phaser.Tilemaps.TilemapLayer;
    },

    getLayer(layer?: string | number | Phaser.Tilemaps.TilemapLayer) {
      return layers.find((l) => l.name == layer);
    },
  } as unknown as Phaser.Tilemaps.Tilemap;

  return tilemap;
}
