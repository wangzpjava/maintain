const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function (err, fd) {//这里路径应该是以package.json为主
  const buf = 'export default "development";';
  fs.write(fd, buf, 0, buf.length, 0);
});

module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vender-exten', 'vender-base'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: 'maintian' + package.version,
      filename: '../index.html',
      template: './src/template/index.ejs',
      inject: false
    }),
    new CopyWebpackPlugin(
      [
        {
          from: 'src/img'
        }
      ]//, {ignore: []}
    )
  ]
});
