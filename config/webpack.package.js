const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const { ENV, dir, APP_VERSION } = require('./helpers');
// const ngtools = require('@ngtools/webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const externalLibs = require('./external-libs');

const banner = `/**
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
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        }
      ]
    },
    entry: {
      index: './src/index.ts'
    },
    output: {
      path: dir('release'),
      libraryTarget: 'umd',
      library: 'ngx-charts',
      umdNamedDefine: true
    },
    externals: externalLibs.reduce((externals, libraryName) => {
      externals[libraryName] = libraryName;
      return externals;
    }, {}),
    plugins: [
      new CheckerPlugin(),
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      })
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
