---
layout: default
title: Move To (multi-tile)
parent: Examples
---

# Move Character To

**Press the arrow keys to move.** This demo demonstrates how you can command multi-tile characters (including the player) to move to the desired tile, and they will pathfind the shortest route to their destination. Follow the NPCs to their destination!

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/grid-engine-2.24.0.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
  const config = getBasicConfig(preload, create, update);
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
    const charTileWidth = 2;
    const charTileHeight = 2;
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

    tintTile(cloudCityTilemap, 18, 15, 0xff7a4a);
    tintTile(cloudCityTilemap, 21, 15, 0x6eff94);

    const npcSprite = this.add.sprite(0, 0, "player");
    npcSprite.scale = 1.5;

    const npcSprite1 = this.add.sprite(0, 0, "player");
    npcSprite1.scale = 1.5;

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 6,
          startPosition: {x: 7, y: 8},
          tileWidth: charTileWidth,
          tileHeight: charTileHeight,
        },
        {
          id: "npc0",
          sprite: npcSprite,
          walkingAnimationMapping: 0,
          startPosition: {x: 12, y: 4},
          speed: 3,
          tileWidth: charTileWidth,
          tileHeight: charTileHeight,
        },
        {
          id: "npc1",
          sprite: npcSprite1,
          walkingAnimationMapping: 3,
          startPosition: {x: 5, y: 10},
          speed: 2,
          tileWidth: charTileWidth,
          tileHeight: charTileHeight,
        },
      ],
    };

    this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
    this.gridEngine.moveTo("npc0", {x: 15, y: 18});
    this.gridEngine.moveTo("npc1", {x: 15, y: 21});
    this.gridEngine.positionChangeStarted().subscribe(({enterTile, exitTile}) => {
      for (let i=0; i<charTileHeight; i++) {
        for (let j=0; j<charTileWidth; j++) {
          tintTile(cloudCityTilemap, exitTile.y+i, exitTile.x+j, 0xff7a4a);
        }
      }
      for (let i=0; i<charTileHeight; i++) {
        for (let j=0; j<charTileWidth; j++) {
          tintTile(cloudCityTilemap, enterTile.y+i, enterTile.x+j, 0x6eff94);
        }
      }
    });
    this.gridEngine.positionChangeFinished().subscribe(({exitTile, enterTile}) => {
      for (let i=0; i<charTileHeight; i++) {
        for (let j=0; j<charTileWidth; j++) {
          tintTile(cloudCityTilemap, exitTile.y+i, exitTile.x+j, 0xffffff);
        }
      }
      for (let i=0; i<charTileHeight; i++) {
        for (let j=0; j<charTileWidth; j++) {
          tintTile(cloudCityTilemap, enterTile.y+i, enterTile.x+j, 0xff7a4a);
        }
      }
    });
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
  const charTileWidth = 2;
  const charTileHeight = 2;
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

  tintTile(cloudCityTilemap, 18, 15, 0xff7a4a);
  tintTile(cloudCityTilemap, 21, 15, 0x6eff94);

  const npcSprite = this.add.sprite(0, 0, "player");
  npcSprite.scale = 1.5;

  const npcSprite1 = this.add.sprite(0, 0, "player");
  npcSprite1.scale = 1.5;

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 7, y: 8 },
        tileWidth: charTileWidth,
        tileHeight: charTileHeight,
      },
      {
        id: "npc0",
        sprite: npcSprite,
        walkingAnimationMapping: 0,
        startPosition: { x: 12, y: 4 },
        speed: 3,
        tileWidth: charTileWidth,
        tileHeight: charTileHeight,
      },
      {
        id: "npc1",
        sprite: npcSprite1,
        walkingAnimationMapping: 3,
        startPosition: { x: 5, y: 10 },
        speed: 2,
        tileWidth: charTileWidth,
        tileHeight: charTileHeight,
      },
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  this.gridEngine.moveTo("npc0", { x: 15, y: 18 });
  this.gridEngine.moveTo("npc1", { x: 15, y: 21 });
  this.gridEngine
    .positionChangeStarted()
    .subscribe(({ enterTile, exitTile }) => {
      for (let i = 0; i < charTileHeight; i++) {
        for (let j = 0; j < charTileWidth; j++) {
          tintTile(cloudCityTilemap, exitTile.y + i, exitTile.x + j, 0xff7a4a);
        }
      }
      for (let i = 0; i < charTileHeight; i++) {
        for (let j = 0; j < charTileWidth; j++) {
          tintTile(
            cloudCityTilemap,
            enterTile.y + i,
            enterTile.x + j,
            0x6eff94
          );
        }
      }
    });
  this.gridEngine
    .positionChangeFinished()
    .subscribe(({ exitTile, enterTile }) => {
      for (let i = 0; i < charTileHeight; i++) {
        for (let j = 0; j < charTileWidth; j++) {
          tintTile(cloudCityTilemap, exitTile.y + i, exitTile.x + j, 0xffffff);
        }
      }
      for (let i = 0; i < charTileHeight; i++) {
        for (let j = 0; j < charTileWidth; j++) {
          tintTile(
            cloudCityTilemap,
            enterTile.y + i,
            enterTile.x + j,
            0xff7a4a
          );
        }
      }
    });
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

function tintTile(tilemap, row, col, color) {
  for (let i = 0; i < tilemap.layers.length; i++) {
    tilemap.layers[i].tilemapLayer.layer.data[row][col].tint = color;
  }
}
```
