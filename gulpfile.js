'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var del = require('del');
var pegjs = require('gulp-pegjs');
var wrapper = require('gulp-wrapper');

gulp.task('clean', function () {
  return del(['tmp', 'dist']);
});

gulp.task('lint', ['clean'], function () {
  var sources = [
    'src/**/*.js',
    'test/**/*.js'
  ];

  return gulp.src(sources)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('pegjs', ['lint'], function () {
  return gulp.src('src/**/*.pegjs')
    .pipe(pegjs())
    .pipe(wrapper({
      header: 'module.exports = '
    }))
    .pipe(gulp.dest('tmp/build'));
});

gulp.task('build', ['pegjs']);

gulp.task('test', ['build']);

gulp.task('dist', ['test'], function () {
  return gulp.src(['src/**/*.js', 'tmp/build/**'])
    .pipe(gulp.dest('dist'));
});
