---
next: false
prev: false
---

# Create an ASCII Renderer

This tutorial demonstrates how to create your own renderer for Grid Engine in TypeScript. We will create a simple ASCII renderer together.
The renderer will fill a container element on a website with a text representation of our grid.

We will create a map that contains a simple maze and add a character that will use pathfinding to find their way to the center.

The ASCII representation of the map uses the following encoding:

- '.' = free position
- '#' = blocked position (wall of the maze)
- 'c' = position occupied by a character

So the map will initially look like this (the character starts at position (0,0)):

```
c.........
..........
.########.
.#......#.
.#.####.#.
.#.#..#.#.
.#.##.#.#.
.#....#...
.#########
..........
```

## Set Up the Project

We use [esbuild](https://esbuild.github.io/) to bundle and serve our compiled renderer as a website.

Create a new npm project with:

```bash
$ npm init
```

Next, install esbuild as a dev depencency:

```
$ npm i --save-dev esbuild
```

We also need to install Grid Engine:

```
$ npm i --save grid-engine
```

Now add a script for serving our website to the `package.json`:

::: code-group
```json [package.json]
// ...
"scripts": {
  "serve": "esbuild src/main.ts --servedir=. --outfile=main.js --bundle"
  // ...
},
// ...
```
:::

Next, create a file called `index.html` with the following content in the root directory of your project:

::: code-group

```html [index.html]
<!DOCTYPE html>
<html>
  <head>
    <title>Grid Engine ASCII Renderer</title>
  </head>
  <body>
    <div id="content"></div>
    <script src="main.js"></script>
  </body>
</html>
```

:::

This will be the entry point of our application. It contains a `<div>` that will hold the content later and a reference to our compiled and bundled `main.js` file.

Create a directory `src` and create the following empty files within it: `main.ts` and `AsciiRenderer.ts`.

Your directory tree should now look like this:

```
| - index.html
| - package.json
| - src
    | - AsciiRenderer.ts
    | - main.ts
```

## Initialize Grid Engine

Let's now create an instance of Grid Engine with a small maze map:

::: code-group

```typescript [src/main.ts]
import {
  GridEngineHeadless,
  ArrayTilemap,
  CollisionStrategy,
} from "grid-engine";
import { AsciiRenderer } from "./AsciiRenderer";

const gridEngineHeadless = new GridEngineHeadless();

// A simple example tilemap created from an array.
// 0 = non-blocking
// 1 = blocking
const tilemap = new ArrayTilemap({
  someLayer: {
    data: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
});

gridEngineHeadless.create(tilemap, {
  characters: [{ id: "player" }],
  characterCollisionStrategy: CollisionStrategy.BLOCK_ONE_TILE_AHEAD,
});
```

:::

We initialize a simple ArrayTilemap and create one character called 'player' which will be positioned by default at (0,0). We use [CollisionStrategy.BLOCK_ONE_TILE_AHEAD](https://annoraaq.github.io/grid-engine/api/enums/CollisionStrategy.html#BLOCK_ONE_TILE_AHEAD), so that the character always only occupies a single position.

## A Simple ASCII Renderer

Let's now write the actual renderer. Since a Grid Engine renderer is nothing more than a piece of software that vizualizes the state of Grid Engine, we will write a class that will transform the map into an ASCII encoded version as described above.

First, we add a class to `AsciiRenderer.ts`:

::: code-group

```typescript [src/AsciiRenderer.ts]
import { GridEngineHeadless, Tilemap } from "grid-engine";

/**
 * A renderer that displays an ASCII representation of the current Grid Engine
 * state into a provided container element.
 */
export class AsciiRenderer {
  constructor(
    private containerId: string,
    private gridEngine: GridEngineHeadless,
    private tilemap: Tilemap
  ) {}

  /** Render the current state of Grid Engine. */
  render(): void {
    // TODO
  }
}
```

:::

Our renderer will receive a container ID, an instance of Grid Engine and an instance of the Tilemap that is used in Grid Engine.

We are still missing the most important part, so let's implement the `render()` method:

::: code-group

```typescript [src/AsciiRenderer.ts]

// ...
export class AsciiRenderer {
  // ...

  /** Render the current state of Grid Engine. */
  render(): void {
    const strArr: string[] = []; // [!code ++]
    // Iterate through all tiles of the map. // [!code ++]
    for (let r = 0; r < this.tilemap.getHeight(); r++) { // [!code ++]
      for (let c = 0; c < this.tilemap.getWidth(); c++) { // [!code ++]
        const pos = { x: c, y: r }; // [!code ++]
        if (this.gridEngine.getCharactersAt(pos).length > 0) { // [!code ++]
          // tile is occupied by a character // [!code ++]
          strArr.push("c"); // [!code ++]
        } else if (this.gridEngine.isTileBlocked(pos)) { // [!code ++]
          // tile is blocked  // [!code ++]
          strArr.push("#"); // [!code ++]
        } else {  // [!code ++]
          // tile is free // [!code ++]
          strArr.push("."); // [!code ++]
        } // [!code ++]
      } // [!code ++]
      strArr.push("\n"); // [!code ++]
    } // [!code ++]

    this.renderStr(strArr.join("")); // [!code ++]
  }

  /** Renders a string into the provided container element. */ // [!code ++]
  private renderStr(str: string): void { // [!code ++]
    const container = document?.getElementById(this.containerId); // [!code ++]
    if (!container) { // [!code ++]
      console.error(`Container ${this.containerId} could not be found.`); // [!code ++]
      return; // [!code ++]
    } // [!code ++]
    container.innerHTML = `<pre>${str}</pre>`; // [!code ++]
  } // [!code ++]
```

:::

We iterate through each position in the tilemap and keep a string for the output. If the position is occupied by a character we add "c", if it is blocked by the tilemap, we add '#' and we add "." otherwise. We then render that string to the DOM element with the previously provided ID.
We wrap it into a `<pre></pre>` element, so the line wraps ("\n") are considered.

Finally we need to use our renderer in the `main.ts`. We simply create an instance and call the `render()` method:

::: code-group

```typescript [main.ts]
// ...

gridEngineHeadless.create(tilemap, {
  characters: [{ id: "player" }],
  characterCollisionStrategy: CollisionStrategy.BLOCK_ONE_TILE_AHEAD,
});

const asciiRenderer = new AsciiRenderer("content", gridEngineHeadless, tilemap); // [!code ++]
asciiRenderer.render(); // [!code ++]
```

:::

## Run the Project

Now it is time to see the renderer in action. From the root directory of your project run

```bash
$ npm run serve
```

It should give you a URL (usually http://127.0.0.1:8000/) to access your website.

The opened website should show the following text:

```
c.........
..........
.########.
.#......#.
.#.####.#.
.#.#..#.#.
.#.##.#.#.
.#....#...
.#########
..........
```

## Pathfinding

It is a little bit static at the moment. So let's create some action in there.
We will tell Grid Engine to move the character to the center of the maze (4,5) using pathfinding.

That means we need to call the [moveTo()](https://annoraaq.github.io/grid-engine/api/classes/GridEngineHeadless.html#moveTo) method of Grid Engine:

::: code-group

```typescript [main.ts]
// ...

const asciiRenderer = new AsciiRenderer("content", gridEngineHeadless, tilemap);
asciiRenderer.render();

const targetPos = { x: 4, y: 5 }; // [!code ++]
gridEngineHeadless.moveTo("player", targetPos); // [!code ++]
```

:::

Now, we need to make sure that Grid Engine gets updated in frequent intervals (we choose 50ms). And on each update we also want to trigger a re-rendering of the ASCII content in the container.

::: code-group

```typescript [main.ts]
// ...

const targetPos = { x: 4, y: 5 }; // [!code ++]
gridEngineHeadless.moveTo("player", targetPos); // [!code ++]

setInterval(() => { // [!code ++]
  gridEngineHeadless.update(0, 50); // [!code ++]
  asciiRenderer.render(); // [!code ++]
}, 50); // [!code ++]
```

:::

If you run the project now, you should see the 'c' move towards the center of the map.

If we want to start over once it reached the center, we can do so via:

::: code-group

```typescript [main.ts]
// ...
setInterval(() => {
  gridEngineHeadless.update(0, 50);
  asciiRenderer.render();
}, 50);

gridEngineHeadless.positionChangeFinished().subscribe(({ enterTile }) => { // [!code ++]
  if (enterTile.x == targetPos.x && enterTile.y == targetPos.y) { // [!code ++]
    gridEngineHeadless.setPosition("player", { x: 0, y: 0 }); // [!code ++]
    gridEngineHeadless.moveTo("player", targetPos); // [!code ++]
  } // [!code ++]
}); // [!code ++]

```

:::

For each new tile the character reaches, we check whether it is the target position in the center of the maze. If that is the case, we "teleport" the character back to the starting position (0,0) and start the pathfinding again. Now the animation will run in an endless loop.

## Wrapping it Up
I hope this simple renderer could give you an idea of how simple it can be to create your own renderer for Grid Engine. You can also use this as a starting point for a more complex one.

Here is the complete code:

::: code-group

```html [index.html]
<!DOCTYPE html>
<html>
  <head>
    <title>Grid Engine ASCII Renderer</title>
  </head>
  <body>
    <div id="content"></div>
    <script src="main.js"></script>
  </body>
</html>
```

```typescript [src/main.ts]
import {
  GridEngineHeadless,
  ArrayTilemap,
  CollisionStrategy,
} from "grid-engine";
import { AsciiRenderer } from "./AsciiRenderer";

const gridEngineHeadless = new GridEngineHeadless();

// A simple example tilemap created from an array.
// 0 = non-blocking
// 1 = blocking
const tilemap = new ArrayTilemap({
  someLayer: {
    data: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
});

gridEngineHeadless.create(tilemap, {
  characters: [{ id: "player" }],
  characterCollisionStrategy: CollisionStrategy.BLOCK_ONE_TILE_AHEAD,
});

const asciiRenderer = new AsciiRenderer("content", gridEngineHeadless, tilemap);
asciiRenderer.render();

const targetPos = { x: 4, y: 5 };
gridEngineHeadless.moveTo("player", targetPos);

gridEngineHeadless.positionChangeFinished().subscribe(({ enterTile }) => {
  if (enterTile.x == targetPos.x && enterTile.y == targetPos.y) {
    gridEngineHeadless.setPosition("player", { x: 0, y: 0 });
    gridEngineHeadless.moveTo("player", targetPos);
  }
});

setInterval(() => {
  gridEngineHeadless.update(0, 50);
  asciiRenderer.render();
}, 50);
```


```typescript [src/AsciiRenderer.ts]
import { GridEngineHeadless, Tilemap } from "grid-engine";

/**
 * A renderer that displays an ASCII representation of the current Grid Engine
 * state into a provided container element.
 */
export class AsciiRenderer {
  constructor(
    private containerId: string,
    private gridEngine: GridEngineHeadless,
    private tilemap: Tilemap
  ) {}

  /** Render the current state of Grid Engine. */
  render(): void {
    const strArr: string[] = [];
    // Iterate through all tiles of the map.
    for (let r = 0; r < this.tilemap.getHeight(); r++) {
      for (let c = 0; c < this.tilemap.getWidth(); c++) {
        const pos = { x: c, y: r };
        if (this.gridEngine.getCharactersAt(pos).length > 0) {
          // tile is occupied by a character
          strArr.push("c");
        } else if (this.gridEngine.isTileBlocked(pos)) {
          // tile is blocked
          strArr.push("#");
        } else {
          // tile is free
          strArr.push(".");
        }
      }
      strArr.push("\n");
    }

    this.renderStr(strArr.join(""));
  }

  /** Renders a string into the provided container element. */
  private renderStr(str: string): void {
    const container = document?.getElementById(this.containerId);
    if (!container) {
      console.error(`Container ${this.containerId} could not be found.`);
      return;
    }
    container.innerHTML = `<pre>${str}</pre>`;
  }
}
```

:::


You can also check out the full code on GitHub: [https://github.com/Annoraaq/grid-engine-ascii-renderer](https://github.com/Annoraaq/grid-engine-ascii-renderer).
