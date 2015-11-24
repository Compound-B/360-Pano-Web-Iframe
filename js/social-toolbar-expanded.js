 (function($) {    
    $(window).load(function() {
    
        // defaults
        TWP.Social = TWP.Social || {};
        TWP.Social.emailUrl = window.location.href;
        var config = {
            targetTop: $('#content'),
            viaText: $('#wp-graphics-social-tools').data('via') ? $('#wp-graphics-social-tools').data('via') : 'PostGraphics',
            toolbarIncludesTop:["facebook","twitter","linkedin","personalpost","email","print"]
        };
        
        // if comments
        if ($('#wp-graphics-comments-wrapper').length > 0) {
            config.toolbarIncludesTop.unshift('commentcount');
        }
        
        // custom overrides
        if (TWP.SocialConfig) {
            $.each(TWP.SocialConfig, function(k,v) {
                config[k] = v;
            });
        }
        // get js script
        $.ajax({
            url: 'http://js.washingtonpost.com/rw/sites/twpweb/js/plugin/plugin.jquery.social-toolbar.js',
            dataType: 'script',
            cache: true,
            success: function() {
                
                // show tools and handle functionality
                $('#wp-graphics-social-tools')
                    .socialToolbar(config)
                    .css({opacity:0}).fadeTo(500,1)
                    .find('.commentcount a')
                        .on('click', function(e) {
                            e.preventDefault();
                            var id = $(this).attr('href');
                            $('html, body').animate({scrollTop: $('#wp-graphics-comments-wrapper').offset().top}, 450);
                        });
            }
        });
    });
})(jQuery);
