import { SpriteUtils } from "./../Utils/SpriteUtils/SpriteUtils";
import { GridCharacter } from "./GridCharacter";
import { Direction } from "../Direction/Direction";
import { take } from "rxjs/operators";
import { Movement } from "../Movement/Movement";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { of } from "rxjs";

const mockCharacterAnimation = {
  updateCharacterFrame: jest.fn(),
  setStandingFrame: jest.fn(),
  setIsEnabled: jest.fn(),
  setWalkingAnimationMapping: jest.fn(),
  setCharacterIndex: jest.fn(),
  setSprite: jest.fn(),
  frameChange: jest.fn().mockReturnValue(of()),
};

SpriteUtils.copyOverImportantProperties = jest.fn();

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
  let gridTilemapMock;

  const TILE_WIDTH = 16;
  const TILE_HEIGHT = 16;
  const MS_FOR_12_PX = 250;
  const INITIAL_SPRITE_X_POS = 0;
  const INITIAL_SPRITE_Y_POS = 0;
  const DEPTH_OF_CHAR_LAYER = 10;

  function mockNonBlockingTile() {
    gridTilemapMock.isBlocking.mockReturnValue(false);
    gridTilemapMock.hasBlockingTile.mockReturnValue(false);
  }

  function mockBlockingTile() {
    gridTilemapMock.isBlocking.mockReturnValue(true);
    gridTilemapMock.hasBlockingTile.mockReturnValue(true);
  }

  afterEach(() => {
    mockCharacterAnimation.updateCharacterFrame.mockReset();
    mockCharacterAnimation.setStandingFrame.mockReset();
  });

  beforeEach(() => {
    gridTilemapMock = {
      isBlocking: jest.fn(),
      hasNoTile: jest.fn(),
      hasBlockingTile: jest.fn(),
      hasBlockingChar: jest.fn(),
      getDepthOfCharLayer: jest.fn().mockReturnValue(DEPTH_OF_CHAR_LAYER),
      getTransition: jest.fn(),
      getTileWidth: jest.fn().mockReturnValue(TILE_WIDTH),
      getTileHeight: jest.fn().mockReturnValue(TILE_HEIGHT),
      getTileSize: jest
        .fn()
        .mockReturnValue(new Vector2(TILE_WIDTH, TILE_HEIGHT)),
      tilePosToPixelPos: jest.fn().mockReturnValue(new Vector2(0, 0)),
      getTileDistance: jest
        .fn()
        .mockReturnValue(new Vector2(TILE_WIDTH, TILE_HEIGHT)),
      toMapDirection: jest.fn().mockReturnValue(Direction.DOWN),
    };
    gridCharacter = new GridCharacter("player", {
      tilemap: gridTilemapMock,
      speed: 3,
      collidesWithTiles: true,
      walkingAnimationMapping: 3,
    });
    // TODO: replace animation mock and only mock Phaser sprite
    gridCharacter.setAnimation(mockCharacterAnimation as any);
  });

  it("should get init data", () => {
    gridCharacter = new GridCharacter("player", {
      tilemap: gridTilemapMock,
      speed: 3,
      collidesWithTiles: true,
      charLayer: "someLayer",
      facingDirection: Direction.RIGHT,
    });
    expect(gridCharacter.getId()).toEqual("player");
    expect(gridCharacter.getSpeed()).toEqual(3);
    expect(gridCharacter.getTilePos().layer).toEqual("someLayer");
    expect(gridCharacter.collidesWithTiles()).toEqual(true);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.RIGHT);
  });

  it("should be facing down on construction by default", () => {
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
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

    gridTilemapMock.toMapDirection.mockReturnValue(Direction.UP);

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

    const posChanged = await posChangedProm;
    expect(posChanged?.exitTile).toEqual(new Vector2(0, 0));
    expect(posChanged?.enterTile).toEqual(new Vector2(0, -1));
  });

  it("should not update if not moving", () => {
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    expect(gridCharacter.getPixelPos().x).toEqual(0);
    expect(gridCharacter.getPixelPos().y).toEqual(0);

    gridCharacter.update(300);
    expect(gridCharacter.getPixelPos().x).toEqual(0);
    expect(gridCharacter.getPixelPos().y).toEqual(0);
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

    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS);
    expect(gridCharacter.getPixelPos().y).toEqual(INITIAL_SPRITE_Y_POS - 6);

    gridCharacter.setSpeed(1.5);
    gridCharacter.update(MS_FOR_12_PX / 2);
    expect(gridCharacter.getPixelPos().y).toEqual(INITIAL_SPRITE_Y_POS - 9);
  });

  it("should update vertically", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX);

    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS);
    expect(gridCharacter.getPixelPos().y).toEqual(INITIAL_SPRITE_Y_POS - 12);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.UP);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
  });

  it("should update horizontally", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);

    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS + 12);
    expect(gridCharacter.getPixelPos().y).toEqual(INITIAL_SPRITE_Y_POS);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.RIGHT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.RIGHT);
  });

  it("should update diagonally", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.DOWN_LEFT);
    gridCharacter.update(MS_FOR_12_PX);

    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS - 12);
    expect(gridCharacter.getPixelPos().y).toEqual(INITIAL_SPRITE_Y_POS + 12);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN_LEFT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN_LEFT);
  });

  it("should update only till tile border", () => {
    mockNonBlockingTile();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.update(MS_FOR_12_PX);
    gridCharacter.update(MS_FOR_12_PX);

    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS);
    expect(gridCharacter.getPixelPos().y).toEqual(INITIAL_SPRITE_Y_POS - 16);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
  });

  it("should set tile position", () => {
    const customOffsetX = 10;
    const customOffsetY = 15;
    const newTilePos = new Vector2(3, 4);
    const expectedTilePos = { position: new Vector2(3, 4), layer: "someLayer" };
    const newPixelPos = new Vector2(10, 20);
    gridTilemapMock.tilePosToPixelPos.mockReturnValue(newPixelPos);
    gridCharacter = new GridCharacter("player", {
      tilemap: gridTilemapMock,
      speed: 3,
      offsetX: customOffsetX,
      offsetY: customOffsetY,
      collidesWithTiles: true,
    });
    gridCharacter.setTilePosition({
      position: newTilePos,
      layer: "someLayer",
    });

    // mutate original object
    newTilePos.x = 20;

    expect(gridCharacter.getPixelPos().x).toEqual(
      newPixelPos.x + customOffsetX
    );
    expect(gridCharacter.getPixelPos().y).toEqual(
      newPixelPos.y + customOffsetY
    );
    expect(gridCharacter.getTilePos()).toEqual(expectedTilePos);
  });

  it("should set tile position with custom offset", async () => {
    const movementStoppedObs = gridCharacter.movementStopped();
    const newTilePos = new Vector2(3, 4);
    const newPixelPos = new Vector2(10, 20);
    jest.spyOn(movementStoppedObs, "next");
    const positionChangeStartedProm = gridCharacter
      .positionChangeStarted()
      .pipe(take(1))
      .toPromise();
    const positionChangeFinishedProm = gridCharacter
      .positionChangeFinished()
      .pipe(take(1))
      .toPromise();
    gridTilemapMock.tilePosToPixelPos.mockReturnValue(newPixelPos);

    gridCharacter.setTilePosition({
      position: newTilePos,
      layer: "someLayer",
    });

    expect(movementStoppedObs.next).not.toHaveBeenCalled();
    const posChangeStarted = await positionChangeStartedProm;
    const posChangeFinished = await positionChangeFinishedProm;

    expect(posChangeStarted).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: newTilePos,
      exitLayer: undefined,
      enterLayer: "someLayer",
    });

    expect(posChangeFinished).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: newTilePos,
      exitLayer: undefined,
      enterLayer: "someLayer",
    });

    expect(gridCharacter.getPixelPos().x).toEqual(newPixelPos.x);
    expect(gridCharacter.getPixelPos().y).toEqual(newPixelPos.y);
  });

  it("should stop ongoing movement when stopping on positionChangeFinish", () => {
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
    const newTilePos = new Vector2(3, 4);
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
      position: newTilePos,
      layer: "someLayer",
    });

    const dir = await movementStoppedProm;
    const posChangeStarted = await positionChangeStartedProm;
    const posChangeFinished = await positionChangeFinishedProm;
    const tilePosSet = await tilePosSetProm;
    expect(posChangeStarted).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: newTilePos,
      enterLayer: "someLayer",
      exitLayer: undefined,
    });

    expect(posChangeFinished).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: newTilePos,
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
      position: newTilePos,
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

    gridTilemapMock.toMapDirection.mockReturnValue(Direction.RIGHT);
    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);
    gridTilemapMock.toMapDirection.mockReturnValue(Direction.DOWN);
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(MS_FOR_12_PX);

    const posChange = await prom;
    expect(posChange?.exitTile).toEqual(new Vector2(0, 0));
    expect(posChange?.enterTile).toEqual(new Vector2(1, 0));
    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS + 16);
    expect(gridCharacter.getPixelPos().y).toEqual(INITIAL_SPRITE_Y_POS + 8);
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

    gridTilemapMock.toMapDirection.mockReturnValue(Direction.RIGHT);
    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(MS_FOR_12_PX);
    gridTilemapMock.toMapDirection.mockReturnValue(Direction.DOWN);
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(MS_FOR_12_PX);
    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS + 16);
    expect(gridCharacter.getPixelPos().y).toEqual(INITIAL_SPRITE_Y_POS + 8);
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
    gridCharacter.update(83.33333333333333);
    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS + 0);
    expect(Math.round(gridCharacter.getPixelPos().y)).toEqual(
      INITIAL_SPRITE_Y_POS + 16
    );
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
    gridCharacter.update(83.33333333333333);

    expect(gridCharacter.getPixelPos().x).toEqual(INITIAL_SPRITE_X_POS + 0);
    expect(Math.round(gridCharacter.getPixelPos().y)).toEqual(
      INITIAL_SPRITE_Y_POS + 16
    );
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
    const oldMovement: Movement = <any>{
      setCharacter: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };
    gridCharacter.setMovement(oldMovement);
    const movement: Movement = <any>{
      setCharacter: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };
    const autoMovementSet = gridCharacter
      .autoMovementSet()
      .pipe(take(1))
      .toPromise();
    gridCharacter.setMovement(movement);
    const res = await autoMovementSet;
    gridCharacter.update(100);
    expect(movement.update).toHaveBeenCalledWith(100);
    expect(gridCharacter.getMovement()).toEqual(movement);
    expect(res).toBe(movement);
    expect(oldMovement.destroy).toHaveBeenCalled();
  });

  it("should set movement to undefined", () => {
    gridCharacter.setMovement(undefined);
    expect(gridCharacter.getMovement()).toEqual(undefined);
  });

  describe("isBlockingDirection", () => {
    it("direction NONE never blocks", () => {
      const direction = Direction.NONE;
      gridTilemapMock.isBlocking.mockReturnValue(true);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(result).toBe(false);
    });

    describe("collides with tiles", () => {
      const direction = Direction.RIGHT;
      beforeEach(() => {
        gridCharacter = new GridCharacter("player", {
          tilemap: gridTilemapMock,
          speed: 3,
          collidesWithTiles: true,
          collisionGroups: ["cGroup1"],
          walkingAnimationMapping: 3,
        });
      });
      it("should not block when no blocking tiles and chars", () => {
        gridTilemapMock.hasNoTile.mockReturnValue(false);
        gridTilemapMock.hasBlockingTile.mockReturnValue(false);
        gridTilemapMock.hasBlockingChar.mockReturnValue(false);

        expect(gridCharacter.isBlockingDirection(direction)).toBe(false);
        expect(gridTilemapMock.hasBlockingTile).toHaveBeenCalledWith(
          undefined,
          { x: 0, y: 1 },
          Direction.LEFT
        );
      });

      it("should block when blocking tiles", () => {
        gridTilemapMock.hasNoTile.mockReturnValue(false);
        gridTilemapMock.hasBlockingTile.mockReturnValue(true);
        gridTilemapMock.hasBlockingChar.mockReturnValue(false);

        expect(gridCharacter.isBlockingDirection(direction)).toBe(true);
      });

      it("should block when blocking chars", () => {
        gridTilemapMock.hasNoTile.mockReturnValue(false);
        gridTilemapMock.hasBlockingTile.mockReturnValue(false);
        gridTilemapMock.hasBlockingChar.mockReturnValue(true);

        expect(gridCharacter.isBlockingDirection(direction)).toBe(true);
      });
    });

    describe("does not collide with tiles", () => {
      const direction = Direction.RIGHT;
      beforeEach(() => {
        gridCharacter = new GridCharacter("player", {
          tilemap: gridTilemapMock,
          speed: 3,
          collidesWithTiles: false,
          collisionGroups: ["cGroup1"],
          walkingAnimationMapping: 3,
        });
      });

      it("should not block when blocking tiles", () => {
        gridTilemapMock.hasNoTile.mockReturnValue(false);
        gridTilemapMock.hasBlockingTile.mockReturnValue(true);
        gridTilemapMock.hasBlockingChar.mockReturnValue(false);

        expect(gridCharacter.isBlockingDirection(direction)).toBe(false);
      });

      it("should block when blocking chars", () => {
        gridTilemapMock.hasNoTile.mockReturnValue(false);
        gridTilemapMock.hasBlockingTile.mockReturnValue(false);
        gridTilemapMock.hasBlockingChar.mockReturnValue(true);

        expect(gridCharacter.isBlockingDirection(direction)).toBe(true);
      });
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

  describe("collision groups", () => {
    it("should set collision groups from config", () => {
      gridCharacter = new GridCharacter("player", {
        tilemap: gridTilemapMock,
        speed: 3,
        collidesWithTiles: true,
        collisionGroups: ["someGroup"],
      });
      expect(gridCharacter.getCollisionGroups()).toEqual(["someGroup"]);
    });

    it("should add collision groups", () => {
      gridCharacter.addCollisionGroup("collisionGroup1");
      gridCharacter.addCollisionGroup("collisionGroup2");

      expect(gridCharacter.getCollisionGroups()).toEqual([
        "collisionGroup1",
        "collisionGroup2",
      ]);
      expect(gridCharacter.hasCollisionGroup("collisionGroup1")).toBe(true);
      expect(gridCharacter.hasCollisionGroup("collisionGroup2")).toBe(true);
      expect(gridCharacter.hasCollisionGroup("unknownCollisionGroup")).toBe(
        false
      );
    });

    it("should remove a collision group", () => {
      gridCharacter.addCollisionGroup("collisionGroup1");
      gridCharacter.addCollisionGroup("collisionGroup2");

      expect(gridCharacter.getCollisionGroups()).toEqual([
        "collisionGroup1",
        "collisionGroup2",
      ]);
      gridCharacter.removeCollisionGroup("collisionGroup1");
      expect(gridCharacter.getCollisionGroups()).toEqual(["collisionGroup2"]);
    });

    it("should remove all collision groups", () => {
      gridCharacter.addCollisionGroup("collisionGroup1");
      gridCharacter.addCollisionGroup("collisionGroup2");

      expect(gridCharacter.getCollisionGroups()).toEqual([
        "collisionGroup1",
        "collisionGroup2",
      ]);
      gridCharacter.removeAllCollisionGroups();
      expect(gridCharacter.getCollisionGroups()).toEqual([]);
    });

    it("should set collision groups", () => {
      gridCharacter.setCollisionGroups(["collisionGroup1", "collisionGroup2"]);
      expect(gridCharacter.getCollisionGroups()).toEqual([
        "collisionGroup1",
        "collisionGroup2",
      ]);
      gridCharacter.setCollisionGroups(["collisionGroup3", "collisionGroup4"]);

      expect(gridCharacter.getCollisionGroups()).toEqual([
        "collisionGroup3",
        "collisionGroup4",
      ]);
    });
  });
});
