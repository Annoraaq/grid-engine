/**
 * Determines what happens if a previously calculated path is suddenly
 * blocked. This can happen if a path existed and while the character was
 * moving along that path, it got suddenly blocked.
 *
 * @category Pathfinding
 */
export enum PathBlockedStrategy {
  /**
   * Makes the character wait (forever or until given {@link MoveToConfig.pathBlockedWaitTimeoutMs})
   * until the path will be free again.
   */
  WAIT = "WAIT",

  /**
   * Makes the character look for a new path. You can provide a custom backoff
   * time in milliseconds: {@link MoveToConfig.pathBlockedRetryBackoffMs}. You
   * can also specify a maximum number of retries using {@link MoveToConfig.pathBlockedMaxRetries}.
   */
  RETRY = "RETRY",

  /**
   * Makes the character stop the movement.
   */
  STOP = "STOP",
}
