'use strict';
var gulp  = require('gulp'),
jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var livereload = require('gulp-livereload');
var runSeq = require('run-sequence');

 gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('jshint', function() {
  return gulp.src('./app/controllers/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
        .pipe(livereload());
});
gulp.task('lintJS', function () {
    return gulp.src(['./public/angular/**/*.js', './app/controllers/**/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError('Linting FAILED! Check your gulp process.')
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});
gulp.task('cssFiles', function () {
    return gulp.src(['./public/angular/css/**/*.css'])
        
        .pipe(concat('main.css'))
        
        .pipe(gulp.dest('./public'));
});


gulp.task('copyHtml', function() {
  gulp.src('./public/angular/*.html').pipe(gulp.dest('public'));
});



gulp.task('default', function () {

    //gulp.start('build');

    // Run when anything inside of browser/js changes.
    gulp.watch('./public/angular/**', function () {
        runSeq('lintJS', 'reload','cssFiles');
    });

});