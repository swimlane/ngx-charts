var path = require('path');
var webpack = require('webpack');

var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var ENV = process.env.NODE_ENV;
var IS_PRODUCTION = ENV === 'production';
var VERSION = JSON.stringify(require('./package.json').version);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

var banner =
`/**
 * ng2d3 v${VERSION} (https://github.com/swimlane/ng2d3)
 * Copyright 2016
 * Licensed under MIT
 */`;

 function webpackConfig(options = {}) {

   var config = {
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
      modules: [
        root('demo'),
        'node_modules'
      ]
    },

    devtool: 'cheap-module-source-map',

    module: {
      exprContextCritical: false,
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map',
          exclude: /(node_modules)/
        },
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint',
          exclude: /(node_modules|release|dist)/
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          exclude: /(node_modules)/
        },
        {
          test: /\.scss$/,
          loaders: [
            'style',
            'css?sourceMap',
            'postcss?sourceMap',
            'sass?sourceMap'
          ]
        }
      ]
    },

    entry: {
      'app': './demo/bootstrap.ts',
      'libs': './demo/libs.ts'
    },

    devServer: {
      outputPath: root('dist'),
      watchOptions: {
        poll: true
      },
      port: 9999,
      stats: {
        modules: false,
        cached: false,
        colors: true,
        chunks: false
      }
    },

    output: {
      path: root('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          context: root(),
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'demo'
          },
          postcss: function() {
            return [ autoprefixer ];
          }
        }
      }),

      // https://github.com/angular/angular/issues/11580#issuecomment-246880731
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('src') // location of your src
      ),

      new webpack.DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'IS_PRODUCTION': IS_PRODUCTION,
        'APP_VERSION': VERSION
      })
    ]
  };

  if(IS_PRODUCTION) {
    config.output.path = root('release');

    config.output.libraryTarget = 'umd';
    config.output.library = 'ng2d3';
    config.output.umdNamedDefine = true;

    config.entry = {
      'ng2d3': './src/ng2d3.ts'
    };

    config.externals = {
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic',
      '@angular/platform-browser': '@angular/platform-browser',
      '@angular/core': '@angular/core',
      '@angular/common': '@angular/common',
      '@angular/forms': '@angular/forms',
      'core-js': 'core-js',
      'core-js/es6': 'core-js/es6',
      'core-js/es7/reflect': 'core-js/es7/reflect',
      'd3': 'd3',
      'rxjs': 'rxjs',
      'rxjs/Rx': 'rxjs/Rx',
      'rxjs/Subject': 'rxjs/Subject',
      'rxjs/Subscription': 'rxjs/Subscription',
      'rxjs/observable/PromiseObservable': 'rxjs/observable/PromiseObservable',
      'rxjs/operator/toPromise': 'rxjs/operator/toPromise',
      'rxjs/Observable': 'rxjs/Observable',
      'zone.js/dist/zone': 'zone.js/dist/zone',
      'moment': 'moment'
    };

    config.plugins.push(new webpack.BannerPlugin({
      banner: banner,
      raw: true,
      entryOnly: true
    }));

    config.plugins.push(new CleanWebpackPlugin(['release'], {
      root: root(),
      verbose: false,
      dry: false
    }));
  } else {
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: ['libs'],
      minChunks: Infinity
    }));

    config.plugins.push(new WebpackNotifierPlugin({
      excludeWarnings: true
    }));

    config.plugins.push(new CleanWebpackPlugin(['dist'], {
      root: root(),
      verbose: false,
      dry: false
    }));

    config.plugins.push(new HtmlWebpackPlugin({
      template: 'demo/index.html',
      chunksSortMode: 'dependency'
    }));
  }

  return config;
};

module.exports = webpackConfig;
