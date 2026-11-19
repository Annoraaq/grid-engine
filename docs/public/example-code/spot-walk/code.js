const game = new Phaser.Game(config(preload, create, update));

let cursors;

function preload() {
  this.load.image("tiles", "../../assets/cloud_tileset.png");
  this.load.tilemapTiledJSON(
    "cloud-city-map",
    "../../assets/cloud_city.json",
  );
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
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(
    -playerSprite.width,
    -playerSprite.height,
  );

  const npcs = [
    { id: "npc1", speed: 1, x: 12, y: 12, mapping: 0, dir: "down" },
    { id: "npc2", speed: 2, x: 13, y: 12, mapping: 1, dir: "left" },
    { id: "npc3", speed: 4, x: 15, y: 12, mapping: 2, dir: "right" },
    { id: "npc4", speed: 8, x: 16, y: 12, mapping: 3, dir: "up" },
  ];

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 14, y: 10 },
        speed: 4,
        spotWalk: true,
      },
      ...npcs.map((npc) => {
        const sprite = this.add.sprite(0, 0, "player");
        sprite.scale = 1.5;
        return {
          id: npc.id,
          sprite,
          walkingAnimationMapping: npc.mapping,
          startPosition: { x: npc.x, y: npc.y },
          facingDirection: npc.dir,
          speed: npc.speed,
          spotWalk: true,
        };
      }),
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on("keydown-SPACE", () => {
    const enabled = this.gridEngine.isSpotWalking("player");
    this.gridEngine.setSpotWalk("player", !enabled);
  });
}

function update() {
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
