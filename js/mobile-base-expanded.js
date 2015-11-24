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
// Site search query function
jQuery.queryToUL = function(opts) {
    var query;
    if (!opts.query) {
        // auto-generate keywords from meta tag
        var keywords = jQuery('meta[name=keywords]').attr('content');
        var seperator = keywords.indexOf(';') !== -1 ? /;/g : /,/g;
        var keyword_list = encodeURIComponent( keywords.replace(seperator,' OR ') );
        var section = thisNode || navNode || '';
        section = section.split('/')[0];
        var items = opts.items || 5;
        query = 'https://www.washingtonpost.com/apps/national/proxy/methode/sitesearch/?fq=primarysection:' + TWP.Util.toTitleCase(section) + '%20source:%22The%20Washington%20Post%22&q=' + keyword_list + '&start=0&rows=' + items + '&fl=contenturl,headline,byline,blurb,contenttype&wt=json&omitHeader=true&json.wrf=storyCallback&tracking=relatedcontent';
    } else {
        query = opts.query;
    }

    var ajaxObj = { url: query };
    ajaxObj.dataType = opts.callback ? 'jsonp' : 'json';
    ajaxObj.success = function(data) {
        var returnArray = [];
        jQuery.each(data.response.docs, function(k,v) {
            if (v.headline && v.contenturl && v.headline !== 'Corrections' && v.contenttype !== 'Photo') {
                returnArray.push('<div class="article"><a href="' + v.contenturl + '""><p class="headline">' + v.headline + '</p></a></div>');
            }
        });

        jQuery(opts.container).html(returnArray.join(''));
    };

    if (opts.callback) { ajaxObj.jsonpCallback = opts.callback; }

    jQuery.ajax(ajaxObj);
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
                    $(this).hide();
                } else if ( mobile_browser === 1 || ipad_browser === 1 ) {
                    $(this).addClass('show-dd-menu');
                    $(this).show();
                }
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