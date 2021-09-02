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
    gridTilemap = new GridTilemap(tilemapMock);
    expect(tilemapMock.layers[0].tilemapLayer.setDepth).toHaveBeenCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(1);
  });

  it("should consider legacy 'ge_alwaysTop' flag of tile layer", () => {
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
    gridTilemap = new GridTilemap(tilemapMock);

    expect(tilemapMock.layers[0].tilemapLayer.setDepth).toHaveBeenCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(
      1002
    );
    expect(tilemapMock.layers[2].tilemapLayer.setDepth).toHaveBeenCalledWith(2);
  });

  it("should consider charLayers", () => {
    tilemapMock.layers = [
      {
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
            name: "ge_charLayer",
            value: "charLayer1",
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
      {
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
      },
    ];
    gridTilemap = new GridTilemap(tilemapMock);

    expect(
      tilemapMock.layers[0].tilemapLayer.setDepth
    ).toHaveBeenLastCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(1);
    expect(tilemapMock.layers[2].tilemapLayer.setDepth).toHaveBeenCalledWith(
      1002
    );
    expect(tilemapMock.layers[3].tilemapLayer.setDepth).toHaveBeenCalledWith(
      1003
    );
    expect(gridTilemap.getDepthOfCharLayer("charLayer1")).toEqual(1);
    expect(gridTilemap.getDepthOfCharLayer("charLayer2")).toEqual(1003);
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
    expect(blankLayerMock.setDepth).toHaveBeenNthCalledWith(1, 0.5);
    expect(blankLayerMock.setDepth).toHaveBeenNthCalledWith(2, 1.5);
    expect(tilemapMock.layers[1].tilemapLayer.destroy).toHaveBeenCalled();
  });

  it("should add a character", () => {
    gridTilemap = new GridTilemap(tilemapMock);
    const charMock1 = createCharMock("player");
    const charMock2 = createCharMock("player2");
    const charMockSameId = createCharMock("player2");
    gridTilemap.addCharacter(charMock1);
    gridTilemap.addCharacter(charMock2);
    gridTilemap.addCharacter(charMockSameId);

    expect(gridTilemap.getCharacters()).toEqual([charMock1, charMockSameId]);
  });

  it("should remove a character", () => {
    gridTilemap = new GridTilemap(tilemapMock);
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
    gridTilemap = new GridTilemap(tilemapMock);
    const isBlockingTile = gridTilemap.hasBlockingTile(
      undefined,
      new Vector2(3, 4)
    );
    const isBlocking = gridTilemap.isBlocking(undefined, new Vector2(3, 4));
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
    gridTilemap = new GridTilemap(tilemapMock);
    const isBlockingTile = gridTilemap.hasBlockingTile(
      undefined,
      new Vector2(3, 4)
    );
    const isBlocking = gridTilemap.isBlocking(undefined, new Vector2(3, 4));
    expect(isBlockingTile).toBe(true);
    expect(isBlocking).toBe(true);
  });

  it("should detect one-way blocking tiles left", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({
      properties: { ge_collide_left: true, ge_collide_right: false },
    });
    gridTilemap = new GridTilemap(tilemapMock);
    const isBlockingLeft = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.UP
    );
    const isBlockingDown = gridTilemap.isBlocking(
      undefined,
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
    gridTilemap = new GridTilemap(tilemapMock);
    const isBlockingLeft = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.UP
    );
    const isBlockingDown = gridTilemap.isBlocking(
      undefined,
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
    gridTilemap = new GridTilemap(tilemapMock);
    const isBlockingLeft = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.UP
    );
    const isBlockingDown = gridTilemap.isBlocking(
      undefined,
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
    gridTilemap = new GridTilemap(tilemapMock);
    const isBlockingLeft = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.LEFT
    );
    const isBlockingRight = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.RIGHT
    );
    const isBlockingUp = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.UP
    );
    const isBlockingDown = gridTilemap.isBlocking(
      undefined,
      new Vector2(3, 4),
      Direction.DOWN
    );
    expect(isBlockingLeft).toBe(false);
    expect(isBlockingRight).toBe(false);
    expect(isBlockingUp).toBe(false);
    expect(isBlockingDown).toBe(true);
  });

  it("should only consider tiles on charLayer", () => {
    tilemapMock.layers = [
      {
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
      },
      {
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
      },
      {
        name: "layer3",
        tilemapLayer: {
          setDepth: jest.fn(),
        },
        properties: [],
      },
      {
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
      },
      {
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
      },
    ];
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockImplementation((_x, _y, _, layer) => {
      if (layer == "layer1") {
        return { properties: { ge_collide: true } };
      }
      return { properties: { ge_collide: false } };
    });

    gridTilemap = new GridTilemap(tilemapMock);
    const isBlockingTile = gridTilemap.hasBlockingTile(
      "charLayer1",
      new Vector2(3, 4)
    );
    const isBlocking = gridTilemap.isBlocking("charLayer1", new Vector2(3, 4));
    expect(isBlockingTile).toBe(true);
    expect(isBlocking).toBe(true);

    const isBlockingTileUpperLayer = gridTilemap.hasBlockingTile(
      "charLayer2",
      new Vector2(3, 4)
    );
    const isBlockingUpperLayer = gridTilemap.isBlocking(
      "charLayer2",
      new Vector2(3, 4)
    );
    expect(isBlockingTileUpperLayer).toBe(false);
    expect(isBlockingUpperLayer).toBe(false);
  });

  it("should return true if nothing blocks", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    gridTilemap = new GridTilemap(tilemapMock);
    const isBlockingTile = gridTilemap.hasBlockingTile(
      undefined,
      new Vector2(3, 4)
    );
    const isBlocking = gridTilemap.isBlocking(undefined, new Vector2(3, 4));
    expect(isBlockingTile).toBe(false);
    expect(isBlocking).toBe(false);
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer1");
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer2");
  });

  it("should return true if no tile", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    gridTilemap = new GridTilemap(tilemapMock);
    const isBlocking = gridTilemap.hasBlockingTile(
      undefined,
      new Vector2(3, 4)
    );
    expect(isBlocking).toBe(true);
    expect(tilemapMock.getTileAt).not.toHaveBeenCalled();
  });

  it("should detect if no tile present", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    gridTilemap = new GridTilemap(tilemapMock);
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4));
    const isBlocking = gridTilemap.isBlocking(undefined, new Vector2(3, 4));
    expect(hasNoTile).toBe(true);
    expect(isBlocking).toBe(true);
  });

  it("should detect if tile present", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(tilemapMock);
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4));
    expect(hasNoTile).toBe(false);
  });

  it("should detect blocking char", () => {
    gridTilemap = new GridTilemap(tilemapMock);
    mockCharBlockCache.isCharBlockingAt = jest.fn(() => true);

    expect(gridTilemap.hasBlockingChar(new Vector2(3, 3))).toBe(true);
    expect(mockCharBlockCache.isCharBlockingAt).toHaveBeenCalledWith(
      new Vector2(3, 3)
    );
  });

  it("should detect an unblocked tile", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(tilemapMock);

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

  describe("transitions", () => {
    it("should detect transitions from tilemap", () => {
      tilemapMock.layers = [
        {
          name: "layer1",
          tilemapLayer: {
            setDepth: jest.fn(),
          },
          properties: [
            {
              name: "ge_charLayer",
              value: "charLayer1",
            },
          ],
        },
        {
          name: "layer2",
          tilemapLayer: {
            setDepth: jest.fn(),
          },
          properties: [
            {
              name: "ge_charLayer",
              value: "charLayer2",
            },
          ],
        },
        {
          name: "transitions",
          width: 10,
          height: 10,
          tilemapLayer: {
            setDepth: jest.fn(),
          },
          properties: [
            {
              name: "ge_layerTransitionFrom",
              value: "charLayer2",
            },
            {
              name: "ge_layerTransitionTo",
              value: "charLayer1",
            },
          ],
        },
      ];
      tilemapMock.hasTileAt.mockReturnValue(true);
      tilemapMock.getTileAt.mockImplementation((x, y, _, layer) => {
        if (layer == "transitions") {
          if ((x == 4 && y == 5) || (x == 3 && y == 5))
            return { properties: { ge_layerTransition: true } };
        }
        return { properties: {} };
      });

      gridTilemap = new GridTilemap(tilemapMock);
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

    it("should set transitions", () => {
      gridTilemap = new GridTilemap(tilemapMock);
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
      gridTilemap = new GridTilemap(tilemapMock);
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
    };
  }
});
