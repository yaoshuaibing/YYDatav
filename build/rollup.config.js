import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
const resolve = require('rollup-plugin-node-resolve')
import babel from 'rollup-plugin-babel'
export default {
  input: 'src/App.vue',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name:'vue-rollup-conponent-template'

  },
  plugins: [
    resolve(),
    commonjs(),
    vue(),
    babel({
      exclude: 'node_modules/**'
    }),
  ],
  external: ['Vue']

}