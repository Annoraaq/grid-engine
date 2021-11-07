import { GridSprite } from "./GridSprite";

describe("GridSprite", () => {
  const spriteWidth = 100;
  const spriteHeight = 200;
  const spriteScale = 3;
  let phaserSprite;
  let gridSprite: GridSprite;
  let xSetter;
  let xGetter;
  let ySetter;
  let yGetter;
  let widthGetter;
  let heightGetter;
  let scaleGetter;
  beforeEach(() => {
    phaserSprite = <any>{
      setOrigin: jest.fn(),
      setDepth: jest.fn(),
      displayHeight: spriteHeight * spriteScale,
    };

    xSetter = jest.fn();
    xGetter = jest.fn(() => 42);
    ySetter = jest.fn();
    yGetter = jest.fn(() => 43);
    widthGetter = jest.fn(() => spriteWidth);
    heightGetter = jest.fn(() => spriteHeight);
    scaleGetter = jest.fn(() => spriteScale);

    Object.defineProperty(phaserSprite, "x", {
      get: xGetter,
      set: xSetter,
    });
    Object.defineProperty(phaserSprite, "y", {
      get: yGetter,
      set: ySetter,
    });
    Object.defineProperty(phaserSprite, "width", {
      get: widthGetter,
    });
    Object.defineProperty(phaserSprite, "height", {
      get: heightGetter,
    });
    Object.defineProperty(phaserSprite, "scale", {
      get: scaleGetter,
    });
    gridSprite = new GridSprite(phaserSprite);
  });

  it("should create from phaser sprite", () => {
    expect(gridSprite.getRawSprite()).toBe(phaserSprite);
    expect(phaserSprite.setOrigin).toHaveBeenCalledWith(0, 0);
  });

  it("should delegate x", () => {
    gridSprite.x = 42;
    expect(xSetter).toHaveBeenCalledWith(42);
    expect(gridSprite.x).toEqual(42);
  });

  it("should delegate y", () => {
    gridSprite.y = 43;
    expect(ySetter).toHaveBeenCalledWith(43);
    expect(gridSprite.y).toEqual(43);
  });

  it("should delegate width", () => {
    expect(gridSprite.width).toEqual(spriteWidth);
  });

  it("should delegate height", () => {
    expect(gridSprite.height).toEqual(spriteHeight);
  });

  it("should delegate setDepth", () => {
    gridSprite.setDepth(42);
    expect(phaserSprite.setDepth).toHaveBeenCalledWith(42);
  });

  it("should delegate displayHeight", () => {
    expect(phaserSprite.displayHeight).toEqual(spriteHeight * spriteScale);
  });
});
