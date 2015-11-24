(function($){
    var hostname = window.location.hostname,
        isLive = hostname.indexOf('washingtonpost.com') === -1 ? false : true,
        gmUrl = 'http://maps.google.com/maps/api/js?sensor=false';
        
    if (isLive) {
        gmUrl += '&client=gme-washingtonpost';
    }
    document.write('\x3Cscript type="text/javascript" src="'+gmUrl+'">\x3C/script>');
})(jQuery);