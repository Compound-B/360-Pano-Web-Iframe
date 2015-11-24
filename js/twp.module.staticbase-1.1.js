/*
    TWP.Module.StaticBase
    Version 1.0
    By Wilson Andrews
    Created April 3, 2013
*/

TWP = window.TWP || {};
TWP.Module = TWP.Module || {};

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