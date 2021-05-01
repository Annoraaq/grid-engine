---
layout: default
title: Facing Direction
parent: Examples
---

# Facing Direction Observable

**Press the arrow keys to move.** This demo demonstrates how to use the `facingDirection` observable on a character, allowing you to know when a character is facing a certain direction. This demo also uses the [Phaser Containers](phaser-container) feature.

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/grid-engine-1.14.0.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
  const config = getBasicConfig(preload, create, update);
  const game = new Phaser.Game(config);
  let facingDirectionText;

  function preload () {
    this.load.image("tiles", "assets/tf_jungle_tileset.png");
    this.load.tilemapTiledJSON("jungle", "assets/jungle-small.json");
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

    facingDirectionText = this.add.text(-60, -10, '');

    const container = this.add.container(0, 0, [ playerSprite, facingDirectionText]);

    this.cameras.main.startFollow(container, true);
    this.cameras.main.setFollowOffset(- (playerSprite.width), -(playerSprite.height));

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 6,
          startPosition: new Phaser.Math.Vector2(8, 12),
          container
        },
      ],
    };

    this.gridEngine.create(jungleTilemap, gridEngineConfig);
    this.gridEngine.turnTowards("player", 'left');
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

    facingDirectionText.text = `facingDirection: ${this.gridEngine.getFacingDirection('player')}`;
  }
</script>

## The Code

```javascript
// Your game config
const game = new Phaser.Game(config);
let facingDirectionText;

function preload() {
  this.load.image("tiles", "assets/tf_jungle_tileset.png");
  this.load.tilemapTiledJSON("jungle", "assets/jungle-small.json");
  this.load.spritesheet("player", "assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const jungleTilemap = this.make.tilemap({ key: "jungle" });
  jungleTilemap.addTilesetImage("jungle", "tiles");
  for (let i = 0; i < jungleTilemap.layers.length; i++) {
    const layer = jungleTilemap.createLayer(i, "jungle", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;

  facingDirectionText = this.add.text(-60, -10, "");

  const container = this.add.container(0, 0, [
    playerSprite,
    facingDirectionText,
  ]);

  this.cameras.main.startFollow(container, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: new Phaser.Math.Vector2(8, 12),
        container,
      },
    ],
  };

  this.gridEngine.create(jungleTilemap, gridEngineConfig);
  this.gridEngine.turnTowards("player", "left");
}

function update() {
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

  facingDirectionText.text = `facingDirection: ${this.gridEngine.getFacingDirection(
    "player"
  )}`;
}
```
