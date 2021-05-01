---
title: Introduction
nav_order: 1
---

<h1 class="main-title">Grid Engine</h1>
<h2 class="main-subtitle">a plugin for Phaser 3</h2>

<div class="badges">
    <img src="https://img.shields.io/github/v/release/Annoraaq/grid-engine?style=for-the-badge&color=brightgreen">
    <img src="https://img.shields.io/github/stars/Annoraaq/grid-engine?style=for-the-badge&color=yellow">
    <img src="https://img.shields.io/badge/made%20with-TypeScript-blue?style=for-the-badge">
</div>

Welcome to the **Grid Engine** plugin! This Phaser 3 plugin adds grid-based movement to your tilemap game. Your characters will be able to only move in whole tile sizes, locked to the x-y grid!

This plugin is also compatible (and written in) TypeScript; enjoy full type support!

# Features

- Grid-based movement, of course!
- Tile-based collision detection
- One-way collision detection
- Support for multiple characters
- Pathfinding (for both NPCs and the player)
- Random movement (can also limit to a radius)
- Following other characters
- Diagonal movement (8 directions)
- Isometric maps (Beta)

# Installation

Installing the Grid Engine plugin is simple.

## NPM

```bash
npm i --save grid-engine
```

## Web

```html
<!-- Download the .zip and copy GridEngine.min.js from dist/ -->
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

# Example GIFs

<img src="https://github.com/Annoraaq/grid-engine/raw/master/images/movement.gif">
<img src="https://github.com/Annoraaq/grid-engine/raw/master/images/radius-movement.gif">
