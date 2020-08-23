//webpack.dll.conf.js
process.env.NODE_ENV = 'production'

const path = require('path');
var utils = require('./utils')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack');

//vue项目默认有一个static目录.我就把导出目录放在了static/dll/目录下
const srcPath = path.join(__dirname, '../static/dll/');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }
function resolveResouce(name) {
    return path.resolve(__dirname, '../static/' + name);
  }
//需要编译的模块
const vendors = [
    'babel-polyfill',
    'es6-promise',
    'vue/dist/vue.esm.js',
    'axios',
    'lodash',
    'vue-router',
    'vue-wechat-title',
    'vue-lazyload',
    resolveResouce('js/flexible.js'),
    'mint-ui',
    'mint-ui/lib/style.css',
];

webpackConfig = {
    entry: {
        vendor: vendors
    },
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: { 
                  presets: ['es2015']
                },
                include: [resolve('src'), resolve('static')]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    publicPath: './',
                    limit: 1000,
                    name: 'fonts/[name].[ext]'
                }
            }]
    },
    output: {
        path: srcPath, // 输出的路径
        filename: '[name].dll.js', // 输出的文件，将会根据entry命名为vendor.dll.js
        library: '[name]_library' // 暴露出的全局变量名
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].dll.css'
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({ // uglifjs压缩
            compress: {
                warnings: false
            }
        }),
        new webpack.DllPlugin({
            path: path.join(srcPath, '[name]-mainfest.json'), // 描述依赖对应关系的json文件
            name: '[name]_library',
            context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
        })
    ]
}

if (process.env.npm_config_report) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;