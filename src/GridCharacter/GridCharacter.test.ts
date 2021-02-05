import { WalkingAnimationMapping } from "./../GridMovementPlugin";
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
    gridCharacter = new GridCharacter("player", {
      sprite: spriteMock,
      tilemap: gridTilemapMock,
      tileSize: 16,
      speed: 3,
      walkingAnimationMapping: 3,
    });
  });

  it("should set the correct default charIndex", () => {
    gridCharacter = new GridCharacter("player", {
      sprite: spriteMock,
      tilemap: gridTilemapMock,
      tileSize: 16,
      speed: 3,
    });
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(100);
    expect(spriteMock.setFrame).not.toHaveBeenCalledWith(NaN);
  });

  describe("frames by anim mapping", () => {
    const walkingAnimationMapping = {
      up: {
        leftFoot: 65,
        standing: 64,
        rightFoot: 63,
      },
      down: {
        leftFoot: 38,
        standing: 37,
        rightFoot: 36,
      },
      left: {
        leftFoot: 47,
        standing: 46,
        rightFoot: 45,
      },
      right: {
        leftFoot: 56,
        standing: 55,
        rightFoot: 54,
      },
    };

    beforeEach(() => {
      gridCharacter = new GridCharacter("player", {
        sprite: spriteMock,
        tilemap: gridTilemapMock,
        tileSize: 16,
        speed: 3,
        walkingAnimationMapping,
      });
    });

    checkWalkingFrames(walkingAnimationMapping);
  });

  describe("frames by char index", () => {
    const walkingAnimationMapping = {
      up: {
        leftFoot: 65,
        standing: 64,
        rightFoot: 63,
      },
      down: {
        leftFoot: 38,
        standing: 37,
        rightFoot: 36,
      },
      left: {
        leftFoot: 47,
        standing: 46,
        rightFoot: 45,
      },
      right: {
        leftFoot: 56,
        standing: 55,
        rightFoot: 54,
      },
    };
    checkWalkingFrames(walkingAnimationMapping);
  });

  it("should set the correct depth on construction", () => {
    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000);
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

  describe("isBlockingDirection", () => {
    it("should detect movement", () => {
      mockNonBlockingTile();
      gridCharacter.move(Direction.DOWN);
      expect(gridCharacter.isMoving()).toBeTruthy();
    });

    it("should detect non-movement", () => {
      mockBlockingTile();
      gridCharacter.move(Direction.DOWN);
      expect(gridCharacter.isMoving()).toBeFalsy();
    });
  });

  describe("isBlockingDirection", () => {
    it("direction NONE never blocks", () => {
      const direction = Direction.NONE;
      gridTilemapMock.hasBlockingTile.mockReturnValue(true);
      gridTilemapMock.hasBlockingChar.mockReturnValue(true);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(result).toBe(false);
    });

    it("should detect non-blocking direction", () => {
      const direction = Direction.RIGHT;
      gridTilemapMock.hasBlockingTile.mockReturnValue(false);
      gridTilemapMock.hasBlockingChar.mockReturnValue(false);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(gridTilemapMock.hasBlockingTile).toHaveBeenCalledWith({
        x: 1,
        y: 0,
      });
      expect(gridTilemapMock.hasBlockingChar).toHaveBeenCalledWith({
        x: 1,
        y: 0,
      });
      expect(result).toBe(false);
    });

    it("should detect blocking direction if map blocks", () => {
      const direction = Direction.RIGHT;
      gridTilemapMock.hasBlockingTile.mockReturnValue(true);
      gridTilemapMock.hasBlockingChar.mockReturnValue(false);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(result).toBe(true);
    });

    it("should detect blocking direction if char blocks", () => {
      const direction = Direction.RIGHT;
      gridTilemapMock.hasBlockingTile.mockReturnValue(false);
      gridTilemapMock.hasBlockingChar.mockReturnValue(true);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(result).toBe(true);
    });

    it("should detect blocking direction if char and tile block", () => {
      const direction = Direction.RIGHT;
      gridTilemapMock.hasBlockingTile.mockReturnValue(true);
      gridTilemapMock.hasBlockingChar.mockReturnValue(true);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(result).toBe(true);
    });
  });

  describe("turnTowards", () => {
    beforeEach(() => {
      (<any>spriteMock.setFrame).mockReset();
    });
    it("should turn towards left", () => {
      gridCharacter.turnTowards(Direction.LEFT);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(46);
    });

    it("should turn towards right", () => {
      gridCharacter.turnTowards(Direction.RIGHT);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(55);
    });

    it("should turn towards up", () => {
      gridCharacter.turnTowards(Direction.UP);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(64);
    });

    it("should turn towards down", () => {
      gridCharacter.turnTowards(Direction.DOWN);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(37);
    });

    it("should not turn if moving", () => {
      gridCharacter.move(Direction.DOWN);
      (<any>spriteMock.setFrame).mockReset();
      gridCharacter.turnTowards(Direction.LEFT);
      expect(spriteMock.setFrame).not.toHaveBeenCalled();
    });

    it("should not turn if direction NONE", () => {
      gridCharacter.turnTowards(Direction.NONE);
      expect(spriteMock.setFrame).not.toHaveBeenCalled();
    });
  });

  function checkWalkingFrames(walkingAnimationMapping) {
    describe("walking frames", () => {
      beforeEach(() => {
        spriteMock.setFrame = jest.fn();
        spriteMock.frame = <any>{ name: walkingAnimationMapping.up.standing };
        mockNonBlockingTile();
      });

      describe("lastFootLeft = false", () => {
        it("should set the correct frame when walking up", () => {
          gridCharacter.move(Direction.UP);
          gridCharacter.update(50); // move to 2 / 16 px
          gridCharacter.update(200); // move to 12 / 16 px

          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            1,
            walkingAnimationMapping.up.leftFoot
          );
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            2,
            walkingAnimationMapping.up.standing
          );
        });

        it("should set the correct frame when walking down", () => {
          gridCharacter.move(Direction.DOWN);
          gridCharacter.update(50); // move to 2 / 16 px
          gridCharacter.update(200); // move to 12 / 16 px

          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            1,
            walkingAnimationMapping.down.leftFoot
          );
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            2,
            walkingAnimationMapping.down.standing
          );
        });

        it("should set the correct frame when walking left", () => {
          gridCharacter.move(Direction.LEFT);
          gridCharacter.update(50); // move to 2 / 16 px
          gridCharacter.update(200); // move to 12 / 16 px

          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            1,
            walkingAnimationMapping.left.leftFoot
          );
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            2,
            walkingAnimationMapping.left.standing
          );
        });

        it("should set the correct frame when walking right", () => {
          gridCharacter.move(Direction.RIGHT);
          gridCharacter.update(50); // move to 2 / 16 px
          gridCharacter.update(200); // move to 12 / 16 px

          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            1,
            walkingAnimationMapping.right.leftFoot
          );
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            2,
            walkingAnimationMapping.right.standing
          );
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
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            1,
            walkingAnimationMapping.up.rightFoot
          );
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            2,
            walkingAnimationMapping.up.standing
          );
        });

        it("should set the correct frame when walking down", () => {
          gridCharacter.move(Direction.DOWN);
          gridCharacter.update(50); // move to 2 / 16 px
          gridCharacter.update(200); // move to 12 / 16 px

          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            1,
            walkingAnimationMapping.down.rightFoot
          );
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            2,
            walkingAnimationMapping.down.standing
          );
        });

        it("should set the correct frame when walking left", () => {
          gridCharacter.move(Direction.LEFT);
          gridCharacter.update(50); // move to 2 / 16 px
          gridCharacter.update(200); // move to 12 / 16 px

          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            1,
            walkingAnimationMapping.left.rightFoot
          );
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            2,
            walkingAnimationMapping.left.standing
          );
        });

        it("should set the correct frame when walking right", () => {
          gridCharacter.move(Direction.RIGHT);
          gridCharacter.update(50); // move to 2 / 16 px
          gridCharacter.update(200); // move to 12 / 16 px

          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            1,
            walkingAnimationMapping.right.rightFoot
          );
          expect(spriteMock.setFrame).toHaveBeenNthCalledWith(
            2,
            walkingAnimationMapping.right.standing
          );
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
  }
});
