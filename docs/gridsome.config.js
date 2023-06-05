// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Grid Engine Documentation',
  siteDescription: 'Documentation for the Grid Engine Phaser plugin. Learn how to add grid based movement to your games.',
  siteUrl: 'https://annoraaq.github.io',
  pathPrefix: '/grid-engine',
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Example",
        path: "./examples/*.md",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Readme",
        path: "../README.md",
      },
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'MarkdownPage',
        baseDir: './content',
        template: './src/templates/MarkdownPage.vue',
        route: "/p/:title",
      }
    }
  ],
  templates: {
    Example: "/example/:title",
    Readme: "/p/:title",
  },
  transformers: {
    remark: {
      plugins: [
        'gridsome-remark-embed-snippet',
        '@gridsome/remark-prismjs'
      ],
      autolinkClassName: 'autolink fa-solid fa-link'
    }
  },

  configureWebpack: {
    // merged with the internal config
    module: {
      rules: [
        {
          test: /\.js?$/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-optional-chaining"],
          },
        },
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: false,
            skipEmptyLines: true
          }
        }
      ],
    },
  }
}
