---
layout: default
title: Basic Movement
parent: Examples
---

# Basic Player Movement

**Press the arrow keys to move.** This is a basic demo of player movement, using a test map and basic **Grid Movement** functionality.

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/pgmp.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
    const config = getBasicConfig(preload, create, update);
    var game = new Phaser.Game(config);

    function preload () {
        this.load.image("tiles", "assets/cloud_tileset.png");
        this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
        this.load.spritesheet("player", "assets/characters.png", {
            frameWidth: 52,
            frameHeight: 72,
        });
    }

    function create () {
        const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
        cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
        for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
            const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
            layer.scale = 3;
        }
        const playerSprite = this.add.sprite(0, 0, "player");
        playerSprite.scale = 1.5;
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.roundPixels = true;

        const gridMovementConfig = {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationMapping: 6,
                    startPosition: new Phaser.Math.Vector2(8, 8),
                },
            ],
        };

        this.gridMovementPlugin.create(cloudCityTilemap, gridMovementConfig);
    }

    function update () {
        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.gridMovementPlugin.moveLeft("player");
        } else if (cursors.right.isDown) {
            this.gridMovementPlugin.moveRight("player");
        } else if (cursors.up.isDown) {
            this.gridMovementPlugin.moveUp("player");
        } else if (cursors.down.isDown) {
            this.gridMovementPlugin.moveDown("player");
        }
    }
</script>

## The Code

```javascript
// Your game config
var game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "assets/cloud_tileset.png");
  this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
  this.load.spritesheet("player", "assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
  cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
  this.cameras.main.startFollow(playerSprite);
  this.cameras.main.roundPixels = true;

  const gridMovementConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: new Phaser.Math.Vector2(8, 8),
      },
    ],
  };

  this.gridMovementPlugin.create(cloudCityTilemap, gridMovementConfig);
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    this.gridMovementPlugin.moveLeft("player");
  } else if (cursors.right.isDown) {
    this.gridMovementPlugin.moveRight("player");
  } else if (cursors.up.isDown) {
    this.gridMovementPlugin.moveUp("player");
  } else if (cursors.down.isDown) {
    this.gridMovementPlugin.moveDown("player");
  }
}
```
