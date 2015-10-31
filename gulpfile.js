/*
	npm install gulp --save-dev
	npm install gulp-concat --save-dev		//reduce critical resources
	npm install gulp-minify-css --save-dev	//reduce critical bytes (CSS)
	npm install gulp-uncss --save-dev		//reduce critical bytes (CSS) [strips out chunks you don't use from, say, Bootstrap]
!DON'T! npm install gulp-imagemin --save-dev	//reduce image file size  [!Takes a LONG time to install!]
					//^Looks like optipng fails to install.  Will have to do pngs by hand.
	 //^Fails to install, glitchy/unreliable, hardly reduces jpegs.  Do by hand.
	npm install gulp-uglify --save-dev
	npm install gulp-htmlmin --save-dev
  npm install gulp-autoprefixer --save-dev 
*/	

var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uncss = require('gulp-uncss');
//var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');

//Minify HTML
gulp.task('miniHTML', function() {
  return gulp.src('dist/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});


//Concatenate CSS files
gulp.task('concatCSS', function() {
	return gulp.src('src/css/*.css')
		.pipe(concat('style.css'))
		.pipe(gulp.dest('dist/css'));
});

/*
//Minify CSS
gulp.task('miniCSS', ['concatCSS'], function() {  //['concatCSS'] means it depends on that function, so wait for it to finish
  return gulp.src('dist/css/*.css')					//...Does this mean, though, that I should ONLY run miniCSS?  Ie, will it call the other one?
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});*/

gulp.task('miniCSS', function() {  
  return gulp.src('dist/views/css/style.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/views/css'));
});

//UnCSS
gulp.task('unCSS', function() {
    return gulp.src('src/views/css/bootstrap-grid.css')
        .pipe(uncss({
            html: ['src/views/pizza.html']
        }))
        .pipe(gulp.dest('dist/views/css'));  //outputs as same file name
});



//Minify JS
gulp.task('miniJS', function() {
  return gulp.src('dist/views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/js'));
});

//Autoprefix
gulp.task('autoP', function () {
    return gulp.src('src/views/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/views/css'));
});

//Reduce image file sizes
//gulp.task('miniImage', function() {	//wow, sure doesn't reduce it by much...  (and this thing is glitchy...)
//	return gulp.src('src/views/images/*.jpg')  //couldn't handle src/**/*.jpg
//		.pipe(imagemin({
//            progressive: true,
//        }))
//        .pipe(gulp.dest('dist'));
//});

//Default task
gulp.task('default', ['miniCSS', 'unCSS'])
//gulp.task('default', ['concatCSS', 'miniCSS']);  //This did both as well; guess it doesn't matter?
//Just running miniCSS (with the ['concatCSS']) made it call concat first and then minify
//Or... it looks like you can chain them all within the same function:
/*
gulp.task('allCSS', function() {
	return gulp.src('src/css/*.css')
		.pipe(concat('style.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('dist/css'));
});



*/

