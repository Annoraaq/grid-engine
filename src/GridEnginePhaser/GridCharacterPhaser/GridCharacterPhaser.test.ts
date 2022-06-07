import { CharacterAnimation } from "./../../GridCharacter/CharacterAnimation/CharacterAnimation";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { GridTilemap } from "./../../GridTilemap/GridTilemap";
import { GridCharacterPhaser } from "./GridCharacterPhaser";
import * as Phaser from "phaser";
import { Direction } from "../../Direction/Direction";
import { CharacterData } from "../../GridEngine";

// Hack to get Phaser included at runtime
((_a) => {
  // do nothing
})(Phaser);

// const tmMock = {
//   layers: [],
// } as any;

// const gridTilemap = new GridTilemap(tmMock);
// const gridChar = new GridCharacter("testChar", {
//   tilemap: gridTilemap,
//   speed: 3,
//   collidesWithTiles: true,
// });

// jest.mock("../../GridCharacter/GridCharacter", function () {
//   return {
//     GridCharacter: jest.fn(() => gridChar),
//   };
// });

// const mockCharLayers = [
//   {
//     name: "layer1",
//     tilemapLayer: {
//       setDepth: jest.fn(),
//       scale: 3,
//       tileset: "Cloud City",
//     },
//     properties: [
//       {
//         name: "ge_alwaysTop",
//         value: true,
//       },
//     ],
//   },
//   {
//     name: "layer2",
//     tilemapLayer: {
//       setDepth: jest.fn(),
//       scale: 3,
//       tileset: "Cloud City",
//     },
//     properties: [
//       {
//         name: "ge_charLayer",
//         value: "charLayer1",
//       },
//     ],
//   },
//   {
//     name: "layer3",
//     tilemapLayer: {
//       setDepth: jest.fn(),
//       scale: 3,
//       tileset: "Cloud City",
//     },
//     properties: [],
//   },
//   {
//     name: "layer4",
//     tilemapLayer: {
//       setDepth: jest.fn(),
//       scale: 3,
//       tileset: "Cloud City",
//     },
//     properties: [
//       {
//         name: "ge_charLayer",
//         value: "charLayer2",
//       },
//     ],
//   },
// ];

describe("GridCharacterPhaser", () => {
  let gridTilemap: GridTilemap;
  let tilemapMock;
  let mockNewSprite;
  let sceneMock;
  let blankLayerMock;
  let spriteMock;

  beforeEach(() => {
    spriteMock = {
      x: 10,
      y: 12,
      displayWidth: 20,
      displayHeight: 40,
      width: 20,
      setOrigin: jest.fn(),
      texture: {
        source: [{ width: 100 }],
      },
      setFrame: jest.fn(),
      setDepth: jest.fn(),
      scale: 2,
    } as any;
    blankLayerMock = {
      scale: 0,
      putTileAt: jest.fn(),
      setDepth: jest.fn(),
    };
    tilemapMock = {
      layers: [
        {
          name: "layer1",
          tilemapLayer: {
            setDepth: jest.fn(),
            scale: 3,
            tileset: "Cloud City",
          },
          properties: [],
        },
        {
          name: "layer2",
          tilemapLayer: {
            setDepth: jest.fn(),
            tileset: "Cloud City",
            scale: 3,
          },
          properties: [],
        },
      ],
      tileWidth: 16,
      tileHeight: 16,
      width: 20,
      height: 30,
      getTileAt: jest.fn(),
      hasTileAt: jest.fn(),
      createBlankLayer: jest.fn().mockReturnValue(blankLayerMock),
    };
    mockNewSprite = {
      setCrop: jest.fn(),
      setOrigin: jest.fn(),
      scale: 1,
      displayWidth: 30,
    };
    sceneMock = {
      sys: { events: { once: jest.fn(), on: jest.fn() } },
      add: { sprite: jest.fn().mockReturnValue(mockNewSprite) },
    };
    gridTilemap = new GridTilemap(tilemapMock);
  });

  function createChar(charData: CharacterData, layerOverlay: boolean) {
    return new GridCharacterPhaser(
      charData,
      sceneMock,
      gridTilemap,
      layerOverlay
    );
  }

  it("should create a grid character", () => {
    const walkingAnimationMock = {} as any;
    const startPos = { x: 5, y: 6 };
    const containerMock = {} as any;
    const charData = {
      id: "charID",
      sprite: spriteMock,
      walkingAnimationMapping: walkingAnimationMock,
      speed: 5,
      container: containerMock,
      offsetX: 5,
      offsetY: 6,
      collides: true,
      facingDirection: Direction.RIGHT,
      startPosition: startPos,
      charLayer: "someLayer",
    };
    const gridCharPhaser = createChar(charData, true);

    const gridChar = gridCharPhaser.getGridCharacter();
    expect(gridChar.getId()).toBe("charID");
    expect(gridCharPhaser.getSprite()).toBe(spriteMock);
    expect(gridCharPhaser.getLayerOverlaySprite()).toBe(mockNewSprite);
    expect(gridChar.getWalkingAnimationMapping()).toBe(walkingAnimationMock);
    expect(gridChar.getCharacterIndex()).toBe(-1);
    expect(gridChar.getSpeed()).toBe(5);
    expect(gridChar.getTilePos().position).toEqual(startPos);
    expect(gridCharPhaser.getContainer()).toBe(containerMock);
    expect(gridChar.getOffsetX()).toBe(5);
    expect(gridChar.getOffsetY()).toBe(6);
    expect(gridChar.getFacingDirection()).toBe(Direction.RIGHT);
    expect(gridChar.collidesWithTiles()).toBe(true);
    expect(gridChar.getCollisionGroups()).toEqual(["geDefault"]);
    expect(gridChar.getTilePos().layer).toBe("someLayer");
    expect(gridChar.engineOffset).toEqual(
      new Vector2(
        (tilemapMock.tileWidth * tilemapMock.layers[0].tilemapLayer.scale) / 2 -
          spriteMock.displayWidth / 2,

        -spriteMock.displayHeight +
          tilemapMock.tileHeight * tilemapMock.layers[0].tilemapLayer.scale
      )
    );

    expect(spriteMock.setOrigin).toHaveBeenCalledWith(0, 0);
    expect(gridChar.getAnimation()?.getWalkingAnimationMapping()).toBe(
      walkingAnimationMock
    );
    expect(gridChar.getAnimation()?.getCharacterIndex()).toBe(-1);
    expect(gridChar.getAnimation()?.getCharsInRow()).toBe(
      spriteMock.texture.source[0].width /
        spriteMock.width /
        CharacterAnimation.FRAMES_CHAR_ROW
    );

    expect(gridChar.getAnimation()?.isEnabled()).toBe(true);
  });

  it("should update sprite on animation changes", () => {
    const charData = {
      id: "charID",
      sprite: spriteMock,
      walkingAnimationMapping: 3,
    };
    const gridCharPhaser = createChar(charData, true);
    const gridChar = gridCharPhaser.getGridCharacter();

    (gridChar.getAnimation()?.frameChange() as any).next(13);
    expect(spriteMock.setFrame).toHaveBeenCalledWith(13);
  });

  it("should enable animation for charIndex", () => {
    const charData = {
      id: "charID",
      sprite: spriteMock,
      walkingAnimationMapping: 3,
    };
    const gridCharPhaser = createChar(charData, true);
    const gridChar = gridCharPhaser.getGridCharacter();

    expect(gridChar.getCharacterIndex()).toBe(3);
    expect(gridChar.getAnimation()?.isEnabled()).toBe(true);
  });

  it("should set overlay sprite properties on creation", () => {
    const charData = {
      id: "charID",
      sprite: spriteMock,
      walkingAnimationMapping: 3,
    };
    createChar(charData, true);
    expect(mockNewSprite.scale).toEqual(spriteMock.scale);
    expect(mockNewSprite.setCrop).toHaveBeenCalledWith(
      0,
      0,
      mockNewSprite.displayWidth,
      spriteMock.height -
        (tilemapMock.tileHeight * tilemapMock.layers[0].tilemapLayer.scale) /
          mockNewSprite.scale
    );
    expect(mockNewSprite.setOrigin).toHaveBeenCalledWith(0, 0);
  });

  // it("should set depth of sprite on creation", () => {
  //   const charData = {
  //     id: "charID",
  //     sprite: spriteMock,
  //     walkingAnimationMapping: 3,
  //   };
  //   new GridCharacterPhaser(charData, sceneMock, gridTilemap, true);

  //   expect(spriteMock.setDepth).toHaveBeenCalledWith(
  //     Number(`1.00000${spriteMock.displayHeight + spriteMock.y}`)
  //   );
  // });

  // fit("should set depth of sprite with transitionLayer", () => {
  //   const charData = {
  //     id: "charID",
  //     sprite: spriteMock,
  //     walkingAnimationMapping: 3,
  //     charLayer: "charLayer1",
  //     collides: false,
  //   };
  //   tilemapMock.layers = mockCharLayers;
  //   gridTilemap = new GridTilemap(tilemapMock);
  //   gridTilemap.setTransition(new Vector2(0, 1), "charLayer1", "charLayer2");
  //   const gridCharPhaser = new GridCharacterPhaser(
  //     charData,
  //     sceneMock,
  //     gridTilemap,
  //     true
  //   );
  //   const gridChar = gridCharPhaser.getGridCharacter();
  //   gridChar.move(Direction.DOWN);
  //   gridChar.update(1);
  //   console.log("ntp", gridChar.getNextTilePos());

  //   const depthOfCharLayer2 = 2;
  //   expect(spriteMock.setDepth).toHaveBeenCalledWith(
  //     Number(
  //       `1.00000${spriteMock.displayHeight + spriteMock.y + depthOfCharLayer2}`
  //     )
  //   );
  // });

  it("should disable animation", () => {
    const charData = {
      id: "charID",
      sprite: spriteMock,
      walkingAnimationMapping: undefined,
    };
    const gridCharPhaser = createChar(charData, true);
    const gridChar = gridCharPhaser.getGridCharacter();

    expect(gridChar.getAnimation()?.isEnabled()).toBe(false);
  });

  it("should set standing frame on creation", () => {
    const charData = {
      id: "charID",
      sprite: spriteMock,
      walkingAnimationMapping: 3,
    };

    const standingFrameNumber = 25;
    createChar(charData, true);

    expect(spriteMock.setFrame).toHaveBeenCalledWith(standingFrameNumber);
  });

  it("should create a grid character with default values", () => {
    const charData = {
      id: "charID",
    };
    const gridCharPhaser = createChar(charData, false);

    const gridChar = gridCharPhaser.getGridCharacter();
    expect(gridChar.getId()).toBe("charID");
    expect(gridCharPhaser.getSprite()).toBe(undefined);
    expect(gridCharPhaser.getLayerOverlaySprite()).toBe(undefined);
    expect(gridChar.getWalkingAnimationMapping()).toBe(undefined);
    expect(gridChar.getSpeed()).toBe(4);
    expect(gridCharPhaser.getContainer()).toBe(undefined);
    expect(gridChar.getOffsetX()).toBe(0);
    expect(gridChar.getOffsetY()).toBe(0);
    expect(gridChar.collidesWithTiles()).toBe(true);
    expect(gridChar.getCollisionGroups()).toEqual(["geDefault"]);
    expect(gridChar.getTilePos().layer).toBe(undefined);
  });

  it("should create a grid character with collides=false", () => {
    const charData = {
      id: "charID",
      collides: false,
    };

    const gridCharPhaser = createChar(charData, false);
    const gridChar = gridCharPhaser.getGridCharacter();

    expect(gridChar.collidesWithTiles()).toBe(false);
    expect(gridChar.getCollisionGroups()).toEqual([]);
  });

  it("should create a grid character with collidesWithTiles=true", () => {
    const charData = {
      id: "charID",
      collides: {
        collidesWithTiles: true,
      },
    };

    const gridCharPhaser = createChar(charData, false);
    const gridChar = gridCharPhaser.getGridCharacter();

    expect(gridChar.collidesWithTiles()).toBe(true);
    expect(gridChar.getCollisionGroups()).toEqual(["geDefault"]);
  });

  it("should create a grid character with collidesWithTiles=false", () => {
    const charData = {
      id: "charID",
      collides: {
        collidesWithTiles: false,
      },
    };

    const gridCharPhaser = createChar(charData, false);
    const gridChar = gridCharPhaser.getGridCharacter();

    expect(gridChar.collidesWithTiles()).toBe(false);
    expect(gridChar.getCollisionGroups()).toEqual(["geDefault"]);
  });

  it("should create a grid character with collisionGroups", () => {
    const charData = {
      id: "charID",
      collides: {
        collisionGroups: ["testGroup"],
      },
    };
    const gridCharPhaser = createChar(charData, false);
    const gridChar = gridCharPhaser.getGridCharacter();

    expect(gridChar.collidesWithTiles()).toBe(true);
    expect(gridChar.getCollisionGroups()).toEqual(["testGroup"]);
  });

  it("should keep a sprite", () => {
    const charData = {
      id: "charID",
    };

    const gridCharPhaser = createChar(charData, false);
    const spriteMock = {} as any;
    gridCharPhaser.setSprite(spriteMock);

    expect(gridCharPhaser.getSprite()).toBe(spriteMock);
  });

  it("should keep a layer overlay sprite", () => {
    const charData = {
      id: "charID",
    };
    const gridCharPhaser = createChar(charData, false);
    const spriteMock = {} as any;
    gridCharPhaser.setLayerOverlaySprite(spriteMock);

    expect(gridCharPhaser.getLayerOverlaySprite()).toBe(spriteMock);
  });

  it("should keep a container", () => {
    const charData = {
      id: "charID",
    };
    const gridCharPhaser = createChar(charData, false);
    const containerMock = {} as any;
    gridCharPhaser.setContainer(containerMock);

    expect(gridCharPhaser.getContainer()).toBe(containerMock);
  });
});
