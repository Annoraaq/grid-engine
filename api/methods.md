---
title: Methods
parent: API
nav_order: 2
---

# Methods

- [addCharacter(...)](#addcharacter)
- [create(...)](#create)
- [directionChanged(...)](#directionchanged)
- [follow(...)](#follow)
- [getAllCharacters(...)](#getallcharacters)
- [getCharLayer(...)](#getcharlayer)
- [getFacingDirection(...)](#getfacingdirection)
- [getFacingPosition(...)](#getfacingposition)
- [getPosition(...)](#getposition)
- [getSprite(...)](#getsprite)
- [getTransition(...)](#gettransition)
- [hasCharacter(...)](#hascharacter)
- [isBlocked(...)](#isblocked)
- [isMoving(...)](#ismoving)
- [isTileBlocked(...)](#istileblocked)
- [move(...)](#move)
- [moveRandomly(...)](#moverandomly)
- [moveTo(...)](#moveto)
- [movementStarted(...)](#movementstarted)
- [movementStopped(...)](#movementstopped)
- [positionChangeFinished(...)](#positionchangefinished)
- [positionChangeStarted(...)](#positionchangestarted)
- [removeAllCharacters(...)](#removeallcharacters)
- [removeCharacter(...)](#removecharacter)
- [setPosition(...)](#setposition)
- [setSpeed(...)](#setspeed)
- [setSprite(...)](#setsprite)
- [setTransition(...)](#settransition)
- [setWalkingAnimationMapping(...)](#setwalkinganimationmapping)
- [stopMovement(...)](#stopmovement)
- [turnTowards(...)](#turntowards)

<a name="addcharacter"></a>

| addCharacter(charData: [CharacterData](./config.html#characterdata)): void |
| :------------------------------------------------------------------------- |
| Adds a character on the go.                                                |

<a name="create"></a>

| create(tilemap: Phaser.Tilemaps.Tilemap, config: [GridEngineConfig](./config.html#gridengineconfig)): void                                                                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initializes the plugin. This method needs to be called before any other method. One exception is the `update` method. You are allowed to call it even before the `create` method (even though it will have no effect). |

<a name="directionchanged"></a>

| directionChanged(): Observable<{charId: string, direction: [Direction](./config.html#direction)}>                                                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of direction that is not part of a movement. This is the case if the character tries to walk towards a blocked tile. The character will turn but not move. |

<a name="follow"></a>

| follow(charId: string, charIdToFollow: string, distance: number = 0, closestPointIfBlocked: boolean = false)                                                                                                                                                                                                                                                                                                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Character `charId` will start to walk towards `charIdToFollow` on a shortest path until he has a distance of distance to the character to follow. If `closestPointIfBlocked` is set to `true`, the character will move to the closest point ([manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry)) to `charIdToFollow` that is reachable from `charId` in case that there does not exist a path between `charId` and `charIdToFollow`. |

<a name="getallcharacters"></a>

| getAllCharacters(): string[]                                 |
| :----------------------------------------------------------- |
| Returns all character IDs that are registered in the plugin. |

<a name="getcharlayer"></a>

| getCharLayer(charId: string): string \| undefined <span class="label label-purple">BETA</span>                                                        |
| :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns the character layer of the given character. You can read more about character layers and transitions [here](./features/character-layers.html) |

<a name="getfacingdirection"></a>

| getFacingDirection(charId: string): [Direction](./config.html#direction)                     |
| :------------------------------------------------------------------------------------------- |
| Returns the direction the character is currently facing. At time of creation this is `down`. |

<a name="getfacingposition"></a>

| getFacingPosition(charId: string): [Position](./config.html#position) |
| :-------------------------------------------------------------------- |
| Returns the position the character is currently facing.               |

<a name="getposition"></a>

| getPosition(charId: string): [Position](./config.html#position) |
| :-------------------------------------------------------------- |
| Returns the tile position of the character with the given id.   |

<a name="getsprite"></a>

| getSprite(charId: string): Phaser.GameObjects.Sprite |
| :--------------------------------------------------- |
| Gets the sprite of a character.                      |

<a name="gettransition"></a>

| getTransition(position: Position, fromLayer: string): string \| undefined <span class="label label-purple">BETA</span>                                                                                                                                                         |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns the character layer that the transition on position `position` from character layer `fromLayer` leads to. If there is no such transition it will return `undefined`. You can read more about character layers and transitions [here](./features/character-layers.html) |

<a name="hascharacter"></a>

| hasCharacter(charId: string): boolean                       |
| :---------------------------------------------------------- |
| Checks whether a character with the given ID is registered. |

<a name="isblocked"></a>

| isBlocked(position: [Position](./config.html#position), layer?: string): boolean                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Checks whether the given position is blocked by either the tilemap or a blocking character. If you provide no layer, be sure not to use character layers in your tilemap. |

<a name="ismoving"></a>

| isMoving(charId: string): boolean                    |
| :--------------------------------------------------- |
| Returns `true` if the character is currently moving. |

<a name="istileblocked"></a>

| isTileBlocked(position: [Position](./config.html#position), layer?: string): boolean                                                       |
| :----------------------------------------------------------------------------------------------------------------------------------------- |
| Checks whether the given position is blocked by the tilemap. If you provide no layer, be sure not to use character layers in your tilemap. |

<a name="move"></a>

| move(charId: string, [Direction](./config.html#direction)): void                                                                                                                                                                                      |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates movement of the character with the given id. If the character is already moving nothing happens. If the movement direction is currently blocked, the character will only turn towards that direction. Movement commands are **not** queued. |

<a name="moverandomly"></a>

| moveRandomly(charId: string, delay: number = 0, radius: number = -1): void                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates random movement of the character with the given id. The character will randomly pick one of the non-blocking directions. Optionally a `delay` in milliseconds can be provided. This represents the waiting time after a finished movement, before the next is being initiated. If a `radius` other than `-1` is provided, the character will not move further than that radius from its initial position (the position it has been, when `moveRandomly` was called). The distance is calculated with the [manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry). Additionally, if a `radius` other than `-1` was given, the character might move more than one tile into a random direction in one run (as long as the route is neither blocked nor outside of the radius). |

<a name="moveto"></a>

| moveTo(charId: string, targetPos: [Position](./config.html#position), config: [MoveToConfig](./pathfinding-configuration.html#movetoconfig)): Observable<{charId: string, position: [Position](./config.html#position), result: [MoveToResult](./pathfinding-configuration.html#movetoresult), description: string, layer: string}>                                                                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initiates movement toward the specified `targetPos`. The movement will happen along one shortest path. Check out [MoveToConfig](./pathfinding-configuration.html#movetoconfig) for pathfinding configurations. It will return an observable that will fire whenever the moveTo movement is finished or aborted. It will provide a [result code](./pathfinding-configuration.html#movetoresult) as well as a description and a character layer. |

<a name="movementstarted"></a>

| movementStarted(): Observable<{charId: string, direction: [Direction](./config.html#direction)}>        |
| :------------------------------------------------------------------------------------------------------ |
| Returns an Observable that on each start of a movement will provide the character ID and the direction. |

<a name="movementstopped"></a>

| movementStopped(): Observable<{charId: string, direction: [Direction](./config.html#direction)}>                            |
| :-------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that on each stopped movement of a character will provide it's ID and the direction of that movement. |

<a name="positionchangefinished"></a>

| positionChangeFinished(): Observable<{charId: string, exitTile: [Position](./config.html#position), enterTile: [Position](./config.html#position), enterLayer: string, exitLayer: string}> |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of tile position. It will notify at the **end** of the movement.                                                                 |

<a name="positionchangestarted"></a>

| positionChangeStarted(): Observable<{charId: string, exitTile: [Position](./config.html#position), enterTile: [Position](./config.html#position), enterLayer: string, exitLayer: string}> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Returns an Observable that will notify about every change of tile position. It will notify at the **beginning** of the movement.                                                          |

<a name="removeallcharacters"></a>

| removeAllCharacters()                   |
| :-------------------------------------- |
| Removes all characters from the plugin. |

<a name="removecharacter"></a>

| removeCharacter(charId: string)                          |
| :------------------------------------------------------- |
| Removes the character with the given ID from the plugin. |

<a name="setposition"></a>

| setPosition(charId: string, pos: [Position](./config.html#position)): void                                                                                                                                                                                                          |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Places the character with the given id to the provided tile position. If that character is moving, the movement is stopped. The `positionChanged` and `positionChangeFinished` observables will fire. If the character was moving, the `movementStopped` observable will also fire. |

<a name="setspeed"></a>

| setSpeed(charId: string, speed: number): void       |
| :-------------------------------------------------- |
| Sets the speed in tiles per second for a character. |

<a name="setsprite"></a>

| setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void |
| :----------------------------------------------------------------- |
| Sets the sprite for a character.                                   |

<a name="settransition"></a>

| setTransition(tile: Position, fromLayer: string, toLayer: string) <span class="label label-purple">BETA</span>                                                                                                                   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sets the character layer `toLayer` that the transition on position `position` from character layer `fromLayer` should lead to. You can read more about character layers and transitions [here](./features/character-layers.html) |

<a name="setwalkinganimationmapping"></a>

| setWalkingAnimationMapping(charId: string, walkingAnimationMapping: [WalkingAnimationMapping](./config.html#walkinganimationmapping) \| number \| undefined): void                                                                                                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sets the [WalkingAnimationMapping](./config.html#walkinganimationmapping) for a character. Alternatively you can provide a number which is the character index (see also [Character Config](./config.html#characterdata)). If you provide `undefined`, it will disable walking animations for the character. |

<a name="stopmovement"></a>

| stopMovement(charId: string)                                                                                                                   |
| :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Stops any automated movement such as random movement (`moveRandomly()`), following (`follow()`) or moving to a specified position (`moveTo()`) |

<a name="turntowards"></a>

| turnTowards(charId: string, direction: [Direction](./config.html#direction)): void |
| :--------------------------------------------------------------------------------- |
| Turns the character towards the given direction without moving it.                 |
