import { ShortestPathAlgorithmType } from "./../../Pathfinding/ShortestPathAlgorithm.js";
import { Direction, NumberOfDirections } from "./../../Direction/Direction.js";
import { FollowMovement } from "./FollowMovement.js";
import { TargetMovement } from "../TargetMovement/TargetMovement.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { mockBlockMap } from "../../Utils/MockFactory/MockFactory.js";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy.js";
import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";

const mockTargetMovement = {
  setCharacter: jest.fn(),
  update: jest.fn(),
};

jest.mock("../TargetMovement/TargetMovement", () => ({
  TargetMovement: jest.fn(function () {
    return mockTargetMovement;
  }),
}));

describe("FollowMovement", () => {
  let followMovement: FollowMovement;
  let gridTilemap: GridTilemap;
  let char: GridCharacter;
  let targetCharPos: LayerVecPos;
  let targetChar: GridCharacter;

  function createChar(id: string, pos: LayerVecPos) {
    const char = new GridCharacter(id, {
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      tilemap: gridTilemap,
    });
    char.setTilePosition(pos);
    return char;
  }

  beforeEach(() => {
    jest.clearAllMocks();
    gridTilemap = new GridTilemap(
      mockBlockMap(
        [
          // prettier-ignore
          "....",
          "....",
          "....",
          "....",
        ],
        undefined,
      ),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    mockTargetMovement.setCharacter.mockReset();
    const charPos = { position: new Vector2(1, 1), layer: "layer1" };
    targetCharPos = { position: new Vector2(3, 1), layer: "layer1" };
    char = createChar("char", charPos);
    targetChar = createChar("targetChar", targetCharPos);
    // @ts-ignore
    TargetMovement.mockClear();
    followMovement = new FollowMovement(char, gridTilemap, targetChar);
  });

  it("should set character", () => {
    expect(TargetMovement).toHaveBeenCalledWith(
      char,
      gridTilemap,
      targetCharPos,
      {
        distance: 1,
        config: {
          algorithm: "BIDIRECTIONAL_SEARCH",
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          maxPathLength: Infinity,
          ignoreLayers: false,
          considerCosts: false,
          ignoredChars: [targetChar.getId()],
          isPositionAllowedFn: expect.anything(),
        },
      },
    );
  });

  it("should update added character", () => {
    followMovement.update(100);
    expect(mockTargetMovement.update).toHaveBeenCalledWith(100);
  });

  it("should update target on position change", () => {
    const enterTile = { position: new Vector2(7, 7), layer: "layer1" };
    mockTargetMovement.setCharacter.mockReset();

    targetChar.setTilePosition(enterTile);

    expect(TargetMovement).toHaveBeenCalledWith(char, gridTilemap, enterTile, {
      distance: 1,
      config: {
        algorithm: "BIDIRECTIONAL_SEARCH",
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        maxPathLength: Infinity,
        ignoreLayers: false,
        considerCosts: false,
        ignoredChars: [targetChar.getId()],
        isPositionAllowedFn: expect.anything(),
      },
    });
  });

  it("should not update target on position change after autoMovementSet", () => {
    // @ts-ignore
    TargetMovement.mockClear();
    const enterTile = { position: new Vector2(7, 7), layer: "layer1" };
    mockTargetMovement.setCharacter.mockReset();

    char.setMovement(undefined);
    targetChar.setTilePosition(enterTile);

    expect(TargetMovement).not.toHaveBeenCalled();
  });

  it("should update target on position change after autoMovementSet if movement is the same", () => {
    // @ts-ignore
    TargetMovement.mockClear();
    const enterTile = { position: new Vector2(7, 7), layer: "layer1" };
    mockTargetMovement.setCharacter.mockReset();

    char.setMovement(followMovement);
    targetChar.setTilePosition(enterTile);

    expect(TargetMovement).toHaveBeenCalled();
  });

  it("should update added character with distance and maxPathLength", () => {
    followMovement = new FollowMovement(char, gridTilemap, targetChar, {
      distance: 7,
      noPathFoundStrategy: NoPathFoundStrategy.STOP,
      maxPathLength: 100,
      ignoreLayers: true,
    });
    followMovement.update(100);
    expect(TargetMovement).toHaveBeenCalledWith(
      char,
      gridTilemap,
      targetCharPos,
      {
        distance: 8,
        config: {
          algorithm: "BIDIRECTIONAL_SEARCH",
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          maxPathLength: 100,
          ignoreLayers: true,
          considerCosts: false,
          ignoredChars: [targetChar.getId()],
          isPositionAllowedFn: expect.anything(),
        },
      },
    );
  });

  it.each([
    {
      dir: Direction.DOWN,
      wantPos: { position: { x: 2, y: 1 }, layer: "layer1" },
    },
    {
      dir: Direction.UP,
      wantPos: { position: { x: 4, y: 1 }, layer: "layer1" },
    },
    {
      dir: Direction.LEFT,
      wantPos: { position: { x: 3, y: 0 }, layer: "layer1" },
    },
    {
      dir: Direction.RIGHT,
      wantPos: { position: { x: 3, y: 2 }, layer: "layer1" },
    },
  ])(
    "should update added character with facing direction '$dir'",
    ({ dir, wantPos }) => {
      targetChar.turnTowards(Direction.RIGHT);
      followMovement = new FollowMovement(char, gridTilemap, targetChar, {
        distance: 0,
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        maxPathLength: 100,
        ignoreLayers: true,
        facingDirection: dir,
      });
      followMovement.update(100);
      expect(TargetMovement).toHaveBeenCalledWith(
        char,
        gridTilemap,
        wantPos,
        expect.objectContaining({
          distance: 0,
        }),
      );
    },
  );

  it.each([
    {
      dir: Direction.DOWN,
      wantPos: { position: { x: 2, y: 1 }, layer: "layer1" },
    },
    {
      dir: Direction.DOWN_LEFT,
      wantPos: { position: { x: 2, y: 0 }, layer: "layer1" },
    },
    {
      dir: Direction.DOWN_RIGHT,
      wantPos: { position: { x: 2, y: 3 }, layer: "layer1" },
    },
    {
      dir: Direction.UP,
      wantPos: { position: { x: 5, y: 1 }, layer: "layer1" },
    },
    {
      dir: Direction.UP_LEFT,
      wantPos: { position: { x: 5, y: 0 }, layer: "layer1" },
    },
    {
      dir: Direction.UP_RIGHT,
      wantPos: { position: { x: 5, y: 3 }, layer: "layer1" },
    },
    {
      dir: Direction.LEFT,
      wantPos: { position: { x: 3, y: 0 }, layer: "layer1" },
    },
    {
      dir: Direction.RIGHT,
      wantPos: { position: { x: 3, y: 3 }, layer: "layer1" },
    },
  ])(
    "should update added multi-tile character with facing direction '$dir'",
    ({ dir, wantPos }) => {
      const targetChar = new GridCharacter("targetChar", {
        speed: 3,
        collidesWithTiles: true,
        numberOfDirections: NumberOfDirections.EIGHT,
        tilemap: gridTilemap,
        tileWidth: 2,
        tileHeight: 2,
      });

      const targetCharPos = { position: new Vector2(3, 1), layer: "layer1" };
      targetChar.setTilePosition(targetCharPos);
      targetChar.turnTowards(Direction.RIGHT);
      followMovement = new FollowMovement(char, gridTilemap, targetChar, {
        distance: 0,
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        maxPathLength: 100,
        ignoreLayers: true,
        facingDirection: dir,
      });
      followMovement.update(100);
      expect(TargetMovement).toHaveBeenCalledWith(
        char,
        gridTilemap,
        wantPos,
        expect.objectContaining({
          distance: 0,
        }),
      );
    },
  );

  it("should not update facing direction if distance > 0", () => {
    targetChar.turnTowards(Direction.RIGHT);
    followMovement = new FollowMovement(char, gridTilemap, targetChar, {
      distance: 2,
      noPathFoundStrategy: NoPathFoundStrategy.STOP,
      maxPathLength: 100,
      ignoreLayers: true,
      facingDirection: Direction.DOWN,
    });
    followMovement.update(100);
    expect(TargetMovement).toHaveBeenCalledWith(
      char,
      gridTilemap,
      targetCharPos,
      expect.objectContaining({
        distance: 3,
      }),
    );
  });

  it("should update added character with distance and CLOSEST_REACHABLE", () => {
    followMovement = new FollowMovement(char, gridTilemap, targetChar, {
      distance: 7,
      noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
    });
    followMovement.update(100);
    expect(TargetMovement).toHaveBeenCalledWith(
      char,
      gridTilemap,
      targetCharPos,
      {
        distance: 8,
        config: {
          algorithm: "BIDIRECTIONAL_SEARCH",
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          maxPathLength: Infinity,
          ignoreLayers: false,
          considerCosts: false,
          ignoredChars: [targetChar.getId()],
          isPositionAllowedFn: expect.anything(),
        },
      },
    );
  });

  it("should update added character with considerCosts", () => {
    const posAllowedFn = () => true;
    followMovement = new FollowMovement(char, gridTilemap, targetChar, {
      shortestPathAlgorithm: "A_STAR",
      considerCosts: true,
      noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      maxPathLength: 100,
      ignoreLayers: true,
      ignoredChars: ["anotherTestChar"],
      isPositionAllowedFn: posAllowedFn,
    });
    followMovement.update(100);
    expect(TargetMovement).toHaveBeenCalledWith(
      char,
      gridTilemap,
      targetCharPos,
      {
        distance: 1,
        config: {
          algorithm: "A_STAR",
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          maxPathLength: 100,
          ignoreLayers: true,
          considerCosts: true,
          ignoredChars: [targetChar.getId(), "anotherTestChar"],
          isPositionAllowedFn: posAllowedFn,
        },
      },
    );
  });

  it("should show default movement information", () => {
    followMovement = new FollowMovement(char, gridTilemap, targetChar);
    expect(followMovement.getInfo()).toEqual({
      type: "Follow",
      config: {
        charToFollow: targetChar.getId(),
        distance: 0,
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        maxPathLength: Infinity,
        ignoreLayers: false,
        facingDirection: Direction.NONE,
        shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH",
        isPositionAllowedFn: expect.anything(),
        ignoredChars: [],
        considerCosts: false,
      },
    });
  });

  it("should show movement information", () => {
    const posAllowedFn = () => false;
    followMovement = new FollowMovement(char, gridTilemap, targetChar, {
      distance: 7,
      noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      maxPathLength: 100,
      shortestPathAlgorithm: "A_STAR",
      ignoreLayers: true,
      considerCosts: true,
      facingDirection: Direction.LEFT,
      isPositionAllowedFn: posAllowedFn,
      ignoredChars: ["test"],
    });
    expect(followMovement.getInfo()).toEqual({
      type: "Follow",
      config: {
        charToFollow: targetChar.getId(),
        distance: 7,
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        maxPathLength: 100,
        ignoreLayers: true,
        facingDirection: Direction.LEFT,
        shortestPathAlgorithm: "A_STAR",
        isPositionAllowedFn: posAllowedFn,
        ignoredChars: ["test"],
        considerCosts: true,
      },
    });
  });

  test.each(["BFS", "BIDIRECTIONAL_SEARCH", "JPS"])(
    "should show a warning if considerCost pathfinding option is used with" +
      " algorithm different than A*",
    (algorithm: ShortestPathAlgorithmType) => {
      console.warn = jest.fn();
      followMovement = new FollowMovement(char, gridTilemap, targetChar, {
        considerCosts: true,
        shortestPathAlgorithm: algorithm,
      });

      expect(console.warn).toHaveBeenCalledWith(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with ` +
          `algorithm '${algorithm}'. It can only be used with A* algorithm.`,
      );
    },
  );

  it(
    "should not show a warning if considerCost pathfinding option is used " +
      "with A*",
    () => {
      console.warn = jest.fn();
      followMovement = new FollowMovement(char, gridTilemap, targetChar, {
        considerCosts: true,
        shortestPathAlgorithm: "A_STAR",
      });

      expect(console.warn).not.toHaveBeenCalledWith(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with ` +
          `algorithm 'A_STAR'. It can only be used with A* algorithm.`,
      );
    },
  );

  it("should not show a warning if char tileHeight > 1 and non JPS", () => {
    console.warn = jest.fn();
    const charPos = { position: new Vector2(1, 1), layer: "layer1" };
    const char = new GridCharacter("char", {
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      tilemap: gridTilemap,
      tileHeight: 2,
    });
    char.setTilePosition(charPos);
    followMovement = new FollowMovement(char, gridTilemap, targetChar, {
      shortestPathAlgorithm: "BFS",
    });

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("should show a warning if char tileHeight > 1 when using JPS", () => {
    console.warn = jest.fn();
    const charPos = { position: new Vector2(1, 1), layer: "layer1" };
    const char = new GridCharacter("char", {
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      tilemap: gridTilemap,
      tileHeight: 2,
    });
    char.setTilePosition(charPos);
    followMovement = new FollowMovement(char, gridTilemap, targetChar, {
      shortestPathAlgorithm: "JPS",
    });

    expect(console.warn).toHaveBeenCalledWith(
      `GridEngine: Pathfinding algorithm 'JPS' can only be used for ` +
        `characters with 'tileWidth' and 'tileHeight' of 1`,
    );
  });

  it("should show a warning if char tileWidth > 1 when using JPS", () => {
    console.warn = jest.fn();
    const charPos = { position: new Vector2(1, 1), layer: "layer1" };
    const char = new GridCharacter("char", {
      speed: 3,
      collidesWithTiles: true,
      numberOfDirections: NumberOfDirections.FOUR,
      tilemap: gridTilemap,
      tileWidth: 2,
    });
    char.setTilePosition(charPos);
    followMovement = new FollowMovement(char, gridTilemap, targetChar, {
      shortestPathAlgorithm: "JPS",
    });

    expect(console.warn).toHaveBeenCalledWith(
      `GridEngine: Pathfinding algorithm 'JPS' can only be used for ` +
        `characters with 'tileWidth' and 'tileHeight' of 1`,
    );
  });
});
