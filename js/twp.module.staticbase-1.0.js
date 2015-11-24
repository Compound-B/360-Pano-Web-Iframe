/*
    TWP.Module.StaticBase
    Version 1.0
    By Wilson Andrews
    Created April 3, 2013
*/

TWP = window.TWP || {};
TWP.Module = TWP.Module || {};
// begin chartbeat
if (!_sf_async_config && document.location.href.indexOf('template=iframe') === -1) {
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
TWP.Module.StaticBase = function($) {    
    $(document).ready(function() {
        var params = TWP.Util.getParameters();
        if (params['template'] && params['template'] === 'iframe') {
            $('body').addClass('iframe').show().css('display','block');
            $('#content .main-content').siblings().hide();
        }
    });
    // end doc.ready
}(jQuery);