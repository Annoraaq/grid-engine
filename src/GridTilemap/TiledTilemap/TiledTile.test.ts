import { RawTiledTileset } from "./TiledMap.js";
import { TiledTile } from "./TiledTile.js";

describe("TiledTile", () => {
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

  it("gets property", () => {
    const tile = new TiledTile(tilesets, 4);
    expect(tile.getProperty("someBooleanProp")).toBe(true);
    expect(tile.hasProperty("someBooleanProp")).toBe(true);
    expect(tile.getProperty("someStringProp")).toBe("stringVal");
    expect(tile.hasProperty("someStringProp")).toBe(true);
    expect(tile.getProperty("unknownProp")).toBe(undefined);
    expect(tile.hasProperty("unknownProp")).toBe(false);
  });

  it("gets property if properties empty", () => {
    const tile = new TiledTile(tilesets, 5);
    expect(tile.getProperty("unknownProp")).toBe(undefined);
    expect(tile.hasProperty("unknownProp")).toBe(false);
  });

  it("gets property if properties undefined", () => {
    const tile = new TiledTile(tilesets, 6);
    expect(tile.getProperty("unknownProp")).toBe(undefined);
    expect(tile.hasProperty("unknownProp")).toBe(false);
  });
});
