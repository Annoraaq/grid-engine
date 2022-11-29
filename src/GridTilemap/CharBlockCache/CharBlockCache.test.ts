import { CollisionStrategy } from "./../../Collisions/CollisionStrategy";
import { Direction, NumberOfDirections } from "./../../Direction/Direction";
import { GlobalConfig } from "./../../GlobalConfig/GlobalConfig";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CharBlockCache } from "./CharBlockCache";
import { GridEngineConfig } from "../../GridEngine";
import { Concrete } from "../../Utils/TypeUtils";
import { GridTilemap } from "../GridTilemap";
import { createTilemapMock } from "../../Utils/MockFactory/MockFactory";
import * as Phaser from "phaser";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";

// Hack to get Phaser included at runtime
((_a) => {
  // do nothing
})(Phaser);

describe("CharBlockCache", () => {
  let charBlockCache: CharBlockCache;
  let gridTilemap: GridTilemap;

  beforeEach(() => {
    gridTilemap = new GridTilemap(createTilemapMock() as any);
    gridTilemap.setTransition(new Vector2(4, 3), "someLayer", "enterLayer");
    charBlockCache = new CharBlockCache();
  });

  it("should detect blocking char after adding", () => {
    const char = createChar("player1");
    char.move(Direction.RIGHT);
    char.update(1);

    charBlockCache.addCharacter(char);
    const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      ["cGroup1"]
    );
    const hasBlockingCharOnOldPosTileWidth = charBlockCache.isCharBlockingAt(
      new Vector2(7, 4),
      "someLayer",
      ["cGroup1"]
    );
    const hasBlockingCharOnOldPosOtherLayer = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "otherLayer",
      ["cGroup1"]
    );
    const hasBlockingCharOnOldPosOtherCGroup = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      ["unknownCGroup"]
    );
    const hasBlockingCharOnOldPosNoCGroup = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      []
    );
    const hasBlockingCharOnNextPos = charBlockCache.isCharBlockingAt(
      new Vector2(8, 4),
      "enterLayer",
      ["cGroup1"]
    );
    expect(hasBlockingCharOnOldPos).toBe(true);
    expect(hasBlockingCharOnOldPosTileWidth).toBe(true);
    expect(hasBlockingCharOnOldPosOtherLayer).toBe(false);
    expect(hasBlockingCharOnOldPosOtherCGroup).toBe(false);
    expect(hasBlockingCharOnOldPosNoCGroup).toBe(false);
    expect(hasBlockingCharOnNextPos).toBe(true);
  });

  describe("blocking strategy BLOCK_TWO_TILES", () => {
    beforeEach(() => {
      GlobalConfig.get = jest.fn(() => ({
        ...createMockConf(),
        characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      }));
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
          3 + char.getTileHeight() - 1
        ),
        layer: "someLayer",
      };
      const nextPos = { position: new Vector2(4, 3), layer: "enterLayer" };
      const nextPosTileWidth = {
        position: new Vector2(
          4 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1
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
          3 + char.getTileHeight() - 1
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
          3 + char.getTileHeight() - 1
        ),
        layer: "someLayer",
      };
      const newPos = { position: new Vector2(6, 6), layer: "someLayer" };
      const newPosTileWidth = {
        position: new Vector2(
          6 + char.getTileWidth() - 1,
          6 + char.getTileHeight() - 1
        ),
        layer: "someLayer",
      };
      const nextPos = { position: new Vector2(4, 3), layer: "enterLayer" };
      const nextPosTileWidth = {
        position: new Vector2(
          4 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1
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
      GlobalConfig.get = jest.fn(() => ({
        ...createMockConf(),
        characterCollisionStrategy: CollisionStrategy.BLOCK_ONE_TILE_AHEAD,
      }));
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
          3 + char.getTileHeight() - 1
        ),
        layer: "someLayer",
      };
      const nextPos = { position: new Vector2(4, 3), layer: "enterLayer" };
      const nextPosTileWidth = {
        position: new Vector2(
          4 + char.getTileWidth() - 1,
          3 + char.getTileHeight() - 1
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
        3 + char1.getTileHeight() - 1
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
        3 + char1.getTileHeight() - 1
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
    charDifferentLayer.setTilePosition({
      position: new Vector2(3, 3),
      layer: "otherLayer",
    });
    charBlockCache.addCharacter(char1);
    charBlockCache.addCharacter(char2);
    charBlockCache.addCharacter(charDifferentLayer);

    expect(
      charBlockCache.getCharactersAt(new Vector2(3, 3), "someLayer")
    ).toContain(char1);
    expect(
      charBlockCache.getCharactersAt(new Vector2(3, 3), "someLayer")
    ).toContain(char2);
    expect(
      charBlockCache.getCharactersAt(new Vector2(3, 3), "otherLayer")
    ).toContain(charDifferentLayer);
    expect(
      charBlockCache.getCharactersAt(new Vector2(5, 5), "someLayer").size
    ).toBe(0);
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
        1 + char1.getTileHeight() - 1
      ),
      layer: "someLayer",
    };
    const char2PosTileWidth = {
      position: new Vector2(
        10 + char1.getTileWidth() - 1,
        2 + char1.getTileHeight() - 1
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
      ])
    ).toBe(false);
  });

  it("should unsibscribe from position change finished of removed char", () => {
    const char = createChar("player");
    char.move(Direction.RIGHT);
    char.update(1);
    charBlockCache.addCharacter(char);
    charBlockCache.removeCharacter(char);
    char.update(1000);

    expect(
      charBlockCache.isCharBlockingAt(new Vector2(4, 3), "enterLayer", [
        "cGroup1",
      ])
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
        3 + char.getTileHeight() - 1
      ),
      layer: "someLayer",
    };
    expect(isCharBlockingAt(oldPos, ["player"])).toBe(false);
    expect(isCharBlockingAt(oldPosTileWidth, ["player"])).toBe(false);
  });

  function createChar(id = "player"): GridCharacter {
    const char = new GridCharacter(id, {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: false,
      numberOfDirections: NumberOfDirections.FOUR,
      collisionGroups: ["cGroup1"],
      tileWidth: 5,
      tileHeight: 2,
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
      new Set(exclude)
    );
  }

  function createMockConf(): Concrete<GridEngineConfig> {
    return {
      characters: [],
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      layerOverlay: false,
    };
  }
});
