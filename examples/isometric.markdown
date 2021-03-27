---
layout: default
title: Isometric
parent: Examples
---

# Basic Player Movement

**Press the arrow keys to move.** This is a basic demo of isometric maps. Only four directions are supported yet.

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/pgmp.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
    const config = getBasicConfig(preload, create, update);
    var game = new Phaser.Game(config);

    function preload () {
        this.load.image("tiles", "assets/iso_tile.png");
        this.load.tilemapTiledJSON("iso-map", "assets/isometric.json");
        this.load.spritesheet("player", "assets/iso_char.png", {
            frameWidth: 15,
            frameHeight: 32,
        });
    }

    function create () {
        const cloudCityTilemap = this.make.tilemap({ key: "iso-map" });
        cloudCityTilemap.addTilesetImage("iso-tileset", "tiles");
        for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
            const layer = cloudCityTilemap.createLayer(i, "iso-tileset", 0, 0);
            layer.scale = 3;
        }
        const playerSprite = this.add.sprite(0, 0, "player");
        playerSprite.scale = 3;
        this.cameras.main.startFollow(playerSprite, true);
        this.cameras.main.setFollowOffset(- (playerSprite.width), -(playerSprite.height));

        createPlayerAnimation.call(this, "up", 26, 29);
        createPlayerAnimation.call(this, "right", 36, 39);
        createPlayerAnimation.call(this, "down", 6, 9);
        createPlayerAnimation.call(this, "left", 16, 19);

        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    startPosition: new Phaser.Math.Vector2(0, 0),
                    offsetY: -9,
                    walkingAnimationEnabled: false,
                    speed: 2
                },
            ],
        };

        this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
        this.gridEngine
          .movementStarted()
          .subscribe(([_charId, direction]) => {
            playerSprite.anims.play(direction);
          });

        this.gridEngine
          .movementStopped()
          .subscribe(([_charId, direction]) => {
            playerSprite.anims.stop();
            playerSprite.setFrame(getStopFrame(direction));
          });

        this.gridEngine
          .directionChanged()
          .subscribe(([_charId, direction]) => {
            playerSprite.setFrame(getStopFrame(direction));
          });
    }

    function update () {
        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.gridEngine.moveLeft("player");
        } else if (cursors.right.isDown) {
            this.gridEngine.moveRight("player");
        } else if (cursors.up.isDown) {
            this.gridEngine.moveUp("player");
        } else if (cursors.down.isDown) {
            this.gridEngine.moveDown("player");
        }
    }

    function createPlayerAnimation(name, startFrame, endFrame) {
      this.anims.create({
        key: name,
        frames: this.anims.generateFrameNumbers("player", {
          start: startFrame,
          end: endFrame,
        }),
        frameRate: 5,
        repeat: -1,
        yoyo: false,
      });
    }

    function getStopFrame(direction) {
      switch (direction) {
        case "up":
          return 25;
        case "right":
          return 35;
        case "down":
          return 5;
        case "left":
          return 15;
      }
    }
</script>

## The Code

```javascript
// Your game config
var game = new Phaser.Game(config);

function preload () {
    this.load.image("tiles", "assets/iso_tile.png");
    this.load.tilemapTiledJSON("iso-map", "assets/isometric.json");
    this.load.spritesheet("player", "assets/iso_char.png", {
        frameWidth: 15,
        frameHeight: 32,
    });
}

function create () {
    const cloudCityTilemap = this.make.tilemap({ key: "iso-map" });
    cloudCityTilemap.addTilesetImage("iso-tileset", "tiles");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
        const layer = cloudCityTilemap.createLayer(i, "iso-tileset", 0, 0);
        layer.scale = 3;
    }
    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.scale = 3;
    this.cameras.main.startFollow(playerSprite, true);
    this.cameras.main.setFollowOffset(- (playerSprite.width), -(playerSprite.height));

    createPlayerAnimation.call(this, "up", 26, 29);
    createPlayerAnimation.call(this, "right", 36, 39);
    createPlayerAnimation.call(this, "down", 6, 9);
    createPlayerAnimation.call(this, "left", 16, 19);

    const gridEngineConfig = {
        characters: [
            {
                id: "player",
                sprite: playerSprite,
                startPosition: new Phaser.Math.Vector2(0, 0),
                offsetY: -9,
                walkingAnimationEnabled: false,
                speed: 2
            },
        ],
    };

    this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
    this.gridEngine
      .movementStarted()
      .subscribe(([_charId, direction]) => {
        playerSprite.anims.play(direction);
      });

    this.gridEngine
      .movementStopped()
      .subscribe(([_charId, direction]) => {
        playerSprite.anims.stop();
        playerSprite.setFrame(getStopFrame(direction));
      });

    this.gridEngine
      .directionChanged()
      .subscribe(([_charId, direction]) => {
        playerSprite.setFrame(getStopFrame(direction));
      });
}

function update () {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        this.gridEngine.moveLeft("player");
    } else if (cursors.right.isDown) {
        this.gridEngine.moveRight("player");
    } else if (cursors.up.isDown) {
        this.gridEngine.moveUp("player");
    } else if (cursors.down.isDown) {
        this.gridEngine.moveDown("player");
    }
}

function createPlayerAnimation(name, startFrame, endFrame) {
  this.anims.create({
    key: name,
    frames: this.anims.generateFrameNumbers("player", {
      start: startFrame,
      end: endFrame,
    }),
    frameRate: 5,
    repeat: -1,
    yoyo: false,
  });
}

function getStopFrame(direction) {
  switch (direction) {
    case "up":
      return 25;
    case "right":
      return 35;
    case "down":
      return 5;
    case "left":
      return 15;
  }
}
```
