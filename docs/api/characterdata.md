---
sidebar_title: CharacterData
sidebar_position: 2
---

# CharacterData

An Object that contains various properties for characters. These Objects get registered into Grid Engine via [GridEngineConfig](/api/gridengineconfig).

## Properties

### `id: string`

A unique identifier for the character in the plugin. If you provide two characters with the same `id`, the latest one will override the previous one.

<div class="separator"></div>

### `sprite: Phaser.GameObjects.Sprite`

The character's Sprite object. For example;

```js
// playerSprite is what you would pass to this property.
const playerSprite = this.add.sprite(0, 0, "player")
```

<div class="separator"></div>

### `walkingAnimationMapping: number | WalkingAnimationMapping`

<span class="badge badge--info badge--bm">Optional</span>

**If not set**, automatic walking animation will be disabled. Do this if you want to use a custom animation.

**If a number is set**, it should be the 0-based index of the character on the spritesheet. See [this example image](/img/examples/characterIndex.png), which shows how one might split up a spritesheet.

Alternative to providing a "character index", you can also provide a custom frame mapping. This is especially handy if your spritesheet has a different arrangement of frames than you can see in the above example image (4 rows with 3 columns). You can provide the frame number for every state of the character. 

For more details see the [custom walking animation mapping example](/). <br />
See also [WalkingAnimationMapping](/api/walkinganimationmapping).

<div class="separator"></div>

### `speed: TileSizePerSecond`

<span class="badge badge--info badge--bm">Optional</span> <span class="badge badge--primary badge--bm">Default: 4</span>

The speed of the character in tiles per second.

<div class="separator"></div>

### `startPosition: Position`

<span class="badge badge--info badge--bm">Optional</span> <span class="badge badge--primary badge--bm">Default: (0, 0)</span>

Starting postion of the character on the grid, in x-y coordinates. Defaults to `{x: 0, y: 0}`. See [Position](/api/position).

<div class="separator"></div>

### `container: Phaser.GameObjects.Container`

<span class="badge badge--info badge--bm">Optional</span>

A container that holds the character's Sprite. This can be used in order to move more game objects along with the sprite; for example a character's name or health bar. In order to position the container correctly on the tiles, it is necessary that you position the character's sprite on position (0, 0) within the container. For more details see the [container example](../examples/phaser-container).

<div class="separator"></div>

### `offsetX: number`

<span class="badge badge--info badge--bm">Optional</span>

A custom x-offset for the sprite/container. For more details see the [custom offset example](../examples/custom-offset).

<div class="separator"></div>

### `offsetY: number`

<span class="badge badge--info badge--bm">Optional</span>

A custom y-offset for the sprite/container. For more details see the [custom offset example](../examples/custom-offset).

<div class="separator"></div>

### `facingDirection: Direction`

<span class="badge badge--info badge--bm">Optional</span>

Sets the direction the character is initially facing. See [Direction](/api/direction).