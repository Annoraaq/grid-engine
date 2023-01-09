const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/tf_jungle_tileset.png");
  this.load.tilemapTiledJSON("jungle", "../../assets/jungle-small.json");
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
  const [playerSprite, container] = createSpriteWithContainer.call(
    this,
    ['cg1', 'cg2']
  );
  const [npc1Sprite, npc1Container] = createSpriteWithContainer.call(
    this,
    ['cg1']
  );
  const [npc2Sprite, npc2Container] = createSpriteWithContainer.call(
    this,
    ['cg2']
  );
  const [npc3Sprite, npc3Container] = createSpriteWithContainer.call(this, []);

  this.cameras.main.startFollow(container, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 8, y: 12 },
        container: container,
        collides: {
          collisionGroups: ['cg1', 'cg2']
        }
      },
      {
        id: "npc1",
        sprite: npc1Sprite,
        walkingAnimationMapping: 1,
        startPosition: { x: 10, y: 12 },
        container: npc1Container,
        collides: {
          collisionGroups: ['cg1']
        }
      },
      {
        id: "npc2",
        sprite: npc2Sprite,
        walkingAnimationMapping: 2,
        startPosition: { x: 12, y: 12 },
        container: npc2Container,
        collides: {
          collisionGroups: ['cg2']
        }
      },
      {
        id: "npc3",
        sprite: npc3Sprite,
        walkingAnimationMapping: 3,
        startPosition: { x: 14, y: 12 },
        container: npc3Container,
        collides: {
          collisionGroups: []
        }
      },
    ],
  };

  this.gridEngine.create(jungleTilemap, gridEngineConfig);
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

function createSpriteWithContainer(collisionGroups) {
  const text = this.add.text(-10, -20, `${JSON.stringify(collisionGroups)}`);
  const sprite = this.add.sprite(0, 0, "player").setScale(1.5);
  const container = this.add.container(0, 0, [sprite, text]);
  return [sprite, container];
}
