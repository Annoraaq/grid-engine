const game = new Phaser.Game(config(preload, create, update));

function preload() {
  this.load.image("tiles", "../../assets/cloud_tileset.png");
  this.load.tilemapTiledJSON("cloud-city-map", "../../assets/cloud_city_large.json");
  this.load.spritesheet("player", "../../assets/characters.png", {
    frameWidth: 52,
    frameHeight: 72,
  });
}

function create() {
  const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
  cloudCityTilemap.addTilesetImage("cloud_tileset", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "cloud_tileset", 0, 0);
    layer.scale = 3;
  }

  const playerSprite = this.add.sprite(0, 0, "player");
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
        startPosition: { x: 12, y: 5 },
        speed: 3,
      },
      {
        id: "npc1",
        sprite: npcSprite1,
        walkingAnimationMapping: 1,
        startPosition: { x: 14, y: 8 },
      },
      {
        id: "npc2",
        sprite: npcSprite2,
        walkingAnimationMapping: 3,
        startPosition: { x: 6, y: 8 },
        speed: 2,
      },
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

  this.gridEngine.moveRandomly("npc0", 0, 1);
  this.gridEngine.moveRandomly("npc1", 500, 2);
  this.gridEngine.moveRandomly("npc2", 1500, 3);

  tintRadius(cloudCityTilemap, 8, 6, 3, 0xffcc4a);
  tintRadius(cloudCityTilemap, 5, 12, 1, 0xff7a4a);
  tintRadius(cloudCityTilemap, 8, 14, 2, 0x6eff94);
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

function manhattanDist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function tintRadius(tilemap, posX, posY, radius, color) {
  for (let i = 0; i < tilemap.layers.length; i++) {
    for (let x = 0; x <= radius; x++) {
      for (let y = 0; y <= radius; y++) {
        if (manhattanDist(posX, posY, posX + x, posY + y) <= radius) {
          tilemap.layers[i].tilemapLayer.layer.data[posX + x][
            posY + y
          ].tint = color;
        }
        if (manhattanDist(posX, posY, posX - x, posY + y) <= radius) {
          tilemap.layers[i].tilemapLayer.layer.data[posX - x][
            posY + y
          ].tint = color;
        }
        if (manhattanDist(posX, posY, posX + x, posY - y) <= radius) {
          tilemap.layers[i].tilemapLayer.layer.data[posX + x][
            posY - y
          ].tint = color;
        }
        if (manhattanDist(posX, posY, posX - x, posY - y) <= radius) {
          tilemap.layers[i].tilemapLayer.layer.data[posX - x][
            posY - y
          ].tint = color;
        }
      }
    }
  }
}
