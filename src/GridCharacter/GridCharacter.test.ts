import { GridCharacter } from "./GridCharacter";
import * as Phaser from "phaser";
import { Direction } from "../Direction/Direction";

describe("GridCharacter", () => {
  let gridCharacter: GridCharacter;
  let spriteMock: Phaser.GameObjects.Sprite;
  let gridTilemapMock;

  const PLAYER_X_OFFSET = 8;
  const PLAYER_Y_OFFSET = -2;
  const TILE_SIZE = 16;

  function mockNonBlockingTile() {
    gridTilemapMock.hasBlockingTile.mockReturnValue(false);
    gridTilemapMock.hasNoTile.mockReturnValue(false);
  }

  function mockBlockingTile() {
    gridTilemapMock.hasBlockingTile.mockReturnValue(true);
    gridTilemapMock.hasNoTile.mockReturnValue(false);
  }

  beforeEach(() => {
    gridTilemapMock = {
      hasBlockingTile: jest.fn(),
      hasNoTile: jest.fn(),
      hasBlockingChar: jest.fn().mockReturnValue(false),
    };
    spriteMock = <any>{
      width: 16,
      height: 20,
      setFrame: jest.fn(),
      setDepth: jest.fn(),
      frame: { name: "anything" },
      getCenter: jest
        .fn()
        .mockReturnValue(
          new Phaser.Math.Vector2(
            5 * TILE_SIZE + PLAYER_X_OFFSET,
            6 * TILE_SIZE + PLAYER_Y_OFFSET
          )
        ),
      setPosition: jest.fn(),
      texture: {
        source: [
          {
            width: 144,
          },
        ],
      },
    };
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      gridTilemapMock,
      3
    );
  });

  it("should initialize with standing face down frame", () => {
    expect(spriteMock.setFrame).toHaveBeenCalledWith(37);
  });

  it("should set the correct depth on construction", () => {
    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000);
  });

  describe("walking frames", () => {
    beforeEach(() => {
      spriteMock.setFrame = jest.fn();
      spriteMock.frame = <any>{ name: 64 };
      mockNonBlockingTile();
    });

    describe("lastFootLeft = false", () => {
      it("should set the correct frame when walking up", () => {
        gridCharacter.move(Direction.UP);
        gridCharacter.update(50); // move to 2 / 16 px
        gridCharacter.update(200); // move to 12 / 16 px

        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(1, 65);
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 64);
      });

      it("should set the correct frame when walking down", () => {
        gridCharacter.move(Direction.DOWN);
        gridCharacter.update(50); // move to 2 / 16 px
        gridCharacter.update(200); // move to 12 / 16 px

        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(1, 38);
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 37);
      });

      it("should set the correct frame when walking left", () => {
        gridCharacter.move(Direction.LEFT);
        gridCharacter.update(50); // move to 2 / 16 px
        gridCharacter.update(200); // move to 12 / 16 px

        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(1, 47);
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 46);
      });

      it("should set the correct frame when walking right", () => {
        gridCharacter.move(Direction.RIGHT);
        gridCharacter.update(50); // move to 2 / 16 px
        gridCharacter.update(200); // move to 12 / 16 px

        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(1, 56);
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 55);
      });
    });

    describe("lastFootLeft = true", () => {
      function setNonStandingFrame() {
        spriteMock.frame.name = "65";
      }

      function takeOneStep() {
        gridCharacter.move(Direction.UP);
        gridCharacter.update(1000);
      }

      beforeEach(() => {
        setNonStandingFrame();
        takeOneStep();
        spriteMock.setFrame = jest.fn();
      });

      it("should set the correct frame when walking up", () => {
        gridCharacter.move(Direction.UP);
        gridCharacter.update(50); // move to 2 / 16 px
        gridCharacter.update(200); // move to 12 / 16 px
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(1, 63);
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 64);
      });

      it("should set the correct frame when walking down", () => {
        gridCharacter.move(Direction.DOWN);
        gridCharacter.update(50); // move to 2 / 16 px
        gridCharacter.update(200); // move to 12 / 16 px

        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(1, 36);
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 37);
      });

      it("should set the correct frame when walking left", () => {
        gridCharacter.move(Direction.LEFT);
        gridCharacter.update(50); // move to 2 / 16 px
        gridCharacter.update(200); // move to 12 / 16 px

        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(1, 45);
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 46);
      });

      it("should set the correct frame when walking right", () => {
        gridCharacter.move(Direction.RIGHT);
        gridCharacter.update(50); // move to 2 / 16 px
        gridCharacter.update(200); // move to 12 / 16 px

        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(1, 54);
        expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 55);
      });
    });

    it("should set players standing frame if direction blocked", () => {
      mockBlockingTile();
      expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);

      gridCharacter.move(Direction.UP);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(64);
      expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    });
  });

  it("should get tile pos", () => {
    const expectedPos = new Phaser.Math.Vector2(5, 6);
    const newTilePos = new Phaser.Math.Vector2(5, 6);
    gridCharacter.setTilePosition(newTilePos);
    newTilePos.x = 20;

    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000 + expectedPos.y);
    expect(gridCharacter.getTilePos()).toEqual(expectedPos);
  });

  it("should start movement", () => {
    mockNonBlockingTile();
    expect(gridCharacter.getTilePos()).toEqual(new Phaser.Math.Vector2(0, 0));

    gridCharacter.move(Direction.UP);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getTilePos()).toEqual(new Phaser.Math.Vector2(0, -1));
    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000 - 1);

    gridCharacter.move(Direction.DOWN);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getTilePos()).toEqual(new Phaser.Math.Vector2(0, -1));
  });

  it("should not update if not moving", () => {
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);

    gridCharacter.update(300);
    expect(spriteMock.setPosition).not.toHaveBeenCalled();
  });

  it("should update", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(250);

    expect(spriteMock.setPosition).toHaveBeenCalledWith(
      5 * TILE_SIZE + PLAYER_X_OFFSET,
      6 * TILE_SIZE + PLAYER_Y_OFFSET - 12
    );
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
  });

  it("should update only till tile border", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(750);

    expect(spriteMock.setPosition).toHaveBeenCalledWith(
      5 * 16 + PLAYER_X_OFFSET,
      6 * 16 + PLAYER_Y_OFFSET - 16
    );
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should take decimal places of last update into account", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(100);

    expect(spriteMock.setPosition).toHaveBeenCalledWith(
      5 * 16 + PLAYER_X_OFFSET,
      6 * 16 + PLAYER_Y_OFFSET - 4
    );
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);

    gridCharacter.update(100);

    expect(spriteMock.setPosition).toHaveBeenCalledWith(
      5 * 16 + PLAYER_X_OFFSET,
      6 * 16 + PLAYER_Y_OFFSET - 9
    );
  });

  it("should set tile position", () => {
    gridCharacter.setTilePosition(new Phaser.Math.Vector2(3, 4));

    expect(spriteMock.setPosition).toHaveBeenCalledWith(
      3 * TILE_SIZE + PLAYER_X_OFFSET,
      4 * TILE_SIZE + PLAYER_Y_OFFSET
    );
  });

  it("should not set tile position when moving", () => {
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);
    gridCharacter.setTilePosition(new Phaser.Math.Vector2(3, 4));

    expect(spriteMock.setPosition).not.toHaveBeenCalled();
  });
});
