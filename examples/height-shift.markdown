---
layout: default
title: Height Shift
parent: Examples
---

# Height Shifting

**Press the arrow keys to move.** This demo demonstrates how to use the height-shifting feature on tilemap layers, allowing you to be explicit about how overlapping layers are handled. In this example, we want the player to walk behind the plants, but his head should be in front of plants above him. This is where height-shifting comes into play!

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/grid-engine-2.13.0.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
  const config = getBasicConfig(preload, create, update);
  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("tiles", "assets/tf_jungle_tileset.png");
    this.load.tilemapTiledJSON("jungle", "assets/jungle.json");
    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: 52,
      frameHeight: 72,
    });
  }

  function create() {
    const cloudCityTilemap = this.make.tilemap({ key: "jungle" });
    cloudCityTilemap.addTilesetImage("jungle-tileset", "tiles");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap.createLayer(i, "jungle-tileset", 0, 0);
      layer.scale = 3;
    }
    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.scale = 1.5;
    this.cameras.main.startFollow(playerSprite, true);
    this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 6,
          startPosition: {x: 8, y: 8},
        },
      ],
    };

    this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  }

  function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.gridEngine.move("player", "left");
    } else if (cursors.right.isDown) {
      this.gridEngine.move("player", "right");
    } else if (cursors.up.isDown) {
      this.gridEngine.move("player", "up");
    } else if (cursors.down.isDown) {
      this.gridEngine.move("player", "down");
    }
  }
</script>

## The Code

```javascript
// Your game config
const game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "assets/tf_jungle_tileset.png");
  this.load.tilemapTiledJSON("jungle", "assets/jungle.json");
  this.load.spritesheet("player", "assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const cloudCityTilemap = this.make.tilemap({ key: "jungle" });
  cloudCityTilemap.addTilesetImage("jungle-tileset", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "jungle-tileset", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 8, y: 8 },
      },
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    this.gridEngine.move("player", "left");
  } else if (cursors.right.isDown) {
    this.gridEngine.move("player", "right");
  } else if (cursors.up.isDown) {
    this.gridEngine.move("player", "up");
  } else if (cursors.down.isDown) {
    this.gridEngine.move("player", "down");
  }
}
```
