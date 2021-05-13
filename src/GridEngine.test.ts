import { PathBlockedStrategy } from "./Algorithms/ShortestPath/PathBlockedStrategy";
import { NoPathFoundStrategy } from "./Algorithms/ShortestPath/NoPathFoundStrategy";
import { Subject, of } from "rxjs";
import { take } from "rxjs/operators";
import * as Phaser from "phaser";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { GridCharacter, PositionChange } from "./GridCharacter/GridCharacter";
const mockSetTilePositon = jest.fn();
const mockMove = jest.fn();
const mockUpdate = jest.fn();
const mockGetTilePos = jest.fn();
const mockAddCharacter = jest.fn();
const mockSetSpeed = jest.fn();
const mockSetWalkingAnimationMapping = jest.fn();
const mockRandomMovementUpdate = jest.fn();
const mockMovementStarted = jest.fn();
const mockMovementStopped = jest.fn();
const mockDirectionChanged = jest.fn();
const mockPositionChanged = jest.fn();
const mockPositionChangeFinished = jest.fn();
const mockIsMoving = jest.fn();
const mockSetMovement = jest.fn();
const mockGetMovement = jest.fn();
const mockFacingDirection = jest.fn();
const mockTurnTowards = jest.fn();
const mockFollowMovement = {
  setCharacter: jest.fn(),
  update: jest.fn(),
  setNumberOfDirections: jest.fn(),
};
const mockGridTileMap = {
  addCharacter: jest.fn(),
  removeCharacter: jest.fn(),
  setCollisionTilePropertyName: jest.fn(),
  getTileWidth: () => 32,
  getTileHeight: () => 32,
};
const mockGridTilemapConstructor = jest.fn(function (
  _tilemap,
  _firstLayerAboveChar?
) {
  return mockGridTileMap;
});

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

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

jest.mock("./GridTilemap/GridTilemap", function () {
  return {
    GridTilemap: mockGridTilemapConstructor,
  };
});

function createMockCharConstr() {
  return (id: string) => {
    return {
      setTilePosition: mockSetTilePositon,
      move: mockMove,
      update: mockUpdate,
      getId: () => id,
      getTilePos: mockGetTilePos,
      setSpeed: mockSetSpeed,
      setWalkingAnimationMapping: mockSetWalkingAnimationMapping,
      movementStarted: mockMovementStarted,
      movementStopped: mockMovementStopped,
      directionChanged: mockDirectionChanged,
      positionChanged: mockPositionChanged,
      positionChangeFinished: mockPositionChangeFinished,
      isMoving: mockIsMoving,
      getFacingDirection: mockFacingDirection,
      turnTowards: mockTurnTowards,
      setMovement: mockSetMovement,
      getMovement: mockGetMovement,
    };
  };
}

jest.mock("./GridCharacter/GridCharacter", function () {
  return {
    GridCharacter: jest.fn(createMockCharConstr()),
  };
});

jest.mock(
  "./GridCharacter/IsometricGridCharacter/IsometricGridCharacter",
  function () {
    return {
      IsometricGridCharacter: jest.fn(createMockCharConstr()),
    };
  }
);

const mockRandomMovement = {
  addCharacter: mockAddCharacter,
  update: mockRandomMovementUpdate,
  setNumberOfDirections: jest.fn(),
};

const mockTargetMovement = {
  setCharacter: jest.fn(),
  update: jest.fn(),
  removeCharacter: jest.fn(),
  setNumberOfDirections: jest.fn(),
};

jest.mock("./Movement/RandomMovement/RandomMovement", () => ({
  RandomMovement: jest.fn(() => mockRandomMovement),
}));

jest.mock("./Movement/TargetMovement/TargetMovement", () => ({
  TargetMovement: jest.fn(() => mockTargetMovement),
}));

jest.mock("./Movement/FollowMovement/FollowMovement", () => ({
  FollowMovement: jest.fn(function () {
    return mockFollowMovement;
  }),
}));

jest.mock("./GridTilemap/GridTilemap");

import { GridEngine } from "./GridEngine";
import { RandomMovement } from "./Movement/RandomMovement/RandomMovement";
import { TargetMovement } from "./Movement/TargetMovement/TargetMovement";
import { FollowMovement } from "./Movement/FollowMovement/FollowMovement";
import { IsometricGridCharacter } from "./GridCharacter/IsometricGridCharacter/IsometricGridCharacter";

describe("GridEngine", () => {
  let gridEngine: GridEngine;
  let sceneMock;
  let pluginManagerMock;
  let tileMapMock;
  let playerSpriteMock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // hacky way of avoiding errors in Plugin Initialization because Phaser
    // is not mockable by jest
    sceneMock = { sys: { events: { once: jest.fn(), on: jest.fn() } } };
    pluginManagerMock = {};
    tileMapMock = {
      layers: [
        {
          tilemapLayer: { scale: 2, setDepth: jest.fn() },
        },
      ],
      tileWidth: 16,
      tileHeight: 16,
      orientation: `${Phaser.Tilemaps.Orientation.ORTHOGONAL}`,
    };
    playerSpriteMock = {};
    mockTargetMovement.update.mockReset();
    mockRandomMovementUpdate.mockReset();
    mockUpdate.mockReset();
    mockFollowMovement.setCharacter.mockReset();
    mockFollowMovement.update.mockReset();
    mockMovementStarted.mockReset().mockReturnValue(of());
    mockMovementStopped.mockReset().mockReturnValue(of());
    mockDirectionChanged.mockReset().mockReturnValue(of());
    mockPositionChanged.mockReset().mockReturnValue(of());
    mockPositionChangeFinished.mockReset().mockReturnValue(of());
    gridEngine = new GridEngine(sceneMock, pluginManagerMock);
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
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

  it("should init tilemap", () => {
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
        },
      ],
      collisionTilePropertyName: "custom_collision_prop",
    });
    expect(mockGridTilemapConstructor).toHaveBeenCalledWith(tileMapMock);
    expect(mockGridTileMap.setCollisionTilePropertyName).toHaveBeenCalledWith(
      "custom_collision_prop"
    );
  });

  it("should init tilemap with deprecated firstLayerAboveChar", () => {
    console.warn = jest.fn();
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(mockGridTilemapConstructor).toHaveBeenCalledWith(tileMapMock, 3);
    expect(console.warn).toHaveBeenCalledWith(
      "GridEngine: Config property `firstLayerAboveChar` is deprecated. Use a property `alwaysTop` on the tilemap layers instead."
    );
  });

  it("should init player", () => {
    const containerMock = {};
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          container: <any>containerMock,
        },
      ],
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tilemap: mockGridTileMap,
      tileSize: new Vector2(32, 32),
      speed: 4,
      walkingAnimationEnabled: true,
      container: containerMock,
      offsetX: undefined,
      offsetY: undefined,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(new Vector2(0, 0));
    expect(mockTurnTowards).not.toHaveBeenCalled();
  });

  it("should init isometric player", () => {
    tileMapMock.orientation = `${Phaser.Tilemaps.Orientation.ISOMETRIC}`;
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
        },
      ],
    });
    expect(IsometricGridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tilemap: mockGridTileMap,
      tileSize: new Vector2(32, 32),
      speed: 4,
      walkingAnimationEnabled: true,
      container: undefined,
      offsetX: undefined,
      offsetY: undefined,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(new Vector2(0, 0));
    expect(mockTurnTowards).not.toHaveBeenCalled();
  });

  it("should init player with facingDirection", () => {
    const containerMock = {};
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          container: <any>containerMock,
          facingDirection: Direction.LEFT,
        },
      ],
    });
    expect(mockTurnTowards).toHaveBeenCalledWith(Direction.LEFT);
  });

  it("should still support deprecated characterIndex property", () => {
    console.warn = jest.fn();
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          characterIndex: 2,
        },
      ],
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tilemap: mockGridTileMap,
      tileSize: new Vector2(32, 32),
      speed: 4,
      walkingAnimationMapping: 2,
      walkingAnimationEnabled: true,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(new Vector2(0, 0));

    expect(console.warn).toHaveBeenCalledWith(
      "GridEngine: CharacterConfig property `characterIndex` is deprecated. Use `walkingAnimtionMapping` instead."
    );
  });

  it("should prefer walkingAnimationMapping over charIndex", () => {
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          characterIndex: 2,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tilemap: mockGridTileMap,
      tileSize: new Vector2(32, 32),
      speed: 4,
      walkingAnimationMapping: 3,
      walkingAnimationEnabled: true,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(new Vector2(0, 0));
  });

  it("should init player without walking animation", () => {
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          walkingAnimationEnabled: false,
        },
      ],
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tileSize: new Vector2(32, 32),
      tilemap: mockGridTileMap,
      speed: 4,
      walkingAnimationMapping: 3,
      walkingAnimationEnabled: false,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(new Vector2(0, 0));
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
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping,
        },
      ],
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tileSize: new Vector2(32, 32),
      tilemap: mockGridTileMap,
      speed: 4,
      walkingAnimationMapping,
      walkingAnimationEnabled: true,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(new Vector2(0, 0));
  });

  it("should use config startPosition", () => {
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          startPosition: new Vector2(3, 4),
        },
      ],
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(new Vector2(3, 4));
  });

  it("should use config speed", () => {
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          speed: 2,
        },
      ],
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tileSize: new Vector2(32, 32),
      tilemap: mockGridTileMap,
      speed: 2,
      walkingAnimationMapping: 3,
      walkingAnimationEnabled: true,
    });
  });

  it("should use config offset", () => {
    const offsetX = 5;
    const offsetY = 6;
    gridEngine.create(tileMapMock, {
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
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tileSize: new Vector2(32, 32),
      tilemap: mockGridTileMap,
      speed: 4,
      walkingAnimationMapping: 3,
      walkingAnimationEnabled: true,
      offsetX,
      offsetY,
    });
  });

  describe("move 4 dirs", () => {
    it("should move player orthogonally", () => {
      gridEngine.move("player", Direction.LEFT);

      expect(mockMove).toHaveBeenCalledWith(Direction.LEFT);
    });

    it("should show warn on vertical move", () => {
      console.warn = jest.fn();
      gridEngine.move("player", Direction.DOWN_LEFT);
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Character 'player' can't be moved 'down-left' in 4 direction mode."
      );
      expect(mockMove).not.toHaveBeenCalled();

      gridEngine.move("player", Direction.DOWN_RIGHT);
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Character 'player' can't be moved 'down-right' in 4 direction mode."
      );
      expect(mockMove).not.toHaveBeenCalled();

      gridEngine.move("player", Direction.UP_RIGHT);
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Character 'player' can't be moved 'up-right' in 4 direction mode."
      );
      expect(mockMove).not.toHaveBeenCalled();

      gridEngine.move("player", Direction.UP_LEFT);
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Character 'player' can't be moved 'up-left' in 4 direction mode."
      );
      expect(mockMove).not.toHaveBeenCalled();
    });
  });

  describe("move 8 dirs", () => {
    it("should move player orthogonally", () => {
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      gridEngine.move("player", Direction.LEFT);

      expect(mockMove).toHaveBeenCalledWith(Direction.LEFT);
    });

    it("should move player vertically", () => {
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      gridEngine.move("player", Direction.UP_LEFT);

      expect(mockMove).toHaveBeenCalledWith(Direction.UP_LEFT);
    });
  });

  describe("move 4 dirs isometric", () => {
    it("should move player vertically", () => {
      tileMapMock.orientation = `${Phaser.Tilemaps.Orientation.ISOMETRIC}`;
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      gridEngine.move("player", Direction.UP_LEFT);

      expect(mockMove).toHaveBeenCalledWith(Direction.UP_LEFT);
    });

    it("should show warn on orthogonal move", () => {
      console.warn = jest.fn();
      tileMapMock.orientation = `${Phaser.Tilemaps.Orientation.ISOMETRIC}`;
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      gridEngine.move("player", Direction.DOWN);
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Character 'player' can't be moved 'down' in 4 direction isometric mode."
      );
      expect(mockMove).not.toHaveBeenCalled();

      gridEngine.move("player", Direction.LEFT);
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Character 'player' can't be moved 'left' in 4 direction isometric mode."
      );
      expect(mockMove).not.toHaveBeenCalled();

      gridEngine.move("player", Direction.RIGHT);
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Character 'player' can't be moved 'right' in 4 direction isometric mode."
      );
      expect(mockMove).not.toHaveBeenCalled();

      gridEngine.move("player", Direction.UP);
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Character 'player' can't be moved 'up' in 4 direction isometric mode."
      );
      expect(mockMove).not.toHaveBeenCalled();
    });
  });

  it("should move player left", () => {
    gridEngine.moveLeft("player");

    expect(mockMove).toHaveBeenCalledWith(Direction.LEFT);
  });

  it("should move player right", () => {
    gridEngine.moveRight("player");

    expect(mockMove).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move player up", () => {
    gridEngine.moveUp("player");

    expect(mockMove).toHaveBeenCalledWith(Direction.UP);
  });

  it("should move player down", () => {
    gridEngine.moveDown("player");

    expect(mockMove).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should update", () => {
    gridEngine.update(123, 456);

    expect(mockUpdate).toHaveBeenCalledWith(456);
  });

  it("should get tile position", () => {
    mockGetTilePos.mockReturnValue(new Vector2(3, 4));

    expect(gridEngine.getPosition("player")).toEqual(new Vector2(3, 4));
  });

  it("should set tile position", () => {
    gridEngine.setPosition("player", new Vector2(3, 4));

    expect(mockSetTilePositon).toHaveBeenCalledWith(new Vector2(3, 4));
  });

  it("should move randomly", () => {
    gridEngine.moveRandomly("player", 123, 3);
    expect(RandomMovement).toHaveBeenCalledWith(123, 3);
    expect(mockRandomMovement.setNumberOfDirections).toHaveBeenCalledWith(
      NumberOfDirections.FOUR
    );
    expect(mockSetMovement).toHaveBeenCalledWith(mockRandomMovement);
  });

  it("should move randomly with 8 directions", () => {
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
        },
      ],
      numberOfDirections: NumberOfDirections.EIGHT,
    });
    gridEngine.moveRandomly("player", 123, 3);
    expect(mockRandomMovement.setNumberOfDirections).toHaveBeenCalledWith(
      NumberOfDirections.EIGHT
    );
  });

  describe("moveTo", () => {
    it("should move to coordinates", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec);
      expect(TargetMovement).toHaveBeenCalledWith(
        mockGridTileMap,
        targetVec,
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }
      );
      expect(mockTargetMovement.setNumberOfDirections).toHaveBeenCalledWith(
        NumberOfDirections.FOUR
      );
      expect(mockSetMovement).toHaveBeenCalledWith(mockTargetMovement);
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("should move to coordinates closestPointIfBlocked", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, true);
      expect(TargetMovement).toHaveBeenCalledWith(
        mockGridTileMap,
        targetVec,
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }
      );
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: parameter 'closestPointIfBlocked' is deprecated. " +
          "Please use noPathFoundStrategy: 'CLOSEST_REACHABLE' instead."
      );
    });

    it("should move to coordinates STOP", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
      });
      expect(TargetMovement).toHaveBeenCalledWith(
        mockGridTileMap,
        targetVec,
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }
      );
    });

    it("should move to coordinates CLOSEST_REACHABLE", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      });
      expect(TargetMovement).toHaveBeenCalledWith(
        mockGridTileMap,
        targetVec,
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }
      );
    });

    it("should move to coordinates STOP on unknown strategy", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: <NoPathFoundStrategy>"unknown strategy",
      });
      expect(TargetMovement).toHaveBeenCalledWith(
        mockGridTileMap,
        targetVec,
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }
      );
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
      expect(TargetMovement).toHaveBeenCalledWith(
        mockGridTileMap,
        targetVec,
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }
      );
    });

    it("should use pathBlockedStrategy = RETRY", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        pathBlockedStrategy: PathBlockedStrategy.RETRY,
      });
      expect(TargetMovement).toHaveBeenCalledWith(
        mockGridTileMap,
        targetVec,
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
        }
      );
    });

    it("should use pathBlockedStrategy WAIT and warn on unkown input", () => {
      const targetVec = new Vector2(3, 4);
      gridEngine.moveTo("player", targetVec, {
        noPathFoundStrategy: NoPathFoundStrategy.STOP,
        pathBlockedStrategy: <PathBlockedStrategy>"unknown strategy",
      });
      expect(TargetMovement).toHaveBeenCalledWith(
        mockGridTileMap,
        targetVec,
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
          pathBlockedStrategy: PathBlockedStrategy.WAIT,
        }
      );
      expect(console.warn).toHaveBeenCalledWith(
        "GridEngine: Unknown PathBlockedStrategy 'unknown strategy'. Falling back to 'WAIT'"
      );
    });
  });

  it("should stop moving", () => {
    mockGetMovement.mockReturnValue({});
    gridEngine.stopMovement("player");
    expect(mockSetMovement).toHaveBeenCalledWith(undefined);
  });

  it("should stop moving randomly", () => {
    mockGetMovement.mockReturnValue({});
    gridEngine.stopMovingRandomly("player");
    expect(mockSetMovement).toHaveBeenCalledWith(undefined);
  });

  it("should set speed", () => {
    gridEngine.setSpeed("player", 2);
    expect(mockSetSpeed).toHaveBeenCalledWith(2);
  });

  it("should not call update before create", () => {
    gridEngine.update(123, 456);
    expect(mockRandomMovementUpdate).not.toHaveBeenCalled();
    expect(mockTargetMovement.update).not.toHaveBeenCalled();
  });

  it("should add chars on the go", () => {
    gridEngine.create(tileMapMock, {
      characters: [],
      firstLayerAboveChar: 3,
    });
    gridEngine.addCharacter({
      id: "player",
      sprite: playerSpriteMock,
    });
    gridEngine.update(123, 456);
    expect(mockUpdate).toHaveBeenCalledTimes(1);
  });

  it("should remove chars on the go", () => {
    gridEngine.removeCharacter("player");
    gridEngine.update(123, 456);
    expect(mockGridTileMap.removeCharacter).toHaveBeenCalledWith("player");
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("should remove all chars", () => {
    gridEngine.create(tileMapMock, {
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
    expect(mockGridTileMap.removeCharacter).toHaveBeenCalledWith("player");
    expect(mockGridTileMap.removeCharacter).toHaveBeenCalledWith("player2");
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("should get all chars", () => {
    gridEngine.create(tileMapMock, {
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
    gridEngine.create(tileMapMock, {
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
    gridEngine.follow("player", "player2", 7, true);
    expect(FollowMovement).toHaveBeenCalledWith(
      mockGridTileMap,
      // @ts-ignore
      expect.toBeCharacter("player2"),
      7,
      NoPathFoundStrategy.CLOSEST_REACHABLE
    );
    expect(mockFollowMovement.setNumberOfDirections).toHaveBeenCalledWith(
      NumberOfDirections.FOUR
    );
    expect(mockSetMovement).toHaveBeenCalledWith(mockFollowMovement);
  });

  it("should follow a char with default distance", () => {
    gridEngine.create(tileMapMock, {
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
    expect(FollowMovement).toHaveBeenCalledWith(
      mockGridTileMap,
      // @ts-ignore
      expect.toBeCharacter("player2"),
      0,
      NoPathFoundStrategy.STOP
    );
    expect(mockSetMovement).toHaveBeenCalledWith(mockFollowMovement);
  });

  it("should stop following", () => {
    gridEngine.create(tileMapMock, {
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
    gridEngine.stopFollowing("player");
    expect(mockSetMovement).toHaveBeenCalledWith(undefined);
  });

  it("should set walkingAnimationMapping", () => {
    gridEngine.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
    });
    const mockMapping = {
      up: {
        leftFoot: 0,
        standing: 1,
        rightFoot: 2,
      },
      right: {
        leftFoot: 3,
        standing: 4,
        rightFoot: 5,
      },
      down: {
        leftFoot: 6,
        standing: 7,
        rightFoot: 8,
      },
      left: {
        leftFoot: 9,
        standing: 10,
        rightFoot: 11,
      },
    };
    gridEngine.setWalkingAnimationMapping("player", mockMapping);
    expect(mockSetWalkingAnimationMapping).toHaveBeenCalledWith(mockMapping);
  });

  it("should delegate isMoving", () => {
    mockIsMoving.mockReturnValue(true);
    let isMoving = gridEngine.isMoving("player");
    expect(isMoving).toEqual(true);
    mockIsMoving.mockReturnValue(false);
    isMoving = gridEngine.isMoving("player");
    expect(isMoving).toEqual(false);
  });

  it("should delegate getFacingDirection", () => {
    mockFacingDirection.mockReturnValue(Direction.LEFT);
    const facingDirection = gridEngine.getFacingDirection("player");
    expect(facingDirection).toEqual(Direction.LEFT);
  });

  it("should delegate turnTowards", () => {
    gridEngine.turnTowards("player", Direction.RIGHT);
    expect(mockTurnTowards).toHaveBeenCalledWith(Direction.RIGHT);
  });

  describe("Observables", () => {
    it("should get chars movementStarted observable", async () => {
      const mockSubject = new Subject<Direction>();
      mockMovementStarted.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      const prom = gridEngine.movementStarted().pipe(take(1)).toPromise();

      mockSubject.next(Direction.LEFT);
      const res = await prom;
      expect(res).toEqual(["player", Direction.LEFT]);
    });

    it("should unsubscribe from movementStarted if char removed", async () => {
      const mockSubject = new Subject<Direction>();
      mockMovementStarted.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      gridEngine.removeCharacter("player");
      const nextMock = jest.fn();

      gridEngine.movementStarted().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      mockSubject.next(Direction.LEFT);
      expect(nextMock).not.toHaveBeenCalled();
    });

    it("should get chars movementStopped observable", async () => {
      const mockSubject = new Subject<Direction>();
      mockMovementStopped.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      const prom = gridEngine.movementStopped().pipe(take(1)).toPromise();

      mockSubject.next(Direction.LEFT);
      const res = await prom;
      expect(res).toEqual(["player", Direction.LEFT]);
    });

    it("should unsubscribe from movementStopped if char removed", async () => {
      const mockSubject = new Subject<Direction>();
      mockMovementStopped.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      gridEngine.removeCharacter("player");
      const nextMock = jest.fn();

      gridEngine.movementStopped().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      mockSubject.next(Direction.LEFT);
      expect(nextMock).not.toHaveBeenCalled();
    });

    it("should get chars directionChanged observable", async () => {
      const mockSubject = new Subject<Direction>();
      mockDirectionChanged.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      const prom = gridEngine.directionChanged().pipe(take(1)).toPromise();

      mockSubject.next(Direction.LEFT);
      const res = await prom;
      expect(res).toEqual(["player", Direction.LEFT]);
    });

    it("should unsubscribe from directionChanged if char removed", async () => {
      const mockSubject = new Subject<Direction>();
      mockDirectionChanged.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      gridEngine.removeCharacter("player");
      const nextMock = jest.fn();

      gridEngine.directionChanged().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      mockSubject.next(Direction.LEFT);
      expect(nextMock).not.toHaveBeenCalled();
    });

    it("should get chars positionChanged observable", async () => {
      const mockSubject = new Subject<PositionChange>();
      mockPositionChanged.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      const prom = gridEngine.positionChanged().pipe(take(1)).toPromise();

      const exitTile = new Vector2(1, 2);
      const enterTile = new Vector2(2, 2);

      mockSubject.next({
        exitTile,
        enterTile,
      });
      const res = await prom;
      expect(res).toEqual({ charId: "player", exitTile, enterTile });
    });

    it("should unsubscribe from positionChanged if char removed", async () => {
      const mockSubject = new Subject<PositionChange>();
      mockPositionChanged.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      gridEngine.removeCharacter("player");
      const nextMock = jest.fn();

      gridEngine.positionChanged().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      const exitTile = new Vector2(1, 2);
      const enterTile = new Vector2(2, 2);

      mockSubject.next({ exitTile, enterTile });
      expect(nextMock).not.toHaveBeenCalled();
    });

    it("should get chars positionChangeFinished observable", async () => {
      const mockSubject = new Subject<PositionChange>();
      mockPositionChangeFinished.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      const prom = gridEngine
        .positionChangeFinished()
        .pipe(take(1))
        .toPromise();

      const exitTile = new Vector2(1, 2);
      const enterTile = new Vector2(2, 2);

      mockSubject.next({
        exitTile,
        enterTile,
      });
      const res = await prom;
      expect(res).toEqual({ charId: "player", exitTile, enterTile });
    });

    it("should unsubscribe from positionChangeFinished if char removed", async () => {
      const mockSubject = new Subject<PositionChange>();
      mockPositionChangeFinished.mockReturnValue(mockSubject);
      gridEngine.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
          },
        ],
      });

      gridEngine.removeCharacter("player");
      const nextMock = jest.fn();

      gridEngine.positionChangeFinished().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      const exitTile = new Vector2(1, 2);
      const enterTile = new Vector2(2, 2);

      mockSubject.next({ exitTile, enterTile });
      expect(nextMock).not.toHaveBeenCalled();
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
      expectCharUnknownException(() => gridEngine.moveLeft(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() => gridEngine.moveRight(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() => gridEngine.moveUp(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() => gridEngine.moveDown(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() =>
        gridEngine.moveRandomly(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.stopMovement(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.stopMovingRandomly(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() => gridEngine.setSpeed(UNKNOWN_CHAR_ID, 4));
      expectCharUnknownException(() =>
        gridEngine.moveTo(UNKNOWN_CHAR_ID, new Vector2(3, 4))
      );
      expectCharUnknownException(() =>
        gridEngine.removeCharacter(UNKNOWN_CHAR_ID)
      );

      expectCharUnknownException(() =>
        gridEngine.stopFollowing(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.setWalkingAnimationMapping(UNKNOWN_CHAR_ID, <any>{})
      );
      expectCharUnknownException(() => gridEngine.isMoving(UNKNOWN_CHAR_ID));
      expectCharUnknownException(() =>
        gridEngine.getFacingDirection(UNKNOWN_CHAR_ID)
      );
      expectCharUnknownException(() =>
        gridEngine.turnTowards(UNKNOWN_CHAR_ID, Direction.LEFT)
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
      gridEngine = new GridEngine(sceneMock, pluginManagerMock);
    });

    function expectUninitializedException(fn: () => any) {
      expect(() => fn()).toThrow("Plugin not initialized");
    }

    it("should throw error if plugin not created", () => {
      expectUninitializedException(() => gridEngine.getPosition(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.setPosition(SOME_CHAR_ID, new Vector2(1, 2))
      );
      expectUninitializedException(() =>
        gridEngine.move(SOME_CHAR_ID, Direction.LEFT)
      );
      expectUninitializedException(() => gridEngine.moveLeft(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.moveRight(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.moveUp(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.moveDown(SOME_CHAR_ID));
      expectUninitializedException(() => gridEngine.moveRandomly(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.moveTo(SOME_CHAR_ID, new Vector2(2, 3))
      );
      expectUninitializedException(() => gridEngine.stopMovement(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.stopMovingRandomly(SOME_CHAR_ID)
      );
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
        gridEngine.stopFollowing(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngine.setWalkingAnimationMapping(SOME_CHAR_ID, <any>{})
      );
      expectUninitializedException(() => gridEngine.isMoving(SOME_CHAR_ID));
      expectUninitializedException(() =>
        gridEngine.getFacingDirection(SOME_CHAR_ID)
      );
      expectUninitializedException(() =>
        gridEngine.turnTowards(SOME_CHAR_ID, Direction.LEFT)
      );
      expectUninitializedException(() => gridEngine.getAllCharacters());
    });
  });
});
