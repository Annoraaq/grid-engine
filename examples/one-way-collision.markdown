---
layout: default
title: One-Way Collision
parent: Examples
---

# One-Way Collision
**Press the arrow keys to move.** This demo demonstrates tiles that collide only in one direction. This relies on setting the proper [Tile Properties](../usage/tile-properties) on your tilemaps.

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/pgmp.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
    const config = getBasicConfig(preload, create, update);
    var game = new Phaser.Game(config);

    function preload () {
        this.load.image("tiles", "assets/tf_jungle_tileset.png");
        this.load.tilemapTiledJSON("jungle", "assets/one-way.json");
        this.load.spritesheet("player", "assets/characters.png", {
            frameWidth: 52,
            frameHeight: 72,
        });
    }

    function create () {

        const jungleTilemap = this.make.tilemap({ key: "jungle" });
        jungleTilemap.addTilesetImage("jungle", "tiles");
        for (let i = 0; i < jungleTilemap.layers.length; i++) {
            const layer = jungleTilemap.createLayer(i, "jungle", 0, 0);
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
                    startPosition: new Phaser.Math.Vector2(16, 8),
                },
            ],
        };

        this.gridMovementPlugin.create(jungleTilemap, gridMovementConfig);

        const r1 = this.add.triangle(16 * 48 + 24, 9 * 48 + 24, 0, 0, 24, 0, 12, 24, 0xffffff);
        const r2 = this.add.triangle(16 * 48 + 24, 10 * 48 + 24, 0, 0, 24, 0, 12, 24, 0xffffff);
        const r3 = this.add.triangle(16 * 48 + 24, 11 * 48 + 24, 0, 0, 24, 0, 12, 24, 0xffffff);
        this.tweens.add({
                targets: [r1,r2,r3],
                alpha: 0.2,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
        });
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
    this.load.image("tiles", "assets/tf_jungle_tileset.png");
    this.load.tilemapTiledJSON("jungle", "assets/one-way.json");
    this.load.spritesheet("player", "assets/characters.png", {
        frameWidth: 52,
        frameHeight: 72,
    });
}

function create () {

    const jungleTilemap = this.make.tilemap({ key: "jungle" });
    jungleTilemap.addTilesetImage("jungle", "tiles");
    for (let i = 0; i < jungleTilemap.layers.length; i++) {
        const layer = jungleTilemap.createLayer(i, "jungle", 0, 0);
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
                startPosition: new Phaser.Math.Vector2(16, 8),
            },
        ],
    };

    this.gridMovementPlugin.create(jungleTilemap, gridMovementConfig);

    const r1 = this.add.triangle(16 * 48 + 24, 9 * 48 + 24, 0, 0, 24, 0, 12, 24, 0xffffff);
    const r2 = this.add.triangle(16 * 48 + 24, 10 * 48 + 24, 0, 0, 24, 0, 12, 24, 0xffffff);
    const r3 = this.add.triangle(16 * 48 + 24, 11 * 48 + 24, 0, 0, 24, 0, 12, 24, 0xffffff);
    this.tweens.add({
            targets: [r1,r2,r3],
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    });
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
