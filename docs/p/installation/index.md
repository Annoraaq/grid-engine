---
title: Installation
parent: getting-started
next: false
---

# Installation

Installing the Grid Engine plugin is simple.

> **_NOTE:_** For TypeScript check out [this example repository](https://github.com/Annoraaq/grid-engine-ts-example).

## NPM

```bash
npm i --save grid-engine
```

And then import via:

```javascript
import { GridEngine } from "grid-engine";
```

## Web

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

## Import Helpers

Besides the GridEngine main class, you can also import several helpers. For example there is the `directionFromPos` helper function that gives you a `Direction` from a source to a target position.

If you are importing the NPM module you can import it like:

```javascript
import {
  GridEngine, // GridEngine main class
  directionFromPos, // One of the GridEngine helpers,
  // ...
} from "grid-engine";
```

If you are using the web version (import via `<script>`), all exported functions and classes besides `GridEngine` are stored in a global variable `GridEngineImports`.

So you would use it as follows:

```javascript
GridEngineImports.directionFromPos(/*...*/);
```
