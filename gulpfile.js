var path = require('path');
var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var gutil = require("gulp-util");
var runSequence = require('run-sequence');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var devWebpackConfig = Object.create(webpackConfig);


/**
 * Default
 */

gulp.task('default', ['dev:webpack']);


/**
 * Production Build
 */

var SOURCE = "src";
var BUILD_DEST = "build";

gulp.task('build', function(callback) {
 runSequence(
   'dist:clean',
   'dist:copy',
   'dist:webpack',
   callback
 );
});

gulp.task('dist:clean', function() {
  return del([BUILD_DEST + '/**/*']);
});

gulp.task('dist:copy', function() {
  var includes = [
    '**/*.{jpg,jpeg,png,gif,svg}',  // images
    'index.html',                   // index
    'styles/**/*.*',                // styles
    'app/lib/**/*.*'                // js
  ]
  var files = '/{' + includes.join(',') + '}';

  return gulp.src(SOURCE + files, {base: SOURCE})
          .pipe(gulp.dest(BUILD_DEST));
});

gulp.task('dist:webpack', function(callback) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },

      output: {
        comments: false,
        semicolons: true,
      },
    })
  )

  // add hash to app bundle
  webpackConfig.plugins.push(
    function () {
      this.plugin("done", function (stats) {
        var replaceInFile = function (filePath, toReplace, replacement) {
          var replacer = function (match) {
            var message = 'Replacing in ' + filePath +': ' + match + ' => ' + replacement;
            gutil.log("[hashquery]", gutil.colors.cyan(message));
            return replacement;
          };
          var str = fs.readFileSync(filePath, 'utf8');
          var out = str.replace(new RegExp(toReplace, 'g'), replacer);
          fs.writeFileSync(filePath, out);
        };

        stats.toJson().chunks.forEach(function(chunk) {
          replaceInFile(path.join(BUILD_DEST, 'index.html'),
            chunk.files[0], // main js file, not source map
            chunk.files[0] + '?v=' + chunk.hash
          );
        })
      });
    }
  );

  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
        colors: true,
        chunks: false
      }));
      if (callback) callback();
  });

});


/**
 * Development Server
 */

gulp.task('dev:webpack', function(callback) {
  // The script refreshing the browser on non hot updates
  webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080');

  // For hot style updates
  webpackConfig.entry.app.unshift('webpack/hot/dev-server');
  webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

  // source maps
  webpackConfig.devtool = "eval";

  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, devWebpackConfig.devServer
  ).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});