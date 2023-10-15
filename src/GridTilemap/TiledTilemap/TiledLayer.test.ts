import { TiledLayer } from "./TiledLayer.js";
import { RawTiledLayer, RawTiledTileset } from "./TiledMap.js";
import { TiledTile } from "./TiledTile.js";

describe("TiledLayer", () => {
  const tilesets: RawTiledTileset[] = [
    {
      firstgid: 1,
      tiles: [],
    },
    {
      firstgid: 4,
      tiles: [
        {
          id: 0,
          properties: [
            { name: "someBooleanProp", type: "bool", value: true },
            { name: "someStringProp", type: "string", value: "stringVal" },
          ],
        },
        {
          id: 1,
          properties: [],
        },
        {
          id: 2,
        },
      ],
    },
  ];

  let rawLayer: RawTiledLayer;

  function createTile(id: number): TiledTile {
    return new TiledTile(tilesets, id);
  }

  beforeEach(() => {
    rawLayer = {
      name: "rawLayerName",
      scale: 4,
      properties: [
        {
          name: "someLayerProp",
          value: "someLayerPropValue",
        },
      ],
      height: 2,
      width: 3,
      data: [0, 0, 12, 12, 23, 23],
    };
  });

  it("gets name", () => {
    const tiledLayerUndefinedName = new TiledLayer(tilesets, {
      ...rawLayer,
      name: undefined,
    });
    const tiledLayer = new TiledLayer(tilesets, rawLayer);
    expect(tiledLayerUndefinedName.getName()).toBe(undefined);
    expect(tiledLayer.getName()).toBe("rawLayerName");
  });

  it("gets property", () => {
    const tiledLayerEmptyProps = new TiledLayer(tilesets, {
      ...rawLayer,
      properties: [],
    });
    const tiledLayerNoProps = new TiledLayer(tilesets, {
      ...rawLayer,
      properties: undefined,
    });
    const tiledLayer = new TiledLayer(tilesets, rawLayer);
    expect(tiledLayerEmptyProps.getProperty("someLayerProp")).toBe(undefined);
    expect(tiledLayerEmptyProps.hasProperty("someLayerProp")).toBe(false);
    expect(tiledLayerNoProps.getProperty("someLayerProp")).toBe(undefined);
    expect(tiledLayerNoProps.hasProperty("someLayerProp")).toBe(false);
    expect(tiledLayer.getProperty("someLayerProp")).toBe("someLayerPropValue");
    expect(tiledLayer.hasProperty("someLayerProp")).toBe(true);
    expect(tiledLayer.getProperty("unknownProp")).toBe(undefined);
    expect(tiledLayer.hasProperty("unknownProp")).toBe(false);
  });

  it("detects char layers", () => {
    const charLayer = new TiledLayer(tilesets, {
      ...rawLayer,
      properties: [
        {
          name: "ge_charLayer",
          value: "true",
        },
      ],
    });
    const tiledLayer = new TiledLayer(tilesets, rawLayer);
    expect(charLayer.isCharLayer()).toBe(true);
    expect(tiledLayer.isCharLayer()).toBe(false);
  });

  it("gets data", () => {
    const tiledLayer = new TiledLayer(tilesets, rawLayer);
    expect(tiledLayer.getData()).toEqual([
      [createTile(0), createTile(0), createTile(12)],
      [createTile(12), createTile(23), createTile(23)],
    ]);
  });
});
