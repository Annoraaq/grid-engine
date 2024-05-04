/**
 * Different strategies that determine the behavior of pathfinding if no path
 * could be found.
 *
 * @category Pathfinding
 */
export enum NoPathFoundStrategy {
  /**
   * Simply stops pathfinding if no path could be found.
   */
  STOP = "STOP",

  /**
   * Look for the closest point ({@link
   * https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}) to
   * the target position that is reachable.
   */
  CLOSEST_REACHABLE = "CLOSEST_REACHABLE",

  /**
   * Tries again after {@link MoveToConfig.noPathFoundRetryBackoffMs}
   * milliseconds until the maximum amount of retries ({@link
   * MoveToConfig.noPathFoundMaxRetries}) has been reached. By default, {@link
   * MoveToConfig.noPathFoundMaxRetries} is `-1`, which means that there is no
   * maximum number of retries and it will try again possibly "forever".
   */
  RETRY = "RETRY",

  /**
   * Tries each of {@link MoveToConfig.alternativeTargets}. If there does not
   * exist a path to any of these targets, {@link
   * MoveToConfig.noPathFoundAlternativeTargetsFallbackStrategy} determines the fallback
   * strategy.
   */
  ALTERNATIVE_TARGETS = "ALTERNATIVE_TARGETS",
}
