(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{GnZE:function(e,t,o){"use strict";o.r(t);var n=o("KHd+"),r=o("UQSp"),i=o("Kw5r");function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}i.a.config.optionMergeStrategies;var a={VueRemarkRoot:r.a},c=function(e){var t=e.options.components=e.options.components||{},o=e.options.computed=e.options.computed||{};Object.keys(a).forEach((function(e){"object"===s(a[e])&&"function"==typeof a[e].render||"function"==typeof a[e]&&"function"==typeof a[e].options.render?t[e]=a[e]:o[e]=function(){return a[e]}}))},p=i.a.config.optionMergeStrategies,l="__vueRemarkFrontMatter",u={excerpt:null,title:"Tiled Project"};var f=function(e){e.options[l]&&(e.options[l]=u),i.a.util.defineReactive(e.options,l,u),e.options.computed=p.computed({$frontmatter:function(){return e.options[l]}},e.options.computed)},d=Object(n.a)({},(function(){var e=this,t=e._self._c;return t("VueRemarkRoot",[t("h1",{attrs:{id:"tiled-project"}},[t("a",{attrs:{href:"#tiled-project","aria-hidden":"true"}},[t("span",{staticClass:"autolink fa-solid fa-link"})]),e._v("Tiled Project")]),t("p",[e._v("In Tiled it is possible to define "),t("a",{attrs:{href:"https://doc.mapeditor.org/en/stable/manual/custom-properties/#custom-types",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("classes on tiles")]),e._v(". These classes can have properties. This way you can change the properties of many tiles at once.")]),t("p",[e._v("These classes are only available in "),t("a",{attrs:{href:"https://doc.mapeditor.org/en/stable/manual/projects/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Tiled projects")]),e._v(" and not in single maps. The classes with their properties are then stored in a Tiled project file (which is in JSON format).\nGrid Engine allows to provide such a Tiled project file. This is necessary if you want to use Tiled classes. The Tiled config file can be provided in the "),t("a",{attrs:{href:"../../api/interfaces/GridEngineConfig.html#tiledProject"}},[e._v("Grid Engine config")]),e._v(". The simplest way to provide it is to use Phasers "),t("a",{attrs:{href:"https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html#json__anchor",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("LoaderPlugin")]),e._v(":")]),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[e._v('function preload() {\n  // ...\n  this.load.json(\n    "some-tiled-project",\n    "path-to/some-tiled-project.tiled-project"\n  );\n}\n')])]),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[e._v('function create() {\n  // ...\n  this.gridEngine.create(tilemap, {\n    // ...\n    tiledProject: this.cache.json.get("some-tiled-project"),\n  });\n}\n')])])])}),[],!1,null,null,null);"function"==typeof c&&c(d),"function"==typeof f&&f(d);t.default=d.exports},UQSp:function(e,t,o){"use strict";t.a={name:"VueRemarkRoot",render:function(e){return e("div",null,this.$slots.default)}}}}]);