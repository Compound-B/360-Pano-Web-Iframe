TWP.Module = TWP.Module || {};

(function($) {
  TWP.Module.Slider = function(o) {
    var opts = o;

    var orientation = opts.orientation || 'horizontal';
    var orient_props = orientation == 'horizontal' ? ['left', 'right', 'width'] : ['top', 'bottom', 'height'];

    // set inital values for slider events
    var curr_sliding = false;
    var curr_over_img = false;
    var curr_over_handle = false;
    var let_slide = true;

    if (typeof opts['cue_animation'] === 'undefined' || opts['cue_animation'] == 'true') {
      opts['cue_animation'] = true;
    } else if (opts['cue_animation'] == 'false') {
      opts['cue_animation'] = false;
    }

    // the visible part of the slider controls
    var controls_html = [
      '<div class="controller franklin">',
        '<div class="handle-arrows">',
          '<div class="handle-arrow handle-arrow-' + orient_props[0] + '"></div>',
          '<div class="handle-arrow handle-arrow-' + orient_props[1] + '"></div>',
        '</div>',
        '<div class="content-scroll">',
          '<div class="divider"></div>',
        '</div>',
        '<div class="handle"></div>',
        '<strong class="ui-direction">Slide</strong>',
      '</div>'
    ].join('');

    // setup before/after assets
    var wp_slider = $(opts.wrapper);
    var wp_slider_content = wp_slider.children('div');

    // Naming based on the word "extent" is used instead of "height" or "width"
    // since it varies based on orientation.
    var extent_direction = 'width';
    switch (orientation) {
      case 'horizontal':
        extent_direction = 'width';
        break;
      case 'vertical':
        extent_direction = 'height';
        break;
    }

    // Set light/dark theme
    var theme_color = 'blue';

    if (typeof opts.theme_color !== 'undefined' && opts.theme_color == 'dark') {
      theme_color = 'dark';
    } else if (typeof opts.theme_color !== 'undefined' && opts.theme_color == 'light') {
      theme_color = 'light';
    }

    var content_extent = wp_slider[extent_direction]();
    var curr_val = opts.start_pos ? content_extent * Number(opts.start_pos)
        : content_extent / 2;

    // set handle and content mask
    var setPos = function(val, animate) {
      var containerExtent = wp_slider[extent_direction]();
      var newPos = (val === null)
          ? (opts.start_pos ? containerExtent * Number(opts.start_pos)
          : containerExtent / 2) : val;

      if (let_slide) {

        let_slide = false;

        var speed = animate ? Math.abs(val - curr_val) / 1.5 : 1;
        var direction = (extent_direction === 'width') ? 'left' : 'top';

        var properties = {};
        properties[direction] = newPos + 'px';

        wp_slider.children('.controller')
        .animate(properties, speed, 'easeInOutCirc' )

        var properties = {};
        properties[extent_direction] = newPos;

        wp_slider.children('.slide-content').eq(1)
          .animate(properties,speed, 'easeInOutCirc', function() {
            let_slide = true;
          });
      }
      curr_val = newPos;
    },

    init = function() {
      // add and set up controls
      wp_slider
        .addClass('wp-slider')
        .addClass('wp-slider-' + theme_color)
        .addClass('wp-slider-' + orientation)
        .append(controls_html);
      wp_slider.find('.handle-arrows').css({ opacity: 0 });

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
      for (var i = opts.content.length-1; i >= 0; i--) {
        var el = opts.content[i];

        // image or html
        var last = (j === opts.content.length - 1);
        var e = wp_slider[extent_direction]();

        var content = (opts.content_type === 'img')
            ? '<img src="'+ el +'"'
                + ' style="max-' + extent_direction + ': ' + e + 'px" />'
            : el;

        var last_slide = last ? 'last-slide' : '';

        var slide_content_html = [
          '<div class="slide-content ' + last_slide + '">',
          content,
          '</div>'
        ].join('');
        wp_slider.append(slide_content_html);

        var $sc = wp_slider.find('.slide-content').eq(j);

        // add label
        if (opts.labels) {
          var label_html = [
            '<p class="content-label franklin">',
              '<strong>',
              opts.labels[i],
              '</strong>',
            '</p>'
          ].join('');
          $sc.prepend(label_html);

          // set min width to label width so it doesn't word wrap
          $sc.find('.content-label')
            .css('min-' + extent_direction,
                $sc.find('.content-label')[extent_direction]());
        }

        j++;
      };
    },

    getNewPosition = function(new_val) {
      // For the vertical slider, 0 is the bottom.
      var new_pos = (orientation === 'vertical')
          ? content_extent - new_val : new_val;
      return new_pos;
    },

    // setup wp_slider
    createSlider = function() {
      wp_slider.slider({
        orientation: orientation,
        range: false,
        min: 0,
        max: content_extent,
        value: curr_val,
        slide: function(e, ui) {
          if (let_slide) {
            if (e.originalEvent.type === 'mousedown') {
              var new_val = getNewPosition(ui.value);
              setPos(new_val, true);
            } else {
              var new_val = getNewPosition(ui.value);
              setPos(new_val, true);
              curr_val = new_val;
            }
          }
        },
        change: function(e, ui) {
          try {
            if (e.originalEvent.type === 'keyup') {
              setPos(ui.value);
            }
          } catch(e) {}
        },
        start: function(e, ui) {
          curr_sliding = true;
        },
        stop: function(e, ui) {
          curr_sliding = false;
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
          $(this).find('.handle-arrows').stop().animate({ opacity: 1 }, 220);
        })
        .on('mouseout', function() {
          curr_over_img = false;
          if (!curr_sliding) {
            $(this).find('.handle-arrows').stop().animate({ opacity: 0 }, 200);
          }
        })

      wp_slider
        .find('.controller')
        // events for before/after handle
          .on('mouseover', function() {
            curr_over_handle = true;
            $(this).find('.handle').addClass('hover');
            wp_slider.find('.ui-direction').fadeTo(220, 0);
          })
          .on('mouseleave', function() {
            curr_over_handle = false;
            if (!curr_sliding) {
              $(this).find('.handle').removeClass('hover');
            };
          })
          .on('mousedown', function() {
            curr_sliding = true;
          });

        $(window).smartscroll(function() {
          if (opts['cue_animation'] && !wp_slider.hasClass('slider-initialized') && wp_slider.isTopHalfScreen()) {
            animateCue();
          }
        });
    },

    animateCue = function() {
      var slide_divisor = orientation == 'horizontal' ? wp_slider.width() : wp_slider.height(),
          slider_position = wp_slider.find('.controller').position()[orient_props[0]] / slide_divisor;
      var side = slider_position >= .5 ? orient_props[0] : orient_props[1];
      var label_side = slider_position >= .5 ? orient_props[1]: orient_props[0];

      var margin_arrow = 'margin-' + side,
          init_props = {},
          anim_props = {}
          label_props = {};

      label_props['text-align'] = label_side;
      label_props[label_side] = '50%';
      label_props[side] = 'auto';
      label_props['margin-' + label_side] = '12px';
      label_props['margin-' + side] = '0px';

      if (orientation == 'horizontal') {
        init_props[margin_arrow] = '0px';
        anim_props[margin_arrow] = '-25px';
      } else {
        init_props[margin_arrow] = '0px';
        init_props['margin-' + label_side] = '0px';
        anim_props['margin-' + side] = '-25px';
        anim_props['margin-' + label_side] = '25px';
      }

      wp_slider.addClass('slider-initialized');
      // For some reason if you try to target both at once, the animation lags
      wp_slider.find('.ui-direction')
        .css(label_props)
        .fadeTo(220, 1);
      wp_slider.find('.handle-arrows').stop().animate({ opacity: 1 }, 220, function() {
        var $this_arrow = wp_slider.find('.handle-arrow-' + side);

        playAnim($this_arrow, 3);

        function playAnim($elem, i) {
          if (i > 0) {
            $elem
              .animate(anim_props, 500, function() {
                $elem.animate(init_props, 500, function () {
                  playAnim($elem, i - 1);
                });
              });
          }
        }

      });

    }

    init();
  };

  jQuery.extend( jQuery.easing, {easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  }});
})(jQuery);

// Smartscroll
(function($, ss) {
    function debounce(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 300);
        };
    }

    jQuery.fn[ss] = function(fn) {
        return fn ? this.bind('scroll', debounce(fn)) : this.trigger(ss);
    };
})(jQuery, 'smartscroll');

// http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen
(function($, isTopHalfScreen) {
    $.fn[isTopHalfScreen] = function(){
        var win = $(window);

        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var quarterHeight = win.height() / 2.0;
        var quarterViewport = {
          top: viewport.top,
          bottom: viewport.top + quarterHeight
        }

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left
                || viewport.left > bounds.right
                || quarterViewport.bottom < bounds.top
                || quarterViewport.top > bounds.bottom));
    };
})(jQuery, 'isTopHalfScreen');