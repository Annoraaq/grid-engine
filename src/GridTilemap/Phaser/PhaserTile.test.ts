import { PhaserTile } from "./PhaserTile.js";

describe("PhaserTile", () => {
  it("should detect properties", () => {
    const tileMock = {
      properties: {
        testString: "value",
        testBoolean: false,
      },
    } as unknown as Phaser.Tilemaps.Tile;

    const phaserTile = new PhaserTile(tileMock);
    expect(phaserTile.hasProperty("testString")).toBe(true);
    expect(phaserTile.hasProperty("testBoolean")).toBe(true);
    expect(phaserTile.hasProperty("unknown")).toBe(false);

    expect(phaserTile.getProperty("testString")).toEqual("value");
    expect(phaserTile.getProperty("testBoolean")).toEqual(false);
    expect(phaserTile.getProperty("unknown")).toEqual(undefined);
  });

  it("should detect class properties", () => {
    const tiledProject = {
      propertyTypes: [
        {
          name: "SomeTiledClass",
          type: "class",
          members: [
            {
              name: "testProp",
              type: "boolean",
              value: true,
            },
            {
              name: "propToOverride",
              type: "boolean",
              value: true,
            },
            {
              name: "otherClassProp",
              propertyType: "SomeOtherTiledClass",
              type: "class",
              value: {
                otherTestProp: true,
              },
            },
          ],
        },
        {
          name: "SomeOtherTiledClass",
          type: "class",
          members: [
            {
              name: "otherTestProp",
              type: "boolean",
              value: true,
            },
          ],
        },
      ],
    };
    const tileIndex = 20;
    const tileMock = {
      index: tileIndex,
      properties: {
        propToOverride: false,
      },
      tileset: {
        tileData: {
          [tileIndex - 1]: {
            type: "SomeTiledClass",
          },
        },
      },
    } as unknown as Phaser.Tilemaps.Tile;

    const phaserTile = new PhaserTile(tileMock, tiledProject);
    expect(phaserTile.hasProperty("propToOverride")).toBe(true);
    expect(phaserTile.getProperty("propToOverride")).toBe(false);
    expect(phaserTile.hasProperty("testProp")).toBe(true);
    expect(phaserTile.getProperty("testProp")).toBe(true);
    expect(phaserTile.hasProperty("otherTestProp")).toBe(true);
    expect(phaserTile.getProperty("otherTestProp")).toBe(true);
  });
});
