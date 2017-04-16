var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');

var config = {
    sassPath: './assets/sass',
    npmDir: './node_modules',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./dist/fonts'));
});

// gulp.task('css', function () {
//     return gulp.src(config.sassPath + '/main.scss')
//         .pipe(sass({
//             style: 'compressed',
//             loadPath: [
//                 './resources/sass',
//                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
//                 config.bowerDir + '/fontawesome/scss/*',
//             ]
//         }))
//         .pipe(gulp.dest('./dist/css'));
// });
gulp.task('css', function () {
    gulp.src([
            config.sassPath + '/main.scss', 
            config.sassPath + '/**/*.scss',
            config.npmDir + '/bootstrap-sass/assets/stylesheets/**.scss',
            config.npmDir + '/fontawesome/scss/*',
        ])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'css']);