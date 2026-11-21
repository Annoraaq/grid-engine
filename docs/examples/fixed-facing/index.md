---
title: Fixed Facing Direction
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Fixed Facing Direction

**Press the arrow keys to move, `Space` to toggle `fixedFacing` on the player, and `W`/`A`/`S`/`D` to explicitly turn while fixed.** This demo shows how a character can strafe or backpedal while keeping its logical facing direction and walking animation fixed. The yellow outline marks `getFacingPosition("player")`, and the NPC below patrols using `moveTo` with `fixedFacing: true`.

<ExampleFrame :src="'../../example-code/fixed-facing/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/fixed-facing)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/fixed-facing/code.js

<<< @/public/example-code/fixed-facing/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
