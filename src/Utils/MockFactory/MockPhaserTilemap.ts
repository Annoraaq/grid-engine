import { getBlockingProps } from "./MockFactory";

export function createPhaserTilemapStub(
  blockMap: Map<string | undefined, string[]>
): Phaser.Tilemaps.Tilemap {
  const game = new Phaser.Game({ type: Phaser.HEADLESS });

  const scene = new Phaser.Scene({});
  game.scene.add("test", scene);
  // This method is added dynamically, so it will exist at runtime.
  // @ts-ignore
  scene.sys.init(game);
  const mapData = parseBlockMap(blockMap);
  mapData.tilesets = [new Phaser.Tilemaps.Tileset("Test tileset", 0)];
  const tm = new Phaser.Tilemaps.Tilemap(scene, mapData);
  for (let i = 0; i < tm.layers.length; i++) {
    const layer = tm.createLayer(i, "Test tileset", 0, 0);
    layer.scale = 3;
  }
  return tm;
}

function parseBlockMap(
  blockMap: Map<string | undefined, string[]>
): Phaser.Tilemaps.MapData {
  const layers: Phaser.Tilemaps.LayerData[] = [];

  for (const [layerName, allRows] of blockMap.entries()) {
    const ld = createLayer(layerName, allRows);
    if (ld) {
      layers.push(ld);
    }
  }

  const mapData = new Phaser.Tilemaps.MapData({
    tileWidth: 16,
    tileHeight: 16,
    layers,
  });

  mapData.width = layers[0]?.width || 0;
  mapData.height = layers[0]?.height || 0;
  mapData.widthInPixels = layers[0]?.widthInPixels || 0;
  mapData.heightInPixels = layers[0]?.heightInPixels || 0;

  return mapData;
}

function createLayer(layerName: string | undefined, allRows: string[]) {
  const layerData = new Phaser.Tilemaps.LayerData({
    name: layerName,
    tileWidth: 16,
    tileHeight: 16,
    height: allRows.length,
    width: allRows[0].length,
    properties: [
      {
        name: "ge_charLayer",
        value: layerName,
      },
    ],
  });
  layerData.widthInPixels = allRows[0]?.length || 0 * 16;
  layerData.heightInPixels = allRows.length * 16;
  const tiles: Array<Array<Phaser.Tilemaps.Tile | undefined>> = [];
  let cnt = 0;
  for (let r = 0; r < allRows.length; r++) {
    tiles[r] = [];
    for (let c = 0; c < allRows[r].length; c++) {
      if (allRows[r][c] == "_") {
        return undefined;
      } else {
        // Phaser also uses the ctor like this, so the types seem to be wrong.
        // @ts-ignore
        const tile = new Phaser.Tilemaps.Tile(layerData, 1, c, r, 16, 16);
        tile.properties = [
          ...Object.entries(getBlockingProps(allRows[r][c])).map(
            ([key, val]) => {
              return {
                name: key,
                value: val,
              };
            }
          ),
          { name: "id", value: cnt++ },
        ];
        tiles[r][c] = tile;
      }
    }
  }
  // Phaser also uses the ctor like this, so the types seem to be wrong.
  // @ts-ignore
  layerData.data = tiles;
  return layerData;
}
