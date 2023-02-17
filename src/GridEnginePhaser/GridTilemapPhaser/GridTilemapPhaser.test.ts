import * as Phaser from "phaser";
import { GridTilemapPhaser } from "./GridTilemapPhaser";
import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
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
          if (!Array.isArray(obj.properties)) return undefined;
          return obj.properties.find((p) => p.name == "id").value;
        })
      );
    }
  });

  it("should add a character", () => {
    const charMock1 = createCharMock("player", gridTilemap);
    const charMock2 = createCharMock("player2", gridTilemap);
    const charMockSameId = createCharMock("player2", gridTilemap);
    gridTilemap.addCharacter(charMock1);
    gridTilemap.addCharacter(charMock2);
    gridTilemap.addCharacter(charMockSameId);

    expect(gridTilemap.getCharacters()).toEqual([charMock1, charMockSameId]);
  });

  it("should set the lowest char layer", () => {
    const charMock1 = createCharMock("player", gridTilemap);
    charMock1.setTilePosition({
      position: new Vector2(1, 2),
      layer: undefined,
    });
    gridTilemap.addCharacter(charMock1);

    expect(charMock1.getTilePos()).toEqual({
      position: new Vector2(1, 2),
      layer: "lowerCharLayer",
    });
  });

  it("should remove a character", () => {
    const charMock1 = createCharMock("player", gridTilemap);
    charMock1.setTilePosition({
      position: new Vector2(3, 3),
      layer: "lowerCharLayer",
    });
    const charMock2 = createCharMock("player2", gridTilemap);
    gridTilemap.addCharacter(charMock1);
    gridTilemap.addCharacter(charMock2);

    expect(
      gridTilemap.hasBlockingChar(new Vector2(3, 3), "lowerCharLayer", [
        "cGroup",
      ])
    ).toBe(true);

    gridTilemap.removeCharacter("player");

    expect(gridTilemap.getCharacters()).toEqual([charMock2]);
    expect(
      gridTilemap.hasBlockingChar(new Vector2(3, 3), "lowerCharLayer", [
        "cGroup",
      ])
    ).toBe(false);
  });

  it("should find characters", () => {
    const charMocks = new Set<GridCharacter>();
    const char = createCharMock("player", gridTilemap);
    charMocks.add(char);
    gridTilemap.addCharacter(char);
    const set = gridTilemap.getCharactersAt(
      new Vector2(1, 1),
      "lowerCharLayer"
    );
    expect(set).toEqual(charMocks);
  });

  it("should detect blocking tiles", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "..",
            ".#",
          ],
        ],
      ])
    );
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer"
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should not consider missing tiles as blocking", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "..",
            "._",
          ],
        ],
      ])
    );
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      undefined,
      true
    );
    expect(isBlockingTile).toBe(false);
  });

  it("should consider missing tiles as blocking", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "..",
            "._",
          ],
        ],
      ])
    );
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer"
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should detect blocking tiles with custom property", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "..",
            "..",
          ],
        ],
      ])
    );
    tm.getTileAt(1, 1, false, "lowerCharLayer").properties = [
      { name: "custom_collides_prop", value: "true" },
    ];
    gridTilemap = new GridTilemapPhaser(
      tm,
      "custom_collides_prop",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer"
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should detect one-way blocking tiles left free", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "...",
            ".→.",
            "...",
          ],
        ],
      ])
    );
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(false);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(true);
  });

  it("should detect one-way blocking tiles right free", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "...",
            ".←.",
            "...",
          ],
        ],
      ])
    );
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(false);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(true);
  });

  it("should detect one-way blocking tiles up free", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "...",
            ".↓.",
            "...",
          ],
        ],
      ])
    );
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(false);
    expect(isBlockingDown).toBe(true);
  });

  it("should detect one-way blocking tiles down free", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "...",
            ".↑.",
            "...",
          ],
        ],
      ])
    );
    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer",
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(false);
  });

  it("should only consider tiles on charLayer", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "..",
            ".#",
          ],
        ],
        [
          "testCharLayer",
          [
            // prettier-ignore
            "..",
            "..",
          ],
        ],
      ])
    );

    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer"
    );
    expect(isBlockingTile).toBe(true);

    const isBlockingTileUpperLayer = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "testCharLayer"
    );
    expect(isBlockingTileUpperLayer).toBe(false);
  });

  it("should not block if no tile or char blocks", () => {
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      "lowerCharLayer"
    );
    const hasNoTile = gridTilemap.hasNoTile(
      new Vector2(3, 4),
      "lowerCharLayer"
    );
    expect(isBlockingTile).toBe(false);
    expect(hasNoTile).toBe(false);
  });

  it("should block if no tile present", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            "..",
            "._",
          ],
        ],
      ])
    );

    gridTilemap = new GridTilemapPhaser(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const hasNoTile = gridTilemap.hasNoTile(
      new Vector2(1, 1),
      "lowerCharLayer"
    );
    expect(hasNoTile).toBe(true);
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "lowerCharLayer"
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should detect an unblocked tile", () => {
    const char = createCharMock("player1", gridTilemap);
    gridTilemap.addCharacter(char);
    const freePosBlocked = gridTilemap.hasBlockingChar(
      new Vector2(3, 3),
      "lowerCharLayer",
      ["cGroup"]
    );
    const occupiedPosBlocked = gridTilemap.hasBlockingChar(
      new Vector2(1, 1),
      "lowerCharLayer",
      ["cGroup"]
    );
    expect(freePosBlocked).toBe(false);
    expect(occupiedPosBlocked).toBe(true);
  });

  it("should get scaled tile width", () => {
    expect(gridTilemap.getTileWidth()).toEqual(48);
  });

  it("should get scaled tile height", () => {
    expect(gridTilemap.getTileHeight()).toEqual(48);
  });

  it("should get positions in range", () => {
    expect(gridTilemap.isInRange(new Vector2({ x: 10, y: 20 }))).toBe(false);
    expect(gridTilemap.isInRange(new Vector2({ x: 0, y: 0 }))).toBe(true);
    expect(gridTilemap.isInRange(new Vector2({ x: 1, y: 1 }))).toBe(true);
    expect(gridTilemap.isInRange(new Vector2({ x: -1, y: -1 }))).toBe(false);
  });

  it("should get tileSize", () => {
    const scaleFactor = 3;
    const scaledTileWidth = 16 * scaleFactor;
    const scaledTileHeight = 16 * scaleFactor;
    expect(gridTilemap.getTileSize()).toEqual(
      new Vector2(scaledTileWidth, scaledTileHeight)
    );
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

  it("should provide map direction", () => {
    expect(gridTilemap.toMapDirection(Direction.DOWN)).toEqual(Direction.DOWN);
    expect(gridTilemap.fromMapDirection(Direction.DOWN)).toEqual(
      Direction.DOWN
    );
  });

  it("should detect non-isometric maps", () => {
    expect(gridTilemap.isIsometric()).toEqual(false);
  });

  it("should get tile pos in direction", () => {
    const pos: LayerVecPos = {
      position: new Vector2(5, 5),
      layer: "charLayer1",
    };
    gridTilemap.setTransition(new Vector2(6, 5), "charLayer1", "charLayer2");
    expect(gridTilemap.getTilePosInDirection(pos, Direction.DOWN)).toEqual({
      position: new Vector2(5, 6),
      layer: "charLayer1",
    });
    expect(gridTilemap.getTilePosInDirection(pos, Direction.UP_LEFT)).toEqual({
      position: new Vector2(4, 4),
      layer: "charLayer1",
    });
    expect(gridTilemap.getTilePosInDirection(pos, Direction.RIGHT)).toEqual({
      position: new Vector2(6, 5),
      layer: "charLayer2",
    });
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

    it("should detect isometric maps", () => {
      expect(gridTilemap.isIsometric()).toEqual(true);
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

    it("should provide map direction", () => {
      expect(gridTilemap.toMapDirection(Direction.DOWN)).toEqual(
        Direction.DOWN_RIGHT
      );
      expect(gridTilemap.fromMapDirection(Direction.DOWN_RIGHT)).toEqual(
        Direction.DOWN
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

  function createCharMock(
    id = "player",
    tilemap: GridTilemapPhaser
  ): GridCharacter {
    const char = new GridCharacter(id, {
      tilemap: tilemap as any,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      collisionGroups: ["cGroup"],
    });
    char.setTilePosition({
      position: new Vector2(1, 1),
      layer: "lowerCharLayer",
    });
    return char;
  }
});
