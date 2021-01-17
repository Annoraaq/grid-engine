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
const mockRandomMovementUpdate = jest.fn();
const mockTargetMovementUpdate = jest.fn();
const mockTargetMovementAddCharacter = jest.fn();
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

jest.mock("./GridTilemap/GridTilemap");

import { GridMovementPlugin } from "./GridMovementPlugin";
import { GridTilemap } from "./GridTilemap/GridTilemap";

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
          characterIndex: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridTilemap).toHaveBeenCalledWith(tileMapMock, 3);
  });

  it("should init player", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          characterIndex: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridCharacter).toHaveBeenCalledWith(
      "player",
      playerSpriteMock,
      3,
      32,
      expect.any(GridTilemap),
      4
    );
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
          characterIndex: 3,
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
          characterIndex: 3,
          speed: 2,
        },
      ],
      firstLayerAboveChar: 3,
    });
    expect(GridCharacter).toHaveBeenCalledWith(
      "player",
      playerSpriteMock,
      3,
      32,
      expect.any(GridTilemap),
      2
    );
  });

  it("should move player left", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          characterIndex: 3,
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
          characterIndex: 3,
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
          characterIndex: 3,
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
          characterIndex: 3,
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
          characterIndex: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });

    gridMovementPlugin.update(123, 456);

    expect(mockRandomMovementUpdate).toHaveBeenCalledWith(456);
    expect(mockTargetMovementUpdate).toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledWith(456);
  });

  it("should get tile position", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          characterIndex: 3,
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
          characterIndex: 3,
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
          characterIndex: 3,
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
          characterIndex: 3,
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
          characterIndex: 3,
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
      characterIndex: 3,
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
          characterIndex: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.removeCharacter("player");
    gridMovementPlugin.update(123, 456);
    expect(mockRemoveCharacter).toHaveBeenCalledWith("player");
    expect(mockTargetMovementRemoveCharacter).toHaveBeenCalledWith("player");
    expect(mockRemoveCharacter).toHaveBeenCalledWith("player");
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("should check if char is registered", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(tileMapMock, {
      characters: [
        {
          id: "player",
          sprite: playerSpriteMock,
          characterIndex: 3,
        },
      ],
      firstLayerAboveChar: 3,
    });
    gridMovementPlugin.addCharacter({
      id: "player2",
      sprite: playerSpriteMock,
      characterIndex: 3,
    });
    expect(gridMovementPlugin.hasCharacter("player")).toBe(true);
    expect(gridMovementPlugin.hasCharacter("player2")).toBe(true);
    expect(gridMovementPlugin.hasCharacter("unknownCharId")).toBe(false);
  });

  describe("Error Handling unknown char id", () => {
    beforeEach(() => {
      gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
      gridMovementPlugin.create(tileMapMock, {
        characters: [
          {
            id: "player",
            sprite: playerSpriteMock,
            characterIndex: 3,
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
          characterIndex: 3,
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
  });
});
