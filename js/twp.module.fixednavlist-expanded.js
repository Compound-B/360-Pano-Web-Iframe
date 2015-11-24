TWP.Module = TWP.Module || {};
(function(global){
    TWP.Module.List = function(o) {
        var opts = o,
            $c = $('#' + opts.container),
            $nav = $c.find('.nav')

        var init = function(){
            ich.grabTemplates();
            if (opts.gdoc_id)
                fetch();
        },
        fetch = function(){
            // get the data
            var cache = typeof opts.cache === 'boolean' ? opts.cache : true;
            SimpleTable.init( { key: opts.gdoc_id, cached: cache, callback: getData } );
        },
        getData = function(d){
            var currentSection = '',
                previousSection = '',
                sectionIdx = 0;
            // add each row to the column
            $.each(d, function(k, v){
                currentSection = v.sectionname;
                // only build nav and section for each new section
                if (currentSection !== previousSection){
                    // build nav
                    v.is_active = sectionIdx === 0 ? 'active' : '';
                    v.section_index = sectionIdx;
                    var single_nav = ich.nav_item(v);
                    $nav.append(single_nav);

                    // build section
                    v.section_slug = TWP.Util.slugify(v.sectionname);
                    var single_section = ich.section_item(v);
                    $c.find('.content-col').append(single_section);

                    previousSection = currentSection;
                    sectionIdx++;
                }
                // build table rows for section
                v.row_slug = TWP.Util.slugify(v.sectionitem);
                v.row_index = k;
                var single_row = ich.table_row(v);

                $c.find('#' + TWP.Util.slugify(v.sectionname) + ' tbody').append(single_row);
            });
    
            if (!mobile_browser){
                // sizing active .arrow-right
                $nav.find('a').each(function(k, v){
                    var btnHeight = $(v).find('.nav-btn').outerHeight();
                    var arrowHeight = btnHeight/2;
                    $(v).find('.arrow-right').css({
                        'border-top-width': arrowHeight,
                        'border-bottom-width': arrowHeight
                    });
                });
                $c.find('.nav').stickyNav();
            } else {
                var nav_show = false;

                $c.find('.nav').stickyNav({
                    target: '.content-col', 
                    offset: -$c.find('.nav').outerHeight()
                });
                $c.find('.nav').css('width', '98%');

                $c.find('.nav').find('.icon-reorder').on('click', function(){
                    if (nav_show){
                        $(this).parent().find('a:not(.active)').hide();
                        nav_show = false;
                    } else {
                        $(this).parent().find('a').show();
                        nav_show = true;
                    }
                    $c.find('.nav').parent().css('height', $c.find('.nav').outerHeight());
                });

                $c.find('.nav').find('a').on('click', function(){
                    $(this).siblings('a.active').removeClass('active');
                    $(this).addClass('active');
                    $(this).siblings('a').hide();
                });            
            }
        }
        init();
    }
})(this);