---
layout: default
title: Custom Walking Animation
parent: Examples
---

# Custom Walking Animation

**Press the arrow keys to move.** This demo shows how you can change the parameters of the walking animations for your character spritesheets.

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
            const layer = cloudCityTilemap.createStaticLayer(i, "Cloud City", 0, 0);
            layer.scale = 3;
        }
        const playerSprite = this.add.sprite(0, 0, "player");
        playerSprite.scale = 1.5;
        playerSprite.setFrame(getStopFrame('down'));
        this.cameras.main.startFollow(playerSprite, true);
        this.cameras.main.setFollowOffset(- (playerSprite.width), -(playerSprite.height));

        createPlayerAnimation.call(this, 'up', 90, 92);
        createPlayerAnimation.call(this, 'right', 78, 80);
        createPlayerAnimation.call(this, 'down', 54, 56);
        createPlayerAnimation.call(this, 'left', 66, 68);

        const gridMovementConfig = {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationEnabled: false,
                    startPosition: new Phaser.Math.Vector2(8, 8),
                },
            ],
            firstLayerAboveChar: 3,
        };

        this.gridMovementPlugin.create(cloudCityTilemap, gridMovementConfig);
        this.gridMovementPlugin.movementStarted().subscribe(([_charId, direction]) => {
            playerSprite.anims.play(direction);
        });

        this.gridMovementPlugin.movementStopped().subscribe(([_charId, direction]) => {
            playerSprite.anims.stop();
            playerSprite.setFrame(getStopFrame(direction));
        });

        this.gridMovementPlugin.directionChanged().subscribe(([_charId, direction]) => {
            playerSprite.setFrame(getStopFrame(direction));
        });
    }

    function createPlayerAnimation(
        name,
        startFrame,
        endFrame,
    ) {
        this.anims.create({
            key: name,
            frames: this.anims.generateFrameNumbers("player", {
                start: startFrame,
                end: endFrame,
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        });
    }

    function getStopFrame(direction) {
        switch (direction) {
            case 'up':
                return 91;
            case 'right':
                return 79;
            case 'down':
                return 55;
            case 'left':
                return 67;
        }
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
    const layer = cloudCityTilemap.createStaticLayer(i, "Cloud City", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
  playerSprite.setFrame(getStopFrame("down"));
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(- (playerSprite.width), -(playerSprite.height));

  createPlayerAnimation.call(this, "up", 90, 92);
  createPlayerAnimation.call(this, "right", 78, 80);
  createPlayerAnimation.call(this, "down", 54, 56);
  createPlayerAnimation.call(this, "left", 66, 68);

  const gridMovementConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationEnabled: false,
        startPosition: new Phaser.Math.Vector2(8, 8),
      },
    ],
    firstLayerAboveChar: 3,
  };

  this.gridMovementPlugin.create(cloudCityTilemap, gridMovementConfig);
  this.gridMovementPlugin
    .movementStarted()
    .subscribe(([_charId, direction]) => {
      playerSprite.anims.play(direction);
    });

  this.gridMovementPlugin
    .movementStopped()
    .subscribe(([_charId, direction]) => {
      playerSprite.anims.stop();
      playerSprite.setFrame(getStopFrame(direction));
    });

  this.gridMovementPlugin
    .directionChanged()
    .subscribe(([_charId, direction]) => {
      playerSprite.setFrame(getStopFrame(direction));
    });
}

function createPlayerAnimation(name, startFrame, endFrame) {
  this.anims.create({
    key: name,
    frames: this.anims.generateFrameNumbers("player", {
      start: startFrame,
      end: endFrame,
    }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  });
}

function getStopFrame(direction) {
  switch (direction) {
    case "up":
      return 91;
    case "right":
      return 79;
    case "down":
      return 55;
    case "left":
      return 67;
  }
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
