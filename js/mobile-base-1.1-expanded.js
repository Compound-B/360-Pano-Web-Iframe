// begin chartbeat
if (!_sf_async_config && !window._sf_async_config && document.location.href.indexOf('template=iframe') === -1) {
    try {
        var _sf_async_config={uid:19624,domain:'washingtonpost.com'};
        _sf_async_config.sections = wp_channel;
        _sf_async_config.path = document.location.pathname;
        _sf_async_config.useCanonical =  true;
        _sf_async_config.title = document.title.replace(' - The Washington Post','');
        $(document).ready(function() {$.getScript('http://static.chartbeat.com/js/chartbeat.js');});
    } catch(e) {
        // catch error
    }
}
// end chartbeat

// capitalize the first letter of each word
TWP.Util.toTitleCase = function(t) {
    var txt = '';
    var split = t.split(' ');
    for (var i=0; i<split.length; i++) {
        txt += split[i].substr(0,1).toUpperCase() + split[i].substr(1);
        txt += i < split.length-1 ? ' ' : '';
    }
    return txt;
};

function getParameters(url){
    var paramList = [], params = {}, kvPairs, tmp;
    url = (typeof url === 'undefined' || url === '') ? document.URL : url;
    if(url){
        if(url.indexOf("?") !== -1){
            paramList = url.split("?")[1];
            if(paramList){
                if(paramList.indexOf("&")){
                    kvPairs = paramList.split("&");
                } else {
                    kvPairs = [paramList];
                }
                for(var a=0;a<kvPairs.length;a++){
                    if(kvPairs[a].indexOf("=") !== -1){
                        tmp = kvPairs[a].split("=");
                        params[tmp[0]] = unescape(tmp[1]);
                    }
                }
            }
        }
    }
    return (params) ? params : null;
}

(function($){
    var $nav;
    var $c;
    $(document).ready(function() {
        $nav = $('#nav');
        $c = $('#main-container');

        createShareMeta();

        // Share menu events
        $nav.find('li.share')
            .on('mouseenter', function() {
                $(this).find('.dropdown-menu').addClass('show-dd-menu');
                $(this).find('.dropdown-menu').show();
            })
            .on('mouseleave', function() {
                $(this).find('.dropdown-menu').removeClass('show-dd-menu');
                $(this).find('.dropdown-menu').hide();
            })
            .on('click', function(e) {
                if ($(this).hasClass('show-dd-menu')) {
                    $(this).removeClass('show-dd-menu');
                    $(this).find('.dropdown-menu').hide();
                } else if ( mobile_browser === 1 || ipad_browser === 1 ) {
                    $(this).addClass('show-dd-menu');
                    $(this).find('.dropdown-menu').show();
                }
            });

        $nav.find('li.share').children('a')
            .on('click', function(e) {
                e.preventDefault();
            });

        // iframe code
        var params = getParameters(document.URL);
        if (params['template'] && params['template'] === 'iframe') {
            $('body').addClass('iframe').show().css('display','block');
            $('#main-container .main-content').siblings().hide();
        }
    });

    function createShareMeta() {
        var pageURL = $('link[rel=canonical]').attr('href'),
            shortURL = $('link[rel=shorturl]').attr('href'),
            shareTitle = $('meta[name="twitter:title"]').attr('content'),
            viaAccount = $('meta[name="twitter:site"]').attr('content');

        // Email share data
        var emString = 'mailto:?subject=' + shareTitle + ' ' + pageURL;
        $('#dd-share-em a').attr('href', emString);

        // Email share data
        var fbString = 'https://facebook.com/dialog/feed?app_id=41245586762&link=' + pageURL + '&name=' + shareTitle + '&redirect_uri=' + pageURL;
        $('#dd-share-fb a').attr('href', fbString);

        var twString = 'http://twitter.com/intent/tweet?text=' + encodeURI(shareTitle + ' ' + shortURL + ' via ' + viaAccount);
        $('#dd-share-tw a').attr('href', twString);
    }

})(jQuery);