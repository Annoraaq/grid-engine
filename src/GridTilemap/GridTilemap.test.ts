import { CollisionStrategy } from "./../Collisions/CollisionStrategy";
import { GlobalConfig } from "./../GlobalConfig/GlobalConfig";
import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { of } from "rxjs";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { Direction, NumberOfDirections } from "./../Direction/Direction";
import { GridTilemap } from "./GridTilemap";
import { Rect } from "../Utils/Rect/Rect";
import * as Phaser from "phaser";

const MAX_CHAR_LAYERS = 1;

const mockCharBlockCache = {
  addCharacter: jest.fn(),
  removeCharacter: jest.fn(),
  isCharBlockingAt: jest.fn(),
};

const mockCharLayers = [
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
      width: 20,
      height: 30,
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
      layerOverlay: false,
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
      MAX_CHAR_LAYERS + 2
    );
    expect(tilemapMock.layers[2].tilemapLayer.setDepth).toHaveBeenCalledWith(2);
  });

  it("should consider charLayers", () => {
    tilemapMock.layers = mockCharLayers;
    gridTilemap = new GridTilemap(tilemapMock);

    expect(
      tilemapMock.layers[0].tilemapLayer.setDepth
    ).toHaveBeenLastCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(1);
    expect(tilemapMock.layers[2].tilemapLayer.setDepth).toHaveBeenCalledWith(
      MAX_CHAR_LAYERS + 2
    );
    expect(tilemapMock.layers[3].tilemapLayer.setDepth).toHaveBeenCalledWith(
      MAX_CHAR_LAYERS + 3
    );
    expect(gridTilemap.getDepthOfCharLayer("charLayer1")).toEqual(1);
    expect(gridTilemap.getDepthOfCharLayer("charLayer2")).toEqual(
      MAX_CHAR_LAYERS + 3
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

  it("should set the lowest char layer", () => {
    tilemapMock.layers = [
      {
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
      },
      {
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
      },
    ];
    gridTilemap = new GridTilemap(tilemapMock);
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
      layerOverlay: false,
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

  it("should block if no tile present", () => {
    tilemapMock.layers = mockCharLayers;
    tilemapMock.hasTileAt.mockReturnValue(false);
    gridTilemap = new GridTilemap(tilemapMock);
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4), "charLayer1");
    const isBlocking = gridTilemap.isBlocking(undefined, new Vector2(3, 4));
    expect(hasNoTile).toBe(true);
    expect(isBlocking).toBe(true);
  });

  it("should block if no tile present on char layer", () => {
    tilemapMock.layers = mockCharLayers;
    tilemapMock.hasTileAt.mockImplementation((_x, _y, layerName) => {
      return layerName !== "layer1" && layerName !== "layer2";
    });
    gridTilemap = new GridTilemap(tilemapMock);
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4), "charLayer1");
    const isBlocking = gridTilemap.isBlocking("charLayer1", new Vector2(3, 4));
    expect(hasNoTile).toBe(true);
    expect(isBlocking).toBe(true);
  });

  it("should not block if tile present on char layer", () => {
    tilemapMock.layers = mockCharLayers;
    tilemapMock.hasTileAt.mockImplementation((_x, _y, layerName) => {
      return layerName === "layer2";
    });
    gridTilemap = new GridTilemap(tilemapMock);
    const hasNoTile = gridTilemap.hasNoTile(new Vector2(3, 4), "charLayer1");
    const isBlocking = gridTilemap.isBlocking("charLayer1", new Vector2(3, 4));
    expect(hasNoTile).toBe(false);
    expect(isBlocking).toBe(false);
  });

  it("should detect blocking char", () => {
    gridTilemap = new GridTilemap(tilemapMock);
    mockCharBlockCache.isCharBlockingAt = jest.fn(() => true);

    expect(gridTilemap.hasBlockingChar(new Vector2(3, 3), "layer1")).toBe(true);
    expect(mockCharBlockCache.isCharBlockingAt).toHaveBeenCalledWith(
      new Vector2(3, 3),
      "layer1"
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
    const hasBlockingChar = gridTilemap.hasBlockingChar(
      new Vector2(4, 4),
      "layer1"
    );
    expect(hasBlockingChar).toBe(false);
  });

  it("should get scaled tile width", () => {
    expect(gridTilemap.getTileWidth()).toEqual(48);
  });

  it("should get scaled tile height", () => {
    expect(gridTilemap.getTileHeight()).toEqual(48);
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

  it("should get tileSize", () => {
    const scaleFactor = 3;
    const scaledTileWidth = tilemapMock.tileWidth * scaleFactor;
    const scaledTileHeight = tilemapMock.tileHeight * scaleFactor;
    expect(gridTilemap.getTileSize()).toEqual(
      new Vector2(scaledTileWidth, scaledTileHeight)
    );
  });

  it("should transform tile pos to pixel pos", () => {
    const scaleFactor = 3;
    const scaledTileWidth = tilemapMock.tileWidth * scaleFactor;
    const scaledTileHeight = tilemapMock.tileHeight * scaleFactor;
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
    const scaledTileWidth = tilemapMock.tileWidth * scaleFactor;
    const scaledTileHeight = tilemapMock.tileHeight * scaleFactor;
    expect(gridTilemap.getTileDistance(Direction.DOWN)).toEqual(
      new Vector2(scaledTileWidth, scaledTileHeight)
    );
  });

  it("should provide tile distance for isometric maps on orthogonal dirs", () => {
    tilemapMock.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC;
    const scaleFactor = 3;
    const scaledTileWidth = tilemapMock.tileWidth * scaleFactor;
    const scaledTileHeight = tilemapMock.tileHeight * scaleFactor;
    expect(gridTilemap.getTileDistance(Direction.DOWN)).toEqual(
      new Vector2(scaledTileWidth, scaledTileHeight)
    );
  });

  it("should provide map direction", () => {
    expect(gridTilemap.toMapDirection(Direction.DOWN)).toEqual(Direction.DOWN);
  });

  it("should detect non-isometric maps", () => {
    expect(gridTilemap.isIsometric()).toEqual(false);
  });

  describe("isometric", () => {
    const scaleFactor = 3;

    beforeEach(() => {
      tilemapMock.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC;
    });

    it("should detect isometric maps", () => {
      expect(gridTilemap.isIsometric()).toEqual(true);
    });

    it("should transform tile pos to pixel pos for isometric maps", () => {
      const scaledTileWidth = tilemapMock.tileWidth * scaleFactor;
      const scaledTileHeight = tilemapMock.tileHeight * scaleFactor;
      const tilePosition = new Vector2(2, 3);
      expect(gridTilemap.tilePosToPixelPos(tilePosition)).toEqual(
        new Vector2(
          scaledTileWidth * 0.5 * (tilePosition.x - tilePosition.y),
          scaledTileHeight * 0.5 * (tilePosition.x + tilePosition.y)
        )
      );
    });

    it("should provide tile distance for isometric maps on diagonal dirs", () => {
      const scaledTileWidth = tilemapMock.tileWidth * scaleFactor;
      const scaledTileHeight = tilemapMock.tileHeight * scaleFactor;
      expect(gridTilemap.getTileDistance(Direction.DOWN_LEFT)).toEqual(
        new Vector2(scaledTileWidth * 0.5, scaledTileHeight * 0.5)
      );
    });

    it("should provide map direction", () => {
      expect(gridTilemap.toMapDirection(Direction.DOWN)).toEqual(
        Direction.DOWN_RIGHT
      );
    });
  });

  describe("transitions", () => {
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
      setTilePosition: jest.fn(),
    };
  }
});
