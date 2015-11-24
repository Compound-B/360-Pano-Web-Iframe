TWP.Module = TWP.Module || {};
(function($) {
    TWP.Module.Stepper = function(o) {
        var opts = o;
        var $stepper = $(opts.container);
        var cycle_opts = {
            fx:     'fade', 
            speed:  250, 
            timeout:0, 
            nowrap: false,
            next:   '#next-panel', 
            pager:  '#pager-wrap',
            pagerAnchorBuilder: function(i,el) {
                var title = opts.labels ? opts.labels[i] : (i+1);
                return '<li><a href="#">' + title + '</a></li>';
            },
            before: function(curr, next) {
                var $label = $(cycle_opts['next']).children('.text');
                if ($(next).index() === $stepper.children().length - 1) {
                    $label.html('Start over');
                } else {
                    $label.html('Next');
                }
            }
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
                .cycle( cycle_opts );
                
            // TODO - make swipey
        }
        
        init();
    };
})(jQuery);