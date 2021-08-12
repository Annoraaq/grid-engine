---
title: Methods
parent: API
nav_order: 2
---

# Methods

| create(tilemap: Phaser.Tilemaps.Tilemap, config: [GridEngineConfig](./config.html#gridengineconfig)): void                                                                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initializes the plugin. This method needs to be called before any other method. One exception is the `update` method. You are allowed to call it even before the `create` method (even though it will have no effect). |

| getPosition(charId: string): [Position](./config.html#position) |
| :-------------------------------------------------------------- |
| Returns the tile position of the character with the given id.   |

| setPosition(charId: string, pos: [Position](./config.html#position)): void                                                                                                                                                                                                          |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Places the character with the given id to the provided tile position. If that character is moving, the movement is stopped. The `positionChanged` and `positionChangeFinished` observables will fire. If the character was moving, the `movementStopped` observable will also fire. |

| isMoving(charId: string): boolean                    |
| :--------------------------------------------------- |
| Returns `true` if the character is currently moving. |

| getFacingDirection(charId: string): [Direction](./config.html#direction)                     |
| :------------------------------------------------------------------------------------------- |
| Returns the direction the character is currently facing. At time of creation this is `down`. |

| getFacingPosition(charId: string): [Position](./config.html#position) |
| :-------------------------------------------------------------------- |
| Returns the position the character is currently facing.               |

| turnTowards(charId: string, direction: [Direction](./config.html#direction)): void |
| :--------------------------------------------------------------------------------- |
| Turns the character towards the given direction without moving it.                 |

| move(charId: string, [Direction](./config.html#direction)): void                                                                                                                                                                                      |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates movement of the character with the given id. If the character is already moving nothing happens. If the movement direction is currently blocked, the character will only turn towards that direction. Movement commands are **not** queued. |

| setSpeed(charId: string, speed: number): void       |
| :-------------------------------------------------- |
| Sets the speed in tiles per second for a character. |

| setWalkingAnimationMapping(charId: string, walkingAnimationMapping: [WalkingAnimationMapping](./config.html#walkinganimationmapping)): void |
| :------------------------------------------------------------------------------------------------------------------------------------------ |
| Sets the [WalkingAnimationMapping](./config.html#walkinganimationmapping) for a character.                                                  |

| setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void |
| :----------------------------------------------------------------- |
| Sets the sprite for a character.                                   |

| getSprite(charId: string): Phaser.GameObjects.Sprite |
| :--------------------------------------------------- |
| Gets the sprite of a character.                      |

| moveRandomly(charId: string, delay: number = 0, radius: number = -1): void                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates random movement of the character with the given id. The character will randomly pick one of the non-blocking directions. Optionally a `delay` in milliseconds can be provided. This represents the waiting time after a finished movement, before the next is being initiated. If a `radius` other than `-1` is provided, the character will not move further than that radius from its initial position (the position it has been, when `moveRandomly` was called). The distance is calculated with the [manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry). Additionally, if a `radius` other than `-1` was given, the character might move more than one tile into a random direction in one run (as long as the route is neither blocked nor outside of the radius). |

| moveTo(charId: string, targetPos: [Position](./config.html#position), config: [MoveToConfig](./methods.html#movetoconfig)): Observable<{charId: string, position: [Position](./config.html#position), result: [MoveToResult](./methods.html#movetoresult), description: string}>                                                                                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates movement toward the specified `targetPos`. The movement will happen along one shortest path. Check out [MoveToConfig](./methods.html#movetoconfig) for pathfinding configurations. It will return an observable that will fire whenever the moveTo movement is finished or aborted. It will provide a [result code](./methods.html#movetoresult) as well as a description. |

| addCharacter(charData: [CharacterData](./config.html#characterdata)): void |
| :------------------------------------------------------------------------- |
| Adds a character on the go.                                                |

| hasCharacter(charId: string): boolean                       |
| :---------------------------------------------------------- |
| Checks whether a character with the given ID is registered. |

| getAllCharacters(): string[]                                 |
| :----------------------------------------------------------- |
| Returns all character IDs that are registered in the plugin. |

| removeCharacter(charId: string)                          |
| :------------------------------------------------------- |
| Removes the character with the given ID from the plugin. |

| removeAllCharacters()                   |
| :-------------------------------------- |
| Removes all characters from the plugin. |

| follow(charId: string, charIdToFollow: string, distance: number = 0, closestPointIfBlocked: boolean = false)                                                                                                                                                                                                                                                                                                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Character `charId` will start to walk towards `charIdToFollow` on a shortest path until he has a distance of distance to the character to follow. If `closestPointIfBlocked` is set to `true`, the character will move to the closest point ([manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry)) to `charIdToFollow` that is reachable from `charId` in case that there does not exist a path between `charId` and `charIdToFollow`. |

| stopMovement(charId: string)                                                                                                                   |
| :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Stops any automated movement such as random movement (`moveRandomly()`), following (`follow()`) or moving to a specified position (`moveTo()`) |

| movementStarted(): Observable<{charId: string, direction: [Direction](./config.html#direction)}>        |
| :------------------------------------------------------------------------------------------------------ |
| Returns an Observable that on each start of a movement will provide the character ID and the direction. |

| movementStopped(): Observable<{charId: string, direction: [Direction](./config.html#direction)}>                            |
| :-------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that on each stopped movement of a character will provide it's ID and the direction of that movement. |

| directionChanged(): Observable<{charId: string, direction: [Direction](./config.html#direction)}>                                                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of direction that is not part of a movement. This is the case if the character tries to walk towards a blocked tile. The character will turn but not move. |

| positionChangeStarted(): Observable<{charId: string, exitTile: [Position](./config.html#position), enterTile: [Position](./config.html#position)}> |
| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of tile position. It will notify at the **beginning** of the movement.                   |

| positionChangeFinished(): Observable<{charId: string, exitTile: [Position](./config.html#position), enterTile: [Position](./config.html#position)}> |
| :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of tile position. It will notify at the **end** of the movement.                          |

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
  pathBlockedWaitTimeoutMs?: number
}
```

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
