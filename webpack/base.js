const webpack = require('webpack')
const { resolve } = require('path')

const basicConfig = {
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

module.exports = basicConfig