import { CollisionStrategy } from "./../Collisions/CollisionStrategy";
import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { of } from "rxjs";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { Direction, NumberOfDirections } from "./../Direction/Direction";
import { GridTilemap } from "./GridTilemap";
import { Rect } from "../Utils/Rect/Rect";
import * as Phaser from "phaser";
import { LayerVecPos } from "../Pathfinding/ShortestPathAlgorithm";
import { PhaserTilemap } from "./Phaser/PhaserTilemap";
import { createMockLayerData } from "../Utils/MockFactory/MockFactory";

const mockCharBlockCache = {
  addCharacter: jest.fn(),
  removeCharacter: jest.fn(),
  isCharBlockingAt: jest.fn(),
  getCharactersAt: jest.fn(),
};

const mockCharLayers = [
  createMockLayerData({
    name: "layer1",
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
  }),
  createMockLayerData({
    name: "layer2",
    tilemapLayer: {
      setDepth: jest.fn(),
      scale: 3,
      tileset: "Cloud City",
    },
    properties: [
      {
        name: "ge_charLayer",
        value: "charLayer1",
      },
    ],
  }),
  createMockLayerData({
    name: "layer3",
    tilemapLayer: {
      setDepth: jest.fn(),
      scale: 3,
      tileset: "Cloud City",
    },
    properties: [],
  }),
  createMockLayerData({
    name: "layer4",
    tilemapLayer: {
      setDepth: jest.fn(),
      scale: 3,
      tileset: "Cloud City",
    },
    properties: [
      {
        name: "ge_charLayer",
        value: "charLayer2",
      },
    ],
  }),
];

const mockRect = {
  isInRange: jest.fn(),
};

jest.mock("./CharBlockCache/CharBlockCache", function () {
  return {
    CharBlockCache: jest.fn().mockImplementation(function () {
      return mockCharBlockCache;
    }),
  };
});

jest.mock("../Utils/Rect/Rect", function () {
  return {
    Rect: jest.fn().mockImplementation(function () {
      return mockRect;
    }),
  };
});

describe("GridTilemap", () => {
  let gridTilemap: GridTilemap;
  let tilemapMock;
  let phaserTilemap;
  let blankLayerMock;

  beforeEach(() => {
    blankLayerMock = {
      scale: 0,
      putTileAt: jest.fn(),
      setDepth: jest.fn(),
    };
    tilemapMock = {
      layers: [
        createMockLayerData({
          name: "layer1",
          tilemapLayer: {
            setDepth: jest.fn(),
            scale: 3,
            tileset: "Cloud City",
          },
          properties: [],
          data: [[]],
        }),
        createMockLayerData({
          name: "layer2",
          tilemapLayer: {
            setDepth: jest.fn(),
            tileset: "Cloud City",
            scale: 3,
          },
          properties: [],
          data: [[]],
        }),
      ],
      tileWidth: 16,
      tileHeight: 16,
      width: 20,
      height: 30,
      getTileAt: jest.fn(),
      hasTileAt: jest.fn(),
      createBlankLayer: jest.fn().mockReturnValue(blankLayerMock),
      getLayer: jest.fn((name) =>
        tilemapMock.layers.find((l) => l.name == name)
      ),
    };
    phaserTilemap = new PhaserTilemap(tilemapMock);
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    mockCharBlockCache.addCharacter.mockReset();
    mockCharBlockCache.removeCharacter.mockReset();
    mockCharBlockCache.isCharBlockingAt.mockReset();
    mockCharBlockCache.isCharBlockingAt = jest.fn(() => false);
  });

  it("should add a character", () => {
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const charMock1 = createCharMock("player");
    const charMock2 = createCharMock("player2");
    const charMockSameId = createCharMock("player2");
    gridTilemap.addCharacter(charMock1);
    gridTilemap.addCharacter(charMock2);
    gridTilemap.addCharacter(charMockSameId);

    expect(gridTilemap.getCharacters()).toEqual([charMock1, charMockSameId]);
  });

  it("should set the lowest char layer", () => {
    tilemapMock.layers = [
      createMockLayerData({
        name: "layer1",
        tilemapLayer: {
          setDepth: jest.fn(),
          destroy: jest.fn(),
          scale: 3,
          tileset: "Cloud City",
        },
        properties: [
          {
            name: "ge_charLayer",
            value: "layer1",
          },
        ],
      }),
      createMockLayerData({
        name: "layer2",
        tilemapLayer: {
          setDepth: jest.fn(),
          destroy: jest.fn(),
          scale: 3,
          tileset: "Cloud City",
        },
        properties: [
          {
            name: "ge_charLayer",
            value: "layer2",
          },
        ],
      }),
    ];
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const charMock1 = createCharMock("player");
    charMock1.getNextTilePos = () => ({
      position: new Vector2(1, 2),
      layer: undefined,
    });
    gridTilemap.addCharacter(charMock1);

    expect(charMock1.setTilePosition).toBeCalledWith({
      position: new Vector2(1, 2),
      layer: "layer1",
    });
  });

  it("should remove a character", () => {
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
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

  it("should find characters", () => {
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );

    const charMocks = new Set<GridCharacter>();
    charMocks.add(createCharMock("player"));
    mockCharBlockCache.getCharactersAt = jest.fn(() => charMocks);

    const set = gridTilemap.getCharactersAt(new Vector2(1, 1), "layer1");
    expect(mockCharBlockCache.getCharactersAt).toHaveBeenCalledWith(
      { x: 1, y: 1 },
      "layer1"
    );
    expect(set).toBe(charMocks);
  });

  it("should detect blocking tiles", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { ge_collide: true },
    });
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
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer1");
    expect(tilemapMock.getTileAt).not.toHaveBeenCalledWith(
      3,
      4,
      false,
      "layer2"
    );
  });

  it("should not consider missing tiles as blocking", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    tilemapMock.getTileAt.mockReturnValue(undefined);
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      undefined,
      true
    );
    expect(isBlockingTile).toBe(false);
  });

  it("should consider missing tiles as blocking", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    tilemapMock.getTileAt.mockReturnValue(undefined);
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

  it("should detect blocking tiles with custom property", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { custom_collides_prop: true },
    });
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "custom_collides_prop",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined
    );
    expect(isBlockingTile).toBe(true);
  });

  it("should detect one-way blocking tiles left", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { ge_collide_left: true, ge_collide_right: false },
    });
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
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
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
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
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
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
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingLeft = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.UP
    );
    const isBlockingDown = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined,
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(false);
    expect(isBlockingRight).toBe(false);
    expect(isBlockingUp).toBe(false);
    expect(isBlockingDown).toBe(true);
  });

  it("should only consider tiles on charLayer", () => {
    tilemapMock.layers = [
      createMockLayerData({
        name: "layer1",
        tilemapLayer: {
          setDepth: jest.fn(),
        },
        properties: [
          {
            name: "ge_alwaysTop",
            value: true,
          },
        ],
      }),
      createMockLayerData({
        name: "layer2",
        tilemapLayer: {
          setDepth: jest.fn(),
        },
        properties: [
          {
            name: "ge_charLayer",
            value: "charLayer1",
          },
        ],
      }),
      createMockLayerData({
        name: "layer3",
        tilemapLayer: {
          setDepth: jest.fn(),
        },
        properties: [],
      }),
      createMockLayerData({
        name: "layer4",
        tilemapLayer: {
          setDepth: jest.fn(),
        },
        properties: [
          {
            name: "ge_charLayer",
            value: "charLayer2",
          },
        ],
      }),
      createMockLayerData({
        name: "transitions",
        tilemapLayer: {
          setDepth: jest.fn(),
        },
        properties: [
          {
            name: "ge_layerTransitionFrom",
            value: "charLayer1",
          },
        ],
      }),
    ];
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockImplementation((_x, _y, _, layer) => {
      if (layer == "layer1") {
        return { properties: { ge_collide: true } };
      }
      return { properties: { ge_collide: false } };
    });

    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      "charLayer1"
    );
    expect(isBlockingTile).toBe(true);

    const isBlockingTileUpperLayer = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      "charLayer2"
    );
    expect(isBlockingTileUpperLayer).toBe(false);
  });

  it("should return true if nothing blocks", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined
    );
    expect(isBlockingTile).toBe(false);
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer1");
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer2");
  });

  it("should return true if no tile", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const isBlocking = gridTilemap.hasBlockingTile(
      new Vector2(3, 4),
      undefined
    );
    expect(isBlocking).toBe(true);
    expect(tilemapMock.getTileAt).not.toHaveBeenCalled();
  });

  it("should block if no tile present", () => {
    tilemapMock.layers = mockCharLayers;
    tilemapMock.hasTileAt.mockReturnValue(false);
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4), "charLayer1");
    expect(hasNoTile).toBe(true);
  });

  it("should block if no tile present on char layer", () => {
    tilemapMock.layers = mockCharLayers;
    tilemapMock.hasTileAt.mockImplementation((_x, _y, layerName) => {
      return layerName !== "layer1" && layerName !== "layer2";
    });
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4), "charLayer1");
    expect(hasNoTile).toBe(true);
  });

  it("should not block if tile present on char layer", () => {
    tilemapMock.layers = mockCharLayers;
    tilemapMock.hasTileAt.mockImplementation((_x, _y, layerName) => {
      return layerName === "layer2";
    });
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4), "charLayer1");
    expect(hasNoTile).toBe(false);
  });

  it("should detect blocking char", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    mockCharBlockCache.isCharBlockingAt = jest.fn(() => true);

    expect(
      gridTilemap.hasBlockingChar(new Vector2(3, 3), undefined, ["cGroup"])
    ).toBe(true);
    expect(mockCharBlockCache.isCharBlockingAt).toHaveBeenCalledWith(
      new Vector2(3, 3),
      undefined,
      ["cGroup"],
      new Set()
    );
  });

  it("should detect an unblocked tile", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(
      phaserTilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );

    const char1Mock = <any>{
      ...createCharMock("player1"),
    };
    gridTilemap.addCharacter(char1Mock);
    const hasBlockingChar = gridTilemap.hasBlockingChar(
      new Vector2(3, 3),
      "layer1",
      ["cGroup"]
    );
    expect(hasBlockingChar).toBe(false);
  });

  it("should get positions in range", () => {
    const pos = new Vector2({ x: 10, y: 20 });
    mockRect.isInRange.mockReturnValue(false);
    const res = gridTilemap.isInRange(pos);

    expect(Rect).toHaveBeenCalledWith(
      0,
      0,
      tilemapMock.width,
      tilemapMock.height
    );

    expect(mockRect.isInRange).toHaveBeenCalledWith(pos);
    expect(res).toEqual(false);
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
      tilemapMock.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC;
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

  function createCharMock(id = "player"): GridCharacter {
    return <any>{
      getId: () => id,
      isBlockingTile: () => false,
      getTilePos: () => ({ x: 1, y: 1 }),
      getNextTilePos: () => ({ x: 1, y: 1 }),
      positionChangeStarted: () => of([]),
      positionChangeFinished: () => of([]),
      setTilePosition: jest.fn(),
      getCollisionGroups: () => ["cGroup"],
    };
  }
});
