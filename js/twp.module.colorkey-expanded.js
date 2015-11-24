(function($){
    $.drawKey = function(options) {
        var pctArray = [],
            whiteArray = [],
            labelArray = [];

        $.each(options.colors, function(k,v) {
            pctArray.push('<td class="key-pct" style="background-color: ' + v + '"></td>');
            whiteArray.push('<td></td>');
            labelArray.push('<span class="cell-labels">' + options.labels[k] + '</span>');
        });

        var htmlArray = ['<p class="header franklin mb5"><strong>', options.title, '</strong></p>', '<div class="key-wrap"><table class="key-table"><tbody><tr class="fill-cell">', pctArray.join(''), '</tr><tr class="fill-white">', whiteArray.join(''), '</tr></tbody></table><div class="table-labels">', labelArray.join(''), '</div></div>'];

        $('#' + options.containerId).addClass('wp-graphics-colorkey');
        $('#' + options.containerId).html(htmlArray.join(''));

        var w = parseInt($('#' + options.containerId).width() / options.colors.length, 10);

        $('#' + options.containerId).find('.key-table td').width(w - 1);

        if (options.labelsOnRight) {
            $('#' + options.containerId).find('.key-table td').addClass('label-right');
            $('#' + options.containerId).find('.table-labels').width($('#' + options.containerId).width());
            $('#' + options.containerId).find('.table-labels').css('left', w / 2);
        } else {
            $('#' + options.containerId).find('.table-labels').css('left', -(w / 2));
        }

        $('#' + options.containerId).find('.table-labels span.cell-labels').width(w);
    };
})(jQuery);