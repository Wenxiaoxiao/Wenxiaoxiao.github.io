'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack');
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const nodeSass = require('node-sass');
const sassLoader = require('sass-loader');
const sassResources = require('sass-resources-loader');
require('babel-polyfill')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['babel-polyfill','./src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'static': resolve('static'),
      '@static': resolve('static'), 
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: { 
              presets: ['es2015'],
              "ignore": [
                "../static/js/layer/**.js",
                "../static/js/**.min.js",
                "../static/dll/**.js",
              ],
            },
            
          }
        ],
        
        include: [resolve('src'), resolve('static'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.scss$/,
        include: '/src/',
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|woff|svg|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('iconfont/[name].[ext]')
        }
      }
    ]
  },
  plugins:[
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/dll/vendor-mainfest.json'), // 指向生成的json文件
      // name: '[name]?[hash:6]'
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
}
