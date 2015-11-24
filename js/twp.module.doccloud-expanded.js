TWP.Module = TWP.Module || {};
(function($){
    TWP.Module.DocCloud = function(o) {
        var opts = o,
            first = true,
            $c = $('#' + opts.container)

        var init = function(){
            ich.grabTemplates();
            if (opts.gdoc_id)
                fetch();
        },
        
        // get the google doc annotations
        fetch = function() {
            SimpleTable.init( { key: opts.gdoc_id, cached: true, callback: drawElements } );
        },
        
        // add sidebar elements
        drawElements = function(data){
            var $elements = $c.find('.element-container');
                $.each(data, function(i,el){
                var t = ich.element(el);
                $elements.append(t);
            });
    
            setupDoc();
        },
        
        // set up the document cloud viewer and events
        setupDoc = function() {
            var id = opts.container + '-document';
            $c.find('.DV-container').attr('id',id);
            
            var url = 'http://www.documentcloud.org/documents/' + opts.doccloud_id + '.js';
            var width = $c.find('#' + id).width();
            DV.load( url, {
                width: width,
                height: 750,
                sidebar: false,
                container: '#' + id
            });
            
            // handle clicks on document annotations
            // make sidebar selections match
            $c.find('.DV-container')
                .on('click', '.DV-annotation', function(e){
                    var id = $(this).data('id');
                    var parent = $(this).closest('.DV-set');
                    var classnames = parent.attr('class');
                    if ( classnames ) {
                        var splitnames = classnames.split(' ');
                        var page = '';
                        $.each(classnames, function(i,c) {
                            if (c.indexOf('DV-page-') !== -1) {
                                page = c.replace('DV-page-','');
                                return false;
                            }
                        });
                        var href = '#document/p' + page + '/a' + id;
                        $c.find('.element[href="' + href + '"]').trigger('click');
                    }
                })
                .on('click', '.DV-trigger', function(e) {
                    e.stopPropagation();
                    if ($(this).hasClass('DV-annotationNext')) {
                        $c.find('.DV-activeAnnotation').next('.DV-annotation').trigger('click');
                    } else {
                        $c.find('.DV-activeAnnotation').next('.DV-annotation').trigger('click');
                    }
                });
            
            // clicks to handle active states on sidebar nav
            $c.find('.element').on('click', function(){
                $(this).addClass('active').siblings('.active').removeClass('active');
            });
            
            // if the page loads with a hash in it, click that link in the sidebar
            if ( window.location.hash !== '' ) {
                $c.find('.element[href="' + window.location.hash + '"]').trigger('click');
            }
        }

        init();
    }
})(jQuery);