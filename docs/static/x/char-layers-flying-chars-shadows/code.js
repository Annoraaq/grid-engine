const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/tf_jungle_tileset.png");
  this.load.tilemapTiledJSON("jungle", "../../assets/jungle-char-layers.json");

  this.load.spritesheet("player", "../../assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });

  this.load.spritesheet("monster_bird", "../../assets/monster_bird1_with_shadow.png", {
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

  const monsterBirdSprites = createBirdSprites.call(this);
  const monsterBirdShadows = createShadowSprites.call(this);

  createBirdAnimation.call(this);

  this.anims.staggerPlay("bird", monsterBirdSprites, 100);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 4, y: 4 },
        charLayer: 'ground',
      },
      ...monsterBirdSprites.map((sprite, i) => ({
        id: "monster_bird_" + i,
        sprite,
        startPosition: { x: 7, y: 7 + i },
        speed: 5,
        charLayer: 'sky'
      })),
      ...monsterBirdShadows.map((sprite, i) => ({
        id: "monster_bird_shadow_" + i,
        sprite,
        startPosition: { x: 7, y: 7 + i },
        speed: 5,
        charLayer: 'ground',
        collides: false
      })),
    ],
  };

  this.gridEngine.create(tilemap, gridEngineConfig);

  for (let i = 0; i < 10; i++) {
    this.gridEngine.moveRandomly("monster_bird_" + i, 1000, 10);
  }

  this.gridEngine
    .positionChangeStarted()
    .subscribe(({ charId, exitTile, enterTile }) => {
      if (isBird(charId)) {
        this.gridEngine.moveTo('monster_bird_shadow_' + getBirdNum(charId), { x: enterTile.x, y: enterTile.y });
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

function getBirdNum(charId) {
  return +charId[charId.length - 1]
}

function isBird(charId) {
  return charId.startsWith('monster_bird_') && !charId.startsWith('monster_bird_shadow');
}

function createCroppedSprites(x, y, width, height) {
  const croppedSprites = [];
  for (let i = 0; i < 10; i++) {
    const monsterBirdSprite = this.add.sprite(0, 0, "monster_bird");
    monsterBirdSprite.setCrop(x, y, width, height);
    monsterBirdSprite.scale = 3;
    croppedSprites.push(monsterBirdSprite);
  }

  return croppedSprites;

}
function createBirdSprites() {
  return createCroppedSprites.call(this, 0, 0, 61, 47);
}

function createShadowSprites() {
  return createCroppedSprites.call(this, 22, 47, 16, 10);
}

function createBirdAnimation() {
  this.anims.create({
    key: "bird",
    frames: this.anims.generateFrameNumbers("monster_bird", {
      start: 0,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  });
}
