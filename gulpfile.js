const gulp = require("gulp");
const connect = require("gulp-connect");
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const del = require("del");
const postcss = require("gulp-postcss");

// Default settings for gulpfile
var project = {
  buildSrc: "./src",
  buildDest: "./dist"
};

// Watch for file changes
gulp.task("watch", done => {
  // Watch SASS files and compile when changed
  gulp.watch(
    project.buildSrc + "/assets/stylesheets/**/*.scss",
    gulp.series("stylesheets")
  );

  // watch(project.buildDest).pipe(connect.reload());

  done();
});

// Compile SASS
gulp.task("stylesheets", done => {
  gulp
    .src(project.buildSrc + "/assets/stylesheets/app.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(require("autoprefixer")))
    .pipe(gulp.dest(project.buildSrc + "/_includes/stylesheets"));
  done();
});

// Lightweight development server
gulp.task("server", done => {
  connect.server({
    root: project.buildDest,
    livereload: true
  });
  done();
});

// Clean build dir
gulp.task("clean", function() {
  return del([project.buildDest + "/**/*"]);
});

// Build task
gulp.task("build", gulp.parallel("clean", "stylesheets"));

// Development task
gulp.task("dev", gulp.parallel("watch", "stylesheets", "server"));
