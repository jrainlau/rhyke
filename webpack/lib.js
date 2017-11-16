const webpack = require('webpack')
const { resolve } = require('path')
const webpackMerge = require('webpack-merge')
const basicConfig = require('./base')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = webpackMerge(basicConfig, {
  entry: resolve(__dirname, '../src/rhyke.js'),
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'index.js',
    library: 'Rhyke',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  plugins: [
    new cleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '../')
    }),
    new UglifyJSPlugin()
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
