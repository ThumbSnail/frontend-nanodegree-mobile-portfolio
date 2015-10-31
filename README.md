## Website Performance Optimization Portfolio Project

A.  How to Run/Download

	1.  Visit these links in Chrome (easiest)
		index.html: http://thumbsnail.github.io/frontend-nanodegree-mobile-portfolio
		pizza.html: http://thumbsnail.github.io/frontend-nanodegree-mobile-portfolio/views/pizza.html

	2.  Download the project's .zip file
		https://github.com/ThumbSnail/frontend-nanodegree-mobile-portfolio/archive/master.zip
		Then open dist/index.html and dist/views/pizza.html for the production files
		Or open src/index.html and src/views/pizza.html for the source files
		(which include comments)

	3.  Clone the repository
		git clone https://github.com/ThumbSnail/frontend-nanodegree-mobile-portfolio.git
		Then open dist/index.html and dist/views/pizza.html for the production files
		Or open src/index.html and src/views/pizza.html for the source files
		(which include comments)

B.  Optimizations made to index.html

	1.  Reduced the number of critical resources and the critical path length
		-Added a media query to the <link> for print.css
		-Changed analytics.js <script> to async
		-Inlined the style.css file into index.html
		-Removed the unnecessary Google font since a standard font would suffice

	2.  Reduced the number of critical bytes
		-Learned how to use Gulp (and various plugins) to minify the HTML, CSS,
		  and JS for distribution
		-Reduced the size (and quality) of the large pizzeria image.  Also removed
		  its metadata
		-Reduced the size of the profile pic

C.  Optimizations made to views/js/main.js

	1.  Scrolling pizzas

		In updatePositions(), document.body.scrollTop was originally being accessed
		inside of a loop before setting a style change.  This was causing forced
		synchronous layout on every iteration.  A single request for scrollTop was
		moved outside of the loop, and then all the style changes were batched.

		This function was also querySelectorAll-ing for all of the moving pizzas
		every time the user scrolled.  Now, when the moving pizzas are first created,
		they are stored in a global array. updatePositions() accesses this array and
		avoids the querySelectorAll call.

		Also, a querySelector() has been replaced with the faster getElementById().

		This code was originally creating 200 pizzas to move in the background as
		the user scrolled. However, since the user can't even see all of those at any
		given time, this number was	reduced to 48.

		Finally, the CSS was edited to tell the browser to place each moveable pizza
		onto its own layer through the use of will-change: transform and transform:
		translateZ(0).  This helps to cut down on expensive paints.

	2.  Resizing pizzas

		changePizzaSizes() was doing a lot of unnecessary work.  It was making several
		calls to querySelectorAll inside of a for loop.  These have been replaced with
		a single call outside the loop, and it has been changed to the faster 
		getElementsByClassName().

		The original loop was requesting a bunch of layout information and then making
		style changes, once again causing forced synchronous layout.  It has now been
		split into two separate for loops.  The first batches all of the layout
		property read requests and saves the newly calculated values.  The second loop
		then batches all of the style changes.

		Furthermore, determineDx() has been changed to not recalculate values that are
		going to be the same for each element.  Since all of the pizzas will be changed
		to the same size, sizeSwitcher() was moved outside of this function and only
		called once to receive the value for the new size.  Requesting the windowwidth
		was also moved outstide so that it's only done once.

		Also, any querySelector() was replaced with the faster getElementById().

	3.  File sizes
		-Used Gulp (and a plugin) to minify the JS, thereby shrinking the file size
		-(Also, for pizza.html, unCSS'd the Bootstrap CSS and minified the CSS.)
		-(Also, reduced the pizzeria.jpg file)

D.  Notes on Task Runners

	1.  Research

		I looked at Grunt, Gulp, and npm itself as build tools.  I ended up going
		with Gulp because, since it's in JavaScript, I found it the easiest to read
		and organize.

	2.  Plugins I used

		Image reducers:
		Attempted to use gulp-imagemin but was unable to get it to install and work
		on Windows.	(Appears to be an issue with file path lengths being longer than
		what Windows can handle.)  Instead, used www.jpeg-optimizer.com

		Minifiers:
		gulp-htmlmin, gulp-minify-css, gulp-uglify, gulp-uncss

		Autoprefixer:
		gulp-autoprefixer