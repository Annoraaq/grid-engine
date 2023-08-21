---
title: Installation
parent: getting-started
next: false
---

# Installation

> **_NOTE:_** For using GridEngine with TypeScript and Phaser.js check out [this example repository](https://github.com/Annoraaq/grid-engine-ts-example).

### NPM

If you are using npm, you can install it via:

```bash
$ npm i --save grid-engine
```

And then import it in your code:

```javascript
import { GridEngine, GridEngineHeadless } from "grid-engine";
```

### Web

If you are not using a package manager like npm, you can also include the minified web version (iife):

```html
<!-- Download the .zip and copy GridEngine.min.js from dist directory -->
<script src="GridEngine.min.js"></script>
```

## Use as Phaser.js Plugin

Add the plugin to your Phaser config:

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

  this.gridEngine.create(
    tilemap, // Phaser.Tilemaps.Tilemap
    gridEngineConfig,
  );

  // ...
}
```

## Use Headless (Standalone)

You have to provide a tilemap to the headless (standalone, no Phaser.js) version of Grid Engine. While the Phaser.js plugin receives a Phaser tilemap, the headless version needs one that implements the [Tilemap interface](https://annoraaq.github.io/grid-engine/api/interfaces/Tilemap.html). There is a simple implementation in Grid Engine that can be created from an array of integers (0 = non-blocking, 1 = blocking). You can also create your own implementation of the [Tilemap interface](https://annoraaq.github.io/grid-engine/api/interfaces/Tilemap.html) and pass it to Grid Engine.

```javascript
import { GridEngineHeadless, ArrayTilemap } from "grid-engine";

const gridEngineHeadless = new GridEngineHeadless();

// A simple example tilemap created from an array.
// 0 = non-blocking
// 1 = blocking
const tilemap = new ArrayTilemap({
  someLayer: {
    data: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  },
});

gridEngineHeadless.create(tilemap, { characters: [{ id: "player" }] });
```

If you are using the web version (import via `<script>`), you can access `GridEngineHeadless` from the global variable `GridEngineImports`:

```javascript
const gridEngineHeadless = new GridEngineImports.GridEngineHeadless();

// A simple example tilemap created from an array.
// 0 = non-blocking
// 1 = blocking
const tilemap = new GridEngineImports.ArrayTilemap({
  someLayer: {
    data: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
  },
});

gridEngineHeadless.create(tilemap, { characters: [{ id: "player" }] });
```

### Tiled Tilemaps for headless version (no Phaser)

If you want to use the Tiled map editor for the headless Grid Engine version, you can use the [TiledTilemap](https://annoraaq.github.io/grid-engine/api/interfaces/Tilemap.html) implementation:

> **_NOTE:_** Depending on your environment, the loading of the tilemap might look a bit different. On node.js you can use https://nodejs.dev/en/learn/reading-files-with-nodejs/ and `JSON.parse`.

```javascript
import { GridEngineHeadless, TiledTilemap } from "grid-engine";
import * as someTilemap from "./path/to/tilemap.json";

const gridEngineHeadless = new GridEngineHeadless();

const tilemap = new TiledTilemap(someTilemap);

gridEngineHeadless.create(tilemap, { characters: [{ id: "player" }] });
```

## Import Helpers

Besides the GridEngine main class, you can also import several helpers. For example there is the `directionFromPos` helper function that gives you a `Direction` from a source to a target position.

If you are importing the NPM module you can import it like:

```javascript
import {
  GridEngine, // GridEngine Phaser Plugin main class
  GridEngineHeadless, // GridEngine headless main class
  directionFromPos, // One of the GridEngine helpers,
  // ...
} from "grid-engine";
```

If you are using the web version (import via `<script>`), all exported functions and classes besides `GridEngine` are stored in a global variable `GridEngineImports`.

So you would use it as follows:

```javascript
GridEngineImports.directionFromPos(/*...*/);
```
