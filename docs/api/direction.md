---
sidebar_title: Direction
sidebar_position: 5
---

# Direction

Direction is an enum that more easily allows us to pass a desired direction in our code.

## Values

```js
"none" | "up" | "right" | "left" | "down" | "up-left" | "up-right" | "down-left" | "down-right"
```

## Migrating to v2

Replace `moveLeft`, `moveRight`, `moveUp`, and `moveDown`.

These methods were removed because there is now a generic method `move` that supports all 8 directions. For instance, replace `moveLeft('player')` with `move('player', 'left')` or `move('player', Direction.LEFT)`.