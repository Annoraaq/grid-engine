const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    GridMovementPlugin: './src/main.ts',
    'GridMovementPlugin.min': './src/main.ts'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      include: /\.min\.js$/,
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        compress: true,
        ie8: false,
        ecma: 5,
        output: {
          comments: false
        },
        warnings: false
      },
      warningsFilter: (src) => false
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
    library: 'GridMovementPlugin',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
};
