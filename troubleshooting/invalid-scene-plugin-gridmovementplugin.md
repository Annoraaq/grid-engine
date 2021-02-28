# Invalid Scene Plugin: gridMovementPlugin

![Error in Chrome console](https://snipboard.io/OXtASb.jpg)

This error will prevent loading of the plugin, and can occur if your bundler doesn't require `* as` for commonjs modules. To resolve this, try changing the following line:

```typescript
import * as GridMovementPlugin from "phaser-grid-movement-plugin";
```

to

```typescript
import GridMovementPlugin from "phaser-grid-movement-plugin";
```

