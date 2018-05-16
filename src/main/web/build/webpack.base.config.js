const path = require('path');
const os = require('os');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    main: '@/main',
    'vender-base': '@/vendors/vendors.base.js',
    'vender-exten': '@/vendors/vendors.exten.js'
  },
  output: {
    path: path.resolve(__dirname, '../../resources/static/dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happybabel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['autoprefixer-loader', 'stylus-loader'],
          fallback: 'style-loader'
        }),
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HappyPack({//通过多进程模型，来加速代码构建
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: true
    })
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('../src'),
    }
  }
};
