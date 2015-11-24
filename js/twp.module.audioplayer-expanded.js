TWP.Module = TWP.Module || {};
(function($) {
    TWP.Module.AudioPlayer = function(o) {
        var id = o.container;
        var filetype = o.url.substr(o.url.length-3);
        var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
        var width = $('#' + id).width() < o.width ? '100%' : o.width + 'px'; // if the width is wider than the container, go 100%
        var html5_preload = o.html5_preload ? o.html5_preload : 'none';

        var init = function() {
            
            if (plugin || !Modernizr.audio) { //if it has the plugin OR it doesn't support HTML5
                // load swfobject
                $.ajax({
                    url: 'http://media.washingtonpost.com/wp-srv/js/swfobject.js',
                    dataType: 'script',
                    cache: true,
                    success: function() {
                        var so = new SWFObject("http://media.washingtonpost.com/wp-srv/graphics/assets/swf/soundplayer_stretch.swf", id, width, "30", "9", "#ffffff");
                            so.addParam("id", id);
                            so.addParam("name", id);
                            so.addParam("allowScriptAccess", "always");
                            so.addParam("wMode", "transparent");
                            so.addParam("swfliveconnect", true);
                            so.addVariable("soundurl", o.url);
                            so.write(id);
                    }
                });
            } else if (Modernizr.audio) {
                $('#'+id).html('<audio controls preload="' + html5_preload + '" style="width:' + width + ';"><source src="'+ o.url +'" /></audio>');
            }
        }
        
        init();
    };
})(jQuery);