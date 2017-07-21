'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

gulp.task('server' , function () {
  browserSync.init({
    port: 8282,
    server: {
      baseDir: './app/',
      index: 'sample_lion.html'
    },
    open: 'external'
  });
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('sass' , function () {
  return gulp.src('./app/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 3 versions', 'ie >= 10', 'iOS >= 8', 'Android >= 4']
  }))
  .pipe(gulp.dest('./app/css'))
});

gulp.task('js' , function () {
  return gulp.src('app/js/union.js')
  .pipe(plumber())
  .pipe(uglify({
    output:{
      comments: /^!/
    }
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./app/js'))
});

gulp.task('build', ['sass', 'js'], function() {});

gulp.task('watch', function () {
  gulp.watch('./app/*.html', function () {
    runSequence('reload');
  });
  gulp.watch('./app/scss/**/*.scss', function () {
    runSequence('sass', 'reload');
  });
  gulp.watch('./app/js/**/*.js', function () {
    runSequence('js', 'reload');
  });
});

gulp.task('default', ['build', 'watch', 'server']);
