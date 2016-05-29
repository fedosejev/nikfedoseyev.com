var gulp = require('gulp');
var htmlMinifier = require('gulp-html-minifier');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('build-js-for-development', function () {
  return gulp
        .src('./source/js/app.js')
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('build-js-for-production', function () {
  return gulp
        .src('./source/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('build-sass-for-development', function () {
  return gulp
        .src('./source/sass/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('build-sass-for-production', function () {
  return gulp
        .src('./source/sass/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('build-html-for-development', function () {
  return gulp
        .src('./source/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('build-html-for-production', function () {
  return gulp
        .src('./source/*.html')
        .pipe(htmlMinifier({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch-for-development', function () {
  gulp.watch('./source/sass/**/*.scss', ['build-sass-for-development']);
  gulp.watch('./source/**/*.html', ['build-html-for-development']);
  gulp.watch('./source/js/**/*.js', ['build-js-for-development']);
});

gulp.task('build-for-development', ['build-js-for-development', 'build-sass-for-development', 'build-html-for-development']);
gulp.task('build-for-production', ['build-js-for-production', 'build-sass-for-production', 'build-html-for-production']);

gulp.task('default', ['watch-for-development', 'build-for-development']);