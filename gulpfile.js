var gulp				= require('gulp')
	, sass				= require('gulp-sass')
	, csso 				= require('gulp-csso')
	, cssbeautify = require('gulp-cssbeautify')
	// https://github.com/olegskl/gulp-stylelint
	, jshint 			= require('jshint')
	, spritesmith = require('gulp.spritesmith')
	, browserSync = require('browser-sync').create()
	;

// server + watching (allows you to see your work at http://localhost:3000)
gulp.task('server', function() {

  browserSync.init({
    server: "./",
		ui: false,
		notify: false,
		logLevel: 'debug',
		// reloadOnRestart: false,
		open: false
  });

});

// styles
gulp.task('styles', function () {
	gulp.src('./styles/common.scss')
		.pipe(sass({
			outputStyle: 'compressed'
			// use: rupture()
		}).on('error', sass.logError))
		// .pipe(cssbeautify())
		.pipe(csso())
		.pipe(gulp.dest('./styles/'))
		.pipe(browserSync.stream());
});

// markup
gulp.task('markup', function () {
	gulp.src('./*.html')
		.pipe(browserSync.stream());
});

// images sprite
gulp.task('sprite', function () {
  var spriteData = gulp.src('./images/icons/*.png').pipe(spritesmith({
    imgName: 'icons-sprite.png',
    imgPath: '../images/icons-sprite.png',
    cssName: '_icons-sprite.scss',
    cssFormat: 'css',
    algorithm: 'binary-tree'
  }));

  spriteData.img.pipe(gulp.dest('./images/'));

  return spriteData.css
  	.pipe(gulp.dest('./styles/components/'))
  	.pipe(browserSync.stream());
});

// watch
gulp.task('watch', function(){
  gulp.watch('./styles/**/*.scss', ['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./behavior/*.js').on('change', browserSync.reload);
  gulp.watch(['images/icons/*.png'], ['sprite']);
});

// default
gulp.task('default', ['server', 'watch', 'styles', 'sprite']);
