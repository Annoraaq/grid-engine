---
layout: default
title: Move To
parent: Examples (8 directions)
---

# Move Character To

**Press the arrow keys to move.** This demo demonstrates how you can command characters (including the player) to move to the desired tile, and they will pathfind the shortest route to their destination using 8 directions. Follow the NPCs to their destination!

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/grid-engine-1.15.0.min.js"></script>
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
      const layer = cloudCityTilemap.createDynamicLayer(i, "cloud_tileset", 0, 0);
      layer.scale = 3;
    }
    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.scale = 1.5;
    this.cameras.main.startFollow(playerSprite, true);
    this.cameras.main.setFollowOffset(- (playerSprite.width), -(playerSprite.height));

    tintTile(cloudCityTilemap, 18, 15, 0xff7a4a);
    tintTile(cloudCityTilemap, 19, 15, 0xffcc4a);
    tintTile(cloudCityTilemap, 20, 15, 0x6eff94);

    const npcSprite = this.add.sprite(0, 0, "player");
    npcSprite.scale = 1.5;

    const npcSprite1 = this.add.sprite(0, 0, "player");
    npcSprite1.scale = 1.5;

    const npcSprite2 = this.add.sprite(0, 0, "player");
    npcSprite2.scale = 1.5;

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 6,
          startPosition: new Phaser.Math.Vector2(8, 8),
        },
        {
          id: "npc0",
          sprite: npcSprite,
          walkingAnimationMapping: 0,
          startPosition: new Phaser.Math.Vector2(12, 5),
          speed: 3
        },
        {
          id: "npc1",
          sprite: npcSprite1,
          walkingAnimationMapping: 1,
          startPosition: new Phaser.Math.Vector2(14, 8),
        },
        {
          id: "npc2",
          sprite: npcSprite2,
          characterIndex: 3,
          startPosition: new Phaser.Math.Vector2(5, 10),
          speed: 2
        },
      ],
      firstLayerAboveChar: 3,
      numberOfDirections: 8,
    };

    this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
    this.gridEngine.moveTo('npc0', new Phaser.Math.Vector2(15, 18));
    this.gridEngine.moveTo('npc1', new Phaser.Math.Vector2(15, 19));
    this.gridEngine.moveTo('npc2', new Phaser.Math.Vector2(15, 20));
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

  function tintTile(tilemap, row, col, color) {
    for (let i = 0; i < tilemap.layers.length; i++) {
      tilemap.layers[i].tilemapLayer.layer.data[row][col].tint = color;
    }
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
    const layer = cloudCityTilemap.createDynamicLayer(i, "cloud_tileset", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  tintTile(cloudCityTilemap, 18, 15, 0xff7a4a);
  tintTile(cloudCityTilemap, 19, 15, 0xffcc4a);
  tintTile(cloudCityTilemap, 20, 15, 0x6eff94);

  const npcSprite = this.add.sprite(0, 0, "player");
  npcSprite.scale = 1.5;

  const npcSprite1 = this.add.sprite(0, 0, "player");
  npcSprite1.scale = 1.5;

  const npcSprite2 = this.add.sprite(0, 0, "player");
  npcSprite2.scale = 1.5;

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: new Phaser.Math.Vector2(8, 8),
      },
      {
        id: "npc0",
        sprite: npcSprite,
        walkingAnimationMapping: 0,
        startPosition: new Phaser.Math.Vector2(12, 5),
        speed: 3,
      },
      {
        id: "npc1",
        sprite: npcSprite1,
        walkingAnimationMapping: 1,
        startPosition: new Phaser.Math.Vector2(14, 8),
      },
      {
        id: "npc2",
        sprite: npcSprite2,
        characterIndex: 3,
        startPosition: new Phaser.Math.Vector2(5, 10),
        speed: 2,
      },
    ],
    firstLayerAboveChar: 3,
    numberOfDirections: 8,
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  this.gridEngine.moveTo("npc0", new Phaser.Math.Vector2(15, 18));
  this.gridEngine.moveTo("npc1", new Phaser.Math.Vector2(15, 19));
  this.gridEngine.moveTo("npc2", new Phaser.Math.Vector2(15, 20));
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

function tintTile(tilemap, row, col, color) {
  for (let i = 0; i < tilemap.layers.length; i++) {
    tilemap.layers[i].tilemapLayer.layer.data[row][col].tint = color;
  }
}
```
