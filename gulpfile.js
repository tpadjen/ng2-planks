var path = require('path');
var del = require('del');
var gulp = require('gulp');
var gutil = require("gulp-util");
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });

gulp.task('default', function() {
  runSequence(
    'dev:setup'
  );
});

gulp.task('watch', ['watch:src', 'watch:ts']);

gulp.task('dev:setup', function(callback) {
  runSequence(
    'dev:clean',
    'dev:build',
    callback
  );
});

gulp.task('dist:setup', function(callback) {
  runSequence(
    'dist:clean',
    'dist:build',
    callback
  );
});

gulp.task('dev:build', ['dev:copy:all', 'dev:compile:ts']);

gulp.task('dist:build', ['dist:copy:all', 'dist:webpack']);

var webpackConfig = require('./webpack.config');
var webpack = require('webpack');

function buildJS(options, callback) {
  var plugins = options.minify ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },

      output: {
        comments: false,
        semicolons: true,
      },
    }),
  ] : [];

  webpackConfig.plugins = plugins;

  webpack(webpackConfig, function(error, stats) {
    if(error) throw new gutil.PluginError("webpack", error);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      // version: false,
      // hash: false,
      // timings: false,
      chunks: false,
      assets: false,
      // chunkModules: false,
      // chunkOrigins: false,
      // cachedModules: false,
      // cachedAssets: false
    }));
    if (callback) callback();
  });
}


gulp.task('dist:webpack', function(callback) {
  buildJS({minify: false});
});


// copy both src and lib files, and inject lib paths into html
gulp.task('dev:copy:all', ['dev:copy:src', 'dev:copy:lib'], function(callback) {
  callback();
});

// copy both src and lib files, and inject lib paths into html
gulp.task('dist:copy:all', ['dist:copy:src', 'dist:copy:lib'], function(callback) {
  runSequence(
    'dist:copy:src',
    'dist:copy:lib',
    callback
  )
});

gulp.task('dev:clean', function() {
  return del(['build/dev/**/*']);
});

gulp.task('dist:clean', function() {
  return del(['build/dist/**/*']);
});

// copy src changes to dev
gulp.task('dev:copy:src', function() {
  var dest = 'build/dev'
  return gulp.src('src/**/!(*.ts)', {base: 'src'})
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('dist:copy:src', function() {
  var dest = 'build/dist'
  return gulp.src('src/**/!(*.ts)', {base: 'src'})
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

// var Builder = require('systemjs-builder');

// var builder = new Builder({
//   defaultJSExtensions: true,
//   paths: {
//     'ng2-bootstrap/ng2-bootstrap': './node_modules/ng2-bootstrap/ng2-bootstrap',
//     'angular2/*': './node_modules/angular2/*',
//     '@reactivex/*': './node_modules/@reactivex/*'
//   }
// });

// gulp.task('dev:build:ng2-bootstrap', function() {
//   return builder.bundle('ng2-bootstrap/ng2-bootstrap - angular2/*',
//                         path.join('build/dev/lib', 'ng2-bootstrap.js'));
// });

// convert lib node_modules path to dev path
// var fileFromPath = function(filePath, distType) {
//   return 'build/' + distType + '/' +
//       appConfig.js.path + '/' +
//       filePath.split('\\').pop().split('/').pop();
// };

// gulp.task('dev:inject:js', function() {
//   var target = gulp.src('./build/dev/index.html');
//   var sources = gulp.src(appConfig.js.files.map(function(file) {
//     return fileFromPath(file, 'dev');
//   }), {read: false});
//   return target.pipe(inject(sources, {relative: true}))
//     .pipe(gulp.dest('./build/dev'));
// })

// gulp.task('dist:inject:js', function() {
//   var target = gulp.src('./build/dist/index.html');
//   var sources = gulp.src(appConfig.js.files.map(function(file) {
//     return fileFromPath(file, 'dist');
//   }), {read: false});
//   return target.pipe(inject(sources, {relative: true}))
//     .pipe(gulp.dest('./build/dist'));
// })

gulp.task('watch:src', function () {
  var watcher = gulp.watch('src/**/!(*.ts)', ['dev:copy:all']);

  // handle file deletions
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      var filePathFromSrc = path.relative(path.resolve('src'), event.path);
      var destFilePath = path.resolve('build/dev', filePathFromSrc);
      del.sync(destFilePath);
    }
  });

  watcher.on('error', function(event) {
    runSequence('dev:setup');
  });
});

gulp.task('watch:ts', function () {
  var watcher = gulp.watch('src/**/*.ts', ['dev:compile:ts']);
});

gulp.task('dev:compile:ts', function() {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/dev'));
})