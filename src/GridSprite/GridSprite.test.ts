import { GridSprite } from "./GridSprite";

describe("GridSprite", () => {
  let phaserSprite;
  let gridSprite: GridSprite;
  let xSetter;
  let xGetter;
  let ySetter;
  let yGetter;
  let widthGetter;
  let heightGetter;
  let scaleGetter;
  let scaleSetter;
  beforeEach(() => {
    phaserSprite = <any>{
      setOrigin: jest.fn(),
      setDepth: jest.fn(),
    };

    xSetter = jest.fn();
    xGetter = jest.fn(() => 42);
    ySetter = jest.fn();
    yGetter = jest.fn(() => 43);
    widthGetter = jest.fn(() => 100);
    heightGetter = jest.fn(() => 200);
    scaleSetter = jest.fn();
    scaleGetter = jest.fn(() => 3);

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
      set: scaleSetter,
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
    expect(gridSprite.width).toEqual(100);
  });

  it("should delegate height", () => {
    expect(gridSprite.height).toEqual(200);
  });

  it("should delegate scale", () => {
    gridSprite.scale = 4;
    expect(scaleSetter).toHaveBeenCalledWith(4);
    expect(gridSprite.scale).toEqual(3);
  });

  it("should delegate setDepth", () => {
    gridSprite.setDepth(42);
    expect(phaserSprite.setDepth).toHaveBeenCalledWith(42);
  });
});
