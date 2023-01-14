const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/cloud_tileset.png");
  this.load.tilemapTiledJSON("cloud-city-map", "../../assets/cloud_city.json");
  this.load.spritesheet("player", "../../assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
  cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
  playerSprite.setFrame(getStopFrame('down'));
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  createPlayerAnimation.call(this, 'up', 90, 92);
  createPlayerAnimation.call(this, 'right', 78, 80);
  createPlayerAnimation.call(this, 'down', 54, 56);
  createPlayerAnimation.call(this, 'left', 66, 68);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        startPosition: { x: 8, y: 8 },
      },
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  this.gridEngine.movementStarted().subscribe(({ direction }) => {
    playerSprite.anims.play(direction);
  });

  this.gridEngine.movementStopped().subscribe(({ direction }) => {
    playerSprite.anims.stop();
    playerSprite.setFrame(getStopFrame(direction));
  });

  this.gridEngine.directionChanged().subscribe(({ direction }) => {
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
