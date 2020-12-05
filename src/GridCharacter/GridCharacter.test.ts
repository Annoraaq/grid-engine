import { GridCharacter } from "./GridCharacter";
import * as Phaser from "phaser";

describe("GridCharacter", () => {
  let gridCharacter: GridCharacter;
  let spriteMock: Phaser.GameObjects.Sprite;

  beforeEach(() => {
    spriteMock = <any>{
      width: 16,
      setFrame: jest.fn(),
      texture: {
        source: [
          {
            width: 144,
          },
        ],
      },
    };
  });

  it("should initialize with standing face down frame", () => {
    const charIndex = 3;
    gridCharacter = new GridCharacter(<any>spriteMock, charIndex, 16);
    expect(spriteMock.setFrame).toHaveBeenCalledWith(37);
  });

  it("should get position", () => {
    const spriteCenterPos = new Phaser.Math.Vector2(3, 4);
    spriteMock.getCenter = jest.fn().mockReturnValue(spriteCenterPos);
    gridCharacter = new GridCharacter(<any>spriteMock, 3, 16);

    expect(gridCharacter.getPosition()).toEqual(spriteCenterPos);
  });
});
