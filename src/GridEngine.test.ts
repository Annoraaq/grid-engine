import { take } from "rxjs/operators";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { GridCharacter } from "./GridCharacter/GridCharacter";
import { Vector2 } from "./Utils/Vector2/Vector2";
import {
  QueueMovementConfig,
  QueuedPathBlockedStrategy,
} from "./Movement/QueueMovement/QueueMovement";
import * as Phaser from "phaser";

// Hack to get Phaser included at runtime
((_a) => {
  // do nothing
})(Phaser);

const mockPathfinding = {
  findShortestPath: jest.fn().mockReturnValue({
    path: [],
    closestToTarget: { position: { x: 0, y: 0 }, charLayer: undefined },
  }),
};

const mockPathfindingConstructor = jest.fn(function (
  _shortestPathAlgorithm,
  _gridTilemap
) {
  return mockPathfinding;
});

const mockNewSprite = {
  setCrop: jest.fn(),
  setOrigin: jest.fn(),
  setDepth: jest.fn(),
  scale: 1,
};

expect.extend({
  toBeCharacter(receivedChar: GridCharacter, expectedCharId: string) {
    const pass = receivedChar.getId() == expectedCharId;
    if (pass) {
      return {
        message: () =>
          `expected ${receivedChar.getId()} not to be ${expectedCharId}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${receivedChar.getId()} to be ${expectedCharId}`,
        pass: false,
      };
    }
  },
});

jest.mock("./Pathfinding/Pathfinding", function () {
  return {
    Pathfinding: mockPathfindingConstructor,
  };
});

jest.mock("../package.json", () => ({
  version: "GRID.ENGINE.VERSION",
}));

import { GridEngine, PathfindingOptions } from "./GridEngine";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import { createSpriteMock } from "./Utils/MockFactory/MockFactory";
import { createPhaserTilemapStub } from "./Utils/MockFactory/MockPhaserTilemap";

describe("GridEngine", () => {
  let gridEngine: GridEngine;
  let sceneMock;
  let playerSpriteMock;
  let consoleLogBackup;

  afterEach(() => {
    console.log = consoleLogBackup;
    jest.clearAllMocks();
  });

  function createDefaultMockWithLayer(layer?: string) {
    return createPhaserTilemapStub(
      new Map([
        [
          layer,
          [
            // prettier-ignore
            "...",
            "...",
          ],
        ],
      ])
    );
  }

  beforeEach(() => {
    consoleLogBackup = console.log;
    console.log = jest.fn();

    // hacky way of avoiding errors in Plugin Initialization because Phaser
    // is not mockable by jest
    sceneMock = {
      sys: { events: { once: jest.fn(), on: jest.fn() } },
      add: { sprite: jest.fn().mockReturnValue(mockNewSprite) },
    };

    playerSpriteMock = {
      x: 10,
      y: 12,
      displayWidth: 20,
      displayHeight: 40,
      width: 20,
      setOrigin: jest.fn(),
      texture: {
        source: [{ width: 240 }],
      },
      setFrame: jest.fn(function (name) {
        this.frame.name = name;
      }),
      setDepth: jest.fn(),
      scale: 2,
      frame: {
        name: "1",
      },
    } as any;

    gridEngine = new GridEngine(sceneMock);
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 0,
          speed: 1,
        },
      ],
    });
  });

  it("should boot", () => {
    gridEngine.boot();
    expect(sceneMock.sys.events.on).toHaveBeenCalledWith(
      "update",
      gridEngine.update,
      gridEngine
    );
  });

  it("should init player", () => {
    const containerMock = { setDepth: jest.fn() };
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          container: <any>containerMock,
        },
      ],
    });
    expect(gridEngine.hasCharacter("player")).toEqual(true);
    expect(gridEngine.getSprite("player")).toEqual(playerSpriteMock);
    expect(gridEngine.getSpeed("player")).toEqual(4);
    expect(gridEngine.getContainer("player")).toEqual(containerMock);
    expect(gridEngine.getOffsetX("player")).toEqual(0);
    expect(gridEngine.getOffsetY("player")).toEqual(0);
    expect(gridEngine.collidesWithTiles("player")).toEqual(true);
    expect(gridEngine.getWalkingAnimationMapping("player")).toEqual(undefined);
    expect(gridEngine.getCharLayer("player")).toEqual(undefined);
    expect(gridEngine.getCollisionGroups("player")).toEqual(["geDefault"]);
    expect(gridEngine.hasLayerOverlay()).toEqual(false);
    expect(gridEngine.getLabels("player")).toEqual([]);
  });

  it("should init player with collisionGroups", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          collides: {
            collidesWithTiles: false,
            collisionGroups: ["cGroup1", "cGroup2"],
          },
        },
      ],
      layerOverlay: true,
    });
    expect(gridEngine.collidesWithTiles("player")).toEqual(false);
    expect(gridEngine.getCollisionGroups("player")).toEqual([
      "cGroup1",
      "cGroup2",
    ]);
  });

  it("should init with layerOverlay", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
        },
      ],
      layerOverlay: true,
    });

    expect(gridEngine.hasLayerOverlay()).toBe(true);
  });

  it("should init player with facingDirection", () => {
    const containerMock = { setDepth: jest.fn() };
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          container: <any>containerMock,
          facingDirection: Direction.LEFT,
        },
      ],
    });
    expect(gridEngine.getFacingDirection("player")).toEqual(Direction.LEFT);
  });

  it("should init player with animation mapping", () => {
    const walkingAnimationMapping = {
      up: {
        leftFoot: 0,
        standing: 1,
        rightFoot: 2,
      },
      down: {
        leftFoot: 36,
        standing: 37,
        rightFoot: 38,
      },
      left: {
        leftFoot: 12,
        standing: 13,
        rightFoot: 14,
      },
      right: {
        leftFoot: 24,
        standing: 25,
        rightFoot: 26,
      },
    };
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping,
        },
      ],
    });
    expect(gridEngine.getWalkingAnimationMapping("player")).toEqual(
      walkingAnimationMapping
    );
  });

  it("should use config startPosition", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          startPosition: new Vector2(3, 4),
        },
      ],
    });
    expect(gridEngine.getPosition("player")).toEqual(new Vector2(3, 4));
  });

  it("should use config speed", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          speed: 2,
        },
      ],
    });
    expect(gridEngine.getSpeed("player")).toEqual(2);
  });

  it("should use config offset", () => {
    const offsetX = 5;
    const offsetY = 6;
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          offsetX,
          offsetY,
        },
      ],
    });
    expect(gridEngine.getOffsetX("player")).toEqual(offsetX);
    expect(gridEngine.getOffsetY("player")).toEqual(offsetY);
  });

  describe("collision config", () => {
    it("should use config collides", () => {
      gridEngine.create(createDefaultMockWithLayer(undefined), {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
            speed: 2,
            collides: false,
          },
        ],
      });
      expect(gridEngine.collidesWithTiles("player")).toEqual(false);
      expect(gridEngine.getCollisionGroups("player")).toEqual([]);
    });

    it("should use config collidesWithTiles true", () => {
      gridEngine.create(createDefaultMockWithLayer(undefined), {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
            speed: 2,
            collides: {
              collidesWithTiles: true,
            },
          },
        ],
      });
      expect(gridEngine.collidesWithTiles("player")).toEqual(true);
      expect(gridEngine.getCollisionGroups("player")).toEqual(["geDefault"]);
    });

    it("should use config collidesWithTiles false", () => {
      gridEngine.create(createDefaultMockWithLayer(undefined), {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
            speed: 2,
            collides: {
              collidesWithTiles: false,
            },
          },
        ],
      });
      expect(gridEngine.collidesWithTiles("player")).toEqual(false);
      expect(gridEngine.getCollisionGroups("player")).toEqual(["geDefault"]);
    });

    it("should use config collisionGroups", () => {
      gridEngine.create(createDefaultMockWithLayer(undefined), {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
            speed: 2,
            collides: {
              collisionGroups: ["test"],
            },
          },
        ],
      });
      expect(gridEngine.collidesWithTiles("player")).toEqual(true);
      expect(gridEngine.getCollisionGroups("player")).toEqual(["test"]);
    });
  });

  it("should use config char layer", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          startPosition: new Vector2(3, 4),
          charLayer: "someCharLayer",
        },
      ],
    });
    expect(gridEngine.getCharLayer("player")).toEqual("someCharLayer");
  });

  it("uses tile collision cache", () => {
    const tm = createPhaserTilemapStub(
      new Map([
        [
          undefined,
          [
            // prettier-ignore
            "#.",
            ".#",
          ],
        ],
      ])
    );
    gridEngine.create(tm, {
      characters: [{ id: "player", startPosition: { x: 1, y: 1 } }],
      cacheTileCollisions: true,
    });
    expect(gridEngine.isTileBlocked({ x: 0, y: 0 })).toBe(true);
    expect(gridEngine.isTileBlocked({ x: 1, y: 1 })).toBe(true);

    const layer = tm.getLayer(undefined);
    if (layer) {
      layer.data[0][0].properties = {};
      layer.data[1][1].properties = {};
    }

    expect(gridEngine.isTileBlocked({ x: 0, y: 0 })).toBe(true);
    expect(gridEngine.isTileBlocked({ x: 1, y: 1 })).toBe(true);

    gridEngine.rebuildTileCollisionCache(0, 0, 1, 1);

    expect(gridEngine.isTileBlocked({ x: 0, y: 0 })).toBe(false);
    expect(gridEngine.isTileBlocked({ x: 1, y: 1 })).toBe(true);
  });

  describe("move 4 dirs", () => {
    beforeEach(() => {
      const mock = createPhaserTilemapStub(
        new Map([
          [
            undefined,
            [
              // prettier-ignore
              "...",
              "...",
              "...",
            ],
          ],
        ])
      );
      gridEngine.create(mock, {
        characters: [{ id: "player", startPosition: { x: 1, y: 1 } }],
      });
    });

    it("should move player orthogonally", () => {
      gridEngine.move("player", Direction.LEFT);

      expect(gridEngine.isMoving("player")).toBe(true);
      expect(gridEngine.getFacingDirection("player")).toBe(Direction.LEFT);
    });

    it("should return the movement progress", () => {
      const speed = 4;
      const halfWayMs = 1000 / speed / 2;
      gridEngine.move("player", Direction.LEFT);
      gridEngine.update(1000, halfWayMs);
      expect(gridEngine.getMovementProgress("player")).toEqual(500);
    });

    test.each([
      Direction.DOWN_LEFT,
      Direction.DOWN_RIGHT,
      Direction.UP_RIGHT,
      Direction.UP_LEFT,
    ])("should show warn on vertical move", (dir) => {
      console.warn = jest.fn();
      gridEngine.move("player", dir);
      expect(console.warn).toHaveBeenCalledWith(
        `GridEngine: Character 'player' can't be moved '${dir}' in 4 direction mode.`
      );
      expect(gridEngine.isMoving("player")).toBe(false);
    });
  });

  describe("move 8 dirs", () => {
    beforeEach(() => {
      const mock = createPhaserTilemapStub(
        new Map([
          [
            undefined,
            [
              // prettier-ignore
              "...",
              "...",
              "...",
            ],
          ],
        ])
      );
      gridEngine.create(mock, {
        characters: [{ id: "player", startPosition: { x: 1, y: 1 } }],
        numberOfDirections: NumberOfDirections.EIGHT,
      });
    });

    it("should move player orthogonally", () => {
      gridEngine.move("player", Direction.LEFT);

      expect(gridEngine.isMoving("player")).toBe(true);
      expect(gridEngine.getFacingDirection("player")).toBe(Direction.LEFT);
    });

    it("should move player vertically", () => {
      gridEngine.move("player", Direction.UP_LEFT);

      expect(gridEngine.isMoving("player")).toBe(true);
      expect(gridEngine.getFacingDirection("player")).toBe(Direction.UP_LEFT);
    });
  });

  describe("move 4 dirs isometric", () => {
    beforeEach(() => {
      const mock = createPhaserTilemapStub(
        new Map([
          [
            undefined,
            [
              // prettier-ignore
              "...",
              "...",
              "...",
            ],
          ],
        ])
      );
      mock.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
      gridEngine.create(mock, {
        characters: [{ id: "player", startPosition: { x: 1, y: 1 } }],
      });
    });

    it("should move player vertically", () => {
      gridEngine.move("player", Direction.UP_LEFT);

      expect(gridEngine.isMoving("player")).toBe(true);
      expect(gridEngine.getFacingDirection("player")).toBe(Direction.UP_LEFT);
    });

    test.each([Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP])(
      "should show warn on orthogonal move",
      (dir) => {
        console.warn = jest.fn();

        gridEngine.move("player", dir);
        expect(console.warn).toHaveBeenCalledWith(
          `GridEngine: Character 'player' can't be moved '${dir}' in 4 direction isometric mode.`
        );
        expect(gridEngine.isMoving("player")).toBe(false);
      }
    );
  });

  it("should set tile position", () => {
    gridEngine.setPosition("player", { x: 3, y: 4 }, "someOtherLayer");
    expect(gridEngine.getPosition("player")).toEqual({ x: 3, y: 4 });
    expect(gridEngine.getCharLayer("player")).toEqual("someOtherLayer");
  });

  it("should set tile position without layer", () => {
    gridEngine.setPosition("player", { x: 3, y: 4 });

    expect(gridEngine.getPosition("player")).toEqual({ x: 3, y: 4 });
    expect(gridEngine.getCharLayer("player")).toBeUndefined();
  });

  it("should set sprite", () => {
    const mockSprite = createSpriteMock();
    gridEngine.setSprite("player", mockSprite);

    expect(gridEngine.getSprite("player")).toEqual(mockSprite);
  });

  it("should get facing position", () => {
    const rightStandingFrameNo = 25;
    playerSpriteMock.setFrame.mockClear();
    gridEngine.turnTowards("player", Direction.RIGHT);
    expect(playerSpriteMock.setFrame).toHaveBeenCalledWith(
      rightStandingFrameNo
    );
    expect(gridEngine.getFacingPosition("player")).toEqual({ x: 1, y: 0 });
  });

  it("should move randomly", () => {
    gridEngine.moveRandomly("player", 123, 3);
    expect(gridEngine.getMovement("player")).toEqual({
      type: "Random",
      config: {
        delay: 123,
        radius: 3,
      },
    });
  });

  describe("moveTo", () => {
    it("should move to coordinates", () => {
      console.warn = jest.fn();
      const targetVec = { position: new Vector2(3, 4), layer: "layer1" };
      gridEngine.moveTo("player", targetVec.position);
      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          ignoreBlockedTarget: false,
          distance: 0,
          targetPos: { position: targetVec.position, layer: undefined },
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }),
      });
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("should move to layer", () => {
      const targetVec = { position: new Vector2(3, 4), layer: "layer1" };
      gridEngine.moveTo("player", targetVec.position, {
        targetLayer: "layer1",
      });

      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          distance: 0,
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
          targetPos: targetVec,
          ignoreBlockedTarget: false,
        }),
      });
    });

    it("should return observable", (done) => {
      const targetVec = new Vector2(-1, 0);
      gridEngine.moveTo("player", targetVec).subscribe((finished) => {
        expect(finished).toEqual({
          charId: "player",
          position: new Vector2(0, 0),
          result: "NO_PATH_FOUND",
          description: "NoPathFoundStrategy STOP: No path found.",
          layer: undefined,
        });
        done();
      });
      gridEngine.update(2000, 1000);
    });

    it("should use backoff and retry", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundRetryBackoffMs: 500,
        noPathFoundMaxRetries: 10,
      });
      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: {
          algorithm: "BIDIRECTIONAL_SEARCH",
          distance: 0,
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
          noPathFoundRetryBackoffMs: 500,
          noPathFoundMaxRetries: 10,
          targetPos: {
            position: targetVec,
            layer: undefined,
          },
          ignoreBlockedTarget: false,
        },
      });
    });

    it("should move to coordinates STOP", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
      });
      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }),
      });
    });

    it("should move to coordinates CLOSEST_REACHABLE", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      });
      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }),
      });
    });

    it("should move to coordinates STOP on unknown strategy", () => {
      console.warn = jest.fn();
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: <NoPathFoundStrategy>"unknown strategy",
      });
      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }),
      });
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Unknown NoPathFoundStrategy 'unknown strategy'. Falling back to 'STOP'"
      );
    });

    it("should use pathBlockedStrategy = WAIT", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        pathBlockedStrategy: PathBlockedStrategy.WAIT,
      });
      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }),
      });
    });

    it("should use pathBlockedStrategy = RETRY", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        pathBlockedStrategy: PathBlockedStrategy.RETRY,
      });
      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
        }),
      });
    });

    it("should use pathBlockedStrategy WAIT and warn on unkown input", () => {
      console.warn = jest.fn();
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        pathBlockedStrategy: <PathBlockedStrategy>"unknown strategy",
      });
      expect(gridEngine.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }),
      });
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Unknown PathBlockedStrategy 'unknown strategy'. Falling back to 'WAIT'"
      );
    });
  });

  it("should stop moving", () => {
    gridEngine.stopMovement("player");
    expect(gridEngine.getMovement("player")).toEqual({ type: "None" });
  });

  it("should set speed", () => {
    gridEngine.setSpeed("player", 2);
    expect(gridEngine.getSpeed("player")).toEqual(2);
  });

  it("should add chars on the go", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [],
    });
    gridEngine.addCharacter({
      id: "player",
      sprite: playerSpriteMock,
    });

    expect(gridEngine.hasCharacter("player")).toBe(true);
  });

  it("should remove chars on the go", () => {
    gridEngine.removeCharacter("player");
    gridEngine.update(123, 456);
    expect(gridEngine.hasCharacter("player")).toBe(false);
  });

  it("should remove all chars", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
        },
        {
          id: "player2",
          sprite: playerSpriteMock,
        },
      ],
    });
    gridEngine.removeAllCharacters();
    gridEngine.update(123, 456);

    expect(gridEngine.getAllCharacters().length).toEqual(0);
  });

  it("should get all chars", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
        },
        {
          id: "player2",
          sprite: playerSpriteMock,
        },
      ],
    });
    const chars = gridEngine.getAllCharacters();
    expect(chars).toEqual(["player", "player2"]);
  });

  it("should delegate to get all chars at position", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          startPosition: { x: 5, y: 4 },
          charLayer: "layer",
          sprite: playerSpriteMock,
        },
      ],
    });
    const chars = gridEngine.getCharactersAt(new Vector2(5, 4), "layer");
    expect(chars).toEqual(["player"]);
  });

  it("should get all chars at position without layer", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          startPosition: { x: 5, y: 4 },
          charLayer: undefined,
          sprite: playerSpriteMock,
        },
      ],
    });
    const chars = gridEngine.getCharactersAt({ x: 5, y: 4 });
    expect(chars).toEqual(["player"]);
  });

  it("should check if char is registered", () => {
    gridEngine.addCharacter({
      id: "player2",
      sprite: playerSpriteMock,
    });
    expect(gridEngine.hasCharacter("player")).toBe(true);
    expect(gridEngine.hasCharacter("player2")).toBe(true);
    expect(gridEngine.hasCharacter("unknownCharId")).toBe(false);
  });

  it("should follow a char", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
        },
        {
          id: "player2",
          sprite: playerSpriteMock,
        },
      ],
    });
    gridEngine.follow("player", "player2", {
      distance: 7,
      closestPointIfBlocked: true,
      maxPathLength: 10000,
      ignoreLayers: true,
    });

    expect(gridEngine.getMovement("player")).toEqual({
      type: "Follow",
      config: {
        charToFollow: "player2",
        distance: 7,
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        maxPathLength: 10000,
        ignoreLayers: true,
      },
    });
  });

  it("should follow a char with default values", () => {
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
        },
        {
          id: "player2",
          sprite: playerSpriteMock,
        },
      ],
    });

    gridEngine.follow("player", "player2");

    expect(gridEngine.getMovement("player")).toEqual({
      type: "Follow",
      config: {
        charToFollow: "player2",
        distance: 0,
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        maxPathLength: Infinity,
        ignoreLayers: false,
      },
    });
  });

  it("should set walkingAnimationMapping", () => {
    const walkingAnimationMappingMock = <any>{};
    gridEngine.setWalkingAnimationMapping(
      "player",
      walkingAnimationMappingMock
    );

    expect(gridEngine.getWalkingAnimationMapping("player")).toEqual(
      walkingAnimationMappingMock
    );
  });

  it("should set walkingAnimationMapping after setting char index", () => {
    const walkingAnimationMappingMock = <any>{};
    gridEngine.setWalkingAnimationMapping("player", 1);
    gridEngine.setWalkingAnimationMapping(
      "player",
      walkingAnimationMappingMock
    );

    expect(gridEngine.getWalkingAnimationMapping("player")).toEqual(
      walkingAnimationMappingMock
    );
  });

  it("should set characterIndex", () => {
    gridEngine.setWalkingAnimationMapping("player", 3);
    expect(gridEngine.getWalkingAnimationMapping("player")).toEqual(3);
  });

  it("should delegate getFacingDirection", () => {
    gridEngine.turnTowards("player", Direction.LEFT);
    const facingDirection = gridEngine.getFacingDirection("player");
    expect(facingDirection).toEqual(Direction.LEFT);
  });

  it("should delegate getTransition", () => {
    gridEngine.setTransition({ x: 3, y: 4 }, "fromLayer", "toLayer");
    expect(gridEngine.getTransition({ x: 3, y: 4 }, "fromLayer")).toEqual(
      "toLayer"
    );
  });

  it("should block if tile is blocking", () => {
    const mock = createPhaserTilemapStub(
      new Map([
        [
          "someLayer",
          [
            // prettier-ignore
            "....",
            "....",
            "....",
            "....",
            "...#",
          ],
        ],
      ])
    );
    gridEngine.create(mock, {
      characters: [{ id: "player" }],
    });

    expect(gridEngine.isBlocked({ x: 3, y: 4 }, "someLayer", ["cGroup"])).toBe(
      true
    );
    expect(gridEngine.isTileBlocked({ x: 3, y: 4 }, "someLayer")).toBe(true);
  });

  it("should block if char is blocking", () => {
    gridEngine.create(createDefaultMockWithLayer("someLayer"), {
      characters: [
        {
          id: "player",
          startPosition: { x: 3, y: 4 },
          charLayer: "someLayer",
          collides: {
            collisionGroups: ["cGroup"],
          },
        },
      ],
    });
    expect(gridEngine.isBlocked({ x: 3, y: 4 }, "someLayer", ["cGroup"])).toBe(
      true
    );
  });

  it("should not block", () => {
    gridEngine.create(createDefaultMockWithLayer("someLayer"), {
      characters: [{ id: "player" }],
    });

    expect(gridEngine.isBlocked({ x: 1, y: 1 }, "someLayer")).toBe(false);
  });

  it("should check blocking with default cGroup", () => {
    gridEngine.create(createDefaultMockWithLayer("someLayer"), {
      characters: [
        {
          id: "player",
          charLayer: "someLayer",
          collides: { collisionGroups: ["geDefault"] },
        },
      ],
    });
    expect(gridEngine.isBlocked({ x: 0, y: 0 }, "someLayer")).toBe(true);
  });

  it("should delegate getCollisionGroups", () => {
    const collisionGroups = ["someCG"];
    gridEngine.setCollisionGroups("player", collisionGroups);
    expect(gridEngine.getCollisionGroups("player")).toEqual(collisionGroups);
  });

  it("should get tile pos in direction", () => {
    const pos = { x: 5, y: 6 };
    const layer = "charLayer1";

    const tilePosInDir = gridEngine.getTilePosInDirection(
      pos,
      layer,
      Direction.LEFT
    );

    expect(tilePosInDir).toEqual({
      position: { x: 4, y: 6 },
      charLayer: layer,
    });
  });

  describe("Observables", () => {
    it("should get chars movementStarted observable", async () => {
      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [{ id: "player", sprite: playerSpriteMock }],
      });
      const prom = gridEngine.movementStarted().pipe(take(1)).toPromise();

      gridEngine.move("player", Direction.RIGHT);

      const res = await prom;
      expect(res).toEqual({ charId: "player", direction: Direction.RIGHT });
    });

    it("should unsubscribe from movementStarted if char removed", () => {
      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [{ id: "player", sprite: playerSpriteMock }],
      });

      const nextMock = jest.fn();
      gridEngine.movementStarted().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      gridEngine.move("player", Direction.RIGHT);
      gridEngine.update(2000, 100);
      gridEngine.move("player", Direction.DOWN);
      gridEngine.removeCharacter("player");
      gridEngine.update(2000, 3000);

      expect(nextMock).toHaveBeenCalledTimes(1);
    });

    it("should get chars movementStopped observable", async () => {
      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [{ id: "player", sprite: playerSpriteMock }],
      });

      const prom = gridEngine.movementStopped().pipe(take(1)).toPromise();
      gridEngine.move("player", Direction.RIGHT);
      gridEngine.update(2000, 1000);
      gridEngine.update(2000, 1000);

      expect(await prom).toEqual({
        charId: "player",
        direction: Direction.RIGHT,
      });
    });

    it("should unsubscribe from movementStopped if char removed", () => {
      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [{ id: "player", sprite: playerSpriteMock }],
      });

      const nextMock = jest.fn();
      gridEngine.movementStopped().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      gridEngine.move("player", Direction.RIGHT);
      gridEngine.removeCharacter("player");
      gridEngine.update(2000, 1000);
      gridEngine.update(2000, 1000);

      expect(nextMock).not.toHaveBeenCalled();
    });

    it("should get chars directionChanged observable", async () => {
      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [{ id: "player", sprite: playerSpriteMock }],
      });

      const prom = gridEngine.directionChanged().pipe(take(1)).toPromise();

      gridEngine.move("player", Direction.LEFT);

      expect(await prom).toEqual({
        charId: "player",
        direction: Direction.LEFT,
      });
    });

    it("should get chars positionChangeStarted observable", async () => {
      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [{ id: "player", sprite: playerSpriteMock }],
      });

      const prom = gridEngine.positionChangeStarted().pipe(take(1)).toPromise();

      gridEngine.move("player", Direction.RIGHT);

      expect(await prom).toEqual({
        charId: "player",
        exitTile: new Vector2(0, 0),
        enterTile: new Vector2(1, 0),
        enterLayer: "someLayer",
        exitLayer: "someLayer",
      });
    });

    it("should get chars positionChangeFinished observable", async () => {
      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [{ id: "player", sprite: playerSpriteMock }],
      });

      const prom = gridEngine
        .positionChangeFinished()
        .pipe(take(1))
        .toPromise();

      gridEngine.move("player", Direction.RIGHT);
      gridEngine.update(2000, 1000);
      gridEngine.update(2000, 1000);

      const res = await prom;
      expect(res).toEqual({
        charId: "player",
        exitTile: new Vector2(0, 0),
        enterTile: new Vector2(1, 0),
        enterLayer: "someLayer",
        exitLayer: "someLayer",
      });
    });

    it("should emit when a character is added or removed", () => {
      const player1 = "player1";
      const player2 = "player2";
      const nextMock = jest.fn();

      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [{ id: player1, sprite: playerSpriteMock }],
      });

      gridEngine.characterShifted().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      gridEngine.addCharacter({ id: player2, sprite: playerSpriteMock });
      expect(nextMock).toHaveBeenCalledWith(
        expect.objectContaining({
          charId: player2,
          action: "ADDED",
        })
      );

      gridEngine.removeCharacter(player1);
      expect(nextMock).toHaveBeenCalledWith(
        expect.objectContaining({
          charId: player1,
          action: "REMOVED",
        })
      );

      gridEngine.addCharacter({ id: player1, sprite: playerSpriteMock });
      expect(nextMock).toHaveBeenCalledWith(
        expect.objectContaining({
          charId: player1,
          action: "ADDED",
        })
      );
    });

    describe("steppedOn", () => {
      let nextMock;
      const player = "player1";
      const nonMatchingChar = "non matching char";
      const expectedLayer = "anyLayer";
      const expectedTargetPosition = new Vector2(1, 1);
      beforeEach(() => {
        nextMock = jest.fn();
        gridEngine.create(createDefaultMockWithLayer(expectedLayer), {
          characters: [
            {
              id: player,
              sprite: playerSpriteMock,
            },
            {
              id: nonMatchingChar,
              sprite: playerSpriteMock,
            },
          ],
        });
        gridEngine
          .steppedOn([player], [expectedTargetPosition], [expectedLayer])
          .subscribe({
            complete: jest.fn(),
            next: nextMock,
          });
      });

      it("should notify if character stepped on tile", () => {
        gridEngine.setPosition(player, new Vector2(0, 1), expectedLayer);
        gridEngine.move(player, Direction.RIGHT);
        gridEngine.update(2000, 300);

        expect(nextMock).toHaveBeenCalledWith(
          expect.objectContaining({
            enterTile: expectedTargetPosition,
          })
        );
      });

      it("should not notify if character stepped on tile with non matching layer", () => {
        gridEngine.setPosition(player, new Vector2(4, 5), "not matching layer");
        gridEngine.move(player, Direction.RIGHT);
        gridEngine.update(2000, 300);

        expect(nextMock).not.toHaveBeenCalledWith(
          expect.objectContaining({
            enterTile: expectedTargetPosition,
          })
        );
      });

      it("should not notify if character stepped on tile with non matching char", () => {
        gridEngine.setPosition(
          nonMatchingChar,
          new Vector2(4, 5),
          expectedLayer
        );
        gridEngine.move(nonMatchingChar, Direction.RIGHT);
        gridEngine.update(2000, 300);

        expect(nextMock).not.toHaveBeenCalledWith(
          expect.objectContaining({
            enterTile: expectedTargetPosition,
          })
        );
      });

      it("should not notify if character stepped on tile with non matching tile", () => {
        gridEngine.setPosition(
          player,
          new Vector2(10, 10), // non matching tile
          expectedLayer
        );
        gridEngine.move(player, Direction.RIGHT);
        gridEngine.update(2000, 300);

        expect(nextMock).not.toHaveBeenCalledWith(
          expect.objectContaining({
            enterTile: expectedTargetPosition,
          })
        );
      });
    });

    it("should unsubscribe from positionChangeFinished if char removed", () => {
      gridEngine.create(createDefaultMockWithLayer("someLayer"), {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      const nextMock = jest.fn();
      gridEngine.positionChangeFinished().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      gridEngine.move("player", Direction.RIGHT);
      gridEngine.removeCharacter("player");
      gridEngine.update(2000, 1000);
      gridEngine.update(2000, 1000);
      expect(nextMock).not.toHaveBeenCalled();
    });
  });

  describe("labels", () => {
    it("should add labels on creation", () => {
      gridEngine.create(createDefaultMockWithLayer(undefined), {
        characters: [
          {
            id: "player",
            labels: ["someLabel", "someOtherLabel"],
          },
        ],
      });
      expect(gridEngine.getLabels("player")).toEqual([
        "someLabel",
        "someOtherLabel",
      ]);
    });

    it("should add labels", () => {
      expect(gridEngine.getLabels("player")).toEqual([]);
      gridEngine.addLabels("player", ["someLabel", "someOtherLabel"]);
      expect(gridEngine.getLabels("player")).toEqual([
        "someLabel",
        "someOtherLabel",
      ]);
    });

    it("should remove labels", () => {
      expect(gridEngine.getLabels("player")).toEqual([]);
      gridEngine.addLabels("player", ["label1", "label2", "label3"]);
      gridEngine.removeLabels("player", ["label1", "label3"]);
      expect(gridEngine.getLabels("player")).toEqual(["label2"]);
    });

    it("should clear labels", () => {
      gridEngine.addLabels("player", ["label1", "label2", "label3"]);
      gridEngine.clearLabels("player");
      expect(gridEngine.getLabels("player")).toEqual([]);
    });

    it("should get all characters with specific labels", () => {
      gridEngine.create(createDefaultMockWithLayer(undefined), {
        characters: [
          {
            id: "player1",
            labels: ["label1", "label2"],
          },
          {
            id: "player2",
            labels: ["label2"],
          },
          {
            id: "player3",
            labels: [],
          },
        ],
      });

      expect(
        gridEngine.getAllCharacters({
          labels: { withOneOfLabels: ["label1", "label2"] },
        })
      ).toEqual(["player1", "player2"]);

      expect(
        gridEngine.getAllCharacters({
          labels: { withAllLabels: ["label1", "label2"] },
        })
      ).toEqual(["player1"]);

      expect(
        gridEngine.getAllCharacters({
          labels: { withNoneLabels: ["label1", "label2"] },
        })
      ).toEqual(["player3"]);

      expect(
        gridEngine.getAllCharacters({
          labels: {
            withAllLabels: ["label1", "label2"],
            withOneOfLabels: ["label1", "label2"],
            withNoneLabels: ["label1", "label2"],
          },
        })
      ).toEqual(["player1"]);

      expect(
        gridEngine.getAllCharacters({
          labels: {
            withOneOfLabels: ["label1", "label2"],
            withNoneLabels: ["label1", "label2"],
          },
        })
      ).toEqual(["player1", "player2"]);

      expect(
        gridEngine.getAllCharacters({
          labels: {
            withAllLabels: ["label1", "label2"],
            withNoneLabels: ["label1", "label2"],
          },
        })
      ).toEqual(["player1"]);
    });
  });

  describe("pathfinding", () => {
    it("should delegate to pathfinding", () => {
      gridEngine.create(createDefaultMockWithLayer(undefined), {
        characters: [
          {
            id: "player",
          },
        ],
      });
      const source = { position: { x: 1, y: 2 }, charLayer: "sourceCharLayer" };
      const dest = { position: { x: 10, y: 20 }, charLayer: "destCharLayer" };
      const options: PathfindingOptions = {
        pathWidth: 2,
        shortestPathAlgorithm: "BFS",
      };

      const mockRes = {
        path: [{ position: new Vector2(1, 2), layer: "sourceCharLayer" }],
        closestToTarget: {
          position: new Vector2(1, 2),
          layer: "sourceCharLayer",
        },
      };
      mockPathfinding.findShortestPath.mockReturnValue(mockRes);
      const res = gridEngine.findShortestPath(source, dest, options);
      expect(mockPathfinding.findShortestPath).toHaveBeenCalledWith(
        { position: new Vector2(1, 2), layer: "sourceCharLayer" },
        { position: new Vector2(10, 20), layer: "destCharLayer" },
        options
      );

      expect(res).toEqual({
        path: [source],
        closestToTarget: source,
        reachedMaxPathLength: false,
      });
    });
  });

  describe("QueueMovement", () => {
    const DEFAULT_QUEUE_CONFIG: QueueMovementConfig = {
      ignoreInvalidPositions: false,
      pathBlockedStrategy: QueuedPathBlockedStrategy.STOP,
      pathBlockedWaitTimeoutMs: -1,
      skipInvalidPositions: false,
    };

    it("should enqueue and finish", () => {
      const obs = jest.fn();

      gridEngine.queueMovementFinished().subscribe(obs);
      gridEngine.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);
      gridEngine.addQueueMovements("player", [
        { position: { x: 1, y: 1 }, charLayer: undefined },
      ]);
      gridEngine.addQueueMovements("player", [Direction.RIGHT]);

      expect(gridEngine.getEnqueuedMovements("player")).toEqual([
        {
          command: { position: { x: 1, y: 0 }, charLayer: undefined },
          config: DEFAULT_QUEUE_CONFIG,
        },
        {
          command: { position: { x: 1, y: 1 }, charLayer: undefined },
          config: DEFAULT_QUEUE_CONFIG,
        },
        { command: Direction.RIGHT, config: DEFAULT_QUEUE_CONFIG },
      ]);

      gridEngine.update(0, 500);
      expect(gridEngine.getEnqueuedMovements("player")).toEqual([
        {
          command: { position: { x: 1, y: 1 }, charLayer: undefined },
          config: DEFAULT_QUEUE_CONFIG,
        },
        { command: Direction.RIGHT, config: DEFAULT_QUEUE_CONFIG },
      ]);
      gridEngine.update(0, 500);
      expect(gridEngine.getEnqueuedMovements("player")).toEqual([
        {
          command: { position: { x: 1, y: 1 }, charLayer: undefined },
          config: DEFAULT_QUEUE_CONFIG,
        },
        { command: Direction.RIGHT, config: DEFAULT_QUEUE_CONFIG },
      ]);
      gridEngine.update(0, 500);
      gridEngine.update(0, 500);
      expect(gridEngine.getEnqueuedMovements("player")).toEqual([
        { command: Direction.RIGHT, config: DEFAULT_QUEUE_CONFIG },
      ]);
      gridEngine.update(0, 500);
      gridEngine.update(0, 500);

      expect(gridEngine.getEnqueuedMovements("player")).toEqual([]);

      expect(obs).toHaveBeenCalledWith({
        charId: "player",
        description: "",
        layer: undefined,
        position: {
          x: 2,
          y: 1,
        },
        result: "SUCCESS",
      });
    });

    it("should clear queue", () => {
      gridEngine.addCharacter({ id: "otherChar" });
      gridEngine.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
        Direction.RIGHT,
      ]);
      gridEngine.addQueueMovements("otherChar", [Direction.RIGHT]);

      expect(gridEngine.getEnqueuedMovements("player")).toHaveLength(2);

      gridEngine.clearEnqueuedMovements("player");

      expect(gridEngine.getEnqueuedMovements("player")).toHaveLength(0);
      expect(gridEngine.getEnqueuedMovements("otherChar")).toHaveLength(1);
    });

    it("should return empty queue if other movement set", () => {
      gridEngine.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);
      gridEngine.addQueueMovements("player", [Direction.RIGHT]);

      expect(gridEngine.getEnqueuedMovements("player")).toEqual([
        {
          command: { position: { x: 1, y: 0 }, charLayer: undefined },
          config: DEFAULT_QUEUE_CONFIG,
        },
        { command: Direction.RIGHT, config: DEFAULT_QUEUE_CONFIG },
      ]);

      gridEngine.moveTo("player", { x: 2, y: 0 });

      expect(gridEngine.getEnqueuedMovements("player")).toEqual([]);
    });

    it("should apply options", () => {
      const obs = jest.fn();

      gridEngine.queueMovementFinished().subscribe(obs);
      gridEngine.addQueueMovements(
        "player",
        [{ position: { x: 1, y: 1 }, charLayer: undefined }],
        { ignoreInvalidPositions: true }
      );
      gridEngine.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);

      gridEngine.update(0, 1000);

      expect(obs).toHaveBeenCalledWith({
        charId: "player",
        description: "",
        layer: undefined,
        position: {
          x: 1,
          y: 0,
        },
        result: "SUCCESS",
      });
    });

    it("should unsubscribe from finish on movement change", () => {
      const obs = jest.fn();

      gridEngine.queueMovementFinished().subscribe(obs);
      gridEngine.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);

      gridEngine.moveTo("player", { x: 1, y: 0 });
      expect(obs).toHaveBeenCalledWith(
        expect.objectContaining({
          charId: "player",
          result: "MOVEMENT_TERMINATED",
        })
      );

      obs.mockClear();
      gridEngine.update(0, 1000);

      expect(obs).not.toHaveBeenCalled();
    });

    it("should unsubscribe from finish on movement stop", () => {
      const obs = jest.fn();

      gridEngine.queueMovementFinished().subscribe(obs);
      gridEngine.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);

      gridEngine.stopMovement("player");
      expect(obs).toHaveBeenCalledWith(
        expect.objectContaining({
          charId: "player",
          result: "MOVEMENT_TERMINATED",
        })
      );

      obs.mockClear();

      gridEngine.update(0, 1000);
      expect(gridEngine.getPosition("player")).toEqual({ x: 0, y: 0 });

      expect(obs).not.toHaveBeenCalled();
    });

    it("should unsubscribe from finish on char remove", () => {
      const obs = jest.fn();

      gridEngine.queueMovementFinished().subscribe(obs);
      gridEngine.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);

      gridEngine.removeCharacter("player");
      gridEngine.update(0, 1000);

      expect(obs).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling unknown char id", () => {
    const UNKNOWN_CHAR_ID = "unknownCharId";

    function expectCharUnknownException(fn: () => any) {
      expect(() => fn()).toThrow("Character unknown");
    }

    it("should throw error if char id unknown", () => {
      expectCharUnknownException(() => gridEngine.getPosition(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() =>
        gridEngine.setPosition(UNKNOWN_CHAR_ID, new Vector2(1, 2))
      );
      expectCharUnknownException(() =>
        gridEngine.move(UNKNOWN_CHAR_ID, Direction.LEFT)
      );
      expectCharUnknownException(() =>
        gridEngine.moveRandomly(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.stopMovement(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() => gridEngine.setSpeed(UNKNOWN_CHAR_ID, 4));
      expectCharUnknownException(() =>
        gridEngine.moveTo(UNKNOWN_CHAR_ID, new Vector2(3, 4))
      );
      expectCharUnknownException(() =>
        gridEngine.removeCharacter(UNKNOWN_CHAR_ID)
      );

      expectCharUnknownException(() =>
        gridEngine.setWalkingAnimationMapping(UNKNOWN_CHAR_ID, <any>{})
      );
      expectCharUnknownException(() => gridEngine.isMoving(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() =>
        gridEngine.getMovementProgress(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.getFacingDirection(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.turnTowards(UNKNOWN_CHAR_ID, Direction.LEFT)
      );
      expectCharUnknownException(() =>
        gridEngine.setSprite(UNKNOWN_CHAR_ID, playerSpriteMock)
      );
      expectCharUnknownException(() => gridEngine.getSprite(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() =>
        gridEngine.getFacingPosition(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.getCharLayer(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.getCollisionGroups(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.setCollisionGroups(UNKNOWN_CHAR_ID, ["cGroup"])
      );
      expectCharUnknownException(() =>
        gridEngine.getWalkingAnimationMapping(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.collidesWithTiles(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() => gridEngine.getOffsetY(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() => gridEngine.getOffsetX(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() =>
        gridEngine.getContainer(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() => gridEngine.getSpeed(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() => gridEngine.getMovement(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() => gridEngine.getLabels(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() =>
        gridEngine.addLabels(UNKNOWN_CHAR_ID, ["label"])
      );
      expectCharUnknownException(() =>
        gridEngine.removeLabels(UNKNOWN_CHAR_ID, ["label"])
      );
      expectCharUnknownException(() => gridEngine.clearLabels(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() =>
        gridEngine.addQueueMovements(UNKNOWN_CHAR_ID, [])
      );
      expectCharUnknownException(() =>
        gridEngine.getEnqueuedMovements(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.clearEnqueuedMovements(UNKNOWN_CHAR_ID)
      );
    });

    it("should throw error if follow is invoked", () => {
      expect(() => gridEngine.follow("unknownCharId", "player")).toThrow(
        "Character unknown"
      );
      expect(() => gridEngine.follow("player", "unknownCharId")).toThrow(
        "Character unknown"
      );
      expect(() => gridEngine.follow("unknownCharId", "unknownCharId")).toThrow(
        "Character unknown"
      );
    });
  });

  describe("invokation of methods if not created properly", () => {
    const SOME_CHAR_ID = "someCharId";

    beforeEach(() => {
      gridEngine = new GridEngine(sceneMock);
    });

    function expectUninitializedException(fn: () => any) {
      expect(() => fn()).toThrow("GridEngine not initialized");
    }

    it("should throw error if plugin not created", () => {
      expectUninitializedException(() => gridEngine.getPosition(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.setPosition(SOME_CHAR_ID, new Vector2(1, 2))
      );
      expectUninitializedException(() =>
        gridEngine.move(SOME_CHAR_ID, Direction.LEFT)
      );
      expectUninitializedException(() => gridEngine.moveRandomly(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.moveTo(SOME_CHAR_ID, new Vector2(2, 3))
      );
      expectUninitializedException(() => gridEngine.stopMovement(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.setSpeed(SOME_CHAR_ID, 3));
      expectUninitializedException(() =>
        gridEngine.addCharacter({
          id: "player",
          sprite: playerSpriteMock,
        })
      );
      expectUninitializedException(() => gridEngine.hasCharacter(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.removeCharacter(SOME_CHAR_ID)
      );
      expectUninitializedException(() => gridEngine.removeAllCharacters());
      expectUninitializedException(() =>
        gridEngine.follow(SOME_CHAR_ID, "someOtherCharId")
      );
      expectUninitializedException(() =>
        gridEngine.setWalkingAnimationMapping(SOME_CHAR_ID, <any>{})
      );
      expectUninitializedException(() => gridEngine.isMoving(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.getMovementProgress(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngine.getFacingDirection(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngine.turnTowards(SOME_CHAR_ID, Direction.LEFT)
      );
      expectUninitializedException(() => gridEngine.getAllCharacters());
      expectUninitializedException(() =>
        gridEngine.setSprite(SOME_CHAR_ID, playerSpriteMock)
      );
      expectUninitializedException(() => gridEngine.getSprite(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.getFacingPosition(SOME_CHAR_ID)
      );
      expectUninitializedException(() => gridEngine.getCharLayer(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.getTransition(new Vector2({ x: 2, y: 2 }), "someLayer")
      );
      expectUninitializedException(() =>
        gridEngine.setTransition(
          new Vector2({ x: 2, y: 2 }),
          "fromLayer",
          "toLayer"
        )
      );
      expectUninitializedException(() =>
        gridEngine.isBlocked({ x: 2, y: 2 }, "someLayer")
      );
      expectUninitializedException(() =>
        gridEngine.isTileBlocked({ x: 2, y: 2 }, "someLayer")
      );
      expectUninitializedException(() =>
        gridEngine.getCollisionGroups(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngine.setCollisionGroups(SOME_CHAR_ID, ["cGroup"])
      );
      expectUninitializedException(() =>
        gridEngine.getWalkingAnimationMapping(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngine.collidesWithTiles(SOME_CHAR_ID)
      );
      expectUninitializedException(() => gridEngine.getOffsetY(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.getOffsetX(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.getContainer(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.getSpeed(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.getMovement(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.getLabels(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.addLabels(SOME_CHAR_ID, ["label"])
      );
      expectUninitializedException(() =>
        gridEngine.removeLabels(SOME_CHAR_ID, ["label"])
      );
      expectUninitializedException(() => gridEngine.clearLabels(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.getTilePosInDirection(
          { x: 2, y: 2 },
          undefined,
          Direction.DOWN
        )
      );
      expectUninitializedException(() =>
        gridEngine.findShortestPath(
          { position: { x: 2, y: 2 }, charLayer: undefined },
          { position: { x: 2, y: 2 }, charLayer: undefined }
        )
      );
      expectUninitializedException(() =>
        gridEngine.addQueueMovements(SOME_CHAR_ID, [])
      );
      expectUninitializedException(() =>
        gridEngine.getEnqueuedMovements(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngine.clearEnqueuedMovements(SOME_CHAR_ID)
      );
    });
  });

  it("logs version", () => {
    gridEngine = new GridEngine(sceneMock);

    expect(console.log).toHaveBeenCalledWith(
      "Using GridEngine vGRID.ENGINE.VERSION"
    );
  });

  it("should set/get offset", () => {
    const offsetX = 3;
    const offsetY = 4;
    gridEngine.create(createDefaultMockWithLayer(undefined), {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
    });
    gridEngine.setOffsetX("player", offsetX);
    gridEngine.setOffsetY("player", offsetY);
    expect(gridEngine.getOffsetX("player")).toEqual(offsetX);
    expect(gridEngine.getOffsetY("player")).toEqual(offsetY);
  });
});
