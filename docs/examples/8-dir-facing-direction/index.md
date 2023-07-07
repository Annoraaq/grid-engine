---
title: Facing Direction (8 directions)
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Facing Direction Observable (8 directions)

**Press the arrow keys to move.** This demo demonstrates how to use the `facingDirection` observable on a character using 8 directions, allowing you to know when a character is facing a certain direction. This demo also uses the [Phaser Containers](../phaser-container/index.html) feature.

<ExampleFrame :src="'../../example-code/8-dir-facing-direction/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/8-dir-facing-direction)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/8-dir-facing-direction/code.js

<<< @/public/example-code/8-dir-facing-direction/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
