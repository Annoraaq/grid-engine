---
title: Move To
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Move Character To

**Press the arrow keys to move.** This demo demonstrates how you can command characters (including the player) to move to the desired tile, and they will pathfind the shortest route to their destination. Follow the NPCs to their destination!

<ExampleFrame :src="'../../example-code/move-to/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/move-to)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/move-to/code.js

<<< @/public/example-code/move-to/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
