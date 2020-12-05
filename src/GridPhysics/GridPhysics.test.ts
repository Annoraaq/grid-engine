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
});
