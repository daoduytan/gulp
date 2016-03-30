var gulp   = require('gulp'),
	concat = require('gulp-concat'),
	sass   = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync').create();


var libJS = [
	'node_modules/angular/angular.min.js',
	'node_modules/angular-route/angular-route.min.js',
	'app/src/js/main.js'
]
	
// script task
gulp.task('script' , function () {
	return gulp.src(libJS)
			.pipe(concat('app.js'))
			.pipe(gulp.dest('app/dist/js'))
			.pipe(uglify())
			.pipe(gulp.dest('app/dist/js'))
			.pipe(browserSync.stream());
});

// sass task 

gulp.task('sass', function () {
  return gulp.src('app/sass/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/dist/css'))
    .pipe(browserSync.stream());
});

// Static Server 
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "app"
    });
    gulp.watch("app/src/js/*.js", ['script']);
    gulp.watch("app/sass/*.sass", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('default' , [ 'serve']);