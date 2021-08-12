import { CollisionStrategy } from "./../Collisions/CollisionStrategy";
import { GlobalConfig } from "./../GlobalConfig/GlobalConfig";
import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { of } from "rxjs";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { Direction, NumberOfDirections } from "./../Direction/Direction";
import { GridTilemap } from "./GridTilemap";

const mockCharBlockCache = {
  addCharacter: jest.fn(),
  removeCharacter: jest.fn(),
  isCharBlockingAt: jest.fn(),
};

jest.mock("./CharBlockCache/CharBlockCache", function () {
  return {
    CharBlockCache: jest.fn().mockImplementation(function () {
      return mockCharBlockCache;
    }),
  };
});

describe("GridTilemap", () => {
  let gridTilemap: GridTilemap;
  let tilemapMock;
  let blankLayerMock;

  beforeEach(() => {
    blankLayerMock = {
      scale: 0,
      putTileAt: jest.fn(),
      setDepth: jest.fn(),
    };
    tilemapMock = {
      layers: [
        {
          name: "layer1",
          tilemapLayer: {
            setDepth: jest.fn(),
            scale: 3,
            tileset: "Cloud City",
          },
          properties: [],
        },
        {
          name: "layer2",
          tilemapLayer: {
            setDepth: jest.fn(),
            tileset: "Cloud City",
            scale: 3,
          },
          properties: [],
        },
      ],
      tileWidth: 16,
      tileHeight: 16,
      getTileAt: jest.fn(),
      hasTileAt: jest.fn(),
      createBlankLayer: jest.fn().mockReturnValue(blankLayerMock),
    };
    gridTilemap = new GridTilemap(tilemapMock);
    mockCharBlockCache.addCharacter.mockReset();
    mockCharBlockCache.removeCharacter.mockReset();
    mockCharBlockCache.isCharBlockingAt.mockReset();
    mockCharBlockCache.isCharBlockingAt = jest.fn(() => false);
    GlobalConfig.get = jest.fn(() => ({
      characters: [],
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      collisionTilePropertyName: "ge_collide",
    }));
  });

  it("should set layer depths on construction", () => {
    gridTilemap = new GridTilemap(tilemapMock, 1);
    expect(tilemapMock.layers[0].tilemapLayer.setDepth).toHaveBeenCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(
      2001
    );
  });

  it("should set layer depths on construction without firstLayerAboveChar", () => {
    expect(tilemapMock.layers[0].tilemapLayer.setDepth).toHaveBeenCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(1);
  });

  it("should consider 'alwaysOnTop' flag of tile layer", () => {
    tilemapMock.layers = [
      {
        name: "layer1",
        tilemapLayer: {
          setDepth: jest.fn(),
          scale: 3,
          tileset: "Cloud City",
        },
        properties: [],
      },
      {
        name: "layer2",
        tilemapLayer: {
          setDepth: jest.fn(),
          scale: 3,
          tileset: "Cloud City",
        },
        properties: [
          {
            name: "ge_alwaysTop",
            value: true,
          },
        ],
      },
      {
        name: "layer3",
        tilemapLayer: {
          setDepth: jest.fn(),
          scale: 3,
          tileset: "Cloud City",
        },
        properties: [],
      },
    ];
    gridTilemap = new GridTilemap(tilemapMock, 2);

    expect(tilemapMock.layers[0].tilemapLayer.setDepth).toHaveBeenCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(
      2001
    );
    expect(tilemapMock.layers[2].tilemapLayer.setDepth).toHaveBeenCalledWith(
      2002
    );
  });

  it("should consider 'heightShift' layer", () => {
    tilemapMock.layers = [
      {
        name: "layer1",
        tilemapLayer: {
          setDepth: jest.fn(),
          destroy: jest.fn(),
          scale: 3,
          tileset: "Cloud City",
        },
        properties: [],
      },
      {
        name: "layer2",
        height: 2,
        width: 2,
        data: [
          ["r0#c0", "r0#c1"],
          ["r1#c0", "r1#c1"],
        ],
        tilemapLayer: {
          setDepth: jest.fn(),
          destroy: jest.fn(),
          scale: 3,
          tileset: "Cloud City",
        },
        properties: [
          {
            name: "ge_heightShift",
            value: 1,
          },
        ],
      },
    ];
    gridTilemap = new GridTilemap(tilemapMock);

    expect(tilemapMock.layers[0].tilemapLayer.setDepth).toHaveBeenCalledWith(0);
    expect(tilemapMock.createBlankLayer).toHaveBeenCalledWith(
      "1#0",
      "Cloud City"
    );
    expect(tilemapMock.createBlankLayer).toHaveBeenCalledWith(
      "1#1",
      "Cloud City"
    );

    expect(blankLayerMock.putTileAt).toHaveBeenCalledTimes(4);
    expect(blankLayerMock.putTileAt).toHaveBeenNthCalledWith(1, "r0#c0", 0, 0);
    expect(blankLayerMock.putTileAt).toHaveBeenNthCalledWith(2, "r0#c1", 1, 0);
    expect(blankLayerMock.putTileAt).toHaveBeenNthCalledWith(3, "r1#c0", 0, 1);
    expect(blankLayerMock.putTileAt).toHaveBeenNthCalledWith(4, "r1#c1", 1, 1);
    expect(blankLayerMock.scale).toEqual(3);
    expect(blankLayerMock.setDepth).toHaveBeenCalledTimes(2);
    expect(blankLayerMock.setDepth).toHaveBeenNthCalledWith(1, 1000.5);
    expect(blankLayerMock.setDepth).toHaveBeenNthCalledWith(2, 1001.5);
    expect(tilemapMock.layers[1].tilemapLayer.destroy).toHaveBeenCalled();
  });

  it("should add a character", () => {
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const charMock1 = createCharMock("player");
    const charMock2 = createCharMock("player2");
    const charMockSameId = createCharMock("player2");
    gridTilemap.addCharacter(charMock1);
    gridTilemap.addCharacter(charMock2);
    gridTilemap.addCharacter(charMockSameId);

    expect(gridTilemap.getCharacters()).toEqual([charMock1, charMockSameId]);
  });

  it("should remove a character", () => {
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const charMock1 = <any>{
      ...createCharMock("player"),
    };
    const charMock2 = <any>{
      ...createCharMock("player2"),
    };
    gridTilemap.addCharacter(charMock1);
    gridTilemap.addCharacter(charMock2);
    gridTilemap.removeCharacter("player");

    expect(gridTilemap.getCharacters()).toEqual([charMock2]);
    expect(mockCharBlockCache.removeCharacter).toHaveBeenCalledWith(charMock1);
  });

  it("should detect blocking tiles", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { ge_collide: true },
    });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingTile = gridTilemap.hasBlockingTile(new Vector2(3, 4));
    const isBlocking = gridTilemap.isBlocking(new Vector2(3, 4));
    expect(isBlockingTile).toBe(true);
    expect(isBlocking).toBe(true);
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer1");
    expect(tilemapMock.getTileAt).not.toHaveBeenCalledWith(
      3,
      4,
      false,
      "layer2"
    );
  });

  it("should detect blocking tiles with custom property", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { custom_collides_prop: true },
    });
    GlobalConfig.get = jest.fn(() => ({
      characters: [],
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      collisionTilePropertyName: "custom_collides_prop",
    }));
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingTile = gridTilemap.hasBlockingTile(new Vector2(3, 4));
    const isBlocking = gridTilemap.isBlocking(new Vector2(3, 4));
    expect(isBlockingTile).toBe(true);
    expect(isBlocking).toBe(true);
  });

  it("should detect one-way blocking tiles left", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { ge_collide_left: true, ge_collide_right: false },
    });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingLeft = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.UP
    );
    const isBlockingDown = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(true);
    expect(isBlockingRight).toBe(false);
    expect(isBlockingUp).toBe(false);
    expect(isBlockingDown).toBe(false);
  });

  it("should detect one-way blocking tiles right", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { ge_collide_right: true },
    });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingLeft = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.UP
    );
    const isBlockingDown = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(false);
    expect(isBlockingRight).toBe(true);
    expect(isBlockingUp).toBe(false);
    expect(isBlockingDown).toBe(false);
  });

  it("should detect one-way blocking tiles up", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { ge_collide_up: true },
    });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingLeft = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.UP
    );
    const isBlockingDown = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(false);
    expect(isBlockingRight).toBe(false);
    expect(isBlockingUp).toBe(true);
    expect(isBlockingDown).toBe(false);
  });

  it("should detect one-way blocking tiles down", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { ge_collide_down: true },
    });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingLeft = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.UP
    );
    const isBlockingDown = gridTilemap.isBlocking(
      new Vector2(3, 4),
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(false);
    expect(isBlockingRight).toBe(false);
    expect(isBlockingUp).toBe(false);
    expect(isBlockingDown).toBe(true);
  });

  it("should return true if nothing blocks", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingTile = gridTilemap.hasBlockingTile(new Vector2(3, 4));
    const isBlocking = gridTilemap.isBlocking(new Vector2(3, 4));
    expect(isBlockingTile).toBe(false);
    expect(isBlocking).toBe(false);
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer1");
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer2");
  });

  it("should return true if no tile", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlocking = gridTilemap.hasBlockingTile(new Vector2(3, 4));
    expect(isBlocking).toBe(true);
    expect(tilemapMock.getTileAt).not.toHaveBeenCalled();
  });

  it("should detect if no tile present", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4));
    const isBlocking = gridTilemap.isBlocking(new Vector2(3, 4));
    expect(hasNoTile).toBe(true);
    expect(isBlocking).toBe(true);
  });

  it("should detect if tile present", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4));
    expect(hasNoTile).toBe(false);
  });

  it("should detect blocking char", () => {
    gridTilemap = new GridTilemap(tilemapMock, 3);
    mockCharBlockCache.isCharBlockingAt = jest.fn(() => true);

    expect(gridTilemap.hasBlockingChar(new Vector2(3, 3))).toBe(true);
    expect(mockCharBlockCache.isCharBlockingAt).toHaveBeenCalledWith(
      new Vector2(3, 3)
    );
  });

  it("should detect an unblocked tile", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(tilemapMock, 3);

    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ x: 3, y: 3 }),
    };
    const char2Mock = <any>{
      ...createCharMock("player2"),
      getTilePos: () => ({ x: 3, y: 3 }),
    };
    gridTilemap.addCharacter(char1Mock);
    gridTilemap.addCharacter(char2Mock);
    const hasBlockingChar = gridTilemap.hasBlockingChar(new Vector2(4, 4));
    expect(hasBlockingChar).toBe(false);
  });

  it("should get scaled tile width", () => {
    expect(gridTilemap.getTileWidth()).toEqual(48);
  });

  it("should get scaled tile height", () => {
    expect(gridTilemap.getTileHeight()).toEqual(48);
  });

  function createCharMock(id = "player"): GridCharacter {
    return <any>{
      getId: () => id,
      isBlockingTile: () => false,
      getTilePos: () => ({ x: 1, y: 1 }),
      getNextTilePos: () => ({ x: 1, y: 1 }),
      positionChangeStarted: () => of([]),
      positionChangeFinished: () => of([]),
    };
  }
});
