var gulp = require('gulp');
var sass = require('gulp-sass');

// Source file locations
var HTML_SOURCES = ['src/html/*.html'];
var SCSS_SOURCES = ['src/styles/*.scss'];

gulp.task('html', function() {
  return gulp
    .src(HTML_SOURCES)
    .pipe(gulp.dest('docs'));
});

gulp.task('styles', function() {
  return gulp
    .src(SCSS_SOURCES)
    .pipe(sass())
    .pipe(gulp.dest('docs/styles'));
});

gulp.task('watch', function() {
  gulp.watch(HTML_SOURCES, ['html']);
  gulp.watch(SCSS_SOURCES, ['styles']);
});

gulp.task('default', ['html', 'styles']);
