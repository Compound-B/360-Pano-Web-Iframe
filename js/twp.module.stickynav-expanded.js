TWP.Module = TWP.Module || {};
(function($){
    $.fn.stickyNav = function(opts) {
        var o = opts || {},
            $nav = $(this.selector),
            $target = (o.target && $(o.target)) || $($nav.data('target')),
            sections = [],
            scroll_speed = o.speed || $nav.data('speed') || 450,
            scroll_offset = o.offset || $nav.data('offset') || 0,
            click_override = o.click_override || $nav.data('click_override') || false, // override the default nav click behavior
            click_scroll = false
        
        var init = function() {
        
            // get the default attributes for the sticky nav
            o.offset_top = $nav.parent().offset() && $nav.parent().offset().top;
            o.height = $nav.outerHeight();
            
            if (!click_override) {
                $nav.find('a').each(function(i,a) {
                    var href = $(a).attr('href');
                    if ( href.substr(0,1) === '#' && $(href).length > 0 )
                        sections.push( $(href) )
                });
            }

            // set initial nav and nav parent styles
            $nav
                .css({
                    position: 'absolute',
                    width: $nav.parent().width(),
                    top: 0
                })
                .parent()
                    .css({
                        height: o.height
                    })
            
            setScroll();
            if (!click_override)
                setNavEvents();
        }, // init
        
        setScroll = function() {
            $(window).scroll(function(){
                var scroll_y = $(window).scrollTop();
                target_ht = $target.height();
                target_offset = $target.offset().top;
                o.offset_top = $nav.parent().offset() && $nav.parent().offset().top;
                o.height = $nav.outerHeight();
                
                // update the sticky
                if ( scroll_y < o.offset_top || o.height + o.offset_top > target_ht + target_offset) {
                    $nav.css({
                        position: 'absolute',
                        top: 0
                    })
                    .removeClass('fixed')
                } else if ( scroll_y >= target_ht + target_offset - o.height + scroll_offset ) {
                    var new_top = target_ht + target_offset - o.height - o.offset_top + scroll_offset;
                    $nav.css({
                        position: 'absolute',
                        top: new_top
                    })
                    .addClass('fixed')
                } else if ( scroll_y >= o.offset_top ) {
                    $nav.css({
                        position: 'fixed',
                        top: 0
                    })
                    .addClass('fixed')
                }

                // don't change nav if nav click caused scroll
                if (!click_scroll) {
                    $.each(sections, function(i,s) {
                        var s_pos = $(s).offset() && $(s).offset().top;
                        if ( s_pos + scroll_offset <= scroll_y || i === 0 ) {
                           $nav.find('a').eq(i).addClass('active').siblings('.active').removeClass('active');
                        }
                    });
                }
            });
            
        }, // setScroll
        
        setNavEvents = function() {
        
            // nav click
            $nav.on('click', 'a', function(e){
                e.preventDefault();
                $(this).addClass('active').siblings('.active').removeClass('active');

                var $section = $($(this).attr('href'));
                if ($section.offset()) {
                    click_scroll = true;
                    var top = $section.offset().top;
                    $('html, body').stop().animate({
                        scrollTop: top + scroll_offset
                    }, scroll_speed, function() {
                        click_scroll = false;
                    });
                }
            });
            
        } // setNavEvents
        
        
        init();
    }
})(jQuery);