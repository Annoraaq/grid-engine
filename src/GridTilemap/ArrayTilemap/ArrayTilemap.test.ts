import { ArrayTilemap } from "./ArrayTilemap.js";
const COLLISION_PROP_NAME = "ge_collide";
const CHAR_LAYER_PROP_NAME = "ge_charLayer";

describe("ArrayTilemap", () => {
  it("throws an error on different layer dimensions.", () => {
    expect(() => {
      new ArrayTilemap({
        testLayer: { data: [[0]] },
        emptyLayer: { data: [] },
      });
    }).toThrow(Error("All tilemap layers must have the same dimensions."));
  });

  it("has width and height", () => {
    const emptyMap = new ArrayTilemap({
      testLayer: {
        data: [],
      },
    });

    const singleRowMap = new ArrayTilemap({
      testLayer: {
        data: [[0]],
      },
    });

    const exampleMap = new ArrayTilemap({
      testLayer: {
        data: [
          [0, 0, 0],
          [0, 0, 0],
        ],
      },
    });

    expect(emptyMap.getWidth()).toBe(0);
    expect(emptyMap.getHeight()).toBe(0);
    expect(singleRowMap.getWidth()).toBe(1);
    expect(singleRowMap.getHeight()).toBe(1);
    expect(exampleMap.getWidth()).toBe(3);
    expect(exampleMap.getHeight()).toBe(2);
  });

  it("has the correct orientation", () => {
    const defaultMap = new ArrayTilemap({
      testLayer: {
        data: [],
      },
    });

    const isometricMap = new ArrayTilemap(
      {
        testLayer: {
          data: [],
        },
      },
      "isometric",
    );

    expect(defaultMap.getOrientation()).toBe("orthogonal");
    expect(isometricMap.getOrientation()).toBe("isometric");
  });

  it("has the correct layers", () => {
    const tm = new ArrayTilemap({
      layerOne: { data: [[1, 0]], isCharLayer: true },
      layerTwo: { data: [[0, 1]] },
    });

    const layers = tm.getLayers();
    expect(layers).toHaveLength(2);

    const layerOne = layers.find((l) => l.getName() === "layerOne");
    const layerTwo = layers.find((l) => l.getName() === "layerTwo");
    expect(layerOne).toBeDefined();
    expect(layerTwo).toBeDefined();

    const layerOneData = layerOne?.getData();
    expect(layerOne?.isCharLayer()).toBe(true);
    expect(layerOne?.getProperty(CHAR_LAYER_PROP_NAME)).toBe("layerOne");
    expect(layerOne?.hasProperty(CHAR_LAYER_PROP_NAME)).toBe(true);
    expect(layerTwo?.getProperty(CHAR_LAYER_PROP_NAME)).toBe(undefined);
    expect(layerTwo?.hasProperty(CHAR_LAYER_PROP_NAME)).toBe(false);
    expect(layerOneData?.[0]?.[0]?.hasProperty(COLLISION_PROP_NAME)).toBe(true);
    expect(layerOneData?.[0]?.[1]?.hasProperty(COLLISION_PROP_NAME)).toBe(true);
    expect(layerOneData?.[0]?.[0]?.getProperty(COLLISION_PROP_NAME)).toBe(true);
    expect(layerOneData?.[0]?.[1]?.getProperty(COLLISION_PROP_NAME)).toBe(
      false,
    );

    const layerTwoData = layerTwo?.getData();
    expect(layerTwo?.isCharLayer()).toBe(false);
    expect(layerTwoData?.[0]?.[0]?.hasProperty(COLLISION_PROP_NAME)).toBe(true);
    expect(layerTwoData?.[0]?.[1]?.hasProperty(COLLISION_PROP_NAME)).toBe(true);
    expect(layerTwoData?.[0]?.[0]?.getProperty(COLLISION_PROP_NAME)).toBe(
      false,
    );
    expect(layerTwoData?.[0]?.[1]?.getProperty(COLLISION_PROP_NAME)).toBe(true);
  });

  it("has the correct boundaries", () => {
    const tm = new ArrayTilemap({
      layerOne: { data: [[1, 0]] },
      layerTwo: { data: [[0, 1]] },
    });

    expect(tm.hasTileAt(0, 0)).toBe(false);
    expect(tm.hasTileAt(0, 0, "layerOne")).toBe(true);
    expect(tm.hasTileAt(-1, 0, "layerOne")).toBe(false);
    expect(tm.hasTileAt(0, -1, "layerOne")).toBe(false);
    expect(tm.hasTileAt(2, 0, "layerOne")).toBe(false);
    expect(tm.hasTileAt(0, 2, "layerOne")).toBe(false);

    expect(tm.hasTileAt(0, 0, "layerTwo")).toBe(true);
    expect(tm.hasTileAt(1, 0, "layerTwo")).toBe(true);

    expect(
      tm.getTileAt(0, 0, "layerOne")?.getProperty(COLLISION_PROP_NAME),
    ).toBe(true);
    expect(
      tm.getTileAt(1, 0, "layerOne")?.getProperty(COLLISION_PROP_NAME),
    ).toBe(false);
    expect(tm.getTileAt(-1, 0, "layerOne")).toBe(undefined);
  });

  it("uses a custom collision prop name", () => {
    const tm = new ArrayTilemap(
      {
        layerOne: { data: [[1, 0]] },
        layerTwo: { data: [[0, 1]] },
      },
      "orthogonal",
      "custom_collision_prop",
    );

    expect(
      tm.getTileAt(0, 0, "layerOne")?.getProperty(COLLISION_PROP_NAME),
    ).toBe(false);
    expect(
      tm.getTileAt(0, 0, "layerOne")?.hasProperty(COLLISION_PROP_NAME),
    ).toBe(false);
    expect(
      tm.getTileAt(0, 0, "layerOne")?.getProperty("custom_collision_prop"),
    ).toBe(true);
    expect(
      tm.getTileAt(0, 0, "layerOne")?.hasProperty("custom_collision_prop"),
    ).toBe(true);
  });
});
