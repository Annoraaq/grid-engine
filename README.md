<p align="center">
    <img src="https://img.shields.io/github/v/release/Annoraaq/grid-engine?style=for-the-badge&color=brightgreen">
    <img src="https://img.shields.io/github/stars/Annoraaq/grid-engine?style=for-the-badge&color=yellow">
    <img src="https://img.shields.io/badge/made%20with-TypeScript-blue?style=for-the-badge">
</p>

<p align="center">
  <img
    src="https://github.com/Annoraaq/grid-engine/raw/master/images/grid-engine-logo.png"
    alt="Grid Engine Logo"
  />
</p>

Welcome to the **Grid Engine** plugin! This Phaser 3 plugin adds grid-based
movement to your tilemap game. Your characters will be able to only move in whole tile sizes, locked to the x-y grid!

<p align="center">
  <img
    src="https://github.com/Annoraaq/grid-engine/raw/master/images/radius-movement-demo.gif"
    width="400"
    style="image-rendering: pixelated; display: inline"
  />
</p>

## Features

- Grid-based movement, of course!
- Multiple characters
- Pathfinding (for both NPCs and the player)
- NEW - Headless mode (allows running it independently of Phaser)
- Tile-based collision detection
- One-way collision detection
- Random movement (can also limit to a radius)
- Following other characters
- Diagonal movement (8 directions)
- Isometric maps (Beta)
- Multiple character layers (Beta)
- Collision groups
- Multi-tile characters
- Full TypeScript support

📖 Read our most current [documentation](https://annoraaq.github.io/grid-engine/).

➡️ You can try/download [a list of examples](https://annoraaq.github.io/grid-engine/).

👾 Join our [discord](https://discord.gg/C4jNEZJECs).

🛠 Also check out the [Chrome DevTools plugin](https://github.com/zewa666/grid-engine-devtools).

## Installation

Installing the Grid Engine plugin is simple.

> **_NOTE:_** For TypeScript check out [this example repository](https://github.com/Annoraaq/grid-engine-ts-example).

### NPM

```bash
npm i --save grid-engine
```

And then import via:

```javascript
import { GridEngine } from "grid-engine";
```

### Web

```html
<!-- Download the .zip and copy GridEngine.min.js from dist directory -->
<script src="GridEngine.min.js"></script>
```

Then, inside your Phaser game config...

```javascript
const gameConfig = {
  // ...

  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },

  // ...
};

const game = new Phaser.Game(gameConfig);
```

Now you're all set to start using Grid Engine in your scenes!

```javascript
function create() {
  // ...

  const gridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
      },
    ],
  };

  this.gridEngine.create(tilemap, gridEngineConfig);

  // ...
}
```

## Projects using Grid Engine

- [Build a Snowman](https://play.google.com/store/apps/details?id=com.raiper34.buildasnowman)
- [Defynia](https://play.definya.com/)

If you have a project that is using Grid Engine and that you would like to see in this list, post it in the #showcase channel on our [Discord](https://discord.gg/C4jNEZJECs).

## Special Thanks

Raiper34, splashsky, therebelrobot, xLink,

## License

Apache 2.0
