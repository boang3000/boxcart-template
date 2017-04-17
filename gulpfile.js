var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    imagemin = require('gulp-imagemin'),
    image = require('gulp-image'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    path = require('path');

var config = {
    sassPath: './assets/sass',
    npmDir: './node_modules',
    bowerDir: './bower_components',
    imgPath: './assets/images'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build:css', function () {
    // gulp.src([
    //         config.sassPath + '/main.scss', 
    //         config.npmDir + '/bootstrap-sass/assets/stylesheets/**.scss',
    //         config.npmDir + '/fontawesome/scss/*',
    //     ])
    //     .pipe(sass({outputStyle: 'compressed'}))
    //     .pipe(gulp.dest('./dist/css'));

    return gulp.src(config.sassPath + '/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: 
            [
                config.sassPath + '/**/*.scss',
                config.npmDir + '/bootstrap-sass/assets/stylesheets/**.scss',
                config.npmDir + '/fontawesome/scss/*'
            ] 
        }))
        .pipe(minify())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.join('./dist/', 'css')))
});

gulp.task('css', function() {
    return gulp.src(config.sassPath + '/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
                config.sassPath + '/**/*.scss',
                config.npmDir + '/bootstrap-sass/assets/stylesheets/**.scss',
                config.npmDir + '/fontawesome/scss/*'
            ]
        }))
        .pipe(minify())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(path.join('./dist/', 'css')));
});

gulp.task('images', function () {
    return gulp.src(config.imgPath + '/*.+(png|jpg|gif|svg)')
    .pipe(gulp.dest(path.join('./dist/', 'images')))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'css', 'images']);