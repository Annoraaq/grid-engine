const game = new Phaser.Game(config(preload, create, update));
let considerCosts = false;
let gridEngine;

function preload() {
  this.load.image("tiles", "../../assets/tf_jungle_tileset.png");
  this.load.tilemapTiledJSON(
    "jungle",
    "../../assets/tile-costs.json"
  );

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
  playerSprite.scale = 1.5;
  const npcSprite = this.add.sprite(0, 0, "player");
  npcSprite.scale = 1.5;
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(
    -playerSprite.width,
    -playerSprite.height
  );

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 18, y: 14 },
      },
      {
        id: "npc",
        sprite: npcSprite,
        walkingAnimationMapping: 2,
        startPosition: { x: 15, y: 15 },
      },
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  this.gridEngine.positionChangeStarted().subscribe(({ charId, enterTile, enterLayer, exitTile }) => {
    const dir = GridEngineImports.directionFromPos(enterTile, exitTile);
    const cost = this.gridEngine.getTileCost(enterTile, enterLayer, dir);
    this.gridEngine.setSpeed(charId, 3 / cost);
  });
  gridEngine = this.gridEngine;

  const triangleArgs = [0, 0, 50, 0, 24, 50, 0xffffff];
  const arrow = this.add.triangle(
    16 * 48 + 24,
    9 * 48 + 24,
    ...triangleArgs
  );
  this.tweens.add({
    targets: [arrow],
    alpha: 0.2,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut",
  });
  settingsToConf();
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

function startPathfinding() {
  considerCosts = !!document.getElementById("consider-costs").checked;
  settingsToConf();
  gridEngine.setPosition("npc", { x: 15, y: 15 });
  gridEngine.moveTo("npc", { x: 16, y: 5 }, {
    algorithm: "A_STAR",
    considerCosts
  });
}

function settingsToConf() {
  let text = '';
  text = JSON.stringify({
    algorithm: "A_STAR",
    considerCosts,
  }, null, 2);
  document.getElementById(
    "json-config"
  ).innerHTML = `<pre>${text}</pre>`;
}
