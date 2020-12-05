import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { GridPhysics } from "./GridPhysics";
import * as Phaser from "phaser";
import { Direction } from "../Direction/Direction";

describe("GridPhysics", () => {
  let gridPhysics: GridPhysics;
  let characterMock;
  let tileMapMock;

  beforeEach(() => {
    characterMock = {
      setStandingFrame: jest.fn(),
      setWalkingFrame: jest.fn(),
      setPosition: jest.fn(),
      getPosition: jest.fn(),
      getTilePos: jest.fn(),
    };
    tileMapMock = {
      layers: [{ name: "someLayerName" }],
      getTileAt: jest.fn(),
      hasTileAt: jest.fn(),
    };
  });

  it("should set players standing frame if direction blocked", () => {
    gridPhysics = new GridPhysics(characterMock, tileMapMock, 16, 3);
    characterMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: true } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.movePlayer(Direction.UP);
  });

  it("should set players standing frame if direction has no tile", () => {
    gridPhysics = new GridPhysics(characterMock, tileMapMock, 16, 3);
    characterMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(false);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.movePlayer(Direction.UP);

    expect(characterMock.setStandingFrame).toHaveBeenCalledWith(Direction.UP);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should start movement", () => {
    gridPhysics = new GridPhysics(characterMock, tileMapMock, 16, 3);
    characterMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.movePlayer(Direction.UP);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.UP);

    gridPhysics.movePlayer(Direction.DOWN);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.UP);
  });

  it("should not update if not moving", () => {
    gridPhysics = new GridPhysics(characterMock, tileMapMock, 16, 3);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.update(300);
    expect(characterMock.setPosition).not.toHaveBeenCalled();
  });

  it("should update", () => {
    const playerXOffset = 8;
    const playerYOffset = -2;
    gridPhysics = new GridPhysics(characterMock, tileMapMock, 16, 3);
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    characterMock.getPosition.mockReturnValue(
      new Phaser.Math.Vector2(5 * 16 + playerXOffset, 6 * 16 + playerYOffset)
    );
    characterMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.movePlayer(Direction.UP);
    gridPhysics.update(250);

    expect(characterMock.setPosition).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(
        5 * 16 + playerXOffset,
        6 * 16 + playerYOffset - 12
      )
    );
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.UP);
  });

  it("should update only till tile border", () => {
    const playerXOffset = 8;
    const playerYOffset = -2;
    gridPhysics = new GridPhysics(characterMock, tileMapMock, 16, 3);
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    characterMock.getPosition.mockReturnValue(
      new Phaser.Math.Vector2(5 * 16 + playerXOffset, 6 * 16 + playerYOffset)
    );
    characterMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.movePlayer(Direction.UP);
    gridPhysics.update(750);

    expect(characterMock.setPosition).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(
        5 * 16 + playerXOffset,
        6 * 16 + playerYOffset - 16
      )
    );
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should take decimal places of last update into account", () => {
    const playerXOffset = 8;
    const playerYOffset = -2;
    gridPhysics = new GridPhysics(characterMock, tileMapMock, 16, 3);
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    characterMock.getPosition.mockReturnValue(
      new Phaser.Math.Vector2(5 * 16 + playerXOffset, 6 * 16 + playerYOffset)
    );
    characterMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.movePlayer(Direction.UP);
    gridPhysics.update(100);

    expect(characterMock.setPosition).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(
        5 * 16 + playerXOffset,
        6 * 16 + playerYOffset - 4
      )
    );
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.UP);

    gridPhysics.update(100);

    expect(characterMock.setPosition).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(
        5 * 16 + playerXOffset,
        6 * 16 + playerYOffset - 9
      )
    );
  });
});
