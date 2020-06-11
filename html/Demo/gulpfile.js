"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
sass.compiler = require("node-sass");

gulp.task("sass", function() {
  return (
    gulp
      .src("./asset/sass/**/*.scss")
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      // .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer("> 1%", "IE 7"))
      .pipe(gulp.dest("./asset/style"))
  );
});

gulp.task("sass:watch", function() {
  gulp.watch("./asset/sass/**/*.scss", ["sass"]);
});

gulp.task("default", ["sass", "sass:watch"], function() {
  console.log("编译成功且监视中......");
});
