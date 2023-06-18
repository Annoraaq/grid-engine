---
title: Queue Directions Movement
---

# Queue Directions Movement

**Press and release the arrow keys (repeatedly) to enqueue directions to the movement queue.** This example shows how to enqueue directions to the movement queue of a character.
You will see the enqueued directions at the top of the screen. Note that [pathBlockedStrategy][pathBlockedStrategy] is set to `"SKIP"`. Therefore directions that would lead to movements that are not possible, because the corresponding tile is blocked will be dropped and the next one in the queue is processed (or also dropped).

<iframe style="height: 1000px" scrolling="no" src="../../x/queue-directions-movement"></iframe>

## Example Code

`embed:../static/x/queue-directions-movement/code.js`

## Example Phaser Config

`embed:../static/js/examplePhaserConfig.js`

[pathBlockedStrategy]: ../../api/interfaces/QueueMovementConfig.html#pathBlockedStrategy
