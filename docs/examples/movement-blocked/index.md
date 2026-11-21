---
title: Movement Blocked
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Movement Blocked

**Press the arrow keys to move.** This demo uses `gridEngine.movementBlocked()` to react whenever a character tries to move into a blocked tile or another character. Walking into walls highlights the blocked tile in red with a thump sound, bumping the left NPC pushes them one tile in the movement direction, and bumping the right NPC triggers a reaction.

<ExampleFrame :src="'../../example-code/movement-blocked/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/movement-blocked)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/movement-blocked/code.js

<<< @/public/example-code/movement-blocked/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
