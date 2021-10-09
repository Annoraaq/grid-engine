---
layout: default
title: Custom Walking Animation Mapping
parent: Examples
---

# Custom Walking Animation Mapping

**Press the arrow keys to move.** This demo shows how you can change the mapping of the frames for your character's walking animations.

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/grid-engine-2.10.2.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
  const config = getBasicConfig(preload, create, update);
  const game = new Phaser.Game(config);

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
    this.cameras.main.startFollow(playerSprite, true);
    this.cameras.main.setFollowOffset(- (playerSprite.width), -(playerSprite.height));

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: {
            up: {
              leftFoot: 39,
              standing: 40,
              rightFoot: 41
            },
            down: {
              leftFoot: 3,
              standing: 4,
              rightFoot: 5
            },
            left: {
              leftFoot: 15,
              standing: 16,
              rightFoot: 17
            },
            right: {
              leftFoot: 27,
              standing: 28,
              rightFoot: 29
            },
          },
          startPosition: {x: 8, y: 8},
        },
      ],
    };

    this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  }

  function update () {
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
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: {
          up: {
            leftFoot: 39,
            standing: 40,
            rightFoot: 41,
          },
          down: {
            leftFoot: 3,
            standing: 4,
            rightFoot: 5,
          },
          left: {
            leftFoot: 15,
            standing: 16,
            rightFoot: 17,
          },
          right: {
            leftFoot: 27,
            standing: 28,
            rightFoot: 29,
          },
        },
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
