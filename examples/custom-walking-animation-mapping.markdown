---
layout: default
title: Custom Walking Animation Mapping
parent: Examples
---

# Custom Walking Animation Mapping
**Press the arrow keys to move.** This demo shows how you can change the mapping of the frames for your character's walking animations.

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
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.roundPixels = true;

        const gridMovementConfig = {
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
                    startPosition: new Phaser.Math.Vector2(8, 8),
                },
            ],
            firstLayerAboveChar: 3,
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
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;

    const gridMovementConfig = {
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
                startPosition: new Phaser.Math.Vector2(8, 8),
            },
        ],
        firstLayerAboveChar: 3,
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
```
