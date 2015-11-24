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
        var seperator = keywords.indexOf(';') !== -1 ? /;/g : /,/g;
        var keyword_list = encodeURIComponent( keywords.replace(seperator,' OR ') );
        var section = thisNode || navNode || '';
        section = section.split('/')[0];
        var items = opts.items || 8;
        query = 'https://www.washingtonpost.com/apps/national/proxy/methode/sitesearch/?fq=primarysection:' + TWP.Util.toTitleCase(section) + '%20source:%22The%20Washington%20Post%22&q=' + keyword_list + '&start=0&rows=' + items + '&fl=contenturl,headline,byline,blurb,contenttype&wt=json&omitHeader=true&json.wrf=storyCallback&tracking=relatedcontent';
    } else {
        query = opts.query;
    }

    var ajaxObj = {url: query};
        ajaxObj.dataType = opts.callback ? 'jsonp' : 'json';
        ajaxObj.success  = function(data) {
            var returnHTML = '';
            if (opts.s1 > 0) {
                jQuery.each(data.response.docs, function(i, el) {
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
            jQuery.each(data.response.docs, function(i, el) {
                if (opts.s1 && i < opts.s1 ) {} else {
                    if (el.headline && el.contenturl && el.headline !== 'Corrections' && el.contenttype !== 'Photo') {
                        returnHTML+= '<li><a href="'+ el.contenturl +'">'+ el.headline +'</a></li>';
                    }
                }
            });
            returnHTML+= '</ul>';
            jQuery(opts.container).html(returnHTML);
        };
        if (opts.callback) {ajaxObj.jsonpCallback = opts.callback};
    jQuery.ajax(ajaxObj);
}