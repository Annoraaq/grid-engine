import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import { take } from "rxjs/operators";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { GridCharacter } from "./GridCharacter/GridCharacter";
import { Vector2 } from "./Utils/Vector2/Vector2";

const mockFollowMovement = {
  setCharacter: jest.fn(),
  update: jest.fn(),
  getInfo: jest.fn(),
};
const mockGridTileMap = {
  addCharacter: jest.fn(),
  removeCharacter: jest.fn(),
  getCharactersAt: jest.fn(),
  getTileWidth: () => 32,
  getTileSize: jest.fn().mockReturnValue(new Vector2(32, 32)),
  getTileHeight: () => 32,
  getTransition: jest.fn(),
  getTransitions: jest.fn().mockReturnValue(new Map()),
  setTransition: jest.fn(),
  isIsometric: jest.fn().mockReturnValue(false),
  hasBlockingTile: jest.fn().mockReturnValue(false),
  tilePosToPixelPos: jest.fn().mockReturnValue(new Vector2(0, 0)),
  toMapDirection: jest.fn(),
  hasBlockingChar: jest.fn().mockReturnValue(false),
  getDepthOfCharLayer: jest.fn().mockReturnValue(0),
  getTileDistance: jest.fn().mockReturnValue(new Vector2(1, 1)),
  isInRange: jest.fn(),
  getTilePosInDirection: jest.fn(),
  getGridTilemap: jest.fn(),
};
mockGridTileMap.getGridTilemap.mockReturnValue(mockGridTileMap);
const mockGridTilemapConstructor = jest.fn(function (
  _tilemap,
  _firstLayerAboveChar?
) {
  return mockGridTileMap;
});

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

jest.mock(
  "./GridEnginePhaser/GridTilemapPhaser/GridTilemapPhaser",
  function () {
    return {
      GridTilemapPhaser: mockGridTilemapConstructor,
    };
  }
);

jest.mock("./Pathfinding/Pathfinding", function () {
  return {
    Pathfinding: mockPathfindingConstructor,
  };
});

jest.mock("../package.json", () => ({
  version: "GRID.ENGINE.VERSION",
}));

import { GridEngine, GridEngineHeadless } from "./GridEngine";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import {
  createMockLayer,
  createMockLayerData,
  createSpriteMock,
  MockTilemap,
} from "./Utils/MockFactory/MockFactory";
import { PhaserTilemap } from "./GridTilemap/Phaser/PhaserTilemap";
import { GridTilemap } from "./GridTilemap/GridTilemap";
import { Tilemap } from "./GridTilemap/Tilemap";

describe("GridEngineHeadless", () => {
  let gridEngineHeadless: GridEngineHeadless;
  let sceneMock;
  let tileMapMock;
  let playerSpriteMock;
  let consoleLogBackup;

  afterEach(() => {
    console.log = consoleLogBackup;
    jest.clearAllMocks();
  });

  beforeEach(() => {
    consoleLogBackup = console.log;
    console.log = jest.fn();

    // hacky way of avoiding errors in Plugin Initialization because Phaser
    // is not mockable by jest
    sceneMock = {
      sys: { events: { once: jest.fn(), on: jest.fn() } },
      add: { sprite: jest.fn().mockReturnValue(mockNewSprite) },
    };
    tileMapMock = {
      getLayers: jest.fn(() => [
        createMockLayer({
          tilemapLayer: { scale: 2, setDepth: jest.fn() },
        }),
      ]),
      hasTileAt: jest.fn().mockReturnValue(true),
      getTileAt: jest.fn().mockReturnValue(true),
      tileWidth: 16,
      tileHeight: 16,
      getOrientation: jest.fn(() => "orthogonal"),
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
    mockFollowMovement.setCharacter.mockReset();
    mockFollowMovement.update.mockReset();
    mockGridTileMap.hasBlockingTile.mockReturnValue(false);
    mockGridTileMap.toMapDirection.mockReturnValue(Direction.LEFT);
    mockGridTileMap.getTransition.mockReturnValue(undefined);
    mockGridTileMap.isIsometric.mockReturnValue(false);

    gridEngineHeadless = new GridEngineHeadless();
    // gridEngineHeadless.create(tileMapMock, {
    //   characters: [
    //     {
    //       id: "player",
    //       sprite: playerSpriteMock,
    //       walkingAnimationMapping: 0,
    //     },
    //   ],
    // });
  });

  xit("should init tilemap", () => {
    //   gridEngineHeadless.create(tileMapMock, {
    //     characters: [
    //       {
    //         id: "player",
    //         sprite: playerSpriteMock,
    //       },
    //     ],
    //   });
    //   expect(mockGridTilemapConstructor).toHaveBeenCalledWith(
    //     new PhaserTilemap(tileMapMock),
    //     "ge_collide",
    //     CollisionStrategy.BLOCK_TWO_TILES
    //   );
  });

  it("should init player", () => {
    gridEngineHeadless.create(tileMapMock, {
      characters: [{ id: "player" }],
    });
    expect(gridEngineHeadless.hasCharacter("player")).toEqual(true);
    expect(gridEngineHeadless.getSpeed("player")).toEqual(4);
    expect(gridEngineHeadless.collidesWithTiles("player")).toEqual(true);
    expect(gridEngineHeadless.getCharLayer("player")).toEqual(undefined);
    expect(gridEngineHeadless.getCollisionGroups("player")).toEqual([
      "geDefault",
    ]);
    expect(gridEngineHeadless.getLabels("player")).toEqual([]);
  });

  it("should init player with collisionGroups", () => {
    gridEngineHeadless.create(tileMapMock, {
      characters: [
        {
          id: "player",
          collides: {
            collidesWithTiles: false,
            collisionGroups: ["cGroup1", "cGroup2"],
          },
        },
      ],
    });
    expect(gridEngineHeadless.collidesWithTiles("player")).toEqual(false);
    expect(gridEngineHeadless.getCollisionGroups("player")).toEqual([
      "cGroup1",
      "cGroup2",
    ]);
  });

  it("should init player with facingDirection", () => {
    gridEngineHeadless.create(tileMapMock, {
      characters: [
        {
          id: "player",
          facingDirection: Direction.LEFT,
        },
      ],
    });
    expect(gridEngineHeadless.getFacingDirection("player")).toEqual(
      Direction.LEFT
    );
  });

  it("should use config startPosition", () => {
    gridEngineHeadless.create(tileMapMock, {
      characters: [
        {
          id: "player",
          startPosition: new Vector2(3, 4),
        },
      ],
    });
    expect(gridEngineHeadless.getPosition("player")).toEqual(new Vector2(3, 4));
  });

  it("should use config speed", () => {
    gridEngineHeadless.create(tileMapMock, {
      characters: [
        {
          id: "player",
          speed: 2,
        },
      ],
    });
    expect(gridEngineHeadless.getSpeed("player")).toEqual(2);
  });

  describe("collision config", () => {
    it("should use config collides", () => {
      gridEngineHeadless.create(tileMapMock, {
        characters: [
          {
            id: "player",
            collides: false,
          },
        ],
      });
      expect(gridEngineHeadless.collidesWithTiles("player")).toEqual(false);
      expect(gridEngineHeadless.getCollisionGroups("player")).toEqual([]);
    });

    it("should use config collidesWithTiles true", () => {
      gridEngineHeadless.create(tileMapMock, {
        characters: [
          {
            id: "player",
            collides: {
              collidesWithTiles: true,
            },
          },
        ],
      });
      expect(gridEngineHeadless.collidesWithTiles("player")).toEqual(true);
      expect(gridEngineHeadless.getCollisionGroups("player")).toEqual([
        "geDefault",
      ]);
    });

    it("should use config collidesWithTiles false", () => {
      gridEngineHeadless.create(tileMapMock, {
        characters: [
          {
            id: "player",
            collides: {
              collidesWithTiles: false,
            },
          },
        ],
      });
      expect(gridEngineHeadless.collidesWithTiles("player")).toEqual(false);
      expect(gridEngineHeadless.getCollisionGroups("player")).toEqual([
        "geDefault",
      ]);
    });

    it("should use config collisionGroups", () => {
      gridEngineHeadless.create(tileMapMock, {
        characters: [
          {
            id: "player",
            collides: {
              collisionGroups: ["test"],
            },
          },
        ],
      });
      expect(gridEngineHeadless.collidesWithTiles("player")).toEqual(true);
      expect(gridEngineHeadless.getCollisionGroups("player")).toEqual(["test"]);
    });
  });

  it("should use config char layer", () => {
    gridEngineHeadless.create(tileMapMock, {
      characters: [
        {
          id: "player",
          startPosition: new Vector2(3, 4),
          charLayer: "someCharLayer",
        },
      ],
    });
    expect(gridEngineHeadless.getCharLayer("player")).toEqual("someCharLayer");
  });

  describe("move 4 dirs", () => {
    beforeEach(() => {
      gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
        characters: [{ id: "player" }],
      });
    });

    it("should move player orthogonally", () => {
      gridEngineHeadless.move("player", Direction.LEFT);

      expect(gridEngineHeadless.isMoving("player")).toBe(true);
      expect(gridEngineHeadless.getFacingDirection("player")).toBe(
        Direction.LEFT
      );
    });

    test.each([
      Direction.DOWN_LEFT,
      Direction.DOWN_RIGHT,
      Direction.UP_RIGHT,
      Direction.UP_LEFT,
    ])("should show warn on vertical move", (dir) => {
      console.warn = jest.fn();
      gridEngineHeadless.move("player", dir);
      expect(console.warn).toHaveBeenCalledWith(
        `GridEngine: Character 'player' can't be moved '${dir}' in 4 direction mode.`
      );
      expect(gridEngineHeadless.isMoving("player")).toBe(false);
    });
  });

  describe("move 8 dirs", () => {
    beforeEach(() => {
      gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
        characters: [{ id: "player" }],
        numberOfDirections: NumberOfDirections.EIGHT,
      });
    });

    it("should move player orthogonally", () => {
      gridEngineHeadless.move("player", Direction.LEFT);

      expect(gridEngineHeadless.isMoving("player")).toBe(true);
      expect(gridEngineHeadless.getFacingDirection("player")).toBe(
        Direction.LEFT
      );
    });

    it("should move player vertically", () => {
      gridEngineHeadless.move("player", Direction.UP_LEFT);

      expect(gridEngineHeadless.isMoving("player")).toBe(true);
      expect(gridEngineHeadless.getFacingDirection("player")).toBe(
        Direction.UP_LEFT
      );
    });
  });

  describe("move 4 dirs isometric", () => {
    beforeEach(() => {
      gridEngineHeadless.create(
        new MockTilemap([createMockLayer({})], "isometric"),
        { characters: [{ id: "player" }] }
      );
    });
    it("should move player vertically", () => {
      gridEngineHeadless.move("player", Direction.UP_LEFT);

      expect(gridEngineHeadless.isMoving("player")).toBe(true);
      expect(gridEngineHeadless.getFacingDirection("player")).toBe(
        Direction.UP_LEFT
      );
    });

    test.each([Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP])(
      "should show warn on orthogonal move",
      (dir) => {
        console.warn = jest.fn();

        gridEngineHeadless.move("player", dir);
        expect(console.warn).toHaveBeenCalledWith(
          `GridEngine: Character 'player' can't be moved '${dir}' in 4 direction isometric mode.`
        );
        expect(gridEngineHeadless.isMoving("player")).toBe(false);
      }
    );
  });

  it("should set tile position", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }],
    });
    gridEngineHeadless.setPosition("player", { x: 3, y: 4 }, "someOtherLayer");
    expect(gridEngineHeadless.getPosition("player")).toEqual({ x: 3, y: 4 });
    expect(gridEngineHeadless.getCharLayer("player")).toEqual("someOtherLayer");
  });

  it("should set tile position without layer", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }],
    });
    gridEngineHeadless.setPosition("player", { x: 3, y: 4 });

    expect(gridEngineHeadless.getPosition("player")).toEqual({ x: 3, y: 4 });
    expect(gridEngineHeadless.getCharLayer("player")).toBeUndefined();
  });

  it("should get facing position", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }],
    });
    gridEngineHeadless.turnTowards("player", Direction.RIGHT);
    expect(gridEngineHeadless.getFacingPosition("player")).toEqual({
      x: 1,
      y: 0,
    });
  });

  it("should move randomly", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }],
    });
    gridEngineHeadless.moveRandomly("player", 123, 3);
    expect(gridEngineHeadless.getMovement("player")).toEqual({
      type: "Random",
      config: {
        delay: 123,
        radius: 3,
      },
    });
  });

  describe("moveTo", () => {
    beforeEach(() => {
      gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
        characters: [{ id: "player" }],
      });
    });
    it("should move to coordinates", () => {
      console.warn = jest.fn();
      const targetVec = { position: new Vector2(3, 4), layer: "layer1" };
      gridEngineHeadless.moveTo("player", targetVec.position);
      expect(gridEngineHeadless.getMovement("player")).toEqual({
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
      gridEngineHeadless.moveTo("player", targetVec.position, {
        targetLayer: "layer1",
      });

      expect(gridEngineHeadless.getMovement("player")).toEqual({
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
      gridEngineHeadless.moveTo("player", targetVec).subscribe((finished) => {
        expect(finished).toEqual({
          charId: "player",
          position: new Vector2(0, 0),
          result: "NO_PATH_FOUND",
          description: "NoPathFoundStrategy STOP: No path found.",
          layer: undefined,
        });
        done();
      });
      gridEngineHeadless.update(2000, 1000);
    });

    it("should use backoff and retry", () => {
      const targetVec = new Vector2(3, 4);
      gridEngineHeadless.moveTo("player", targetVec, {
        noPathFoundRetryBackoffMs: 500,
        noPathFoundMaxRetries: 10,
      });
      expect(gridEngineHeadless.getMovement("player")).toEqual({
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
      gridEngineHeadless.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
      });
      expect(gridEngineHeadless.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }),
      });
    });

    it("should move to coordinates CLOSEST_REACHABLE", () => {
      const targetVec = new Vector2(3, 4);
      gridEngineHeadless.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      });
      expect(gridEngineHeadless.getMovement("player")).toEqual({
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
      gridEngineHeadless.moveTo("player", targetVec, {
        noPathFoundStrategy: <NoPathFoundStrategy>"unknown strategy",
      });
      expect(gridEngineHeadless.getMovement("player")).toEqual({
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
      gridEngineHeadless.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        pathBlockedStrategy: PathBlockedStrategy.WAIT,
      });
      expect(gridEngineHeadless.getMovement("player")).toEqual({
        type: "Target",
        config: expect.objectContaining({
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }),
      });
    });

    it("should use pathBlockedStrategy = RETRY", () => {
      const targetVec = new Vector2(3, 4);
      gridEngineHeadless.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        pathBlockedStrategy: PathBlockedStrategy.RETRY,
      });
      expect(gridEngineHeadless.getMovement("player")).toEqual({
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
      gridEngineHeadless.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        pathBlockedStrategy: <PathBlockedStrategy>"unknown strategy",
      });
      expect(gridEngineHeadless.getMovement("player")).toEqual({
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
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }],
    });
    gridEngineHeadless.stopMovement("player");
    expect(gridEngineHeadless.getMovement("player")).toEqual({ type: "None" });
  });

  it("should set speed", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }],
    });
    gridEngineHeadless.setSpeed("player", 2);
    expect(gridEngineHeadless.getSpeed("player")).toEqual(2);
  });

  it("should add chars on the go", () => {
    gridEngineHeadless.create(tileMapMock, {
      characters: [],
    });
    gridEngineHeadless.addCharacter({
      id: "player",
    });

    expect(gridEngineHeadless.hasCharacter("player")).toBe(true);
  });

  it("should remove chars on the go", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }],
    });

    expect(gridEngineHeadless.getPosition("player")).toEqual({ x: 0, y: 0 });
    expect(gridEngineHeadless.isBlocked({ x: 0, y: 0 }, undefined)).toBe(true);

    gridEngineHeadless.removeCharacter("player");
    gridEngineHeadless.update(123, 456);

    expect(gridEngineHeadless.isBlocked({ x: 0, y: 0 }, undefined)).toBe(false);
    expect(gridEngineHeadless.hasCharacter("player")).toBe(false);
  });

  it("should remove all chars", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [
        { id: "player", startPosition: { x: 1, y: 1 } },
        { id: "player2", startPosition: { x: 2, y: 2 } },
      ],
    });
    expect(gridEngineHeadless.isBlocked({ x: 1, y: 1 }, undefined)).toBe(true);
    expect(gridEngineHeadless.isBlocked({ x: 2, y: 2 }, undefined)).toBe(true);

    gridEngineHeadless.removeAllCharacters();
    gridEngineHeadless.update(123, 456);

    expect(gridEngineHeadless.isBlocked({ x: 1, y: 1 }, undefined)).toBe(false);
    expect(gridEngineHeadless.isBlocked({ x: 2, y: 2 }, undefined)).toBe(false);
    expect(gridEngineHeadless.getAllCharacters().length).toEqual(0);
  });

  it("should get all chars", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }, { id: "player2" }],
    });
    const chars = gridEngineHeadless.getAllCharacters();
    expect(chars).toEqual(["player", "player2"]);
  });

  it("should get all chars at position", () => {
    gridEngineHeadless.create(tileMapMock, {
      characters: [
        {
          id: "player",
          startPosition: { x: 5, y: 4 },
          charLayer: "layer",
        },
      ],
    });
    const chars = gridEngineHeadless.getCharactersAt({ x: 5, y: 4 }, "layer");
    expect(chars).toEqual(["player"]);
  });

  it("should check if char is registered", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }],
    });
    gridEngineHeadless.addCharacter({
      id: "player2",
    });
    expect(gridEngineHeadless.hasCharacter("player")).toBe(true);
    expect(gridEngineHeadless.hasCharacter("player2")).toBe(true);
    expect(gridEngineHeadless.hasCharacter("unknownCharId")).toBe(false);
  });

  // it("should follow a char", () => {
  //   gridEngine.create(tileMapMock, {
  //     characters: [
  //       {
  //         id: "player",
  //         sprite: playerSpriteMock,
  //       },
  //       {
  //         id: "player2",
  //         sprite: playerSpriteMock,
  //       },
  //     ],
  //   });
  //   gridEngine.follow("player", "player2", 7, true);

  //   expect(gridEngine.getMovement("player")).toEqual({
  //     type: "Follow",
  //     config: {
  //       charToFollow: "player2",
  //       distance: 7,
  //       noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
  //     },
  //   });
  // });

  // it("should follow a char with default distance", () => {
  //   gridEngine.create(tileMapMock, {
  //     characters: [
  //       {
  //         id: "player",
  //         sprite: playerSpriteMock,
  //       },
  //       {
  //         id: "player2",
  //         sprite: playerSpriteMock,
  //       },
  //     ],
  //   });

  //   gridEngine.follow("player", "player2");

  //   expect(gridEngine.getMovement("player")).toEqual({
  //     type: "Follow",
  //     config: {
  //       charToFollow: "player2",
  //       distance: 0,
  //       noPathFoundStrategy: NoPathFoundStrategy.STOP,
  //     },
  //   });
  // });

  // it("should set walkingAnimationMapping", () => {
  //   const walkingAnimationMappingMock = <any>{};
  //   gridEngine.setWalkingAnimationMapping(
  //     "player",
  //     walkingAnimationMappingMock
  //   );

  //   expect(gridEngine.getWalkingAnimationMapping("player")).toEqual(
  //     walkingAnimationMappingMock
  //   );
  // });

  // it("should set walkingAnimationMapping after setting char index", () => {
  //   const walkingAnimationMappingMock = <any>{};
  //   gridEngine.setWalkingAnimationMapping("player", 1);
  //   gridEngine.setWalkingAnimationMapping(
  //     "player",
  //     walkingAnimationMappingMock
  //   );

  //   expect(gridEngine.getWalkingAnimationMapping("player")).toEqual(
  //     walkingAnimationMappingMock
  //   );
  // });

  // it("should set characterIndex", () => {
  //   gridEngine.setWalkingAnimationMapping("player", 3);
  //   expect(gridEngine.getWalkingAnimationMapping("player")).toEqual(3);
  // });

  // it("should delegate getFacingDirection", () => {
  //   gridEngine.turnTowards("player", Direction.LEFT);
  //   const facingDirection = gridEngine.getFacingDirection("player");
  //   expect(facingDirection).toEqual(Direction.LEFT);
  // });

  // it("should delegate getTransition", () => {
  //   mockGridTileMap.getTransition.mockReturnValue("someLayer");
  //   expect(gridEngine.getTransition({ x: 3, y: 4 }, "fromLayer")).toEqual(
  //     "someLayer"
  //   );
  // });

  // it("should delegate setTransition", () => {
  //   gridEngine.setTransition({ x: 3, y: 4 }, "fromLayer", "toLayer");
  //   expect(mockGridTileMap.setTransition).toHaveBeenCalledWith(
  //     { x: 3, y: 4 },
  //     "fromLayer",
  //     "toLayer"
  //   );
  // });

  // it("should block if tile is blocking", () => {
  //   mockGridTileMap.hasBlockingTile.mockReturnValue(true);
  //   mockGridTileMap.hasBlockingChar.mockReturnValue(false);
  //   const result = gridEngine.isBlocked({ x: 3, y: 4 }, "someLayer", [
  //     "cGroup",
  //   ]);
  //   expect(mockGridTileMap.hasBlockingTile).toHaveBeenCalledWith(
  //     new Vector2(3, 4),
  //     "someLayer"
  //   );
  //   expect(result).toBe(true);
  // });

  // it("should block if char is blocking", () => {
  //   mockGridTileMap.hasBlockingTile.mockReturnValue(false);
  //   mockGridTileMap.hasBlockingChar.mockReturnValue(true);
  //   const result = gridEngine.isBlocked({ x: 3, y: 4 }, "someLayer", [
  //     "cGroup",
  //   ]);
  //   expect(mockGridTileMap.hasBlockingChar).toHaveBeenCalledWith(
  //     new Vector2(3, 4),
  //     "someLayer",
  //     ["cGroup"]
  //   );
  //   expect(result).toBe(true);
  // });

  // it("should not block", () => {
  //   mockGridTileMap.hasBlockingTile.mockReturnValue(false);
  //   mockGridTileMap.hasBlockingChar.mockReturnValue(false);
  //   const result = gridEngine.isBlocked({ x: 3, y: 4 }, "someLayer", [
  //     "cGroup",
  //   ]);
  //   expect(mockGridTileMap.hasBlockingChar).toHaveBeenCalledWith(
  //     new Vector2(3, 4),
  //     "someLayer",
  //     ["cGroup"]
  //   );
  //   expect(result).toBe(false);
  // });

  // it("should check blocking with default cGroup", () => {
  //   gridEngine.isBlocked({ x: 3, y: 4 }, "someLayer");
  //   expect(mockGridTileMap.hasBlockingChar).toHaveBeenCalledWith(
  //     new Vector2(3, 4),
  //     "someLayer",
  //     ["geDefault"]
  //   );
  // });

  // it("should delegate isTilemapBlocking", () => {
  //   const result = gridEngine.isTileBlocked({ x: 3, y: 4 }, "someLayer");
  //   expect(mockGridTileMap.hasBlockingTile).toHaveBeenCalledWith(
  //     new Vector2(3, 4),
  //     "someLayer"
  //   );
  //   expect(result).toBe(false);
  // });

  // it("should delegate getCollisionGroups", () => {
  //   const collisionGroups = ["someCG"];
  //   gridEngine.setCollisionGroups("player", collisionGroups);
  //   expect(gridEngine.getCollisionGroups("player")).toEqual(collisionGroups);
  // });

  // it("should get tile pos in direction", () => {
  //   const pos = { x: 5, y: 6 };
  //   const layer = "charLayer1";
  //   const mockedTileInPos = {
  //     position: new Vector2(10, 10),
  //     layer: "someLayer",
  //   };
  //   mockGridTileMap.getTilePosInDirection.mockReturnValue(mockedTileInPos);

  //   const tilePosInDir = gridEngine.getTilePosInDirection(
  //     pos,
  //     layer,
  //     Direction.LEFT
  //   );

  //   expect(tilePosInDir).toEqual({
  //     position: { x: 10, y: 10 },
  //     charLayer: "someLayer",
  //   });
  //   expect(mockGridTileMap.getTilePosInDirection).toHaveBeenCalledWith(
  //     { position: new Vector2(5, 6), layer: "charLayer1" },
  //     Direction.LEFT
  //   );
  // });

  // describe("Observables", () => {
  //   it("should get chars movementStarted observable", async () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });
  //     const prom = gridEngine.movementStarted().pipe(take(1)).toPromise();

  //     gridEngine.move("player", Direction.LEFT);

  //     const res = await prom;
  //     expect(res).toEqual({ charId: "player", direction: Direction.LEFT });
  //   });

  //   it("should unsubscribe from movementStarted if char removed", () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });

  //     const nextMock = jest.fn();
  //     gridEngine.movementStarted().subscribe({
  //       complete: jest.fn(),
  //       next: nextMock,
  //     });

  //     gridEngine.move("player", Direction.LEFT);
  //     gridEngine.update(2000, 100);
  //     gridEngine.move("player", Direction.DOWN);
  //     gridEngine.removeCharacter("player");
  //     gridEngine.update(2000, 3000);

  //     expect(nextMock).toHaveBeenCalledTimes(1);
  //   });

  //   it("should get chars movementStopped observable", async () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });

  //     const prom = gridEngine.movementStopped().pipe(take(1)).toPromise();
  //     gridEngine.move("player", Direction.LEFT);
  //     gridEngine.update(2000, 1000);
  //     gridEngine.update(2000, 1000);

  //     expect(await prom).toEqual({
  //       charId: "player",
  //       direction: Direction.LEFT,
  //     });
  //   });

  //   it("should unsubscribe from movementStopped if char removed", () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });

  //     const nextMock = jest.fn();
  //     gridEngine.movementStopped().subscribe({
  //       complete: jest.fn(),
  //       next: nextMock,
  //     });

  //     gridEngine.move("player", Direction.LEFT);
  //     gridEngine.removeCharacter("player");
  //     gridEngine.update(2000, 1000);
  //     gridEngine.update(2000, 1000);

  //     expect(nextMock).not.toHaveBeenCalled();
  //   });

  //   it("should get chars directionChanged observable", async () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });

  //     const prom = gridEngine.directionChanged().pipe(take(1)).toPromise();

  //     mockGridTileMap.hasBlockingTile.mockReturnValue(true);
  //     gridEngine.move("player", Direction.LEFT);

  //     expect(await prom).toEqual({
  //       charId: "player",
  //       direction: Direction.LEFT,
  //     });
  //   });

  //   it("should get chars positionChangeStarted observable", async () => {
  //     mockGridTileMap.toMapDirection.mockReturnValue(Direction.LEFT);
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });

  //     const prom = gridEngine.positionChangeStarted().pipe(take(1)).toPromise();

  //     gridEngine.move("player", Direction.LEFT);

  //     expect(await prom).toEqual({
  //       charId: "player",
  //       exitTile: new Vector2(0, 0),
  //       enterTile: new Vector2(-1, 0),
  //       enterLayer: undefined,
  //       exitLayer: undefined,
  //     });
  //   });

  //   it("should get chars positionChangeFinished observable", async () => {
  //     mockGridTileMap.toMapDirection.mockReturnValue(Direction.LEFT);
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });

  //     const prom = gridEngine
  //       .positionChangeFinished()
  //       .pipe(take(1))
  //       .toPromise();

  //     gridEngine.move("player", Direction.LEFT);
  //     gridEngine.update(2000, 1000);
  //     gridEngine.update(2000, 1000);

  //     const res = await prom;
  //     expect(res).toEqual({
  //       charId: "player",
  //       exitTile: new Vector2(0, 0),
  //       enterTile: new Vector2(-1, 0),
  //       enterLayer: undefined,
  //       exitLayer: undefined,
  //     });
  //   });

  //   it("should emit when a character is added or removed", () => {
  //     const player1 = "player1";
  //     const player2 = "player2";
  //     const nextMock = jest.fn();

  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: player1,
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });

  //     gridEngine.characterShifted().subscribe({
  //       complete: jest.fn(),
  //       next: nextMock,
  //     });

  //     gridEngine.addCharacter({ id: player2, sprite: playerSpriteMock });
  //     expect(nextMock).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         charId: player2,
  //         action: "ADDED",
  //       })
  //     );

  //     gridEngine.removeCharacter(player1);
  //     expect(nextMock).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         charId: player1,
  //         action: "REMOVED",
  //       })
  //     );

  //     gridEngine.addCharacter({ id: player1, sprite: playerSpriteMock });
  //     expect(nextMock).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         charId: player1,
  //         action: "ADDED",
  //       })
  //     );
  //   });

  //   describe("steppedOn", () => {
  //     let nextMock;
  //     const player = "player1";
  //     const nonMatchingChar = "non matching char";
  //     const expectedLayer = "anyLayer";
  //     const expectedTargetPosition = new Vector2(5, 5);
  //     beforeEach(() => {
  //       nextMock = jest.fn();
  //       gridEngine.create(tileMapMock, {
  //         characters: [
  //           {
  //             id: player,
  //             sprite: playerSpriteMock,
  //           },
  //           {
  //             id: nonMatchingChar,
  //             sprite: playerSpriteMock,
  //           },
  //         ],
  //       });
  //       gridEngine
  //         .steppedOn([player], [expectedTargetPosition], [expectedLayer])
  //         .subscribe({
  //           complete: jest.fn(),
  //           next: nextMock,
  //         });
  //     });

  //     it("should notify if character stepped on tile", () => {
  //       gridEngine.setPosition(player, new Vector2(4, 5), expectedLayer);
  //       mockGridTileMap.toMapDirection.mockReturnValue(Direction.RIGHT);
  //       gridEngine.move(player, Direction.RIGHT);
  //       gridEngine.update(2000, 300);

  //       expect(nextMock).toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           enterTile: expectedTargetPosition,
  //         })
  //       );
  //     });

  //     it("should not notify if character stepped on tile with non matching layer", () => {
  //       gridEngine.setPosition(player, new Vector2(4, 5), "not matching layer");
  //       gridEngine.move(player, Direction.RIGHT);
  //       gridEngine.update(2000, 300);

  //       expect(nextMock).not.toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           enterTile: expectedTargetPosition,
  //         })
  //       );
  //     });

  //     it("should not notify if character stepped on tile with non matching char", () => {
  //       gridEngine.setPosition(
  //         nonMatchingChar,
  //         new Vector2(4, 5),
  //         expectedLayer
  //       );
  //       gridEngine.move(nonMatchingChar, Direction.RIGHT);
  //       gridEngine.update(2000, 300);

  //       expect(nextMock).not.toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           enterTile: expectedTargetPosition,
  //         })
  //       );
  //     });

  //     it("should not notify if character stepped on tile with non matching tile", () => {
  //       gridEngine.setPosition(
  //         player,
  //         new Vector2(10, 10), // non matching tile
  //         expectedLayer
  //       );
  //       gridEngine.move(player, Direction.RIGHT);
  //       gridEngine.update(2000, 300);

  //       expect(nextMock).not.toHaveBeenCalledWith(
  //         expect.objectContaining({
  //           enterTile: expectedTargetPosition,
  //         })
  //       );
  //     });
  //   });

  //   it("should unsubscribe from positionChangeFinished if char removed", () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           sprite: playerSpriteMock,
  //         },
  //       ],
  //     });

  //     const nextMock = jest.fn();
  //     gridEngine.positionChangeFinished().subscribe({
  //       complete: jest.fn(),
  //       next: nextMock,
  //     });

  //     gridEngine.move("player", Direction.LEFT);
  //     gridEngine.removeCharacter("player");
  //     gridEngine.update(2000, 1000);
  //     gridEngine.update(2000, 1000);
  //     expect(nextMock).not.toHaveBeenCalled();
  //   });
  // });

  // describe("labels", () => {
  //   it("should add labels on creation", () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //           labels: ["someLabel", "someOtherLabel"],
  //         },
  //       ],
  //     });
  //     expect(gridEngine.getLabels("player")).toEqual([
  //       "someLabel",
  //       "someOtherLabel",
  //     ]);
  //   });

  //   it("should add labels", () => {
  //     expect(gridEngine.getLabels("player")).toEqual([]);
  //     gridEngine.addLabels("player", ["someLabel", "someOtherLabel"]);
  //     expect(gridEngine.getLabels("player")).toEqual([
  //       "someLabel",
  //       "someOtherLabel",
  //     ]);
  //   });

  //   it("should remove labels", () => {
  //     expect(gridEngine.getLabels("player")).toEqual([]);
  //     gridEngine.addLabels("player", ["label1", "label2", "label3"]);
  //     gridEngine.removeLabels("player", ["label1", "label3"]);
  //     expect(gridEngine.getLabels("player")).toEqual(["label2"]);
  //   });

  //   it("should clear labels", () => {
  //     gridEngine.addLabels("player", ["label1", "label2", "label3"]);
  //     gridEngine.clearLabels("player");
  //     expect(gridEngine.getLabels("player")).toEqual([]);
  //   });

  //   it("should get all characters with specific labels", () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player1",
  //           labels: ["label1", "label2"],
  //         },
  //         {
  //           id: "player2",
  //           labels: ["label2"],
  //         },
  //         {
  //           id: "player3",
  //           labels: [],
  //         },
  //       ],
  //     });

  //     expect(
  //       gridEngine.getAllCharacters({
  //         labels: { withOneOfLabels: ["label1", "label2"] },
  //       })
  //     ).toEqual(["player1", "player2"]);

  //     expect(
  //       gridEngine.getAllCharacters({
  //         labels: { withAllLabels: ["label1", "label2"] },
  //       })
  //     ).toEqual(["player1"]);

  //     expect(
  //       gridEngine.getAllCharacters({
  //         labels: { withNoneLabels: ["label1", "label2"] },
  //       })
  //     ).toEqual(["player3"]);

  //     expect(
  //       gridEngine.getAllCharacters({
  //         labels: {
  //           withAllLabels: ["label1", "label2"],
  //           withOneOfLabels: ["label1", "label2"],
  //           withNoneLabels: ["label1", "label2"],
  //         },
  //       })
  //     ).toEqual(["player1"]);

  //     expect(
  //       gridEngine.getAllCharacters({
  //         labels: {
  //           withOneOfLabels: ["label1", "label2"],
  //           withNoneLabels: ["label1", "label2"],
  //         },
  //       })
  //     ).toEqual(["player1", "player2"]);

  //     expect(
  //       gridEngine.getAllCharacters({
  //         labels: {
  //           withAllLabels: ["label1", "label2"],
  //           withNoneLabels: ["label1", "label2"],
  //         },
  //       })
  //     ).toEqual(["player1"]);
  //   });
  // });

  // describe("pathfinding", () => {
  //   it("should delegate to pathfinding", () => {
  //     gridEngine.create(tileMapMock, {
  //       characters: [
  //         {
  //           id: "player",
  //         },
  //       ],
  //     });
  //     const source = { position: { x: 1, y: 2 }, charLayer: "sourceCharLayer" };
  //     const dest = { position: { x: 10, y: 20 }, charLayer: "destCharLayer" };
  //     const options = { pathWidth: 2 };

  //     const mockRes = {
  //       path: [{ position: new Vector2(1, 2), layer: "sourceCharLayer" }],
  //       closestToTarget: {
  //         position: new Vector2(1, 2),
  //         layer: "sourceCharLayer",
  //       },
  //     };
  //     mockPathfinding.findShortestPath.mockReturnValue(mockRes);
  //     const res = gridEngine.findShortestPath(source, dest, options);
  //     expect(mockPathfinding.findShortestPath).toHaveBeenCalledWith(
  //       { position: new Vector2(1, 2), layer: "sourceCharLayer" },
  //       { position: new Vector2(10, 20), layer: "destCharLayer" },
  //       options
  //     );

  //     expect(res).toEqual({
  //       path: [source],
  //       closestToTarget: source,
  //     });
  //   });
  // });

  // describe("Error Handling unknown char id", () => {
  //   const UNKNOWN_CHAR_ID = "unknownCharId";

  //   function expectCharUnknownException(fn: () => any) {
  //     expect(() => fn()).toThrow("Character unknown");
  //   }

  //   it("should throw error if char id unknown", () => {
  //     expectCharUnknownException(() => gridEngine.getPosition(UNKNOWN_CHAR_ID));
  //     expectCharUnknownException(() =>
  //       gridEngine.setPosition(UNKNOWN_CHAR_ID, new Vector2(1, 2))
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.move(UNKNOWN_CHAR_ID, Direction.LEFT)
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.moveRandomly(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.stopMovement(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() => gridEngine.setSpeed(UNKNOWN_CHAR_ID, 4));
  //     expectCharUnknownException(() =>
  //       gridEngine.moveTo(UNKNOWN_CHAR_ID, new Vector2(3, 4))
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.removeCharacter(UNKNOWN_CHAR_ID)
  //     );

  //     expectCharUnknownException(() =>
  //       gridEngine.setWalkingAnimationMapping(UNKNOWN_CHAR_ID, <any>{})
  //     );
  //     expectCharUnknownException(() => gridEngine.isMoving(UNKNOWN_CHAR_ID));
  //     expectCharUnknownException(() =>
  //       gridEngine.getFacingDirection(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.turnTowards(UNKNOWN_CHAR_ID, Direction.LEFT)
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.setSprite(UNKNOWN_CHAR_ID, playerSpriteMock)
  //     );
  //     expectCharUnknownException(() => gridEngine.getSprite(UNKNOWN_CHAR_ID));
  //     expectCharUnknownException(() =>
  //       gridEngine.getFacingPosition(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.getCharLayer(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.getCollisionGroups(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.setCollisionGroups(UNKNOWN_CHAR_ID, ["cGroup"])
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.getWalkingAnimationMapping(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.collidesWithTiles(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() => gridEngine.getOffsetY(UNKNOWN_CHAR_ID));
  //     expectCharUnknownException(() => gridEngine.getOffsetX(UNKNOWN_CHAR_ID));
  //     expectCharUnknownException(() =>
  //       gridEngine.getContainer(UNKNOWN_CHAR_ID)
  //     );
  //     expectCharUnknownException(() => gridEngine.getSpeed(UNKNOWN_CHAR_ID));
  //     expectCharUnknownException(() => gridEngine.getMovement(UNKNOWN_CHAR_ID));
  //     expectCharUnknownException(() => gridEngine.getLabels(UNKNOWN_CHAR_ID));
  //     expectCharUnknownException(() =>
  //       gridEngine.addLabels(UNKNOWN_CHAR_ID, ["label"])
  //     );
  //     expectCharUnknownException(() =>
  //       gridEngine.removeLabels(UNKNOWN_CHAR_ID, ["label"])
  //     );
  //     expectCharUnknownException(() => gridEngine.clearLabels(UNKNOWN_CHAR_ID));
  //   });

  //   it("should throw error if follow is invoked", () => {
  //     expect(() => gridEngine.follow("unknownCharId", "player")).toThrow(
  //       "Character unknown"
  //     );
  //     expect(() => gridEngine.follow("player", "unknownCharId")).toThrow(
  //       "Character unknown"
  //     );
  //     expect(() => gridEngine.follow("unknownCharId", "unknownCharId")).toThrow(
  //       "Character unknown"
  //     );
  //   });
  // });

  // describe("invokation of methods if not created properly", () => {
  //   const SOME_CHAR_ID = "someCharId";

  //   beforeEach(() => {
  //     gridEngine = new GridEngine(sceneMock);
  //   });

  //   function expectUninitializedException(fn: () => any) {
  //     expect(() => fn()).toThrow("Plugin not initialized");
  //   }

  //   it("should throw error if plugin not created", () => {
  //     expectUninitializedException(() => gridEngine.getPosition(SOME_CHAR_ID));
  //     expectUninitializedException(() =>
  //       gridEngine.setPosition(SOME_CHAR_ID, new Vector2(1, 2))
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.move(SOME_CHAR_ID, Direction.LEFT)
  //     );
  //     expectUninitializedException(() => gridEngine.moveRandomly(SOME_CHAR_ID));
  //     expectUninitializedException(() =>
  //       gridEngine.moveTo(SOME_CHAR_ID, new Vector2(2, 3))
  //     );
  //     expectUninitializedException(() => gridEngine.stopMovement(SOME_CHAR_ID));
  //     expectUninitializedException(() => gridEngine.setSpeed(SOME_CHAR_ID, 3));
  //     expectUninitializedException(() =>
  //       gridEngine.addCharacter({
  //         id: "player",
  //         sprite: playerSpriteMock,
  //       })
  //     );
  //     expectUninitializedException(() => gridEngine.hasCharacter(SOME_CHAR_ID));
  //     expectUninitializedException(() =>
  //       gridEngine.removeCharacter(SOME_CHAR_ID)
  //     );
  //     expectUninitializedException(() => gridEngine.removeAllCharacters());
  //     expectUninitializedException(() =>
  //       gridEngine.follow(SOME_CHAR_ID, "someOtherCharId")
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.setWalkingAnimationMapping(SOME_CHAR_ID, <any>{})
  //     );
  //     expectUninitializedException(() => gridEngine.isMoving(SOME_CHAR_ID));
  //     expectUninitializedException(() =>
  //       gridEngine.getFacingDirection(SOME_CHAR_ID)
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.turnTowards(SOME_CHAR_ID, Direction.LEFT)
  //     );
  //     expectUninitializedException(() => gridEngine.getAllCharacters());
  //     expectUninitializedException(() =>
  //       gridEngine.setSprite(SOME_CHAR_ID, playerSpriteMock)
  //     );
  //     expectUninitializedException(() => gridEngine.getSprite(SOME_CHAR_ID));
  //     expectUninitializedException(() =>
  //       gridEngine.getFacingPosition(SOME_CHAR_ID)
  //     );
  //     expectUninitializedException(() => gridEngine.getCharLayer(SOME_CHAR_ID));
  //     expectUninitializedException(() =>
  //       gridEngine.getTransition(new Vector2({ x: 2, y: 2 }), "someLayer")
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.setTransition(
  //         new Vector2({ x: 2, y: 2 }),
  //         "fromLayer",
  //         "toLayer"
  //       )
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.isBlocked({ x: 2, y: 2 }, "someLayer")
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.isTileBlocked({ x: 2, y: 2 }, "someLayer")
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.getCollisionGroups(SOME_CHAR_ID)
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.setCollisionGroups(SOME_CHAR_ID, ["cGroup"])
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.getWalkingAnimationMapping(SOME_CHAR_ID)
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.collidesWithTiles(SOME_CHAR_ID)
  //     );
  //     expectUninitializedException(() => gridEngine.getOffsetY(SOME_CHAR_ID));
  //     expectUninitializedException(() => gridEngine.getOffsetX(SOME_CHAR_ID));
  //     expectUninitializedException(() => gridEngine.getContainer(SOME_CHAR_ID));
  //     expectUninitializedException(() => gridEngine.getSpeed(SOME_CHAR_ID));
  //     expectUninitializedException(() => gridEngine.getMovement(SOME_CHAR_ID));
  //     expectUninitializedException(() => gridEngine.getLabels(SOME_CHAR_ID));
  //     expectUninitializedException(() =>
  //       gridEngine.addLabels(SOME_CHAR_ID, ["label"])
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.removeLabels(SOME_CHAR_ID, ["label"])
  //     );
  //     expectUninitializedException(() => gridEngine.clearLabels(SOME_CHAR_ID));
  //     expectUninitializedException(() =>
  //       gridEngine.getTilePosInDirection(
  //         { x: 2, y: 2 },
  //         undefined,
  //         Direction.DOWN
  //       )
  //     );
  //     expectUninitializedException(() =>
  //       gridEngine.findShortestPath(
  //         { position: { x: 2, y: 2 }, charLayer: undefined },
  //         { position: { x: 2, y: 2 }, charLayer: undefined }
  //       )
  //     );
  //   });
  // });

  // it("logs version", () => {
  //   gridEngine = new GridEngine(sceneMock);

  //   expect(console.log).toHaveBeenCalledWith(
  //     "Using GridEngine vGRID.ENGINE.VERSION"
  //   );
  // });
});
