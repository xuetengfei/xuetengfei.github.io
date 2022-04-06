> gulp.js 是前端工作流工具。自动化项目的构建利器,把人从重复劳动中解放出来。

Gulp 是什么？

gulp 是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；她不仅能对网
站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她
，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

gulp 是基于 Nodejs 的自动任务运行器， 她能自动化地完成
javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格
式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现
上，她借鉴了 Unix 操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入
，使得在操作上非常简单。

---

### 环境的安装。

> node.js、npm、cnpm

### 选装 cnpm

因为 npm 安装插件是从国外服务器下载，受网络影响大，可能出现异常，淘宝团队施仁布
恩做了`cnpm`镜像官方 npm。[cnpm 官网链接](http://npm.taobao.org)

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

注：cnpm 跟 npm 用法完全一致，只是在执行命令时将`npm`改为`cnpm`（以下操作将以
cnpm 代替 npm）。

### 全局安装 gulp

```js
// 淘宝镜像全局安装gulp
cnpm install gulp -g
```

```js
// 检测版本，确认安装完毕
gulp - v;
```

### 初始化项目（gulp-sass 为例（编译 sass 文件））

```js
// 初始化package.json文件
cnpm init
// 下面的命令将安装所需的依赖，同时也会更新 package.json。
cnpm install gulp --save-dev
cnpm install gulp-sass --save-dev
```

### 手写一个 gulpfile.js

> 脚本文件名字只能叫：gulpfile.js

```js
// gulpfile.js
// 1.导入依赖 require ("node_modules里面下载的对应模块")
var gulp = require('gulp');
var sass = require('gulp-sass');
// 2.定义一个任务（任务的名称是自己定义的）
gulp.task('sass2css', function () {
  // 指明该任务的处理的文件来源
  gulp
    .src('./sass/*.scss')
    // 该任务调用的模块
    .pipe(sass())
    // 处理完成后，输出的位置
    .pipe(gulp.dest('./style'));
});
```

---

```js
gulp.task(name, [deps], fn);
// 定义任务
// name:任务名称
// deps:依赖任务名称
// fn:回调函数
```

```js
gulp.src(globs, [options]);
// 执行任务处理的文件
// globs:处理的文件路径（字符串或者字符串数组）
```

```js
gulp.dest(path, [options]);
// 处理完后文件输出的路径
```

### 终端跑一下这个脚本,查看一下文件目录和文件，文件已经生成

```
gulp sass2css
```

非常感谢

1. [gulp 详细入门教程](http://www.ydcss.com/archives/18)
2. [gulp 教程之 gulp-less](http://www.ydcss.com/archives/34)
3. [gulp 教程之 gulp-concat](http://www.ydcss.com/archives/83)
4. [gulp 教程之 gulp-uglify](http://www.ydcss.com/archives/54)
5. [Gulp 新手入门教程](https://w3ctrain.com/2015/12/22/gulp-for-beginners/?utm_source=tuicool&utm_medium=referral)

展示一下,很久之前写的 gulp 文件.

```javascript
/*
 * @Author: xuetengfei
 * @Date: 2017-12-28 21:19:20
 * @Last Modified by: xuetengfei
 * @Last Modified time: 2018-09-02 02:48:53
 * 本文件是编译单独文件夹的sass文件
 * 接受两个参数，动态配置文件名
 * files：文件名
 * baseSass：base.scss的文件的name
 * 运行：gulp base 可以编译生成基础的base.scss
 * 编译速度由 200ms => 20ms 提升了10倍！
 */

let files = '考勤打卡';
let baseSass = 'base';

// console.log('');

charset = 'utf-8';
var gulp = require('gulp');
var sass = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var color = require('colors-cli/safe');
const debug = require('gulp-debug');
var Success = color.yellow.bold.inverse;
var num = 0;

var paths = {
  src: './work/' + files + '/css/*.scss',
  watch: [
    './work/' + files + '/sass/*.scss',
    './work/utils/Configure.scss',
    './work/utils/config/*.scss',
  ],
  info_1: 'sass完成编译～～～～～～ 第「',
  info_2: ' 」次编译',
  dest: './work/' + files + '/css',
  baseSass: './work/' + files + '/css/' + baseSass + '.scss',
};

gulp.task('base', function () {
  console.log(Success('基础css生产完毕！'));
  return (
    gulp
      .src(paths.baseSass)
      .pipe(
        sass({
          outputStyle: 'compressed',
        }).on('error', sass.logError),
      )
      // .pipe(autoprefixer('> 1%', 'IE 7'))
      .pipe(gulp.dest(paths.dest))
  );
});

gulp.task('sass2css', function () {
  num++;
  console.log(
    Success(
      paths.info_1 +
        num +
        paths.info_2 +
        '----' +
        new Date().toLocaleTimeString(),
    ),
  );
  return (
    gulp
      .src(paths.src)
      // .pipe(debug({ title: '-' }))
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          outputStyle: 'compressed',
        }).on('error', sass.logError),
      )
      // .pipe(autoprefixer('> 1%', 'IE 7'))
      .pipe(sourcemaps.write('../sourcemaps'))
      .pipe(gulp.dest(paths.dest))
  );
});

gulp.task('watch', function () {
  gulp.watch(paths.watch, ['sass2css']);
});

gulp.task('default', ['sass2css', 'watch'], function () {
  console.log(
    Success('编译成功且监视中......' + new Date().toLocaleTimeString()),
  );
});
```

很久没有使用 Gulp 了，今天写一个小的项目使用一下。Gulp-sass 最新版本目前是 v4.0+
的版本，之前我用的时候还是 v3.0+

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

gulp.task('sass', function () {
  return (
    gulp
      .src('./sass/**/*.scss')
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      // .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer('> 1%', 'IE 7'))
      .pipe(gulp.dest('./style'))
  );
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch'], function () {
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
