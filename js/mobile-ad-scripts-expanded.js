// Mobile detection
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    iPad: function() {
        return navigator.userAgent.match(/iPad/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};
// Mobile global var
var mobile_browser;
mobile_browser = 0;
if( isMobile.any() ) mobile_browser = 1;
// Special check for iOS for video
var ios_browser;
ios_browser = 0;
if( isMobile.iOS() ) ios_browser = 1;
// Another check for special iPad styles
var ipad_browser;
ipad_browser = 0;
if( isMobile.iPad() ) ipad_browser = 1;

// checking for mobile iframe
var has_iframe = window.location.href.indexOf('iframe') === -1 ? 0 : 1;

// Conditional JS load for mobile
function loadRemoteScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}

function scriptCallBack(){
    // null callback
}

// then add the script/s...
if(mobile_browser > 0 && ipad_browser == 0) {
    loadRemoteScript('http://js.washingtonpost.com/wp-srv/ad/mobile.js',scriptCallBack);
}