---
title: Facing Direction
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Facing Direction Observable

**Press the arrow keys to move.** This demo demonstrates how to use the `facingDirection` observable on a character, allowing you to know when a character is facing a certain direction. This demo also uses the [Phaser Containers](../phaser-container/index.html) feature.

<ExampleFrame :src="'../../example-code/facing-direction/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/facing-direction)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/facing-direction/code.js

<<< @/public/example-code/facing-direction/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
