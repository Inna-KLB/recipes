const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create(),
      cleanCss = require('gulp-clean-css'),
      clean = require('gulp-clean'),
      include = require('gulp-file-include'),
      webpack = require('webpack-stream');


const src = './src/',
      dist = './dist/';

  
gulp.task('html', () => {
  return gulp.src(src +'**.html')
  .pipe(include({
    prefix: '@@'
  }))
  .pipe (gulp.dest(dist))
  .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src(src + './assets/sass/base/main.sass')
  .pipe(sourcemaps.init())
  .pipe(sass({
    errorLogToConsole: true,
    outputStyle: 'compressed'
  }).on('error', console.error.bind(console)))
  .pipe(autoprefixer({
    overrideBrowserslist: ["last 5 versions"],
    cascade: false
  }))
  .pipe(cleanCss())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(sourcemaps.write('./'))
  .pipe (gulp.dest(dist + './css/'))
  .pipe(browserSync.stream());
});

gulp.task('build-js', () => {
  return gulp.src(src + './assets/js/main.js')
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'script.js'
      },
      watch: false,
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /.(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist + './js/'))
    .on("end", browserSync.reload);
});

gulp.task('prod-build-js', () => {
  return gulp.src(src + './assets/js/main.js')
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'script.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist + './js/'));
});

gulp.task('img', () => {
  return gulp.src(src + './assets/img/*.**')
  .pipe(gulp.dest(dist + './img'))
  .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
  return gulp.src(src + './assets/fonts/*.**')
  .pipe(gulp.dest(dist + './fonts'))
  .pipe(browserSync.stream());
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: dist
    },
    port: 5000,
    notify: false
  })
});

gulp.task('watch-files', () => {
  gulp.watch(src + '**/*.html', gulp.parallel('html'));
  gulp.watch(src + '*.html', gulp.parallel('html'));
  gulp.watch(src + 'assets/sass/**/*.sass', gulp.parallel('sass'));
  gulp.watch(src + 'assets/js/**/*.js', gulp.parallel('build-js'));
  gulp.watch(src + 'assets/img/**/*.**', gulp.parallel('img'));
  gulp.watch(src + 'assets/fonts/**/*.**', gulp.parallel('fonts'));
});


gulp.task('clean-folder', () => {
  return gulp.src(dist)
  .pipe(clean())
});

// gulp.task('build', gulp.series('clean-folder', gulp.parallel('html', 'sass', 'build-js', 'img', 'fonts')));
gulp.task('build', gulp.series('clean-folder', gulp.parallel('html', 'sass', 'prod-build-js', 'img', 'fonts')));
gulp.task('default', gulp.parallel('watch-files', 'build', 'browser-sync'));