const game = new Phaser.Game(config(preload, create, update));

const TILE_SIZE = 48; // 16px * scale 3

let cursors;
let facingHighlight;

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

  const npcSprite = this.add.sprite(0, 0, "player");
  npcSprite.scale = 1.5;

  facingHighlight = this.add
    .rectangle(0, 0, TILE_SIZE, TILE_SIZE)
    .setOrigin(0, 0)
    .setStrokeStyle(3, 0xfacc15, 0.9)
    .setFillStyle(0xfacc15, 0.15)
    .setDepth(1000);

  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(
    -playerSprite.width,
    -playerSprite.height,
  );

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 14, y: 10 },
        facingDirection: "down",
        fixedFacing: true,
        speed: 4,
      },
      {
        id: "npc",
        sprite: npcSprite,
        walkingAnimationMapping: 0,
        startPosition: { x: 12, y: 12 },
        facingDirection: "down",
        fixedFacing: true,
        speed: 3,
      },
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

  const patrolPoints = [
    { x: 16, y: 12 },
    { x: 12, y: 12 },
  ];
  let idx = 0;
  const moveNext = () => {
    this.gridEngine.moveTo("npc", patrolPoints[idx]).subscribe(() => {
      idx = (idx + 1) % patrolPoints.length;
      moveNext();
    });
  };
  moveNext();

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on("keydown-SPACE", () => {
    const enabled = this.gridEngine.isFixedFacing("player");
    this.gridEngine.setFixedFacing("player", !enabled);
  });
  this.input.keyboard.on("keydown-W", () => {
    this.gridEngine.turnTowards("player", "up");
  });
  this.input.keyboard.on("keydown-S", () => {
    this.gridEngine.turnTowards("player", "down");
  });
  this.input.keyboard.on("keydown-A", () => {
    this.gridEngine.turnTowards("player", "left");
  });
  this.input.keyboard.on("keydown-D", () => {
    this.gridEngine.turnTowards("player", "right");
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

  const facingPos = this.gridEngine.getFacingPosition("player");
  facingHighlight.setPosition(
    facingPos.x * TILE_SIZE,
    facingPos.y * TILE_SIZE,
  );
}
