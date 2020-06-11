'use strict';
var fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const merge = require('merge-stream');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
sass.compiler = require('node-sass');

const scriptsPath = './';
function getFolders(dir) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}
// [ 'Css-calc', 'Demo', 'LINK', 'RESUME' ]

gulp.task('sass1', function() {
  return gulp
    .src('./**/asset/sass/**/*.scss', { base: 'asset' })
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer('> 1%', 'IE 7'))
    .pipe(gulp.dest('./asset/style'));
});

gulp.task('sass', function() {
  let folders = getFolders(scriptsPath).filter(v => v != 'node_modules');
  let tasks = folders.map(function(folder) {
    return gulp
      .src(path.join(scriptsPath, folder, '/asset/sass/**/*.scss'))
      .pipe(
        watch(path.join(scriptsPath, folder, '/asset/sass/**/*.scss'), {
          ignoreInitial: false,
        }),
      )
      .pipe(plumber())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(autoprefixer('> 1%', 'IE 7'))
      .pipe(gulp.dest(path.join(scriptsPath, folder, '/asset/style')));
  });
  return merge(tasks);
});

gulp.task('sass:watch', function() {
  gulp.watch('./**/asset/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch'], function() {
  console.log('编译成功且监视中......');
});
