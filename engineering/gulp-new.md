很久没有使用 Gulp 了，今天写一个小的项目使用一下。Gulp-sass 最新版本目前是 v4.0+的版本，之前我用的时候还是 v3.0+

## Initialize

```
cnpm init -y
cnpm install gulp gulp-sass gulp-watch gulp-sourcemaps gulp-autoprefixer node-sass -D
```

`-D` 等同于`--save-dev`

## package.json

```json
{
  "name": "lorem",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^6.0.0",
    "gulp-changed": "^3.2.0",
    "gulp-sass": "^4.0.2",
    "gulp-sourcemaps": "^2.6.4",
    "gulp-watch": "^5.0.1",
    "node-sass": "^4.10.0"
  }
}
```

## gulpfile.js

```javascript
'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
sass.compiler = require('node-sass');

gulp.task('sass', function() {
  return (
    gulp
      .src('./sass/**/*.scss')
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      // .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer('> 1%', 'IE 7'))
      .pipe(gulp.dest('./style'))
  );
});

gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch'], function() {
  console.log('编译成功且监视中......');
});
```

## Useage

```bash
$ gulp
```

## Stdout

标准输出

```bash
C:\Users\Administrator\Desktop\lorem>gulp
[18:08:50] Using gulpfile ~\Desktop\lorem\gulpfile.js
[18:08:50] Starting 'sass:watch'...
[18:08:50] Finished 'sass:watch' after 8.82 ms
[18:08:50] Starting 'default'...
编译成功且监视中......
[18:08:50] Finished 'default' after 178 μs
|
```
