"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  csso = require("gulp-csso"),
  htmlmin = require("gulp-htmlmin"),
  concatCss = require("gulp-concat-css"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync"),
  babel = require("gulp-babel");

var path = {
  build: {
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/images/"
  },
  src: {
    html: "src/index.html",
    js: "src/js/*.js",
    style: "src/sass/style.scss",
    css: "src/css/",
    img: "src/images/**/*.*"
  },
  watch: {
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    style: "src/sass/**/*.scss",
    css: "src/css/**/*.css",
    img: "src/images/*.*"
  }
};

gulp.task("scripts", function() {
  gulp
    .src(path.src.js)
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest(path.build.js));
});

gulp.task("styles", function() {
  gulp
    .src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.src.css));
});

gulp.task("concatCss", function() {
  return gulp
    .src("src/css/*.css")
    .pipe(concatCss("bundle.css"))
    .pipe(csso())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("minify-html", function() {
  return gulp
    .src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build.html));
});

gulp.task("images", function() {
  gulp.src(path.src.img).pipe(gulp.dest(path.build.img));
});

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "build"
    },
    notify: false
  });
});

gulp.task("build", [
  "scripts",
  "minify-html",
  "styles",
  "images",
  "concatCss",
  "browser-sync"
]);

gulp.task("watch", function() {
  gulp.watch(path.watch.style, ["styles"]);
  gulp.watch(path.watch.css, ["concatCss"]);
  gulp.watch(path.watch.html, ["minify-html"]);
  gulp.watch(path.watch.img, ["images"]);
  gulp.watch(path.watch.js, ["scripts"]);
  gulp.watch(path.watch.html, browserSync.reload);
  gulp.watch(path.watch.style, browserSync.reload);
  gulp.watch(path.watch.js, browserSync.reload);
});

gulp.task("default", ["build", "watch"]);
