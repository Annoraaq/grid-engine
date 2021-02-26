import { Subject, of } from "rxjs";
import { take } from "rxjs/operators";
import * as Phaser from "phaser";
import { Direction } from "./Direction/Direction";
import { GridCharacter } from "./GridCharacter/GridCharacter";
const mockSetTilePositon = jest.fn();
const mockMove = jest.fn();
const mockUpdate = jest.fn();
const mockGetTilePos = jest.fn();
const mockAddCharacter = jest.fn();
const mockRemoveCharacter = jest.fn();
const mockTargetMovementRemoveCharacter = jest.fn();
const mockSetSpeed = jest.fn();
const mockSetWalkingAnimationMapping = jest.fn();
const mockRandomMovementUpdate = jest.fn();
const mockTargetMovementUpdate = jest.fn();
const mockTargetMovementAddCharacter = jest.fn();
const mockMovementStarted = jest.fn();
const mockMovementStopped = jest.fn();
const mockDirectionChanged = jest.fn();
const mockFollowMovement = {
  addCharacter: jest.fn(),
  removeCharacter: jest.fn(),
  update: jest.fn(),
};
const mockGridTileMap = {
  addCharacter: jest.fn(),
  removeCharacter: jest.fn(),
};
const mockGridTilemapConstructor = jest.fn(function (
  _tilemap,
  _firstLayerAboveChar?
) {
  return mockGridTileMap;
});

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
jest.mock("./GridCharacter/GridCharacter", function () {
  return {
    GridCharacter: jest.fn((id) => {
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
      };
    }),
  };
});

jest.mock("./RandomMovement/RandomMovement", () => ({
  RandomMovement: jest.fn(() => ({
    addCharacter: mockAddCharacter,
    removeCharacter: mockRemoveCharacter,
    update: mockRandomMovementUpdate,
  })),
}));

jest.mock("./TargetMovement/TargetMovement", () => ({
  TargetMovement: jest.fn(() => ({
    addCharacter: mockTargetMovementAddCharacter,
    removeCharacter: mockTargetMovementRemoveCharacter,
    update: mockTargetMovementUpdate,
  })),
}));

jest.mock("./FollowMovement/FollowMovement", () => ({
  FollowMovement: jest.fn(function () {
    return mockFollowMovement;
  }),
}));

jest.mock("./GridTilemap/GridTilemap");

import { GridMovementPlugin } from "./GridMovementPlugin";

describe("GridMovementPlugin", () => {
  let gridMovementPlugin: GridMovementPlugin;
  let sceneMock;
  let pluginManagerMock;
  let tileMapMock;
  let playerSpriteMock;

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
    };
    playerSpriteMock = {};
    mockTargetMovementUpdate.mockReset();
    mockRandomMovementUpdate.mockReset();
    mockRemoveCharacter.mockReset();
    mockTargetMovementRemoveCharacter.mockReset();
    mockUpdate.mockReset();
    mockFollowMovement.addCharacter.mockReset();
    mockFollowMovement.removeCharacter.mockReset();
    mockFollowMovement.update.mockReset();
    mockMovementStarted.mockReset().mockReturnValue(of());
    mockMovementStopped.mockReset().mockReturnValue(of());
    mockDirectionChanged.mockReset().mockReturnValue(of());
  });

  it("should boot", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.boot();
    expect(sceneMock.sys.events.on).toHaveBeenCalledWith(
      "update",
      gridMovementPlugin.update,
      gridMovementPlugin
    );
  });

  it("should init tilemap", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
    });
    expect(mockGridTilemapConstructor).toHaveBeenCalledWith(tileMapMock);
  });

  it("should init tilemap with deprecated firstLayerAboveChar", () => {
    console.warn = jest.fn();
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
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
      "PhaserGridMovementPlugin: Config property `firstLayerAboveChar` is deprecated. Use a property `alwaysTop` on the tilemap layers instead."
    );
  });

  it("should init player", () => {
    const containerMock = {};
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          container: <any>containerMock,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tilemap: mockGridTileMap,
      tileSize: 32,
      speed: 4,
      walkingAnimationEnabled: true,
      container: containerMock,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(0, 0)
    );
  });

  it("should still support deprecated characterIndex property", () => {
    console.warn = jest.fn();
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          characterIndex: 2,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tilemap: mockGridTileMap,
      tileSize: 32,
      speed: 4,
      walkingAnimationMapping: 2,
      walkingAnimationEnabled: true,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(0, 0)
    );

    expect(console.warn).toHaveBeenCalledWith(
      "PhaserGridMovementPlugin: CharacterConfig property `characterIndex` is deprecated. Use `walkingAnimtionMapping` instead."
    );
  });

  it("should prefer walkingAnimationMapping over charIndex", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
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
      tileSize: 32,
      speed: 4,
      walkingAnimationMapping: 3,
      walkingAnimationEnabled: true,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(0, 0)
    );
  });

  it("should init player without walking animation", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          walkingAnimationEnabled: false,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tileSize: 32,
      tilemap: mockGridTileMap,
      speed: 4,
      walkingAnimationMapping: 3,
      walkingAnimationEnabled: false,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(0, 0)
    );
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
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tileSize: 32,
      tilemap: mockGridTileMap,
      speed: 4,
      walkingAnimationMapping,
      walkingAnimationEnabled: true,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(0, 0)
    );
  });

  it("should use config startPosition", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          startPosition: new Phaser.Math.Vector2(3, 4),
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(3, 4)
    );
  });

  it("should use config speed", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
          speed: 2,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridCharacter).toHaveBeenCalledWith("player", {
      sprite: playerSpriteMock,
      tileSize: 32,
      tilemap: mockGridTileMap,
      speed: 2,
      walkingAnimationMapping: 3,
      walkingAnimationEnabled: true,
    });
  });

  it("should move player left", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });

    gridMovementPlugin.moveLeft("player");

    expect(mockMove).toHaveBeenCalledWith(Direction.LEFT);
  });

  it("should move player right", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });

    gridMovementPlugin.moveRight("player");

    expect(mockMove).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move player up", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });

    gridMovementPlugin.moveUp("player");

    expect(mockMove).toHaveBeenCalledWith(Direction.UP);
  });

  it("should move player down", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });

    gridMovementPlugin.moveDown("player");

    expect(mockMove).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should update", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });

    gridMovementPlugin.update(123, 456);

    expect(mockRandomMovementUpdate).toHaveBeenCalledWith(456);
    expect(mockTargetMovementUpdate).toHaveBeenCalled();
    expect(mockFollowMovement.update).toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledWith(456);
  });

  it("should get tile position", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    mockGetTilePos.mockReturnValue(new Phaser.Math.Vector2(3, 4));

    expect(gridMovementPlugin.getPosition("player")).toEqual(
      new Phaser.Math.Vector2(3, 4)
    );
  });

  it("should move randomly", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.moveRandomly("player", 123, 3);
    expect(mockAddCharacter).toHaveBeenCalledWith(expect.anything(), 123, 3);
  });

  it("should move to coordinates", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    const targetVec = new Phaser.Math.Vector2(3, 4);
    gridMovementPlugin.moveTo("player", targetVec);
    expect(mockTargetMovementAddCharacter).toHaveBeenCalledWith(
      expect.anything(),
      targetVec
    );
  });

  it("should stop moving randomly", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.stopMovingRandomly("player");
    expect(mockRemoveCharacter).toHaveBeenCalled();
  });

  it("should set speed", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.setSpeed("player", 2);
    expect(mockSetSpeed).toHaveBeenCalledWith(2);
  });

  it("should not call update before create", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.update(123, 456);
    expect(mockRandomMovementUpdate).not.toHaveBeenCalled();
    expect(mockTargetMovementUpdate).not.toHaveBeenCalled();
  });

  it("should add chars on the go", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.addCharacter({
      id: "player",
      sprite: playerSpriteMock,
      walkingAnimationMapping: 3,
    });
    gridMovementPlugin.update(123, 456);
    expect(mockUpdate).toHaveBeenCalledTimes(1);
  });

  it("should remove chars on the go", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.removeCharacter("player");
    gridMovementPlugin.update(123, 456);
    expect(mockRemoveCharacter).toHaveBeenCalledWith("player");
    expect(mockTargetMovementRemoveCharacter).toHaveBeenCalledWith("player");
    expect(mockRemoveCharacter).toHaveBeenCalledWith("player");
    expect(mockFollowMovement.removeCharacter).toHaveBeenCalledWith("player");
    expect(mockGridTileMap.removeCharacter).toHaveBeenCalledWith("player");
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("should check if char is registered", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.addCharacter({
      id: "player2",
      sprite: playerSpriteMock,
      walkingAnimationMapping: 3,
    });
    expect(gridMovementPlugin.hasCharacter("player")).toBe(true);
    expect(gridMovementPlugin.hasCharacter("player2")).toBe(true);
    expect(gridMovementPlugin.hasCharacter("unknownCharId")).toBe(false);
  });

  it("should follow a char", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
        {
          id: "player2",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.follow("player", "player2", 7, true);
    expect(mockFollowMovement.addCharacter).toHaveBeenCalledWith(
      // @ts-ignore
      expect.toBeCharacter("player"),
      // @ts-ignore
      expect.toBeCharacter("player2"),
      7,
      true
    );
  });

  it("should follow a char with default distance", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
        {
          id: "player2",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.follow("player", "player2");
    expect(mockFollowMovement.addCharacter).toHaveBeenCalledWith(
      // @ts-ignore
      expect.toBeCharacter("player"),
      // @ts-ignore
      expect.toBeCharacter("player2"),
      0,
      false
    );
  });

  it("should stop following", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
        {
          id: "player2",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.stopFollowing("player");
    expect(mockFollowMovement.removeCharacter).toHaveBeenCalledWith("player");
  });

  it("should set walkingAnimationMapping", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        },
      ],
      firstLayerAboveChar: 3,
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
    gridMovementPlugin.setWalkingAnimationMapping("player", mockMapping);
    expect(mockSetWalkingAnimationMapping).toHaveBeenCalledWith(mockMapping);
  });

  describe("Observables", () => {
    it("should get chars movementStarted observable", async () => {
      const mockSubject = new Subject<Direction>();
      mockMovementStarted.mockReturnValue(mockSubject);
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
      gridMovementPlugin.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
          },
        ],
        firstLayerAboveChar: 3,
      });

      const prom = gridMovementPlugin
        .movementStarted()
        .pipe(take(1))
        .toPromise();

      mockSubject.next(Direction.LEFT);
      const res = await prom;
      expect(res).toEqual(["player", Direction.LEFT]);
    });

    it("should unsubscribe from movementStarted if char removed", async () => {
      const mockSubject = new Subject<Direction>();
      mockMovementStarted.mockReturnValue(mockSubject);
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
      gridMovementPlugin.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
          },
        ],
        firstLayerAboveChar: 3,
      });

      gridMovementPlugin.removeCharacter("player");
      const nextMock = jest.fn();

      gridMovementPlugin.movementStarted().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      mockSubject.next(Direction.LEFT);
      expect(nextMock).not.toHaveBeenCalled();
    });

    it("should get chars movementStopped observable", async () => {
      const mockSubject = new Subject<Direction>();
      mockMovementStopped.mockReturnValue(mockSubject);
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
      gridMovementPlugin.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
          },
        ],
        firstLayerAboveChar: 3,
      });

      const prom = gridMovementPlugin
        .movementStopped()
        .pipe(take(1))
        .toPromise();

      mockSubject.next(Direction.LEFT);
      const res = await prom;
      expect(res).toEqual(["player", Direction.LEFT]);
    });

    it("should unsubscribe from movementStopped if char removed", async () => {
      const mockSubject = new Subject<Direction>();
      mockMovementStopped.mockReturnValue(mockSubject);
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
      gridMovementPlugin.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
          },
        ],
        firstLayerAboveChar: 3,
      });

      gridMovementPlugin.removeCharacter("player");
      const nextMock = jest.fn();

      gridMovementPlugin.movementStopped().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      mockSubject.next(Direction.LEFT);
      expect(nextMock).not.toHaveBeenCalled();
    });

    it("should get chars directionChanged observable", async () => {
      const mockSubject = new Subject<Direction>();
      mockDirectionChanged.mockReturnValue(mockSubject);
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
      gridMovementPlugin.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
          },
        ],
        firstLayerAboveChar: 3,
      });

      const prom = gridMovementPlugin
        .directionChanged()
        .pipe(take(1))
        .toPromise();

      mockSubject.next(Direction.LEFT);
      const res = await prom;
      expect(res).toEqual(["player", Direction.LEFT]);
    });

    it("should unsubscribe from directionChanged if char removed", async () => {
      const mockSubject = new Subject<Direction>();
      mockDirectionChanged.mockReturnValue(mockSubject);
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
      gridMovementPlugin.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
          },
        ],
        firstLayerAboveChar: 3,
      });

      gridMovementPlugin.removeCharacter("player");
      const nextMock = jest.fn();

      gridMovementPlugin.directionChanged().subscribe({
        complete: jest.fn(),
        next: nextMock,
      });

      mockSubject.next(Direction.LEFT);
      expect(nextMock).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling unknown char id", () => {
    beforeEach(() => {
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
      gridMovementPlugin.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            walkingAnimationMapping: 3,
          },
        ],
        firstLayerAboveChar: 3,
      });
    });

    it("should throw error if getPosition is invoked", () => {
      expect(() => gridMovementPlugin.getPosition("unknownCharId")).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if moveLeft is invoked", () => {
      expect(() => gridMovementPlugin.moveLeft("unknownCharId")).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if moveRight is invoked", () => {
      expect(() => gridMovementPlugin.moveRight("unknownCharId")).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if moveUp is invoked", () => {
      expect(() => gridMovementPlugin.moveUp("unknownCharId")).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if moveDown is invoked", () => {
      expect(() => gridMovementPlugin.moveDown("unknownCharId")).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if moveRandomly is invoked", () => {
      expect(() => gridMovementPlugin.moveRandomly("unknownCharId")).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if stopMovingRandomly is invoked", () => {
      expect(() =>
        gridMovementPlugin.stopMovingRandomly("unknownCharId")
      ).toThrow("Character unknown");
    });

    it("should throw error if setSpeed is invoked", () => {
      expect(() => gridMovementPlugin.setSpeed("unknownCharId", 4)).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if moveTo is invoked", () => {
      expect(() =>
        gridMovementPlugin.moveTo(
          "unknownCharId",
          new Phaser.Math.Vector2(3, 4)
        )
      ).toThrow("Character unknown");
    });

    it("should throw error if removeCharacter is invoked", () => {
      expect(() => gridMovementPlugin.removeCharacter("unknownCharId")).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if follow is invoked", () => {
      expect(() =>
        gridMovementPlugin.follow("unknownCharId", "player")
      ).toThrow("Character unknown");
      expect(() =>
        gridMovementPlugin.follow("player", "unknownCharId")
      ).toThrow("Character unknown");
      expect(() =>
        gridMovementPlugin.follow("unknownCharId", "unknownCharId")
      ).toThrow("Character unknown");
    });

    it("should throw error if stopFollowing is invoked", () => {
      expect(() => gridMovementPlugin.stopFollowing("unknownCharId")).toThrow(
        "Character unknown"
      );
    });

    it("should throw error if setWalkingAnimationMapping is invoked", () => {
      expect(() =>
        gridMovementPlugin.setWalkingAnimationMapping("unknownCharId", <any>{})
      ).toThrow("Character unknown");
    });
  });

  describe("invokation of methods if not created properly", () => {
    beforeEach(() => {
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    });

    it("should throw error if getPosition is invoked", () => {
      expect(() => gridMovementPlugin.getPosition("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if moveLeft is invoked", () => {
      expect(() => gridMovementPlugin.moveLeft("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if moveRight is invoked", () => {
      expect(() => gridMovementPlugin.moveRight("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if moveUp is invoked", () => {
      expect(() => gridMovementPlugin.moveUp("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if moveDown is invoked", () => {
      expect(() => gridMovementPlugin.moveDown("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if moveRandomly is invoked", () => {
      expect(() => gridMovementPlugin.moveRandomly("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if moveTo is invoked", () => {
      expect(() =>
        gridMovementPlugin.moveTo("someCharId", new Phaser.Math.Vector2(2, 3))
      ).toThrow("Plugin not initialized");
    });

    it("should throw error if stopMovingRandomly is invoked", () => {
      expect(() => gridMovementPlugin.stopMovingRandomly("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if setSpeed is invoked", () => {
      expect(() => gridMovementPlugin.setSpeed("someCharId", 3)).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if addCharacter is invoked", () => {
      expect(() =>
        gridMovementPlugin.addCharacter({
          id: "player",
          sprite: playerSpriteMock,
          walkingAnimationMapping: 3,
        })
      ).toThrow("Plugin not initialized");
    });

    it("should throw error if hasCharacter is invoked", () => {
      expect(() => gridMovementPlugin.hasCharacter("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if removeCharacter is invoked", () => {
      expect(() => gridMovementPlugin.removeCharacter("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if follow is invoked", () => {
      expect(() =>
        gridMovementPlugin.follow("someCharId", "someOtherCharId")
      ).toThrow("Plugin not initialized");
    });

    it("should throw error if stopFollowing is invoked", () => {
      expect(() => gridMovementPlugin.stopFollowing("someCharId")).toThrow(
        "Plugin not initialized"
      );
    });

    it("should throw error if setWalkingAnimationMapping is invoked", () => {
      expect(() =>
        gridMovementPlugin.setWalkingAnimationMapping("someCharId", <any>{})
      ).toThrow("Plugin not initialized");
    });
  });
});
