const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/tf_jungle_tileset.png");
  this.load.tilemapTiledJSON("jungle", "../../assets/jungle-char-layers.json");

  this.load.spritesheet("player", "../../assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });

  this.load.spritesheet("monster_bird", "../../assets/monster_bird1.png", {
    frameWidth: 61,
    frameHeight: 57,
  });
}

function create() {
  const tilemap = this.make.tilemap({ key: "jungle" });
  tilemap.addTilesetImage("jungle", "tiles");
  for (let i = 0; i < tilemap.layers.length; i++) {
    const layer = tilemap.createLayer(i, "jungle", 0, 0);
    layer.scale = 3;
  }
  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  this.anims.create({
    key: "bird_still",
    frames: this.anims.generateFrameNumbers("monster_bird", {
      start: 0,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  });

  const monsterBirdSprites = [];
  for (let i = 0; i < 10; i++) {
    const monsterBirdSprite = this.add.sprite(0, 0, "monster_bird");
    monsterBirdSprite.scale = 3;
    monsterBirdSprites.push(monsterBirdSprite);
  }

  this.anims.staggerPlay("bird_still", monsterBirdSprites, 100);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 4, y: 4 },
        charLayer: 'ground'
      },
      ...monsterBirdSprites.map((sprite, i) => ({
        id: "monster_bird_" + i,
        sprite,
        startPosition: { x: 7, y: 7 + i },
        speed: 5,
        charLayer: 'sky'
      })),
    ],
  };

  this.gridEngine.create(tilemap, gridEngineConfig);


  for (let i = 0; i < 10; i++) {
    this.gridEngine.moveRandomly("monster_bird_" + i, 1000, 10);
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
