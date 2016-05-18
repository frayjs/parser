'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var del = require('del');
var pegjs = require('gulp-pegjs');
var wrapper = require('gulp-wrapper');

gulp.task('clean', function () {
  return del(['dist']);
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

gulp.task('test', ['lint']);

gulp.task('pegjs', ['lint'], function () {
  return gulp.src('src/**/*.pegjs')
    .pipe(pegjs())
    .pipe(wrapper({
      header: 'module.exports = '
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['pegjs']);
