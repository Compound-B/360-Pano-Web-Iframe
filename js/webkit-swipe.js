var addSwipeListener=function(b){var g;var l;var j;var d=b.element;var e=b.listener;var c=b.threshold.vertical?b.threshold.vertical:15;var h=b.threshold.horizontal?b.threshold.horizontal:100;function k(){d.removeEventListener("touchmove",a);d.removeEventListener("touchend",i);g=null;startY=null;j=null;l=null}function a(n){if(n.touches.length>1){k()}else{n.stopPropagation();l=n.touches[0].pageX-g;var m=n.touches[0].pageY-startY;if(j==null){j=l}else{if((j<0&&l>0)||(j>0&&l<0)||Math.abs(m)>15){k()}}}}function i(n){n.stopPropagation();var m=l>0?"right":"left";var o=Math.abs(l);k();if(o>h){e({target:d,direction:m})}}function f(m){if(m.touches.length==1){m.stopPropagation();g=m.touches[0].pageX;startY=m.touches[0].pageY;d.addEventListener("touchmove",a,false);d.addEventListener("touchend",i,false)}}if(document.ontouchmove===undefined){}else{d.addEventListener("touchstart",f,false)}};