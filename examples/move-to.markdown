---
layout: default
title: Move To
parent: Examples
---

# Move Character To
**Press the arrow keys to move.** This demo demonstrates how you can command characters (including the player) to move to the desired tile, and they will pathfind the shortest route to their destination. Follow the NPCs to their destination!

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/pgmp.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
    const config = getBasicConfig(preload, create, update);
    var game = new Phaser.Game(config);

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
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.roundPixels = true;

        tintTile(cloudCityTilemap, 18, 15, 0xff7a4a);
        tintTile(cloudCityTilemap, 19, 15, 0xffcc4a);
        tintTile(cloudCityTilemap, 20, 15, 0x6eff94);

        const npcSprite = this.add.sprite(0, 0, "player");
        npcSprite.scale = 1.5;

        const npcSprite1 = this.add.sprite(0, 0, "player");
        npcSprite1.scale = 1.5;

        const npcSprite2 = this.add.sprite(0, 0, "player");
        npcSprite2.scale = 1.5;

        const gridMovementConfig = {
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
        };

        this.gridMovementPlugin.create(cloudCityTilemap, gridMovementConfig);
        this.gridMovementPlugin.moveTo('npc0', new Phaser.Math.Vector2(15, 18));
        this.gridMovementPlugin.moveTo('npc1', new Phaser.Math.Vector2(15, 19));
        this.gridMovementPlugin.moveTo('npc2', new Phaser.Math.Vector2(15, 20));
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

    function tintTile(tilemap, row, col, color) {
        for (let i = 0; i < tilemap.layers.length; i++) {
            tilemap.layers[i].tilemapLayer.layer.data[row][col].tint = color;
        }
    }
</script>

## The Code
```javascript
// Your game config
var game = new Phaser.Game(config);

function preload () {
    this.load.image("tiles", "../assets/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "../assets/cloud_city_large.json");
    this.load.spritesheet("player", "../assets/characters.png", {
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
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;

    tintTile(cloudCityTilemap, 18, 15, 0xff7a4a);
    tintTile(cloudCityTilemap, 19, 15, 0xffcc4a);
    tintTile(cloudCityTilemap, 20, 15, 0x6eff94);

    const npcSprite = this.add.sprite(0, 0, "player");
    npcSprite.scale = 1.5;

    const npcSprite1 = this.add.sprite(0, 0, "player");
    npcSprite1.scale = 1.5;

    const npcSprite2 = this.add.sprite(0, 0, "player");
    npcSprite2.scale = 1.5;

    const gridMovementConfig = {
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
    };

    this.gridMovementPlugin.create(cloudCityTilemap, gridMovementConfig);
    this.gridMovementPlugin.moveTo('npc0', new Phaser.Math.Vector2(15, 18));
    this.gridMovementPlugin.moveTo('npc1', new Phaser.Math.Vector2(15, 19));
    this.gridMovementPlugin.moveTo('npc2', new Phaser.Math.Vector2(15, 20));
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

function tintTile(tilemap, row, col, color) {
    for (let i = 0; i < tilemap.layers.length; i++) {
        tilemap.layers[i].tilemapLayer.layer.data[row][col].tint = color;
    }
}
```