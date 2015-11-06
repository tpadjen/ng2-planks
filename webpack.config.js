var path = require('path')

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
    path: path.resolve(__dirname, 'build', 'dist', 'app'),
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
      {
        test: /\.ts$/, loader: 'ts',
        exclude: [
          /\.spec\.ts$/,
          /\.e2e\.ts$/,
          /test/,
          /helper/
        ]
      }
    ]
  },
  devServer: {
    contentBase: './build/dev',
    historyApiFallback: true
  }
}