import { GridCharacter } from "../GridCharacter.js";

/**
 * Options for filtering characters.
 */
export interface CharacterFilteringOptions {
  labels?: {
    /**
     * When set and not an empty array, these labels must ALL be present on a
     * character in order for it to appear in the filtered result.
     *
     * If both, {@link withAllLabels} and
     * {@link withNoneLabels} are provided and
     * non-empty arrays, {@link withNoneLabels} is ignored.
     *
     * If both, {@link withAllLabels} and
     * {@link withOneOfLabels} are provided and
     * non-empty arrays, {@link withOneOfLabels} is ignored.
     * @default `[]`
     */
    withAllLabels?: string[];

    /**
     * When set and not an empty array, NONE of these labels must be present on
     * a character in order for it to appear in the filtered result.
     *
     * If both, {@link withAllLabels} and
     * {@link withNoneLabels} are provided and
     * non-empty arrays, {@link withNoneLabels} is ignored.
     *
     * If both, {@link withNoneLabels} and
     * {@link withOneOfLabels} are provided and
     * non-empty arrays, {@link withNoneLabels} is ignored.
     * @default `[]`
     */
    withNoneLabels?: string[];

    /**
     * When set and not an empty array, ONE of these labels must be present on a
     * character in order for it to appear in the filtered result.
     *
     * If both, {@link withAllLabels} and
     * {@link withNoneLabels} are provided and
     * non-empty arrays, {@link withNoneLabels} is ignored.
     *
     * If both, {@link withNoneLabels} and
     * {@link withOneOfLabels} are provided and
     * non-empty arrays, {@link withNoneLabels} is ignored.
     * @default `[]`
     */
    withOneOfLabels?: string[];
  };
}

export function filterCharacters(
  characters: GridCharacter[],
  options: CharacterFilteringOptions,
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
