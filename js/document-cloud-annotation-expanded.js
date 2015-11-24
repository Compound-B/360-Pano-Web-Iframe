
(function($){
	var first = true;

	$(document).ready(function() {
		SimpleTable.init( { key: googleDocId, cached: true, worksheet: false, callback: drawElements  } );
        ich.grabTemplates();
	});

	function drawElements(data){
        var $elements = $('#elements');
        $.each(data, function(i,el){
	                var meta = {
	                    title: el.title,
	                    text: el.text,
	                    link: el.annotationlink
	                };
	                var t = ich.element(meta);
	                $elements.append(t);
	            });

        setupDoc();
    };


		function setupDoc() {
			console.log('setup doc fired')
				DV.load( docCloudDocument, {
				    width: 610,
				    height: 800,
				    sidebar: false,
				    container: "#DV-viewer"
				});

				// $('#DV-viewer').on('click', '.DV-annotation', function(){
				// 			console.log('clicked')
				// 		console.log( $(this).attr('id') )
				// 		}
				// 	);
						
				// $('.element a').bind('click', function(){						
				// 		var link = $(this).attr('href');
				// 		console.log(link)

				// 		var startNum = link.indexOf('#');
				// 		var endNum = link.indexOf('#') - 5;
				// 		var sliced = link.slice(0, endNum) + '.js';
				// 		var hashed = link.slice(startNum);
				// 		//changeDocs(sliced, hashed);		
				// 		window.location.hash = hashed;		
				// 	}
				// );
				
				flushArrows();
				
				$('.element').bind('click', function(){
					// var link = $(this).attr('href');
					// console.log(link)
					console.log('clicked')
					if (first){
						first = false;
					};
				
					$('.active').removeClass('active');
					$(this).addClass('active');
					flushArrows();
				});
			};
	
	function flushArrows(){
		$('.arrow').hide();
		$('.active').find('.arrow').show();
	};
	
})(jQuery);