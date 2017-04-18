const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { ENV, IS_PRODUCTION, IS_DEV, APP_VERSION, TRAVIS, dir } = require('./helpers');

module.exports = function(options = {}) {
  return {
    context: dir(),
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
      modules: [
        'node_modules',
        dir('src'),
        dir('demo')
      ]
    },
    output: {
      path: dir('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js',
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
    },
    performance: {
      hints: false
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg|gif)$/,
          loader: 'url-loader',
          query: {
            limit: '100000'
          }
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        {
          test: /\.css/,
          loaders: [
            ExtractTextPlugin.extract({
              fallbackLoader: "style-loader",
              loader: 'css-loader'
            }),
            'to-string-loader',
            'css-loader',
            'postcss-loader?sourceMap',
          ]
        },
        {
          test: /\.scss$/,
          loaders: [
            ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader'
            }),
            'to-string-loader',
            'css-loader',
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap'
          ]
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        ENV,
        IS_PRODUCTION,
        APP_VERSION,
        IS_DEV,
        HMR: options.HMR,
        TRAVIS
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: dir(),
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },
          postcss: function() {
            return [ autoprefixer ];
          }
        }
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      })
    ]
  };

};
