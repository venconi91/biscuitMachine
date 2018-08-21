const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths');
require('dotenv').config({ path: paths.devEnvFile });

module.exports = {
  context: paths.srcPath,
  devtool: 'source-map,',
  entry: {
    vendor: ['react', 'react-dom', 'immutable'],
    app: [paths.entryPoint]
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.buildPath,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]' // TODO: change this
          }
        }]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.template,
      path: paths.buildPath,
      filename: 'index.html',
      title: 'TEST TITLE'
    }),
    new CleanWebpackPlugin('build', {
      root: paths.rootPath
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: paths.srcPath,
    historyApiFallback: true,
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  }
};
