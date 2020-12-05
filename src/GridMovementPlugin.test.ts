import * as Phaser from "phaser";
import { GridCharacter } from "./GridCharacter/GridCharacter";
const mockSetTilePositon = jest.fn();
jest.mock("./GridPhysics/GridPhysics");
jest.mock("./GridCharacter/GridCharacter", function () {
  return {
    GridCharacter: jest.fn(() => {
      return {
        setTilePosition: mockSetTilePositon,
      };
    }),
  };
});

import { GridMovementPlugin } from "./GridMovementPlugin";
import { GridPhysics } from "./GridPhysics/GridPhysics";

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
          tilemapLayer: { scale: 2 },
        },
      ],
      tileWidth: 16,
    };
    playerSpriteMock = {};
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

  it("should init player", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(playerSpriteMock, tileMapMock);
    expect(GridCharacter).toHaveBeenCalledWith(playerSpriteMock, 6, 32);
    expect(mockSetTilePositon).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(0, 0)
    );
  });

  it("should use config startPosition", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(playerSpriteMock, tileMapMock, {
      startPosition: new Phaser.Math.Vector2(3, 4),
    });
    expect(mockSetTilePositon).toHaveBeenCalledWith(
      new Phaser.Math.Vector2(3, 4)
    );
  });

  it("should init gridPhysics", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(playerSpriteMock, tileMapMock);
    expect(GridPhysics).toHaveBeenCalledWith(
      expect.any(Object),
      tileMapMock,
      32,
      4
    );
  });

  it("should use config speed", () => {
    gridMovementPlugin = new GridMovementPlugin(sceneMock, pluginManagerMock);
    gridMovementPlugin.create(playerSpriteMock, tileMapMock, {
      speed: 2,
    });
    expect(GridPhysics).toHaveBeenCalledWith(
      expect.any(Object),
      tileMapMock,
      32,
      2
    );
  });
});
