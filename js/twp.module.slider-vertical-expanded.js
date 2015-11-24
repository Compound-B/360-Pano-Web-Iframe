TWP.Module = TWP.Module || {};
(function($) {
    TWP.Module.Slider = function(o) {
        var opts = o;
        // set inital values for slider events
        var curr_sliding = false;
        var curr_over_img = false;
        var curr_over_handle = false;
        var let_slide = true;

        // the visible part of the slider controls
        var controls_html = '<div class="controller"><div class="handle-arrows"></div><div class="content-scroll"><div class="divider"></div></div><div class="handle fade-element"></div></div>';

        // setup before/after assets
        var wp_slider = $(opts.wrapper);
        var wp_slider_content = wp_slider.children('div');
        var content_h = wp_slider.height();
        var curr_val = opts.start_pos ? content_h * Number(opts.start_pos) : content_h/2;

        // set handle and content mask
        var setPos = function( val, animate, speed ) {
            var containerHeight = wp_slider.height();
            var newPos = val === null ? (opts.start_pos ? containerHeight * Number(opts.start_pos) : containerHeight/2) : val;

            if ( let_slide ) {
                let_slide = false;

                var speed = speed ? speed : animate ? Math.abs( val - curr_val ) / 1.5 : 1;
                wp_slider.children('.controller')
                    .animate({
                        'top': newPos + 'px'
                    }, speed, 'easeInOutCirc' )

                wp_slider.children('.slide-content').eq(1)
                    .animate({
                        height: newPos
                    }, speed, 'easeInOutCirc', function() { let_slide = true })
            }
            curr_val = newPos;
        },

        init = function() {
            // add and set up controls
            wp_slider.addClass('wp-slider').append(controls_html);
            wp_slider.find('.handle-arrows').css({opacity:0});

            addContent();
            createSlider();
            addEvents();

            // allow overflow for the handle
            $('#content').css('overflow','visible');

            // initial position set (50% is default)
            setPos(null, true);

            // add ipad compatibility
            wp_slider.addTouch();
        },

        addContent = function() {
            // add images and labels
            // negative loop to so order of content == how it appears in the DOM
            var j = 0;
            for (var i=opts.content.length-1; i>=0; i--) {

                var el = opts.content[i];

                // image or html
                var last = j === opts.content.length-1;
                var h = wp_slider.height();
                var content = opts.content_type === 'img' ? '<img src="'+ el +'" style="max-height: ' + h + 'px" />' : el;
                var last_slide = last ? 'last-slide' : '';
                wp_slider.append('<div class="slide-content '+ last_slide +'">'+ content +'</div>');
                var $sc = wp_slider.find('.slide-content').eq(j);

                // add label
                if (opts.labels) {
                    $sc.prepend('<p class="content-label franklin"><strong>'+opts.labels[i]+'</strong></p>');

                    // set min width to label width so it doesn't word wrap
                    $sc.find('.content-label').css('min-width',$sc.find('.content-label').width());
                }
                j++;
            };
        },

        // setup wp_slider
        createSlider = function() {
            wp_slider.slider({
                orientation: 'vertical',
                range: false,
                min: 0,
                max: content_h,
                value: curr_val,
                slide: function( e, ui ) {
                    if (let_slide) {
                        if (e.originalEvent.type==='mousedown') {
                            setPos(content_h - ui.value, true);
                        } else {
                            setPos(content_h - ui.value);
                            curr_val = content_h - ui.value;
                        }
                    }
                },
                change: function( e, ui ) {
                  setPos(content_h - ui.value, true, 1400);
                  curr_val = content_h - ui.value;
                },
                start: function( e, ui ) {
                    curr_sliding=true;
                },
                stop: function( e, ui ) {
                    curr_sliding=false;
                    if (!curr_over_img) { $(this).mouseleave() };
                    if (!curr_over_handle) { $(this).find('.handle').mouseleave() };
                }
            });
        },

        addEvents = function() {
            wp_slider
                // events for before/after content
                .on('mouseover', function() {
                    curr_over_img = true;
                    $(this).find('.fade-element').stop().animate({opacity:1},150);
                    $(this).find('.handle-arrows').stop().animate({opacity:1},220);
                })
                .on('mouseout', function() {
                    curr_over_img = false;
                    if (!curr_sliding) {
                        $(this).find('.fade-element').stop().animate({opacity:0.8},230);
                        $(this).find('.handle-arrows').stop().animate({opacity:0},200);
                    }
                })
            .find('.controller')
                 // events for before/after handle
                .on('mouseover', function() {
                    curr_over_handle = true;
                    $(this).find('.handle').addClass('hover');
                })
                .on('mouseleave', function() {
                    curr_over_handle = false;
                    if (!curr_sliding) {
                        $(this).find('.handle').removeClass('hover');
                    };
                })
                .on('mousedown', function() {
                    curr_sliding=true;
                });
            // resize the widget on window resize
            $(window).smartresize(function() {
                var h = wp_slider.height();
                content_h = h;
                if ( curr_val > h ) {
                    setPos(h);
                } else if ( curr_val < 0 ) {
                    setPos(0);
                }
                wp_slider
                    .slider( 'option', 'max', h )
                    .slider( 'option', 'value', content_h - curr_val )
                    .find('.slide-content img')
                        .css('max-height', h);
            });
        }
        init();
    };
    jQuery.extend( jQuery.easing, {easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    }});
})(jQuery);

