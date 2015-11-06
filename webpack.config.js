var path = require('path')
var webpack = require('webpack');

module.exports = {
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.ts', '.js', '.json']
  },
  entry: {
    'app': [
      './node_modules/angular2/node_modules/@reactivex/rxjs',
      './node_modules/angular2/node_modules/zone.js',
      './node_modules/angular2/node_modules/reflect-metadata',
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },

      output: {
        comments: false,
        semicolons: true,
      },
    }),
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