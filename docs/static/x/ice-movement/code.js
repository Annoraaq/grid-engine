const game = new Phaser.Game(config(preload, create, update));

let slidingDirection = 'none';

function preload() {
  this.load.image("tiles", "../../assets/tf_winter_terrain.png");
  this.load.tilemapTiledJSON("ice-movement-map", "../../assets/ice-movement.json");

  this.load.spritesheet("player", "../../assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const tilemap = createTilemap.call(this);
  const playerSprite = createPlayerSprite.call(this);

  setupCamera.call(this, playerSprite);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 5, y: 5 },
      },
    ],
  };

  this.gridEngine.create(tilemap, gridEngineConfig);

  this.gridEngine
    .positionChangeStarted()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (isIceTile(enterTile.x, enterTile.y)) {
        startSliding(
          this.gridEngine,
          playerSprite,
          getDirection(enterTile, exitTile),
        );
      } else {
        stopSliding(this.gridEngine, playerSprite);
      }
    });

  this.gridEngine
    .movementStopped()
    .subscribe(({ charId, direction }) => {
      stopSliding(this.gridEngine, playerSprite);
    });
}

function update() {
  if (slidingDirection !== 'none') {
    this.gridEngine.move("player", slidingDirection);
    return;
  }
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

function startSliding(gridEngine, playerSprite, direction) {
  gridEngine.setWalkingAnimationMapping('player', undefined);
  slidingDirection = direction;
  playerSprite.anims.play('spin', true);
}

function stopSliding(gridEngine, playerSprite) {
  gridEngine.setWalkingAnimationMapping('player', 6);
  playerSprite.anims.stop();
  slidingDirection = 'none';
}

function isIceTile(x, y) {
  return x >= 4 && x <= 7 && y >= 6 && y <= 11;
}

function getDirection(fromPos, toPos) {
  if (fromPos.x < toPos.x) {
    return 'left';
  } else if (fromPos.x > toPos.x) {
    return 'right';
  } else if (fromPos.y < toPos.y) {
    return 'up';
  } else if (fromPos.y > toPos.y) {
    return 'down';
  }
  return 'none';
}

function setupCamera(playerSprite) {
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);
}

function createPlayerSprite() {
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;

  this.anims.create({
    key: 'spin',
    frames:
      this.anims.generateFrameNumbers("player", {
        frames:
          [91, 79, 55, 67],
      }),
    frameRate: 7,
    repeat: -1,
    yoyo: false,
  });

  return playerSprite;
}

function createTilemap() {
  const tilemap = this.make.tilemap({ key: "ice-movement-map" });
  tilemap.addTilesetImage("tf-winter-terrain", "tiles");
  for (let i = 0; i < tilemap.layers.length; i++) {
    const layer = tilemap.createLayer(i, "tf-winter-terrain", 0, 0);
    layer.scale = 3;
  }

  return tilemap;
}
