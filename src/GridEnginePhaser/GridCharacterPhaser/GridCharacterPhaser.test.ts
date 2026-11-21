import { CharacterAnimation } from "./../../GridCharacter/CharacterAnimation/CharacterAnimation.js";
import { trackEmit } from "../../Testing/Utils.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { GridCharacterPhaser } from "./GridCharacterPhaser.js";
import { Direction, NumberOfDirections } from "../../Direction/Direction.js";
import { CharacterData, GridEngineHeadless } from "../../GridEngine.js";
import {
  createContainerMock,
  createSpriteMock,
} from "../../Utils/MockFactory/MockFactory.js";
import { take } from "rxjs/operators";
import { PhaserTilemap } from "../../GridTilemap/Phaser/PhaserTilemap.js";
import { GridTilemapPhaser } from "../GridTilemapPhaser/GridTilemapPhaser.js";
import { createPhaserTilemapStub } from "../../Utils/MockFactory/MockPhaserTilemap.js";
import { Tilemaps } from "phaser";

describe("GridCharacterPhaser", () => {
  let gridEngineHeadless: GridEngineHeadless;
  let overlaySpriteMock: Phaser.GameObjects.Sprite;
  let sceneMock: Phaser.Scene;
  let spriteMock: Phaser.GameObjects.Sprite;

  beforeEach(() => {
    spriteMock = createSpriteMock();
    overlaySpriteMock = {
      setCrop: jest.fn(),
      setOrigin: jest.fn(),
      scale: 1,
      displayWidth: 30,
      displayHeight: 21,
      y: 20,
      setDepth: jest.fn(),
    } as unknown as Phaser.GameObjects.Sprite;
    sceneMock = {
      sys: { events: { once: jest.fn(), on: jest.fn() } },
      add: { sprite: jest.fn().mockReturnValue(overlaySpriteMock) },
    } as unknown as Phaser.Scene;
    gridEngineHeadless = new GridEngineHeadless();
  });

  function createChar(
    charData: Partial<CharacterData>,
    layerOverlay: boolean,
    isometric?: boolean,
  ): {
    gridCharPhaser: GridCharacterPhaser;
    gridTilemapPhaser: GridTilemapPhaser;
  } {
    const enrichedCharData = {
      id: "charID",
      sprite: spriteMock,
      walkingAnimationMapping: 3,
      numberOfDirections: NumberOfDirections.FOUR,
      ...charData,
    };
    const tm = createPhaserTilemapStub(
      new Map([
        [
          "lowerCharLayer",
          [
            // prettier-ignore
            ".....",
            ".....",
            ".....",
            ".....",
            ".....",
            ".....",
          ],
        ],
        [
          "testCharLayer",
          [
            // prettier-ignore
            ".....",
            ".....",
            ".....",
            ".....",
            ".....",
            ".....",
          ],
        ],
      ]),
    );
    if (isometric) {
      tm.orientation = Tilemaps.Orientation.ISOMETRIC.toString();
    }
    const phaserTilemap = new PhaserTilemap(tm);
    gridEngineHeadless.create(phaserTilemap, {
      characters: [enrichedCharData],
    });

    const gridTilemap = new GridTilemapPhaser(tm);
    return {
      gridCharPhaser: new GridCharacterPhaser(
        enrichedCharData,
        sceneMock,
        gridTilemap,
        layerOverlay,
        gridEngineHeadless,
      ),
      gridTilemapPhaser: gridTilemap,
    };
  }

  it("should set/get offset", () => {
    const { gridCharPhaser } = createChar({}, true);
    const offsetX = 3;
    const offsetY = 4;
    gridCharPhaser.setOffsetX(offsetX);
    gridCharPhaser.setOffsetY(offsetY);
    expect(gridCharPhaser.getOffsetX()).toEqual(offsetX);
    expect(gridCharPhaser.getOffsetY()).toEqual(offsetY);
  });

  describe("On creation", () => {
    it("should create a grid character", () => {
      const walkingAnimationMock = {} as any;
      const startPos = { x: 5, y: 6 };
      const containerMock = createContainerMock();
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
        numberOfDirections: NumberOfDirections.EIGHT,
        tileWidth: 2,
        tileHeight: 3,
      };
      const { gridCharPhaser } = createChar(charData, true);

      expect(gridCharPhaser.getSprite()).toBe(spriteMock);
      expect(gridCharPhaser.getLayerOverlaySprite()).toBe(overlaySpriteMock);
      expect(gridCharPhaser.getWalkingAnimationMapping()).toBe(
        walkingAnimationMock,
      );
      expect(gridCharPhaser.getContainer()).toBe(containerMock);
      expect(gridCharPhaser.getOffsetX()).toBe(5);
      expect(gridCharPhaser.getOffsetY()).toBe(6);

      expect(spriteMock.setOrigin).toHaveBeenCalledWith(0, 0);
      expect(gridCharPhaser.getAnimation()?.getWalkingAnimationMapping()).toBe(
        walkingAnimationMock,
      );
      expect(gridCharPhaser.getAnimation()?.getCharsInRow()).toBe(
        spriteMock.texture.source[0].width /
          spriteMock.width /
          CharacterAnimation.FRAMES_CHAR_ROW,
      );

      // should set pixel position
      expect(containerMock.x).not.toEqual(0);
      expect(containerMock.y).not.toEqual(0);

      expect(gridCharPhaser.getAnimation()?.isEnabled()).toBe(true);
    });

    it("should update sprite on animation changes", () => {
      const { gridCharPhaser } = createChar({}, true);

      (gridCharPhaser.getAnimation()?.frameChange() as any).next(13);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(13);
    });

    it("should enable animation for charIndex", () => {
      const { gridCharPhaser } = createChar({}, true);

      expect(gridCharPhaser.getWalkingAnimationMapping()).toBe(3);
      expect(gridCharPhaser.getAnimation()?.isEnabled()).toBe(true);
    });

    it("should set overlay sprite properties on creation", () => {
      const tileHeight = 16;
      const scale = 3;
      createChar({}, true);
      expect(overlaySpriteMock.scale).toEqual(spriteMock.scale);
      expect(overlaySpriteMock.setCrop).toHaveBeenCalledWith(
        0,
        0,
        overlaySpriteMock.displayWidth,
        spriteMock.height - (tileHeight * scale) / overlaySpriteMock.scale,
      );
      expect(overlaySpriteMock.setOrigin).toHaveBeenCalledWith(0, 0);
    });

    it("should disable animation", () => {
      const charData = {
        walkingAnimationMapping: undefined,
      };
      const { gridCharPhaser } = createChar(charData, true);

      expect(gridCharPhaser.getAnimation()?.isEnabled()).toBe(false);
    });

    it("should set standing frame on creation", () => {
      const charData = {
        walkingAnimationMapping: 0,
      };

      const standingFrameNumber = 1;
      createChar(charData, true);

      expect(spriteMock.setFrame).toHaveBeenCalledWith(standingFrameNumber);
    });

    it("should create a grid character with default values", () => {
      const charData = {
        numberOfDirections: NumberOfDirections.EIGHT,
        sprite: undefined,
        walkingAnimationMapping: undefined,
      };
      const { gridCharPhaser } = createChar(charData, false);

      expect(gridCharPhaser.getSprite()).toBe(undefined);
      expect(gridCharPhaser.getLayerOverlaySprite()).toBe(undefined);
      expect(gridCharPhaser.getWalkingAnimationMapping()).toBe(undefined);
      expect(gridCharPhaser.getContainer()).toBe(undefined);
      expect(gridCharPhaser.getOffsetX()).toBe(0);
      expect(gridCharPhaser.getOffsetY()).toBe(0);
    });

    it("should keep a sprite", () => {
      const { gridCharPhaser } = createChar({}, false);
      const spriteMock = createSpriteMock();
      gridCharPhaser.setSprite(spriteMock);

      expect(gridCharPhaser.getSprite()).toBe(spriteMock);
    });

    it("should keep a container", () => {
      const { gridCharPhaser } = createChar({}, false);
      const containerMock = createContainerMock();
      gridCharPhaser.setContainer(containerMock);

      expect(gridCharPhaser.getContainer()).toBe(containerMock);
    });
  });

  describe("set new sprite", () => {
    it("should set overlay sprite properties", () => {
      const { gridCharPhaser } = createChar({}, true);
      const newSpriteMock = createSpriteMock();
      newSpriteMock.scale = 20;
      newSpriteMock.height = 200;
      const tileHeight = 16;
      const scale = 3;
      gridCharPhaser.setSprite(newSpriteMock);

      expect(overlaySpriteMock.scale).toEqual(newSpriteMock.scale);
      expect(overlaySpriteMock.setCrop).toHaveBeenCalledWith(
        0,
        0,
        overlaySpriteMock.displayWidth,
        newSpriteMock.height - (tileHeight * scale) / overlaySpriteMock.scale,
      );
      expect(overlaySpriteMock.setOrigin).toHaveBeenCalledWith(0, 0);
    });

    it("should set old sprite position", () => {
      const { gridCharPhaser } = createChar({}, true);
      gridEngineHeadless.setPosition("charID", new Vector2(3, 2));
      const newSpriteMock = createSpriteMock();
      gridCharPhaser.setSprite(newSpriteMock);

      expect(newSpriteMock.x).toEqual(spriteMock.x);
      expect(newSpriteMock.y).toEqual(spriteMock.y);
    });

    it("should unset sprite", () => {
      const { gridCharPhaser } = createChar({}, true);
      gridCharPhaser.setSprite(undefined);
      expect(gridCharPhaser.getSprite()).toBeUndefined();
      expect(gridCharPhaser.getLayerOverlaySprite()).toBeUndefined();
    });

    it("should create new animation", () => {
      const { gridCharPhaser } = createChar({}, true);
      const newSpriteMock = createSpriteMock();
      const oldAnimation = gridCharPhaser.getAnimation();
      gridCharPhaser.setSprite(newSpriteMock);

      (oldAnimation?.frameChange() as any).next(13);
      expect(newSpriteMock.setFrame).not.toHaveBeenCalledWith(13);
      (spriteMock.setFrame as jest.Mock).mockReset();
      (gridCharPhaser.getAnimation()?.frameChange() as any).next(13);
      expect(gridCharPhaser.getAnimation()?.isEnabled()).toBe(true);
      expect(newSpriteMock.setFrame).toHaveBeenCalledWith(13);
      expect(spriteMock.setFrame).not.toHaveBeenCalled();
    });

    it("should unsubscribe from old animation", () => {
      const { gridCharPhaser } = createChar({}, true);
      const newSpriteMock = createSpriteMock();
      gridCharPhaser.setSprite(newSpriteMock);
      const oldAnimation = gridCharPhaser.getAnimation();
      gridCharPhaser.setSprite(newSpriteMock);

      (newSpriteMock.setFrame as any).mockReset();
      (oldAnimation?.frameChange() as any).next(13);
      (gridCharPhaser.getAnimation()?.frameChange() as any).next(13);

      expect(gridCharPhaser.getAnimation()).not.toBe(oldAnimation);
      expect(newSpriteMock.setFrame).toHaveBeenCalledTimes(1);
    });

    it("should disable animation", () => {
      const charData = {
        walkingAnimationMapping: undefined,
      };
      const { gridCharPhaser } = createChar(charData, true);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      expect(gridCharPhaser.getAnimation()?.isEnabled()).toBe(false);
    });

    it("should set standing frame", () => {
      const charData = {
        walkingAnimationMapping: 0,
      };
      const standingFrameNumber = 13;
      const { gridCharPhaser } = createChar(charData, true);
      const newSpriteMock = createSpriteMock();
      gridEngineHeadless.turnTowards("charID", Direction.LEFT);

      gridCharPhaser.setSprite(newSpriteMock);

      expect(newSpriteMock.setFrame).toHaveBeenCalledWith(standingFrameNumber);
    });

    it("should set depth of sprite", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        startPosition: startPos,
        charLayer: "testCharLayer",
      };
      const charLayerDepth = 1;
      const { gridCharPhaser } = createChar(charData, false);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      checkSpriteDepth(
        newSpriteMock,
        newSpriteMock.displayHeight,
        charLayerDepth,
        "0000",
      );
    });

    it("should set depth of sprite on char layer", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        startPosition: startPos,
        charLayer: "lowerCharLayer",
      };
      const charLayerDepth = 0;
      const { gridCharPhaser } = createChar(charData, false);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      checkSpriteDepth(
        newSpriteMock,
        newSpriteMock.displayHeight,
        charLayerDepth,
        "0000",
      );
    });

    it("should set depth of container", () => {
      const height = 21;
      const boundsY = -10;
      const containerMock = createContainerMock(0, 20, { height, y: boundsY });
      const startPos = { x: 2, y: 2 };
      const charData = {
        container: containerMock,
        startPosition: startPos,
        charLayer: "testCharLayer",
      };
      const uppermostCharLayerDepth = 1;
      const { gridCharPhaser } = createChar(charData, false);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      checkSpriteDepth(
        containerMock,
        height,
        uppermostCharLayerDepth,
        "0000",
        0,
        boundsY,
      );
    });

    it("should set depth of container when reset", () => {
      const height = 21;
      const containerMock = createContainerMock(0, 20, { height, y: 0 });
      const startPos = { x: 2, y: 2 };
      const charData = {
        container: containerMock,
        startPosition: startPos,
        charLayer: "testCharLayer",
      };
      const uppermostCharLayerDepth = 1;
      const { gridCharPhaser } = createChar(charData, false);
      const newContainerHeight = 40;
      const newContainerMock = createContainerMock(0, 20, {
        height: newContainerHeight,
        y: 0,
      });
      gridCharPhaser.setContainer(newContainerMock);
      gridCharPhaser.update(1);

      checkSpriteDepth(
        newContainerMock,
        newContainerHeight,
        uppermostCharLayerDepth,
        "0000",
      );
    });

    it("should set depth of pos above for overlay sprite", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        startPosition: startPos,
        charLayer: "testCharLayer",
      };
      const charLayerDepth = 1;
      const { gridCharPhaser } = createChar(charData, true);
      const newSpriteMock = createSpriteMock();

      gridCharPhaser.setSprite(newSpriteMock);

      checkSpriteDepth(
        overlaySpriteMock,
        overlaySpriteMock.displayHeight,
        charLayerDepth,
        "00000",
      );
    });
  });

  describe("On pixel position change", () => {
    it("should update container pixel pos", () => {
      const containerMock = createContainerMock();
      const charData = {
        container: containerMock,
        offsetX: 10,
        offsetY: 15,
      };
      const spriteInitialXPos = spriteMock.x;
      const spriteInitialYPos = spriteMock.y;
      const charTilePos = new Vector2(3, 4);
      const { gridCharPhaser } = createChar(charData, false);
      gridEngineHeadless.setSpeed("charID", 1);
      gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
      gridEngineHeadless.move("charID", Direction.RIGHT);
      gridEngineHeadless.update(1000, 250);
      gridCharPhaser.update(250);

      const scaledTileSize = 16 * 3;
      const expectedXPos =
        charTilePos.x * scaledTileSize +
        expectedXEngineOffset() +
        charData.offsetX +
        scaledTileSize * 0.25;
      const expectedYPos =
        charTilePos.y * scaledTileSize +
        expectedYEngineOffset() +
        charData.offsetY;

      expect(gridCharPhaser.getContainer()?.x).toBe(expectedXPos);
      expect(gridCharPhaser.getContainer()?.y).toBe(expectedYPos);
      expect(gridCharPhaser.getSprite()?.x).toBe(spriteInitialXPos);
      expect(gridCharPhaser.getSprite()?.y).toBe(spriteInitialYPos);
    });

    describe("update sprite pixel pos", () => {
      let charData: { offsetX: number; offsetY: number };
      let charTilePos: Vector2;
      beforeEach(() => {
        charData = {
          offsetX: 10,
          offsetY: 15,
        };
        charTilePos = new Vector2(3, 4);
      });

      it("should update sprite pixel pos horizontally", () => {
        const { gridCharPhaser } = createChar(charData, false);
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.RIGHT);
        gridEngineHeadless.update(1000, 250);
        gridCharPhaser.update(250);

        const scaledTileSize = 16 * 3;
        const expectedXPos =
          charTilePos.x * scaledTileSize +
          expectedXEngineOffset() +
          charData.offsetX +
          scaledTileSize * 0.25;
        const expectedYPos =
          charTilePos.y * scaledTileSize +
          expectedYEngineOffset() +
          charData.offsetY;

        expect(gridCharPhaser.getSprite()?.x).toBe(expectedXPos);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });

      it("should round sprite pixel pos horizontally", () => {
        const { gridCharPhaser } = createChar(charData, false);
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.RIGHT);
        gridEngineHeadless.update(1000, 300);
        gridCharPhaser.update(300);

        const expectedXPos = 182;
        const expectedYPos = 215;

        expect(gridCharPhaser.getSprite()?.x).toBe(expectedXPos);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });

      it("should round sprite pixel pos vertically", () => {
        const { gridCharPhaser } = createChar(charData, false);
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.DOWN);
        gridEngineHeadless.update(1000, 300);
        gridCharPhaser.update(300);

        const expectedXPos = 168;
        const expectedYPos = 229;

        expect(gridCharPhaser.getSprite()?.x).toBe(expectedXPos);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });

      it("should update sprite pixel pos diagonally", () => {
        const { gridCharPhaser } = createChar(
          { ...charData, numberOfDirections: NumberOfDirections.EIGHT },
          false,
        );
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.DOWN_RIGHT);
        gridEngineHeadless.update(1000, 250);
        gridCharPhaser.update(250);

        const scaledTileSize = 16 * 3;
        const expectedXPos =
          charTilePos.x * scaledTileSize +
          expectedXEngineOffset() +
          charData.offsetX +
          scaledTileSize * 0.25;
        const expectedYPos =
          charTilePos.y * scaledTileSize +
          expectedYEngineOffset() +
          charData.offsetY +
          scaledTileSize * 0.25;

        expect(gridCharPhaser.getSprite()?.x).toBe(expectedXPos);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });

      it("should update sprite pixel pos vertically", () => {
        const { gridCharPhaser } = createChar(charData, false);
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.DOWN);
        gridEngineHeadless.update(1000, 250);
        gridCharPhaser.update(250);

        const scaledTileSize = 16 * 3;
        const expectedXPos =
          charTilePos.x * scaledTileSize +
          expectedXEngineOffset() +
          charData.offsetX;
        const expectedYPos =
          charTilePos.y * scaledTileSize +
          expectedYEngineOffset() +
          charData.offsetY +
          scaledTileSize * 0.25;

        expect(gridCharPhaser.getSprite()?.x).toBe(expectedXPos);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });

      it("should update sprite pixel pos with new displayWidth and displayHeight", () => {
        spriteMock.displayWidth = 10;
        spriteMock.displayHeight = 10;
        const { gridCharPhaser } = createChar(charData, false);
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.RIGHT);
        gridEngineHeadless.update(1000, 250);
        gridCharPhaser.update(250);

        const scaledTileSize = 16 * 3;
        const expectedXPos =
          charTilePos.x * scaledTileSize +
          expectedXEngineOffset() +
          charData.offsetX +
          scaledTileSize * 0.25;
        const expectedYPos =
          charTilePos.y * scaledTileSize +
          expectedYEngineOffset() +
          charData.offsetY;

        expect(gridCharPhaser.getSprite()?.x).toBe(expectedXPos);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });

      it("should update sprite pixel pos for reverted movement", () => {
        const { gridCharPhaser } = createChar(charData, false);
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.RIGHT);
        gridEngineHeadless.update(1000, 500);
        gridCharPhaser.update(500);
        gridEngineHeadless.revertCurrentMovement("charID");
        gridEngineHeadless.update(1500, 250);
        gridCharPhaser.update(250);

        const scaledTileSize = 16 * 3;
        const expectedXPos =
          charTilePos.x * scaledTileSize +
          expectedXEngineOffset() +
          charData.offsetX +
          scaledTileSize * 0.25;
        const expectedYPos =
          charTilePos.y * scaledTileSize +
          expectedYEngineOffset() +
          charData.offsetY;

        expect(gridCharPhaser.getSprite()?.x).toBe(expectedXPos);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });
    });

    describe("update sprite pixel pos isometric", () => {
      let charData: Partial<CharacterData>;
      let charTilePos: Vector2;
      beforeEach(() => {
        charData = {
          offsetX: 10,
          offsetY: 15,
        };
        charTilePos = new Vector2(3, 4);
      });

      it("should update sprite pixel pos vertically", () => {
        const { gridCharPhaser, gridTilemapPhaser } = createChar(
          { ...charData, numberOfDirections: NumberOfDirections.EIGHT },
          false,
          true,
        );
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.UP);
        gridEngineHeadless.update(1000, 250);
        gridCharPhaser.update(250);

        const expectedYPos =
          gridTilemapPhaser.tilePosToPixelPos(charTilePos).y +
          expectedYEngineOffset() +
          (charData.offsetY ?? 0) +
          gridTilemapPhaser.getTileDistance(Direction.UP).y * -0.25;

        expect(gridCharPhaser.getSprite()?.x).toBe(0);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });

      it("should update sprite pixel pos diagonally", () => {
        const { gridCharPhaser, gridTilemapPhaser } = createChar(
          { ...charData, numberOfDirections: NumberOfDirections.EIGHT },
          false,
          true,
        );
        gridEngineHeadless.setSpeed("charID", 1);
        gridEngineHeadless.setPosition("charID", charTilePos, "lowerCharLayer");
        gridEngineHeadless.move("charID", Direction.UP_LEFT);
        gridEngineHeadless.update(1000, 250);
        gridCharPhaser.update(250);

        const expectedXPos =
          gridTilemapPhaser.tilePosToPixelPos(charTilePos).x +
          expectedXEngineOffset() +
          (charData.offsetX ?? 0) +
          gridTilemapPhaser.getTileDistance(Direction.UP_LEFT).x * -0.25;
        const expectedYPos =
          gridTilemapPhaser.tilePosToPixelPos(charTilePos).y +
          expectedYEngineOffset() +
          (charData.offsetY ?? 0) +
          gridTilemapPhaser.getTileDistance(Direction.UP_LEFT).y * -0.25;

        expect(gridCharPhaser.getSprite()?.x).toBe(expectedXPos);
        expect(gridCharPhaser.getSprite()?.y).toBe(expectedYPos);
      });
    });

    it("should set depth of sprite", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        startPosition: startPos,
        numberOfDirections: NumberOfDirections.EIGHT,
        charLayer: "testCharLayer",
      };
      const charLayerDepth = 1;
      const { gridCharPhaser } = createChar(charData, false, true);

      gridEngineHeadless.move("charID", Direction.RIGHT);
      gridEngineHeadless.update(1000, 10);
      gridCharPhaser.update(10);

      checkSpriteDepth(
        spriteMock,
        spriteMock.displayHeight,
        charLayerDepth,
        "0000",
      );
    });

    it("sets depth of sprite with offset", () => {
      const depthOffset = -5;
      const startPos = { x: 2, y: 2 };
      const charData = {
        startPosition: startPos,
        numberOfDirections: NumberOfDirections.EIGHT,
        charLayer: "testCharLayer",
        depthOffset,
      };
      const charLayerDepth = 1;
      const { gridCharPhaser } = createChar(charData, false, true);

      gridEngineHeadless.move("charID", Direction.RIGHT);
      gridEngineHeadless.update(1000, 10);
      gridCharPhaser.update(10);

      checkSpriteDepth(
        spriteMock,
        spriteMock.displayHeight,
        charLayerDepth,
        "0000",
        depthOffset,
      );

      expect(gridCharPhaser.getDepthOffset()).toBe(depthOffset);
    });

    it("should set depth of sprite on char layer", () => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        startPosition: startPos,
        numberOfDirections: NumberOfDirections.EIGHT,
        charLayer: "lowerCharLayer",
      };
      const charLayerDepth = 0;
      const { gridCharPhaser } = createChar(charData, false);

      gridEngineHeadless.move("charID", Direction.RIGHT);
      gridEngineHeadless.update(1000, 10);
      gridCharPhaser.update(10);

      checkSpriteDepth(
        spriteMock,
        spriteMock.displayHeight,
        charLayerDepth,
        "0000",
      );
    });

    it("should set depth of container", () => {
      const height = 21;
      const containerMock = createContainerMock(0, 20, { height, y: 0 });
      const startPos = { x: 2, y: 2 };
      const charData = {
        container: containerMock,
        startPosition: startPos,
        charLayer: "testCharLayer",
      };
      const uppermostCharLayerDepth = 1;
      const { gridCharPhaser } = createChar(charData, false);

      gridEngineHeadless.move("charID", Direction.RIGHT);
      gridCharPhaser.update(10);

      checkSpriteDepth(containerMock, height, uppermostCharLayerDepth, "0000");
    });

    it("should set depth of container with depth offset", () => {
      const depthOffset = -5;
      const height = 21;
      const containerMock = createContainerMock(0, 20, { height, y: 0 });
      const startPos = { x: 2, y: 2 };
      const charData = {
        container: containerMock,
        startPosition: startPos,
        charLayer: "testCharLayer",
        depthOffset,
      };
      const uppermostCharLayerDepth = 1;
      const { gridCharPhaser } = createChar(charData, false);

      gridEngineHeadless.move("charID", Direction.RIGHT);
      gridCharPhaser.update(10);

      checkSpriteDepth(
        containerMock,
        height,
        uppermostCharLayerDepth,
        "0000",
        depthOffset,
      );
    });

    describe("for depthLayer", () => {
      it("should set depth of sprite using depthLayer instead of charLayer", () => {
        const startPos = { x: 2, y: 2 };
        const charData = {
          startPosition: startPos,
          charLayer: "testCharLayer",
          depthLayer: "lowerCharLayer",
        };
        const lowerLayerDepth = 0;
        const { gridCharPhaser } = createChar(charData, false);

        gridEngineHeadless.move("charID", Direction.RIGHT);
        gridEngineHeadless.update(1000, 10);
        gridCharPhaser.update(10);

        expect(gridCharPhaser.getDepthLayer()).toBe("lowerCharLayer");
        checkSpriteDepth(
          spriteMock,
          spriteMock.displayHeight,
          lowerLayerDepth,
          "0000",
        );
      });

      it("should set depth of container using depthLayer instead of charLayer", () => {
        const height = 21;
        const containerMock = createContainerMock(0, 20, { height, y: 0 });
        const startPos = { x: 2, y: 2 };
        const charData = {
          container: containerMock,
          startPosition: startPos,
          charLayer: "testCharLayer",
          depthLayer: "lowerCharLayer",
        };
        const lowerLayerDepth = 0;
        const { gridCharPhaser } = createChar(charData, false);

        gridEngineHeadless.move("charID", Direction.RIGHT);
        gridCharPhaser.update(10);

        checkSpriteDepth(containerMock, height, lowerLayerDepth, "0000");
      });

      it("should update depth immediately when setDepthLayer is called and revert on undefined", () => {
        const startPos = { x: 2, y: 2 };
        const charData = {
          startPosition: startPos,
          charLayer: "testCharLayer",
        };
        const { gridCharPhaser } = createChar(charData, false);

        expect(gridCharPhaser.getDepthLayer()).toBeUndefined();

        (spriteMock.setDepth as jest.Mock).mockClear();
        gridCharPhaser.setDepthLayer("lowerCharLayer");
        expect(gridCharPhaser.getDepthLayer()).toBe("lowerCharLayer");
        checkSpriteDepth(spriteMock, spriteMock.displayHeight, 0, "0000");

        (spriteMock.setDepth as jest.Mock).mockClear();
        gridCharPhaser.setDepthLayer(undefined);
        expect(gridCharPhaser.getDepthLayer()).toBeUndefined();
        checkSpriteDepth(spriteMock, spriteMock.displayHeight, 1, "0000");
      });

      it("should fall back to charLayer depth if depthLayer does not exist", () => {
        const startPos = { x: 2, y: 2 };
        const charData = {
          startPosition: startPos,
          charLayer: "testCharLayer",
          depthLayer: "nonExistentLayer",
        };
        const { gridCharPhaser } = createChar(charData, false);

        gridCharPhaser.update(10);

        checkSpriteDepth(spriteMock, spriteMock.displayHeight, 1, "0000");
      });
    });

    describe("for overlay sprite", () => {
      it("should set depth of pos above", () => {
        const startPos = { x: 2, y: 2 };
        const posAbove = { x: 2, y: 1 };
        const charData = {
          startPosition: startPos,
          charLayer: "testCharLayer",
        };
        const lowerCharLayerDepth = 0;
        const { gridCharPhaser } = createChar(charData, true);
        gridEngineHeadless.setTransition(
          new Vector2(posAbove),
          "testCharLayer",
          "lowerCharLayer",
        );

        gridEngineHeadless.move("charID", Direction.UP);
        gridEngineHeadless.update(1000, 10);
        gridCharPhaser.update(10);

        checkSpriteDepth(
          overlaySpriteMock,
          overlaySpriteMock.displayHeight,
          lowerCharLayerDepth,
          "00000",
        );
      });
    });
  });

  describe("turn towards", () => {
    let gridCharPhaser: GridCharacterPhaser;
    beforeEach(() => {
      const startPos = { x: 2, y: 2 };
      const charData = {
        startPosition: startPos,
        charLayer: "testCharLayer",
        walkingAnimationMapping: 0,
      };
      ({ gridCharPhaser } = createChar(charData, true));
    });

    it("should turn towards left", (done) => {
      const leftStandingFrame = 13;
      gridCharPhaser
        .getAnimation()
        ?.frameChange()
        .pipe(take(1))
        .subscribe((frameNo: number) => {
          expect(frameNo).toEqual(leftStandingFrame);
          done();
        });
      gridCharPhaser.turnTowards(Direction.LEFT);
    });

    it("should not turn if moving", () => {
      gridEngineHeadless.move("charID", Direction.DOWN);
      const hasEmitted = trackEmit(
        gridCharPhaser.getAnimation()?.frameChange(),
      );
      gridCharPhaser.turnTowards(Direction.LEFT);
      expect(hasEmitted()).toBe(false);
    });

    it("should not turn if direction NONE", () => {
      const hasEmitted = trackEmit(
        gridCharPhaser.getAnimation()?.frameChange(),
      );
      gridCharPhaser.turnTowards(Direction.NONE);
      expect(hasEmitted()).toBe(false);
    });
  });

  describe("walking frames", () => {
    it("should set players standing frame if direction blocked", () => {
      const tm = createPhaserTilemapStub(
        new Map([
          [
            "lowerCharLayer",
            [
              // prettier-ignore
              "..",
              "..",
            ],
          ],
        ]),
      );
      const startPos = { x: 2, y: 2 };
      const charData = {
        id: "charID",
        sprite: spriteMock,
        walkingAnimationMapping: 0,
        startPosition: startPos,
        charLayer: "testCharLayer",
        numberOfDirections: NumberOfDirections.FOUR,
      };
      const tilemapPhaser = new PhaserTilemap(tm);
      const gridTilemap = new GridTilemapPhaser(tm);
      gridEngineHeadless.create(tilemapPhaser, {
        characters: [charData],
      });
      const gridCharPhaser = new GridCharacterPhaser(
        charData,
        sceneMock,
        gridTilemap,
        false,
        gridEngineHeadless,
      );

      const upStandingFrame = 37;
      expect(gridEngineHeadless.isMoving("charID")).toEqual(false);
      let currentFrame: number | undefined = undefined;
      gridCharPhaser
        .getAnimation()
        ?.frameChange()
        .pipe(take(1))
        .subscribe((frameNo: number) => {
          currentFrame = frameNo;
        });
      gridEngineHeadless.move("charID", Direction.UP);
      expect(currentFrame).toEqual(upStandingFrame);
    });
  });

  describe("spot walk", () => {
    // For walkingAnimationMapping: 0 with texture width 240, sprite width 20 (charsInRow = 4, framesInRow = 12):
    // DOWN: rightFoot = 0, standing = 1, leftFoot = 2
    // LEFT: rightFoot = 12, standing = 13, leftFoot = 14
    const DOWN_RIGHT_FOOT = 0;
    const DOWN_STANDING = 1;
    const DOWN_LEFT_FOOT = 2;
    const LEFT_STANDING = 13;
    const LEFT_LEFT_FOOT = 14;

    it("should default to false", () => {
      const { gridCharPhaser } = createChar({}, false);
      expect(gridCharPhaser.isSpotWalking()).toBe(false);
    });

    it("should cycle walking frames in place based on character speed", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: 0,
          speed: 1,
          spotWalk: true,
        },
        false,
      );

      expect(gridCharPhaser.isSpotWalking()).toBe(true);
      const initialX = spriteMock.x;
      const initialY = spriteMock.y;

      // 0..500ms -> leftFoot
      gridCharPhaser.update(250);
      expect(spriteMock.frame.name).toBe(DOWN_LEFT_FOOT);
      expect(spriteMock.x).toBe(initialX);
      expect(spriteMock.y).toBe(initialY);

      // >500ms -> standing (and flips lastFootLeft)
      gridCharPhaser.update(300);
      expect(spriteMock.frame.name).toBe(DOWN_STANDING);

      // wraps past 1000ms -> rightFoot
      gridCharPhaser.update(500);
      expect(spriteMock.frame.name).toBe(DOWN_RIGHT_FOOT);

      // >500ms -> standing
      gridCharPhaser.update(500);
      expect(spriteMock.frame.name).toBe(DOWN_STANDING);

      // wraps again -> leftFoot
      gridCharPhaser.update(500);
      expect(spriteMock.frame.name).toBe(DOWN_LEFT_FOOT);
    });

    it("should scale animation rate with character speed", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: 0,
          speed: 2,
          spotWalk: true,
        },
        false,
      );

      // At speed 2, 125ms = 250 progress (<= 500) -> leftFoot
      gridCharPhaser.update(125);
      expect(spriteMock.frame.name).toBe(DOWN_LEFT_FOOT);

      // +150ms = 550 progress (> 500) -> standing
      gridCharPhaser.update(150);
      expect(spriteMock.frame.name).toBe(DOWN_STANDING);

      // +250ms = 50 progress (<= 500) -> rightFoot
      gridCharPhaser.update(250);
      expect(spriteMock.frame.name).toBe(DOWN_RIGHT_FOOT);
    });

    it("should not animate when speed is 0", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: 0,
          spotWalk: true,
        },
        false,
      );
      gridEngineHeadless.setSpeed("charID", 0);

      (spriteMock.setFrame as jest.Mock).mockClear();
      gridCharPhaser.update(250);
      expect(spriteMock.setFrame).not.toHaveBeenCalled();
    });

    it("should follow facing direction changes while spot walking", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: 0,
          speed: 1,
          spotWalk: true,
        },
        false,
      );

      gridCharPhaser.turnTowards(Direction.LEFT);
      expect(spriteMock.frame.name).toBe(LEFT_STANDING);

      gridCharPhaser.update(250);
      expect(spriteMock.frame.name).toBe(LEFT_LEFT_FOOT);
    });

    it("should reset to standing frame when disabled while idle", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: 0,
          speed: 1,
          spotWalk: true,
        },
        false,
      );

      gridCharPhaser.update(250);
      expect(spriteMock.frame.name).toBe(DOWN_LEFT_FOOT);

      gridCharPhaser.setSpotWalk(false);
      expect(gridCharPhaser.isSpotWalking()).toBe(false);
      expect(spriteMock.frame.name).toBe(DOWN_STANDING);

      (spriteMock.setFrame as jest.Mock).mockClear();
      gridCharPhaser.update(250);
      expect(spriteMock.setFrame).not.toHaveBeenCalled();
    });

    it("should not override frame when disabled while moving", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: 0,
          speed: 1,
          spotWalk: true,
        },
        false,
      );

      gridEngineHeadless.move("charID", Direction.DOWN);
      gridEngineHeadless.update(1000, 250);
      gridCharPhaser.update(250);
      expect(spriteMock.frame.name).toBe(DOWN_LEFT_FOOT);

      gridCharPhaser.setSpotWalk(false);
      expect(spriteMock.frame.name).toBe(DOWN_LEFT_FOOT);
    });

    it("should resume spot walking cleanly after real movement finishes", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: 0,
          speed: 1,
          spotWalk: true,
        },
        false,
      );

      gridEngineHeadless.move("charID", Direction.DOWN);
      gridEngineHeadless.update(1000, 250);
      gridCharPhaser.update(250);
      expect(spriteMock.frame.name).toBe(DOWN_LEFT_FOOT);

      gridEngineHeadless.update(1250, 500);
      gridCharPhaser.update(500);
      expect(spriteMock.frame.name).toBe(DOWN_STANDING);

      // Finish moving to the next tile
      gridEngineHeadless.update(1750, 250);
      expect(gridEngineHeadless.isMoving("charID")).toBe(false);

      // Spot walk resumes with the alternate foot
      gridCharPhaser.update(250);
      expect(spriteMock.frame.name).toBe(DOWN_RIGHT_FOOT);
    });

    it("should not animate when walkingAnimationMapping is undefined", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: undefined,
          speed: 1,
          spotWalk: true,
        },
        false,
      );

      (spriteMock.setFrame as jest.Mock).mockClear();
      gridCharPhaser.update(250);
      expect(spriteMock.setFrame).not.toHaveBeenCalled();
    });
  });

  describe("fixedFacing", () => {
    it("should interpolate pixel position in movement direction while animating fixed facing direction", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: {
            [Direction.UP]: { leftFoot: 10, standing: 11, rightFoot: 12 },
            [Direction.DOWN]: { leftFoot: 0, standing: 1, rightFoot: 2 },
            [Direction.LEFT]: { leftFoot: 3, standing: 4, rightFoot: 5 },
            [Direction.RIGHT]: { leftFoot: 6, standing: 7, rightFoot: 8 },
          },
          speed: 1,
          facingDirection: Direction.UP,
          fixedFacing: true,
        },
        false,
      );

      const initialX = spriteMock.x;
      const initialY = spriteMock.y;
      expect(spriteMock.frame.name).toBe(11);

      // Move DOWN while facing UP
      gridEngineHeadless.move("charID", Direction.DOWN);
      gridEngineHeadless.update(1000, 250);
      gridCharPhaser.update(250);

      // Pixel position should move downward (+y), not upward (-y)
      expect(spriteMock.x).toBe(initialX);
      expect(spriteMock.y).toBe(initialY + 12);
      // Walking animation should play UP's leftFoot frame
      expect(spriteMock.frame.name).toBe(10);

      // Past half a tile: standing frame of UP
      gridEngineHeadless.update(1500, 500);
      gridCharPhaser.update(500);
      expect(spriteMock.y).toBe(initialY + 36);
      expect(spriteMock.frame.name).toBe(11);
    });

    it("should interpolate reverted movement using movement direction while keeping fixed facing animation", () => {
      const { gridCharPhaser } = createChar(
        {
          walkingAnimationMapping: {
            [Direction.UP]: { leftFoot: 10, standing: 11, rightFoot: 12 },
            [Direction.DOWN]: { leftFoot: 0, standing: 1, rightFoot: 2 },
            [Direction.LEFT]: { leftFoot: 3, standing: 4, rightFoot: 5 },
            [Direction.RIGHT]: { leftFoot: 6, standing: 7, rightFoot: 8 },
          },
          speed: 1,
          facingDirection: Direction.LEFT,
          fixedFacing: true,
        },
        false,
      );

      const initialY = spriteMock.y;

      gridEngineHeadless.move("charID", Direction.DOWN);
      gridEngineHeadless.update(1000, 250);
      gridCharPhaser.update(250);
      expect(spriteMock.y).toBe(initialY + 12);
      expect(spriteMock.frame.name).toBe(3);

      // Revert movement: movementDirection becomes UP, progress becomes 750
      gridEngineHeadless.revertCurrentMovement("charID");
      gridCharPhaser.update(0);
      expect(spriteMock.y).toBe(initialY + 12);
      expect(spriteMock.frame.name).toBe(4);

      // Advance 125ms further back toward start tile
      gridEngineHeadless.update(1125, 125);
      gridCharPhaser.update(125);
      expect(spriteMock.y).toBe(initialY + 6);
      expect(spriteMock.frame.name).toBe(4);
    });
  });

  function expectedXEngineOffset(): number {
    const tileWidth = 16;
    const scale = 3;
    return (tileWidth * scale) / 2 - spriteMock.displayWidth / 2;
  }
  function expectedYEngineOffset(): number {
    const tileHeight = 16;
    const scale = 3;
    return -spriteMock.displayHeight + tileHeight * scale;
  }
});

function checkSpriteDepth(
  gameObject: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite,
  height: number,
  charLayerDepth: number,
  zeroPrefix: string,
  depthOffset = 0,
  boundsY = 0,
) {
  const pixelDepth = gameObject.y + height + depthOffset + boundsY;
  expect(gameObject.setDepth).toHaveBeenCalledWith(
    +`${charLayerDepth}.${zeroPrefix}${pixelDepth}`,
  );
}
