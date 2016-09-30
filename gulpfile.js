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
var favicons = require('gulp-favicons');

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
  gulp.src('./src/img/*.*')
    .pipe(imageResize({
      height: 140
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/'));

  gulp.src('./src/img/conflicts/*')
    .pipe(imageResize({
      width : 600
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/conflicts/'));

  gulp.src('./src/img/conflicts/*')
    .pipe(imageResize({
      width : 1500
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/conflicts/hero/'));

  return gulp.src('./src/img/conflicts/*')
    .pipe(imageResize({
      width : 3000
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/conflicts/hero@2x/'));
});


gulp.task('favicons', function () {
  return gulp.src('src/img/logo.png').pipe(favicons({
    appName: 'Six Years Six Conflicts',
    appDescription: 'Six Years Six Conflicts is an exhibition coming 21st October to 30th October in London.',
    developerName: 'John Norris',
    developerURL: 'http://www.johntnorris.co.uk/',
    background: '#FF0000',
    path: '/favicons/',
    url: 'http://www.6years6conflicts.co.uk/',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '/?homescreen=1',
    version: 1.0,
    logging: false,
    online: false,
    html: 'config.html',
    pipeHTML: true,
    replace: true
  }))
  .pipe(gulp.dest("./public/favicons/"));
});



gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/templates/**/*.nunjucks', ['nunjucks']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/img/*', ['img']);
  gulp.watch('./src/video/*', ['video']);
});

gulp.task('default', ['sass', 'nunjucks', 'js', 'img', 'video', 'favicons']);
