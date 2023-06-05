(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"9iwq":function(t,e,o){"use strict";o.r(e);var r=o("KHd+"),a=o("UQSp"),i=o("Kw5r");function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}i.a.config.optionMergeStrategies;var n={VueRemarkRoot:a.a},s=function(t){var e=t.options.components=t.options.components||{},o=t.options.computed=t.options.computed||{};Object.keys(n).forEach((function(t){"object"===l(n[t])&&"function"==typeof n[t].render||"function"==typeof n[t]&&"function"==typeof n[t].options.render?e[t]=n[t]:o[t]=function(){return n[t]}}))},c=i.a.config.optionMergeStrategies,f="__vueRemarkFrontMatter",d={excerpt:null,title:"Tile Properties"};var _=function(t){t.options[f]&&(t.options[f]=d),i.a.util.defineReactive(t.options,f,d),t.options.computed=c.computed({$frontmatter:function(){return t.options[f]}},t.options.computed)},v=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("VueRemarkRoot",[e("h1",{attrs:{id:"tile-properties"}},[e("a",{attrs:{href:"#tile-properties","aria-hidden":"true"}},[e("span",{staticClass:"autolink fa-solid fa-link"})]),t._v("Tile Properties")]),e("p",[t._v("There's a number of "),e("em",[t._v("Custom Properties")]),t._v(" you can set for various uses on individual tiles in your "),e("strong",[t._v("Tiled")]),t._v(" tilemaps. This guide will walk you through them! Remember, these are subject to change, and more will come.")]),e("p",[t._v("ℹ️ If you're unsure how to add "),e("em",[t._v("Custom Properties")]),t._v(" to your tiles, see the "),e("a",{attrs:{href:"../collisions"}},[t._v("the Collision guide")]),t._v(" to get started.")]),e("h2",{attrs:{id:"collisions"}},[e("a",{attrs:{href:"#collisions","aria-hidden":"true"}},[e("span",{staticClass:"autolink fa-solid fa-link"})]),t._v("Collisions")]),e("p",[t._v("These properties relate to how individual tiles react to collisions.")]),e("h3",{attrs:{id:"basic"}},[e("a",{attrs:{href:"#basic","aria-hidden":"true"}},[e("span",{staticClass:"autolink fa-solid fa-link"})]),t._v("Basic")]),e("p",[t._v("For the most basic type of collision, read "),e("a",{attrs:{href:"../collisions"}},[t._v("the Collision guide")]),t._v(" to get started. When "),e("code",{pre:!0},[t._v("true")]),t._v(", characters can not pass through the tile from any direction.")]),e("table",[e("thead",[e("tr",[e("th",{attrs:{align:"left"}},[t._v("Property")]),e("th",{attrs:{align:"left"}},[t._v("Type")]),e("th",{attrs:{align:"left"}},[t._v("Effect")])])]),e("tbody",[e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters can not walk over tile from any direction. "),e("br"),t._v("If set to "),e("code",{pre:!0},[t._v("false")]),t._v(", characters can walk through tile from any direction.")])])])]),e("h3",{attrs:{id:"one-way"}},[e("a",{attrs:{href:"#one-way","aria-hidden":"true"}},[e("span",{staticClass:"autolink fa-solid fa-link"})]),t._v("One-Way")]),e("p",[t._v("These flags inform "),e("strong",[t._v("Grid Engine")]),t._v(" about how it should handle collisions from certain directions. When a one-way flag is set to true, it won't allow a character to pass through the tile from that direction. Multiple flags can be true at the same time. For a demo, see "),e("a",{attrs:{href:"../../example/one-way-collision"}},[t._v("the One-Way Collision demo")]),t._v(".")]),e("table",[e("thead",[e("tr",[e("th",{attrs:{align:"left"}},[t._v("Property")]),e("th",{attrs:{align:"left"}},[t._v("Type")]),e("th",{attrs:{align:"left"}},[t._v("Effect")])])]),e("tbody",[e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide_up")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters cannot walk over tile from the top.")])]),e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide_down")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters cannot walk over tile from the bottom.")])]),e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide_left")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters cannot walk over tile from the left.")])]),e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide_right")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters cannot walk over tile from the right.")])]),e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide_up-left")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters cannot walk over tile from the top-left.")])]),e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide_up-right")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters cannot walk over tile from the top-right.")])]),e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide_down-left")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters cannot walk over tile from the bottom-left.")])]),e("tr",[e("td",{attrs:{align:"left"}},[e("code",{pre:!0},[t._v("ge_collide_down-right")])]),e("td",{attrs:{align:"left"}},[t._v("boolean")]),e("td",{attrs:{align:"left"}},[t._v("If set to "),e("code",{pre:!0},[t._v("true")]),t._v(", characters cannot walk over tile from the bottom-right.")])])])])])}),[],!1,null,null,null);"function"==typeof s&&s(v),"function"==typeof _&&_(v);e.default=v.exports},UQSp:function(t,e,o){"use strict";e.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}}}]);