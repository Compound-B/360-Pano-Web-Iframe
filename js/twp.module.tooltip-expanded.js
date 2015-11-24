/*
    SHOW TOOLTIP: Bind this to your mouseover event
        Example:
            $.showTooltip({
                wrapperId: 'map',
                data: your_data,
                contentFunction: function(d) {
                    var tooltipHTML = '<p>' + d.opts.data.name + '</p>';
                    return tooltipHTML;
                },
                xOffset: 20,
                yOffset: 0
            });

        Options:
            wrapperId: String
                ID of your map or viz, whatever contains the content that is being moused over.
                Does not include the '#'.
            data
                Data attached to the mouseover target (likely an object)
            contentFunction: Function
                The function that determines what populates the tooltip.
                Takes one argument (data) and returns a string of HTML. Works with ICanHaz.js.
            xOffset: Number (Optional)
                The number of pixels your tooltip will be horizontally offset from the mouse position.
                Defaults to 20.
            yOffset: Number (Optional)
                The number of pixels your tooltip will be vertically offset from the mouse position.
                Defaults to 0.

    HIDE TOOLTIP: Bind this to your mouseout event
        Example:
            $.hideTooltip('map');

        $.hideTooltip takes one argument, the id of the relative-positioned container (not including the #).

*/

(function($) {
    $.showTooltip = function(opts) {
        if ($('#wp-graphics-tooltips').length == 0) {
            $('body').prepend('<div id="wp-graphics-tooltips" class="posrel"><div id="' + opts.wrapperId + '-wp-graphics-tooltip" class="wp-graphics-tooltip franklin"></div></div>')
        } else if ($('#' + opts.wrapperId + '-wp-graphics-tooltip').length == 0) {
            $('#wp-graphics-tooltips').append('<div id="' + opts.wrapperId + '-wp-graphics-tooltip" class="wp-graphics-tooltip franklin"></div>');
        }

        var tooltip_selector = $('#' + opts.wrapperId + '-wp-graphics-tooltip');

        $('#' + opts.wrapperId).on('mousemove', moveTooltip);

        // Prevent tooltip from blinking if you hover over it
        tooltip_selector.on('mousemove', moveTooltip);
        tooltip_selector.on('mouseover', function() {
            tooltip_selector.show();
        }).on('mouseout', function() {
            tooltip_selector.hide();
        });

        tooltip_selector.show();
        tooltip_selector.html(opts.contentFunction(opts.data));

        function moveTooltip(e) {
            var wrapperOffset = {
                left: $('#' + opts.wrapperId).offset().left,
                bottom: $('#' + opts.wrapperId).offset().top + $('#' + opts.wrapperId).height()
            };
            var midPoint = {
                x: $('#' + opts.wrapperId).width() / 2,
                y: $('#' + opts.wrapperId).height() / 2
            };
            var xOffset = typeof opts.xOffset !== 'undefined' ? opts.xOffset : 20;
            var yOffset = typeof opts.yOffset !== 'undefined' ? opts.yOffset : 0;
            var theY = e.pageY > wrapperOffset.bottom - midPoint.y ? e.pageY + yOffset - tooltip_selector.height() : e.pageY + yOffset,
                theX;

            if (e.pageX > wrapperOffset.left + midPoint.x) {
                theX = $(window).width() - e.pageX + xOffset;

                tooltip_selector.css({
                    right: theX,
                    left: 'auto',
                    top: theY
                });
            } else {
                theX = e.pageX + xOffset;

                tooltip_selector.css({
                    right: 'auto',
                    left: theX,
                    top: theY
                });
            }
        }
    };

    $.hideTooltip = function(wrapperId) {
        var tooltip_selector = $('#' + wrapperId + '-wp-graphics-tooltip');
        $('#' + wrapperId).off('mousemove');
        tooltip_selector.off('mousemove mouseover mouseout');
        tooltip_selector.hide();
    };

})(jQuery);