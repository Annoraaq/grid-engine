---
layout: default
title: Position Changed
parent: Examples
---

# Position Changed Observable

**Press the arrow keys to move.** This demo demonstrates how to use the `positionChanged` observable on the tilemap, allowing you to track where the characters have moved to, and further allowing you to add custom features to various tiles if you wish. This demo also uses the [Phaser Containers](phaser-container) feature.

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/grid-engine-2.24.0.min.js"></script>
<script src="js/getBasicConfig.js"></script>

<script>
  const config = getBasicConfig(preload, create, update);
  const game = new Phaser.Game(config);

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

    const positionChangeText = this.add.text(-20, -110, "");
    const positionChangeFinishedText = this.add.text(-20, -50, "");

    const container = this.add.container(0, 0, [
      playerSprite,
      positionChangeText,
      positionChangeFinishedText,
    ]);

    this.cameras.main.startFollow(container, true);
    this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 6,
          startPosition: {x: 8, y: 12},
          container,
        },
      ],
    };

    const shopText = this.add.text(
      6 * 48,
      10 * 48,
      "You are standing on a special tile!",
      { fontSize: 25 }
    );
    shopText.setVisible(false);
    shopText.depth = 3000;

    const hint = this.add.text(7 * 48, 14 * 48, "Step on the colored tile", {
      fontSize: 25,
    });
    hint.depth = 3000;

    tintTile(jungleTilemap, 13, 11, 0x6eff94);

    this.gridEngine.create(jungleTilemap, gridEngineConfig);

    this.gridEngine
      .positionChangeStarted()
      .subscribe(({ charId, exitTile, enterTile }) => {
        positionChangeText.text =
          `positionChangeStarted:\n exit: (${exitTile.x}, ${exitTile.y})\n` +
          `enter: (${enterTile.x}, ${enterTile.y})`;
      });

    this.gridEngine
      .positionChangeFinished()
      .subscribe(({ charId, exitTile, enterTile }) => {
        positionChangeFinishedText.text =
          `positionChangeFinished:\n exit: (${exitTile.x}, ${exitTile.y})\n` +
          `enter: (${enterTile.x}, ${enterTile.y})`;

        if (hasTrigger(jungleTilemap, enterTile)) {
          shopText.setVisible(true);
        }
        if (hasTrigger(jungleTilemap, exitTile)) {
          shopText.setVisible(false);
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

  function hasTrigger(tilemap, position) {
    return tilemap.layers.some((layer) => {
      const tile = tilemap.getTileAt(position.x, position.y, false, layer.name);
      return tile?.properties?.trigger;
    });
  }

</script>

## The Code

```javascript
// Your game config
const config = getBasicConfig(preload, create, update);
const game = new Phaser.Game(config);

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

  const positionChangeText = this.add.text(-20, -110, "");
  const positionChangeFinishedText = this.add.text(-20, -50, "");

  const container = this.add.container(0, 0, [
    playerSprite,
    positionChangeText,
    positionChangeFinishedText,
  ]);

  this.cameras.main.startFollow(container, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 8, y: 12 },
        container,
      },
    ],
  };

  const shopText = this.add.text(
    6 * 48,
    10 * 48,
    "You are standing on a special tile!",
    { fontSize: 25 }
  );
  shopText.setVisible(false);
  shopText.depth = 3000;

  const hint = this.add.text(7 * 48, 14 * 48, "Step on the colored tile", {
    fontSize: 25,
  });
  hint.depth = 3000;

  tintTile(jungleTilemap, 13, 11, 0x6eff94);

  this.gridEngine.create(jungleTilemap, gridEngineConfig);

  this.gridEngine
    .positionChangeStarted()
    .subscribe(({ charId, exitTile, enterTile }) => {
      positionChangeText.text =
        `positionChangeStarted:\n exit: (${exitTile.x}, ${exitTile.y})\n` +
        `enter: (${enterTile.x}, ${enterTile.y})`;
    });

  this.gridEngine
    .positionChangeFinished()
    .subscribe(({ charId, exitTile, enterTile }) => {
      positionChangeFinishedText.text =
        `positionChangeFinished:\n exit: (${exitTile.x}, ${exitTile.y})\n` +
        `enter: (${enterTile.x}, ${enterTile.y})`;

      if (hasTrigger(jungleTilemap, enterTile)) {
        shopText.setVisible(true);
      }
      if (hasTrigger(jungleTilemap, exitTile)) {
        shopText.setVisible(false);
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

function hasTrigger(tilemap, position) {
  return tilemap.layers.some((layer) => {
    const tile = tilemap.getTileAt(position.x, position.y, false, layer.name);
    return tile?.properties?.trigger;
  });
}
```
