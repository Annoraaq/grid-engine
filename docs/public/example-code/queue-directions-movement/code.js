
const game = new Phaser.Game(config(preload, create, update));
let queueText;
let strategy = 'STOP';
let waitTimeout = 1000;
let prevWaitTimeout = 1000;

function preload() {
  this.load.image("tiles", "../../assets/cloud_tileset.png");
  this.load.tilemapTiledJSON(
    "cloud-city-map",
    "../../assets/cloud_city.json"
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
    -playerSprite.height
  );

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
        startPosition: { x: 3, y: 3 },
        speed: 2,
      },
    ],
  };


  queueText = this.add.text(20, 50, "", { fontSize: '45px' });
  queueText.setScrollFactor(0, 0);
  queueText.depth = 10000;
  queueText.setColor("#000000");

  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
  strategyChanged();
  settingsToConf();
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
    addQueueMovement(this.gridEngine, 'left');
  } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
    addQueueMovement(this.gridEngine, 'right');
  } else if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
    addQueueMovement(this.gridEngine, 'up');
  } else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
    addQueueMovement(this.gridEngine, 'down');
  }

  let queue = [];
  if (this.gridEngine.isMoving('player')) {
    queue = [this.gridEngine.getFacingDirection('player')];
  }
  const enqueuedMovements = this.gridEngine.getEnqueuedMovements('player')
    .map(e => e.command);
  queue = [...queue, ...enqueuedMovements];
  queueText.setText(queue.map(dirToIcon).join(' '));
}

function dirToIcon(dir) {
  switch (dir) {
    case 'left':
      return '⬅️';
    case 'right':
      return '️➡️';
    case 'up':
      return '⬆️';
    case 'down':
      return '⬇️';
  }
  return '?';
}


function addQueueMovement(gridEngine, direction) {
  gridEngine.addQueueMovements('player', [direction], {
    pathBlockedStrategy: strategy,
    pathBlockedWaitTimeoutMs: waitTimeout,
  });
}

function applySettings() {
  strategy = document.getElementById("path-blocked-strategy").value;
  waitTimeout = Number(document.getElementById("wait-timeout").value);
  settingsToConf();
}

function strategyChanged() {
  strategy = document.getElementById("path-blocked-strategy").value;
  const checkboxEl = document.getElementById("wait-timeout-infinite");
  const waitTimeoutEl = document.getElementById("wait-timeout");
  const waitTimeoutGroup = document.getElementsByClassName(
    "wait-timeout-group"
  )[0];
  const waitTimeoutGroupLabel = document.querySelector(
    "label[for='wait-timeout']"
  );

  if (strategy != 'WAIT') {
    checkboxEl.disabled = true;
    waitTimeoutEl.disabled = true;
    waitTimeoutGroup.classList.add("disabled");
    waitTimeoutGroupLabel.classList.add("disabled");
  } else {
    checkboxEl.disabled = false;
    waitTimeoutEl.disabled = false;
    waitTimeoutGroup.classList.remove("disabled");
    waitTimeoutGroupLabel.classList.remove("disabled");
  }
}

function infiniteCheckboxChanged(event) {
  const checkboxVal = document.getElementById(
    "wait-timeout-infinite"
  ).checked;
  const waitTimeoutEl = document.getElementById("wait-timeout");
  waitTimeoutEl.disabled = checkboxVal;
  if (checkboxVal) {
    prevWaitTimeout = Number(waitTimeoutEl.value);
    waitTimeoutEl.value = -1;
  } else {
    waitTimeoutEl.value = prevWaitTimeout;
  }
}

function settingsToConf() {
  let text = '';
  if (strategy == 'WAIT') {
    text = JSON.stringify({
      pathBlockedStrategy: strategy,
      pathBlockedWaitTimeoutMs: waitTimeout,
    }, null, 2);
  } else {
    text = JSON.stringify({
      pathBlockedStrategy: strategy,
    }, null, 2);
  }
  document.getElementById(
    "json-config"
  ).innerHTML = `<pre>${text}</pre>`;
}
