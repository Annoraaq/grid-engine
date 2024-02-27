import { CollisionStrategy } from "./../Collisions/CollisionStrategy.js";
import { GridCharacter } from "./../GridCharacter/GridCharacter.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import { Direction, NumberOfDirections } from "./../Direction/Direction.js";
import { GridTilemap } from "./GridTilemap.js";
import {
  mockLayeredBlockMap,
  updateLayer,
} from "../Utils/MockFactory/MockFactory.js";
import { MockTilemap } from "../Utils/MockFactory/MockTilemap.js";
import { Tilemap } from "./Tilemap.js";
import { Rect } from "../Utils/Rect/Rect.js";
import { LayerVecPos } from "../Utils/LayerPositionUtils/LayerPositionUtils.js";

describe("GridTilemap", () => {
  let gridTilemap: GridTilemap;
  let tilemap: Tilemap;

  beforeEach(() => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "charLayer1",
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
      {
        layer: "charLayer2",
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    console.warn = jest.fn();
  });

  it("should consider sub-layers for blocking", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".#",
          "..",
        ],
      },
      {
        layer: "noCharLayer",
        isCharLayer: false,
        blockMap: [
          // prettier-ignore
          "..",
          ".#",
        ],
      },
      {
        layer: "upperCharLayer",
        blockMap: [
          // prettier-ignore
          "..",
          "#.",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 0), "lowerCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 1), "lowerCharLayer"),
    ).toBe(false);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 1), "upperCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 1), "upperCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(0, 1), "upperCharLayer"),
    ).toBe(true);
  });

  it("should consider sub-layers for no tile", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          "..",
        ],
      },
      {
        layer: "noCharLayer",
        isCharLayer: false,
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
      {
        layer: "upperCharLayer",
        blockMap: [
          // prettier-ignore
          "..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    expect(gridTilemap.hasNoTile(new Vector2(1, 1), "lowerCharLayer")).toBe(
      true,
    );
    expect(gridTilemap.hasNoTile(new Vector2(1, 1), "upperCharLayer")).toBe(
      false,
    );
  });

  it("should not consider ge_collide: false as blocking", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: ["."],
      },
    ]);
    // @ts-ignore
    tm.getLayers()[0].data[0][0].properties["ge_collide"] = false;
    gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    expect(
      gridTilemap.hasBlockingTile(new Vector2(0, 0), "lowerCharLayer"),
    ).toBe(false);
  });

  it("should add a character", () => {
    gridTilemap = new GridTilemap(
      new MockTilemap(),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const char1 = new GridCharacter("player1", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    const char2 = new GridCharacter("player2", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    const charSameId = new GridCharacter("player2", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    gridTilemap.addCharacter(char1);
    gridTilemap.addCharacter(char2);
    gridTilemap.addCharacter(charSameId);

    expect(gridTilemap.getCharacters()).toEqual([char1, charSameId]);
  });

  it("shows a warning on unknown char layer", () => {
    const unknownCharLayerChar = new GridCharacter("char_with_unknown_layer", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    unknownCharLayerChar.setTilePosition({
      position: new Vector2(0, 0),
      layer: "unknown",
    });

    gridTilemap.addCharacter(unknownCharLayerChar);

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        `Char layer 'unknown' of character 'char_with_unknown_layer' is unknown.`,
      ),
    );
  });

  it("shows no warning on known char layer", () => {
    const char = new GridCharacter("char_with_known_layer", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    char.setTilePosition({
      position: new Vector2(0, 0),
      layer: "charLayer1",
    });

    gridTilemap.addCharacter(char);

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("should set the lowest char layer", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "noCharLayer",
        isCharLayer: false,
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
      {
        layer: "charLayer1",
        charLayerName: "differentNameThanTiledLayer",
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
      {
        layer: "charLayer2",
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const char1 = new GridCharacter("player1", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });

    gridTilemap.addCharacter(char1);
    expect(char1.getTilePos()).toEqual({
      position: new Vector2(0, 0),
      layer: "differentNameThanTiledLayer",
    });
  });

  it("should remove a character", () => {
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const char1 = new GridCharacter("player1", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    const char2 = new GridCharacter("player2", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    gridTilemap.addCharacter(char1);
    gridTilemap.addCharacter(char2);
    gridTilemap.removeCharacter("player1");

    expect(gridTilemap.getCharacters().map((c) => c.getId())).toEqual([
      "player2",
    ]);
  });

  it("should find characters", () => {
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    const char1 = new GridCharacter("player", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    gridTilemap.addCharacter(char1);

    const set = gridTilemap.getCharactersAt(new Vector2(0, 0), "charLayer1");
    expect(set).toEqual(new Set([char1]));
  });

  it("should find characters without layer", () => {
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    const char1 = new GridCharacter("player", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      charLayer: undefined,
    });
    gridTilemap.addCharacter(char1);
    char1.setTilePosition({
      position: new Vector2({ x: 0, y: 0 }),
      layer: undefined,
    });

    const set = gridTilemap.getCharactersAt(new Vector2(0, 0));
    expect(set).toEqual(new Set([char1]));
  });

  it("should detect blocking tiles", () => {
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should not consider missing tiles as blocking", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "test",
        blockMap: [
          // prettier-ignore
          "..",
          "._",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      undefined,
      true,
    );
    expect(isBlockingTile).toBe(false);
  });

  it("should detect blocking tiles with custom property", () => {
    // Simplest way to set a property on a tile.
    // @ts-ignore
    tilemap.getTileAt(1, 1, "charLayer1").properties["custom_collides_prop"] =
      "true";

    gridTilemap = new GridTilemap(
      tilemap,
      "custom_collides_prop",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "charLayer1",
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should detect one-way blocking tiles left", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "test",
        blockMap: [
          // prettier-ignore
          "...",
          ".←.",
          "...",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.LEFT,
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.RIGHT,
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.UP,
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.DOWN,
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(false);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(true);
  });

  it("should detect one-way blocking tiles right", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "test",
        blockMap: [
          // prettier-ignore
          "...",
          ".→.",
          "...",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.LEFT,
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.RIGHT,
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.UP,
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.DOWN,
    );
    expect(isBlockingLeft).toBe(false);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(true);
  });

  it("should detect one-way blocking tiles up", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "test",
        blockMap: [
          // prettier-ignore
          "...",
          ".↑.",
          "...",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.LEFT,
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.RIGHT,
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.UP,
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.DOWN,
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(false);
  });

  it("should detect one-way blocking tiles down", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "test",
        blockMap: [
          // prettier-ignore
          "...",
          ".↓.",
          "...",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.LEFT,
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.RIGHT,
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.UP,
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.DOWN,
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(false);
    expect(isBlockingDown).toBe(true);
  });

  it("should only consider tiles on charLayer", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "charLayer1",
        blockMap: [
          // prettier-ignore
          "..",
          ".#",
        ],
      },
      {
        layer: "charLayer2",
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
    ]);

    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "charLayer1",
    );
    expect(isBlockingTile).toBe(true);

    const isBlockingTileUpperLayer = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "charLayer2",
    );
    expect(isBlockingTileUpperLayer).toBe(false);
  });

  it("should block if no tile", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "test",
        blockMap: [
          // prettier-ignore
          "..",
          "._",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const isBlocking = gridTilemap.hasBlockingTile(new Vector2(1, 1), "test");
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(1, 1), "test");
    expect(isBlocking).toBe(true);
    expect(hasNoTile).toBe(true);
  });

  it("should detect blocking char", () => {
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    const char = new GridCharacter("player1", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      collisionGroups: ["cGroup"],
    });
    char.setTilePosition({ position: new Vector2(1, 1), layer: "charLayer1" });
    gridTilemap.addCharacter(char);

    expect(
      gridTilemap.hasBlockingChar(new Vector2(1, 1), "charLayer1", ["cGroup"]),
    ).toBe(true);
  });

  it("should consider ignored collision groups", () => {
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    const char = new GridCharacter("player1", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      collisionGroups: ["cGroup", "ignoredGroup"],
    });
    char.setTilePosition({ position: new Vector2(1, 1), layer: "charLayer1" });
    gridTilemap.addCharacter(char);

    expect(
      gridTilemap.hasBlockingChar(new Vector2(1, 1), "charLayer1", ["cGroup"]),
    ).toBe(true);

    expect(
      gridTilemap.hasBlockingChar(
        new Vector2(1, 1),
        "charLayer1",
        ["cGroup"],
        new Set(),
        new Set(["ignoredGroup"]),
      ),
    ).toBe(false);
  });

  it("should detect an unblocked tile", () => {
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    const char = new GridCharacter("player1", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      collisionGroups: ["cGroup"],
    });
    char.setTilePosition({ position: new Vector2(1, 1), layer: "charLayer1" });
    gridTilemap.addCharacter(char);

    const hasBlockingChar = gridTilemap.hasBlockingChar(
      new Vector2(0, 0),
      "charLayer1",
      ["cGroup"],
    );
    expect(hasBlockingChar).toBe(false);
  });

  it("should get positions in range", () => {
    expect(gridTilemap.isInRange(new Vector2({ x: 10, y: 20 }))).toBe(false);
    expect(gridTilemap.isInRange(new Vector2({ x: 0, y: 0 }))).toBe(true);
    expect(gridTilemap.isInRange(new Vector2({ x: 1, y: 1 }))).toBe(true);
    expect(gridTilemap.isInRange(new Vector2({ x: -1, y: -1 }))).toBe(false);
  });

  it("should provide map direction", () => {
    expect(gridTilemap.toMapDirection(Direction.DOWN)).toEqual(Direction.DOWN);
    expect(gridTilemap.fromMapDirection(Direction.DOWN)).toEqual(
      Direction.DOWN,
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
    beforeEach(() => {
      const phaserTilemap = mockLayeredBlockMap(
        [
          {
            layer: "charLayer1",
            blockMap: [
              // prettier-ignore
              "..",
              "..",
            ],
          },
        ],
        true,
      );
      gridTilemap = new GridTilemap(
        phaserTilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
    });

    it("should detect isometric maps", () => {
      expect(gridTilemap.isIsometric()).toEqual(true);
    });

    it("should provide map direction", () => {
      expect(gridTilemap.toMapDirection(Direction.DOWN)).toEqual(
        Direction.DOWN_RIGHT,
      );
      expect(gridTilemap.fromMapDirection(Direction.DOWN_RIGHT)).toEqual(
        Direction.DOWN,
      );
    });
  });

  describe("transitions", () => {
    it("should set transitions", () => {
      gridTilemap = new GridTilemap(
        tilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridTilemap.setTransition(new Vector2(4, 5), "charLayer2", "charLayer1");
      gridTilemap.setTransition(new Vector2(3, 5), "charLayer2", "charLayer1");
      expect(gridTilemap.getTransition(new Vector2(4, 5), "charLayer2")).toBe(
        "charLayer1",
      );
      expect(gridTilemap.getTransition(new Vector2(3, 5), "charLayer2")).toBe(
        "charLayer1",
      );
      expect(gridTilemap.getTransition(new Vector2(7, 5), "charLayer2")).toBe(
        undefined,
      );
    });

    it("should get all transitions", () => {
      const pos1 = new Vector2(4, 5);
      const pos2 = new Vector2(3, 5);
      gridTilemap = new GridTilemap(
        tilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridTilemap.setTransition(pos1, "charLayer2", "charLayer1");
      gridTilemap.setTransition(pos2, "charLayer2", "charLayer1");

      const expectedTransitions = new Map();
      expectedTransitions.set(
        pos1.toString(),
        new Map([["charLayer2", "charLayer1"]]),
      );
      expectedTransitions.set(
        pos2.toString(),
        new Map([["charLayer2", "charLayer1"]]),
      );
      expect(gridTilemap.getTransitions()).toEqual(expectedTransitions);
    });
  });

  it("rebuilds cache partially", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          "#...",
          ".##.",
          ".##.",
          "....",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
      undefined,
      true,
    );

    expect(
      gridTilemap.hasBlockingTile(new Vector2(0, 0), "lowerCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 1), "lowerCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(2, 1), "lowerCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 2), "lowerCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(2, 2), "lowerCharLayer"),
    ).toBe(true);

    updateLayer(
      tm,
      [
        // prettier-ignore
        "....",
        "....",
        "....",
        "....",
      ],
      "lowerCharLayer",
    );

    gridTilemap.rebuildTileCollisionCache(new Rect(1, 1, 2, 1));

    expect(
      gridTilemap.hasBlockingTile(new Vector2(0, 0), "lowerCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 1), "lowerCharLayer"),
    ).toBe(false);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(2, 1), "lowerCharLayer"),
    ).toBe(false);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 2), "lowerCharLayer"),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(2, 2), "lowerCharLayer"),
    ).toBe(true);
  });

  it("rebuilds cache partially", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".#",
          "..",
        ],
      },
      {
        layer: "upperCharLayer",
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
      undefined,
      true,
    );

    gridTilemap.fixCacheLayer("lowerCharLayer");

    expect(
      gridTilemap.hasBlockingTile(
        new Vector2(1, 0),
        "lowerCharLayer",
        undefined,
      ),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(
        new Vector2(1, 0),
        "upperCharLayer",
        undefined,
      ),
    ).toBe(true);

    gridTilemap.unfixCacheLayers();

    expect(
      gridTilemap.hasBlockingTile(
        new Vector2(1, 0),
        "lowerCharLayer",
        undefined,
      ),
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(
        new Vector2(1, 0),
        "upperCharLayer",
        undefined,
      ),
    ).toBe(false);
  });

  describe("tile costs", () => {
    it("should consider tile costs", () => {
      tilemap = mockLayeredBlockMap(
        [
          {
            layer: "test",
            blockMap: [
              // prettier-ignore
              "...",
              "...",
              "...",
            ],
          },
        ],
        false,
        [
          {
            layer: "test",
            costMap: [
              [1, 1, 1],
              [1, 3, 1],
              [1, 1, 1],
            ],
          },
        ],
      );
      gridTilemap = new GridTilemap(
        tilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const pos = { position: new Vector2(1, 1), layer: "test" };
      expect(gridTilemap.getTileCosts(pos)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.LEFT)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.RIGHT)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.UP)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.UP_LEFT)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.UP_RIGHT)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN_LEFT)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN_RIGHT)).toBe(3);
    });

    it("should consider different tile costs", () => {
      tilemap = mockLayeredBlockMap(
        [
          {
            layer: "test",
            blockMap: [
              // prettier-ignore
              "...",
              "...",
              "...",
            ],
          },
        ],
        false,
        [
          {
            layer: "test",
            costMap: [
              [1, 1, 1],
              [
                1,
                {
                  ge_cost_left: 2,
                  ge_cost_right: 3,
                  ge_cost_up: 4,
                  ge_cost_down: 5,
                  "ge_cost_up-left": 6,
                  "ge_cost_up-right": 7,
                  "ge_cost_down-left": 8,
                  "ge_cost_down-right": 9,
                },
                1,
              ],
              [1, 1, 1],
            ],
          },
        ],
      );
      gridTilemap = new GridTilemap(
        tilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const pos = { position: new Vector2(1, 1), layer: "test" };
      expect(gridTilemap.getTileCosts(pos)).toBe(1);
      expect(gridTilemap.getTileCosts(pos, Direction.LEFT)).toBe(2);
      expect(gridTilemap.getTileCosts(pos, Direction.RIGHT)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.UP)).toBe(4);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN)).toBe(5);
      expect(gridTilemap.getTileCosts(pos, Direction.UP_LEFT)).toBe(6);
      expect(gridTilemap.getTileCosts(pos, Direction.UP_RIGHT)).toBe(7);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN_LEFT)).toBe(8);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN_RIGHT)).toBe(9);
    });

    it("should override ge_cost", () => {
      tilemap = mockLayeredBlockMap(
        [
          {
            layer: "test",
            blockMap: [
              // prettier-ignore
              "...",
              "...",
              "...",
            ],
          },
        ],
        false,
        [
          {
            layer: "test",
            costMap: [
              [1, 1, 1],
              [1, { ge_cost: 2, ge_cost_left: 3 }, 1],
              [1, 1, 1],
            ],
          },
        ],
      );
      gridTilemap = new GridTilemap(
        tilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const pos = { position: new Vector2(1, 1), layer: "test" };
      expect(gridTilemap.getTileCosts(pos)).toBe(2);
      expect(gridTilemap.getTileCosts(pos, Direction.LEFT)).toBe(3);
      expect(gridTilemap.getTileCosts(pos, Direction.RIGHT)).toBe(2);
      expect(gridTilemap.getTileCosts(pos, Direction.UP)).toBe(2);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN)).toBe(2);
      expect(gridTilemap.getTileCosts(pos, Direction.UP_LEFT)).toBe(2);
      expect(gridTilemap.getTileCosts(pos, Direction.UP_RIGHT)).toBe(2);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN_LEFT)).toBe(2);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN_RIGHT)).toBe(2);
    });

    it("should take max tile cost for layer", () => {
      tilemap = mockLayeredBlockMap(
        [
          {
            layer: "no-char-layer",
            isCharLayer: false,
            blockMap: [
              // prettier-ignore
              "...",
              "...",
              "...",
            ],
          },
          {
            layer: "test",
            blockMap: [
              // prettier-ignore
              "...",
              "...",
              "...",
            ],
          },
        ],
        false,
        [
          {
            layer: "no-char-layer",
            costMap: [
              [10, 1, 1],
              [1, { ge_cost: 20, ge_cost_left: 30 }, 1],
              [1, 1, 1],
            ],
          },
          {
            layer: "test",
            costMap: [
              [1, 1, 1],
              [1, { ge_cost: 2, ge_cost_left: 3 }, 1],
              [1, 1, 1],
            ],
          },
        ],
      );
      gridTilemap = new GridTilemap(
        tilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const pos = { position: new Vector2(1, 1), layer: "test" };
      expect(gridTilemap.getTileCosts(pos)).toBe(20);
      expect(gridTilemap.getTileCosts(pos, Direction.LEFT)).toBe(30);
      expect(gridTilemap.getTileCosts(pos, Direction.RIGHT)).toBe(20);
      expect(gridTilemap.getTileCosts(pos, Direction.UP)).toBe(20);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN)).toBe(20);
      expect(gridTilemap.getTileCosts(pos, Direction.UP_LEFT)).toBe(20);
      expect(gridTilemap.getTileCosts(pos, Direction.UP_RIGHT)).toBe(20);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN_LEFT)).toBe(20);
      expect(gridTilemap.getTileCosts(pos, Direction.DOWN_RIGHT)).toBe(20);

      expect(
        gridTilemap.getTileCosts({
          position: new Vector2(0, 0),
          layer: "test",
        }),
      ).toBe(10);
    });
  });

  it("should consider custom collision relation", () => {
    tilemap = mockLayeredBlockMap([
      {
        layer: "someLayer",
        blockMap: [
          // prettier-ignore
          "...",
          "...",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
      new Map([
        ["cGroup1", new Set(["cGroup1", "cGroup2"])],
        ["cGroup2", new Set(["cGroup1"])],
        ["cGroup3", new Set([])],
      ]),
    );

    const layer = "someLayer";

    const cGroup1Char = createChar(
      "cGroup1Char",
      gridTilemap,
      "cGroup1",
      new Vector2(0, 0),
      layer,
    );
    const cGroup2Char = createChar(
      "cGroup2Char",
      gridTilemap,
      "cGroup2",
      new Vector2(1, 0),
      layer,
    );
    const cGroup3Char = createChar(
      "cGroup3Char",
      gridTilemap,
      "cGroup3",
      new Vector2(2, 0),
      layer,
    );

    gridTilemap.addCharacter(cGroup1Char);
    gridTilemap.addCharacter(cGroup2Char);
    gridTilemap.addCharacter(cGroup3Char);

    // 1 => 1
    expect(
      gridTilemap.hasBlockingChar(cGroup1Char.getTilePos().position, layer, [
        "cGroup1",
      ]),
    ).toBe(true);
    // 2 => 1
    expect(
      gridTilemap.hasBlockingChar(cGroup1Char.getTilePos().position, layer, [
        "cGroup2",
      ]),
    ).toBe(true);
    // 3 => 1
    expect(
      gridTilemap.hasBlockingChar(cGroup1Char.getTilePos().position, layer, [
        "cGroup3",
      ]),
    ).toBe(false);

    // 1 => 2
    expect(
      gridTilemap.hasBlockingChar(cGroup2Char.getTilePos().position, layer, [
        "cGroup1",
      ]),
    ).toBe(true);

    // 2 => 2
    expect(
      gridTilemap.hasBlockingChar(cGroup2Char.getTilePos().position, layer, [
        "cGroup2",
      ]),
    ).toBe(false);

    // 3 => 2
    expect(
      gridTilemap.hasBlockingChar(cGroup2Char.getTilePos().position, layer, [
        "cGroup3",
      ]),
    ).toBe(false);

    // 1 => 3
    expect(
      gridTilemap.hasBlockingChar(cGroup3Char.getTilePos().position, layer, [
        "cGroup1",
      ]),
    ).toBe(false);

    // 2 => 3
    expect(
      gridTilemap.hasBlockingChar(cGroup3Char.getTilePos().position, layer, [
        "cGroup2",
      ]),
    ).toBe(false);

    // 3 => 3
    expect(
      gridTilemap.hasBlockingChar(cGroup3Char.getTilePos().position, layer, [
        "cGroup3",
      ]),
    ).toBe(false);
  });

  function createChar(
    id: string,
    gridTilemap: GridTilemap,
    cGroup: string,
    position: Vector2,
    layer: string,
  ) {
    const char = new GridCharacter(id, {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      collisionGroups: [cGroup],
    });
    char.setTilePosition({
      position,
      layer,
    });
    return char;
  }
});
