import { GridCharacter } from "./GridCharacter";
import { Direction } from "../Direction/Direction";
import { take } from "rxjs/operators";
import { CharacterAnimation } from "./CharacterAnimation/CharacterAnimation";
import { Movement } from "../Movement/Movement";
import { Vector2 } from "../Utils/Vector2/Vector2";

const mockCharacterAnimation = {
  updateCharacterFrame: jest.fn(),
  setStandingFrame: jest.fn(),
  setIsEnabled: jest.fn(),
  setWalkingAnimationMapping: jest.fn(),
};

jest.mock("./CharacterAnimation/CharacterAnimation", function () {
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

describe("GridCharacter", () => {
  let gridCharacter: GridCharacter;
  let spriteMock: Phaser.GameObjects.Sprite;
  let gridTilemapMock;

  const TILE_WIDTH = 16;
  const TILE_HEIGHT = 16;
  const PLAYER_X_OFFSET = 0;
  const PLAYER_Y_OFFSET = -4;
  const MS_FOR_12_PX = 250;
  const INITIAL_SPRITE_X_POS = 5 * TILE_WIDTH + PLAYER_X_OFFSET;
  const INITIAL_SPRITE_Y_POS = 6 * TILE_HEIGHT + PLAYER_Y_OFFSET;

  function mockNonBlockingTile() {
    gridTilemapMock.hasBlockingTile.mockReturnValue(false);
    gridTilemapMock.hasNoTile.mockReturnValue(false);
  }

  function mockBlockingTile() {
    gridTilemapMock.hasBlockingTile.mockReturnValue(true);
    gridTilemapMock.hasNoTile.mockReturnValue(false);
  }

  afterEach(() => {
    mockCharacterAnimation.updateCharacterFrame.mockReset();
    mockCharacterAnimation.setStandingFrame.mockReset();
  });

  beforeEach(() => {
    gridTilemapMock = {
      hasBlockingTile: jest.fn(),
      hasNoTile: jest.fn(),
      hasBlockingChar: jest.fn().mockReturnValue(false),
    };
    spriteMock = <any>{
      width: 16,
      scale: 1,
      height: 20,
      setFrame: jest.fn(),
      setDepth: jest.fn(),
      frame: { name: "anything" },
      setOrigin: jest.fn(),
      x: 5 * TILE_WIDTH + PLAYER_X_OFFSET,
      y: 6 * TILE_HEIGHT + PLAYER_Y_OFFSET,
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
      tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
      speed: 3,
      walkingAnimationMapping: 3,
      walkingAnimationEnabled: true,
    });
  });

  it("should set the correct default charIndex", () => {
    gridCharacter = new GridCharacter("player", {
      sprite: spriteMock,
      tilemap: gridTilemapMock,
      tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
      speed: 3,
      walkingAnimationEnabled: true,
    });
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(100);
    expect(CharacterAnimation).toHaveBeenCalledWith(spriteMock, undefined, 0);
  });

  it("should set the correct depth on construction", () => {
    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000);
  });

  it("should be facing down on construction by default", () => {
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
  });

  it("should get tile pos", () => {
    const expectedPos = new Vector2(5, 6);
    const newTilePos = new Vector2(5, 6);
    gridCharacter.setTilePosition(newTilePos);
    newTilePos.x = 20;

    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000 + expectedPos.y);
    expect(gridCharacter.getTilePos()).toEqual(expectedPos);
  });

  it("should block one tile if not moving", () => {
    const newTilePos = new Vector2(5, 6);
    gridCharacter.setTilePosition(newTilePos);
    expect(gridCharacter.isBlockingTile(newTilePos)).toBe(true);
  });

  it("should block two tiles if moving", () => {
    const tilePos = new Vector2(5, 6);
    gridCharacter.setTilePosition(tilePos);

    gridCharacter.move(Direction.UP);
    expect(gridCharacter.isBlockingTile(tilePos)).toBe(true);
    expect(gridCharacter.isBlockingTile(new Vector2(5, 5))).toBe(true);
    gridCharacter.update(300);
    gridCharacter.update(50);
    expect(gridCharacter.isBlockingTile(tilePos)).toBe(false);
    expect(gridCharacter.isBlockingTile(new Vector2(5, 5))).toBe(true);
  });

  it("should start movement", async (done) => {
    mockNonBlockingTile();
    expect(gridCharacter.getTilePos()).toEqual(new Vector2(0, 0));
    const movementStartedProm = gridCharacter
      .movementStarted()
      .pipe(take(1))
      .toPromise();

    gridCharacter.positionChanged().subscribe(({ exitTile, enterTile }) => {
      expect(exitTile).toEqual(new Vector2(0, 0));
      expect(enterTile).toEqual(new Vector2(0, -1));
      done();
    });

    gridCharacter.move(Direction.UP);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getTilePos()).toEqual(new Vector2(0, 0));
    const dir = await movementStartedProm;
    expect(dir).toEqual(Direction.UP);

    gridCharacter.move(Direction.DOWN);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getTilePos()).toEqual(new Vector2(0, 0));
  });

  it("should not update if not moving", () => {
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);

    gridCharacter.update(300);
    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);
  });

  it("should update vertically", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS - 12);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000 - 1);
  });

  it("should update horizontally", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS + 12);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.RIGHT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.RIGHT);
    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000);
  });

  it("should update diagonally", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.DOWN_LEFT);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS - 12);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS + 12);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN_LEFT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN_LEFT);
    expect(spriteMock.setDepth).toHaveBeenCalledWith(1000 + 1);
  });

  it("should set walkingAnimationMapping", () => {
    const walkingAnimationMappingMock = <any>{};
    gridCharacter.setWalkingAnimationMapping(walkingAnimationMappingMock);

    expect(
      mockCharacterAnimation.setWalkingAnimationMapping
    ).toHaveBeenCalledWith(walkingAnimationMappingMock);
  });

  it("should update only till tile border", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS - 16);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
  });

  it("should set tile position", () => {
    const customOffsetX = 10;
    const customOffsetY = 15;
    gridCharacter = new GridCharacter("player", {
      sprite: spriteMock,
      tilemap: gridTilemapMock,
      tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
      speed: 3,
      walkingAnimationEnabled: true,
      offsetX: customOffsetX,
      offsetY: customOffsetY,
    });
    gridCharacter.setTilePosition(new Vector2(3, 4));

    expect(spriteMock.x).toEqual(
      3 * TILE_WIDTH + PLAYER_X_OFFSET + customOffsetX
    );
    expect(spriteMock.y).toEqual(
      4 * TILE_HEIGHT + PLAYER_Y_OFFSET + customOffsetY
    );
  });

  it("should set tile position with custom offset", async () => {
    const movementStoppedObs = gridCharacter.movementStopped();
    jest.spyOn(movementStoppedObs, "next");
    const positionChangeStartedProm = gridCharacter
      .positionChanged()
      .pipe(take(1))
      .toPromise();
    const positionChangeFinishedProm = gridCharacter
      .positionChangeFinished()
      .pipe(take(1))
      .toPromise();

    gridCharacter.setTilePosition(new Vector2(3, 4));

    expect(movementStoppedObs.next).not.toHaveBeenCalled();
    const posChangeStarted = await positionChangeStartedProm;
    const posChangeFinished = await positionChangeFinishedProm;

    expect(posChangeStarted).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: new Vector2(3, 4),
    });

    expect(posChangeFinished).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: new Vector2(3, 4),
    });

    expect(spriteMock.x).toEqual(3 * TILE_WIDTH + PLAYER_X_OFFSET);
    expect(spriteMock.y).toEqual(4 * TILE_HEIGHT + PLAYER_Y_OFFSET);
  });

  it("should stop moving on set tile pos", async () => {
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);

    const movementStoppedProm = gridCharacter
      .movementStopped()
      .pipe(take(1))
      .toPromise();
    const positionChangeStartedProm = gridCharacter
      .positionChanged()
      .pipe(take(1))
      .toPromise();
    const positionChangeFinishedProm = gridCharacter
      .positionChangeFinished()
      .pipe(take(1))
      .toPromise();

    gridCharacter.setTilePosition(new Vector2(3, 4));

    const dir = await movementStoppedProm;
    const posChangeStarted = await positionChangeStartedProm;
    const posChangeFinished = await positionChangeFinishedProm;
    expect(posChangeStarted).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: new Vector2(3, 4),
    });

    expect(posChangeFinished).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: new Vector2(3, 4),
    });
    expect(dir).toEqual(Direction.DOWN);

    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    expect(gridCharacter.getTilePos()).toEqual(new Vector2(3, 4));
  });

  it("should stop moving if no movementImpuls", async () => {
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(1);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN);
    const movementStoppedProm = gridCharacter
      .movementStopped()
      .pipe(take(1))
      .toPromise();
    gridCharacter.update(500);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    const dir = await movementStoppedProm;
    expect(dir).toEqual(Direction.DOWN);
  });

  it("should call positionChangeFinished when movement stopped", (done) => {
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(1);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN);

    gridCharacter
      .positionChangeFinished()
      .subscribe(({ exitTile, enterTile }) => {
        expect(exitTile).toEqual(new Vector2(0, 0));
        expect(enterTile).toEqual(new Vector2(0, 1));
        done();
      });

    gridCharacter.update(500);
  });

  it("should not stop moving if movementImpuls", () => {
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(500);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN);
  });

  it("should continue moving", (done) => {
    mockNonBlockingTile();

    gridCharacter
      .positionChangeFinished()
      .subscribe(({ exitTile, enterTile }) => {
        expect(exitTile).toEqual(new Vector2(0, 0));
        expect(enterTile).toEqual(new Vector2(0, 1));
        done();
      });

    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(MS_FOR_12_PX);
    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS + 24);
    expect(gridCharacter.getTilePos()).toEqual(new Vector2(0, 1));
  });

  it("should stop moving if blocking", () => {
    mockBlockingTile();
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(1);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
  });

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

  it("should set movement", async () => {
    const movement: Movement = <any>{
      setCharacter: jest.fn(),
    };
    const autoMovementSet = gridCharacter
      .autoMovementSet()
      .pipe(take(1))
      .toPromise();
    gridCharacter.setMovement(movement);
    await autoMovementSet;
    expect(gridCharacter.getMovement()).toEqual(movement);
    expect(movement.setCharacter).toHaveBeenCalledWith(gridCharacter);
  });

  it("should set movement to undefined", () => {
    gridCharacter.setMovement(undefined);
    expect(gridCharacter.getMovement()).toEqual(undefined);
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
      const oppositeDirection = Direction.LEFT;
      gridTilemapMock.hasBlockingTile.mockReturnValue(false);
      gridTilemapMock.hasBlockingChar.mockReturnValue(false);

      gridCharacter.move(Direction.RIGHT);
      gridCharacter.update(10);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(gridTilemapMock.hasBlockingTile).toHaveBeenCalledWith(
        {
          x: 2,
          y: 0,
        },
        oppositeDirection
      );
      expect(gridTilemapMock.hasBlockingChar).toHaveBeenCalledWith({
        x: 2,
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
      mockCharacterAnimation.setStandingFrame.mockReset();
    });
    it("should turn towards left", () => {
      gridCharacter.turnTowards(Direction.LEFT);
      expect(mockCharacterAnimation.setStandingFrame).toHaveBeenCalledWith(
        Direction.LEFT
      );
      expect(gridCharacter.getFacingDirection()).toEqual(Direction.LEFT);
    });

    it("should not turn if moving", () => {
      gridCharacter.move(Direction.DOWN);
      mockCharacterAnimation.setStandingFrame.mockReset();
      gridCharacter.turnTowards(Direction.LEFT);
      expect(mockCharacterAnimation.setStandingFrame).not.toHaveBeenCalled();
    });

    it("should not turn if direction NONE", () => {
      gridCharacter.turnTowards(Direction.NONE);
      expect(mockCharacterAnimation.setStandingFrame).not.toHaveBeenCalled();
    });
  });

  describe("walking frames", () => {
    beforeEach(() => {
      mockNonBlockingTile();
    });

    it("should set the correct frame when walking", () => {
      gridCharacter.move(Direction.UP);
      gridCharacter.update(50); // move to 2 / 16 px
      gridCharacter.update(200); // move to 12 / 16 px

      expect(
        mockCharacterAnimation.updateCharacterFrame
      ).toHaveBeenNthCalledWith(1, Direction.UP, false);
      expect(
        mockCharacterAnimation.updateCharacterFrame
      ).toHaveBeenNthCalledWith(2, Direction.UP, true);
    });

    it("should set players standing frame if direction blocked", (done) => {
      mockBlockingTile();
      expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
      gridCharacter.directionChanged().subscribe((direction) => {
        expect(direction).toEqual(Direction.UP);
        done();
      });

      gridCharacter.move(Direction.UP);
      expect(mockCharacterAnimation.setStandingFrame).toHaveBeenCalledWith(
        Direction.UP
      );
      expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    });
  });

  describe("container", () => {
    let containerMock: Phaser.GameObjects.Container;
    beforeEach(() => {
      containerMock = <any>{
        x: 5 * TILE_WIDTH,
        y: 6 * TILE_HEIGHT,
        setDepth: jest.fn(),
      };
      gridCharacter = new GridCharacter("player", {
        sprite: spriteMock,
        tilemap: gridTilemapMock,
        tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
        speed: 3,
        walkingAnimationMapping: 3,
        walkingAnimationEnabled: true,
        container: containerMock,
      });
    });

    it("should update", () => {
      mockNonBlockingTile();
      const pixelsMovedThisUpdate = 12;
      (<any>spriteMock.setDepth).mockReset();

      gridCharacter.move(Direction.UP);
      gridCharacter.update(MS_FOR_12_PX);

      expect(spriteMock.setDepth).not.toHaveBeenCalled();
      expect(containerMock.setDepth).toHaveBeenCalledWith(1000 - 1);
      expect(containerMock.x).toEqual(5 * TILE_WIDTH);
      expect(containerMock.y).toEqual(6 * TILE_HEIGHT - pixelsMovedThisUpdate);
      expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    });

    it("should set tile position", () => {
      gridCharacter.setTilePosition(new Vector2(3, 4));

      expect(containerMock.x).toEqual(3 * TILE_WIDTH + PLAYER_X_OFFSET);
      expect(containerMock.y).toEqual(4 * TILE_HEIGHT + PLAYER_Y_OFFSET);
      expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
      expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);
    });
  });
});
