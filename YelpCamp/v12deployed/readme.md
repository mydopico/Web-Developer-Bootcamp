YelpCamp v12

# Landing page refactor

 * FULL SCREEN BACKGROUND IMAGE SLIDER
 Use of HTML and CSS to create a full screen background image slider 
 that uses a crossfade effect to transition between images. The images 
 will be set as background-images to a modified unordered list. We'll 
 use 5 images with 10 second intervals for a 50 second animation cycle.
  
 * CSS
   * Create a new CSS file in /public/stylesheets named landing.css
   * Open landing.css and set the body's background-color to black  
   * position the welcome text and view all campgrounds button
   * We set the z-index to 1 so all of the elements inside the landing-
   header div will be in front of the background images

   * The position is set to relative so we can use the z-index property; 
   the default position value is static, which ignores z-index

   * We use text-align to center our text and button

   * We use padding-top to vertically center our div, since it's 
   contents take up quite a bit of space we use 40vh (view height) 
   instead of 50, this way the content looks more visually centered
   (Viewport Height (vh) — This unit is based on the height of the 
   viewport. A value of 1vh is equal to 1% of the viewport height. 
   Viewport Width (vw) — This unit is based on the width of the 
   viewport. A value of 1vw is equal to 1% of the viewport width.)

   * We also need to change the h1 text color to white
   * The unordered list and its list items that we added to landing.ejs 
   need some styling to make them fit across the entire page:
     This will fix the ul to the window, positioning it in the top left 
	 corner and filling the entire screen by setting width and height to 
	 100%; we set the z-index to 0 to keep the background images behind 
	 the rest of the page's content; list-style is set to none in order 
	 to hide the bullet points from the list's default styling; margin 
	 and padding are removed entirely.
   * style all of the list items:
    * the animation property at the bottom of this rule, this is how we 
	add an animation to an element; in this case we have an animation 
	named imageAnimation that lasts for 50s (seconds), keeps linear 
	timing (the whole animation runs at the same speed), and loops an 
	infinite number of times
	* Each list item needs a background-image and the last four need an    	animation-delay (this way they all fire off one after the other in 
	ten second intervals)
	
	* create the keyframes for the animation:
	   The animation will be named imageAnimation, which matches with the value from our animation property in the .slideshow (unordered list) rule
 From 0% to 10% (the beginning of our animation) the list item begins  
 changing it's opacity from 0 to 1 (invisible to visible)
 the animation-timing-function is set to ease-in at 0% and ease-out and   10%, this makes for a more smooth fade-in (read more about this here)
 The list item's opacity then stays at 1 until it reaches 20% at which  
 point it fades back out, reaching 0 at 30% and staying at 0 for the       remainder of the animation
If we have 5 background images visible for 5 seconds each, then the time it takes to fade the image in and keep it visible is 10 seconds with a 5 second crossfade/fadeout into the next image; The entire animation cycle for all 5 images takes 50 seconds total
100% divided by 5 is 20% so each image's fadein and visibility should last 20% of the cycle; half of 20% is 10%, that is why our fade in is from 0% to 10%, then we keep it visible until 20% is reached and begin the fadeout from 20% to 30%, the 5 second fadeout overlaps the next image's 5 second fadein, which is what creates the crossfade effect

* Lastly, we need to add animation support for older browsers; we've already added the modernizr CDN to our landing page's head element, now we just need the following rule in our landing.css:
	
	 
* DYNAMIC PRICE FEATURE

  * Add price to the schema setup: campgrounds.js for models
  * new input for price in new.ejs for campground and edit form
  * And campgrounds.js for routes
  
* Use Bootstrap to style the login & sign up views
  * Update the nav-bar menu
  * Convert .container-fluid to regular .container
  * Add conditional active class to menu list items
  * Add collapsable hamburger menu
  * Make site responsive for mobile
  * Fix registration flash message bug
* Moment JS (Time passed since date created)
  * Install moment js (npm install --save moment)
  * Require moment and add it to app.locals
  * Update campground and comment models
  * Use moment in your show.ejs file
