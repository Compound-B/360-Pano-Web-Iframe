// webkit-swipe.js
// Detect swipes on any object
// Compatible with Carousel gallery plugin

/*
Example:

  addSwipeListener(document.body, function(e) { 
    alert(e.direction); 
  });

*/

/**
 * You can identify a swipe gesture as follows:
 * 1. Begin gesture if you receive a touchstart event containing one target touch.
 * 2. Abort gesture if, at any time, you receive an event with >1 touches.
 * 3. Continue gesture if you receive a touchmove event mostly in the x-direction.
 * 4. Abort gesture if you receive a touchmove event mostly the y-direction.
 * 5. End gesture if you receive a touchend event.
 * 
 * @author Dave Dunkin
 * @copyright public domain
 */
var addSwipeListener = function(opts)
{
 var startX;
 var dx;
 var direction;
 var el = opts.element;
 var listener = opts.listener;
 var verticalThreshold = opts.threshold.vertical ? opts.threshold.vertical : 15; // pixels
 var horizontalThreshold = opts.threshold.horizontal ? opts.threshold.horizontal : 100; // pixels
 
 function cancelTouch()
 {
  el.removeEventListener('touchmove', onTouchMove);
  el.removeEventListener('touchend', onTouchEnd);
  startX = null;
  startY = null;
  direction = null;
  dx = null;
 }
 
 function onTouchMove(e)
 {
  if (e.touches.length > 1)
  {
   cancelTouch();
  }
  else
  {
   e.stopPropagation();
   dx = e.touches[0].pageX - startX;
   var dy = e.touches[0].pageY - startY;
   if (direction == null)
   {
    direction = dx;
    // Uncomment to disable vertical scrolling
    // Probably not advised
    //e.preventDefault();
   }
   else if ((direction < 0 && dx > 0) || (direction > 0 && dx < 0) || Math.abs(dy) > 15)
   {
    cancelTouch();
   }
  }
 }

 function onTouchEnd(e)
 {
  e.stopPropagation();
  var dir = dx > 0 ? "right" : "left";
  var distance = Math.abs(dx);
  //alert('distance:' + distance);
  cancelTouch();
  if (distance > horizontalThreshold) {
    listener({ target: el, direction: dir});
  }
 }
 
 function onTouchStart(e)
 {
  if (e.touches.length == 1)
  {
   e.stopPropagation();
   startX = e.touches[0].pageX;
   startY = e.touches[0].pageY;
   el.addEventListener('touchmove', onTouchMove, false);
   el.addEventListener('touchend', onTouchEnd, false);
  }
 }
 
  if(document.ontouchmove === undefined){
     // No touchy
  } else {
    el.addEventListener('touchstart', onTouchStart, false);
  }
};