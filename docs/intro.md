---
sidebar_label: 'Intro'
sidebar_position: 1
slug: '/'
---

# 👋 Intro

Welcome to the **Grid Engine** plugin! This Phaser 3 plugin adds grid-based movement to your tilemap game. Your characters will be able to only move in whole tile sizes, locked to the x-y grid!

This plugin is also compatible (and written in) TypeScript; enjoy full type support!

## Features

Grid Engine is ***loaded*** with neat features.

🔳 Grid based movement. Duh! <br />
⛔ *Really* easy one-way, two-way or three-way collision. <br />
⚡ ***Super fast*** AI pathfinding, even when you have 40+ characters *at the same time*. <br />
💯 Enjoy **full** TypeScript support. All interfaces are exposed, so code with confidence. <br />
🔃 Character features such as randomly roaming, walking in a radius, or following. <br />
↗️ Built-in support for diagonal (8 directions) movement! <br />
🧱 Included support for isometric maps!

With more features to come.

## Installation

There are two methods to installing Grid Engine, depending on your work flow.

### Web (not bundling)
```html
<!-- Download the .zip and copy GridEngine.min.js from root directory -->
<script src="GridEngine.min.js"></script>
```

### NPM (bundling)

```bash
npm i grid-engine
```

### Using within Phaser
Then, inside your Phaser game config...

```javascript
// If you're using a bundler...
// import { GridEngine } from 'grid-engine'

const gameConfig = {
  // ...

  plugins: {
    scene: [
      {
        key: "GridEngine",
        plugin: GridEngine,
        mapping: "GridEngine",
      },
    ],
  },

  // ...
}

const game = new Phaser.Game(gameConfig)
```

Now you're all set to start using Grid Engine in your scenes!

```javascript
function create() {
  // ...

  const GridEngineConfig = {
    characters: [
      {
        id: "player",
        sprite: playerSprite,
        walkingAnimationMapping: 6,
      },
    ],
  }

  this.GridEngine.create(tilemap, GridEngineConfig)

  // ...
}
```