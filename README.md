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

		This code was originally creating 200 pizzas to move in the background as
		the user scrolled. However, since the user can't even see all of those at any
		given time, this number was	reduced to a far more manageable 20.

		Finally, the CSS was edited to tell the browser to place each moveable pizza
		onto its own layer through the use of will-change: transform and transform:
		translateZ(0).  This helps to cut down on expensive paints.

	2.  Resizing pizzas

		The resizePizzas() function originally had a problem that was similar to what
		was plaguing the scrolling pizzas:  forced synchronous layout was occurring
		inside a for loop.  querySelectorAll was also being called multiple times and
		even inside the for loop.  Furthermore, the approach to	resize the pizzas
		seemed unnecessarily complex, so I completely changed it.

		Resizing the pizzas is now done by scaling the images with CSS.  The
		determineDx() function was replaced with a getScale() function.  This returns
		the class name that will be assigned to the	resizeable pizzas (small, medium,
		large).  Each of these classes has a different transform: scale property
		attached to it.

		What changePizzaSizes() does now is first remove any class related to scale
		that may have been on the resizeable pizzas.  It then adds to them the class
		returned from getScale.  For example, say that the pizzas were large and the
		user clicked the resize bar to make them small.  The 'large' class is removed
		from all the pizzas and replaced with 'small'.

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