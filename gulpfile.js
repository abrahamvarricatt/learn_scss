const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');


// PostCSS plugins
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

var express = require('express');
const config = require('./config');


// Source file locations
var HTML_SOURCES = ['src/html/*.html'];
var SCSS_SOURCES = ['src/styles/**/*.scss'];
var FONT_SOURCES = ['src/styles/fonts/*'];

gulp.task('html', function() {
  return gulp
    .src(HTML_SOURCES)
    .pipe(gulp.dest('docs'));
});

gulp.task('sass-stuff', function() {
  return gulp
    .src(SCSS_SOURCES)
    // Initialize sourcemaps
    .pipe(
      sourcemaps.init()
    )
    // SASS compilation
    .pipe(
      sass(
        {outputStyle: 'expanded'}
      ).on('error', sass.logError)
    )
    // PostCSS tasks
    .pipe(
      postcss([
        flexbugsFixes(),
        autoprefixer({
          browsers: config.css.browsers
        }),
      ])
    )
    // Write sourcemaps
    .pipe(
      sourcemaps.write()
    )
    .pipe(gulp.dest('docs/styles'));
});

gulp.task('fonts', function() {
  return gulp
    .src(FONT_SOURCES)
    .pipe(gulp.dest('docs/styles/fonts'));
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

gulp.task('styles', ['fonts', 'sass-stuff']);

gulp.task('build', ['html', 'styles']);

gulp.task('default', ['build', 'watch', 'server']);
