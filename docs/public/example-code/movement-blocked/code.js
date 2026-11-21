const game = new Phaser.Game(config(preload, create, update));

const TILE_SIZE = 48; // 16px * scale 3

let cursors;
let pushableLabel;
let guardLabel;
let lastHandledAt = 0;
let audioCtx;

function playThump(isPush) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  if (!audioCtx) audioCtx = new AudioCtx();
  if (audioCtx.state === "suspended") audioCtx.resume();

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = isPush ? "triangle" : "sine";
  osc.frequency.setValueAtTime(isPush ? 190 : 120, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.09);

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.1);
}

function flashBlockedTile(scene, position, color) {
  const rect = scene.add.rectangle(
    position.x * TILE_SIZE + TILE_SIZE / 2,
    position.y * TILE_SIZE + TILE_SIZE / 2,
    TILE_SIZE - 4,
    TILE_SIZE - 4,
    color,
    0.35,
  );
  rect.setStrokeStyle(3, color, 0.95);
  rect.setDepth(1000);

  scene.tweens.add({
    targets: rect,
    alpha: 0,
    duration: 320,
    ease: "Quad.easeOut",
    onComplete: () => rect.destroy(),
  });
}

function showFloatingText(scene, position, message, color) {
  const text = scene.add
    .text(
      position.x * TILE_SIZE + TILE_SIZE / 2,
      position.y * TILE_SIZE - 6,
      message,
      {
        fontSize: "14px",
        fontStyle: "bold",
        color,
        stroke: "#111",
        strokeThickness: 4,
      },
    )
    .setOrigin(0.5, 1)
    .setDepth(1001);

  scene.tweens.add({
    targets: text,
    y: text.y - 20,
    alpha: 0,
    duration: 600,
    ease: "Quad.easeOut",
    onComplete: () => text.destroy(),
  });
}

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

  const pushableSprite = this.add.sprite(0, 0, "player");
  pushableSprite.scale = 1.5;

  const guardSprite = this.add.sprite(0, 0, "player");
  guardSprite.scale = 1.5;

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
        startPosition: { x: 14, y: 8 },
        speed: 5,
      },
      {
        id: "npc_pushable",
        sprite: pushableSprite,
        walkingAnimationMapping: 1,
        startPosition: { x: 13, y: 10 },
        speed: 5,
      },
      {
        id: "npc_guard",
        sprite: guardSprite,
        walkingAnimationMapping: 4,
        startPosition: { x: 15, y: 10 },
        speed: 4,
      },
    ],
  };

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

  pushableLabel = this.add
    .text(0, 0, "Push me", {
      fontSize: "12px",
      color: "#86efac",
      stroke: "#111",
      strokeThickness: 3,
    })
    .setOrigin(0.5, 1)
    .setDepth(999);

  guardLabel = this.add
    .text(0, 0, "Solid NPC", {
      fontSize: "12px",
      color: "#fcd34d",
      stroke: "#111",
      strokeThickness: 3,
    })
    .setOrigin(0.5, 1)
    .setDepth(999);

  this.gridEngine
    .movementBlocked()
    .subscribe(({ charId, direction, position, layer }) => {
      // Limit feedback rate while holding a key against an obstacle
      const now = performance.now();
      if (now - lastHandledAt < 250) return;
      lastHandledAt = now;

      const blockingChars = this.gridEngine.getCharactersAt(position, layer);

      if (charId === "player" && blockingChars.includes("npc_pushable")) {
        flashBlockedTile(this, position, 0x22c55e);
        playThump(true);
        this.gridEngine.move("npc_pushable", direction);
        showFloatingText(this, position, "Pushed!", "#86efac");
      } else if (charId === "player" && blockingChars.includes("npc_guard")) {
        flashBlockedTile(this, position, 0xf59e0b);
        playThump(false);
        showFloatingText(this, position, "Hey! Watch it!", "#fcd34d");
      } else {
        flashBlockedTile(this, position, 0xef4444);
        playThump(false);
      }
    });

  cursors = this.input.keyboard.createCursorKeys();
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

  const pushSprite = this.gridEngine.getSprite("npc_pushable");
  pushableLabel.setPosition(
    pushSprite.x + pushSprite.displayWidth / 2,
    pushSprite.y + 4,
  );

  const guardSprite = this.gridEngine.getSprite("npc_guard");
  guardLabel.setPosition(
    guardSprite.x + guardSprite.displayWidth / 2,
    guardSprite.y + 4,
  );
}
