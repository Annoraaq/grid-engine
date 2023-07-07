---
title: Queue Directions Movement
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Queue Directions Movement

**Press and release the arrow keys (repeatedly) to enqueue directions to the movement queue.** This example shows how to enqueue directions to the movement queue of a character.
You will see the enqueued directions at the top of the screen.
Use the **settings** section to experiment with some configurations.

<ExampleFrame :src="'../../example-code/queue-directions-movement/index.html'" :height="1000"/>

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/queue-directions-movement)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/queue-directions-movement/code.js

<<< @/public/example-code/queue-directions-movement/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::

[pathBlockedStrategy]: https://annoraaq.github.io/grid-engine/api/interfaces/QueueMovementConfig.html#pathBlockedStrategy
