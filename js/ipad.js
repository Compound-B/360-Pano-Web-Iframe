// Check document url for ipad template param
if(document.location.href.indexOf('template=ipad') != -1){
    // Set viewport for mobile
    var filerev=document.createElement("meta");
    filerev.setAttribute("name", "viewport");
    filerev.setAttribute("content", "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=5.0");
    if (typeof filerev!="undefined"){
      document.getElementsByTagName("head")[0].appendChild(filerev);
    }
    
    // Include ipad.css file
    var fileref=document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", "http://media.washingtonpost.com/wp-srv/graphics/css/ipad.css");
    if (typeof fileref!="undefined"){
      document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    
    // Add twp-ipad class to body
    var bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className += " twp-ipad";
    // Add View desktop link under credit
    //var originalurl = document.location.href.replace('?template=ipad','');
    //document.getElementById("appenddesktoplink").innerHTML = '<strong><a id="nonmobileurl" href="'+originalurl+'">View desktop version</a></strong>';
    // And... scene.
} // Close param conditional