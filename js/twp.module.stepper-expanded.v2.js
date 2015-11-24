TWP.Module = TWP.Module || {};
(function($) {
    TWP.Module.Stepper = function(o) {
        var opts = o;
        var $stepper = $(opts.container);
        var cycle_opts = {
            'log': false,
            'fx': 'fade',
            'speed': 250,
            'timeout': 0,
            'allow-wrap': true,
            'pagerActiveClass': 'active',
            'slideActiveClass': 'active',
            'next': '#next-panel',
            'pager': '#pager-wrap',
            'pagerTemplate': opts.labels ? '' : '<li><a href="#"> {{slideNum}} </a></li>',
            'slides': '> div',
        }

        if (opts.labels) {
            var pager_html = [];
            $.each(opts.labels, function(k,v) {
                pager_html.push('<li><a href="#">' + v + '</a></li>');
            });

            $(cycle_opts.pager).html(pager_html.join(''));
        }

        var init = function() {
            // set cycle options
            if (opts.cycle_opts) {
                $.each(opts.cycle_opts, function(k,v) {
                    cycle_opts[k] = v;
                });
            }

            $stepper
                .addClass('stepper')
                .cycle( cycle_opts )
                .on('cycle-before', function(e, opts, outgoingSlideEl,
                        incomingSlideEl, forwardFlag) {
                    var $label = $(cycle_opts['next']).children('.text');
                    if ($(incomingSlideEl).index() ===
                            $stepper.children().length - 1) {
                        $label.html('Start over');
                    } else {
                        $label.html('Next');
                    }
                });
        }
        init();
    };
})(jQuery);

