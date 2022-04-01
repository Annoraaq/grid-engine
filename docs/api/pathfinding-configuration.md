---
title: Pathfinding Configuration
parent: API
nav_order: 3
---

# Pathfinding Configuration

## MoveToConfig

```js
{
  noPathFoundStrategy?: NoPathFoundStrategy,
  pathBlockedStrategy?: PathBlockedStrategy,
  noPathFoundRetryBackoffMs?: number,
  noPathFoundMaxRetries?: number,
  pathBlockedMaxRetries?: number,
  pathBlockedRetryBackoffMs?: number,
  pathBlockedWaitTimeoutMs?: number,
  targetLayer?: string
}
```

`targetLayer` will set the char layer of the movement target. If there is no `targetLayer` provided, the current char layer of the moving character is used.

## NoPathFoundStrategy

```js
"STOP" | "CLOSEST_REACHABLE" | "RETRY";
```

This strategy can be used to configure pathfinding. It determines what happens if no path could be found. "STOP" will simply stop the pathfinding if no path could be found. "CLOSEST_REACHABLE" will look for the closest point ([manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry)) to the target position that is reachable. "RETRY" will try again after `noPathFoundRetryBackoffMs` milliseconds until the maximum amount of retries (`noPathFoundMaxRetries`) has been reached. By default, `noPathFoundMaxRetries` is `-1`, which means that there is no maximum number of retries.

## PathBlockedStrategy

```js
"WAIT" | "RETRY" | "STOP";
```

This strategy can be used to configure pathfinding. It determines what happens if a previously calculated path is suddenly blocked. This can happen if a path existed and while the character was moving along that path, it got suddenly blocked.

**"WAIT"** will make the character wait (forever or until given `pathBlockedWaitTimeoutMs`) until the path will be free again.

**"RETRY"** will make the character look for a new path. You can provide a custom backoff time in milliseconds: `pathBlockedRetryBackoffMs`. You can also specify a maximum number of retries using `pathBlockedMaxRetries`.

**"STOP"** will make the character stop the movement

## MoveToResult

```js
"SUCCESS" |
  "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED" |
  "NO_PATH_FOUND" |
  "PATH_BLOCKED_MAX_RETRIES_EXCEEDED" |
  "PATH_BLOCKED" |
  "PATH_BLOCKED_WAIT_TIMEOUT" |
  "MOVEMENT_TERMINATED";
```

**"SUCCESS":** Successfully arrived.

**"NO_PATH_FOUND_MAX_RETRIES_EXCEEDED":** NoPathFoundStrategy RETRY: Maximum retries of `MoveToConfig.noPathFoundMaxRetries` exceeded.

**"NO_PATH_FOUND":** NoPathFoundStrategy STOP: No path found.

**"PATH_BLOCKED_MAX_RETRIES_EXCEEDED":** PathBlockedStrategy RETRY: Maximum retries of `MoveToConfig.pathBlockedMaxRetries` exceeded.

**"PATH_BLOCKED":** PathBlockedStrategy STOP: Path blocked.

**"PATH_BLOCKED_WAIT_TIMEOUT":** PathBlockedStrategy WAIT: Wait timeout of `MoteToConfig.pathBlockedWaitTimeoutMs`ms exceeded.

**"MOVEMENT_TERMINATED":** Movement of character has been replaced before destination was reached.
