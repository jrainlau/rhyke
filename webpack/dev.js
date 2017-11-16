const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const webpackMerge = require('webpack-merge')
const basicConfig = require('./base')

const webpackConfig = webpackMerge(basicConfig, {
  entry: {
    'app': ['webpack-dev-server/client?http://0.0.0.0:9000/', 'webpack/hot/only-dev-server', resolve(__dirname, '../index.js')]
  },
  output: {
    path: resolve('dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../htmlTpl.tpl'),
      inject: true,
      chunks: ['app']
    })
  ]
})

const compiler = webpack(webpackConfig)

const devServer = new webpackDevServer(compiler, {
  contentBase: resolve(__dirname, 'dist'),
  disableHostCheck: true,
  hot: true,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
})

devServer.listen(9000, 'localhost', () => {
  console.log('Dev server listening at localhost:9000')
})
