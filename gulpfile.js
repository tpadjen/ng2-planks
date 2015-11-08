var argv = require('yargs').argv;
var path = require('path');
var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var gutil = require("gulp-util");
var runSequence = require('run-sequence');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var devWebpackConfig = Object.create(webpackConfig);


var PRO_ENV = argv.pro;
var DEV_ENV = !PRO_ENV;

var SOURCE = "src";
var BUILD_DEST = "build/dev";
var BUILD_DEST_PRO = "build/dist";

// if (argv.pro) {
//   BUILD_DEST = "build/dist";
// }



/**
 * Default
 */

// gulp.task('default', ['dev:webpack']);


/**
 * Production Build
 */


gulp.task('build', function(callback) {
 runSequence(
   'clean',
   'copy',
   callback
 );
});

gulp.task('clean', function() {
  return del([BUILD_DEST + '/**/*']);
});

gulp.task('clean:pro', function() {
  return del([BUILD_DEST_PRO + '/**/*']);
});

gulp.task('copy', function() {
  return gulp.src(SOURCE + '/"**/*.*"', {base: SOURCE})
          .pipe(gulp.dest(BUILD_DEST));
});

gulp.task('copy:pro', function() {
  var includes = [
    '**/*.{jpg,jpeg,png,gif,svg}',  // images
    'index.html',                   // index
    'styles/**/*.*',                // styles
    'app/lib/**/*.*'                // js
  ];

  var  files = '/' + "{" + includes.join(',') + '}';
  console.log(SOURCE + files);

  return gulp.src(SOURCE + files, {base: SOURCE})
          .pipe(gulp.dest(BUILD_DEST_PRO));
});

var tsProject = ts.createProject({
  "target": "ES5",
  "module": "system",
  "moduleResolution": "node",
  "sourceMap": true,
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "removeComments": false,
  "noImplicitAny": false
});

gulp.task('ts', function() {
  return gulp.src('src/**/*.ts')
          .pipe(ts(tsProject))
          .pipe(gulpif(PRO_ENV, uglify()))
          .pipe(gulp.dest(BUILD_DEST));
});



// gulp.task('dist:webpack', function(callback) {
//   webpackConfig.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false,
//       },

//       output: {
//         comments: false,
//         semicolons: true,
//       },
//     })
//   )

//   // add hash to app bundle
//   webpackConfig.plugins.push(
//     function () {
//       this.plugin("done", function (stats) {
//         var replaceInFile = function (filePath, toReplace, replacement) {
//           var replacer = function (match) {
//             var message = 'Replacing in ' + filePath +': ' + match + ' => ' + replacement;
//             gutil.log("[hashquery]", gutil.colors.cyan(message));
//             return replacement;
//           };
//           var str = fs.readFileSync(filePath, 'utf8');
//           var out = str.replace(new RegExp(toReplace, 'g'), replacer);
//           fs.writeFileSync(filePath, out);
//         };

//         stats.toJson().chunks.forEach(function(chunk) {
//           replaceInFile(path.join(BUILD_DEST, 'index.html'),
//             chunk.files[0], // main js file, not source map
//             chunk.files[0] + '?v=' + chunk.hash
//           );
//         })
//       });
//     }
//   );

//   webpack(webpackConfig, function(err, stats) {
//     if(err) throw new gutil.PluginError("webpack", err);
//       gutil.log("[webpack]", stats.toString({
//         colors: true,
//         chunks: false
//       }));
//       if (callback) callback();
//   });

// });


/**
 * Development Server
 */

// gulp.task('dev:webpack', function(callback) {
//   // The script refreshing the browser on non hot updates
//   webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080');

//   // For hot style updates
//   webpackConfig.entry.app.unshift('webpack/hot/dev-server');
//   webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

//   // source maps
//   webpackConfig.devtool = "eval";

//   var compiler = webpack(webpackConfig);

//   new WebpackDevServer(compiler, devWebpackConfig.devServer
//   ).listen(8080, "localhost", function(err) {
//     if(err) throw new gutil.PluginError("webpack-dev-server", err);
//     // Server listening
//     gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
//   });
// });


/**
 * Build SystemJS compatible bundles
 */

var Builder = require('systemjs-builder');

var builder = new Builder({
  defaultJSExtensions: true,
  paths: {
    'ng2-bootstrap/ng2-bootstrap': './node_modules/ng2-bootstrap/ng2-bootstrap',
    'angular2/*': './node_modules/angular2/*',
    '@reactivex/*': './node_modules/@reactivex/*'
  }
});

gulp.task('build:ng2-bootstrap', function() {
  return builder.bundle('ng2-bootstrap/ng2-bootstrap - angular2/*',
          path.join(SOURCE + '/app/lib', 'ng2-bootstrap.js'));
});


var proBuilder = new Builder({
  defaultJSExtensions: true
});

gulp.task('build:dev', function(callback) {
  runSequence(
    'clean',
    'copy',
    'ts',
    callback
  )
});

gulp.task('build', function(callback) {
  runSequence(
    'build:dev',
    'clean:pro',
    'bundle',
    'copy:pro',
    callback
  );
});

gulp.task('bundle', ['deps'], function() {
  return builder.bundle('build/dev/app/bootstrap.js - build/dev/deps.js',
            'build/dist/app/bootstrap.js',
            { minify: true, sourceMaps: true });
});

gulp.task('deps', function() {
  return builder.bundle('build/dev/app/**/* - [build/dev/app/**/*]',
            'build/dev/deps.js');
});