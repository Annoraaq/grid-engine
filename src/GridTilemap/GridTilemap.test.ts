import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { GridTilemap } from "./GridTilemap";

describe("GridTilemapPlugin", () => {
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
      getTileAt: jest.fn(),
      hasTileAt: jest.fn(),
      createBlankLayer: jest.fn().mockReturnValue(blankLayerMock),
    };
  });

  it("should set layer depths on construction", () => {
    gridTilemap = new GridTilemap(tilemapMock, 1);
    expect(tilemapMock.layers[0].tilemapLayer.setDepth).toHaveBeenCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(
      2001
    );
  });

  it("should set layer depths on construction without firstLayerAboveChar", () => {
    gridTilemap = new GridTilemap(tilemapMock);
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
            name: "gm_alwaysTop",
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
            name: "gm_heightShift",
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
    const charMock1 = <any>{ getId: () => "player" };
    const charMock2 = <any>{ getId: () => "player2" };
    const charMockSameId = <any>{ getId: () => "player2" };
    gridTilemap.addCharacter(charMock1);
    gridTilemap.addCharacter(charMock2);
    gridTilemap.addCharacter(charMockSameId);

    expect(gridTilemap.getCharacters()).toEqual([charMock1, charMockSameId]);
  });

  it("should remove a character", () => {
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const charMock1 = <any>{ getId: () => "player" };
    const charMock2 = <any>{ getId: () => "player2" };
    gridTilemap.addCharacter(charMock1);
    gridTilemap.addCharacter(charMock2);
    gridTilemap.removeCharacter("player");

    expect(gridTilemap.getCharacters()).toEqual([charMock2]);
  });

  it("should detect blocking tiles", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: true } });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Phaser.Math.Vector2(3, 4)
    );
    const isBlocking = gridTilemap.isBlocking(new Phaser.Math.Vector2(3, 4));
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

  it("should return true if nothing blocks", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlockingTile = gridTilemap.hasBlockingTile(
      new Phaser.Math.Vector2(3, 4)
    );
    const isBlocking = gridTilemap.isBlocking(new Phaser.Math.Vector2(3, 4));
    expect(isBlockingTile).toBe(false);
    expect(isBlocking).toBe(false);
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer1");
    expect(tilemapMock.getTileAt).toHaveBeenCalledWith(3, 4, false, "layer2");
  });

  it("should return true if no tile", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlocking = gridTilemap.hasBlockingTile(
      new Phaser.Math.Vector2(3, 4)
    );
    expect(isBlocking).toBe(true);
    expect(tilemapMock.getTileAt).not.toHaveBeenCalled();
  });

  it("should detect if no tile present", () => {
    tilemapMock.hasTileAt.mockReturnValue(false);
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const hasNoTile = gridTilemap.hasNoTile(new Phaser.Math.Vector2(3, 4));
    const isBlocking = gridTilemap.isBlocking(new Phaser.Math.Vector2(3, 4));
    expect(hasNoTile).toBe(true);
    expect(isBlocking).toBe(true);
  });

  it("should detect if tile present", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const hasNoTile = gridTilemap.hasNoTile(new Phaser.Math.Vector2(3, 4));
    expect(hasNoTile).toBe(false);
  });

  it("should detect a blocking char", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(tilemapMock, 3);

    const char1Pos = new Phaser.Math.Vector2(3, 4);
    const char2Pos = new Phaser.Math.Vector2(6, 8);

    const char1Mock = <any>{
      getId: () => "player1",
      getTilePos: () => char1Pos,
    };
    const char2Mock = <any>{
      getId: () => "player2",
      getTilePos: () => char2Pos,
    };
    gridTilemap.addCharacter(char1Mock);
    gridTilemap.addCharacter(char2Mock);
    const hasBlockingChar = gridTilemap.hasBlockingChar(
      new Phaser.Math.Vector2(3, 4)
    );
    const isBlocking = gridTilemap.isBlocking(new Phaser.Math.Vector2(3, 4));
    expect(hasBlockingChar).toBe(true);
    expect(isBlocking).toBe(true);
  });

  it("should detect an unblocked tile", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    gridTilemap = new GridTilemap(tilemapMock, 3);

    const char1Pos = new Phaser.Math.Vector2(3, 4);
    const char2Pos = new Phaser.Math.Vector2(6, 8);

    const char1Mock = <any>{
      getId: () => "player1",
      getTilePos: () => char1Pos,
    };
    const char2Mock = <any>{
      getId: () => "player2",
      getTilePos: () => char2Pos,
    };
    gridTilemap.addCharacter(char1Mock);
    gridTilemap.addCharacter(char2Mock);
    const hasBlockingChar = gridTilemap.hasBlockingChar(
      new Phaser.Math.Vector2(4, 4)
    );
    expect(hasBlockingChar).toBe(false);
  });
});
