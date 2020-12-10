import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { GridTilemap } from "./GridTilemap";

describe("GridTilemapPlugin", () => {
  let gridTilemap: GridTilemap;
  let tilemapMock;

  beforeEach(() => {
    tilemapMock = {
      layers: [
        {
          name: "layer1",
          tilemapLayer: {
            setDepth: jest.fn(),
          },
        },
        {
          name: "layer2",
          tilemapLayer: {
            setDepth: jest.fn(),
          },
        },
      ],
      tileWidth: 16,
      getTileAt: jest.fn(),
      hasTileAt: jest.fn(),
    };
  });

  it("should set layer depths on construction", () => {
    gridTilemap = new GridTilemap(tilemapMock, 1);
    expect(tilemapMock.layers[0].tilemapLayer.setDepth).toHaveBeenCalledWith(0);
    expect(tilemapMock.layers[1].tilemapLayer.setDepth).toHaveBeenCalledWith(
      2001
    );
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

  it("should detect blocking tiles", () => {
    tilemapMock.hasTileAt.mockReturnValue(true);
    tilemapMock.getTileAt.mockReturnValue({ properties: { collides: true } });
    gridTilemap = new GridTilemap(tilemapMock, 3);
    const isBlocking = gridTilemap.hasBlockingTile(
      new Phaser.Math.Vector2(3, 4)
    );
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
    const isBlocking = gridTilemap.hasBlockingTile(
      new Phaser.Math.Vector2(3, 4)
    );
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
    expect(hasNoTile).toBe(true);
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
    expect(hasBlockingChar).toBe(true);
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
