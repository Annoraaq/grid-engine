# Grid Movement Plugin for Phaser 3

![](images/movemment.gif)

## Usage

Install package:

```
npm i --save phaser-grid-movement-plugin
```

In your GameConfig add:

```
import * as GridMovementPlugin from "phaser-grid-movement-plugin";

...

const gameConfig = {

  ...

  plugins: {
    scene: [
      {
        key: "gridMovementPlugin",
        plugin: GridMovementPlugin,
        mapping: "gridMovementPlugin",
      },
    ],
  },

  ...

};

const game = new Phaser.Game(gameConfig);
```

In your Scenes create method add:

```
function create () {

  ...

  const gridMovementConfig = {
    characters: [{
      id: "player",
      sprite: playerSprite,
      characterIndex: 6,
    }],
    firstLayerAboveChar: 3,
  };

  this.gridMovementPlugin.create(tilemap, gridMovementConfig);

  ...

}
```

That's all you need for a minimum configuration. See the examples folder for a complete example.

## API

### Config

`characters: CharacterData[]`

An array of character data. Each describing a character on the map.

`firstLayerAboveChar: number`
In your tilemap, the index of the first layer that should be rendered on top of all the character layers.

### CharacterData

`id: string`
A unique identifier for the character on the map. If you provice two characters with the same id, the last one will override the previous one.

`sprite: Phaser.GameObjects.Sprite`
The characters sprite.

`characterIndex: number`
The 0-based index of the character on the spritesheet.

`(optional, default: 4) speed: TileSizePerSecond`
The speed of a player in tiles per second.

`(optional, default: (0,0)) startPosition: Phaser.Math.Vector2`
Start tile position of the player.

### Methods

`create(tilemap: Phaser.Tilemaps.Tilemap, config: GridMovementConfig): void`
Initializes the plugin.

`getPosition(charId: string): Phaser.Math.Vector2`
Returns the tile position of the character with the given id.

`moveLeft(charId: string): Phaser.Math.Vector2`
Initiates movement of the character with the given id. If the character is already moving nothing happens. If the movement direction is currently blocked, the character will only turn towards that direction. Movement commands are **not** queued.

`moveRight(charId: string): Phaser.Math.Vector2`

`moveUp(charId: string): Phaser.Math.Vector2`

`moveDown(charId: string): Phaser.Math.Vector2`
