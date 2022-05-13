---
layout: default
title: Crowd (8 directions)
parent: Examples (8 directions)
---

# Following

**Press the arrow keys to move.** This demo demonstrates movement and collision with other characters in 8 directions. It further demonstrates the efficiency of the plugin.

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/grid-engine-2.15.1.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>

  const config = getBasicConfig(preload, create, update);
  const game = new Phaser.Game(config);

  function preload () {
    this.load.image("tiles", "assets/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city_large.json");
    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: 52,
      frameHeight: 72,
    });
  }

  function create () {
    const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
    cloudCityTilemap.addTilesetImage("cloud_tileset", "tiles");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap.createLayer(i, "cloud_tileset", 0, 0);
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
          walkingAnimationMapping: 6,
          startPosition: {x: 22, y: 40},
        },
      ],
      numberOfDirections: 8,
    };

    for (let x=10; x<=20; x++) {
      for (let y=31; y<=40; y++) {
        const spr = this.add.sprite(0, 0, "player");
        spr.scale = 1.5;
        gridEngineConfig.characters.push({
          id: `npc${x}#${y}`,
          sprite: spr,
          walkingAnimationMapping: getRandomInt(0,6),
          startPosition: {x, y},
          speed: 2
        })
      }
    }

    this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

    for (let x=10; x<=20; x++) {
      for (let y=31; y<=40; y++) {
        this.gridEngine.moveRandomly(`npc${x}#${y}`, getRandomInt(0,1500));
      }
    }
  }

  function update () {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown && cursors.up.isDown) {
      this.gridEngine.move("player", "up-left");
    } else if (cursors.left.isDown && cursors.down.isDown) {
      this.gridEngine.move("player", "down-left");
    } else if (cursors.right.isDown && cursors.up.isDown) {
      this.gridEngine.move("player", "up-right");
    } else if (cursors.right.isDown && cursors.down.isDown) {
      this.gridEngine.move("player", "down-right");
    } else if (cursors.left.isDown) {
      this.gridEngine.move("player", "left");
    } else if (cursors.right.isDown) {
      this.gridEngine.move("player", "right");
    } else if (cursors.up.isDown) {
      this.gridEngine.move("player", "up");
    } else if (cursors.down.isDown) {
      this.gridEngine.move("player", "down");
    }
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
</script>

## The Code

```javascript
// Your game config
const game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "assets/cloud_tileset.png");
  this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city_large.json");
  this.load.spritesheet("player", "assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
  cloudCityTilemap.addTilesetImage("cloud_tileset", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "cloud_tileset", 0, 0);
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
        startPosition: { x: 22, y: 40 },
      },
    ],
    numberOfDirections: 8,
  };

  for (let x = 10; x <= 20; x++) {
    for (let y = 31; y <= 40; y++) {
      const spr = this.add.sprite(0, 0, "player");
      spr.scale = 1.5;
      gridEngineConfig.characters.push({
        id: `npc${x}#${y}`,
        sprite: spr,
        walkingAnimationMapping: getRandomInt(0, 6),
        startPosition: { x, y },
        speed: 2,
      });
    }
  }

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

  for (let x = 10; x <= 20; x++) {
    for (let y = 31; y <= 40; y++) {
      this.gridEngine.moveRandomly(`npc${x}#${y}`, getRandomInt(0, 1500));
    }
  }
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown && cursors.up.isDown) {
    this.gridEngine.move("player", "up-left");
  } else if (cursors.left.isDown && cursors.down.isDown) {
    this.gridEngine.move("player", "down-left");
  } else if (cursors.right.isDown && cursors.up.isDown) {
    this.gridEngine.move("player", "up-right");
  } else if (cursors.right.isDown && cursors.down.isDown) {
    this.gridEngine.move("player", "down-right");
  } else if (cursors.left.isDown) {
    this.gridEngine.move("player", "left");
  } else if (cursors.right.isDown) {
    this.gridEngine.move("player", "right");
  } else if (cursors.up.isDown) {
    this.gridEngine.move("player", "up");
  } else if (cursors.down.isDown) {
    this.gridEngine.move("player", "down");
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```
