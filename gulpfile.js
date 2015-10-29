var path = require('path');
var del = require('del');
var gulp = require('gulp');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });

gulp.task('default', function() {
  runSequence('watch');
});

gulp.task('watch', function(callback) {
  runSequence(
    'setup:dev',
    ['watch:src', 'watch:ts'],
    callback
  )
});

gulp.task('setup:dev', function(callback) {
  runSequence(
    'clean:dev',
    ['copy:src', 'compile:ts'],
    callback
  );
})

gulp.task('clean:dev', function() {
  return del(['build/dev/**/*']);
});

gulp.task('copy:src', function() {
  var dest = 'build/dev'
  return gulp.src('src/**/!(*.ts)', {base: 'src'})
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('watch:src', function () {
  var watcher = gulp.watch('src/**/!(*.ts)', ['copy:src']);

  // handle file deletions
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      var filePathFromSrc = path.relative(path.resolve('src'), event.path);
      var destFilePath = path.resolve('build/dev', filePathFromSrc);
      del.sync(destFilePath);
    }
  });
});

gulp.task('watch:ts', function () {
  var watcher = gulp.watch('src/**/*.ts', ['compile:ts']);
});

gulp.task('compile:ts', function() {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/dev'));
})