var isMobile={Android:function(){return navigator.userAgent.match(/Android/i)?true:false},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)?true:false},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)?true:false},iPad:function(){return navigator.userAgent.match(/iPad/i)?true:false},Windows:function(){return navigator.userAgent.match(/IEMobile/i)?true:false},any:function(){return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Windows())}};var mobile_browser;mobile_browser=0;if(isMobile.any()){mobile_browser=1}var ios_browser;ios_browser=0;if(isMobile.iOS()){ios_browser=1}var ipad_browser;ipad_browser=0;if(isMobile.iPad()){ipad_browser=1}var has_iframe=window.location.href.indexOf("iframe")===-1?0:1;function loadRemoteScript(b,d){var c=document.getElementsByTagName("head")[0];var a=document.createElement("script");a.type="text/javascript";a.src=b;a.onload=d;c.appendChild(a)}function scriptCallBack(){}if(mobile_browser>0&&ipad_browser==0){loadRemoteScript("http://js.washingtonpost.com/wp-srv/ad/mobile.js",scriptCallBack)};