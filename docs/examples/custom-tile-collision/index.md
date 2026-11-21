---
title: Custom Tile Collision
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Custom Tile Collision

**Press the arrow keys to move.** This demo passes a custom `isTileBlocking` callback in `gridEngineConfig` to replace Grid Engine's default tile collision checks:

- **Click any tile** to toggle a custom-blocked tile (highlighted in red).
- **Shift + Click any tile** to pathfind (`moveTo`) around custom-blocked tiles and the one-way barrier.
- **Press `B`** to toggle the blue one-way barrier at `x = 6` (only passable when entering from the left, i.e., moving right).
- **Press `G`** to toggle Ghost Mode (ignores tilemap `ge_collide` walls while still respecting custom-clicked blocks and the one-way barrier).
- **Press `C`** to clear clicked blocks.

<ExampleFrame :src="'../../example-code/custom-tile-collision/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/custom-tile-collision)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/custom-tile-collision/code.js

<<< @/public/example-code/custom-tile-collision/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
