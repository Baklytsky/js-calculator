'use strict';
const gulp       	= require('gulp');
const sass 			= require('gulp-sass');
const watch 		= require('gulp-watch');
const autoprefixer 	= require('gulp-autoprefixer');
const cleancss 		= require('gulp-clean-css');
const browserSync 	= require('browser-sync').create();

gulp.task('styles', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 3 versions'], cascade: false}))
        .pipe(cleancss())
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("./scss/**/*.scss").on('change', browserSync.reload);
    gulp.watch("./js/**/*.js").on('change', browserSync.reload);
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('styles'));
});

gulp.task('default',  gulp.series(
    gulp.parallel('styles', 'watch', 'serve')
));