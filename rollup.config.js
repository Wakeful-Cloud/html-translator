  
/**
 * @fileoverview Rollup build config
 */

//Imports
import _ from 'lodash';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

//External dependencies
const external = Object.keys(pkg.dependencies);

//Global build config
const global = {
  external,
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true
    })
  ]
};

//CJS
const cjs = _.merge({
  output: [
    {
      file: 'dist/cjs.js',
      format: 'cjs',
      exports: 'default'
    }
  ],
  external: [
    'node-html-parser',
    'table'
  ]
}, global);

//ES
const es = _.merge({
  output: [
    {
      file: 'dist/es.js',
      format: 'es'
    }
  ]
}, global);

//Export
export default [cjs, es];