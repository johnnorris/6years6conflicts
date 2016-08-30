'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucks = require('gulp-nunjucks-render');
var imageResize = require('gulp-image-resize');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
    return gulp.src('./src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/css/'));
});



gulp.task('nunjucks', function() {
  return gulp.src('./src/templates/pages/**/*.nunjucks')
  // Renders template with nunjucks
  .pipe(nunjucks({
      path: ['./src/templates']
    }))
  .pipe(htmlmin({collapseWhitespace: true}))
  // output files in app folder
  .pipe(gulp.dest('./public'));
});



gulp.task('js', function () {
  gulp.src('src/js/script.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest('./public/js/'))

  return gulp.src('./src/js/lib/*.js', {base: './src/js/lib/'})
    .pipe(gulp.dest('./public/js/lib/'));
});



gulp.task('video', function () {
  return gulp.src('./src/video/*')
    .pipe(gulp.dest('./public/video/'));
});



gulp.task('img', function () {
  gulp.src('./src/img/photomonth.png')
    .pipe(imageResize({
      width : 300
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/'));

  gulp.src('./src/img/conflicts/*')
    .pipe(imageResize({
      width : 600
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/conflicts/'));

  return gulp.src('./src/img/conflicts/*')
    .pipe(imageResize({
      width : 1500
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/conflicts/hero/'));
});



gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/templates/**/*.nunjucks', ['nunjucks']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/img/*', ['img']);
  gulp.watch('./src/video/*', ['video']);
});

gulp.task('default', ['sass', 'nunjucks', 'js', 'img', 'video']);
