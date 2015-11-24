(function($, window, undefined){
		
	var title = encodeURIComponent(document.title);
	var url =  window.location.href;
	var en_url = encodeURIComponent(url);
	
	var new_share = '';
		new_share+= '<div>'
		new_share+= '	<ul>'
		new_share+= '		<li><a id="facebookHref" href="http://www.facebook.com/sharer.php?u='+en_url+'"><div id="facebookButton" tooltip="facebook" class="toolbarButton toolTipButton"></div></a></li>'
		new_share+= '		<li><a id="twitterHref" href="http://twitter.com/intent/tweet?text='+ title +'&amp;url=' + url + '&amp;via=washingtonpost"><div id="twitterButton" tooltip="twitter" class="toolbarButton toolTipButton"></div></a></li>'
		new_share+= '		<li><a class="morebutton" href="#"><div id="moreShareButton" class="toolbarButton "></div></a>'
		new_share+= '			<div class="more">'
		new_share+= '				<div class="morebottom">'
		new_share+= '					<div class="left" style="border-color:#393939; ">'
		new_share+= '						<ul >'
		new_share+= '							<li><a id="facebookHref2" href="http://www.facebook.com/sharer.php?u='+ en_url +'"><div class="shareitems facebook"></div> Facebook</a></li>'
		new_share+= '							<li><a id="twitterHref2" href="http://twitter.com/intent/tweet?text='+ title +'&amp;url='+ url +'&amp;via=washingtonpost"><div class="shareitems twitter"></div> Twitter</a></li>'
		new_share+= '							<li><a id="linkedinHref" href="http://www.linkedin.com/cws/share?url='+ url +'"><div class="shareitems linkedin"></div> LinkedIn</a></li>'
		new_share+= '							<li><a id="redditHref" href="http://reddit.com/submit?url='+ url +'"><div class="shareitems reddit"></div> Reddit</a></li>'
		new_share+= '						</ul>'
		new_share+= '					</div>'
		new_share+= '					<div class="right">'
		new_share+= '						<ul>'
		new_share+= '							<li><a id="stumbleuponHref" href="http://www.stumbleupon.com/submit?url='+ url +'&amp;title='+ title +'"><div class="shareitems stumbleupon"></div> StumbleUpon</a></li>'
		new_share+= '							<li><a id="diggHref" href="http://digg.com/submit?phase=2&amp;url='+ url +'&amp;title='+ title +'"><div class="shareitems digg"></div> Digg</a></li>'
		new_share+= '							<li><a id="deliciousHref" href="http://www.delicious.com/save?v=5&amp;noui&amp;jump=close&amp;url='+ url +'&amp;title='+ title +'"><div class="shareitems delicious"></div> Delicious</a></li>'
		new_share+= '						</ul>'
		new_share+= '					</div>'
		new_share+= '					<div style="clear:both;"></div>'
		new_share+= '				</div>'
		new_share+= '			</div>'
		new_share+= '		</li>'
		new_share+= '	</ul>'
		new_share+= '</div>';
		
	try { 
		$(window).hashchange( function(){
			// Alerts every time the hash changes!
			url = window.location.href;
			url = url.replace('&','-and-')
			en_url = encodeURIComponent(url);
			
			var bitlystring = "http://api.bitly.com/v3/shorten?login=kdwpost&apiKey=R_712ef17143e281cff8d725317bea4036&longUrl=" + en_url + "&format=json";
			jQuery.ajax({
			     url:  bitlystring,
			     async: false,
			     dataType: 'jsonp',
			     data: "",
			     type: "GET",
			     success: function (json) {
				if (json.status_txt == "OK") {
					updateShareLinks(json.data.url);
				} else {
					updateShareLinks(url)
				} 
			     }
			});
			
			updateShareLinks(url)
			
			
		});
	} catch (e) {
		//hashchange not ready		
	}
	
	function updateShareLinks(url) {
		en_url = encodeURIComponent(url);
		en_url = en_url.replace('#'),('%23')
		var facebookURL		= "http://www.facebook.com/sharer.php?u="+en_url + '&t=' + wp_vsp_alt_page_title;
		var twitterURL 		= "http://twitter.com/intent/tweet?text="+ wp_vsp_alt_page_title +": "+ url.replace('#','%23') + "&amp;via=washingtonpost";
		var linkedinURL 	= "http://www.linkedin.com/cws/share?url=" + url;
		var redditURL 		= "http://reddit.com/submit?url="+ url ;
		var stumbleuponURL	= "http://www.stumbleupon.com/submit?url="+ url +"&amp;title="+ wp_vsp_alt_page_title;
		var diggURL		= "http://digg.com/submit?phase=2&amp;url="+ url +"&amp;title="+ wp_vsp_alt_page_title;
		var deliciousURL	= "http://www.delicious.com/save?v=5&amp;noui&amp;jump=close&amp;url="+ url +"&amp;title="+ wp_vsp_alt_page_title;
		
		$('#facebookHref').attr("href", facebookURL);
		$('#twitterHref').attr("href", twitterURL);
		$('#facebookHref2').attr("href", facebookURL)
		$('#twitterHref2').attr("href", twitterURL);
		$('#linkedinHref').attr("href", linkedinURL);
		$('#redditHref').attr("href", redditURL);
		$('#stumbleuponHref').attr("href", stumbleuponURL);
		$('#diggHref').attr("href", diggURL);
		$('#deliciousHref').attr("href", deliciousURL);
	}
	
	$('#sharebar').html(new_share)
	.find('.morebutton,.more').mouseover(function () {
		//show its submenu
		$('#sharebar').find('.more').show();
	}).mouseout(function () {
		//hide its submenu
		$('#sharebar').find('.more').hide();
	});
	$('#sharebar').find('a').attr('target','_blank');
		 
})(jQuery, this);


(function() {
var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
po.src = 'https://apis.google.com/js/plusone.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();
