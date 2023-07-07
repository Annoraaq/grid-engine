---
title: Char Layers - Flying Chars with shadows
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Character Layers - Flying Chars with Shadows

**Press the arrow keys to move.** This demonstrates the usage of [character layers](../../p/character-layers/index.html) to create flying characters with separated shadows. The shadows are represented as _characters_ in GridEngine, are non-colliding and live on the same character layer as the player.

<ExampleFrame :src="'../../example-code/char-layers-flying-chars-shadows/index.html'" />

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/char-layers-flying-chars-shadows)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/char-layers-flying-chars-shadows/code.js

<<< @/public/example-code/char-layers-flying-chars-shadows/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::
