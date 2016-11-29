'use strict';

import gulp from 'gulp';
import less from 'gulp-less';
import concat from 'gulp-concat';
import path from 'path';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import shell from 'gulp-shell';
import imagemin from 'gulp-imagemin';

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "dist/"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});

gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts:vendor', function(callback) {
  return gulp.src([
      './node_modules/pixi.js/bin/pixi.min.js',
    ])
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('styles', () => {
  return gulp.src('./src/less/**/*.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

//compressing images & handle SVG files
gulp.task('images', function(tmp) {
    gulp.src(['src/assets/images/*.jpg', 'src/assets/images/*.png'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
        //catch errors
        .on('error', gutil.log);
});

// Cleans compiled directory
gulp.task('clean', shell.task([
  'rm -rf dist/'
]));

//create folders using shell
gulp.task('scaffold', shell.task([
  'mkdir dist',
  'mkdir dist/css',
  'mkdir dist/js',
  'mkdir dist/assets',
  'mkdir dist/assets/images',
  'mkdir dist/assets/videos',
  'mkdir dist/assets/music'
  ]
));

gulp.task('default', ['browserSync', 'html', 'scripts', 'scripts:vendor', 'images', 'styles'], function() {
    gulp.watch('src/js/**/*', ['scripts']);
    gulp.watch('src/less/**', ['styles']);
    gulp.watch('app/assets/images/**', ['images']);
    gulp.watch('app/*.html', ['html']);
});
