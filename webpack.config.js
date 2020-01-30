
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty',
    dns: 'empty',
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  entry: {
    'public/assets/scripts/channels': './src/public/assets/scripts/channels.js',
    'public/assets/scripts/movie': './src/public/assets/scripts/movie.js',
    'public/assets/scripts/movies': './src/public/assets/scripts/movies.js',
    'public/assets/scripts/season': './src/public/assets/scripts/season.js',
    'public/assets/scripts/serial': './src/public/assets/scripts/serial.js',
    'public/assets/scripts/serials': './src/public/assets/scripts/serials.js',
    'public/assets/scripts/slideshow': './src/public/assets/scripts/slideshow.js',
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/app'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015-script',
                { modules: false }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './src/app/views', to: './app/views' },
      { from: './src/public/assets/styles', to: './public/assets/styles' }, // replace it with sass-loader
    ]),
  ],
};
