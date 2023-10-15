import { Direction } from "../../Direction/Direction.js";
import { CharacterAnimation } from "./CharacterAnimation.js";
describe("CharacterAnimation", () => {
  let spriteMock: Phaser.GameObjects.Sprite;
  let characterAnimation: CharacterAnimation;

  const TILE_WIDTH = 16;
  const TILE_HEIGHT = 16;
  const PLAYER_X_OFFSET = 0;
  const PLAYER_Y_OFFSET = -4;

  const walkingAnimationMapping = {
    up: {
      leftFoot: 65,
      standing: 64,
      rightFoot: 63,
    },
    down: {
      leftFoot: 38,
      standing: 37,
      rightFoot: 36,
    },
    left: {
      leftFoot: 47,
      standing: 46,
      rightFoot: 45,
    },
    right: {
      leftFoot: 56,
      standing: 55,
      rightFoot: 54,
    },
  };

  beforeEach(() => {
    spriteMock = <any>{
      width: 16,
      scale: 1,
      height: 20,
      setFrame: jest.fn(),
      setDepth: jest.fn(),
      frame: { name: "anything" },
      setOrigin: jest.fn(),
      x: 5 * TILE_WIDTH + PLAYER_X_OFFSET,
      y: 6 * TILE_HEIGHT + PLAYER_Y_OFFSET,
      texture: {
        source: [
          {
            width: 144,
          },
        ],
      },
    };
  });

  it("should enable and disable", () => {
    characterAnimation = new CharacterAnimation(3, 3);
    expect(characterAnimation.isEnabled()).toBe(true);
    characterAnimation.setIsEnabled(false);
    expect(characterAnimation.isEnabled()).toBe(false);
    characterAnimation.setIsEnabled(true);
    expect(characterAnimation.isEnabled()).toBe(true);
  });

  describe("setStandingFrame", () => {
    beforeEach(() => {
      spriteMock.setFrame = jest.fn();
      characterAnimation = new CharacterAnimation(3, 3);
      characterAnimation.setIsEnabled(true);
    });

    it("should set standing frame", () => {
      const setFrameObsCallbackMock = jest.fn();
      characterAnimation.frameChange().subscribe({
        next: setFrameObsCallbackMock,
      });
      characterAnimation.setStandingFrame(Direction.LEFT);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.left.standing,
      );
    });

    it("should not set standing frame if disabled", () => {
      const setFrameObsCallbackMock = jest.fn();
      characterAnimation.frameChange().subscribe({
        next: setFrameObsCallbackMock,
      });
      characterAnimation.setIsEnabled(false);
      characterAnimation.setStandingFrame(Direction.LEFT);
      expect(setFrameObsCallbackMock).not.toHaveBeenCalled();
    });
  });

  describe("update character frame", () => {
    let setFrameObsCallbackMock = jest.fn();
    beforeEach(() => {
      setFrameObsCallbackMock = jest.fn();
      spriteMock.setFrame = jest.fn();
      spriteMock.frame = <any>{ name: walkingAnimationMapping.up.standing };
      characterAnimation = new CharacterAnimation(3, 3);
      characterAnimation.setIsEnabled(true);
      characterAnimation.frameChange().subscribe({
        next: setFrameObsCallbackMock,
      });
    });

    it("should not update if disabled", () => {
      characterAnimation.setIsEnabled(false);
      characterAnimation.updateCharacterFrame(Direction.UP, false, 0);
      expect(setFrameObsCallbackMock).not.toHaveBeenCalled();
    });

    it("Direction.UP", () => {
      characterAnimation.updateCharacterFrame(Direction.UP, false, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.up.leftFoot,
      );
      characterAnimation.updateCharacterFrame(Direction.UP, true, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.up.standing,
      );
    });

    it("Direction.UP_LEFT", () => {
      characterAnimation.updateCharacterFrame(Direction.UP_LEFT, false, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.left.leftFoot,
      );
      characterAnimation.updateCharacterFrame(Direction.UP_LEFT, true, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.left.standing,
      );
    });

    it("Direction.UP_RIGHT", () => {
      characterAnimation.updateCharacterFrame(Direction.UP_RIGHT, false, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.right.leftFoot,
      );
      characterAnimation.updateCharacterFrame(Direction.UP_RIGHT, true, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.right.standing,
      );
    });

    it("Direction.RIGHT", () => {
      characterAnimation.updateCharacterFrame(Direction.RIGHT, false, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.right.leftFoot,
      );
      characterAnimation.updateCharacterFrame(Direction.RIGHT, true, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.right.standing,
      );
    });

    it("Direction.DOWN", () => {
      characterAnimation.updateCharacterFrame(Direction.DOWN, false, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.down.leftFoot,
      );
      characterAnimation.updateCharacterFrame(Direction.DOWN, true, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.down.standing,
      );
    });

    it("Direction.DOWN_LEFT", () => {
      characterAnimation.updateCharacterFrame(Direction.DOWN_LEFT, false, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.left.leftFoot,
      );
      characterAnimation.updateCharacterFrame(Direction.DOWN_LEFT, true, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.left.standing,
      );
    });

    it("Direction.DOWN_RIGHT", () => {
      characterAnimation.updateCharacterFrame(Direction.DOWN_RIGHT, false, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.right.leftFoot,
      );
      characterAnimation.updateCharacterFrame(Direction.DOWN_RIGHT, true, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.right.standing,
      );
    });

    it("Direction.LEFT", () => {
      characterAnimation.updateCharacterFrame(Direction.LEFT, false, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.left.leftFoot,
      );
      characterAnimation.updateCharacterFrame(Direction.LEFT, true, 0);
      expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
        walkingAnimationMapping.left.standing,
      );
    });

    describe("custom walkingAnimationMapping", () => {
      const customWalkingAnimationMapping = {
        up: {
          leftFoot: 1,
          standing: 2,
          rightFoot: 3,
        },
        "up-left": {
          leftFoot: 4,
          standing: 5,
          rightFoot: 6,
        },
        down: {
          leftFoot: 4,
          standing: 5,
          rightFoot: 6,
        },
        left: {
          leftFoot: 7,
          standing: 8,
          rightFoot: 9,
        },
        right: {
          leftFoot: 10,
          standing: 11,
          rightFoot: 12,
        },
      };

      let setFrameObsCallbackMock = jest.fn();

      beforeEach(() => {
        setFrameObsCallbackMock = jest.fn();
        characterAnimation = new CharacterAnimation(
          customWalkingAnimationMapping,
          3,
        );
        characterAnimation.setIsEnabled(true);
        characterAnimation.frameChange().subscribe({
          next: setFrameObsCallbackMock,
        });
      });

      it("should use custom walkingAnimationMapping", () => {
        characterAnimation.updateCharacterFrame(Direction.UP, false, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          customWalkingAnimationMapping.up.leftFoot,
        );
        characterAnimation.updateCharacterFrame(Direction.UP, true, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          customWalkingAnimationMapping.up.standing,
        );
      });

      it("should use custom mapping for diagonal movement", () => {
        characterAnimation.updateCharacterFrame(Direction.UP_LEFT, false, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          customWalkingAnimationMapping["up-left"].leftFoot,
        );
        characterAnimation.updateCharacterFrame(Direction.UP_LEFT, true, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          customWalkingAnimationMapping["up-left"].standing,
        );
      });

      it("should fall back for diagonal movement", () => {
        characterAnimation.updateCharacterFrame(Direction.UP_RIGHT, false, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          customWalkingAnimationMapping.right.leftFoot,
        );
        characterAnimation.updateCharacterFrame(Direction.UP_RIGHT, true, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          customWalkingAnimationMapping.right.standing,
        );
      });

      it("should set custom walkingAnimationMapping", () => {
        characterAnimation = new CharacterAnimation(undefined, 3);
        characterAnimation.frameChange().subscribe({
          next: setFrameObsCallbackMock,
        });
        characterAnimation.setWalkingAnimationMapping(
          customWalkingAnimationMapping,
        );
        expect(characterAnimation.isEnabled()).toBe(true);
        expect(characterAnimation.getWalkingAnimationMapping()).toEqual(
          customWalkingAnimationMapping,
        );
        characterAnimation.updateCharacterFrame(Direction.UP, false, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          customWalkingAnimationMapping.up.leftFoot,
        );
        characterAnimation.updateCharacterFrame(Direction.UP, true, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          customWalkingAnimationMapping.up.standing,
        );
      });

      it("should remove customWalkingAnimation", () => {
        characterAnimation = new CharacterAnimation(
          customWalkingAnimationMapping,
          3,
        );
        expect(characterAnimation.isEnabled()).toBe(true);
        characterAnimation.setWalkingAnimationMapping(undefined);
        expect(characterAnimation.isEnabled()).toBe(false);
        characterAnimation.setWalkingAnimationMapping(
          customWalkingAnimationMapping,
        );
        expect(characterAnimation.isEnabled()).toBe(true);
      });
    });

    describe("characterIndex", () => {
      it("should set characterIndex", () => {
        characterAnimation = new CharacterAnimation(1, 3);
        expect(characterAnimation.getWalkingAnimationMapping()).toEqual(1);
        expect(characterAnimation.isEnabled()).toEqual(true);
        characterAnimation.setWalkingAnimationMapping(undefined);
        expect(characterAnimation.isEnabled()).toEqual(false);
        characterAnimation.setWalkingAnimationMapping(3);
        expect(characterAnimation.getWalkingAnimationMapping()).toEqual(3);
        expect(characterAnimation.isEnabled()).toEqual(true);
      });
    });

    describe("currentFrameStanding = false", () => {
      function setNonStandingFrame() {
        spriteMock.frame.name = "" + walkingAnimationMapping.up.leftFoot;
      }

      let setFrameObsCallbackMock = jest.fn();

      beforeEach(() => {
        setFrameObsCallbackMock = jest.fn();
        setNonStandingFrame();
      });

      it("should flip foot", () => {
        characterAnimation.frameChange().subscribe({
          next: setFrameObsCallbackMock,
        });
        characterAnimation.updateCharacterFrame(Direction.UP, true, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          walkingAnimationMapping.up.standing,
        );
        characterAnimation.updateCharacterFrame(Direction.UP, false, 0);
        expect(setFrameObsCallbackMock).toHaveBeenCalledWith(
          walkingAnimationMapping.up.rightFoot,
        );
      });
    });
  });
});
