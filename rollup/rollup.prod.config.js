import { resolve } from 'path'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import eslint from 'rollup-plugin-eslint'

export default {
  input: resolve(__dirname, '../src/rhyke.js'),
  output: {
    file: resolve(__dirname, '../dist/index.js'),
    name: 'Rhyke',
    format: 'umd'
  },
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}
