import * as Phaser from "phaser";
import { GridTilemapPhaser } from "./GridTilemapPhaser.js";
import { Direction } from "../../Direction/Direction.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { createPhaserTilemapStub } from "../../Utils/MockFactory/MockPhaserTilemap.js";

describe("GridTilemapPhaser", () => {
  let gridTilemap: GridTilemapPhaser;
  let tm: Phaser.Tilemaps.Tilemap;

  beforeEach(() => {
    tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            ".....",
            ".....",
            ".....",
            ".....",
            ".....",
            ".....",
          ],
        ],
        [
          "testCharLayer",
          [
            // prettier-ignore
            ".....",
            ".....",
            ".....",
            ".....",
            ".....",
            ".....",
          ],
        ],
      ]),
    );
    gridTilemap = new GridTilemapPhaser(tm);
  });

  it("should set layer depths on construction", () => {
    expect(tm.layers[0].tilemapLayer.depth).toEqual(0);
    expect(tm.layers[1].tilemapLayer.depth).toEqual(1);
  });

  it("should consider legacy 'ge_alwaysTop' flag of tile layer", () => {
    tm = createPhaserTilemapStub(
      new Map([
        ["lowerCharLayer", ["."]],
        ["alwaysOnTopLayer", ["."]],
        ["upperCharLayer", ["."]],
      ]),
    );
    tm.layers[1].properties.push({ name: "ge_alwaysTop", value: "true" });
    gridTilemap = new GridTilemapPhaser(tm);

    expect(tm.layers[0].tilemapLayer.depth).toBe(0);
    expect(tm.layers[1].tilemapLayer.depth).toBe(2);
    expect(tm.layers[2].tilemapLayer.depth).toBe(1);
  });

  it("should consider charLayers", () => {
    tm = createPhaserTilemapStub(
      new Map([
        ["lowerCharLayer", ["."]],
        ["noCharLayer", ["."]],
        ["upperCharLayer", ["."]],
      ]),
    );
    tm.layers[1].properties = [];
    gridTilemap = new GridTilemapPhaser(tm);

    expect(tm.layers[0].tilemapLayer.depth).toBe(0);
    expect(tm.layers[1].tilemapLayer.depth).toBe(1);
    expect(tm.layers[2].tilemapLayer.depth).toBe(2);
    expect(gridTilemap.getDepthOfCharLayer("lowerCharLayer")).toEqual(0);
    expect(gridTilemap.getDepthOfCharLayer("upperCharLayer")).toEqual(2);
  });

  it("should return highest non-char layer for undefined layer", () => {
    tm = createPhaserTilemapStub(
      new Map([
        ["lowestNoCharLayer", ["."]],
        ["highestNoCharLayer", ["."]],
      ]),
    );
    // Make layers non-char-layers
    tm.layers[0].properties = [];
    tm.layers[1].properties = [];
    gridTilemap = new GridTilemapPhaser(tm);

    expect(gridTilemap.getDepthOfCharLayer(undefined)).toEqual(1);
  });

  it("should consider 'heightShift' layer", () => {
    tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "..",
            "..",
          ],
        ],
        [
          "heightShiftLayer",
          [
            // prettier-ignore
            "..",
            "..",
          ],
        ],
      ]),
    );
    tm.layers[1].properties = [
      ...tm.layers[1].properties,
      {
        name: "ge_heightShift",
        value: 1,
      },
    ];
    gridTilemap = new GridTilemapPhaser(tm);

    expect(tm.layers.length).toBe(3);
    expect(tm.layers[0].name).toEqual("lowerCharLayer");
    expect(tm.layers[1].name).toEqual("heightShiftLayer#0");
    expect(tm.layers[2].name).toEqual("heightShiftLayer#1");
    expect(dataToIdArr(tm.layers[1].data)).toEqual([
      [0, 1],
      [undefined, undefined],
    ]);
    expect(dataToIdArr(tm.layers[2].data)).toEqual([
      [undefined, undefined],
      [2, 3],
    ]);
    expect(tm.layers[1].tilemapLayer.depth).toBe(0.0000049);
    expect(tm.layers[2].tilemapLayer.depth).toBe(0.0000097);
  });

  it("should get scaled tile width", () => {
    expect(gridTilemap.getTileWidth()).toEqual(48);
  });

  it("should get scaled tile height", () => {
    expect(gridTilemap.getTileHeight()).toEqual(48);
  });

  it("should transform tile pos to pixel pos", () => {
    const scaleFactor = 3;
    const scaledTileWidth = 16 * scaleFactor;
    const scaledTileHeight = 16 * scaleFactor;
    const tilePosition = new Vector2(2, 3);
    expect(gridTilemap.tilePosToPixelPos(tilePosition)).toEqual(
      new Vector2(
        scaledTileWidth * tilePosition.x,
        scaledTileHeight * tilePosition.y,
      ),
    );
  });

  it("should provide tile distance", () => {
    const scaleFactor = 3;
    const scaledTileWidth = 16 * scaleFactor;
    const scaledTileHeight = 16 * scaleFactor;
    expect(gridTilemap.getTileDistance(Direction.DOWN)).toEqual(
      new Vector2(scaledTileWidth, scaledTileHeight),
    );
  });

  it("should provide tile distance for isometric maps on orthogonal dirs", () => {
    tm.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
    const scaleFactor = 3;
    const scaledTileWidth = 16 * scaleFactor;
    const scaledTileHeight = 16 * scaleFactor;
    expect(gridTilemap.getTileDistance(Direction.DOWN)).toEqual(
      new Vector2(scaledTileWidth, scaledTileHeight),
    );
  });

  it("should get scaled tile width from layerless tile map", () => {
    tm = createPhaserTilemapStub(new Map());
    gridTilemap = new GridTilemapPhaser(tm);
    expect(gridTilemap.getTileWidth()).toEqual(16);
  });

  it("should get scaled tile height from layerless tile map", () => {
    tm = createPhaserTilemapStub(new Map());
    gridTilemap = new GridTilemapPhaser(tm);
    expect(gridTilemap.getTileHeight()).toEqual(16);
  });

  describe("isometric", () => {
    const scaleFactor = 3;

    beforeEach(() => {
      const tm = createPhaserTilemapStub(
        new Map([
          [
            "lowerCharLayer",
            [
              // prettier-ignore
              ".....",
              ".....",
              ".....",
              ".....",
              ".....",
              ".....",
            ],
          ],
          [
            "testCharLayer",
            [
              // prettier-ignore
              ".....",
              ".....",
              ".....",
              ".....",
              ".....",
              ".....",
            ],
          ],
        ]),
      );
      tm.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
      gridTilemap = new GridTilemapPhaser(tm);
    });

    it("should transform tile pos to pixel pos for isometric maps", () => {
      const scaledTileWidth = 16 * scaleFactor;
      const scaledTileHeight = 16 * scaleFactor;
      const tilePosition = new Vector2(2, 3);
      expect(gridTilemap.tilePosToPixelPos(tilePosition)).toEqual(
        new Vector2(
          scaledTileWidth * 0.5 * (tilePosition.x - tilePosition.y),
          scaledTileHeight * 0.5 * (tilePosition.x + tilePosition.y),
        ),
      );
    });

    it("should provide tile distance for isometric maps on diagonal dirs", () => {
      const scaledTileWidth = 16 * scaleFactor;
      const scaledTileHeight = 16 * scaleFactor;
      expect(gridTilemap.getTileDistance(Direction.DOWN_LEFT)).toEqual(
        new Vector2(scaledTileWidth * 0.5, scaledTileHeight * 0.5),
      );
    });

    it("should consider 'heightShift' layer", () => {
      tm = createPhaserTilemapStub(
        new Map([
          [
            "lowerCharLayer",
            [
              // prettier-ignore
              "..",
              "..",
            ],
          ],
          [
            "heightShiftLayer",
            [
              // prettier-ignore
              "..",
              "..",
            ],
          ],
        ]),
      );
      tm.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
      tm.layers[1].properties = [
        ...tm.layers[1].properties,
        {
          name: "ge_heightShift",
          value: 1,
        },
      ];
      gridTilemap = new GridTilemapPhaser(tm);

      expect(tm.layers.length).toBe(3);
      expect(tm.layers[0].name).toEqual("lowerCharLayer");
      expect(tm.layers[1].name).toEqual("heightShiftLayer#0");
      expect(tm.layers[2].name).toEqual("heightShiftLayer#1");
      expect(dataToIdArr(tm.layers[1].data)).toEqual([
        [0, undefined],
        [undefined, undefined],
      ]);
      expect(dataToIdArr(tm.layers[2].data)).toEqual([
        [undefined, 1],
        [2, undefined],
      ]);
      expect(tm.layers[1].tilemapLayer.depth).toBe(0.0000025);
      expect(tm.layers[2].tilemapLayer.depth).toBe(0.0000049);
    });
  });
});
function dataToIdArr(data: Phaser.Tilemaps.Tile[][]): number[][] {
  return data.map((row) =>
    row.map((obj) => {
      return obj.properties?.id;
    }),
  );
}
