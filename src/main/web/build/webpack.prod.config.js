const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const os = require('os');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function (err, fd) { //这里路径应该是以package.json为主
  const buf = 'export default "production";';
  fs.write(fd, buf, 0, buf.length, 0);
});

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '/frontend-app/dist/',  // 修改为你的服务器域名
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  plugins: [
    new cleanWebpackPlugin(['./resources/static/*'], { //每次清空之前build
      root: path.resolve(__dirname, '../../') //这里是根路径。所以要保证上面的文件路径在这个根路径之内
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendors',
      // filename: 'vendors.[hash].js'
      name: ['vender-exten', 'vender-base'],
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Instrument',// + package.version,
      filename: '../index.html',
      template: './src/template/index.ejs',
      inject: false
    })
  ],
  externals:{ //避免以下组件打包进组件库
    'vue': 'Vue',
    'iview': 'iview',
    'moment': 'moment'
  }
});
