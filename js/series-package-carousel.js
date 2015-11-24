(function($){
    $.staticCarousel = function(options) {
        var thisUuid = options.uuid;
        $.ajax({
            url:options.carousel_url,
            dataType:"html",
            dataFilter:function(responseText){
            return responseText;
            },
            success:function(responseText){
                $('#' + options.containerId).html(responseText);
                $('#carousel-series-package.story-flipper').storyflipper();
                if (!!$){
                    var
                    itemsPerPage = 4,
                    itemInCarousel = document.getElementById('_seriesPackageTop-'+thisUuid),
                    ctx = document.getElementById('carousel-series-package'),
                    $itemsInCarousel = $('.container',ctx),
                    total = $itemsInCarousel.size(),
                    pos = $itemsInCarousel.index( itemInCarousel )+1
                    ; 
                    if (!!pos) {
                    $(itemInCarousel).addClass("active");
                    
                    for(var i=1;i < Math.ceil(pos/itemsPerPage);i++){
                        $('.carousel-control-next a',ctx).click();
                    }
                    }
                }
                $.each($('#carousel-series-package.story-flipper').find('.container').find('.photo'), function(i,p) {
                    var src = $(p).find('img').attr('data-src');
                    $(p).find('img').attr('src',src);
                });
            }
        });
    }
})(jQuery);