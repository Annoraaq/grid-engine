const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'GridMovementPlugin.min': './src/main.ts',
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
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/GridMovementPlugin.d.ts', to: 'GridMovementPlugin.d.ts' },
      ],
    }),
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
