// Karma configuration
// Generated on Sun Oct 25 2015 16:47:37 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // paths loaded by Karma
      {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
      {pattern: 'src/app/lib/firebase-2.3.1.js', included: true, watched: true},
      // {pattern: 'karma-test-shim.js', included: true, watched: true},
      // {pattern: 'src/test/matchers.js', included: true, watched: true},

      // load test helper first
      // {pattern: 'src/app/test/helper.ts', included: true, watched: true},

      // {pattern: 'build/dev/**/*.js', included: false, watched: true},

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      {pattern: 'src/app/**/*.html', included: false, watched: true},
      {pattern: 'src/app/**/*.css', included: false, watched: true},

      // all tests loaded with webpack requires
      {pattern: 'spec.bundle.js', included: true, watched: false},

      // paths to support debugging with source maps in dev tools and watching
      {pattern: 'src/app/**/*.ts', included: false, watched: true},
      // {pattern: 'build/dev/**/*.js.map', included: false, watched: false}
    ],

    // proxied base paths
    proxies: {
        // required for component assests fetched by Angular's compiler
        "/app/": "/base/src/app/",
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec.bundle.js':  ['webpack']
    },
    webpack: {
      resolve: {
        extensions: ['', '.ts', '.js']
      },
      module: {
        loaders: [
          // Typescript
          { test: /\.ts$/,      loader: 'ts' },
          // Styles
          { test: /\.css$/,     loader: 'raw' },
          // Templates
          { test: /\.html$/,    loader: 'raw' }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'verbose'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
