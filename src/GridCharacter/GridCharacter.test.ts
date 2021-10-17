import { GridCharacter } from "./GridCharacter";
import { Direction } from "../Direction/Direction";
import { take } from "rxjs/operators";
import { CharacterAnimation } from "./CharacterAnimation/CharacterAnimation";
import { Movement } from "../Movement/Movement";
import { Vector2 } from "../Utils/Vector2/Vector2";
import * as Phaser from "phaser";

const mockCharacterAnimation = {
  updateCharacterFrame: jest.fn(),
  setStandingFrame: jest.fn(),
  setIsEnabled: jest.fn(),
  setWalkingAnimationMapping: jest.fn(),
  setCharacterIndex: jest.fn(),
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
  const DEPTH_OF_CHAR_LAYER = 10;

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
      getDepthOfCharLayer: jest.fn().mockReturnValue(DEPTH_OF_CHAR_LAYER),
      getTransition: jest.fn(),
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
      collides: true,
      walkingAnimationMapping: 3,
    });
  });

  it("should get init data", () => {
    gridCharacter = new GridCharacter("player", {
      sprite: spriteMock,
      tilemap: gridTilemapMock,
      tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
      speed: 3,
      collides: true,
      charLayer: "someLayer",
    });
    expect(gridCharacter.getId()).toEqual("player");
    expect(gridCharacter.getSpeed()).toEqual(3);
    expect(gridCharacter.getTilePos().layer).toEqual("someLayer");
  });

  it("should get collision data", () => {
    gridCharacter = new GridCharacter("player", {
      sprite: spriteMock,
      tilemap: gridTilemapMock,
      tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
      speed: 3,
      collides: true,
    });
    expect(gridCharacter.isColliding()).toEqual(true);

    gridCharacter = new GridCharacter("player", {
      sprite: spriteMock,
      tilemap: gridTilemapMock,
      tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
      speed: 3,
      collides: false,
    });
    expect(gridCharacter.isColliding()).toEqual(false);
  });

  it("should set the correct depth on construction", () => {
    expect(spriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + parseFloat("0.00000" + spriteMock.y)
    );
  });

  it("should be facing down on construction by default", () => {
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
  });

  it("should get tile pos", () => {
    const expectedPos = { position: new Vector2(5, 6), layer: "someLayer" };
    const newTilePos = new Vector2(5, 6);
    gridCharacter.setTilePosition({ position: newTilePos, layer: "someLayer" });
    newTilePos.x = 20;

    expect(spriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER +
        parseFloat(
          "0.00000" + (expectedPos.position.y * TILE_HEIGHT + PLAYER_Y_OFFSET)
        )
    );
    expect(gridCharacter.getTilePos()).toEqual(expectedPos);
  });

  it("should set and get sprite", () => {
    const sprite = <any>{
      setDepth: jest.fn(),
      getRawSprite: jest.fn().mockReturnValue("rawSprite"),
    };
    gridCharacter.setSprite(sprite);

    expect(gridCharacter.getSprite()).toBe(sprite);
    expect(gridCharacter.getSprite().x).toEqual(80);
    expect(gridCharacter.getSprite().y).toEqual(92);
    expect(CharacterAnimation).toHaveBeenCalledWith("rawSprite", undefined, 3);
    expect(mockCharacterAnimation.setIsEnabled).toHaveBeenCalledWith(true);
    expect(mockCharacterAnimation.setStandingFrame).toHaveBeenCalledWith(
      Direction.DOWN
    );
    expect(sprite.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + parseFloat("0.0000092")
    );
  });

  it("should start movement", async () => {
    mockNonBlockingTile();
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 0),
      layer: undefined,
    });
    const movementStartedProm = gridCharacter
      .movementStarted()
      .pipe(take(1))
      .toPromise();

    const posChangedProm = gridCharacter
      .positionChangeStarted()
      .pipe(take(1))
      .toPromise();

    gridCharacter.move(Direction.UP);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 0),
      layer: undefined,
    });
    expect(gridCharacter.getNextTilePos()).toEqual({
      position: new Vector2(0, -1),
      layer: undefined,
    });
    const dir = await movementStartedProm;
    expect(dir).toEqual(Direction.UP);

    gridCharacter.move(Direction.DOWN);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 0),
      layer: undefined,
    });
    expect(gridCharacter.getNextTilePos()).toEqual({
      position: new Vector2(0, -1),
      layer: undefined,
    });
    const { exitTile, enterTile } = await posChangedProm;
    expect(exitTile).toEqual(new Vector2(0, 0));
    expect(enterTile).toEqual(new Vector2(0, -1));
  });

  it("should not update if not moving", () => {
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);

    gridCharacter.update(300);
    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);
  });

  it("should not move if no direction", () => {
    mockNonBlockingTile();
    gridCharacter.move(Direction.NONE);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
  });

  it("should update speed", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX / 2);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS - 6);

    gridCharacter.setSpeed(1.5);
    gridCharacter.update(MS_FOR_12_PX / 2);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS - 9);
  });

  it("should update depth with nextTilePos when staying on char layer", () => {
    mockNonBlockingTile();
    gridTilemapMock.getDepthOfCharLayer.mockImplementation((layer) => {
      if (layer === "charLayer2") {
        return DEPTH_OF_CHAR_LAYER + 1;
      }
      return DEPTH_OF_CHAR_LAYER;
    });

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + parseFloat("0.00000" + (INITIAL_SPRITE_Y_POS - 12))
    );
  });

  it("should update depth with nextTilePos when lowering char layer", () => {
    mockNonBlockingTile();
    const nextTilePos = new Vector2(0, -1);
    gridTilemapMock.getTransition.mockImplementation((pos) => {
      if (pos.x == nextTilePos.x && pos.y == nextTilePos.y) {
        return "charLayer2";
      }
    });
    gridTilemapMock.getDepthOfCharLayer.mockImplementation((layer) => {
      if (layer === "charLayer2") {
        return DEPTH_OF_CHAR_LAYER - 1;
      }
      return DEPTH_OF_CHAR_LAYER;
    });

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER -
        1 +
        parseFloat("0.00000" + (INITIAL_SPRITE_Y_POS - 12))
    );
  });

  it("should update depth with tilePos when entering higher char layer", () => {
    mockNonBlockingTile();
    const nextTilePos = new Vector2(0, -1);
    gridTilemapMock.getTransition.mockImplementation((pos) => {
      if (pos.x == nextTilePos.x && pos.y == nextTilePos.y) {
        return "charLayer2";
      }
    });
    gridTilemapMock.getDepthOfCharLayer.mockImplementation((layer) => {
      if (layer === "charLayer2") {
        return DEPTH_OF_CHAR_LAYER + 1;
      }
      return DEPTH_OF_CHAR_LAYER;
    });

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + parseFloat("0.00000" + (INITIAL_SPRITE_Y_POS - 12))
    );
  });

  it("should update vertically", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS - 12);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
    expect(spriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + parseFloat("0.00000" + (INITIAL_SPRITE_Y_POS - 12))
    );
  });

  it("should update horizontally", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS + 12);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.RIGHT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.RIGHT);
    expect(spriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + parseFloat("0.00000" + INITIAL_SPRITE_Y_POS)
    );
  });

  it("should update diagonally", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.DOWN_LEFT);
    gridCharacter.update(MS_FOR_12_PX);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS - 12);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS + 12);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN_LEFT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN_LEFT);
    expect(spriteMock.setDepth).toHaveBeenCalledWith(
      DEPTH_OF_CHAR_LAYER + parseFloat("0.0000" + (INITIAL_SPRITE_Y_POS + 12))
    );
  });

  it("should set walkingAnimationMapping", () => {
    const walkingAnimationMappingMock = <any>{};
    gridCharacter.setWalkingAnimationMapping(walkingAnimationMappingMock);

    expect(
      mockCharacterAnimation.setWalkingAnimationMapping
    ).toHaveBeenCalledWith(walkingAnimationMappingMock);
  });

  it("should set characterIndex", () => {
    gridCharacter.setWalkingAnimationMapping(3);

    expect(mockCharacterAnimation.setCharacterIndex).toHaveBeenCalledWith(3);
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
      offsetX: customOffsetX,
      offsetY: customOffsetY,
      collides: true,
    });
    gridCharacter.setTilePosition({
      position: new Vector2(3, 4),
      layer: "someLayer",
    });

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
      .positionChangeStarted()
      .pipe(take(1))
      .toPromise();
    const positionChangeFinishedProm = gridCharacter
      .positionChangeFinished()
      .pipe(take(1))
      .toPromise();

    gridCharacter.setTilePosition({
      position: new Vector2(3, 4),
      layer: "someLayer",
    });

    expect(movementStoppedObs.next).not.toHaveBeenCalled();
    const posChangeStarted = await positionChangeStartedProm;
    const posChangeFinished = await positionChangeFinishedProm;

    expect(posChangeStarted).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: new Vector2(3, 4),
      exitLayer: undefined,
      enterLayer: "someLayer",
    });

    expect(posChangeFinished).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: new Vector2(3, 4),
      exitLayer: undefined,
      enterLayer: "someLayer",
    });

    expect(spriteMock.x).toEqual(3 * TILE_WIDTH + PLAYER_X_OFFSET);
    expect(spriteMock.y).toEqual(4 * TILE_HEIGHT + PLAYER_Y_OFFSET);
  });

  it("should stop ongoing movement when stopping on positionChangeFinish", async () => {
    mockNonBlockingTile();
    const posChangeFinishedCb = jest.fn();
    const posChangeStartedCb = jest.fn();

    gridCharacter.positionChangeFinished().subscribe((posChanged) => {
      posChangeFinishedCb(posChanged);
      if (posChanged.enterTile.x == 0 && posChanged.enterTile.y == 1) {
        gridCharacter.setTilePosition({
          position: new Vector2(3, 4),
          layer: "someLayer",
        });
      }
    });
    gridCharacter.positionChangeStarted().subscribe((posChanged) => {
      posChangeStartedCb(posChanged);
    });
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(400);
    gridCharacter.update(400);

    expect(posChangeStartedCb).toHaveBeenCalledTimes(2);
    expect(posChangeFinishedCb).toHaveBeenCalledTimes(2);
  });

  it("should stop moving on set tile pos", async () => {
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);

    const movementStoppedProm = gridCharacter
      .movementStopped()
      .pipe(take(1))
      .toPromise();
    const positionChangeStartedProm = gridCharacter
      .positionChangeStarted()
      .pipe(take(1))
      .toPromise();
    const positionChangeFinishedProm = gridCharacter
      .positionChangeFinished()
      .pipe(take(1))
      .toPromise();
    const tilePosSetProm = gridCharacter
      .tilePositionSet()
      .pipe(take(1))
      .toPromise();

    gridCharacter.setTilePosition({
      position: new Vector2(3, 4),
      layer: "someLayer",
    });

    const dir = await movementStoppedProm;
    const posChangeStarted = await positionChangeStartedProm;
    const posChangeFinished = await positionChangeFinishedProm;
    const tilePosSet = await tilePosSetProm;
    expect(posChangeStarted).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: new Vector2(3, 4),
      enterLayer: "someLayer",
      exitLayer: undefined,
    });

    expect(posChangeFinished).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: new Vector2(3, 4),
      enterLayer: "someLayer",
      exitLayer: undefined,
    });
    expect(dir).toEqual(Direction.DOWN);
    expect(tilePosSet).toEqual({
      position: { x: 3, y: 4 },
      layer: "someLayer",
    });

    expect(gridCharacter.isMoving()).toEqual(false);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(3, 4),
      layer: "someLayer",
    });
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
    const dir = await movementStoppedProm;
    expect(gridCharacter.getTilePos()).toEqual({
      position: { x: 0, y: 1 },
      layer: undefined,
    });
    expect(dir).toEqual(Direction.DOWN);
  });

  it("should observe position and movement update in movementStopped", (done) => {
    mockNonBlockingTile();
    gridCharacter
      .movementStopped()
      .pipe(take(1))
      .subscribe(() => {
        expect(gridCharacter.getTilePos()).toEqual({
          position: { x: 0, y: 1 },
          layer: undefined,
        });
        expect(gridCharacter.isMoving()).toEqual(false);
        done();
      });
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(1);
    gridCharacter.update(500);
  });

  it("should call positionChangeFinished when movement stopped", (done) => {
    mockNonBlockingTile();
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(1);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN);

    gridCharacter
      .positionChangeFinished()
      .subscribe(({ exitTile, enterTile }) => {
        expect(gridCharacter.isMoving()).toEqual(false);
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

  it("should continue moving to different dir", async () => {
    mockNonBlockingTile();

    const prom = gridCharacter
      .positionChangeFinished()
      .pipe(take(1))
      .toPromise();

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(MS_FOR_12_PX);

    const { exitTile, enterTile } = await prom;
    expect(exitTile).toEqual(new Vector2(0, 0));
    expect(enterTile).toEqual(new Vector2(1, 0));
    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS + 16);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS + 8);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(1, 0),
      layer: undefined,
    });
  });

  it("should not trigger movementStarted on continuing", (done) => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);

    gridCharacter
      .movementStarted()
      .pipe(take(1))
      .subscribe(() => {
        done(new Error("Should not call movementStarted"));
      });

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);
    done();
  });

  it("should continue moving to different dir", (done) => {
    mockNonBlockingTile();

    gridCharacter
      .positionChangeFinished()
      .subscribe(({ exitTile, enterTile }) => {
        expect(exitTile).toEqual(new Vector2(0, 0));
        expect(enterTile).toEqual(new Vector2(1, 0));
        done();
      });

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(MS_FOR_12_PX);
    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS + 16);
    expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS + 8);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(1, 0),
      layer: undefined,
    });
  });

  it("should continue moving on tile border edge case vertically", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(83.33333333333333333333333333333333333333);
    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS + 0);
    expect(Math.round(spriteMock.y)).toEqual(INITIAL_SPRITE_Y_POS + 16);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 1),
      layer: undefined,
    });
  });

  it("should stop moving on tile border edge case", () => {
    mockNonBlockingTile();

    gridTilemapMock.getTransition.mockReturnValue("transitionLayer");
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.update(83.33333333333333333333333333333333333333);

    expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS + 0);
    expect(Math.round(spriteMock.y)).toEqual(INITIAL_SPRITE_Y_POS + 16);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 1),
      layer: "transitionLayer",
    });
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
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
      update: jest.fn(),
    };
    const autoMovementSet = gridCharacter
      .autoMovementSet()
      .pipe(take(1))
      .toPromise();
    gridCharacter.setMovement(movement);
    await autoMovementSet;
    gridCharacter.update(100);
    expect(movement.update).toHaveBeenCalledWith(100);
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

      gridTilemapMock.getTransition.mockReturnValue("layerInDir");

      const result = gridCharacter.isBlockingDirection(direction);
      expect(gridTilemapMock.getTransition).toHaveBeenCalledWith(
        { x: 1, y: 0 },
        undefined
      );
      expect(gridTilemapMock.hasBlockingTile).toHaveBeenCalledWith(
        "layerInDir",
        {
          x: 2,
          y: 0,
        },
        oppositeDirection
      );
      expect(gridTilemapMock.hasBlockingChar).toHaveBeenCalledWith(
        {
          x: 2,
          y: 0,
        },
        "layerInDir"
      );
      expect(result).toBe(false);
    });

    it("should detect blocking direction if map blocks", () => {
      const direction = Direction.RIGHT;
      gridTilemapMock.hasBlockingTile.mockReturnValue(true);
      gridTilemapMock.hasBlockingChar.mockReturnValue(false);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(result).toBe(true);
    });

    it("should not detect blocking direction if char does not collide", () => {
      gridCharacter = new GridCharacter("player", {
        sprite: spriteMock,
        tilemap: gridTilemapMock,
        tileSize: new Vector2(TILE_WIDTH, TILE_HEIGHT),
        speed: 3,
        collides: false,
        walkingAnimationMapping: 3,
      });
      const direction = Direction.RIGHT;
      gridTilemapMock.hasBlockingTile.mockReturnValue(true);
      gridTilemapMock.hasBlockingChar.mockReturnValue(false);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(result).toBe(false);
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

  describe("getFacingPosition", () => {
    beforeEach(() => {
      gridCharacter.setTilePosition({
        position: new Vector2(2, 3),
        layer: "someLayer",
      });
    });

    it("should return left neighbor pos", () => {
      gridCharacter.turnTowards(Direction.LEFT);
      expect(gridCharacter.getFacingPosition()).toEqual(new Vector2(1, 3));
    });

    it("should return right neighbor pos", () => {
      gridCharacter.turnTowards(Direction.RIGHT);
      expect(gridCharacter.getFacingPosition()).toEqual(new Vector2(3, 3));
    });

    it("should return down neighbor pos", () => {
      gridCharacter.turnTowards(Direction.DOWN);
      expect(gridCharacter.getFacingPosition()).toEqual(new Vector2(2, 4));
    });

    it("should return up neighbor pos", () => {
      gridCharacter.turnTowards(Direction.UP);
      expect(gridCharacter.getFacingPosition()).toEqual(new Vector2(2, 2));
    });

    it("should return up-left neighbor pos", () => {
      gridCharacter.turnTowards(Direction.UP_LEFT);
      expect(gridCharacter.getFacingPosition()).toEqual(new Vector2(1, 2));
    });

    it("should return up-right neighbor pos", () => {
      gridCharacter.turnTowards(Direction.UP_RIGHT);
      expect(gridCharacter.getFacingPosition()).toEqual(new Vector2(3, 2));
    });

    it("should return down-right neighbor pos", () => {
      gridCharacter.turnTowards(Direction.DOWN_RIGHT);
      expect(gridCharacter.getFacingPosition()).toEqual(new Vector2(3, 4));
    });

    it("should return down-left neighbor pos", () => {
      gridCharacter.turnTowards(Direction.DOWN_LEFT);
      expect(gridCharacter.getFacingPosition()).toEqual(new Vector2(1, 4));
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
        container: containerMock,
        collides: true,
      });
    });

    it("should update", () => {
      mockNonBlockingTile();
      const pixelsMovedThisUpdate = 12;
      (<any>spriteMock.setDepth).mockReset();

      gridCharacter.move(Direction.UP);
      gridCharacter.update(MS_FOR_12_PX);

      expect(spriteMock.setDepth).not.toHaveBeenCalled();
      expect(containerMock.setDepth).toHaveBeenCalledWith(
        DEPTH_OF_CHAR_LAYER +
          parseFloat("0.00000" + (6 * TILE_HEIGHT - pixelsMovedThisUpdate))
      );
      expect(containerMock.x).toEqual(5 * TILE_WIDTH);
      expect(containerMock.y).toEqual(6 * TILE_HEIGHT - pixelsMovedThisUpdate);
      expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    });

    it("should set tile position", () => {
      gridCharacter.setTilePosition({
        position: new Vector2(3, 4),
        layer: "someLayer",
      });

      expect(containerMock.x).toEqual(3 * TILE_WIDTH + PLAYER_X_OFFSET);
      expect(containerMock.y).toEqual(4 * TILE_HEIGHT + PLAYER_Y_OFFSET);
      expect(spriteMock.x).toEqual(INITIAL_SPRITE_X_POS);
      expect(spriteMock.y).toEqual(INITIAL_SPRITE_Y_POS);
    });
  });
});
