---
layout: default
title: test
parent: Examples
---

# Basic Player Movement

**Press the arrow keys to move.** This is a basic demo of player movement, using a test map and basic **Grid Engine** functionality.

<div id="game"></div>

<script src="js/phaser.min.js"></script>
<script src="js/grid-engine-1.15.0.min.js"></script>

<script>
var TILE_SIZE = 48;
var CANVAS_WIDTH = 720;
var CANVAS_HEIGHT = 528;

var config = {
  title: 'game3',
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: {
    create: create,
    preload: preload,
    update: update,
    active: false,
    visible: false,
    TILE_SIZE: 48,
    key: "Game",
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: 'Game',
  backgroundColor: "#48C4F8",
};



var game = new Phaser.Game(config);

function preload() {
    this.load.image("tiles", "assets/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: 26,
      frameHeight: 36,
    });
    this.load.spritesheet("aurora2", "assets/aurora2.png", {
      frameWidth: 32,
      frameHeight: 48,
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
  playerSprite.setDepth(2);
  playerSprite.scale = 2.2;
  this.cameras.main.startFollow(playerSprite, true);
  this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

  const gridEngineConfig = {
    characters: [],

  };

  var self = this;


    addOtherPlayers('otherPlayer');
    addPlayer('player');










  createPlayerAnimation.call(this, "up", 12, 15);
  createPlayerAnimation.call(this, "right", 8, 11);
  createPlayerAnimation.call(this, "down", 0, 3);
  createPlayerAnimation.call(this, "left", 4, 7);


  this.gridEngine.create(cloudCityTilemap, gridEngineConfig);

  this.gridEngine.movementStarted().subscribe(([_charId, direction]) => {
    playerSprite.anims.play(direction);
  });
  this.gridEngine.movementStopped().subscribe(([_charId, direction]) => {
    playerSprite.anims.stop();
    playerSprite.setFrame(getStopFrame(direction));
  });
  this.gridEngine.directionChanged().subscribe(([_charId, direction]) => {
    playerSprite.setFrame(getStopFrame(direction));
  });

  function addPlayer(id){
    this.id = id;
    gridEngineConfig.characters.push({
      id: this.id,
      sprite: playerSprite,
      walkingAnimationMapping: 0,
      startPosition: new Phaser.Math.Vector2(11, 9),
      speed: 5,
    });
  }

  function addOtherPlayers(id){
    this.id = id;
    console.log('addOtherPlayers: '+this.id);
    gridEngineConfig.characters.push({
      id: this.id,
      sprite: this.add.sprite(100, 100, "player",5).setScale(3,3),
      walkingAnimationMapping: 2,
      startPosition: new Phaser.Math.Vector2(getRandomInt(4,8),getRandomInt(4,8)),
      speed: 2,
    });
    console.log('Grid: '+JSON.stringify(gridEngineConfig.characters));
  }



}

function update() {



  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    this.gridEngine.moveLeft("player");
  } else if (cursors.right.isDown) {
    this.gridEngine.moveRight("player");
  } else if (cursors.up.isDown) {
    this.gridEngine.moveUp("player");
  } else if (cursors.down.isDown) {
    this.gridEngine.moveDown("player");
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPlayerAnimation(name, startFrame, endFrame) {
  this.anims.create({
    key: name,
    frames: this.anims.generateFrameNumbers("aurora2", {
      start: startFrame,
      end: endFrame,
    }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  });
}

function getStopFrame(direction) {
  switch (direction) {
    case "up":
      return 12;
    case "right":
      return 8;
    case "down":
      return 0;
    case "left":
      return 4;
  }
}
</script>
