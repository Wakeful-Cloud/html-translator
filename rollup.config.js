  
/**
 * @fileoverview Rollup build config
 */

//Imports
import _ from 'lodash';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';

//Global build config
const global = {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    json(),
    typescript(),
    terser()
  ]
};

//CJS
const cjs = _.merge({
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'default'
    }
  ],
  external: [
    'node-html-parser',
    'table'
  ]
}, global);
cjs.plugins.unshift(resolve({
  browser: false,
  preferBuiltins: true
}));

//ES
const es = _.merge({
  output: [
    {
      dir: 'dist/es',
      format: 'es'
    }
  ]
}, global);
es.plugins.unshift(resolve({
  browser: true,
  preferBuiltins: false
}));

//Export
export default [cjs, es];