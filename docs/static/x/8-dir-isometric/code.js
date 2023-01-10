const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/iso_tile.png");
  this.load.tilemapTiledJSON("iso-map", "../../assets/isometric.json");
  this.load.spritesheet("player", "../../assets/iso_char.png", {
    frameWidth: 15,
    frameHeight: 32,
  });
}

function create() {
  const cloudCityTilemap = this.make.tilemap({ key: "iso-map" });
  cloudCityTilemap.addTilesetImage("iso-tileset", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "iso-tileset", 0, 0);
    layer.scale = 3;
  }

  const sprites = {
    "player": this.add.sprite(0, 0, "player"),
    "npc0": this.add.sprite(0, 0, "player"),
    "npc1": this.add.sprite(0, 0, "player"),
    "npc2": this.add.sprite(0, 0, "player"),
  };

  Object.entries(sprites).forEach(([_key, sprite]) => sprite.scale = 3);
  this.cameras.main.startFollow(sprites["player"], true);
  this.cameras.main.setFollowOffset(
    -sprites["player"].width,
    -sprites["player"].height
  );

  createPlayerAnimation.call(this, "up", 21, 24);
  createPlayerAnimation.call(this, "up-left", 16, 19);
  createPlayerAnimation.call(this, "left", 11, 14);
  createPlayerAnimation.call(this, "down-left", 6, 9);
  createPlayerAnimation.call(this, "down", 1, 4);
  createPlayerAnimation.call(this, "down-right", 36, 39);
  createPlayerAnimation.call(this, "right", 31, 34);
  createPlayerAnimation.call(this, "up-right", 26, 29);


  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: sprites["player"],
        startPosition: { x: 3, y: 4 },
        offsetY: -9,
        speed: 2
      },
      {
        id: "npc0",
        sprite: sprites["npc0"],
        offsetY: -9,
        startPosition: { x: 5, y: 5 },
        speed: 3
      },
      {
        id: "npc1",
        sprite: sprites["npc1"],
        offsetY: -9,
        startPosition: { x: 10, y: 10 },
      },
      {
        id: "npc2",
        sprite: sprites["npc2"],
        offsetY: -9,
        startPosition: { x: 5, y: 10 },
        speed: 2
      },
    ],
    numberOfDirections: 8
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  this.gridEngine.moveRandomly('npc0');
  this.gridEngine.moveRandomly('npc1', 500);
  this.gridEngine.moveRandomly('npc2', 1500);
  this.gridEngine
    .movementStarted()
    .subscribe(({ charId, direction }) => {
      sprites[charId].anims.play(direction);
    });

  this.gridEngine
    .movementStopped()
    .subscribe(({ charId, direction }) => {
      sprites[charId].anims.stop();
      sprites[charId].setFrame(getStopFrame(direction));
    });

  this.gridEngine
    .directionChanged()
    .subscribe(({ charId, direction }) => {
      sprites[charId].setFrame(getStopFrame(direction));
    });
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown && cursors.up.isDown) {
    this.gridEngine.move("player", "up-left");
  } else if (cursors.left.isDown && cursors.down.isDown) {
    this.gridEngine.move("player", "down-left");
  } else if (cursors.right.isDown && cursors.up.isDown) {
    this.gridEngine.move("player", "up-right");
  } else if (cursors.right.isDown && cursors.down.isDown) {
    this.gridEngine.move("player", "down-right");
  } else if (cursors.left.isDown) {
    this.gridEngine.move("player", "left");
  } else if (cursors.right.isDown) {
    this.gridEngine.move("player", "right");
  } else if (cursors.up.isDown) {
    this.gridEngine.move("player", "up");
  } else if (cursors.down.isDown) {
    this.gridEngine.move("player", "down");
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
      return 20;
    case "up-left":
      return 15;
    case "up-right":
      return 25;
    case "right":
      return 30;
    case "down":
      return 0;
    case "down-left":
      return 5;
    case "down-right":
      return 35;
    case "left":
      return 10;
  }
}
