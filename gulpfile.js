'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucks = require('gulp-nunjucks-render');
var imageResize = require('gulp-image-resize');
const babel = require('gulp-babel');

gulp.task('sass', function() {
    return gulp.src('./src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('nunjucks', function() {
  return gulp.src('./src/templates/pages/**/*.nunjucks')
  // Renders template with nunjucks
  .pipe(nunjucks({
      path: ['./src/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('./public'));
});

gulp.task('js', function () {
  gulp.src('src/js/script.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/js/'))

  return gulp.src('./src/js/lib/*.js', {base: './src/js/lib/'})
    .pipe(gulp.dest('./public/js/lib/'));
});

gulp.task('img', function () {
  gulp.src('./src/img/*')
    .pipe(imageResize({
      width : 600
    }))
    .pipe(gulp.dest('./public/img/'));

  return gulp.src('./src/img/*')
    .pipe(imageResize({
      width : 1500
    }))
    .pipe(gulp.dest('./public/img/hero/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/templates/**/*.nunjucks', ['nunjucks']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/img/*', ['img']);
});

gulp.task('default', ['sass', 'nunjucks', 'js', 'img']);
