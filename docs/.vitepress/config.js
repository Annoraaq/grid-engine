import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Grid Engine Documentation",
  base: "/grid-engine/",
  description: "Documentation for the Grid Engine Phaser plugin. Learn how to add grid based movement to your games.",
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "96x96", href: "/grid-engine/favicon.png" }],
    ['link', { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ['link', { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ['link', { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Saira&display=swap" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: false,
    externalLinkIcon: true,
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'API reference', link: 'https://annoraaq.github.io/grid-engine/api' },
      { text: 'Dev Tools Plugin', link: 'https://github.com/zewa666/grid-engine-devtools' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/p/introduction/index.md' },
          { text: 'Installation', link: '/p/installation/index.md' },
        ]
      },
      {
        text: 'Usage',
        collapsed: false,
        items: [
          { text: 'Execute Examples Locally', link: '/p/execute-examples-locally/index.md' },
          { text: 'Collision', link: '/p/collision/index.md' },
          { text: 'Collision Layers', link: '/p/collision-layers/index.md' },
          { text: 'Tile Properties', link: '/p/tile-properties/index.md' },
          { text: 'Layer Properties', link: '/p/layer-properties/index.md' },
          { text: 'Height Shift', link: '/p/height-shift/index.md' },
          { text: 'Character Layers', link: '/p/character-layers/index.md' },
          { text: 'Layer Overlay', link: '/p/layer-overlay/index.md' },
          { text: 'Pathfinding Performance', link: '/p/pathfinding-performance/index.md' },
          { text: 'Tiled Project', link: '/p/tiled-project/index.md' },
          { text: 'Example ASCII Renderer', link: '/p/ascii-renderer/index.md' },
        ]
      },
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'Basic Movement', link: '/examples/basic-movement/index.md' },
          { text: 'Collision Groups', link: '/examples/collision-groups/index.md' },
          { text: 'Crowd', link: '/examples/crowd/index.md' },
          { text: 'Facing Direction', link: '/examples/facing-direction/index.md' },
          { text: 'Height Shift', link: '/examples/height-shift/index.md' },
          { text: 'Ice Movement', link: '/examples/ice-movement/index.md' },
          { text: 'Is Moving', link: '/examples/is-moving/index.md' },
          { text: 'Isometric', link: '/examples/isometric/index.md' },
          { text: 'One-Way Collision', link: '/examples/one-way-collision/index.md' },
          { text: 'Phaser Containers', link: '/examples/phaser-container/index.md' },
          { text: 'Position Changed', link: '/examples/position-changed/index.md' },
          { text: 'Radius Movement', link: '/examples/radius-movement/index.md' },
          { text: 'Random Movement', link: '/examples/random-movement/index.md' },
          { text: 'Queue Directions Movement', link: '/examples/queue-directions-movement/index.md' },
          {
            text: "Char Layers",
            collapsed: false,
            items: [
              { text: 'Bridge', link: '/examples/char-layers-bridge/index.md' },
              { text: 'Flying Chars', link: '/examples/char-layers-flying-chars/index.md' },
              { text: 'Flying Chars with Shadows', link: '/examples/char-layers-flying-chars-shadows/index.md' },

            ]
          },
          {
            text: "Walking Animations",
            collapsed: false,
            items: [
              { text: 'Custom Walking Animation', link: '/examples/custom-walking-animation/index.md' },
              { text: 'Custom Walking Animation Mapping', link: '/examples/custom-walking-animation-mapping/index.md' },
            ]
          },
          {
            text: "Pathfinding",
            collapsed: false,
            items: [
              { text: 'Following', link: '/examples/following/index.md' },
              { text: 'Following Facing Direction', link: '/examples/following-facing-direction/index.md' },
              { text: 'Move To', link: '/examples/move-to/index.md' },
              { text: 'Move To (multi-tile)', link: '/examples/mult-tile-move-to/index.md' },
              { text: 'Pathfinding Restriction', link: '/examples/pathfinding-restriction/index.md' },
              { text: 'Tile Costs for Pathfinding', link: '/examples/path-costs/index.md' },

            ]
          },
          {
            text: "8 Directions",
            collapsed: false,
            items: [
              { text: 'Crowd', link: '/examples/8-dir-crowd/index.md' },
              { text: 'Facing Directions', link: '/examples/8-dir-facing-direction/index.md' },
              { text: 'Following', link: '/examples/8-dir-following/index.md' },
              { text: 'Isometric', link: '/examples/8-dir-isometric/index.md' },
              { text: 'Move To', link: '/examples/8-dir-move-to/index.md' },
              { text: 'Movement', link: '/examples/8-dir-movement/index.md' },
              { text: 'Move To (multi-tile)', link: '/examples/8-dir-multi-tile-move-to/index.md' },

            ]
          },
        ]
      },
      { text: 'Troubleshooting', link: '/p/known-errors/index.md' },
      { text: 'Migrate to Version 2', link: '/p/migrate-to-2/index.md' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Annoraaq/grid-engine', ariaLabel: "Github link" },
      { icon: 'discord', link: 'https://discord.gg/C4jNEZJECs', ariaLabel: "Discord link" }
    ]
  },
})
