TWP.Module = TWP.Module || {};
(function($) {
    TWP.Module.Tabs = function(o) {
        var opts = o;
        var $tabs = $(opts.container);
        var $panels = $tabs.find('.content-panel');
        var $nav;
        var fixed = o.fixed;

        var init = function() {
            setNav();
            setActive();

/*
            if (fixed)
                loadFixed();
*/
        },

        setNav = function() {

            // make nav wrapper
            var id = (opts.container + '-header').replace('#','');
            $tabs.before('<div id="' + id + '" class="tabs-header-wrap posrel mb10"><div class="tabs-header posabs pb10"><ul class="filter-menu big"></ul></div></div>');
            $nav = $('#' + id).find('.filter-menu');

            // add labels
            var w = 0;
            $tabs.find('.content-panel').each(function(k,v) {
                var label = opts.labels[k] || '';
                $nav.append('<li><a href="#">' + label + '</a></li>');
                w += $nav.find('li').last().outerWidth() + 15;
            });

            // set heights
            var ht = $nav.find('li').eq(0).outerHeight();
            $nav.height(ht);
            $nav.parent().parent().height(ht);

            // set width if we want to center the tabs
            if (o.centered)
                $nav
                    .addClass('centered')
                    .width( w )
                    .parent().width('100%')

            // set events
            $nav.on('click', 'a', function(e) {
                e.preventDefault();

                // set active
                $(this)
                    .parent().addClass('active')
                    .siblings('.active').removeClass('active');

                var idx = $(this).parent().index();
                setPanel(idx);
            })
        },

        setPanel = function(index) {
            // show/hide panels
            $panels
                .eq(index).show()
                .siblings().hide();
        },

        setActive = function() {
            // set active tab
            if ( o.active_tab && !isNaN(o.active_tab) ) {
                $nav.find('a').eq(o.active_tab).click();
            } else {
                $nav.find('a').first().click();
            }
        },

        loadFixed = function() {
            if ($.fn.stickyNav) {
                // affix the tab nav
                setFixed();
            } else {
                // load sticky nav if necessary
                $.ajax({
                    url: 'http://js.washingtonpost.com/wp-srv/graphics/js/twp.module.stickynav.js',
                    cache: true,
                    dataType: 'script',
                    success: setFixed
                });
            }
        },

        setFixed = function() {
            // init sticky - this is buggy for some reason, doesn't like .parent()
            $nav.parent().stickyNav({
                target: opts.container,
                click_override: true
            });
        }

        init();
    };
})(jQuery);