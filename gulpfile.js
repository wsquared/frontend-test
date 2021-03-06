var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var rimraf = require('gulp-rimraf');
var webpack = require('webpack-stream');
var PORT = 5000;

gulp.task('connect', function () {
  plugins.connect.server({
    root: ['./dist'],
    port: PORT,
    livereload: true
  });
});

gulp.task('js', function () {
  return gulp.src('./static/app.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist'))
    .pipe(plugins.connect.reload())
    ;
});

gulp.task('html', function () {
  return gulp.src('./static/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(plugins.connect.reload())
    ;
});

// Clean
gulp.task('clean', function () {
    return rimraf('./dist');
});

gulp.task('copy', function () {
  return gulp.src(['./static/**/**.*', '!./static/**/**.ts'], {
    base: './static'
  })
    .pipe(gulp.dest('./dist'))
    ;
});

gulp.task('node_modules', function () {
  return gulp.src([
    './node_modules/font-awesome/css/font-awesome.css',
    './node_modules/ng2-toastr/bundles/ng2-toastr.js',
    './node_modules/ng2-toastr/bundles/ng2-toastr.min.css',
    './node_modules/systemjs/dist/system.js'
    ])
    .pipe(gulp.dest('./dist/libs'))
    ;
});

gulp.task('fonts', function () {
  return gulp.src(['./node_modules/font-awesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest('./dist/fonts/'))
    ;
});

gulp.task('open', function () {
  return gulp.src('./dist/index.html')
    .pipe(plugins.open({ app: 'chrome', uri: 'http://localhost:' + PORT }))
    ;
});

gulp.task('lib', function () {
  return gulp.src('./lib/**')
    .pipe(gulp.dest('./dist/lib'))
    ;
});

gulp.task('watch', function () {
  gulp.watch(['!./static/**/**.ts', './static/**/**.*'], ['copy']);
  gulp.watch('./static/**/**.ts', ['js']);
  gulp.watch('./static/*.html', ['html']);
});

gulp.task('dev', function (cb) {
  plugins.runSequence(['default', 'connect', 'watch'], 'open', cb);
});

gulp.task('default', function (cb) { 
  plugins.runSequence(['js', 'html', 'copy', 'node_modules', 'fonts', 'lib'], cb);
});
