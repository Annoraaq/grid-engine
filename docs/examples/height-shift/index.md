---
title: Height Shift
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Height Shifting

**Press the arrow keys to move.** This demo demonstrates how to use the height-shifting feature on tilemap layers, allowing you to be explicit about how overlapping layers are handled. In this example, we want the player to walk behind the plants, but his head should be in front of plants above him. This is where height-shifting comes into play!

<ExampleFrame :src="'../../example-code/height-shift/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/height-shift)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/height-shift/code.js

<<< @/public/example-code/height-shift/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
