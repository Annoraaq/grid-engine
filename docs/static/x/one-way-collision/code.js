const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/tf_jungle_tileset.png");
  this.load.tilemapTiledJSON("jungle", "../../assets/one-way.json");
  this.load.spritesheet("player", "../../assets/characters.png", {
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
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 16, y: 8 },
      },
    ],
  };

  this.gridEngine.create(jungleTilemap, gridEngineConfig);

  const triangleArgs = [0, 0, 24, 0, 12, 24, 0xffffff];

  const r1 = this.add.triangle(
    16 * 48 + 24,
    9 * 48 + 24,
    ...triangleArgs
  );
  const r2 = this.add.triangle(
    16 * 48 + 24,
    10 * 48 + 24,
    ...triangleArgs
  );
  const r3 = this.add.triangle(
    16 * 48 + 24,
    11 * 48 + 24,
    ...triangleArgs
  );
  this.tweens.add({
    targets: [r1, r2, r3],
    alpha: 0.2,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut",
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
