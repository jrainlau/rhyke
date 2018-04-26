import { resolve } from 'path'
import rollupResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
 
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
    babel({
      exclude: 'node_modules/**'
    }),
    serve(resolve(__dirname, '../docs')),
    livereload()
  ]
}
