import * as Phaser from "phaser";
import { GridTilemapPhaser } from "./GridTilemapPhaser";
import { Direction } from "../../Direction/Direction";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { createPhaserTilemapStub } from "../../Utils/MockFactory/MockPhaserTilemap";

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
      ])
    );
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
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
      ])
    );
    tm.layers[1].properties.push({ name: "ge_alwaysTop", value: "true" });
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );

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
      ])
    );
    tm.layers[1].properties = [];
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );

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
      ])
    );
    // Make layers non-char-layers
    tm.layers[0].properties = [];
    tm.layers[1].properties = [];
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );

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
      ])
    );
    tm.layers[1].properties = [
      ...tm.layers[1].properties,
      {
        name: "ge_heightShift",
        value: 1,
      },
    ];
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );

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

    function dataToIdArr(data: Phaser.Tilemaps.Tile[][]): number[][] {
      return data.map((row) =>
        row.map((obj) => {
          return obj.properties?.id;
        })
      );
    }
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
        scaledTileHeight * tilePosition.y
      )
    );
  });

  it("should provide tile distance", () => {
    const scaleFactor = 3;
    const scaledTileWidth = 16 * scaleFactor;
    const scaledTileHeight = 16 * scaleFactor;
    expect(gridTilemap.getTileDistance(Direction.DOWN)).toEqual(
      new Vector2(scaledTileWidth, scaledTileHeight)
    );
  });

  it("should provide tile distance for isometric maps on orthogonal dirs", () => {
    tm.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
    const scaleFactor = 3;
    const scaledTileWidth = 16 * scaleFactor;
    const scaledTileHeight = 16 * scaleFactor;
    expect(gridTilemap.getTileDistance(Direction.DOWN)).toEqual(
      new Vector2(scaledTileWidth, scaledTileHeight)
    );
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
        ])
      );
      tm.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
      gridTilemap = new GridTilemapPhaser(
        tm,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES
      );
    });

    it("should transform tile pos to pixel pos for isometric maps", () => {
      const scaledTileWidth = 16 * scaleFactor;
      const scaledTileHeight = 16 * scaleFactor;
      const tilePosition = new Vector2(2, 3);
      expect(gridTilemap.tilePosToPixelPos(tilePosition)).toEqual(
        new Vector2(
          scaledTileWidth * 0.5 * (tilePosition.x - tilePosition.y),
          scaledTileHeight * 0.5 * (tilePosition.x + tilePosition.y)
        )
      );
    });

    it("should provide tile distance for isometric maps on diagonal dirs", () => {
      const scaledTileWidth = 16 * scaleFactor;
      const scaledTileHeight = 16 * scaleFactor;
      expect(gridTilemap.getTileDistance(Direction.DOWN_LEFT)).toEqual(
        new Vector2(scaledTileWidth * 0.5, scaledTileHeight * 0.5)
      );
    });
  });

  describe("transitions", () => {
    it("should set transitions", () => {
      gridTilemap.setTransition(new Vector2(4, 5), "charLayer2", "charLayer1");
      gridTilemap.setTransition(new Vector2(3, 5), "charLayer2", "charLayer1");
      expect(gridTilemap.getTransition(new Vector2(4, 5), "charLayer2")).toBe(
        "charLayer1"
      );
      expect(gridTilemap.getTransition(new Vector2(3, 5), "charLayer2")).toBe(
        "charLayer1"
      );
      expect(gridTilemap.getTransition(new Vector2(7, 5), "charLayer2")).toBe(
        undefined
      );
    });

    it("should get all transitions", () => {
      const pos1 = new Vector2(4, 5);
      const pos2 = new Vector2(3, 5);
      gridTilemap.setTransition(pos1, "charLayer2", "charLayer1");
      gridTilemap.setTransition(pos2, "charLayer2", "charLayer1");

      const expectedTransitions = new Map();
      expectedTransitions.set(
        pos1.toString(),
        new Map([["charLayer2", "charLayer1"]])
      );
      expectedTransitions.set(
        pos2.toString(),
        new Map([["charLayer2", "charLayer1"]])
      );
      expect(gridTilemap.getTransitions()).toEqual(expectedTransitions);
    });
  });
});
