const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/tf_jungle_tileset.png");
  this.load.tilemapTiledJSON("jungle", "../../assets/jungle-chess.json");
  this.load.spritesheet("player", "../../assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const cloudCityTilemap = this.make.tilemap({ key: "jungle" });
  cloudCityTilemap.addTilesetImage("jungle", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "jungle", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.setFrame(55);
  playerSprite.scale = 1.5;
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const npcSprite = this.add.sprite(0, 0, "player");
  npcSprite.scale = 1.5;

  const npcSprite1 = this.add.sprite(0, 0, "player");
  npcSprite1.scale = 1.5;

  const npcSprite2 = this.add.sprite(0, 0, "player");
  npcSprite2.scale = 1.5;

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 8, y: 8 },
      },
      {
        id: "npc0",
        sprite: npcSprite,
        walkingAnimationMapping: 0,
        startPosition: { x: 5, y: 5 },
        speed: 3
      },
      {
        id: "npc1",
        sprite: npcSprite1,
        walkingAnimationMapping: 1,
        startPosition: { x: 10, y: 10 },
      },
      {
        id: "npc2",
        sprite: npcSprite2,
        walkingAnimationMapping: 3,
        startPosition: { x: 5, y: 10 },
        speed: 2
      },
    ],
    numberOfDirections: 8,

  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  this.gridEngine.moveRandomly('npc0');
  this.gridEngine.moveRandomly('npc1', 500);
  this.gridEngine.moveRandomly('npc2', 1500);

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
