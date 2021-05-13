---
title: Methods
parent: API
nav_order: 2
---

# Methods

| create(tilemap: Phaser.Tilemaps.Tilemap, config: [GridEngineConfig](./config.html/#gridengineconfig)): void                                                                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initializes the plugin. This method needs to be called before any other method. One exception is the `update` method. You are allowed to call it even before the `create` method (even though it will have no effect). |

| getPosition(charId: string): Phaser.Math.Vector2              |
| :------------------------------------------------------------ |
| Returns the tile position of the character with the given id. |

| setPosition(charId: string, pos: Phaser.Math.Vector2): void                                                                                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Places the character with the given id to the provided tile position. If that character is moving, the movement is stopped. The `positionChanged` and `positionChangeFinished` observables will fire. If the character was moving, the `movementStopped` observable will also fire. |

| isMoving(charId: string): boolean                    |
| :--------------------------------------------------- |
| Returns `true` if the character is currently moving. |

| getFacingDirection(charId: string): [Direction](./config.html/#direction)                    |
| :------------------------------------------------------------------------------------------- |
| Returns the direction the character is currently facing. At time of creation this is `down`. |

| turnTowards(charId: string, direction: [Direction](./config.html/#direction)): void |
| :---------------------------------------------------------------------------------- |
| Turns the character towards the given direction without moving it.                  |

| moveLeft(charId: string): void<br />moveRight(charId: string): void<br />moveUp(charId: string): void<br />moveDown(charId: string): void<br />                                                                                                       |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates movement of the character with the given id. If the character is already moving nothing happens. If the movement direction is currently blocked, the character will only turn towards that direction. Movement commands are **not** queued. |

| move(charId: string, [Direction](./config.html/#direction)): void                                                                                                                                                                                     |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates movement of the character with the given id. If the character is already moving nothing happens. If the movement direction is currently blocked, the character will only turn towards that direction. Movement commands are **not** queued. |

| setSpeed(charId: string, speed: number): void       |
| :-------------------------------------------------- |
| Sets the speed in tiles per second for a character. |

| setWalkingAnimationMapping(charId: string, walkingAnimationMapping: [WalkingAnimationMapping](./config.html/#walkinganimationmapping)): void |
| :------------------------------------------------------------------------------------------------------------------------------------------- |
| Sets the [WalkingAnimationMapping](./config.html/#walkinganimationmapping) for a character.                                                  |

| moveRandomly(charId: string, delay: number = 0, radius: number = -1): void                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates random movement of the character with the given id. The character will randomly pick one of the non-blocking directions. Optionally a `delay` in milliseconds can be provided. This represents the waiting time after a finished movement, before the next is being initiated. If a `radius` other than `-1` is provided, the character will not move further than that radius from its initial position (the position it has been, when `moveRandomly` was called). The distance is calculated with the [manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry). Additionally, if a `radius` other than `-1` was given, the character might move more than one tile into a random direction in one run (as long as the route is neither blocked nor outside of the radius). |

| stopMovingRandomly(charId: string): void <span class="label label-red">DEPRECATED</span>                                                                                                      |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stops any automated movement such as random movement (`moveRandomly()`), following (`follow()`) or moving to a specified position (`moveTo()`). **DEPRECATED**: use `stopMovement()` instead. |

| moveTo(charId: string, targetPos: Phaser.Math.Vector2, config: [MoveToConfig](./methods.html/#movetoconfig)): void                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates movement toward the specified `targetPos`. The movement will happen along one shortest path. Check out [MoveToConfig](./methods.html/#movetoconfig) for pathfinding configurations. |

| addCharacter(charData: [CharacterData](./config.html/#characterdata)): void |
| :-------------------------------------------------------------------------- |
| Adds a character on the go.                                                 |

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

| stopFollowing(charId: string) <span class="label label-red">DEPRECATED</span>                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stops any automated movement such as random movement (`moveRandomly()`), following (`follow()`) or moving to a specified position (`moveTo()`). **DEPRECATED**: use `stopMovement()` instead. |

| stopMovement(charId: string)                                                                                                                   |
| :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Stops any automated movement such as random movement (`moveRandomly()`), following (`follow()`) or moving to a specified position (`moveTo()`) |

| movementStarted(): Observable<[string, [Direction](./config.html/#direction)]>                          |
| :------------------------------------------------------------------------------------------------------ |
| Returns an Observable that on each start of a movement will provide the character ID and the direction. |

| movementStopped(): Observable<[string, [Direction](./config.html/#direction)]>                                              |
| :-------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that on each stopped movement of a character will provide it's ID and the direction of that movement. |

| directionChanged(): Observable<[string, [Direction](./config.html/#direction)]>                                                                                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of direction that is not part of a movement. This is the case if the character tries to walk towards a blocked tile. The character will turn but not move. |

| positionChanged(): Observable<{charId: string, exitTile: Phaser.Math.Vector2, enterTile: Phaser.Math.Vector2}>                   |
| :------------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of tile position. It will notify at the **beginning** of the movement. |

| positionChangeFinished(): Observable<{charId: string, exitTile: Phaser.Math.Vector2, enterTile: Phaser.Math.Vector2}>      |
| :------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of tile position. It will notify at the **end** of the movement. |

# Pathfinding Configuration

## MoveToConfig

```js
{
  noPathFoundStrategy?: NoPathFoundStrategy,
  pathBlockedStrategy?: PathBlockedStrategy
}
```

## NoPathFoundStrategy

```js
"STOP" | "CLOSEST_REACHABLE"
```
This strategy can be used to configure pathfinding. It determines what happens if no path could be found. "STOP" will simply stop the pathfinding if no path could be found. "CLOSEST_REACHABLE" will look for the closest point ([manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry)) to the target position that is reachable.

## PathBlockedStrategy

```js
"WAIT" | "RETRY"
```
This strategy can be used to configure pathfinding. It determines what happens if a previously calculated path is suddenly blocked. This can happen if a path existed and while the character was moving along that path, it got suddenly blocked. "WAIT" will make the character wait (possibly forever) until the path will be free again. "RETRY" will make the character look for a new path (repeatedly and possibly forever).
