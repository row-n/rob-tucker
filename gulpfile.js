'use strict';

// Set environment
let isProduction = false;

// Load gulp
const gulp = require('gulp');

// Load all plugins in 'devDependencies' into the variable $
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});

const onError = (err) => {
  console.log(err);
};

// Styles
gulp.task('styles:lint', () => {
  return gulp.src(['./assets/sass/**/*.s+(a|c)ss', '!./assets/sass/generic/_normalize.scss'])
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.sassLint({
      configFile: '.sass-lint.yml',
    }))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
});

gulp.task('styles', ['styles:lint'], () => {
  $.fancyLog("-> Compiling scss");
  return gulp.src('./assets/sass/style.s+(a|c)ss')
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.changed('./style.css'))
    .pipe($.sass({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
    }))
    .pipe($.combineMq())
    .pipe(gulp.dest('./'))
    .pipe($.if(isProduction, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(isProduction, $.cssnano()))
    .pipe($.if(isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, $.rename('style.min.css')))
    .pipe($.if(isProduction, gulp.dest('./')));
});

// Scripts
gulp.task('scripts:lint', () => {
  return gulp.src(['./assets/js/**/*.js', '!./node_modules/**/*.js'])
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('scripts', ['scripts:lint'], () => {
  var b = $.browserify({
    entries: './assets/js/script.js',
    debug: true
  });

  $.fancyLog("-> Building js");
  return b.bundle()
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.vinylSourceStream('script.js'))
    .pipe($.vinylBuffer())
    .pipe(gulp.dest('./'))
    .pipe($.if(isProduction, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.if(isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, $.rename('script.min.js')))
    .pipe($.if(isProduction, gulp.dest('./')));
});

// Clean
gulp.task('clean', () => {
  $.fancyLog("-> Cleaning assets");
  return $.del(['./style.css', './script.js']);
});

// Browser Sync
gulp.task('browser-sync', () => {

  var files = [
    './style.css',
    './script.js',
    './*.php'
  ];

  $.browserSync.init(files, {
    proxy: 'http://robtucker.dev',
    host: 'robtucker.dev',
    open: 'external'
  });

  gulp.watch('./assets/sass/**/*.s+(a|c)ss', ['styles:lint',  () => {
    $.browserSync.reload(['./style.css'], {stream: true});
  }]);

  gulp.watch('./assets/js/**/*.js', ['scripts:lint',  () => {
    $.browserSync.reload(['./script.css'], {stream: true});
  }]);
});

// Environment Build
gulp.task('build', () => {
  isProduction = true;
  $.runSequence('clean', 'styles', 'scripts');
});

// Default Task
gulp.task('default', () => {
  isProduction = false;
  $.runSequence('clean', 'styles', 'scripts', 'browser-sync');
});