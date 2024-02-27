import { CollisionStrategy } from "./../../Collisions/CollisionStrategy.js";
import { Direction, NumberOfDirections } from "./../../Direction/Direction.js";
import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { CharBlockCache } from "./CharBlockCache.js";
import { GridTilemap } from "../GridTilemap.js";
import { mockLayeredBlockMap } from "../../Utils/MockFactory/MockFactory.js";
import { Tilemap } from "../Tilemap.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";

describe("CharBlockCache", () => {
  let charBlockCache: CharBlockCache;
  let gridTilemap: GridTilemap;

  function createTilemap(): Tilemap {
    return mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
    ]);
  }

  beforeEach(() => {
    gridTilemap = new GridTilemap(
      createTilemap(),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridTilemap.setTransition(new Vector2(4, 3), "someLayer", "enterLayer");
    charBlockCache = new CharBlockCache(CollisionStrategy.BLOCK_TWO_TILES);
  });

  it("should detect blocking char after adding", () => {
    const char = createChar("player1");
    char.move(Direction.RIGHT);
    char.update(1);

    charBlockCache.addCharacter(char);
    const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      ["cGroup1"],
    );
    const hasBlockingCharOnOldPosTileWidth = charBlockCache.isCharBlockingAt(
      new Vector2(7, 4),
      "someLayer",
      ["cGroup1"],
    );
    const hasBlockingCharOnOldPosOtherLayer = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "otherLayer",
      ["cGroup1"],
    );
    const hasBlockingCharOnOldPosOtherCGroup = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      ["unknownCGroup"],
    );
    const hasBlockingCharOnOldPosNoCGroup = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      [],
    );
    const hasBlockingCharOnNextPos = charBlockCache.isCharBlockingAt(
      new Vector2(8, 4),
      "enterLayer",
      ["cGroup1"],
    );
    expect(hasBlockingCharOnOldPos).toBe(true);
    expect(hasBlockingCharOnOldPosTileWidth).toBe(true);
    expect(hasBlockingCharOnOldPosOtherLayer).toBe(false);
    expect(hasBlockingCharOnOldPosOtherCGroup).toBe(false);
    expect(hasBlockingCharOnOldPosNoCGroup).toBe(false);
    expect(hasBlockingCharOnNextPos).toBe(true);
  });

  it("should consider custom collision relation", () => {
    charBlockCache = new CharBlockCache(
      CollisionStrategy.BLOCK_TWO_TILES,
      new Map([
        ["cGroup1", new Set(["cGroup1", "cGroup2"])],
        ["cGroup2", new Set(["cGroup1"])],
        ["cGroup3", new Set([])],
      ]),
    );

    const layer = "someLayer";

    const cGroup1Char = createChar("cGroup1Char", 1, 1);
    cGroup1Char.setCollisionGroups(["cGroup1"]);
    cGroup1Char.setTilePosition({
      position: new Vector2(0, 0),
      layer,
    });

    const cGroup2Char = createChar("cGroup2Char", 1, 1);
    cGroup2Char.setCollisionGroups(["cGroup2"]);
    cGroup2Char.setTilePosition({
      position: new Vector2(1, 0),
      layer,
    });

    const cGroup3Char = createChar("cGroup3Char", 1, 1);
    cGroup3Char.setCollisionGroups(["cGroup3"]);
    cGroup3Char.setTilePosition({
      position: new Vector2(2, 0),
      layer,
    });

    charBlockCache.addCharacter(cGroup1Char);
    charBlockCache.addCharacter(cGroup2Char);
    charBlockCache.addCharacter(cGroup3Char);

    // 1 => 1
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup1Char.getTilePos().position,
        layer,
        ["cGroup1"],
      ),
    ).toBe(true);
    // 2 => 1
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup1Char.getTilePos().position,
        layer,
        ["cGroup2"],
      ),
    ).toBe(true);
    // 3 => 1
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup1Char.getTilePos().position,
        layer,
        ["cGroup3"],
      ),
    ).toBe(false);

    // 1 => 2
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup2Char.getTilePos().position,
        layer,
        ["cGroup1"],
      ),
    ).toBe(true);

    // 2 => 2
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup2Char.getTilePos().position,
        layer,
        ["cGroup2"],
      ),
    ).toBe(false);

    // 3 => 2
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup2Char.getTilePos().position,
        layer,
        ["cGroup3"],
      ),
    ).toBe(false);

    // 1 => 3
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup3Char.getTilePos().position,
        layer,
        ["cGroup1"],
      ),
    ).toBe(false);

    // 2 => 3
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup3Char.getTilePos().position,
        layer,
        ["cGroup2"],
      ),
    ).toBe(false);

    // 3 => 3
    expect(
      charBlockCache.isCharBlockingAt(
        cGroup3Char.getTilePos().position,
        layer,
        ["cGroup3"],
      ),
    ).toBe(false);
  });

  it("should consider ignore collision groups", () => {
    charBlockCache = new CharBlockCache(CollisionStrategy.BLOCK_TWO_TILES);

    const layer = "someLayer";

    const cGroup1Char = createChar("cGroup1Char", 1, 1);
    cGroup1Char.setCollisionGroups(["cGroup1", "ignoredGroup"]);
    cGroup1Char.setTilePosition({
      position: new Vector2(0, 0),
      layer,
    });

    charBlockCache.addCharacter(cGroup1Char);

    expect(
      charBlockCache.isCharBlockingAt(
        cGroup1Char.getTilePos().position,
        layer,
        ["cGroup1"],
      ),
    ).toBe(true);

    expect(
      charBlockCache.isCharBlockingAt(
        cGroup1Char.getTilePos().position,
        layer,
        ["cGroup1"],
        new Set(),
        new Set(["ignoredGroup"]),
      ),
    ).toBe(false);
  });

  describe("blocking strategy BLOCK_TWO_TILES", () => {
    beforeEach(() => {
      gridTilemap = new GridTilemap(
        createTilemap(),
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridTilemap.setTransition(new Vector2(4, 3), "someLayer", "enterLayer");
      charBlockCache = new CharBlockCache(CollisionStrategy.BLOCK_TWO_TILES);
    });

    it("should block new and old pos on movement", () => {
      const char = createChar("player1");
      charBlockCache.addCharacter(char);
      char.move(Direction.RIGHT);
      char.update(1);

      const oldPos = { position: new Vector2(3, 3), layer: "someLayer" };
      const oldPosTileWidth = {
        position: new Vector2(
          3 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1,
        ),
        layer: "someLayer",
      };
      const nextPos = { position: new Vector2(4, 3), layer: "enterLayer" };
      const nextPosTileWidth = {
        position: new Vector2(
          4 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1,
        ),
        layer: "enterLayer",
      };

      expect(isCharBlockingAt(oldPos)).toBe(true);
      expect(isCharBlockingAt(oldPosTileWidth)).toBe(true);
      expect(isCharBlockingAt(nextPos)).toBe(true);
      expect(isCharBlockingAt(nextPosTileWidth)).toBe(true);
    });

    it("should unblock old pos after movement finished", () => {
      const char = createChar("player1");
      charBlockCache.addCharacter(char);
      char.move(Direction.RIGHT);
      char.update(1000);

      const oldPos = { position: new Vector2(3, 3), layer: "someLayer" };
      const oldPosTileWidth = {
        position: new Vector2(
          3 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1,
        ),
        layer: "someLayer",
      };

      expect(isCharBlockingAt(oldPos)).toBe(false);
      expect(isCharBlockingAt(oldPosTileWidth)).toBe(false);
    });

    it("should unblock nextPos on tile pos change while moving", () => {
      const char = createChar("player1");
      charBlockCache.addCharacter(char);
      char.move(Direction.RIGHT);
      char.update(1);
      char.setTilePosition({
        position: new Vector2(6, 6),
        layer: "someLayer",
      });

      const oldPos = { position: new Vector2(3, 3), layer: "someLayer" };
      const oldPosTileWidth = {
        position: new Vector2(
          3 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1,
        ),
        layer: "someLayer",
      };
      const newPos = { position: new Vector2(6, 6), layer: "someLayer" };
      const newPosTileWidth = {
        position: new Vector2(
          6 + char.getTileWidth() - 1,
          6 + char.getTileHeight() - 1,
        ),
        layer: "someLayer",
      };
      const nextPos = { position: new Vector2(4, 3), layer: "enterLayer" };
      const nextPosTileWidth = {
        position: new Vector2(
          4 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1,
        ),
        layer: "enterLayer",
      };

      expect(isCharBlockingAt(oldPos)).toBe(false);
      expect(isCharBlockingAt(oldPosTileWidth)).toBe(false);
      expect(isCharBlockingAt(nextPos)).toBe(false);
      expect(isCharBlockingAt(nextPosTileWidth)).toBe(false);
      expect(isCharBlockingAt(newPos)).toBe(true);
      expect(isCharBlockingAt(newPosTileWidth)).toBe(true);
    });
  });

  describe("blocking strategy BLOCK_ONE_TILE_AHEAD", () => {
    beforeEach(() => {
      gridTilemap = new GridTilemap(
        createTilemap(),
        "ge_collide",
        CollisionStrategy.BLOCK_ONE_TILE_AHEAD,
      );
      gridTilemap.setTransition(new Vector2(4, 3), "someLayer", "enterLayer");
      charBlockCache = new CharBlockCache(
        CollisionStrategy.BLOCK_ONE_TILE_AHEAD,
      );
    });

    it("should block pos on movement and release old one", () => {
      const char = createChar("player1");
      charBlockCache.addCharacter(char);
      char.move(Direction.RIGHT);
      char.update(1);

      const oldPos = { position: new Vector2(3, 3), layer: "someLayer" };
      const oldPosTileWidth = {
        position: new Vector2(
          3 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1,
        ),
        layer: "someLayer",
      };
      const nextPos = { position: new Vector2(4, 3), layer: "enterLayer" };
      const nextPosTileWidth = {
        position: new Vector2(
          4 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1,
        ),
        layer: "enterLayer",
      };

      expect(isCharBlockingAt(oldPos)).toBe(false);
      expect(isCharBlockingAt(oldPosTileWidth)).toBe(false);
      expect(isCharBlockingAt(nextPos)).toBe(true);
      expect(isCharBlockingAt(nextPosTileWidth)).toBe(true);
    });
  });

  it("should consider serveral chars for blocking after pos change", () => {
    const char1 = createChar("player1");
    const char2 = createChar("player2");
    char2.setTilePosition({
      position: new Vector2(3, 2),
      layer: "someLayer",
    });
    charBlockCache.addCharacter(char1);
    charBlockCache.addCharacter(char2);

    char2.move(Direction.RIGHT);
    char2.update(1000);
    char2.move(Direction.RIGHT);
    char2.update(1000);

    const oldPos = { position: new Vector2(3, 3), layer: "someLayer" };
    const oldPosTileWidth = {
      position: new Vector2(
        3 + char1.getTileWidth() - 1,
        3 + char1.getTileHeight() - 1,
      ),
      layer: "someLayer",
    };

    expect(isCharBlockingAt(oldPos)).toBe(true);
    expect(isCharBlockingAt(oldPosTileWidth)).toBe(true);
  });

  it("should consider several chars for blocking", () => {
    const char1 = createChar("player1");
    const char2 = createChar("player2");
    charBlockCache.addCharacter(char1);
    charBlockCache.addCharacter(char2);

    charBlockCache.removeCharacter(char2);

    const oldPos = { position: new Vector2(3, 3), layer: "someLayer" };
    const oldPosTileWidth = {
      position: new Vector2(
        3 + char1.getTileWidth() - 1,
        3 + char1.getTileHeight() - 1,
      ),
      layer: "someLayer",
    };

    expect(isCharBlockingAt(oldPos)).toBe(true);
    expect(isCharBlockingAt(oldPosTileWidth)).toBe(true);
  });

  it("should find all characters", () => {
    const char1 = createChar("player1");
    const char2 = createChar("player2");
    const charDifferentLayer = createChar("charDifferentLayer");
    const charNoLayer = createChar("charNoLayer");
    charDifferentLayer.setTilePosition({
      position: new Vector2(3, 3),
      layer: "otherLayer",
    });
    charNoLayer.setTilePosition({
      position: new Vector2(3, 3),
      layer: undefined,
    });
    charBlockCache.addCharacter(char1);
    charBlockCache.addCharacter(char2);
    charBlockCache.addCharacter(charDifferentLayer);
    charBlockCache.addCharacter(charNoLayer);

    expect(
      charBlockCache.getCharactersAt(new Vector2(3, 3), "someLayer"),
    ).toContain(char1);
    expect(
      charBlockCache.getCharactersAt(new Vector2(3, 3), "someLayer"),
    ).toContain(char2);
    expect(
      charBlockCache.getCharactersAt(new Vector2(3, 3), "otherLayer"),
    ).toContain(charDifferentLayer);
    expect(
      charBlockCache.getCharactersAt(new Vector2(5, 5), "someLayer").size,
    ).toBe(0);
    expect(charBlockCache.getCharactersAt(new Vector2(3, 3))).toContain(
      charNoLayer,
    );
  });

  it("should remove a character", () => {
    const char1 = createChar("player1");
    const char1Pos = { position: new Vector2(0, 1), layer: "someLayer" };
    char1.setTilePosition(char1Pos);
    char1.move(Direction.RIGHT);
    char1.update(1);
    const char2 = createChar("player2");
    const char2Pos = { position: new Vector2(10, 2), layer: "someLayer" };
    char2.setTilePosition(char2Pos);

    charBlockCache.addCharacter(char1);
    charBlockCache.addCharacter(char2);
    charBlockCache.removeCharacter(char1);

    const char1PosTileWidth = {
      position: new Vector2(
        0 + char1.getTileWidth() - 1,
        1 + char1.getTileHeight() - 1,
      ),
      layer: "someLayer",
    };
    const char2PosTileWidth = {
      position: new Vector2(
        10 + char1.getTileWidth() - 1,
        2 + char1.getTileHeight() - 1,
      ),
      layer: "someLayer",
    };

    expect(isCharBlockingAt(char1Pos)).toBe(false);
    expect(isCharBlockingAt(char1PosTileWidth)).toBe(false);
    expect(isCharBlockingAt(char2Pos)).toBe(true);
    expect(isCharBlockingAt(char2PosTileWidth)).toBe(true);
  });

  it("should unsubscribe from position change started of removed char", () => {
    const char = createChar("player");
    charBlockCache.addCharacter(char);
    charBlockCache.removeCharacter(char);

    char.move(Direction.RIGHT);
    char.update(1);

    expect(
      charBlockCache.isCharBlockingAt(new Vector2(4, 3), "enterLayer", [
        "cGroup1",
      ]),
    ).toBe(false);
  });

  it("should unsubscribe from position change finished of removed char", () => {
    const char = createChar("player");
    char.move(Direction.RIGHT);
    char.update(1);
    charBlockCache.addCharacter(char);
    charBlockCache.removeCharacter(char);
    char.update(1000);

    expect(
      charBlockCache.isCharBlockingAt(new Vector2(4, 3), "enterLayer", [
        "cGroup1",
      ]),
    ).toBe(false);
  });

  it("should respect excluded chars", () => {
    const char = createChar("player");
    char.move(Direction.RIGHT);
    char.update(1);

    charBlockCache.addCharacter(char);
    const oldPos = { position: new Vector2(3, 3), layer: "someLayer" };
    const oldPosTileWidth = {
      position: new Vector2(
        3 + char.getTileWidth() - 1,
        3 + char.getTileHeight() - 1,
      ),
      layer: "someLayer",
    };
    expect(isCharBlockingAt(oldPos, ["player"])).toBe(false);
    expect(isCharBlockingAt(oldPosTileWidth, ["player"])).toBe(false);
  });

  function createChar(
    id = "player",
    tileWidth = 5,
    tileHeight = 2,
  ): GridCharacter {
    const char = new GridCharacter(id, {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: false,
      numberOfDirections: NumberOfDirections.FOUR,
      collisionGroups: ["cGroup1"],
      tileWidth,
      tileHeight,
    });
    char.setTilePosition({
      position: new Vector2(3, 3),
      layer: "someLayer",
    });
    return char;
  }

  function isCharBlockingAt(pos: LayerVecPos, exclude?: string[]): boolean {
    return charBlockCache.isCharBlockingAt(
      pos.position,
      pos.layer,
      ["cGroup1"],
      new Set(exclude),
    );
  }
});
