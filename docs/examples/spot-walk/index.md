---
title: Spot Walk
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Spot Walk

**Press the arrow keys to move and `Space` to toggle spot walk on the player.** This demo shows characters continuously playing their built-in walking animation in place at their configured movement speed. The four NPCs below demonstrate speeds `1`, `2`, `4`, and `8` in different facing directions.

<ExampleFrame :src="'../../example-code/spot-walk/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/spot-walk)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/spot-walk/code.js

<<< @/public/example-code/spot-walk/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
