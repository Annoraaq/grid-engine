const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/cloud_tileset.png");
  this.load.tilemapTiledJSON(
    "cloud-city-map",
    "../../assets/cloud_city_bridge_only.json",
  );

  this.load.spritesheet("player", "../../assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const tilemap = this.make.tilemap({ key: "cloud-city-map" });
  tilemap.addTilesetImage("cloud_tileset", "tiles");
  for (let i = 0; i < tilemap.layers.length; i++) {
    const layer = tilemap.createLayer(i, "cloud_tileset", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 5, y: 4 },
        charLayer: "ground",
      },
    ],
  };

  this.gridEngine.create(tilemap, gridEngineConfig);

  this.gridEngine.setTransition({ x: 5, y: 9 }, 'ground', 'bridge');
  this.gridEngine.setTransition({ x: 5, y: 10 }, 'bridge', 'ground');
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
