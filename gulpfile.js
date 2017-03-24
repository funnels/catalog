var gulp				= require('gulp')
	, sass				= require('gulp-sass')
	, csso 				= require('gulp-csso')
	, cssbeautify = require('gulp-cssbeautify')
	// https://github.com/olegskl/gulp-stylelint
	, jshint 			= require('jshint')
	, spritesmith = require('gulp.spritesmith')
	, svgSprite 	= require('gulp-svg-sprite')
	, svgmin 			= require('gulp-svgmin')
	, rename 			= require('gulp-rename')
	, browserSync = require('browser-sync').create()
	;

// server + watching (allows you to see your work at http://localhost:3000)
gulp.task('server', function() {

  browserSync.init({
    server: "./",
    host: "192.168.1.3",
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

// vector icons sprite
gulp.task('icons-vector', function () {
  return gulp.src('./images/icons-vector/*.svg')
    // minify svg
    .pipe(svgmin({
      js2svg: { pretty: true }
    }))
  	.pipe(rename(function (path) {
		    path.basename = path.basename
		    	.replace(/\s/g, '-')
		    	.replace(/-icon/, '');
		  }))
    .pipe(svgSprite({
			mode: {
    		symbol: {
    			dest: '',
    			example: true,
    			sprite: 'icons-vector.svg'
    		},
    		inline: false
    	}
    }))
    .pipe(gulp.dest('./images/'));
});

// watch
gulp.task('watch', function(){
  gulp.watch('./styles/**/*.scss', ['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./behavior/*.js').on('change', browserSync.reload);
  gulp.watch(['images/icons/*.png'], ['sprite']);
  gulp.watch('images/icons-vector/*.svg', ['icons-vector']);
});

// default
gulp.task('default', ['server', 'watch', 'styles', 'sprite', 'icons-vector']);
