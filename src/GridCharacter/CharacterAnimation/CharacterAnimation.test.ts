import { Direction } from "../../Direction/Direction";
import { CharacterAnimation } from "./CharacterAnimation";
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
    characterAnimation = new CharacterAnimation(spriteMock, undefined, 3);
    expect(characterAnimation.isEnabled()).toBe(true);
    characterAnimation.setIsEnabled(false);
    expect(characterAnimation.isEnabled()).toBe(false);
    characterAnimation.setIsEnabled(true);
    expect(characterAnimation.isEnabled()).toBe(true);
  });

  describe("setStandingFrame", () => {
    beforeEach(() => {
      spriteMock.setFrame = jest.fn();
      characterAnimation = new CharacterAnimation(spriteMock, undefined, 3);
      characterAnimation.setIsEnabled(true);
    });

    it("should set standing frame", () => {
      characterAnimation.setStandingFrame(Direction.LEFT);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.left.standing
      );
    });

    it("should not set standing frame if disabled", () => {
      characterAnimation.setIsEnabled(false);
      characterAnimation.setStandingFrame(Direction.LEFT);
      expect(spriteMock.setFrame).not.toHaveBeenCalled();
    });
  });

  describe("update character frame", () => {
    beforeEach(() => {
      spriteMock.setFrame = jest.fn();
      spriteMock.frame = <any>{ name: walkingAnimationMapping.up.standing };
      characterAnimation = new CharacterAnimation(spriteMock, undefined, 3);
      characterAnimation.setIsEnabled(true);
    });

    it("should not update if disabled", () => {
      characterAnimation.setIsEnabled(false);
      characterAnimation.updateCharacterFrame(Direction.UP, false);
      expect(spriteMock.setFrame).not.toHaveBeenCalledWith();
    });

    it("Direction.UP", () => {
      characterAnimation.updateCharacterFrame(Direction.UP, false);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.up.leftFoot
      );
      characterAnimation.updateCharacterFrame(Direction.UP, true);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.up.standing
      );
    });

    it("Direction.UP_LEFT", () => {
      characterAnimation.updateCharacterFrame(Direction.UP_LEFT, false);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.left.leftFoot
      );
      characterAnimation.updateCharacterFrame(Direction.UP_LEFT, true);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.left.standing
      );
    });

    it("Direction.UP_RIGHT", () => {
      characterAnimation.updateCharacterFrame(Direction.UP_RIGHT, false);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.right.leftFoot
      );
      characterAnimation.updateCharacterFrame(Direction.UP_RIGHT, true);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.right.standing
      );
    });

    it("Direction.RIGHT", () => {
      characterAnimation.updateCharacterFrame(Direction.RIGHT, false);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.right.leftFoot
      );
      characterAnimation.updateCharacterFrame(Direction.RIGHT, true);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.right.standing
      );
    });

    it("Direction.DOWN", () => {
      characterAnimation.updateCharacterFrame(Direction.DOWN, false);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.down.leftFoot
      );
      characterAnimation.updateCharacterFrame(Direction.DOWN, true);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.down.standing
      );
    });

    it("Direction.DOWN_LEFT", () => {
      characterAnimation.updateCharacterFrame(Direction.DOWN_LEFT, false);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.left.leftFoot
      );
      characterAnimation.updateCharacterFrame(Direction.DOWN_LEFT, true);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.left.standing
      );
    });

    it("Direction.DOWN_RIGHT", () => {
      characterAnimation.updateCharacterFrame(Direction.DOWN_RIGHT, false);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.right.leftFoot
      );
      characterAnimation.updateCharacterFrame(Direction.DOWN_RIGHT, true);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.right.standing
      );
    });

    it("Direction.LEFT", () => {
      characterAnimation.updateCharacterFrame(Direction.LEFT, false);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.left.leftFoot
      );
      characterAnimation.updateCharacterFrame(Direction.LEFT, true);
      expect(spriteMock.setFrame).toHaveBeenCalledWith(
        walkingAnimationMapping.left.standing
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
      beforeEach(() => {
        characterAnimation = new CharacterAnimation(
          spriteMock,
          customWalkingAnimationMapping,
          3
        );
        characterAnimation.setIsEnabled(true);
      });

      it("should use custom walkingAnimationMapping", () => {
        characterAnimation.updateCharacterFrame(Direction.UP, false);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          customWalkingAnimationMapping.up.leftFoot
        );
        characterAnimation.updateCharacterFrame(Direction.UP, true);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          customWalkingAnimationMapping.up.standing
        );
      });

      it("should use custom mapping for diagonal movement", () => {
        characterAnimation.updateCharacterFrame(Direction.UP_LEFT, false);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          customWalkingAnimationMapping["up-left"].leftFoot
        );
        characterAnimation.updateCharacterFrame(Direction.UP_LEFT, true);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          customWalkingAnimationMapping["up-left"].standing
        );
      });

      it("should fall back for diagonal movement", () => {
        characterAnimation.updateCharacterFrame(Direction.UP_RIGHT, false);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          customWalkingAnimationMapping.right.leftFoot
        );
        characterAnimation.updateCharacterFrame(Direction.UP_RIGHT, true);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          customWalkingAnimationMapping.right.standing
        );
      });

      it("should set custom walkingAnimationMapping", () => {
        characterAnimation = new CharacterAnimation(spriteMock, undefined, 3);
        characterAnimation.setWalkingAnimationMapping(
          customWalkingAnimationMapping
        );
        characterAnimation.updateCharacterFrame(Direction.UP, false);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          customWalkingAnimationMapping.up.leftFoot
        );
        characterAnimation.updateCharacterFrame(Direction.UP, true);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          customWalkingAnimationMapping.up.standing
        );
      });
    });

    describe("currentFrameStanding = false", () => {
      function setNonStandingFrame() {
        spriteMock.frame.name = "" + walkingAnimationMapping.up.leftFoot;
      }

      beforeEach(() => {
        setNonStandingFrame();
      });

      it("should flip foot", () => {
        characterAnimation.updateCharacterFrame(Direction.UP, true);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          walkingAnimationMapping.up.standing
        );
        characterAnimation.updateCharacterFrame(Direction.UP, false);
        expect(spriteMock.setFrame).toHaveBeenCalledWith(
          walkingAnimationMapping.up.rightFoot
        );
      });
    });
  });
});
