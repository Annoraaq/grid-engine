import { Direction } from "../../Direction/Direction.js";
import { GridEngineHeadless } from "../../GridEngineHeadless.js";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy.js";
import {
  mockBlockMap,
  mockLayeredBlockMap,
} from "../../Utils/MockFactory/MockFactory.js";

jest.mock("../../../package.json", () => ({
  version: "GRID.ENGINE.VERSION",
}));

function stepEngine(
  ge: GridEngineHeadless,
  steps: number,
  deltaMs = 100,
): void {
  for (let i = 0; i < steps; i++) {
    ge.update(i * deltaMs, deltaMs);
  }
}

describe("FleeMovement", () => {
  let ge: GridEngineHeadless;

  beforeEach(() => {
    ge = new GridEngineHeadless();
  });

  it("should flee immediately when within distance on init", () => {
    const tilemap = mockBlockMap([
      ".......",
      ".......",
      ".......",
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 1, y: 1 } },
        { id: "sheep", startPosition: { x: 2, y: 1 } },
      ],
    });

    ge.flee("sheep", "player", { distance: 3 });
    stepEngine(ge, 20, 100);

    expect(ge.getPosition("sheep")).toEqual({ x: 4, y: 1 });
  });

  it("should not move when already at or beyond distance, and flee when threat approaches", () => {
    const tilemap = mockBlockMap([
      "........",
      "........",
      "........",
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 0, y: 1 } },
        { id: "sheep", startPosition: { x: 3, y: 1 } },
      ],
    });

    ge.flee("sheep", "player", { distance: 3 });
    stepEngine(ge, 10, 100);
    expect(ge.getPosition("sheep")).toEqual({ x: 3, y: 1 });

    // Player steps closer to (1, 1) -> distance becomes 2 < 3
    ge.move("player", Direction.RIGHT);
    stepEngine(ge, 20, 100);

    expect(ge.getPosition("player")).toEqual({ x: 1, y: 1 });
    expect(ge.getPosition("sheep")).toEqual({ x: 4, y: 1 });
  });

  it("should stop reacting to threat after movement is replaced", () => {
    const tilemap = mockBlockMap([
      "........",
      "........",
      "........",
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 0, y: 1 } },
        { id: "sheep", startPosition: { x: 3, y: 1 } },
      ],
    });

    ge.flee("sheep", "player", { distance: 3 });
    ge.stopMovement("sheep");

    ge.move("player", Direction.RIGHT);
    stepEngine(ge, 20, 100);

    expect(ge.getPosition("sheep")).toEqual({ x: 3, y: 1 });
  });

  it("should navigate around obstacles when fleeing", () => {
    const tilemap = mockBlockMap([
      ".#...",
      ".#...",
      ".....",
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 0, y: 0 } },
        { id: "sheep", startPosition: { x: 0, y: 1 } },
      ],
    });

    ge.flee("sheep", "player", { distance: 3 });
    stepEngine(ge, 20, 100);

    expect(ge.getPosition("sheep")).toEqual({ x: 1, y: 2 });
  });

  it("should move to farthest reachable tile when cornered and farthestPointIfBlocked is true", () => {
    const tilemap = mockBlockMap([
      "####",
      "#..#",
      "#..#",
      "####",
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 1, y: 1 } },
        { id: "sheep", startPosition: { x: 1, y: 2 } },
      ],
    });

    ge.flee("sheep", "player", { distance: 5, farthestPointIfBlocked: true });
    stepEngine(ge, 20, 100);

    expect(ge.getPosition("sheep")).toEqual({ x: 2, y: 2 });
  });

  it("should stay put when cornered and farthestPointIfBlocked is false", () => {
    const tilemap = mockBlockMap([
      "####",
      "#..#",
      "#..#",
      "####",
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 1, y: 1 } },
        { id: "sheep", startPosition: { x: 1, y: 2 } },
      ],
    });

    ge.flee("sheep", "player", { distance: 5, farthestPointIfBlocked: false });
    stepEngine(ge, 20, 100);

    expect(ge.getPosition("sheep")).toEqual({ x: 1, y: 2 });
  });

  it("should retry fleeing when initially boxed in and space opens up", () => {
    const tilemap = mockBlockMap([
      "#####",
      "#...#",
      "#####",
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 1, y: 1 } },
        { id: "sheep", startPosition: { x: 2, y: 1 } },
        { id: "blocker", startPosition: { x: 3, y: 1 } },
      ],
    });

    ge.flee("sheep", "player", {
      distance: 2,
      pathBlockedStrategy: PathBlockedStrategy.RETRY,
      pathBlockedRetryBackoffMs: 100,
    });
    stepEngine(ge, 5, 100);
    // Boxed in between player (1,1) and blocker (3,1)
    expect(ge.getPosition("sheep")).toEqual({ x: 2, y: 1 });

    // Remove blocker -> sheep should retry and flee to (3,1)
    ge.removeCharacter("blocker");
    stepEngine(ge, 15, 100);
    expect(ge.getPosition("sheep")).toEqual({ x: 3, y: 1 });
  });

  it("should respect isPositionAllowedFn", () => {
    const tilemap = mockBlockMap([
      "......",
      "......",
      "......",
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 0, y: 0 } },
        { id: "sheep", startPosition: { x: 1, y: 0 } },
      ],
    });

    // Restrict sheep to x <= 1
    ge.flee("sheep", "player", {
      distance: 3,
      isPositionAllowedFn: (pos) => pos.x <= 1,
    });
    stepEngine(ge, 20, 100);

    expect(ge.getPosition("sheep")).toEqual({ x: 1, y: 2 });
  });

  it("should respect ignoreLayers option", () => {
    const tilemap = mockLayeredBlockMap([
      {
        layer: "lower",
        blockMap: [".....", "....."],
      },
      {
        layer: "upper",
        blockMap: [".....", "....."],
      },
    ]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 0, y: 0 }, charLayer: "upper" },
        { id: "sheep", startPosition: { x: 1, y: 0 }, charLayer: "lower" },
      ],
    });

    // With ignoreLayers: false, player on upper layer should not scare sheep on lower
    ge.flee("sheep", "player", { distance: 3, ignoreLayers: false });
    stepEngine(ge, 15, 100);
    expect(ge.getPosition("sheep")).toEqual({ x: 1, y: 0 });

    // With ignoreLayers: true, sheep flees regardless of layer
    ge.flee("sheep", "player", { distance: 3, ignoreLayers: true });
    stepEngine(ge, 15, 100);
    expect(ge.getPosition("sheep")).toEqual({ x: 3, y: 0 });
  });

  it("should expose movement info via getMovement", () => {
    const tilemap = mockBlockMap([".....", "....."]);
    ge.create(tilemap, {
      characters: [
        { id: "player", startPosition: { x: 0, y: 0 } },
        { id: "sheep", startPosition: { x: 4, y: 0 } },
      ],
    });

    ge.flee("sheep", "player", {
      distance: 4,
      farthestPointIfBlocked: false,
      maxPathLength: 10,
      ignoreLayers: true,
      ignoredChars: ["other"],
      pathBlockedStrategy: PathBlockedStrategy.STOP,
      pathBlockedRetryBackoffMs: 500,
    });

    const info = ge.getMovement("sheep");
    expect(info.type).toBe("Flee");
    expect(info.config).toMatchObject({
      charToAvoid: "player",
      distance: 4,
      farthestPointIfBlocked: false,
      maxPathLength: 10,
      ignoreLayers: true,
      ignoredChars: ["other"],
      pathBlockedStrategy: PathBlockedStrategy.STOP,
      pathBlockedRetryBackoffMs: 500,
    });
  });

  it("should throw for unknown characters", () => {
    const tilemap = mockBlockMap(["..."]);
    ge.create(tilemap, {
      characters: [{ id: "player", startPosition: { x: 0, y: 0 } }],
    });

    expect(() => ge.flee("unknown", "player", { distance: 3 })).toThrow();
    expect(() => ge.flee("player", "unknown", { distance: 3 })).toThrow();
  });
});
