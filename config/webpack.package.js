const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ENV, dir, APP_VERSION } = require('./helpers');
// const ngtools = require('@ngtools/webpack');

const banner =
`/**
 * ngx-charts v${APP_VERSION} (https://github.com/swimlane/ngx-charts)
 * Copyright 2016
 * Licensed under MIT
 */`;

module.exports = function(env) {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader?sourceMap',
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap'
          ]
        }
      ]
    },
    entry: {
      'index': './src/index.ts'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'ngx-charts',
      umdNamedDefine: true
    },
    externals: {
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic',
      '@angular/platform-browser': '@angular/platform-browser',
      '@angular/core': '@angular/core',
      '@angular/common': '@angular/common',
      '@angular/forms': '@angular/forms',
      'core-js': 'core-js',
      'core-js/es6': 'core-js/es6',
      'core-js/es7/reflect': 'core-js/es7/reflect',
      'd3-array': 'd3-array',
      'd3-brush': 'd3-brush',
      'd3-color': 'd3-color',
      'd3-force': 'd3-force',
      'd3-format': 'd3-format',
      'd3-interpolate': 'd3-interpolate',
      'd3-scale': 'd3-scale',
      'd3-selection': 'd3-selection',
      'd3-shape': 'd3-shape',
      'd3-hierarchy': 'd3-hierarchy',
      'rxjs': 'rxjs',
      'rxjs/Rx': 'rxjs/Rx',
      'rxjs/Subject': 'rxjs/Subject',
      'rxjs/Subscription': 'rxjs/Subscription',
      'rxjs/observable/PromiseObservable': 'rxjs/observable/PromiseObservable',
      'rxjs/operator/toPromise': 'rxjs/operator/toPromise',
      'rxjs/Observable': 'rxjs/Observable',
      'zone.js/dist/zone': 'zone.js/dist/zone',
      'moment': 'moment'
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      }),
      /*
      new ngtools.AotPlugin({
        tsConfigPath: 'tsconfig-aot.json',
        baseDir: dir()
        entryModule: dir('ngx-charts.ts') + '#NgxChartsModule'
      }),
      new CleanWebpackPlugin(['release'], {
        root: dir(),
        verbose: false,
        dry: false
      })
      */
    ]
  });

};
