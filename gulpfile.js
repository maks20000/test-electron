var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefix = require("gulp-autoprefixer");
var browser = require("browser-sync");
var img_compress = require("gulp-imagemin");

gulp.task("styles", async () => {
  gulp
    .src("./src/sass/*.sass")
    .pipe(sass())
    .pipe(
      autoprefix({
        browsers: ['last 25 versions']
      })
    )
    .pipe(gulp.dest("./html/css/"))
    .pipe(browser.reload({ stream: true }));
});

gulp.task("html", async () => {
  gulp
    .src("./src/*.html")
    .pipe(gulp.dest("./html/"))
    .pipe(browser.reload({ stream: true }));
});

gulp.task("scripts", async () => {
  gulp
    .src("./src/js/*.js")
    .pipe(gulp.dest("./html/js/"))
    .pipe(browser.reload({ stream: true }));
});

gulp.task("browser-sync", async () => {
  browser.init({
    server: {
      baseDir: "./html",
    },
    notify: false,
  });
});

gulp.task("image-compress", async ()=>{
  gulp.src("./src/img/*")
  .pipe(img_compress())
  .pipe(gulp.dest("./html/img/"))
  .pipe(browser.reload({ stream: true }));
});

gulp.task("watch", async () => {
  gulp.watch("./src/sass/*.sass", gulp.parallel("styles"));
  gulp.watch("./src/*.html", gulp.parallel("html"));
  gulp.watch("./src/js/*.js", gulp.parallel("scripts"));
  gulp.watch("./src/img/*", gulp.parallel("image-compress"));
});

gulp.task("default", gulp.parallel("styles", "html", "scripts", "browser-sync", "watch"));
