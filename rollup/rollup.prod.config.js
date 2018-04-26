import { resolve } from 'path'
import uglify from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript'

export default {
  input: resolve(__dirname, '../src/rhyke.new.ts'),
  output: {
    file: resolve(__dirname, '../dist/index.js'),
    name: 'Rhyke',
    format: 'umd'
  },
  plugins: [
    typescript(),
    uglify()
  ]
}
