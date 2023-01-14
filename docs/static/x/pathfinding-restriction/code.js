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

  tintTile(cloudCityTilemap, 18, 15, 0xff7a4a);

  const npcSprite = this.add.sprite(0, 0, "player");
  npcSprite.scale = 1.5;

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
        speed: 3
      },
    ],
  };

  const restrictedArea = new Set();
  restrictedArea.add('12#5');
  restrictedArea.add('11#5');
  restrictedArea.add('10#5');
  restrictedArea.add('9#5');
  restrictedArea.add('8#5');
  restrictedArea.add('7#5');
  restrictedArea.add('7#6');
  restrictedArea.add('7#7');
  restrictedArea.add('7#8');
  restrictedArea.add('7#9');
  restrictedArea.add('7#10');
  restrictedArea.add('7#11');
  restrictedArea.add('7#12');
  restrictedArea.add('7#13');
  restrictedArea.add('7#14');
  restrictedArea.add('7#15');
  restrictedArea.add('7#16');
  restrictedArea.add('7#17');
  restrictedArea.add('7#18');
  restrictedArea.add('8#18');
  restrictedArea.add('9#18');
  restrictedArea.add('10#18');
  restrictedArea.add('11#18');
  restrictedArea.add('12#18');
  restrictedArea.add('13#18');
  restrictedArea.add('14#18');
  restrictedArea.add('15#18');

  tintRestrictedArea(restrictedArea, cloudCityTilemap, 0xff7a4a);

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  this.gridEngine.moveTo('npc0', { x: 15, y: 18 }, {
    pathBlockedStrategy: 'RETRY',
    isPositionAllowedFn: createIsPosAllowed(restrictedArea),
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

function tintTile(tilemap, row, col, color) {
  for (let i = 0; i < tilemap.layers.length; i++) {
    tilemap.layers[i].tilemapLayer.layer.data[row][col].tint = color;
  }
}


function tintRestrictedArea(restrictedArea, tilemap, color) {
  for (const pos of restrictedArea) {
    const [x, y] = pos.split('#').map(Number);
    tintTile(tilemap, y, x, color);
  }
}

function createIsPosAllowed(restrictedArea) {
  return (pos, _layer) => restrictedArea.has(`${pos.x}#${pos.y}`);
}
