import { CharacterAnimation } from "./../../GridCharacter/CharacterAnimation/CharacterAnimation";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { GridTilemap } from "./../../GridTilemap/GridTilemap";
import { GridCharacterPhaser } from "./GridCharacterPhaser";
import * as Phaser from "phaser";
import { Direction } from "../../Direction/Direction";
import { CharacterData } from "../../GridEngine";
import { createSpriteMock } from "../../Utils/MockFactory/MockFactory";

// Hack to get Phaser included at runtime
((_a) => {
  // do nothing
})(Phaser);

describe("GridCharacterPhaser", () => {
  let gridTilemap: GridTilemap;
  let tilemapMock;
  let overlaySpriteMock;
  let sceneMock;
  let blankLayerMock;
  let spriteMock;

  beforeEach(() => {
    spriteMock = createSpriteMock();
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
          properties: [
            {
              name: "ge_charLayer",
              value: "lowerCharLayer",
            },
          ],
        },
        {
          name: "layer2",
          tilemapLayer: {
            setDepth: jest.fn(),
            tileset: "Cloud City",
            scale: 3,
          },
          properties: [
            {
              name: "ge_charLayer",
              value: "testCharLayer",
            },
          ],
        },
      ],
      tileWidth: 16,
      tileHeight: 16,
      width: 20,
      height: 30,
      getTileAt: jest.fn().mockReturnValue({}),
      hasTileAt: jest.fn().mockReturnValue(true),
      createBlankLayer: jest.fn().mockReturnValue(blankLayerMock),
    };
    overlaySpriteMock = {
      setCrop: jest.fn(),
      setOrigin: jest.fn(),
      scale: 1,
      displayWidth: 30,
      displayHeight: 21,
      y: 20,
      setDepth: jest.fn(),
    };
    sceneMock = {
      sys: { events: { once: jest.fn(), on: jest.fn() } },
      add: { sprite: jest.fn().mockReturnValue(overlaySpriteMock) },
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

  describe("On creation", () => {
    it("should create a grid character", () => {
      const walkingAnimationMock = {} as any;
      const startPos = { x: 5, y: 6 };
      const containerMock = { x: 0, y: 0 } as any;
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
      expect(gridCharPhaser.getLayerOverlaySprite()).toBe(overlaySpriteMock);
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
          (tilemapMock.tileWidth * tilemapMock.layers[0].tilemapLayer.scale) /
            2 -
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

      // should set pixel position
      expect(containerMock.x).not.toEqual(0);
      expect(containerMock.y).not.toEqual(0);

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
      expect(overlaySpriteMock.scale).toEqual(spriteMock.scale);
      expect(overlaySpriteMock.setCrop).toHaveBeenCalledWith(
        0,
        0,
        overlaySpriteMock.displayWidth,
        spriteMock.height -
          (tilemapMock.tileHeight * tilemapMock.layers[0].tilemapLayer.scale) /
            overlaySpriteMock.scale
      );
      expect(overlaySpriteMock.setOrigin).toHaveBeenCalledWith(0, 0);
    });

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
        walkingAnimationMapping: 0,
      };

      const standingFrameNumber = 1;
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
      const spriteMock = createSpriteMock();
      gridCharPhaser.setSprite(spriteMock);

      expect(gridCharPhaser.getSprite()).toBe(spriteMock);
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

  describe("set new sprite", () => {
    it("should set overlay sprite properties", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 3,
      };
      const gridCharPhaser = createChar(charData, true);
      const newSpriteMock = createSpriteMock();
      newSpriteMock.scale = 20;
      newSpriteMock.height = 200;
      gridCharPhaser.setSprite(newSpriteMock);

      expect(overlaySpriteMock.scale).toEqual(newSpriteMock.scale);
      expect(overlaySpriteMock.setCrop).toHaveBeenCalledWith(
        0,
        0,
        overlaySpriteMock.displayWidth,
        newSpriteMock.height -
          (tilemapMock.tileHeight * tilemapMock.layers[0].tilemapLayer.scale) /
            overlaySpriteMock.scale
      );
      expect(overlaySpriteMock.setOrigin).toHaveBeenCalledWith(0, 0);
    });

    it("should set old sprite position", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 3,
      };
      const gridCharPhaser = createChar(charData, true);
      gridCharPhaser
        .getGridCharacter()
        .setTilePosition({ position: new Vector2(3, 2), layer: undefined });
      const newSpriteMock = createSpriteMock();
      gridCharPhaser.setSprite(newSpriteMock);

      expect(newSpriteMock.x).toEqual(spriteMock.x);
      expect(newSpriteMock.y).toEqual(spriteMock.y);
    });

    it("should unset sprite", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 3,
      };
      const gridCharPhaser = createChar(charData, true);
      gridCharPhaser.setSprite(undefined);
      expect(gridCharPhaser.getSprite()).toBeUndefined();
      expect(gridCharPhaser.getLayerOverlaySprite()).toBeUndefined();
    });

    it("should create new animation", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 3,
      };
      const gridCharPhaser = createChar(charData, true);
      const newSpriteMock = createSpriteMock();
      const gridChar = gridCharPhaser.getGridCharacter();
      const oldAnimation = gridChar.getAnimation();
      gridCharPhaser.setSprite(newSpriteMock);

      (oldAnimation?.frameChange() as any).next(13);
      expect(newSpriteMock.setFrame).not.toHaveBeenCalledWith(13);
      spriteMock.setFrame.mockReset();
      (gridChar.getAnimation()?.frameChange() as any).next(13);
      expect(gridChar.getAnimation()?.isEnabled()).toBe(true);
      expect(newSpriteMock.setFrame).toHaveBeenCalledWith(13);
      expect(spriteMock.setFrame).not.toHaveBeenCalled();
    });

    it("should unsubscribe from old animation", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 3,
      };
      const gridCharPhaser = createChar(charData, true);
      const newSpriteMock = createSpriteMock();
      const gridChar = gridCharPhaser.getGridCharacter();
      gridCharPhaser.setSprite(newSpriteMock);
      const oldAnimation = gridChar.getAnimation();
      gridCharPhaser.setSprite(newSpriteMock);

      newSpriteMock.setFrame.mockReset();
      (oldAnimation?.frameChange() as any).next(13);
      (gridChar.getAnimation()?.frameChange() as any).next(13);

      expect(gridChar.getAnimation()).not.toBe(oldAnimation);
      expect(newSpriteMock.setFrame).toHaveBeenCalledTimes(1);
    });

    it("should disable animation", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
      };
      const gridCharPhaser = createChar(charData, true);
      const newSpriteMock = createSpriteMock();
      const gridChar = gridCharPhaser.getGridCharacter();

      gridCharPhaser.setSprite(newSpriteMock);

      expect(gridChar.getAnimation()?.isEnabled()).toBe(false);
    });

    it("should set standing frame", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 0,
      };
      const standingFrameNumber = 13;
      const gridCharPhaser = createChar(charData, true);
      const newSpriteMock = createSpriteMock();
      const gridChar = gridCharPhaser.getGridCharacter();
      gridChar.turnTowards(Direction.LEFT);

      gridCharPhaser.setSprite(newSpriteMock);

      expect(newSpriteMock.setFrame).toHaveBeenCalledWith(standingFrameNumber);
    });

    it("should set depth of sprite", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 0,
        startPosition: startPos,
      };
      const charLayerDepth = 1;
      const gridCharPhaser = createChar(charData, false);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      checkSpriteDepth(newSpriteMock, charLayerDepth, "0000");
    });

    it("should set depth of sprite on char layer", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 0,
        startPosition: startPos,
        charLayer: "lowerCharLayer",
      };
      const charLayerDepth = 0;
      const gridCharPhaser = createChar(charData, false);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      checkSpriteDepth(newSpriteMock, charLayerDepth, "0000");
    });

    it("should set depth of container", () => {
      const containerMock = {
        y: 20,
        displayHeight: 21,
        setDepth: jest.fn(),
      } as any;
      const startPos = { x: 2, y: 2 };
      const charData = {
        id: "charID",
        sprite: spriteMock,
        container: containerMock,
        walkingAnimationMapping: 0,
        startPosition: startPos,
      };
      const uppermostCharLayerDepth = 1;
      const gridCharPhaser = createChar(charData, false);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      checkSpriteDepth(containerMock, uppermostCharLayerDepth, "0000");
    });

    it("should set depth of pos above for overlay sprite", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 0,
        startPosition: startPos,
        charLayer: "testCharLayer",
      };
      const charLayerDepth = 1;
      const gridCharPhaser = createChar(charData, true);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      checkSpriteDepth(overlaySpriteMock, charLayerDepth, "00000");
    });
  });

  describe("On pixel position change", () => {
    it("should update container pixel pos", () => {
      const containerMock = {
        x: 0,
        y: 0,
      } as any;
      const charData = {
        id: "charID",
        sprite: spriteMock,
        container: containerMock,
      };
      const gridCharPhaser = createChar(charData, false);
      const gridChar = gridCharPhaser.getGridCharacter();
      gridChar.pixelPositionChanged().next(new Vector2(10, 20));

      expect(gridCharPhaser.getContainer()?.x).toBe(10);
      expect(gridCharPhaser.getContainer()?.y).toBe(20);
      expect(gridCharPhaser.getSprite()?.x).toBe(10);
      expect(gridCharPhaser.getSprite()?.y).toBe(12);
    });

    it("should update sprite pixel pos", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
      };
      const gridCharPhaser = createChar(charData, false);
      const gridChar = gridCharPhaser.getGridCharacter();
      gridChar.pixelPositionChanged().next(new Vector2(10, 20));

      expect(gridCharPhaser.getSprite()?.x).toBe(10);
      expect(gridCharPhaser.getSprite()?.y).toBe(20);
    });

    it("should update walking animation", () => {
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 0,
      };
      const walkingRightLeftFootFrame = 26;
      const walkingRightStandingFrame = 25;
      const walkingRightRightFootFrame = 24;
      const gridCharPhaser = createChar(charData, false);
      const gridChar = gridCharPhaser.getGridCharacter();
      gridChar.move(Direction.RIGHT);
      gridChar.update(1);

      // after starting movement, set left foot animation
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingRightLeftFootFrame
      );

      gridChar.move(Direction.RIGHT);
      gridChar.update(200);

      // after walking half a tile, set standing animation
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingRightStandingFrame
      );

      gridChar.move(Direction.RIGHT);
      gridChar.update(300);

      // at the beginning of next tile start with right foot
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingRightRightFootFrame
      );
    });

    it("should set depth of sprite", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 0,
        startPosition: startPos,
      };
      const charLayerDepth = 1;
      const gridCharPhaser = createChar(charData, false);
      const gridChar = gridCharPhaser.getGridCharacter();

      gridChar.move(Direction.RIGHT);
      gridChar.update(10);

      checkSpriteDepth(spriteMock, charLayerDepth, "0000");
    });

    it("should set depth of sprite on char layer", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 0,
        startPosition: startPos,
        charLayer: "lowerCharLayer",
      };
      const charLayerDepth = 0;
      const gridCharPhaser = createChar(charData, false);
      const gridChar = gridCharPhaser.getGridCharacter();

      gridChar.move(Direction.RIGHT);
      gridChar.update(10);

      checkSpriteDepth(spriteMock, charLayerDepth, "0000");
    });

    it("should set depth of container", () => {
      const containerMock = {
        y: 20,
        displayHeight: 21,
        setDepth: jest.fn(),
      } as any;
      const startPos = { x: 2, y: 2 };
      const charData = {
        id: "charID",
        sprite: spriteMock,
        container: containerMock,
        walkingAnimationMapping: 0,
        startPosition: startPos,
      };
      const uppermostCharLayerDepth = 1;
      const gridCharPhaser = createChar(charData, false);
      const gridChar = gridCharPhaser.getGridCharacter();

      gridChar.move(Direction.RIGHT);
      gridChar.update(10);

      checkSpriteDepth(containerMock, uppermostCharLayerDepth, "0000");
    });

    describe("for overlay sprite", () => {
      it("should set depth of pos above", () => {
        const startPos = { x: 2, y: 2 };
        const posAbove = { x: 3, y: 1 };
        gridTilemap.setTransition(
          new Vector2(posAbove),
          "testCharLayer",
          "lowerCharLayer"
        );
        const charData = {
          id: "charID",
          sprite: spriteMock,
          walkingAnimationMapping: 0,
          startPosition: startPos,
          charLayer: "testCharLayer",
        };
        const lowerCharLayerDepth = 0;
        const gridCharPhaser = createChar(charData, true);
        const gridChar = gridCharPhaser.getGridCharacter();

        gridChar.move(Direction.RIGHT);
        gridChar.update(10);

        checkSpriteDepth(overlaySpriteMock, lowerCharLayerDepth, "00000");
      });
    });
  });
});

function checkSpriteDepth(
  spriteMock,
  charLayerDepth: number,
  zeroPrefix: string
) {
  const pixelDepth = spriteMock.y + spriteMock.displayHeight;
  expect(spriteMock.setDepth).toHaveBeenCalledWith(
    +`${charLayerDepth}.${zeroPrefix}${pixelDepth}`
  );
}
