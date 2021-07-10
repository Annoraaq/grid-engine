---
sidebar_label: 'Methods'
sidebar_position: 2
---

# Methods

This is a compendium of the methods within the plugin, as well as a description of their function.


### `create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void`

Initializes the plugin. This method needs to be called before any other method. One exception is the `update` method. You are allowed to call it even before the `create` method (even though it will have no effect).

See [GridEngineConfig](/api/gridengineconfig).

<div class="separator"></div>

### `getPosition(id: string): Position`

Returns the [`Position`](/api/position) of the given character. `id` uses the `id` property of the character, as found in [CharacterData](/api/characterdata).

<div class="separator"></div>

### `setPosition(id: string, pos: Position): void`

Places the character with the given [`id`](/api/characterdata#id-string) to the provided [`Position`](/api/position) on the grid. If that character is moving, the movement is stopped. The `positionChanged` and `positionChangeFinished` Observables will fire. If the character was moving, the `movementStopped` Observable will also fire.

<div class="separator"></div>

### `isMoving(id: string): boolean`

Returns `true` if the character with the given [`id`](/api/characterdata#id-string) is moving, `false` otherwise.

<div class="separator"></div>

### `getFacingDirection(id: string): Direction`

Returns the [`Direction`](/api/direction) the character with the given [`id`](/api/characterdata#id-string) is facing.

<div class="separator"></div>

### `turnTowards(id: string, direction: Direction): void`

Turns the character with the given [`id`](/api/characterdata#id-string) towards the given [`Direction`](/api/direction) without moving the character.

<div class="separator"></div>

### `move(id: string, dir: Direction): void`

Initiates movement of the character with the given [`id`](/api/characterdata#id-string) in the given [`Direction`](/api/direction). If the character is already moving nothing happens. If the movement direction is currently blocked, the character will only turn towards that direction. Movement commands are **not** queued.

<div class="separator"></div>

### `setSpeed(id: string, speed: number): void`

Set the speed in tiles per second for the character with the given [`id`](/api/characterdata#id-string).

<div class="separator"></div>

### `setWalkingAnimationMapping(id: string, wam: WalkingAnimationMapping): void`

Sets the [WalkingAnimationMapping](./config.html#walkinganimationmapping) for the character with the given [`id`](/api/characterdata#id-string).

<div class="separator"></div>

### `moveRandomly(id: string, delay: number = 0, radius: number = -1): void`

Initiates random movement of the character with the given [`id`](/api/characterdata#id-string). The character will randomly pick one of the non-blocking directions.

Optionally a `delay` in milliseconds can be provided. This represents the waiting time after a finished movement, before the next is being initiated. If a `radius` other than `-1` is provided, the character will not move further than that radius from its initial [`Position`](/api/position) (the position it had been at, when `moveRandomly` was called). The distance is calculated with the [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry).

Additionally, if a `radius` other than `-1` was given, the character might move more than one tile into a random direction in one run (as long as the route is neither blocked nor outside of the radius).

<div class="separator"></div>

### `moveTo(id: string, target: Position, config: MoveToConfig): void`

Initiates movement of the character with the given [`id`](/api/characterdata#id-string) to the `target` [`Position`](/api/position). The movement will happen along one shortest path. See [MoveToConfig](./methods.html#movetoconfig) for pathfinding configurations.

<div class="separator"></div>

### `addCharacter(charData: CharacterData): void`

Programmatically register a character in the plugin, with properties defined by the given [`CharacterData`](/api/characterdata) Object.

<div class="separator"></div>

### `hasCharacter(id: string): boolean`

Checked whether a character with the given [`id`](/api/characterdata#id-string) is registered in the plugin. Returns `true` if so, `false` otherwise.

<div class="separator"></div>

### `getAllCharacters(): string[]`

Returns an array containing all the [`id`](/api/characterdata#id-string) properties of registered characters.

<div class="separator"></div>

### `removeCharacter(id: string)`

Removes the character with the given [`id`](/api/characterdata#id-string) from the plugin. **Note** that this does **not** remove the Sprite object or any other objects from the game. It only means that Grid Engine can no longer manipulate it.

<div class="separator"></div>

### `removeAllCharacters()`

Removes all registered characters from the plugin.

<div class="separator"></div>

### `follow(id: string, idToFollow: string, distance: number = 0, closestPointIfBlocked: boolean = false)`

The character with the given [`id`](/api/characterdata#id-string) will start to walk towards the character with the given `idToFollow` on a shortest path until he has a distance of `distance` to the character to follow.

If the optional `closestPointIfBlocked` is set to `true`, the character will move to the closest point ([Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry)) to `idToFollow` that is reachable from `id` in the case that there does not exist a path between `id` and `idToFollow`.