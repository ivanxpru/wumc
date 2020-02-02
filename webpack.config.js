const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
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
    'public/assets/scripts/channels': './src/assets/scripts/channels.js',
    'public/assets/scripts/movie': './src/assets/scripts/movie.js',
    'public/assets/scripts/movies': './src/assets/scripts/movies.js',
    'public/assets/scripts/season': './src/assets/scripts/season.js',
    'public/assets/scripts/serial': './src/assets/scripts/serial.js',
    'public/assets/scripts/serials': './src/assets/scripts/serials.js',
    'public/assets/scripts/slideshow': './src/assets/scripts/slideshow.js',
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
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter(),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'public/assets/styles/styles.css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([
      { from: './src/app/views', to: './app/views' },
      { from: './src/config.json', to: './config.json' },
    ]),
  ],
};
