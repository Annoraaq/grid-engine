const game = new Phaser.Game(config(preload, create, update));

const TILE_SIZE = 48; // 16px * scale 3

let ghostMode = false;
let oneWayBarrierEnabled = true;
const customBlockedTiles = new Set(["4,3", "4,4", "4,5"]);

let cloudCityTilemap;
let overlayGraphics;
let hudText;
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

// Custom tile collision logic passed via gridEngineConfig.isTileBlocking:
// 1. Respects custom clicked tiles (red)
// 2. Enforces a one-way barrier on x = 6 (only passable when entering from LEFT)
// 3. Supports dynamic Ghost Mode (ignores tilemap ge_collide properties)
// 4. Falls back to top-down tile passability (top-most visible tile wins)
function customIsTileBlocking(pos, _charLayer, direction, ignoreMissingTiles) {
  if (
    pos.x < 0 ||
    pos.y < 0 ||
    pos.x >= cloudCityTilemap.width ||
    pos.y >= cloudCityTilemap.height
  ) {
    return !ignoreMissingTiles;
  }

  if (customBlockedTiles.has(`${pos.x},${pos.y}`)) {
    return true;
  }

  if (oneWayBarrierEnabled && pos.x === 6 && pos.y >= 2 && pos.y <= 7) {
    if (direction !== "left") {
      return true;
    }
  }

  if (ghostMode) {
    return false;
  }

  const layers = cloudCityTilemap.layers;
  let foundAnyTile = false;
  for (let i = layers.length - 1; i >= 0; i--) {
    const tile = cloudCityTilemap.getTileAt(
      pos.x,
      pos.y,
      false,
      layers[i].name,
    );
    if (tile) {
      foundAnyTile = true;
      if (tile.properties && tile.properties.ge_collide) {
        return true;
      }
      return false;
    }
  }

  return !ignoreMissingTiles && !foundAnyTile;
}

function redrawOverlay() {
  overlayGraphics.clear();

  overlayGraphics.fillStyle(0xef4444, 0.45);
  overlayGraphics.lineStyle(2, 0xfca5a5, 0.9);
  for (const key of customBlockedTiles) {
    const [x, y] = key.split(",").map(Number);
    overlayGraphics.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    overlayGraphics.strokeRect(
      x * TILE_SIZE,
      y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
    );
  }

  if (oneWayBarrierEnabled) {
    overlayGraphics.fillStyle(0x38bdf8, 0.35);
    overlayGraphics.lineStyle(2, 0x7dd3fc, 0.9);
    for (let y = 2; y <= 7; y++) {
      overlayGraphics.fillRect(
        6 * TILE_SIZE,
        y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
      );
      overlayGraphics.strokeRect(
        6 * TILE_SIZE,
        y * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
      );
    }
  }
}

function updateHud() {
  hudText.setText(
    `[G] Ghost Mode: ${ghostMode ? "ON" : "OFF"}   |   ` +
      `[B] One-Way Barrier: ${oneWayBarrierEnabled ? "ON" : "OFF"}   |   ` +
      `[C] Clear Blocks`,
  );
}

function create() {
  cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
  cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
  for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
    const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
    layer.scale = 3;
  }

  overlayGraphics = this.add.graphics();
  overlayGraphics.setDepth(1000);
  redrawOverlay();

  const playerSprite = this.add.sprite(0, 0, "player");
  playerSprite.scale = 1.5;
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
        startPosition: { x: 3, y: 3 },
      },
    ],
    isTileBlocking: customIsTileBlocking,
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  cursors = this.input.keyboard.createCursorKeys();

  hudText = this.add
    .text(10, 10, "", {
      fontSize: "13px",
      color: "#ffffff",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: { x: 8, y: 5 },
    })
    .setScrollFactor(0)
    .setDepth(2000);
  updateHud();

  this.input.keyboard.on("keydown-G", () => {
    ghostMode = !ghostMode;
    updateHud();
  });
  this.input.keyboard.on("keydown-B", () => {
    oneWayBarrierEnabled = !oneWayBarrierEnabled;
    updateHud();
    redrawOverlay();
  });
  this.input.keyboard.on("keydown-C", () => {
    customBlockedTiles.clear();
    redrawOverlay();
  });

  this.input.on("pointerdown", (pointer) => {
    const tileX = Math.floor(pointer.worldX / TILE_SIZE);
    const tileY = Math.floor(pointer.worldY / TILE_SIZE);
    if (pointer.event.shiftKey) {
      this.gridEngine.moveTo("player", { x: tileX, y: tileY });
    } else {
      const key = `${tileX},${tileY}`;
      if (customBlockedTiles.has(key)) {
        customBlockedTiles.delete(key);
      } else {
        customBlockedTiles.add(key);
      }
      redrawOverlay();
    }
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
