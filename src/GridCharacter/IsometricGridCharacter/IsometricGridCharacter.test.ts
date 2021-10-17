import { Direction } from "../../Direction/Direction";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { IsometricGridCharacter } from "./IsometricGridCharacter";
import { GridSprite } from "../../GridSprite/GridSprite";

const mockCharacterAnimation = {
  updateCharacterFrame: jest.fn(),
  setStandingFrame: jest.fn(),
  setIsEnabled: jest.fn(),
  setWalkingAnimationMapping: jest.fn(),
};

jest.mock("../CharacterAnimation/CharacterAnimation", function () {
  return {
    CharacterAnimation: jest
      .fn()
      .mockImplementation(function (
        _sprite,
        _walkingAnimationMapping,
        _characterIndex
      ) {
        return mockCharacterAnimation;
      }),
  };
});

describe("IsometricGridCharacter", () => {
  let gridCharacter: IsometricGridCharacter;
  let gridSpriteMock: GridSprite;
  let gridTilemapMock;

  const TILE_WIDTH = 32;
  const TILE_HEIGHT = 24;
  const PLAYER_X_OFFSET = TILE_WIDTH / 4;
  const SPRITE_HEIGHT = 20;
  const PLAYER_Y_OFFSET = -SPRITE_HEIGHT + TILE_HEIGHT;
  const INITIAL_SPRITE_X_POS = (5 * TILE_WIDTH) / 2 + PLAYER_X_OFFSET;
  const INITIAL_SPRITE_Y_POS = (6 * TILE_HEIGHT) / 2 + PLAYER_Y_OFFSET;
  const DEPTH_OF_CHAR_LAYER = 10;

  function mockNonBlockingTile() {
    gridTilemapMock.isBlocking.mockReturnValue(false);
  }

  afterEach(() => {
    mockCharacterAnimation.updateCharacterFrame.mockReset();
    mockCharacterAnimation.setStandingFrame.mockReset();
  });

  beforeEach(() => {
    gridTilemapMock = {
      isBlocking: jest.fn().mockReturnValue(false),
      getDepthOfCharLayer: jest.fn().mockReturnValue(DEPTH_OF_CHAR_LAYER),
      getTransition: jest.fn(),
    };
    gridSpriteMock = <any>{
      getRawSprite: jest.fn(),
      getScaledWidth: jest.fn().mockReturnValue(16),
      getScaledHeight: jest.fn().mockReturnValue(20),
      setDepth: jest.fn(),
      x: (5 * TILE_WIDTH) / 2 + PLAYER_X_OFFSET,
      y: (6 * TILE_HEIGHT) / 2 + PLAYER_Y_OFFSET,
    };
    gridCharacter = new IsometricGridCharacter("player", {
      sprite: gridSpriteMock,
      tilemap: gridTilemapMock,
      tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
      speed: 1,
      walkingAnimationMapping: 3,
      collides: true,
    });
  });

  it("should set tile position", () => {
    const customOffsetX = 10;
    const customOffsetY = 15;
    gridCharacter = new IsometricGridCharacter("player", {
      sprite: gridSpriteMock,
      tilemap: gridTilemapMock,
      tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
      speed: 1,
      offsetX: customOffsetX,
      offsetY: customOffsetY,
      collides: true,
    });
    gridCharacter.setTilePosition({
      position: new Vector2(3, 4),
      layer: "someLayer",
    });

    expect(gridSpriteMock.x).toEqual(
      ((3 - 4) * TILE_WIDTH) / 2 + PLAYER_X_OFFSET + customOffsetX
    );
    expect(gridSpriteMock.y).toEqual(
      ((3 + 4) * TILE_HEIGHT) / 2 + PLAYER_Y_OFFSET + customOffsetY
    );
  });

  it("should move diagonally", () => {
    const tileAmountToWalk = 0.75;
    const expectedYPos =
      INITIAL_SPRITE_Y_POS - (TILE_HEIGHT / 2) * tileAmountToWalk;
    const expectedXPos =
      INITIAL_SPRITE_X_POS + (TILE_WIDTH / 2) * tileAmountToWalk;

    // expected y pos 67 left padded with 0s
    const expectedNewYPosDepthOffset = 0.0000067;

    mockNonBlockingTile();

    expect(gridSpriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(gridSpriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);

    gridCharacter.move(Direction.UP_RIGHT);
    gridCharacter.update(1000 * tileAmountToWalk);

    expect(gridSpriteMock.x).toEqual(expectedXPos);
    expect(gridSpriteMock.y).toEqual(expectedYPos);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP_RIGHT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP_RIGHT);
    expect(gridSpriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + expectedNewYPosDepthOffset
    );
  });

  it("should move vertically", () => {
    const tileAmountToWalk = 0.75;
    const expectedYPos = INITIAL_SPRITE_Y_POS - TILE_HEIGHT * tileAmountToWalk;
    const expectedXPos = INITIAL_SPRITE_X_POS;

    // expected y pos 58 left padded with 0s
    const expectedNewYPosDepthOffset = 0.0000058;

    mockNonBlockingTile();

    expect(gridSpriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(gridSpriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);

    gridCharacter.move(Direction.UP);
    gridCharacter.update(1000 * tileAmountToWalk);

    expect(gridSpriteMock.x).toEqual(expectedXPos);
    expect(gridSpriteMock.y).toEqual(expectedYPos);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
    expect(gridSpriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + expectedNewYPosDepthOffset
    );
  });

  it("should move horizontally", () => {
    const tileAmountToWalk = 0.75;
    const expectedYPos = INITIAL_SPRITE_Y_POS;
    const expectedXPos = INITIAL_SPRITE_X_POS - TILE_WIDTH * tileAmountToWalk;

    // // expected y pos 76 left padded with 0s
    const expectedNewYPosDepthOffset = 0.0000076;
    mockNonBlockingTile();

    expect(gridSpriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(gridSpriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);

    gridCharacter.move(Direction.LEFT);
    gridCharacter.update(1000 * tileAmountToWalk);

    expect(gridSpriteMock.x).toEqual(expectedXPos);
    expect(gridSpriteMock.y).toEqual(expectedYPos);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.LEFT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.LEFT);
    expect(gridSpriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + expectedNewYPosDepthOffset
    );
  });

  it("should detect non-blocking direction", () => {
    const oppositeMapDirection = Direction.DOWN;
    gridTilemapMock.isBlocking.mockReturnValue(false);

    gridCharacter.setTilePosition({
      position: new Vector2(3, 3),
      layer: "someLayer",
    });

    gridCharacter.move(Direction.UP_RIGHT);
    gridCharacter.update(10);

    const result = gridCharacter.isBlockingDirection(Direction.UP_RIGHT);
    expect(gridTilemapMock.isBlocking).toHaveBeenCalledWith(
      "someLayer",
      {
        x: 3,
        y: 1,
      },
      oppositeMapDirection
    );
    expect(result).toBe(false);
  });

  it("should update only till tile border", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP_RIGHT);
    gridCharacter.update(750);
    gridCharacter.update(750);
    gridCharacter.update(750);

    expect(gridSpriteMock.x).toEqual(INITIAL_SPRITE_X_POS + TILE_WIDTH / 2);
    expect(gridSpriteMock.y).toEqual(INITIAL_SPRITE_Y_POS - TILE_HEIGHT / 2);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP_RIGHT);
  });
});
