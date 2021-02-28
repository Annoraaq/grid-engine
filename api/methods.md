# Methods

* `create(tilemap: Phaser.Tilemaps.Tilemap, config: GridMovementConfig): void`

  Initializes the plugin. This method needs to be called before any other method. One exception is the `update` method. You are allowed to call it even before the `create` method \(even though it will have no effect\).  

* `getPosition(charId: string): Phaser.Math.Vector2`

  Returns the tile position of the character with the given id.  

* `moveLeft(charId: string): Phaser.Math.Vector2`

  Initiates movement of the character with the given id. If the character is already moving nothing happens. If the movement direction is currently blocked, the character will only turn towards that direction. Movement commands are **not** queued.  

* `moveRight(charId: string): Phaser.Math.Vector2`
* `moveUp(charId: string): Phaser.Math.Vector2`
* `moveDown(charId: string): Phaser.Math.Vector2` 
* `setSpeed(charId: string, speed: number): void`

  Sets the speed in tiles per second for a character.  

* `setWalkingAnimationMapping(charId: string, walkingAnimationMapping: WalkingAnimationMapping): void`

  Sets the [WalkingAnimationMapping](config.md#walkinganimationmapping) for a character.  

* `moveRandomly(charId: string, delay?: number = 0, radius?: number = -1): void`

  Initiates random movement of the character with the given id. The character will randomly pick one of the non-blocking directions. Optionally a `delay` in milliseconds can be provided. This represents the waiting time after a finished movement, before the next is being initiated. If a `radius` other than `-1` is provided, the character will not move further than that radius from its initial position \(the position it has been, when `moveRandomly` was called\). The distance is calculated with the [manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry). Additionally, if a radius other than `-1` was given, the character might move more than one tile into a random direction in one run \(as long as the route is neither blocked nor outside of the radius\).  

* `stopMovingRandomly(charId: string): void`

  Stops moving a character randomly.  

* `moveTo(charId: string, targetPos: Phaser.Math.Vector2): void`

  Initiates movement toward the specified `targetPos`. The movement will happen along one shortest path. If no such path exists, the character will repeatedly check for a path to open up and remain still in the meantime.  

* `addCharacter(charData: CharacterData): void`

  Adds a character on the go.  

* `hasCharacter(charId: string): boolean`

  Checks whether a character with the given ID is registered.  

* `removeCharacter(charId: string)`

  Removes the character with the given ID from the plugin.  

* `follow(charId: string, charIdToFollow: string, distance: number = 0, closestPointIfBlocked: boolean = false)`

  Character `charId` will start to walk towards `charIdToFollow` on a shortest path until he has a distance of `distance` to the character to follow. If `closestPointIfBlocked` is set to `true`, the character will move to the closest point \(manhattan distance\) to `charIdToFollow` that is reachable from `charId` in case that there does not exist a path between `charId` and `charIdToFollow`.  

* `stopFollowing(charId: string)`

  Character `charId` will stop following any character.  

* `movementStarted(): Observable<[string, Direction]>`

  Returns an Observable that on each start of a movement will provide the character ID and the direction.  

* `movementStopped(): Observable<[string, Direction]>`

  Returns an Observable that on each stopped movement of a character will provide it's ID and the direction of that movement.  

* `directionChanged(): Observable<[string, Direction]>`

  Returns an Observable that will notify about every change of direction that is not part of a movement. This is the case if the character tries to walk towards a blocked tile. The character will turn but not move.

