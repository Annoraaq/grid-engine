---
title: Pathfinding Restriction
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Restrict pathfinding

**Press the arrow keys to move.** This demo demonstrates how you can restrict pathfinding to a specific area (colorizes tiles). You can observe that pathfinding will not let the NPC take the shortest path to the target position, but the shortest path **within the allowed (colorized) area**.

<ExampleFrame :src="'../../example-code/pathfinding-restriction/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/pathfinding-restriction)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/pathfinding-restriction/code.js

<<< @/public/example-code/pathfinding-restriction/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
