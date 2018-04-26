import { resolve } from 'path'
import rollupResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript'
 
export default {
  input: resolve(__dirname, '../docs/index.js'),
  output: {
    file: resolve(__dirname, '../docs/app.js'),
    name: 'Rhyke',
    format: 'umd'
  },
  plugins: [
    rollupResolve(),
    commonjs(),
    postcss({
      extensions: [ '.less' ],
    }),
    typescript(),
    serve(resolve(__dirname, '../docs')),
    livereload()
  ]
}
