import { take } from "rxjs/operators";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { GridCharacter } from "./GridCharacter/GridCharacter";
import { Vector2 } from "./Utils/Vector2/Vector2";

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

jest.mock("../package.json", () => ({
  version: "GRID.ENGINE.VERSION",
}));

import { GridEngineHeadless } from "./GridEngine";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import {
  createMockLayer,
  mockBlockMap,
  updateLayer,
} from "./Utils/MockFactory/MockFactory";
import { MockTilemap } from "./Utils/MockFactory/MockTilemap";

describe("GridEngineHeadless", () => {
  let gridEngineHeadless: GridEngineHeadless;
  let consoleLogBackup;

  afterEach(() => {
    console.log = consoleLogBackup;
    jest.clearAllMocks();
  });

  beforeEach(() => {
    consoleLogBackup = console.log;
    gridEngineHeadless = new GridEngineHeadless();
  });

  it("should init player", () => {
    createDefaultGridEngine();
    expect(gridEngineHeadless.hasCharacter("player")).toEqual(true);
    expect(gridEngineHeadless.getSpeed("player")).toEqual(4);
    expect(gridEngineHeadless.collidesWithTiles("player")).toEqual(true);
    expect(gridEngineHeadless.getCharLayer("player")).toEqual(undefined);
    expect(gridEngineHeadless.getCollisionGroups("player")).toEqual([
      "geDefault",
    ]);
    expect(gridEngineHeadless.getLabels("player")).toEqual([]);
    expect(gridEngineHeadless.getMovementProgress("player")).toEqual(0);
  });

  it("should init player with collisionGroups", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
      gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
      gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
      gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
      gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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

  it("uses tile collision cache", () => {
    const tm = mockBlockMap([
      // prettier-ignore
      "#.",
      ".#",
    ]);
    gridEngineHeadless.create(tm, {
      characters: [{ id: "player", startPosition: { x: 1, y: 1 } }],
      cacheTileCollisions: true,
    });
    expect(gridEngineHeadless.isTileBlocked({ x: 0, y: 0 })).toBe(true);
    expect(gridEngineHeadless.isTileBlocked({ x: 1, y: 1 })).toBe(true);

    updateLayer(tm, [
      // prettier-ignore
      "..",
      "..",
    ]);
    expect(gridEngineHeadless.isTileBlocked({ x: 0, y: 0 })).toBe(true);
    expect(gridEngineHeadless.isTileBlocked({ x: 1, y: 1 })).toBe(true);

    gridEngineHeadless.rebuildTileCollisionCache(0, 0, 1, 1);

    expect(gridEngineHeadless.isTileBlocked({ x: 0, y: 0 })).toBe(false);
    expect(gridEngineHeadless.isTileBlocked({ x: 1, y: 1 })).toBe(true);
  });

  describe("move 4 dirs", () => {
    beforeEach(() => {
      gridEngineHeadless.create(
        // prettier-ignore
        mockBlockMap([
        "...",
        "...",
        "...",
      ]),
        { characters: [{ id: "player", startPosition: { x: 1, y: 1 } }] }
      );
    });

    it("should return the movement progress", () => {
      const speed = 4;
      const halfWayMs = 1000 / speed / 2;
      gridEngineHeadless.move("player", Direction.LEFT);
      gridEngineHeadless.update(1000, halfWayMs);
      expect(gridEngineHeadless.getMovementProgress("player")).toEqual(500);
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
      gridEngineHeadless.create(
        // prettier-ignore
        mockBlockMap([
        "...",
        "...",
        "...",
      ]),
        {
          characters: [{ id: "player", startPosition: { x: 1, y: 1 } }],
          numberOfDirections: NumberOfDirections.EIGHT,
        }
      );
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
        // prettier-ignore
        mockBlockMap([
        "...",
        "...",
        "...",
      ], undefined, true),
        {
          characters: [{ id: "player", startPosition: { x: 1, y: 1 } }],
        }
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
    createDefaultGridEngine();
    gridEngineHeadless.setPosition("player", { x: 3, y: 4 }, "someOtherLayer");
    expect(gridEngineHeadless.getPosition("player")).toEqual({ x: 3, y: 4 });
    expect(gridEngineHeadless.getCharLayer("player")).toEqual("someOtherLayer");
  });

  it("should set tile position without layer", () => {
    createDefaultGridEngine();
    gridEngineHeadless.setPosition("player", { x: 3, y: 4 });

    expect(gridEngineHeadless.getPosition("player")).toEqual({ x: 3, y: 4 });
    expect(gridEngineHeadless.getCharLayer("player")).toBeUndefined();
  });

  it("should get facing position", () => {
    createDefaultGridEngine();
    gridEngineHeadless.turnTowards("player", Direction.RIGHT);
    expect(gridEngineHeadless.getFacingPosition("player")).toEqual({
      x: 1,
      y: 0,
    });
  });

  it("should move randomly", () => {
    createDefaultGridEngine();
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
      createDefaultGridEngine();
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
    createDefaultGridEngine();
    gridEngineHeadless.stopMovement("player");
    expect(gridEngineHeadless.getMovement("player")).toEqual({ type: "None" });
  });

  it("should set speed", () => {
    createDefaultGridEngine();
    gridEngineHeadless.setSpeed("player", 2);
    expect(gridEngineHeadless.getSpeed("player")).toEqual(2);
  });

  it("should add chars on the go", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [],
    });
    gridEngineHeadless.addCharacter({
      id: "player",
    });

    expect(gridEngineHeadless.hasCharacter("player")).toBe(true);
  });

  it("should remove chars on the go", () => {
    createDefaultGridEngine();

    expect(gridEngineHeadless.getPosition("player")).toEqual({ x: 0, y: 0 });
    expect(gridEngineHeadless.isBlocked({ x: 0, y: 0 }, undefined)).toBe(true);

    gridEngineHeadless.removeCharacter("player");
    gridEngineHeadless.update(123, 456);

    expect(gridEngineHeadless.isBlocked({ x: 0, y: 0 }, undefined)).toBe(false);
    expect(gridEngineHeadless.hasCharacter("player")).toBe(false);
  });

  it("should remove all chars", () => {
    gridEngineHeadless.create(
      // prettier-ignore
      mockBlockMap([
        "...",
        "...",
        "...",
      ], undefined, true),
      {
        characters: [
          { id: "player", startPosition: { x: 1, y: 1 } },
          { id: "player2", startPosition: { x: 2, y: 2 } },
        ],
        numberOfDirections: NumberOfDirections.EIGHT,
      }
    );
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
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
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
    createDefaultGridEngine();
    gridEngineHeadless.addCharacter({
      id: "player2",
    });
    expect(gridEngineHeadless.hasCharacter("player")).toBe(true);
    expect(gridEngineHeadless.hasCharacter("player2")).toBe(true);
    expect(gridEngineHeadless.hasCharacter("unknownCharId")).toBe(false);
  });

  it("should follow a char", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }, { id: "player2" }],
    });
    gridEngineHeadless.follow("player", "player2", {
      distance: 7,
      closestPointIfBlocked: true,
      maxPathLength: 10000,
      ignoreLayers: true,
    });

    expect(gridEngineHeadless.getMovement("player")).toEqual({
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
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [{ id: "player" }, { id: "player2" }],
    });

    gridEngineHeadless.follow("player", "player2");

    expect(gridEngineHeadless.getMovement("player")).toEqual({
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

  it("should delegate getFacingDirection", () => {
    createDefaultGridEngine();
    gridEngineHeadless.turnTowards("player", Direction.LEFT);
    const facingDirection = gridEngineHeadless.getFacingDirection("player");
    expect(facingDirection).toEqual(Direction.LEFT);
  });

  it("should delegate getTransition", () => {
    createDefaultGridEngine();
    gridEngineHeadless.setTransition({ x: 3, y: 4 }, "fromLayer", "toLayer");
    expect(
      gridEngineHeadless.getTransition({ x: 3, y: 4 }, "fromLayer")
    ).toEqual("toLayer");
  });

  it("should block if tile is blocking", () => {
    gridEngineHeadless.create(
      // prettier-ignore
      mockBlockMap([
        "....",
        "....",
        "....",
        "....",
        "...#"
      ], 'someLayer'),
      { characters: [{ id: "player" }] }
    );
    expect(
      gridEngineHeadless.isBlocked({ x: 3, y: 4 }, "someLayer", ["cGroup"])
    ).toBe(true);
    expect(gridEngineHeadless.isTileBlocked({ x: 3, y: 4 }, "someLayer")).toBe(
      true
    );
  });

  it("should block if char is blocking", () => {
    gridEngineHeadless.create(new MockTilemap([createMockLayer({})]), {
      characters: [
        { id: "player", startPosition: { x: 3, y: 4 }, charLayer: "someLayer" },
      ],
    });
    const result = gridEngineHeadless.isBlocked({ x: 3, y: 4 }, "someLayer", [
      "cGroup",
    ]);
    expect(result).toBe(true);
  });

  it("should not block", () => {
    gridEngineHeadless.create(
      // prettier-ignore
      mockBlockMap([
        "..",
        ".."
      ], 'someLayer'),
      {
        characters: [{ id: "player" }],
      }
    );
    const result = gridEngineHeadless.isBlocked({ x: 1, y: 1 }, "someLayer");
    expect(result).toBe(false);
  });

  it("should check blocking with default cGroup", () => {
    gridEngineHeadless.create(
      // prettier-ignore
      mockBlockMap([
        "..",
        ".."
      ], 'someLayer'),
      {
        characters: [
          {
            id: "player",
            charLayer: "someLayer",
            collides: { collisionGroups: ["geDefault"] },
          },
        ],
      }
    );
    expect(gridEngineHeadless.isBlocked({ x: 0, y: 0 }, "someLayer")).toBe(
      true
    );
  });

  it("should delegate getCollisionGroups", () => {
    createDefaultGridEngine();
    const collisionGroups = ["someCG"];
    gridEngineHeadless.setCollisionGroups("player", collisionGroups);
    expect(gridEngineHeadless.getCollisionGroups("player")).toEqual(
      collisionGroups
    );
  });

  it("should get tile pos in direction", () => {
    createDefaultGridEngine();
    const pos = { x: 5, y: 6 };
    const layer = "charLayer1";

    const tilePosInDir = gridEngineHeadless.getTilePosInDirection(
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
      createDefaultGridEngine();
      const prom = gridEngineHeadless
        .movementStarted()
        .pipe(take(1))
        .toPromise();

      gridEngineHeadless.move("player", Direction.RIGHT);

      const res = await prom;
      expect(res).toEqual({ charId: "player", direction: Direction.RIGHT });
    });

    it("should unsubscribe from movementStarted if char removed", () => {
      createDefaultGridEngine();

      const nextMock = jest.fn();
      gridEngineHeadless.movementStarted().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      gridEngineHeadless.move("player", Direction.RIGHT);
      gridEngineHeadless.update(2000, 100);
      gridEngineHeadless.move("player", Direction.DOWN);
      gridEngineHeadless.removeCharacter("player");
      gridEngineHeadless.update(2000, 3000);

      expect(nextMock).toHaveBeenCalledTimes(1);
    });

    it("should get chars movementStopped observable", async () => {
      createDefaultGridEngine();

      const prom = gridEngineHeadless
        .movementStopped()
        .pipe(take(1))
        .toPromise();
      gridEngineHeadless.move("player", Direction.RIGHT);
      gridEngineHeadless.update(2000, 1000);
      gridEngineHeadless.update(2000, 1000);

      expect(await prom).toEqual({
        charId: "player",
        direction: Direction.RIGHT,
      });
    });

    it("should unsubscribe from movementStopped if char removed", () => {
      createDefaultGridEngine();

      const nextMock = jest.fn();
      gridEngineHeadless.movementStopped().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      gridEngineHeadless.move("player", Direction.RIGHT);
      gridEngineHeadless.removeCharacter("player");
      gridEngineHeadless.update(2000, 1000);
      gridEngineHeadless.update(2000, 1000);

      expect(nextMock).not.toHaveBeenCalled();
    });

    it("should get chars directionChanged observable", async () => {
      createDefaultGridEngine();

      const prom = gridEngineHeadless
        .directionChanged()
        .pipe(take(1))
        .toPromise();

      gridEngineHeadless.move("player", Direction.LEFT);

      expect(await prom).toEqual({
        charId: "player",
        direction: Direction.LEFT,
      });
    });

    it("should get chars positionChangeStarted observable", async () => {
      createDefaultGridEngine();

      const prom = gridEngineHeadless
        .positionChangeStarted()
        .pipe(take(1))
        .toPromise();

      gridEngineHeadless.move("player", Direction.RIGHT);

      expect(await prom).toEqual({
        charId: "player",
        exitTile: new Vector2(0, 0),
        enterTile: new Vector2(1, 0),
        enterLayer: undefined,
        exitLayer: undefined,
      });
    });

    it("should get chars positionChangeFinished observable", async () => {
      createDefaultGridEngine();

      const prom = gridEngineHeadless
        .positionChangeFinished()
        .pipe(take(1))
        .toPromise();

      gridEngineHeadless.move("player", Direction.RIGHT);
      gridEngineHeadless.update(2000, 1000);
      gridEngineHeadless.update(2000, 1000);

      const res = await prom;
      expect(res).toEqual({
        charId: "player",
        exitTile: new Vector2(0, 0),
        enterTile: new Vector2(1, 0),
        enterLayer: undefined,
        exitLayer: undefined,
      });
    });

    it("should emit when a character is added or removed", () => {
      const player1 = "player1";
      const player2 = "player2";
      const nextMock = jest.fn();

      gridEngineHeadless.create(
        // prettier-ignore
        mockBlockMap([
            "..",
            ".."
          ]),
        {
          characters: [{ id: player1 }, { id: player2 }],
        }
      );

      gridEngineHeadless.characterShifted().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      gridEngineHeadless.addCharacter({ id: player2 });
      expect(nextMock).toHaveBeenCalledWith(
        expect.objectContaining({
          charId: player2,
          action: "ADDED",
        })
      );

      gridEngineHeadless.removeCharacter(player1);
      expect(nextMock).toHaveBeenCalledWith(
        expect.objectContaining({
          charId: player1,
          action: "REMOVED",
        })
      );

      gridEngineHeadless.addCharacter({ id: player1 });
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
        gridEngineHeadless.create(
          // prettier-ignore
          mockBlockMap([
            "..",
            ".."
          ], "anyLayer"),
          {
            characters: [{ id: player }, { id: nonMatchingChar }],
          }
        );
        gridEngineHeadless
          .steppedOn([player], [expectedTargetPosition], [expectedLayer])
          .subscribe({
            complete: jest.fn(),
            next: nextMock,
          });
      });

      it("should notify if character stepped on tile", () => {
        gridEngineHeadless.setPosition(
          player,
          new Vector2(0, 1),
          expectedLayer
        );

        gridEngineHeadless.move(player, Direction.RIGHT);
        gridEngineHeadless.update(2000, 300);

        expect(nextMock).toHaveBeenCalledWith(
          expect.objectContaining({
            enterTile: expectedTargetPosition,
          })
        );
      });

      it("should not notify if character stepped on tile with non matching layer", () => {
        gridEngineHeadless.setPosition(
          player,
          new Vector2(0, 1),
          "not matching layer"
        );
        gridEngineHeadless.move(player, Direction.RIGHT);
        gridEngineHeadless.update(2000, 300);

        expect(nextMock).not.toHaveBeenCalledWith(
          expect.objectContaining({
            enterTile: expectedTargetPosition,
          })
        );
      });

      it("should not notify if character stepped on tile with non matching char", () => {
        gridEngineHeadless.setPosition(
          nonMatchingChar,
          new Vector2(0, 1),
          expectedLayer
        );
        gridEngineHeadless.move(nonMatchingChar, Direction.RIGHT);
        gridEngineHeadless.update(2000, 300);

        expect(nextMock).not.toHaveBeenCalledWith(
          expect.objectContaining({
            enterTile: expectedTargetPosition,
          })
        );
      });

      it("should not notify if character stepped on tile with non matching tile", () => {
        gridEngineHeadless.setPosition(
          player,
          new Vector2(1, 0), // non matching tile
          expectedLayer
        );
        gridEngineHeadless.move(player, Direction.RIGHT);
        gridEngineHeadless.update(2000, 300);

        expect(nextMock).not.toHaveBeenCalledWith(
          expect.objectContaining({
            enterTile: expectedTargetPosition,
          })
        );
      });
    });

    it("should unsubscribe from positionChangeFinished if char removed", () => {
      createDefaultGridEngine();
      const nextMock = jest.fn();
      gridEngineHeadless.positionChangeFinished().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      gridEngineHeadless.move("player", Direction.LEFT);
      gridEngineHeadless.removeCharacter("player");
      gridEngineHeadless.update(2000, 1000);
      gridEngineHeadless.update(2000, 1000);
      expect(nextMock).not.toHaveBeenCalled();
    });
  });

  describe("labels", () => {
    it("should add labels on creation", () => {
      gridEngineHeadless.create(mockBlockMap(["."]), {
        characters: [
          {
            id: "player",
            labels: ["someLabel", "someOtherLabel"],
          },
        ],
      });
      expect(gridEngineHeadless.getLabels("player")).toEqual([
        "someLabel",
        "someOtherLabel",
      ]);
    });

    it("should add labels", () => {
      createDefaultGridEngine();
      expect(gridEngineHeadless.getLabels("player")).toEqual([]);
      gridEngineHeadless.addLabels("player", ["someLabel", "someOtherLabel"]);
      expect(gridEngineHeadless.getLabels("player")).toEqual([
        "someLabel",
        "someOtherLabel",
      ]);
    });

    it("should remove labels", () => {
      createDefaultGridEngine();
      expect(gridEngineHeadless.getLabels("player")).toEqual([]);
      gridEngineHeadless.addLabels("player", ["label1", "label2", "label3"]);
      gridEngineHeadless.removeLabels("player", ["label1", "label3"]);
      expect(gridEngineHeadless.getLabels("player")).toEqual(["label2"]);
    });

    it("should clear labels", () => {
      createDefaultGridEngine();
      gridEngineHeadless.addLabels("player", ["label1", "label2", "label3"]);
      gridEngineHeadless.clearLabels("player");
      expect(gridEngineHeadless.getLabels("player")).toEqual([]);
    });

    it("should get all characters with specific labels", () => {
      gridEngineHeadless.create(mockBlockMap(["."]), {
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
        gridEngineHeadless.getAllCharacters({
          labels: { withOneOfLabels: ["label1", "label2"] },
        })
      ).toEqual(["player1", "player2"]);

      expect(
        gridEngineHeadless.getAllCharacters({
          labels: { withAllLabels: ["label1", "label2"] },
        })
      ).toEqual(["player1"]);

      expect(
        gridEngineHeadless.getAllCharacters({
          labels: { withNoneLabels: ["label1", "label2"] },
        })
      ).toEqual(["player3"]);

      expect(
        gridEngineHeadless.getAllCharacters({
          labels: {
            withAllLabels: ["label1", "label2"],
            withOneOfLabels: ["label1", "label2"],
            withNoneLabels: ["label1", "label2"],
          },
        })
      ).toEqual(["player1"]);

      expect(
        gridEngineHeadless.getAllCharacters({
          labels: {
            withOneOfLabels: ["label1", "label2"],
            withNoneLabels: ["label1", "label2"],
          },
        })
      ).toEqual(["player1", "player2"]);

      expect(
        gridEngineHeadless.getAllCharacters({
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
      gridEngineHeadless.create(
        // prettier-ignore
        mockBlockMap([
        ".####",
        ".####",
        ".....",
        "####.",
        "####.",
      ], "charLayer"),
        { characters: [{ id: "player" }] }
      );
      const source = layerPos(0, 0, "charLayer");
      const dest = layerPos(4, 4, "charLayer");
      const options = { pathWidth: 1 };

      const res = gridEngineHeadless.findShortestPath(source, dest, options);

      expect(res).toEqual({
        path: [
          layerPos(0, 0, "charLayer"),
          layerPos(0, 1, "charLayer"),
          layerPos(0, 2, "charLayer"),
          layerPos(1, 2, "charLayer"),
          layerPos(2, 2, "charLayer"),
          layerPos(3, 2, "charLayer"),
          layerPos(4, 2, "charLayer"),
          layerPos(4, 3, "charLayer"),
          layerPos(4, 4, "charLayer"),
        ],
        closestToTarget: layerPos(4, 4, "charLayer"),
        reachedMaxPathLength: false,
        steps: 9,
      });
    });

    function layerPos(x: number, y: number, charLayer: string) {
      return {
        position: { x, y },
        charLayer,
      };
    }
  });

  describe("QueueMovement", () => {
    it("should enqueue and finish", () => {
      createDefaultGridEngine();
      const obs = jest.fn();

      gridEngineHeadless.queueMovementFinished().subscribe(obs);
      gridEngineHeadless.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);

      gridEngineHeadless.update(0, 1000);

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
      createDefaultGridEngine();
      const obs = jest.fn();

      gridEngineHeadless.queueMovementFinished().subscribe(obs);
      gridEngineHeadless.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);

      gridEngineHeadless.moveTo("player", { x: 1, y: 0 });
      expect(obs).toHaveBeenCalledWith(
        expect.objectContaining({
          charId: "player",
          result: "MOVEMENT_TERMINATED",
        })
      );

      obs.mockClear();
      gridEngineHeadless.update(0, 1000);

      expect(obs).not.toHaveBeenCalled();
    });

    it("should unsubscribe from finish on char remove", () => {
      createDefaultGridEngine();
      const obs = jest.fn();

      gridEngineHeadless.queueMovementFinished().subscribe(obs);
      gridEngineHeadless.addQueueMovements("player", [
        { position: { x: 1, y: 0 }, charLayer: undefined },
      ]);

      gridEngineHeadless.removeCharacter("player");
      gridEngineHeadless.update(0, 1000);

      expect(obs).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling unknown char id", () => {
    const UNKNOWN_CHAR_ID = "unknownCharId";
    beforeEach(() => {
      createDefaultGridEngine();
    });

    function expectCharUnknownException(fn: () => any) {
      expect(() => fn()).toThrow("Character unknown");
    }

    it("should throw error if char id unknown", () => {
      expectCharUnknownException(() =>
        gridEngineHeadless.getPosition(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.setPosition(UNKNOWN_CHAR_ID, new Vector2(1, 2))
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.move(UNKNOWN_CHAR_ID, Direction.LEFT)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.moveRandomly(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.stopMovement(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.setSpeed(UNKNOWN_CHAR_ID, 4)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.moveTo(UNKNOWN_CHAR_ID, new Vector2(3, 4))
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.removeCharacter(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.isMoving(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.getMovementProgress(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.getFacingDirection(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.turnTowards(UNKNOWN_CHAR_ID, Direction.LEFT)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.getFacingPosition(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.getCharLayer(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.getCollisionGroups(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.setCollisionGroups(UNKNOWN_CHAR_ID, ["cGroup"])
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.collidesWithTiles(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.getSpeed(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.getMovement(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.getLabels(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.addLabels(UNKNOWN_CHAR_ID, ["label"])
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.removeLabels(UNKNOWN_CHAR_ID, ["label"])
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.clearLabels(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngineHeadless.addQueueMovements(UNKNOWN_CHAR_ID, [])
      );
    });

    it("should throw error if follow is invoked", () => {
      expect(() =>
        gridEngineHeadless.follow("unknownCharId", "player")
      ).toThrow("Character unknown");
      expect(() =>
        gridEngineHeadless.follow("player", "unknownCharId")
      ).toThrow("Character unknown");
      expect(() =>
        gridEngineHeadless.follow("unknownCharId", "unknownCharId")
      ).toThrow("Character unknown");
    });
  });

  describe("invokation of methods if not created properly", () => {
    const SOME_CHAR_ID = "someCharId";

    beforeEach(() => {
      gridEngineHeadless = new GridEngineHeadless();
    });

    function expectUninitializedException(fn: () => any) {
      expect(() => fn()).toThrow("GridEngine not initialized");
    }

    it("should throw error if plugin not created", () => {
      expectUninitializedException(() =>
        gridEngineHeadless.getPosition(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.setPosition(SOME_CHAR_ID, new Vector2(1, 2))
      );
      expectUninitializedException(() =>
        gridEngineHeadless.move(SOME_CHAR_ID, Direction.LEFT)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.moveRandomly(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.moveTo(SOME_CHAR_ID, new Vector2(2, 3))
      );
      expectUninitializedException(() =>
        gridEngineHeadless.stopMovement(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.setSpeed(SOME_CHAR_ID, 3)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.addCharacter({ id: "player" })
      );
      expectUninitializedException(() =>
        gridEngineHeadless.hasCharacter(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.removeCharacter(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.removeAllCharacters()
      );
      expectUninitializedException(() =>
        gridEngineHeadless.follow(SOME_CHAR_ID, "someOtherCharId")
      );
      expectUninitializedException(() =>
        gridEngineHeadless.isMoving(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getMovementProgress(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getFacingDirection(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.turnTowards(SOME_CHAR_ID, Direction.LEFT)
      );
      expectUninitializedException(() => gridEngineHeadless.getAllCharacters());
      expectUninitializedException(() =>
        gridEngineHeadless.getFacingPosition(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getCharLayer(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getTransition(
          new Vector2({ x: 2, y: 2 }),
          "someLayer"
        )
      );
      expectUninitializedException(() =>
        gridEngineHeadless.setTransition(
          new Vector2({ x: 2, y: 2 }),
          "fromLayer",
          "toLayer"
        )
      );
      expectUninitializedException(() =>
        gridEngineHeadless.isBlocked({ x: 2, y: 2 }, "someLayer")
      );
      expectUninitializedException(() =>
        gridEngineHeadless.isTileBlocked({ x: 2, y: 2 }, "someLayer")
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getCollisionGroups(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.setCollisionGroups(SOME_CHAR_ID, ["cGroup"])
      );
      expectUninitializedException(() =>
        gridEngineHeadless.collidesWithTiles(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getSpeed(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getMovement(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getLabels(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.addLabels(SOME_CHAR_ID, ["label"])
      );
      expectUninitializedException(() =>
        gridEngineHeadless.removeLabels(SOME_CHAR_ID, ["label"])
      );
      expectUninitializedException(() =>
        gridEngineHeadless.clearLabels(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngineHeadless.getTilePosInDirection(
          { x: 2, y: 2 },
          undefined,
          Direction.DOWN
        )
      );
      expectUninitializedException(() =>
        gridEngineHeadless.findShortestPath(
          { position: { x: 2, y: 2 }, charLayer: undefined },
          { position: { x: 2, y: 2 }, charLayer: undefined }
        )
      );
      expectUninitializedException(() =>
        gridEngineHeadless.addQueueMovements(SOME_CHAR_ID, [])
      );
    });
  });

  it("logs version", () => {
    console.log = jest.fn();
    gridEngineHeadless = new GridEngineHeadless();

    expect(console.log).toHaveBeenCalledWith(
      "Using GridEngine vGRID.ENGINE.VERSION"
    );
  });

  function createDefaultGridEngine() {
    gridEngineHeadless.create(
      // prettier-ignore
      mockBlockMap([
        "..",
        ".."
      ]),
      { characters: [{ id: "player" }] }
    );
  }
});
