import { SpriteUtils } from "./SpriteUtils.js";

describe("SpriteUtils", () => {
  it("should copy important sprite props", () => {
    const gridSpriteMock = <any>{
      displayWidth: 16,
      displayHeight: 20,
      setDepth: jest.fn(),
      x: 5,
      y: 6,
      frame: {
        name: "someFrameName",
      },
      setOrigin: jest.fn(),
      scale: 2,
      height: 33,
      tint: "someTint",
      alpha: "alpha",
      active: "active",
      alphaBottomLeft: "alphaBottomLeft",
      alphaBottomRight: "alphaBottomRight",
      alphaTopLeft: "alphaTopLeft",
      alphaTopRight: "alphaTopRight",
      angle: "angle",
    };

    const clonedSprite = <any>{ setFrame: jest.fn() };

    SpriteUtils.copyOverImportantProperties(gridSpriteMock, clonedSprite);

    expect(clonedSprite.x).toEqual(gridSpriteMock.x);
    expect(clonedSprite.y).toEqual(gridSpriteMock.y);
    expect(clonedSprite.tint).toEqual(gridSpriteMock.tint);
    expect(clonedSprite.alpha).toEqual(gridSpriteMock.alpha);
    expect(clonedSprite.scale).toEqual(gridSpriteMock.scale);
    expect(clonedSprite.setFrame).toHaveBeenCalledWith(
      gridSpriteMock.frame.name,
    );
    expect(clonedSprite.active).toEqual(gridSpriteMock.active);
    expect(clonedSprite.alphaBottomLeft).toEqual(
      gridSpriteMock.alphaBottomLeft,
    );
    expect(clonedSprite.alphaBottomRight).toEqual(
      gridSpriteMock.alphaBottomRight,
    );
    expect(clonedSprite.alphaTopLeft).toEqual(gridSpriteMock.alphaTopLeft);
    expect(clonedSprite.alphaTopRight).toEqual(gridSpriteMock.alphaTopRight);
    expect(clonedSprite.angle).toEqual(gridSpriteMock.angle);
  });
});
