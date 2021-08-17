---
title: Config
parent: API
nav_order: 1
---

# Config

The data shape of the configuration object is described here.

## GridEngineConfig

| characters: CharacterData[]                                         |
| :------------------------------------------------------------------ |
| An array of character data. Each describing a character on the map. |

| collisionTilePropertyName: string <span class="label label-green">OPTIONAL</span>
|:-------------|
| A custom name for the collision tile property of your tilemap. |

| numberOfDirections: 4 \| 8 <span class="label label-green">OPTIONAL</span><span class="label label-blue">DEFAULT: 4</span>                                                                       |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The possible number of directions for moving a character. Default is 4 (up, down, left, right). If set to 8 it additionaly enables diagonal movement (up-left, up-right, down-left, down-right). |

| characterCollisionStrategy: [CollisionStrategy](#collisionstrategy) <span class="label label-green">OPTIONAL</span><span class="label label-blue">DEFAULT: "BLOCK_TWO_TILES"</span>
|:-------------|
| The character collision strategy. See [CollisionStrategy](#collisionstrategy). |

## CharacterData

| id: string                                                                                                                                     |
| :--------------------------------------------------------------------------------------------------------------------------------------------- |
| A unique identifier for the character on the map. If you provice two characters with the same id, the last one will override the previous one. |

| sprite: Phaser.GameObjects.Sprite |
| :-------------------------------- |
| The character's sprite.           |

| walkingAnimationMapping: number \| [WalkingAnimationMapping](#walkinganimationmapping) <span class="label label-green">OPTIONAL</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If not set, automatic walking animation will be disabed. Do this if you want to use a custom animation. In case of number: The 0-based index of the character on the spritesheet. Here is an example image showing the character indices: <img src="../img/charIndex.png" alt="Example of a height shift."> In case of [WalkingAnimationMapping](#walkinganimationmapping): Alternatively to providing a characterIndex you can also provide a custom frame mapping. This is especially handy if your spritesheet has a different arrangement of frames than you can see in the example image (4 rows with 3 columns). You can provide the frame number for every state of the character. If both, a `characterIndex` and a `walkingAnimationMapping` is set, the walkingAnimationMapping is given preference. For more details see the [custom walking animation mapping example](../examples/-properties) |

| speed: TileSizePerSecond <span class="label label-green">OPTIONAL</span><span class="label label-blue">DEFAULT: 4</span> |
| :----------------------------------------------------------------------------------------------------------------------- |
| The speed of a player in tiles per second.                                                                               |

| startPosition: [Position](#position) <span class="label label-green">OPTIONAL</span><span class="label label-blue">DEFAULT: (0, 0)</span> |
| :---------------------------------------------------------------------------------------------------------------------------------------- |
| Start tile position of the player.                                                                                                        |

| container: Phaser.GameObjects.Container <span class="label label-green">OPTIONAL</span>                                                                                                                                                                                                                                                                                                                      |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A container that holds the character's sprite. This can be used in order to move more game objects along with the sprite (for example a character's name or health bar). In order to position the container correctly on the tiles, it is necessary that you position the character's sprite on position (0, 0) in the container. For more details see the [container example](../examples/phaser-container) |

| offsetX: number <span class="label label-green">OPTIONAL</span>                                                         |
| :---------------------------------------------------------------------------------------------------------------------- |
| A custom x-offset for the sprite/container. For more details see the [custom offset example](../examples/custom-offset) |

| offsetY: number <span class="label label-green">OPTIONAL</span>                                                         |
| :---------------------------------------------------------------------------------------------------------------------- |
| A custom y-offset for the sprite/container. For more details see the [custom offset example](../examples/custom-offset) |

| facingDirection: [Direction](#direction) <span class="label label-green">OPTIONAL</span> |
| :--------------------------------------------------------------------------------------- |
| Sets the direction the character is initially facing.                                    |

| collides: boolean <span class="label label-green">OPTIONAL</span> <span class="label label-blue">DEFAULT: true</span> |
| :-------------------------------------------------------------------------------------------------------------------- |
| Set to false, if character should not collide (neither with the tilemap, nor with other characters)                   |

## WalkingAnimationMapping

```js
{
  up: {
    leftFoot: number,
    standing: number,
    rightFoot: number
  },
  right: {
    leftFoot: number,
    standing: number,
    rightFoot: number
  },
  down: {
    leftFoot: number,
    standing: number,
    rightFoot: number
  },
  left: {
    leftFoot: number,
    standing: number,
    rightFoot: number
  }
}
```

## Direction

```js
"none" |
  "up" |
  "right" |
  "left" |
  "down" |
  "up-left" |
  "up-right" |
  "down-left" |
  "down-right";
```

## Position

```js
{
  x: number,
  y: number
}
```

## CollisionStrategy

```js
"BLOCK_TWO_TILES" | "BLOCK_ONE_TILE_AHEAD",
```

**"BLOCK_TWO_TILES"**: When character is standing, it will block only one tile. If it is moving, it will block the tile it is leaving and the tile it is entering

**"BLOCK_ONE_TILE_AHEAD"**: When character is standing, it will block only one tile. If it is moving, it will only block the tile it is entering.
