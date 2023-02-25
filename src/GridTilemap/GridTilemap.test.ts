import { CollisionStrategy } from "./../Collisions/CollisionStrategy";
import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { Direction, NumberOfDirections } from "./../Direction/Direction";
import { GridTilemap } from "./GridTilemap";
import { LayerVecPos } from "../Pathfinding/ShortestPathAlgorithm";
import { mockLayeredBlockMapNew } from "../Utils/MockFactory/MockFactory";
import { MockTilemap } from "../Utils/MockFactory/MockTilemap";
import { Tilemap } from "./Tilemap";

describe("GridTilemap", () => {
  let gridTilemap: GridTilemap;
  let phaserTilemap: Tilemap;

  beforeEach(() => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
  });

  it("should consider sub-layers for blocking", () => {
    const tm = mockLayeredBlockMapNew([
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
      CollisionStrategy.BLOCK_TWO_TILES
    );

    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 0), "lowerCharLayer")
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 1), "lowerCharLayer")
    ).toBe(false);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 1), "upperCharLayer")
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(1, 1), "upperCharLayer")
    ).toBe(true);
    expect(
      gridTilemap.hasBlockingTile(new Vector2(0, 1), "upperCharLayer")
    ).toBe(true);
  });

  it("should consider sub-layers for no tile", () => {
    const tm = mockLayeredBlockMapNew([
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
      CollisionStrategy.BLOCK_TWO_TILES
    );

    expect(gridTilemap.hasNoTile(new Vector2(1, 1), "lowerCharLayer")).toBe(
      true
    );
    expect(gridTilemap.hasNoTile(new Vector2(1, 1), "upperCharLayer")).toBe(
      false
    );
  });

  it("should not consider ge_collide: false as blocking", () => {
    const tm = mockLayeredBlockMapNew([
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
      CollisionStrategy.BLOCK_TWO_TILES
    );

    expect(
      gridTilemap.hasBlockingTile(new Vector2(0, 0), "lowerCharLayer")
    ).toBe(false);
  });

  it("should add a character", () => {
    gridTilemap = new GridTilemap(
      new MockTilemap(),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
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

  it("should set the lowest char layer", () => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
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
      layer: "charLayer1",
    });
  });

  it("should remove a character", () => {
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
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

  it("should detect blocking tiles", () => {
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should not consider missing tiles as blocking", () => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      undefined,
      true
    );
    expect(isBlockingTile).toBe(false);
  });

  it("should detect blocking tiles with custom property", () => {
    // Simplest way to set a property on a tile.
    // @ts-ignore
    phaserTilemap.getTileAt(1, 1, "charLayer1").properties[
      "custom_collides_prop"
    ] = "true";

    gridTilemap = new GridTilemap(
      phaserTilemap,
      "custom_collides_prop",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "charLayer1"
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should detect one-way blocking tiles left", () => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(false);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(true);
  });

  it("should detect one-way blocking tiles right", () => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(false);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(true);
  });

  it("should detect one-way blocking tiles up", () => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(false);
  });

  it("should detect one-way blocking tiles down", () => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "test",
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(false);
    expect(isBlockingDown).toBe(true);
  });

  it("should only consider tiles on charLayer", () => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "charLayer1"
    );
    expect(isBlockingTile).toBe(true);

    const isBlockingTileUpperLayer = gridTilemap.hasBlockingTile(
      new Vector2(1, 1),
      "charLayer2"
    );
    expect(isBlockingTileUpperLayer).toBe(false);
  });

  it("should block if no tile", () => {
    phaserTilemap = mockLayeredBlockMapNew([
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
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlocking = gridTilemap.hasBlockingTile(new Vector2(1, 1), "test");
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(1, 1), "test");
    expect(isBlocking).toBe(true);
    expect(hasNoTile).toBe(true);
  });

  it("should detect blocking char", () => {
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
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
      gridTilemap.hasBlockingChar(new Vector2(1, 1), "charLayer1", ["cGroup"])
    ).toBe(true);
  });

  it("should detect an unblocked tile", () => {
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
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
      ["cGroup"]
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
    beforeEach(() => {
      const phaserTilemap = mockLayeredBlockMapNew(
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
        true
      );
      gridTilemap = new GridTilemap(
        phaserTilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES
      );
    });

    it("should detect isometric maps", () => {
      expect(gridTilemap.isIsometric()).toEqual(true);
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
      gridTilemap = new GridTilemap(
        phaserTilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES
      );
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
      gridTilemap = new GridTilemap(
        phaserTilemap,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES
      );
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
