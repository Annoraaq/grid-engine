---
title: Layer Properties
parent: Usage
nav_order: 4
---

# Layer Properties

Just like with individual [tile properties](tile-properties), you can define _Custom Properties_ for your tilemap layers. Here's a quick overview of the currently available properties for layers. Be aware these can change at any time, and more will be added!

| Property         | Type    | Effect                                                                                                                                                |
| :--------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gm_alwaysTop`   | boolean | If set to `true`, layer will **always** be rendered above characters.                                                                                 |
| `gm_heightShift` | number  | This property sets the layer's depth sorting relative to the characters. See [the Height Shift guide](../features/height-shift) for more information. |
