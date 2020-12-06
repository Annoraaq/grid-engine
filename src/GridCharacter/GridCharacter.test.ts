import { GridCharacter } from "./GridCharacter";
import * as Phaser from "phaser";
import { Direction } from "../Direction/Direction";

describe("GridCharacter", () => {
  let gridCharacter: GridCharacter;
  let spriteMock: Phaser.GameObjects.Sprite;
  let tileMapMock;

  beforeEach(() => {
    tileMapMock = {
      layers: [{ name: "someLayerName" }],
      getTileAt: jest.fn(),
      hasTileAt: jest.fn(),
    };
    spriteMock = <any>{
      width: 16,
      setFrame: jest.fn(),
      texture: {
        source: [
          {
            width: 144,
          },
        ],
      },
    };
  });

  it("should initialize with standing face down frame", () => {
    const charIndex = 3;
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      charIndex,
      16,
      tileMapMock,
      4
    );
    expect(spriteMock.setFrame).toHaveBeenCalledWith(37);
  });

  it("should get position", () => {
    const spriteCenterPos = new Phaser.Math.Vector2(3, 4);
    spriteMock.getCenter = jest.fn().mockReturnValue(spriteCenterPos);
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      tileMapMock,
      4
    );

    expect(gridCharacter.getPosition()).toEqual(spriteCenterPos);
  });

  it("should set tile position", () => {
    spriteMock.setPosition = jest.fn();
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      tileMapMock,
      4
    );

    gridCharacter.setPosition(new Phaser.Math.Vector2(3, 4));

    expect(spriteMock.setPosition).toHaveBeenCalledWith(3, 4);
  });

  it("should set correct walking frame with lastFoodLeft = false", () => {
    spriteMock.setFrame = jest.fn();
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      tileMapMock,
      4
    );
    gridCharacter.lastFootLeft = false;

    gridCharacter.setWalkingFrame(Direction.UP);
    gridCharacter.setWalkingFrame(Direction.DOWN);
    gridCharacter.setWalkingFrame(Direction.LEFT);
    gridCharacter.setWalkingFrame(Direction.RIGHT);

    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 65);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(3, 38);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(4, 47);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(5, 56);
  });

  it("should set correct walking frame with lastFoodLeft = true", () => {
    spriteMock.setFrame = jest.fn();
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      tileMapMock,
      4
    );
    gridCharacter.lastFootLeft = true;

    gridCharacter.setWalkingFrame(Direction.UP);
    gridCharacter.setWalkingFrame(Direction.DOWN);
    gridCharacter.setWalkingFrame(Direction.LEFT);
    gridCharacter.setWalkingFrame(Direction.RIGHT);

    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 63);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(3, 36);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(4, 45);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(5, 54);
  });

  it("should set correct standing frame", () => {
    spriteMock.setFrame = jest.fn();
    spriteMock.frame = <any>{ name: "anything" };
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      tileMapMock,
      4
    );
    gridCharacter.lastFootLeft = true;

    gridCharacter.setStandingFrame(Direction.UP);
    gridCharacter.setStandingFrame(Direction.DOWN);
    gridCharacter.setStandingFrame(Direction.LEFT);
    gridCharacter.setStandingFrame(Direction.RIGHT);

    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(2, 64);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(3, 37);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(4, 46);
    expect(spriteMock.setFrame).toHaveBeenNthCalledWith(5, 55);
  });

  it("should toggle lastFootLeft if currently standing", () => {
    spriteMock.setFrame = jest.fn();
    spriteMock.frame = <any>{ name: 64 };
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      tileMapMock,
      4
    );
    gridCharacter.lastFootLeft = false;

    gridCharacter.setStandingFrame(Direction.UP);

    expect(gridCharacter.lastFootLeft).toBe(true);
  });

  it("should not toggle lastFootLeft if currently not standing", () => {
    spriteMock.setFrame = jest.fn();
    spriteMock.frame = <any>{ name: 63 };
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      tileMapMock,
      4
    );
    gridCharacter.lastFootLeft = false;

    gridCharacter.setStandingFrame(Direction.UP);

    expect(gridCharacter.lastFootLeft).toBe(false);
  });

  it("should get tile pos", () => {
    spriteMock.height = 20;
    const playerXOffset = 8;
    const playerYOffset = -2;
    const expectedXPos = 5;
    const expectedYPos = 6;
    const expectedPos = new Phaser.Math.Vector2(expectedXPos, expectedYPos);
    spriteMock.getCenter = jest
      .fn()
      .mockReturnValue(
        new Phaser.Math.Vector2(5 * 16 + playerXOffset, 6 * 16 + playerYOffset)
      );
    gridCharacter = new GridCharacter(
      "player",
      spriteMock,
      3,
      16,
      tileMapMock,
      4
    );

    expect(gridCharacter.getTilePos()).toEqual(expectedPos);
  });
});
