import { PhaserTile } from "./PhaserTile";

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
});
