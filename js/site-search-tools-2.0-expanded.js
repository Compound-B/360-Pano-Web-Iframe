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
// turn solr query into related content list
jQuery.queryToUL = function(opts) {
    var query;
    if (!opts.query) {
        // auto-generate keywords from meta tag
        var keywords = jQuery('meta[name=keywords]').attr('content');
        var separator = keywords.indexOf(';') !== -1 ? /;/g : /,/g;
        var keyword_list = encodeURIComponent( keywords.replace(separator,' OR ') );
        var section = thisNode || navNode || '';
        section = section.split('/')[0];
        var items = opts.items || 8;
        query = 'https://md1-a.akamaihd.net/wpost-content-api/content/v2/search.jsonp?appkey=relatedcontent&query=' + keyword_list +'&startingrow=0&offset=' + items + '&fields=contenturl,byline,headline,blurb,primarysection,source&filters=primarysection:(' + TWP.Util.toTitleCase(section) + ')%20AND%20source:(%22The%20Washington%20Post%22)&wt=json&omitHeader=true&json.wrf=storyCallback&tracking=relatedcontent';
    } else {
        query = opts.query;
    }

    var ajaxObj = {url: query};
        ajaxObj.dataType = opts.callback ? 'jsonp' : 'json';
        ajaxObj.success  = function(data) {
            if (opts.mobileQuery) {
                var returnArray = [];
                jQuery.each(data.results.documents, function(k,v) {
                    if (v.headline && v.contenturl && v.headline !== 'Corrections' && v.contenttype !== 'Photo') {
                        returnArray.push('<div class="article"><a href="' + v.contenturl + '""><p class="headline">' + v.headline + '</p></a></div>');
                    }
                });

                if (jQuery.isArray(opts.container)) {
                    jQuery.each(opts.container, function(k,v) {
                        jQuery(v).html(returnArray.join(''));
                    });
                } else {
                    jQuery(opts.container).html(returnArray.join(''));
                }

            } else {
                var returnHTML = '';
                if (opts.s1 > 0) {
                    jQuery.each(data.results.documents, function(i, el) {
                        if (i < opts.s1 && el.headline && el.headline !== 'Corrections' && el.contenttype !== 'Photo') {
                            var s1 = '';
                            s1 += '<div class="module wp-pad-bottom">';
                            s1 += '<h2><a href="'+ el.contenturl +'">'+ el.headline +'</a></h2>';
                            if (el.byline) {
                                s1 += '<p class="byline">'+ el.byline +'</p>';
                            }
                            if (el.blurb) {
                                s1 += '<p>'+ el.blurb +'</p>';
                            }
                            s1 += '</div>';
                            returnHTML += s1;
                        }
                    });
                }
                returnHTML += '<ul class="normal">';
                jQuery.each(data.results.documents, function(i, el) {
                    if (opts.s1 && i < opts.s1 ) {} else {
                        if (el.headline && el.contenturl && el.headline !== 'Corrections' && el.contenttype !== 'Photo') {
                            returnHTML+= '<li><a href="'+ el.contenturl +'">'+ el.headline +'</a></li>';
                        }
                    }
                });
                returnHTML+= '</ul>';

                if (jQuery.isArray(opts.container)) {
                    jQuery.each(opts.container, function(k,v) {
                        jQuery(v).html(returnHTML);
                    });
                } else {
                    jQuery(opts.container).html(returnHTML);
                }
            }
        };
        if (opts.callback) {ajaxObj.jsonpCallback = opts.callback};
    jQuery.ajax(ajaxObj);
}
