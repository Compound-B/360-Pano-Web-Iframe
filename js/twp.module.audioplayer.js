TWP.Module=TWP.Module||{};(function(e){TWP.Module.AudioPlayer=function(t){var n=t.container;var r=t.url.substr(t.url.length-3);var i=navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin:0;var s=e("#"+n).width()<t.width?"100%":t.width+"px";var o=t.html5_preload?t.html5_preload:"none";var u=function(){if(i||!Modernizr.audio){e.ajax({url:"http://media.washingtonpost.com/wp-srv/js/swfobject.js",dataType:"script",cache:true,success:function(){var e=new SWFObject("http://media.washingtonpost.com/wp-srv/graphics/assets/swf/soundplayer_stretch.swf",n,s,"30","9","#ffffff");e.addParam("id",n);e.addParam("name",n);e.addParam("allowScriptAccess","always");e.addParam("wMode","transparent");e.addParam("swfliveconnect",true);e.addVariable("soundurl",t.url);e.write(n)}})}else if(Modernizr.audio){e("#"+n).html('<audio controls preload="'+o+'" style="width:'+s+';"><source src="'+t.url+'" /></audio>')}};u()}})(jQuery);