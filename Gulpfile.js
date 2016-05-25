// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('app/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/**/*.js')
        .pipe(concat('all.js'))
      .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Inject bower components into index.html
gulp.task('inject', function() {
    gulp.src('index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
                name: 'bower',
                addRootSlash: false
            }))
        .pipe(gulp.dest('.'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('app/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'inject']);
