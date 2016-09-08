'use strict';

var typescript = require('rollup-plugin-typescript');
var sourcemaps = require('rollup-plugin-sourcemaps');
var pkg = require('./package.json');

var banner =
`/**
 * ng2d3 v${pkg.version} (https://github.com/swimlane/ng2d3)
 * Copyright 2016
 * Licensed under MIT
 */`;

module.exports = {
  entry: './src/ng2d3.ts',
  sourceMap: true,
  moduleId: 'ng2d3',
  moduleName: 'ng2d3',

  banner: banner,

  external: [
    'd3',
    'moment',
		'typescript',
    'core-js',
    '@angular/core',
    '@angular/common',
    '@angular/core',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'rxjs/Rx'
  ],

  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

    'rxjs/Subject': 'Rx',
    'rxjs/observable/PromiseObservable': 'Rx',
    'rxjs/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx',
    'rxjs/Rx': 'Rx',

    'moment': 'moment'
  },

  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    sourcemaps()
  ]
}
