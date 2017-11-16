
// Set environment
let isProduction = false;

// Load gulp
const gulp = require('gulp');

// Load all plugins in 'devDependencies' into the variable $
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies'],
});

const onError = err => console.log(err); // eslint-disable-line no-console

// Styles
gulp.task('styles:lint', () => {
  $.fancyLog('-> Linting scss');
  gulp.src(['./assets/sass/**/*.s+(a|c)ss', '!./assets/sass/generic/_normalize.scss'])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sassLint({
      configFile: '.sass-lint.yml',
    }))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
});

gulp.task('styles', ['styles:lint'], () => {
  $.fancyLog('-> Compiling scss');
  gulp.src('./assets/sass/style.s+(a|c)ss')
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sass({
      outputStyle: 'compressed',
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
    }))
    .pipe($.combineMq())
    .pipe(gulp.dest('./'))
    .pipe($.if(isProduction, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.if(isProduction, $.cssnano({
      discardComments: {
        removeAll: true,
      },
      discardDuplicates: true,
      discardEmpty: true,
      minifyFontValues: true,
      minifySelectors: true,
    })))
    .pipe($.if(isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, gulp.dest('./')));
});

// Scripts
gulp.task('scripts:lint', () => {
  $.fancyLog('-> Linting js');
  gulp.src(['./assets/js/**/*.js', '!./node_modules/**/*.js'])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('scripts', ['scripts:lint'], () => {
  const b = $.browserify({
    entries: './assets/js/script.js',
    debug: true,
  });

  $.fancyLog('-> Building js');
  b.transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.vinylSourceStream('script.js'))
    .pipe($.vinylBuffer())
    .pipe(gulp.dest('./'))
    .pipe($.if(isProduction, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.if(isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, gulp.dest('./')));
});

// Php
gulp.task('php:lint', () => {
  $.fancyLog('-> Linting php');
  gulp.src(['./**/*.php'])
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.phplint('', { skipPassedFiles: true }))
    .pipe($.phplint.reporter('fail'));
});

// Clean
gulp.task('clean', () => {
  $.fancyLog('-> Cleaning assets');
  $.del(['./style.css', './script.js']);
});

// Browser Sync
gulp.task('browser-sync', () => {
  const files = [
    './style.css',
    './script.js',
    './*.php',
  ];

  $.browserSync.init(files, {
    proxy: 'http://robtucker.dev',
    host: 'robtucker.dev',
    open: 'external',
  });

  gulp.watch('./assets/sass/**/*.s+(a|c)ss', ['styles', () => {
    $.browserSync.reload(['./style.css'], { stream: true });
  }]);

  gulp.watch('./assets/js/**/*.js', ['scripts', () => {
    $.browserSync.reload(['./script.js'], { stream: true });
  }]);

  gulp.watch('./**/*.php', ['php:lint', () => {
    $.browserSync.reload();
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
  $.runSequence('clean', 'php:lint', 'styles', 'scripts', 'browser-sync');
});
