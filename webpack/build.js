const webpack = require('webpack')
const { resolve } = require('path')
const webpackMerge = require('webpack-merge')
const basicConfig = require('./base')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = webpackMerge(basicConfig, {
  entry: {
    './js/app': resolve(__dirname, '../index.js')
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:4].js'
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new cleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '../')
    }),
    new UglifyJSPlugin(),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, '../htmlTpl.tpl'),
      inject: true,
      chunks: ['./js/app']
    })
  ]
})

const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
  if (err) {
    throw new Error(err)
  }
  console.log(stats.toString({
    chunks: false,
    colors: true
  }))
})
