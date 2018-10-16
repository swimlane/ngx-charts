'use strict';

const ts = require('rollup-plugin-typescript');
const angular = require('rollup-plugin-angular');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sass = require('node-sass');
const CleanCSS = require('clean-css');
const { minify } = require('html-minifier');
const externalLibs = require('./external-libs');

const cssmin = new CleanCSS();
const htmlMinOpts = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true
};

module.exports = {
  input: './src/index.ts',
  output: {
    file: 'release/esm.js',
    format: 'esm'
  },
  external: externalLibs,
  plugins: [
    resolve({ modulesOnly: true }),
    commonjs(),
    angular({
      replace: false,
      preprocessors: {
        template: template => minify(template, htmlMinOpts),
        style: scss => {
          const { css } = sass.renderSync({ data: scss });
          return cssmin.minify(css).styles;
        }
      }
    }),
    ts({ target: 'ES5', module: 'ES6' })
  ]
};
