---
title: Position Changed
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Position Changed Observable

**Press the arrow keys to move.** This demo demonstrates how to use the `positionChanged` observable on the tilemap, allowing you to track where the characters have moved to, and further allowing you to add custom features to various tiles if you wish. This demo also uses the [Phaser Containers](../phaser-container/index.html) feature.

<ExampleFrame :src="'../../example-code/position-changed/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/position-changed)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/position-changed/code.js

<<< @/public/example-code/position-changed/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
