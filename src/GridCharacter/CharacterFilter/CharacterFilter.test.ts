import { NumberOfDirections } from "../../Direction/Direction";
import { CollisionStrategy } from "../../GridEngineHeadless";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { PhaserTilemap } from "../../GridTilemap/Phaser/PhaserTilemap";
import { createTilemapMock } from "../../Utils/MockFactory/MockFactory";
import { GridCharacter } from "../GridCharacter";
import { filterCharacters } from "./CharacterFilter";

describe("CharacterFilter", () => {
  function createChar(
    id: string,
    tilemap: GridTilemap,
    labels: string[]
  ): GridCharacter {
    return new GridCharacter(id, {
      tilemap,
      speed: 3,
      collidesWithTiles: true,
      labels,
      numberOfDirections: NumberOfDirections.FOUR,
    });
  }
  it("should get all characters with specific labels", () => {
    const characters: GridCharacter[] = [];
    const gridTilemap = new GridTilemap(
      new PhaserTilemap(createTilemapMock() as any),
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const char1 = createChar("player1", gridTilemap, ["label1", "label2"]);
    const char2 = createChar("player2", gridTilemap, ["label2"]);
    const char3 = createChar("player3", gridTilemap, []);
    characters.push(char1);
    characters.push(char2);
    characters.push(char3);

    expect(
      filterCharacters(characters, {
        labels: { withOneOfLabels: ["label1", "label2"] },
      })
    ).toEqual([char1, char2]);

    expect(
      filterCharacters(characters, {
        labels: { withAllLabels: ["label1", "label2"] },
      })
    ).toEqual([char1]);

    expect(
      filterCharacters(characters, {
        labels: { withNoneLabels: ["label1", "label2"] },
      })
    ).toEqual([char3]);

    expect(
      filterCharacters(characters, {
        labels: {
          withAllLabels: ["label1", "label2"],
          withOneOfLabels: ["label1", "label2"],
          withNoneLabels: ["label1", "label2"],
        },
      })
    ).toEqual([char1]);

    expect(
      filterCharacters(characters, {
        labels: {
          withOneOfLabels: ["label1", "label2"],
          withNoneLabels: ["label1", "label2"],
        },
      })
    ).toEqual([char1, char2]);

    expect(
      filterCharacters(characters, {
        labels: {
          withAllLabels: ["label1", "label2"],
          withNoneLabels: ["label1", "label2"],
        },
      })
    ).toEqual([char1]);
  });
});
