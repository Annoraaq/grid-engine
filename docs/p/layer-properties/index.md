---
title: Layer Properties
next: false
prev: false
---

# Layer Properties

Just like with individual [tile properties](../tile-properties/index.html), you can define _Custom Properties_ for your tilemap layers. Here's a quick overview of the currently available properties for layers. Be aware these can change at any time, and more will be added!

| Property                                      | Type    | Effect                                                                                                                                                  |
| :-------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ge_alwaysTop`                                | boolean | If set to `true`, layer will **always** be rendered above characters.                                                                                   |
| `ge_heightShift`                              | number  | This property sets the layer's depth sorting relative to the characters. See [the Height Shift guide](../height-shift/index.html) for more information. |
| `ge_charLayer` <span class="beta">Beta</span> | string  | This property sets the character layer name for the tilemap layer. See [Character Layers](../character-layers/index.html) for more information.         |
