var gulp = require('gulp');
var sass = require('gulp-sass');
var express = require('express');

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
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('docs/styles'));
});

gulp.task('watch', function() {
  gulp.watch(HTML_SOURCES, ['html']);
  gulp.watch(SCSS_SOURCES, ['styles']);
});

var server;
gulp.task('server', function() {
  server = express();
  server.use(express.static('docs'));
  server.listen(8000);
});

gulp.task('build', ['html', 'styles']);

gulp.task('default', ['build', 'watch', 'server']);
