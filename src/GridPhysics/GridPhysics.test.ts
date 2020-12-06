import { GridPhysics } from "./GridPhysics";
import * as Phaser from "phaser";
import { Direction } from "../Direction/Direction";

describe("GridPhysics", () => {
  let gridPhysics: GridPhysics;
  let tileMapMock;

  function createCharacterMock(id: string): any {
    return {
      setStandingFrame: jest.fn(),
      setWalkingFrame: jest.fn(),
      setPosition: jest.fn(),
      getPosition: jest.fn(),
      getTilePos: jest.fn(),
      getId: jest.fn().mockReturnValue(id),
    };
  }

  beforeEach(() => {
    tileMapMock = {
      layers: [{ name: "someLayerName" }],
      getTileAt: jest.fn(),
      hasTileAt: jest.fn(),
    };
  });

  it("should set players standing frame if direction blocked", () => {
    const playerMock = createCharacterMock("player");
    gridPhysics = new GridPhysics(playerMock, tileMapMock, 16, 3);
    playerMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: true } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.moveCharacter(Direction.UP);
    expect(playerMock.setStandingFrame).toHaveBeenCalledWith(Direction.UP);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should set players standing frame if direction has no tile", () => {
    const playerMock = createCharacterMock("player");
    gridPhysics = new GridPhysics(playerMock, tileMapMock, 16, 3);
    playerMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(false);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.moveCharacter(Direction.UP);

    expect(playerMock.setStandingFrame).toHaveBeenCalledWith(Direction.UP);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should start movement", () => {
    const playerMock = createCharacterMock("player");
    gridPhysics = new GridPhysics(playerMock, tileMapMock, 16, 3);
    playerMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.moveCharacter(Direction.UP);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.UP);

    gridPhysics.moveCharacter(Direction.DOWN);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.UP);
  });

  it("should not update if not moving", () => {
    const playerMock = createCharacterMock("player");
    gridPhysics = new GridPhysics(playerMock, tileMapMock, 16, 3);
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.update(300);
    expect(playerMock.setPosition).not.toHaveBeenCalled();
  });

  it("should update", () => {
    const playerMock = createCharacterMock("player");
    const playerXOffset = 8;
    const playerYOffset = -2;
    gridPhysics = new GridPhysics(playerMock, tileMapMock, 16, 3);
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    playerMock.getPosition.mockReturnValue(
      new Phaser.Math.Vector2(5 * 16 + playerXOffset, 6 * 16 + playerYOffset)
    );
    playerMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.moveCharacter(Direction.UP);
    gridPhysics.update(250);

    expect(playerMock.setPosition).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(
        5 * 16 + playerXOffset,
        6 * 16 + playerYOffset - 12
      )
    );
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.UP);
  });

  it("should update only till tile border", () => {
    const playerMock = createCharacterMock("player");
    const playerXOffset = 8;
    const playerYOffset = -2;
    gridPhysics = new GridPhysics(playerMock, tileMapMock, 16, 3);
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    playerMock.getPosition.mockReturnValue(
      new Phaser.Math.Vector2(5 * 16 + playerXOffset, 6 * 16 + playerYOffset)
    );
    playerMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.moveCharacter(Direction.UP);
    gridPhysics.update(750);

    expect(playerMock.setPosition).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(
        5 * 16 + playerXOffset,
        6 * 16 + playerYOffset - 16
      )
    );
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should take decimal places of last update into account", () => {
    const playerMock = createCharacterMock("player");
    const playerXOffset = 8;
    const playerYOffset = -2;
    gridPhysics = new GridPhysics(playerMock, tileMapMock, 16, 3);
    tileMapMock.getTileAt.mockReturnValue({ properties: { collides: false } });
    tileMapMock.hasTileAt.mockReturnValue(true);
    playerMock.getPosition.mockReturnValue(
      new Phaser.Math.Vector2(5 * 16 + playerXOffset, 6 * 16 + playerYOffset)
    );
    playerMock.getTilePos.mockReturnValue(new Phaser.Math.Vector2(5, 6));
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.NONE);

    gridPhysics.moveCharacter(Direction.UP);
    gridPhysics.update(100);

    expect(playerMock.setPosition).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(
        5 * 16 + playerXOffset,
        6 * 16 + playerYOffset - 4
      )
    );
    expect(gridPhysics.getMovementDirection()).toEqual(Direction.UP);

    gridPhysics.update(100);

    expect(playerMock.setPosition).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(
        5 * 16 + playerXOffset,
        6 * 16 + playerYOffset - 9
      )
    );
  });
});
