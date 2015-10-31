var path = require('path');
var del = require('del');
var gulp = require('gulp');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });

var appConfig = require('./app-config.json');
var inject = require('gulp-inject');

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

gulp.task('dev:build', ['dev:copy:all', 'dev:compile:ts']);

// copy both src and vendor files, and inject vendor paths into html
gulp.task('dev:copy:all', ['dev:copy:src', 'dev:copy:vendor'], function(callback) {
  runSequence(
    'dev:inject:js',
    callback
  )
});

gulp.task('dev:clean', function() {
  return del(['build/dev/**/*']);
});

// copy src changes to dev
gulp.task('dev:copy:src', function() {
  var dest = 'build/dev'
  return gulp.src('src/**/!(*.ts)', {base: 'src'})
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

// copy vendor js files to dev
gulp.task('dev:copy:vendor', function() {
  var dest = 'build/dev/vendor'
  return gulp.src(appConfig.js.files)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

// convert vendor node_modules path to dev path
var fileFromPath = function(filePath) {
  return 'build/dev/' + appConfig.js.path + '/' + filePath.split('\\').pop().split('/').pop();
};

gulp.task('dev:inject:js', function() {
  var target = gulp.src('./build/dev/index.html');
  var sources = gulp.src(appConfig.js.files.map(fileFromPath), {read: false});
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./build/dev'));
})

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