import { GridCharacter } from "../GridCharacter";

/**
 * Options for filtering characters.
 */
export interface CharacterFilteringOptions {
  labels?: {
    /**
     * When set and not an empty array, these labels must ALL be present on a
     * character in order for it to appear in the filtered result.
     *
     * If both, {@link CharacterFilteringOptions.withAllLabels} and
     * {@link CharacterFilteringOptions.withNoneLabels} are provided and
     * non-empty arrays, {@link CharacterFilteringOptions.withNoneLabels} is ignored.
     *
     * If both, {@link CharacterFilteringOptions.withAllLabels} and
     * {@link CharacterFilteringOptions.withOneOfLabels} are provided and
     * non-empty arrays, {@link CharacterFilteringoptions.withOneOfLabels} is ignored.
     * @default `[]`
     */
    withAllLabels?: string[];

    /**
     * When set and not an empty array, NONE of these labels must be present on
     * a character in order for it to appear in the filtered result.
     *
     * If both, {@link CharacterFilteringOptions.withAllLabels} and
     * {@link CharacterFilteringOptions.withNoneLabels} are provided and
     * non-empty arrays, {@link CharacterFilteringoptions.withNoneLabels} is ignored.
     *
     * If both, {@link CharacterFilteringOptions.withNoneLabels} and
     * {@link CharacterFilteringOptions.withOneOfLabels} are provided and
     * non-empty arrays, {@link CharacterFilteringOptions.withNoneLabels} is ignored.
     * @default `[]`
     */
    withNoneLabels?: string[];

    /**
     * When set and not an empty array, ONE of these labels must be present on a
     * character in order for it to appear in the filtered result.
     *
     * If both, {@link CharacterFilteringOptions.withAllLabels} and
     * {@link CharacterFilteringoptions.withNoneLabels} are provided and
     * non-empty arrays, {@link CharacterFilteringoptions.withNoneLabels} is ignored.
     *
     * If both, {@link CharacterFilteringOptions.withNoneLabels} and
     * {@link CharacterFilteringOptions.withOneOfLabels} are provided and
     * non-empty arrays, {@link CharacterFilteringOptions.withNoneLabels} is ignored.
     * @default `[]`
     */
    withOneOfLabels?: string[];
  };
}

export function filterCharacters(
  characters: GridCharacter[],
  options: CharacterFilteringOptions
): GridCharacter[] {
  return characters.filter((gridChar: GridCharacter) => {
    if (options.labels?.withAllLabels) {
      return options.labels?.withAllLabels.every((label: string) => {
        return gridChar.hasLabel(label);
      });
    } else if (options.labels?.withOneOfLabels) {
      return options.labels?.withOneOfLabels.some((label: string) => {
        return gridChar.hasLabel(label);
      });
    } else if (options.labels?.withNoneLabels) {
      return !options.labels?.withNoneLabels.some((label: string) => {
        return gridChar.hasLabel(label);
      });
    }
    return true;
  });
}
