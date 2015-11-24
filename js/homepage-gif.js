(function($){
    // gif check
    var is_animating = false;

    // $(document).ready(function(){
    var container = $('#hp-animated-gif');
    if (navigator.userAgent.match(/Firefox/i)){
        container.find('.static-fallback').show().addClass('shown');
        container.find('.animated').remove();
    } else {
        checkScroll(container.find('.animated'));

        container.find('.animated').on('mouseover', function(){
            if (!is_animating){
                refreshGif(item);
            }
        });        
    }
    // });

    function refreshGif(item){
        var d = new Date().getTime();
        item.attr('src', item.attr('src') + '?' + d + Math.random());
        is_animating = true;        
    }

    function checkScroll(item){
        $(window).scroll(function(e){
            if (item.isOnScreen()){
                if (!is_animating){
                    refreshGif(item);
                }
            } else {
                is_animating = false;
            }
        });
    }

    $.fn.isOnScreen = function(){
        var win = $(window);
        
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
        
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top + this.outerHeight() / 2 || viewport.top > bounds.bottom));
        
    };

})(jQuery);