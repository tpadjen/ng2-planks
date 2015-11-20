var path = require('path')
var webpack = require('webpack');
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var CommonsChunkPlugin   = webpack.optimize.CommonsChunkPlugin;
var DedupePlugin   = webpack.optimize.DedupePlugin;

var autoprefixer = require('autoprefixer');

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
      { test: /\.css$/,     loader: 'to-string!css-loader!postcss-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },

      // Templates
      { test: /\.html$/,    loader: 'raw!html-minify' }

    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/
    ]
  },
  'html-minify-loader': {
    empty: true, // KEEP empty attributes
  },
  postcss: function() {
    return [autoprefixer]
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