const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

var appFiles = ['./server.js', './lib/*.js', './model/*.js'];
var testFiles = ['./test/*.js'];

gulp.task('lint:all', () => {
  gulp.src(appFiles)
    .pipe(eslint())
    .pipe(eslint.format());
  gulp.src(testFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha', () => {
  gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('default', ['lint:all', 'mocha']);
