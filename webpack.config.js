var path = require('path')
var webpack = require('webpack');
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var CommonsChunkPlugin   = webpack.optimize.CommonsChunkPlugin;
var DedupePlugin   = webpack.optimize.DedupePlugin;

module.exports = {
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.ts', '.js', '.json'],
    alias: {
      'rx': '@reactivex/rxjs'
    }
  },
  entry: {
    'ng2': [
      './node_modules/angular2/node_modules/@reactivex/rxjs',
      './node_modules/angular2/node_modules/zone.js',
      './node_modules/angular2/node_modules/reflect-metadata',
      'angular2/angular2',
      'angular2/core',
      'angular2/router'
    ],
    'app': [
      './src/app/bootstrap.ts'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build', 'app'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },
  externals: {
    'Firebase': 'firebase'
  },
  devtool: 'source-map',
  module: {
    loaders: [

      // Typescript
      {
        test: /\.ts$/, loader: 'ts',
        exclude: [
          /\.spec\.ts$/,
          /\.e2e\.ts$/,
          /test/,
          /helper/
        ]
      },

      // Styles
      { test: /\.css$/,     loader: 'raw' }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/
    ]
  },
  plugins: [
    new OccurenceOrderPlugin(),
    new DedupePlugin(),
    new CommonsChunkPlugin({
      name: 'ng2',
      minChunks: Infinity,
      filename: 'ng2.js'
    }),
    new CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    })
  ],
  // rewrite file imports
  node: {
    crypto: false,
    __filename: true
  },
  devServer: {
    hot: true,
    contentBase: './src',
    publicPath: '/app',
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
      // assets: false
    }
  }
}