TWP.Module = TWP.Module || {};
(function(global) {
    TWP.Module.DataTable = function(o) {
        var opts = o;
        opts.type = o.type ? o.type : 'data-table';

        if (opts.type === 'simple-timeline' || opts.type === 'profile-list')
            ich.grabTemplates();

        var init = function() {
            if (opts.gdoc_id)
                fetch();
            else if (opts.sortable)
                sortTable();
        },
        fetch = function() {
            var cache = typeof opts.cache === 'boolean' ? opts.cache : true;
            SimpleTable.init( { key: opts.gdoc_id, cached: cache, callback: getData } );
        },
        sortTable = function() {
            var options = typeof opts.sortable === 'object' ? opts.sortable : {};
            $('#'+opts.container).addClass('sortable').tablesorter(options);
        },
        getData = function(data) {
            parseTable(data);
        },
        parseTable = function(data) {
            var table = $('#'+opts.container);
            table.addClass(opts.type);
            if (opts.type === 'simple-timeline' || opts.type === 'profile-list') {
                table.html('<div class="body"></div>');
            } else if (opts.headers === false) {
                table.append('<tbody class="body"></tbody>');
            } else {
                table.html('<thead></thead><tbody class="body"></tbody>');
            }
            var body = table.find('.body');

            // populate table
            $.each(data, function(i,row) {
                var row_class = i%2 == 0 ? 'odd' : '';
                // make headers
                if (i === 0 && opts.headers != false ) {
                    var head = table.children('thead');
                    var headHTML = ['<tr>'];
                    for (var k in row) {
                        var th = k.substr(0,1) !== '_' ? toTh(k) : '';
                        headHTML.push('<th class="'+ k +'-cell">'+ th +'</th>');
                    }
                    headHTML.push('</tr>');
                    head.append(headHTML.join(''));
                }
                // vertical timeline
                if (opts.type === 'simple-timeline') {

                    // image sizing
                    var imgw = !isNaN(Number(row.imagesize)) ?
                               'width:' + Number(Number(row.imagesize) + 4) + 'px' : ''; // +4px for border + padding
                    var imgclass = '';
                    if (row.image && row.imagesize) {
                        imgclass = row.imagesize + '-img';
                    } else {
                        imgclass = 'no-display';
                    }

                    var ulHTML = [];
                    // related links
                    for (var k in row) {
                        // get all the links
                        if (k.indexOf('linkheadline') !== -1 && row[k] !== '') {
                            var url = row[k.replace('headline','url')];
                            ulHTML.push('<li><a href="' + url + '">' + row[k] + '</a></li>');
                        }
                    }

                    row.row_class = row_class;
                    row.img_class = imgclass;
                    row.img_src = row.image;
                    row.img_w = imgw;
                    row.img_caption = row.imagecaption;
                    row.hed = row.headline;
                    row.ul = ulHTML.join('');

                    var trow = ich.vTimeRow(row);
                    body.append(trow);
                    var last_row = body.find('.t-row:last');

                    // move large image to bottom
                    if (row.imagesize === 'large') {
                        var img = last_row.find('.image');
                        last_row.find('.content').append(img);
                    }
                }
                // profile list
                else if (opts.type === 'profile-list') {
                    var row = ich.profileRow(row);
                    body.append(row);
                }
                // standard table cells
                else {
                    var rowHTML = ['<tr class="'+ row_class +'">'];
                    for (var k in row) {
                        rowHTML.push('<td class="'+ k +'-cell">'+ row[k] +'</td>');
                    }
                    rowHTML.push('</tr>');
                    body.append(rowHTML.join(''));
                }
            });

            if (typeof mobile_browser !== 'undefined') {
                if (mobile_browser && $(window).width() < 481) {
                    $.each($('.t-row iframe'), function(k,v) {
                        if ($(v).width() > $(window).width()) {
                            $(v).css('width', '100%');
                            $(v).css('height', 'auto');
                        }
                    });
                }
            }

            if (opts.sortable) {
                sortTable();
            }
        },
        toTh = function(slug) {
            return TWP.Util.toTitleCase(slug.replace(/-/g,' '));
        };

        init();
    };
})(this);