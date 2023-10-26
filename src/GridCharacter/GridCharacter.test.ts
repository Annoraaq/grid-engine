import { CharConfig, GridCharacter } from "./GridCharacter.js";
import { Direction, NumberOfDirections } from "../Direction/Direction.js";
import { take } from "rxjs/operators";
import { Movement } from "../Movement/Movement.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import { GridTilemap } from "../GridTilemap/GridTilemap.js";
import {
  mockBlockMap,
  mockLayeredBlockMap,
} from "../Utils/MockFactory/MockFactory.js";
import { CollisionStrategy } from "../GridEngine.js";

describe("GridCharacter", () => {
  let gridCharacter: GridCharacter;

  const QUARTER_SECOND = 250;

  function createDefaultTilemapMock(
    layer?: string,
    config: Partial<CharConfig> = {},
  ): { gridTilemap: GridTilemap; gridCharacter: GridCharacter } {
    const gridTilemap = new GridTilemap(
      mockBlockMap(
        [
          // prettier-ignore
          "....",
          "....",
          "....",
          "....",
        ],
        layer,
      ),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const gridCharacter = new GridCharacter("player", {
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      ...config,
      tilemap: gridTilemap,
    });
    gridTilemap.addCharacter(gridCharacter);
    return {
      gridCharacter,
      gridTilemap,
    };
  }

  it("should get init data", () => {
    const { gridCharacter } = createDefaultTilemapMock(undefined, {
      numberOfDirections: NumberOfDirections.EIGHT,
      charLayer: "someLayer",
      facingDirection: Direction.RIGHT,
      collisionGroups: ["test"],
      ignoreCollisionGroups: ["ignore"],
      labels: ["someLabel"],
      tileWidth: 2,
      tileHeight: 3,
    });
    expect(gridCharacter.getId()).toEqual("player");
    expect(gridCharacter.getSpeed()).toEqual(3);
    expect(gridCharacter.getTilePos().layer).toEqual("someLayer");
    expect(gridCharacter.collidesWithTiles()).toEqual(true);
    expect(gridCharacter.getIgnoreMissingTiles()).toBe(false);
    expect(gridCharacter.getNumberOfDirections()).toEqual(
      NumberOfDirections.EIGHT,
    );
    expect(gridCharacter.getCollisionGroups()).toEqual(["test"]);
    expect(gridCharacter.getIgnoreCollisionGroups()).toEqual(["ignore"]);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.RIGHT);
    expect(gridCharacter.getLabels()).toEqual(["someLabel"]);
    expect(gridCharacter.getTileWidth()).toEqual(2);
    expect(gridCharacter.getTileHeight()).toEqual(3);
  });

  it("should set default init data", () => {
    const { gridCharacter } = createDefaultTilemapMock(undefined, {
      numberOfDirections: NumberOfDirections.EIGHT,
    });
    expect(gridCharacter.getTilePos().layer).toEqual(undefined);
    expect(gridCharacter.getCollisionGroups()).toEqual([]);
    expect(gridCharacter.getIgnoreCollisionGroups()).toEqual([]);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
    expect(gridCharacter.getLabels()).toEqual([]);
    expect(gridCharacter.getTileWidth()).toEqual(1);
    expect(gridCharacter.getTileHeight()).toEqual(1);
  });

  it("should be facing down on construction by default", () => {
    const { gridCharacter } = createDefaultTilemapMock(undefined, {
      numberOfDirections: NumberOfDirections.EIGHT,
    });
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
  });

  it("should start movement", async () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 0),
      layer: "lowerCharLayer",
    });
    const movementStartedProm = gridCharacter
      .movementStarted()
      .pipe(take(1))
      .toPromise();

    const posChangedProm = gridCharacter
      .positionChangeStarted()
      .pipe(take(1))
      .toPromise();

    gridCharacter.move(Direction.DOWN);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 0),
      layer: "lowerCharLayer",
    });
    expect(gridCharacter.getNextTilePos()).toEqual({
      position: new Vector2(0, 1),
      layer: "lowerCharLayer",
    });
    const dir = await movementStartedProm;
    expect(dir).toEqual(Direction.DOWN);

    gridCharacter.move(Direction.UP);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 0),
      layer: "lowerCharLayer",
    });
    expect(gridCharacter.getNextTilePos()).toEqual({
      position: new Vector2(0, 1),
      layer: "lowerCharLayer",
    });

    const posChanged = await posChangedProm;
    expect(posChanged?.exitTile).toEqual(new Vector2(0, 0));
    expect(posChanged?.enterTile).toEqual(new Vector2(0, 1));
  });

  it("should not update if not moving", () => {
    const { gridCharacter } = createDefaultTilemapMock();
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    expect(gridCharacter.getMovementProgress()).toEqual(0);

    gridCharacter.update(300);
    expect(gridCharacter.getMovementProgress()).toEqual(0);
  });

  it("should not move if no direction", () => {
    const { gridCharacter } = createDefaultTilemapMock();
    gridCharacter.move(Direction.NONE);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
  });

  it("should update speed", () => {
    const { gridCharacter } = createDefaultTilemapMock();

    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(QUARTER_SECOND / 2);

    expect(gridCharacter.getMovementProgress()).toEqual(
      Math.floor(3 * (QUARTER_SECOND / 2)),
    );

    gridCharacter.setSpeed(1.5);
    gridCharacter.update(QUARTER_SECOND / 2);
    expect(gridCharacter.getMovementProgress()).toEqual(
      Math.floor(3 * (QUARTER_SECOND / 2) + 1.5 * (QUARTER_SECOND / 2)),
    );
  });

  it("should set movement progress", () => {
    const { gridCharacter } = createDefaultTilemapMock();

    expect(gridCharacter.getMovementProgress()).toBe(0);
    gridCharacter.setMovementProgress(300);
    expect(gridCharacter.getMovementProgress()).toBe(300);

    gridCharacter.setMovementProgress(-10);
    expect(gridCharacter.getMovementProgress()).toBe(0);

    gridCharacter.setMovementProgress(10000);
    expect(gridCharacter.getMovementProgress()).toBe(1000);
  });

  it("should set collidesWithTiles", () => {
    const { gridCharacter } = createDefaultTilemapMock();

    expect(gridCharacter.collidesWithTiles()).toBe(true);
    gridCharacter.setCollidesWithTiles(false);
    expect(gridCharacter.collidesWithTiles()).toBe(false);
  });

  it("should set ignoreMissingTiles", () => {
    const { gridCharacter } = createDefaultTilemapMock();

    expect(gridCharacter.getIgnoreMissingTiles()).toBe(false);
    gridCharacter.setIgnoreMissingTiles(true);
    expect(gridCharacter.getIgnoreMissingTiles()).toBe(true);
  });

  it("should update vertically", () => {
    const { gridCharacter } = createDefaultTilemapMock();

    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(QUARTER_SECOND);

    expect(gridCharacter.getMovementProgress()).toEqual(
      Math.floor(3 * QUARTER_SECOND),
    );
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
  });

  it("should update horizontally", () => {
    const { gridCharacter } = createDefaultTilemapMock();

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(QUARTER_SECOND);

    expect(gridCharacter.getMovementProgress()).toEqual(
      Math.floor(3 * QUARTER_SECOND),
    );
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.RIGHT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.RIGHT);
  });

  it("should update diagonally", () => {
    const { gridCharacter } = createDefaultTilemapMock();

    gridCharacter.move(Direction.DOWN_RIGHT);
    gridCharacter.update(QUARTER_SECOND);

    expect(gridCharacter.getMovementProgress()).toEqual(
      Math.floor(3 * QUARTER_SECOND),
    );
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.DOWN_RIGHT);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN_RIGHT);
  });

  it("should update only till tile border", () => {
    const { gridCharacter } = createDefaultTilemapMock();

    gridCharacter.move(Direction.UP);
    gridCharacter.update(QUARTER_SECOND);
    gridCharacter.update(QUARTER_SECOND);
    gridCharacter.update(QUARTER_SECOND);

    expect(gridCharacter.getMovementProgress()).toEqual(0);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
    expect(gridCharacter.getFacingDirection()).toEqual(Direction.UP);
  });

  it("should set tile position", () => {
    const newTilePos = new Vector2(3, 4);
    const expectedTilePos = { position: new Vector2(3, 4), layer: "someLayer" };
    const { gridCharacter } = createDefaultTilemapMock();

    gridCharacter.setTilePosition({
      position: newTilePos,
      layer: "someLayer",
    });

    // mutate original object
    newTilePos.x = 20;

    expect(gridCharacter.getMovementProgress()).toEqual(0);
    expect(gridCharacter.getTilePos()).toEqual(expectedTilePos);
  });

  it("should set tile position with custom offset", async () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    const movementStoppedObs = gridCharacter.movementStopped();
    const newTilePos = new Vector2(3, 4);
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
      position: newTilePos,
      layer: "someLayer",
    });

    expect(movementStoppedObs.next).not.toHaveBeenCalled();
    const posChangeStarted = await positionChangeStartedProm;
    const posChangeFinished = await positionChangeFinishedProm;

    expect(posChangeStarted).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: newTilePos,
      exitLayer: "lowerCharLayer",
      enterLayer: "someLayer",
    });

    expect(posChangeFinished).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: newTilePos,
      exitLayer: "lowerCharLayer",
      enterLayer: "someLayer",
    });

    expect(gridCharacter.getMovementProgress()).toEqual(0);
  });

  it("should stop ongoing movement when stopping on positionChangeFinish", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
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
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
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
      exitLayer: "lowerCharLayer",
    });

    expect(posChangeFinished).toEqual({
      exitTile: new Vector2(0, 0),
      enterTile: newTilePos,
      enterLayer: "someLayer",
      exitLayer: "lowerCharLayer",
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
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
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
      layer: "lowerCharLayer",
    });
    expect(dir).toEqual(Direction.DOWN);
  });

  it("should observe position and movement update in movementStopped", (done) => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    gridCharacter
      .movementStopped()
      .pipe(take(1))
      .subscribe(() => {
        expect(gridCharacter.getTilePos()).toEqual({
          position: { x: 0, y: 1 },
          layer: "lowerCharLayer",
        });
        expect(gridCharacter.isMoving()).toEqual(false);
        done();
      });
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(1);
    gridCharacter.update(500);
  });

  it("should call positionChangeFinished when movement stopped", (done) => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
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

  it("should continue moving to different dir", async () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    gridCharacter.setSpeed(1);

    const prom = gridCharacter
      .positionChangeFinished()
      .pipe(take(1))
      .toPromise();

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(3 * QUARTER_SECOND);
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(2 * QUARTER_SECOND);

    const posChange = await prom;
    expect(posChange?.exitTile).toEqual(new Vector2(0, 0));
    expect(posChange?.enterTile).toEqual(new Vector2(1, 0));

    expect(gridCharacter.getMovementProgress()).toEqual(
      Math.floor(QUARTER_SECOND),
    );

    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(1, 0),
      layer: "lowerCharLayer",
    });
  });

  it("should not trigger movementStarted on continuing", (done) => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(QUARTER_SECOND);

    gridCharacter
      .movementStarted()
      .pipe(take(1))
      .subscribe(() => {
        done(new Error("Should not call movementStarted"));
      });

    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(QUARTER_SECOND);
    done();
  });

  it("should continue moving on tile border edge case vertically", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    gridCharacter.setSpeed(1);

    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(QUARTER_SECOND * 3);
    gridCharacter.move(Direction.RIGHT);
    gridCharacter.update(QUARTER_SECOND);
    expect(gridCharacter.getMovementProgress()).toEqual(0);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 1),
      layer: "lowerCharLayer",
    });
    gridCharacter.update(QUARTER_SECOND);
    expect(gridCharacter.getMovementProgress()).toEqual(250);
  });

  it("should stop moving on tile border edge case", () => {
    const gridTilemap = new GridTilemap(
      mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            "..",
            "..",
          ],
        },
        {
          layer: "testCharLayer",
          blockMap: [
            // prettier-ignore
            "..",
            "..",
          ],
        },
      ]),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridCharacter = new GridCharacter("player", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    gridTilemap.addCharacter(gridCharacter);
    gridCharacter.setSpeed(1);

    gridTilemap.setTransition(
      new Vector2(0, 1),
      "lowerCharLayer",
      "testCharLayer",
    );
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(QUARTER_SECOND * 3);
    gridCharacter.update(QUARTER_SECOND * 1);

    expect(gridCharacter.getMovementProgress()).toEqual(0);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 1),
      layer: "testCharLayer",
    });
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should stop moving on tile border edge case in one update", () => {
    const gridTilemap = new GridTilemap(
      mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            "..",
            "..",
          ],
        },
        {
          layer: "testCharLayer",
          blockMap: [
            // prettier-ignore
            "..",
            "..",
          ],
        },
      ]),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridCharacter = new GridCharacter("player", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    gridTilemap.addCharacter(gridCharacter);
    gridCharacter.setSpeed(1);

    gridTilemap.setTransition(
      new Vector2(0, 1),
      "lowerCharLayer",
      "testCharLayer",
    );
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(QUARTER_SECOND * 4);

    expect(gridCharacter.getMovementProgress()).toEqual(0);
    expect(gridCharacter.getTilePos()).toEqual({
      position: new Vector2(0, 1),
      layer: "testCharLayer",
    });
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should stop moving if blocking", () => {
    const gridTilemap = new GridTilemap(
      mockBlockMap([
        // prettier-ignore
        "..",
        "#.",
      ]),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridCharacter = new GridCharacter("player", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    gridTilemap.addCharacter(gridCharacter);
    gridCharacter.move(Direction.DOWN);
    gridCharacter.update(1);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should detect movement", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    gridCharacter.move(Direction.DOWN);
    expect(gridCharacter.isMoving()).toBeTruthy();
  });

  it("should detect non-movement", () => {
    const gridTilemap = new GridTilemap(
      mockBlockMap([
        // prettier-ignore
        "..",
        "#.",
      ]),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridCharacter = new GridCharacter("player", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    gridTilemap.addCharacter(gridCharacter);
    gridCharacter.move(Direction.DOWN);
    expect(gridCharacter.isMoving()).toBeFalsy();
  });

  it("should set movement", async () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
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
  });

  it("should set movement to undefined", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    gridCharacter.setMovement(undefined);
    expect(gridCharacter.getMovement()).toEqual(undefined);
  });

  it("should set labels on creation", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer", {
      speed: 3,
      collidesWithTiles: true,
      labels: ["label1", "label2"],
      numberOfDirections: NumberOfDirections.FOUR,
    });

    expect(gridCharacter.getLabels()).toEqual(["label1", "label2"]);
  });

  it("should set labels", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    gridCharacter.addLabels(["label1", "label2"]);

    expect(gridCharacter.hasLabel("label1")).toEqual(true);
    expect(gridCharacter.hasLabel("label2")).toEqual(true);
    expect(gridCharacter.hasLabel("unknownLabel")).toEqual(false);
    expect(gridCharacter.getLabels()).toEqual(["label1", "label2"]);
  });

  it("should remove labels", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    gridCharacter.addLabels(["label1", "label2"]);
    gridCharacter.removeLabels(["label2"]);

    expect(gridCharacter.getLabels()).toEqual(["label1"]);
  });

  it("should clear labels", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    gridCharacter.addLabels(["label1", "label2"]);
    gridCharacter.clearLabels();
    expect(gridCharacter.getLabels()).toEqual([]);
  });

  describe("isBlockingDirection", () => {
    it("direction NONE never blocks", () => {
      const direction = Direction.NONE;
      const gridTilemap = new GridTilemap(
        mockBlockMap([
          // prettier-ignore
          "##",
          "##",
        ]),
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridCharacter = new GridCharacter("player", {
        tilemap: gridTilemap,
        speed: 3,
        collidesWithTiles: true,
        numberOfDirections: NumberOfDirections.FOUR,
      });
      gridTilemap.addCharacter(gridCharacter);

      const result = gridCharacter.isBlockingDirection(direction);
      expect(result).toBe(false);
    });

    it("should create a grid character with ignoreMissingTiles=true", () => {
      const gridTilemap = new GridTilemap(
        mockBlockMap(["."]),
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );

      gridCharacter = new GridCharacter("player", {
        tilemap: gridTilemap,
        ignoreMissingTiles: true,
        speed: 3,
        collidesWithTiles: true,
        numberOfDirections: NumberOfDirections.FOUR,
      });

      expect(gridCharacter.getIgnoreMissingTiles()).toBe(true);
    });

    it("should not block with ignoreMissingTiles", () => {
      const gridTilemap = new GridTilemap(
        mockBlockMap([
          // prettier-ignore
          "##",
          "##",
        ]),
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridCharacter = new GridCharacter("player", {
        tilemap: gridTilemap,
        speed: 3,
        collidesWithTiles: true,
        ignoreMissingTiles: true,
        numberOfDirections: NumberOfDirections.FOUR,
      });
      gridCharacter.setTilePosition({
        position: new Vector2(-10, -10),
        layer: undefined,
      });

      expect(gridCharacter.isBlockingDirection(Direction.RIGHT)).toBe(false);
    });

    describe("collides with tiles", () => {
      const charPosX = 0;
      const charPosY = 0;
      const charWidth = 2;
      const charHeight = 2;
      const charRightBorder = charPosX + charWidth - 1;
      const charBottomBorder = charPosY + charHeight - 1;
      it("should not block when no blocking tiles and chars", () => {
        const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer", {
          collisionGroups: ["cGroup1"],
          numberOfDirections: NumberOfDirections.FOUR,
          tileWidth: 2,
          tileHeight: 2,
        });

        expect(gridCharacter.isBlockingDirection(Direction.RIGHT)).toBe(false);
      });

      it("should block when blocking tiles in multi-tile radius x", () => {
        const gridTilemap = new GridTilemap(
          mockBlockMap([
            // prettier-ignore
            "...",
            "..#",
            "...",
          ]),
          "ge_collide",
          CollisionStrategy.BLOCK_TWO_TILES,
        );
        gridCharacter = new GridCharacter("player", {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: true,
          collisionGroups: ["cGroup1"],
          numberOfDirections: NumberOfDirections.FOUR,
          tileWidth: 2,
          tileHeight: 2,
        });
        gridTilemap.addCharacter(gridCharacter);

        expect(gridCharacter.isBlockingDirection(Direction.RIGHT)).toBe(true);
      });

      it("should block when blocking tiles in multi-tile radius x when moving", () => {
        const gridTilemap = new GridTilemap(
          mockBlockMap([
            // prettier-ignore
            "....",
            "...#",
            "....",
          ]),
          "ge_collide",
          CollisionStrategy.BLOCK_TWO_TILES,
        );
        gridCharacter = new GridCharacter("player", {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: true,
          collisionGroups: ["cGroup1"],
          numberOfDirections: NumberOfDirections.FOUR,
          tileWidth: 2,
          tileHeight: 2,
        });
        gridTilemap.addCharacter(gridCharacter);
        gridCharacter.move(Direction.RIGHT);
        gridCharacter.update(1);

        expect(gridCharacter.isBlockingDirection(Direction.RIGHT)).toBe(true);
      });

      it(
        "should block when blocking tiles in multi-tile radius on layer " +
          "transition of main tile",
        () => {
          const gridTilemap = new GridTilemap(
            mockLayeredBlockMap([
              {
                layer: "lowerCharLayer",
                blockMap: [
                  // prettier-ignore
                  "...",
                  "...",
                  "...",
                ],
              },
              {
                layer: "testCharLayer",
                blockMap: [
                  // prettier-ignore
                  ".#.",
                  "...",
                  "...",
                ],
              },
            ]),
            "ge_collide",
            CollisionStrategy.BLOCK_TWO_TILES,
          );
          gridCharacter = new GridCharacter("player", {
            tilemap: gridTilemap,
            speed: 3,
            collidesWithTiles: true,
            collisionGroups: ["cGroup1"],
            numberOfDirections: NumberOfDirections.FOUR,
            tileWidth: 2,
            tileHeight: 2,
          });
          gridTilemap.addCharacter(gridCharacter);
          gridCharacter.setTilePosition({
            position: new Vector2(charPosX, charPosY),
            layer: "lowerCharLayer",
          });
          gridTilemap.setTransition(
            new Vector2(charPosX + 1, charPosY),
            "lowerCharLayer",
            "testCharLayer",
          );

          expect(gridCharacter.isBlockingDirection(Direction.RIGHT)).toBe(true);
        },
      );

      it("should block when blocking tiles in multi-tile radius y", () => {
        const gridTilemap = new GridTilemap(
          mockBlockMap([
            // prettier-ignore
            "....",
            "....",
            "#...",
          ]),
          "ge_collide",
          CollisionStrategy.BLOCK_TWO_TILES,
        );
        gridCharacter = new GridCharacter("player", {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: true,
          collisionGroups: ["cGroup1"],
          numberOfDirections: NumberOfDirections.FOUR,
          tileWidth: 2,
          tileHeight: 2,
        });
        gridTilemap.addCharacter(gridCharacter);

        expect(gridCharacter.isBlockingDirection(Direction.DOWN)).toBe(true);
      });

      it("should block when blocking chars in multi-tile radius x", () => {
        const gridTilemap = new GridTilemap(
          mockBlockMap([
            // prettier-ignore
            "....",
            "....",
            "....",
          ]),
          "ge_collide",
          CollisionStrategy.BLOCK_TWO_TILES,
        );
        gridCharacter = new GridCharacter("player", {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: true,
          collisionGroups: ["cGroup1"],
          numberOfDirections: NumberOfDirections.FOUR,
          tileWidth: 2,
          tileHeight: 2,
        });
        gridTilemap.addCharacter(gridCharacter);
        const blockingChar = new GridCharacter("blocker", {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: true,
          collisionGroups: ["cGroup1"],
          numberOfDirections: NumberOfDirections.FOUR,
        });
        blockingChar.setTilePosition({
          position: new Vector2(charRightBorder + 1, charBottomBorder),
          layer: undefined,
        });
        gridTilemap.addCharacter(gridCharacter);
        gridTilemap.addCharacter(blockingChar);
        expect(gridCharacter.isBlockingDirection(Direction.RIGHT)).toBe(true);
      });

      it("should block when blocking chars in multi-tile radius y", () => {
        const { gridTilemap, gridCharacter } = createDefaultTilemapMock(
          "lowerCharLayer",
          {
            collisionGroups: ["cGroup1"],
            tileWidth: 2,
            tileHeight: 2,
          },
        );
        const blockingChar = new GridCharacter("blocker", {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: true,
          collisionGroups: ["cGroup1"],
          numberOfDirections: NumberOfDirections.FOUR,
        });
        blockingChar.setTilePosition({
          position: new Vector2(charRightBorder, charBottomBorder + 1),
          layer: undefined,
        });
        gridTilemap.addCharacter(gridCharacter);
        gridTilemap.addCharacter(blockingChar);
        expect(gridCharacter.isBlockingDirection(Direction.DOWN)).toBe(true);
      });
    });

    describe("does not collide with tiles", () => {
      const direction = Direction.RIGHT;
      it("should not block when blocking tiles", () => {
        const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer", {
          collidesWithTiles: false,
          collisionGroups: ["cGroup1"],
        });

        expect(gridCharacter.isBlockingDirection(direction)).toBe(false);
      });

      it("should block when blocking chars", () => {
        const { gridTilemap, gridCharacter } = createDefaultTilemapMock(
          "lowerCharLayer",
          {
            collidesWithTiles: false,
            collisionGroups: ["cGroup1"],
          },
        );
        const blockingChar = new GridCharacter("blocker", {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: false,
          collisionGroups: ["cGroup1"],
          numberOfDirections: NumberOfDirections.FOUR,
        });
        blockingChar.setTilePosition({
          position: new Vector2(1, 0),
          layer: undefined,
        });
        gridTilemap.addCharacter(gridCharacter);
        gridTilemap.addCharacter(blockingChar);
        expect(gridCharacter.isBlockingDirection(direction)).toBe(true);
      });

      it("should not block when chars in ingored collision groups", () => {
        const { gridTilemap, gridCharacter } = createDefaultTilemapMock(
          "lowerCharLayer",
          {
            collidesWithTiles: false,
            collisionGroups: ["cGroup1"],
            ignoreCollisionGroups: ["cGroupIgnore"],
          },
        );
        const ignoredChar = new GridCharacter("blocker", {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: false,
          collisionGroups: ["cGroup1", "cGroupIgnore"],
          numberOfDirections: NumberOfDirections.FOUR,
        });
        ignoredChar.setTilePosition({
          position: new Vector2(1, 0),
          layer: undefined,
        });
        gridTilemap.addCharacter(gridCharacter);
        gridTilemap.addCharacter(ignoredChar);
        expect(gridCharacter.isBlockingDirection(direction)).toBe(false);
      });
    });
  });

  describe("getFacingPosition", () => {
    let gridCharacter: GridCharacter;
    beforeEach(() => {
      ({ gridCharacter } = createDefaultTilemapMock("someLayer"));
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
    it("should turn towards left", (done) => {
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
      gridCharacter.directionChanged().subscribe((direction) => {
        expect(gridCharacter.getFacingDirection()).toEqual(Direction.LEFT);
        expect(direction).toEqual(Direction.LEFT);
        done();
      });
      gridCharacter.turnTowards(Direction.LEFT);
    });

    it("should emit directioChanged only once on turning", () => {
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
      const dirChangedMock = jest.fn();
      gridCharacter.directionChanged().subscribe(dirChangedMock);

      gridCharacter.turnTowards(Direction.LEFT);
      gridCharacter.turnTowards(Direction.LEFT);

      expect(dirChangedMock).toHaveBeenCalledWith(Direction.LEFT);
      expect(dirChangedMock).toHaveBeenCalledTimes(1);
    });

    it("should not turn if moving", () => {
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
      gridCharacter.move(Direction.DOWN);
      gridCharacter.turnTowards(Direction.LEFT);
      expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
    });

    it("should not turn if direction NONE", () => {
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
      gridCharacter.turnTowards(Direction.NONE);
      expect(gridCharacter.getFacingDirection()).toEqual(Direction.DOWN);
    });
  });

  it("should turn player if direction blocked", () => {
    const gridTilemap = new GridTilemap(
      mockBlockMap([
        // prettier-ignore
        ".#",
        "..",
      ]),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridCharacter = new GridCharacter("player", {
      tilemap: gridTilemap,
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
    });
    gridTilemap.addCharacter(gridCharacter);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);

    const dirChangedMock = jest.fn();
    gridCharacter.directionChanged().subscribe(dirChangedMock);
    gridCharacter.move(Direction.RIGHT);

    expect(dirChangedMock).toHaveBeenCalledWith(Direction.RIGHT);
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);
  });

  it("should emit directionChanged once on player turn", () => {
    const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
    expect(gridCharacter.getMovementDirection()).toEqual(Direction.NONE);

    const dirChangedMock = jest.fn();
    gridCharacter.directionChanged().subscribe(dirChangedMock);
    gridCharacter.move(Direction.UP);
    gridCharacter.move(Direction.UP);

    expect(dirChangedMock).toHaveBeenCalledWith(Direction.UP);
    expect(dirChangedMock).toHaveBeenCalledTimes(1);
  });

  describe("collision groups", () => {
    it("should set collision groups from config", () => {
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer", {
        collisionGroups: ["someGroup"],
        ignoreCollisionGroups: ["ignore"],
      });
      expect(gridCharacter.getCollisionGroups()).toEqual(["someGroup"]);
      expect(gridCharacter.getIgnoreCollisionGroups()).toEqual(["ignore"]);
    });

    it("should add collision groups", () => {
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
      gridCharacter.addCollisionGroup("collisionGroup1");
      gridCharacter.addCollisionGroup("collisionGroup2");

      expect(gridCharacter.getCollisionGroups()).toEqual([
        "collisionGroup1",
        "collisionGroup2",
      ]);
      expect(gridCharacter.hasCollisionGroup("collisionGroup1")).toBe(true);
      expect(gridCharacter.hasCollisionGroup("collisionGroup2")).toBe(true);
      expect(gridCharacter.hasCollisionGroup("unknownCollisionGroup")).toBe(
        false,
      );
    });

    it("should remove a collision group", () => {
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
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
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
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
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
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

    it("should set ignore collision groups", () => {
      const { gridCharacter } = createDefaultTilemapMock("lowerCharLayer");
      gridCharacter.setIgnoreCollisionGroups([
        "collisionGroup1",
        "collisionGroup2",
      ]);
      expect(gridCharacter.getIgnoreCollisionGroups()).toEqual([
        "collisionGroup1",
        "collisionGroup2",
      ]);
    });
  });
});
