
var options, 
    wp_user,
    playlist = [],
    currentVideo = 0,
    wp_vsp_alt_page_title,
    first_time_playing = true,
    omniPlayerObj = null,
    series_player = null;
    
$.fn.initSeriesPlayer = function (opts) {
    
        var root = $(this);
        var defaults = {
            series_title: "", //title of series, fills in h1
            series_subhed: "", //subhead of series
            video_tag: "", //tag to pull in video feed, pls only use one
            feed_search_terms: '', //terms for the article feed
            has_ratings: false, //does it have ratings? only use if you have used games api admin to create polls
            poll_id: '', //what's the id of the poll you made?
            sig: '', //what's the sig of the series?
            max_videos: 50, //the max videos, default = 50
	    	//ad_server: 'wpni.video.bc',
            single_ad: false, //only activate with special permission, default = false
            has_embargo: false
        };
        options = $.extend({}, defaults, opts);
        wp_vsp_alt_page_title = options.series_title;
        
        ///////////////////////////// GET DATA AND SET UP THE MAIN NAV ////////////////////////////
        
        function loadPlaylist() {
            
            
            var embargo_str =  (options.has_embargo) ? " displaydatetime:[* TO NOW]" : "";
            
            //LOAD THE JSON FOR THE PLAYLIST VIA SITE SEARCH
            var dataURL = 'https://www.washingtonpost.com/apps/national/proxy/methode/sitesearch/' + 
            	'?q=tag:"' + options.video_tag + 
            	'"&fq=contenttype:"Video"' + 
            	 embargo_str + //if embargoed, add tonow
            	'&start=0&' + 
            	'rows='+ options.max_videos +
            	'&fl=embedcode,headline,subheadline,credit,blurb,imageurl,displaydatetime,pubdatetime,contentbinaryurl,smallthumburl,systemid&' + 
            	'wt=json&' +
            	'omitHeader=true&' + 
            	'tracking=video-series-player-' + options.video_tag + 
            	'&json.wrf=jQuery.playlistLoaded';
            	        	
            $.ajax({
                url: dataURL,
                dataType: 'jsonp',
                jsonpCallback: 'jQuery.playlistLoaded',
                context: document.body,
                cache: true
            })
        }
      
        ///////////////////////////// CREATE STRUCTURE ////////////////////////////
        var addStr = '<div>' +
            '<div class="blocker"></div>' +
                '<p id="subhed" class="body"></p>' +		
                '<div class="preloader-holder"></div>' +
                '<div id="nav">' +
                    '<div id="v-back" class="back">PREVIOUS</div>' +
                    '<div id="v-counter"></div>' +
                    '<div id="v-next" class="next">NEXT</div>' +
                    '<div class="clear"></div>' +
                '</div>' +
                '<div id="video-player-holder">' +
                    '<div id="video-player">' +
                        '<div id="omni-player-wrapper">' +
                        	'<div id="ooyala-player-wrapper"> ' + 
                           		' <div id="ooyala-player"></div>' +
							'</div>' +
						'</div>' +
                        '<div class="video-slideshow-nav">' +
                            '<div class="left-nav back"></div>' +
                            '<div class="right-nav next"></div>' +
                        '</div>' +
                    '</div>' +
                       '<div id="video-details">' +
			'<div class="wrapper">' +
			   ' <div class="right">' +
				'<div id="toolbar_share" class="toolbar-grouping wp-pad-top">' +
					'<h5 class="left wp-pad-right social-title">social</h5>' +
					'<div id="commentButton" tooltip="comment" class="toolbarButton toolTipButton"></div>' +
					'<div id="sharebar"></div>' +
					'<script type="text/javascript" src="http://js.washingtonpost.com/wp-srv/graphics/templates/js/wp-video-share-bar.js"></script>' +
				'</div>' +
			    '</div>' +
			    '<div class="deets">' +
				'<h4></h4>' +
				'<p></p>' +
			    '</div>' +
			    '<div class="clear"></div>' +
			'</div>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                '</div>' +
            '</div>' 
            
            
        var playlist_html = '<div class="wp-column wp-pad-right">' +
                 '<div id="video-playlist"></div>' +
                '<div class="clear"></div>' +
                '<div class="more-bar"><p>More</p></div>' +
            '</div>'
                
        var hedlines_feed = ' <p class="heading heading4 wp-pad-left" style="color: #999; padding-bottom:10px;">More coverage</p>' + 
            '<div class="module s1 no-border wp-pad-left">' + 
                    '<div id="story-feed-main" class="big-story wp-pad-bottom"></div>' + 
                    '<div id="story-feed-main-2" class="big-story wp-pad-bottom"></div>' + 
                    '<div id="story-feed-main-3" class="big-story wp-pad-bottom""></div>' + 
                    '<ul class="normal" id="story-feed"></ul>' + 
            '</div>' 
      
        $('#video-series-player').append(addStr);
        $('#vp-left-col').append(playlist_html);
        $('#vp-right-col').append(hedlines_feed);
        
        wp_user = getUserName();
        loadPlaylist();
        setHeadlines();
        $('h1').html(options.series_title);
        $('#subhed').html(options.series_subhed);
        $('#vp-right-col').find('p').eq(0).html('More ' +  options.sig + ' news')
        if (options.has_ratings) { showRatings(); }
        
        $('.left-nav').mouseenter(function(e) {
              $.showBox(e,'back');
        }).mouseleave(function(e) {
              $.hideBox();
        })
        
        $('.right-nav').mouseenter(function(e) {
              $.showBox(e,'next');
        }).mouseleave(function(e) {
              $.hideBox();
        })
        
        $('.video-slideshow-nav-right, .video-slideshow-nav-left').mouseover(function(e) {  
              e.stopImmediatePropagation();
        }).mousemove(function(e) {  
              e.stopImmediatePropagation();
        })
        
        $('.back, .left-nav').click(function(e) {
            if (!adplaying) { 
                  lastV = (currentVideo == 0) ? playlist.length-1 : currentVideo-1;
                  debug('clicked back')
                  getAndPlayVideo(lastV)
              }
        })
        
        $('.next, .right-nav').click(function(e) {
            if (!adplaying) { 
                  nextV = (currentVideo == playlist.length-1) ? 0 : currentVideo+1;
                  debug('clicked next')
                  getAndPlayVideo(nextV)
              }
        })
        
          // left/right key press
          $(document).keydown(function(e) {
              if (e.which == 37) { // left key
                    lastV = (currentVideo == 0) ? playlist.length-1 : currentVideo-1;
                    getAndPlayVideo(lastV)
              } else if (e.which == 39) { // right key
                  $('#slideshow').cycle('next');
                    nextV = (currentVideo == playlist.length-1) ? 0 : currentVideo+1;
                    getAndPlayVideo(nextV)
              }
          });
        
        $('.more-bar').click(function(e) {
              $('#video-playlist').css('overflow','visible');
              $('#video-playlist').css('height','auto');
              $(this).hide();
        })
        
        $('#commentButton').click(function(e) {
              jQuery.scrollTo( jQuery('.comments') , 2000, {offset: {top:-10} });
        })
        
        $(document).mousemove(function(e) {
              //top position
              $('.video-slideshow-nav-right, .video-slideshow-nav-left').css('left', e.pageX - 15);
              $('.video-slideshow-nav-right, .video-slideshow-nav-left').css('top', e.pageY - 15);
        })

      
     	$.playlistLoaded = function(data) {
            $.each(data.response.docs, function(i,v) {
            if (v.embedcode) { 
				playlist.push(v);
			}
	    })
	    
	    
	    playlist.sort(function(a, b) { //sort 'em
		    return getEpoch(a.displaydatetime) - getEpoch(b.displaydatetime);
	    })
	    
	    playlist.reverse();
	    
        setupSectionHash();
        buildFilmstrip();
        
      }
          
      
      function getAndPlayVideo(vid) {
      
        var embedcode = playlist[vid].embedcode;
  	    getOOJSON(vid);
	    currentVideo = vid;
	    setDetails(currentVideo);
	    
      		
	}           
	
	function getOOJSON(vid) { 
		var json_url =  'http://www.washingtonpost.com/' + playlist[vid].systemid + '_jsn.json';
		$.ajax({
            url: json_url,
            dataType: 'json',
            success: function(json) { 
            	var embedcode = playlist[vid].embedcode;
            	playOOVideo(json, embedcode);
            }
        });
	}
	
	function playOOVideo(json, embedcode) { 
	
		
		if (!adplaying) { 
		
    		if (first_time_playing) { 
    		
        		  if (options.single_ad) { 
        		      //force ad on first video
        		      json.adConfig["playVideoAds"] = true;
        		      json.adConfig["forceAd"] = true;
        		  }
    		
    		    series_player = null;
        		series_player = new TWP.ooyala.v3.Player({
        			json: json,
        			playerContainerId: 'ooyala-player',
    				autoplay: 1,
                	adFreq: 0.5,
        			showEndscreen: 0,
        			playerType: "series-video-page-player",
                	wmode: 'transparent',
    				hasCompanionAd: 1 // optional.
    
        		});
        		
        		
        		  series_player.onCompanionAdsReady(function() {
                        if (series_player.hasCompanionAd) {
                            series_player.prepareCompanionAd({
                             'style': {
                              'width': '300px',
                              'height': '250px',
                              'display': 'inline-block',
                              'position': 'absolute',
                              'margin': '150px 0 200px 625px'
                                }
                            });
                        }
                        series_player.showCompanionAd();
                    });
                    
                    series_player.onAdStarted(function(p) {
                        adTracker()
                    })
                    
                    series_player.onAdCompleted(function(p) {
    	      		    adFinished() 
                        series_player.removeCompanionAd();
                    })
                    
    	            series_player.onPlayCompleted(function(p) { videoFinished() } )
              
                    series_player.create();
                   
            	    vploaded = true;
            	    $('#main-preloader').hide();
            	   
        		
                    first_time_playing = false;
                    
        		} else { 
        		  if (series_player != null) { 
        		  
        		          if (options.single_ad) { 
            		          //disable ads on remaining videos
                		      json.adConfig["playVideoAds"] = false;
                		      json.adConfig["forceAd"] = false;
        		          }
        		  
        		          series_player.update(json);
        		  }
        		}

          }

	}
	
	  
	  /* This will get called when the API is ready */
    
		var adplaying = false
	    function adTracker(e) { 
	      	toggleNavigation(false);
	  		adplaying = true;
	  		$('#ooyala-player-companion-ad div:last-child').remove();
	  		//this fixes a weird clear div issue
	  		$("#ooyala-player div:last-child").remove();
	  	}
	    
	    function adFinished(e) {
	      	
	      	//reactivate nav
	      	toggleNavigation(true);
	  		adplaying = false;
	 	  		
	    }
	    
	    function toggleNavigation(on) {
	       debug('toggling nav')
	        if (on) {
	          $('.video-slideshow-nav').show()
	          $('.video-slideshow-nav').show();
		    } else {
		      $('.video-slideshow-nav').hide();
		      $('.video-slideshow-nav').hide();
		    }
	    }
	    
	    function videoFinished(e) {
	       debug('get new video')
	          getAndPlayVideo((currentVideo<playlist.length-1) ? currentVideo+1 : 0);
	    }
      
      function buildFilmstrip() {
        var plist = "PLAYLIST: ";
            $.each(playlist,function(i,v) {
                  var listitem = '<div class="p-item">' +
                        '<img class="thumb" src="' + v.smallthumburl + '" alt="' + v.headline + '" />'; //.replace('145x100','90x60')
			if (v.headline) { listitem += '<p>' + v.headline + '</p>'} //if it doesn't have a headline, don't show it
                        listitem += '<div class="clear"></div>' +
                        '</div>'
                        $('#video-playlist').append(listitem);
                        plist = plist + ', ' + v.systemid;
            })
            //debug(plist)
            $('.p-item').eq(currentVideo).addClass('selected');
            $('.p-item').click(function(e) {
                if (!adplaying) { 
                      var vi = $(this).index('.p-item');
                      getAndPlayVideo(vi);
                      jQuery.scrollTo( jQuery('#video-player') , 2000, {offset: {top:-40} });
                  }
            })
            if (playlist.length < 16) { $('.more-bar').hide() }
            if (options.has_ratings) { addRatingsToPlaylist() } 
      }
      
      function setDetails(vid) {
      
		    if (playlist[vid].headline) { 
				$('#video-details').find('h4').html(playlist[vid].headline + ' ');
		    } else { 
				$('#video-details').find('h4').html('<span style="color: #000">' + options.series_title + '</span>');
		    }
	    
            $('#video-details .deets p').html(playlist[vid].blurb + " <span style='color: #999; font-size: 10px; text-transform: uppercase;'>&mdash; " + playlist[vid].credit + "</span>");
            $('#v-counter').html(vid+1 + ' of ' + playlist.length);
            $('.p-item').removeClass('selected');
            $('.p-item').eq(vid).addClass('selected');
            if (vid>=16) { $('.more-bar').click(); }
            
            updatePageURL(vid);
            
            if (options.has_ratings && quiz_results) {
                if (playlist[vid].results_inf) { 
                    $('.ratings').show();
                    var rating_txt =  getRatingsText(getVideoRating(vid,playlist[vid].results_inf));
                    setRateThisVideo(rating_txt);
                } else {
                    $('.ratings').hide();
                    $('p.avg-rating').html(' ');
                }
            }   
        }
      
        function updatePageURL(vid) {
              $.History.setHash('/' + playlist[vid].systemid + '/' + simplifyTitle(playlist[vid].headline));
              wp_vsp_alt_page_title = playlist[vid].headline;
        }
        
        function simplifyTitle(title) {
		    var pext = ''
		    try { 
	              pext = title.toLowerCase().replace(/ /g,'-')
	              pext = pext.replace('(','');
	              pext = pext.replace(')','');
	              pext = pext.replace(':','');
	              pext = pext.replace('.','');
	              pext = pext.replace('.','');
	              pext = pext.replace('.','');
	              pext = pext.replace(/&/g,'');
	              pext = pext.replace('"','');
	              pext = pext.replace("'",'');
	              pext = pext.replace("'",'');
	              pext = pext.replace("'",'');
		    } catch(e) {
				debug('please add a title');	
		    } 
              return pext;
        }
        
        ////////////RATINGS SECTION////////////
        
        function showRatings() {
          
            //all the data for the quiz including answer IDs
            var headURL = "http://quiz-washpost-1689366781.us-east-1.elb.amazonaws.com/quizzes/" + options.poll_id + ".json?json.wrf=jQuery.quizLoaded"
            $.ajax({
                type: "GET",
                url: headURL,
                dataType: 'jsonp',
                jsonpCallback: 'jQuery.quizLoaded'
            })
            
            //all the data for the results of the quiz
             var resultsURL = "http://quiz-washpost-1689366781.us-east-1.elb.amazonaws.com/quizzes/" + options.poll_id + "/results/?json.wrf=jQuery.quizResultsLoaded"
            $.ajax({
                type: "GET",
                url: resultsURL,
                dataType: 'jsonp',
                jsonpCallback: 'jQuery.quizResultsLoaded'
            })
              
            addRatingsBox();              
        }
        
        function addRatingsBox() {
            var ratingsbox = '<p class="avg-rating wp-pad-top">Loading ratings...</p>' +
                   '<div class="clear"></div>' + 
                   '<div class="ratings left">' + 
                   '<h5 id="ratethisprompt" class="left social-title">rate this video:</h5>' + 
                   '<div class="star"></div>' + 
                   '<div class="star"></div>' + 
                   '<div class="star"></div>' + 
                   '<div class="star"></div>' +
                   '</div>'
              $('#toolbar_share').prepend(ratingsbox).css('margin-top','5px').css('width','300px').css('margin-left','15px');
              $('.video-embed-wrap').addClass('right').css('margin-right','15px');
              var embedcode = $('.video-embed-wrap').detach();
              $('#toolbar_share').prepend(embedcode);
              $('#sharebar').find('.more').css('right','25px').css('margin-top','-35px');
              addRatingsActions();
        }
      
        var quiz_data;
        jQuery.quizLoaded = function(data) {
            debug('quiz data loaded: ' + options.has_ratings)
              var noq = '';
              quiz_data = data[0];
              $.each(playlist,function(i,v) {
                  //for each item in the playlist, find the quiz Q
                  var quizq = null;
                  $.each(quiz_data.questions,function(qi,qv) {
                      if (v.systemid == qv.video_snippet) {
                          quizq = v;
                          v.quiz_q = qv;
                      }
                  })
                  if (quizq == null) { noq += v.systemid + "," }
              })
              //debug('videos with no corresponding quiz question: ' + noq)
        }
        
        var quiz_results;
        jQuery.quizResultsLoaded = function(data) {
              quiz_results = data;
        }
      
       function addRatingsActions() {
            jQuery('.ratings').find('.star').mouseover(function(e) {
                if ($(this).hasClass('disabled')) { } else {
                    var container =  jQuery(this).parent();
                    var thisID =  container.find('.star').index(this);
                    for (i=0;i<=thisID;i++) { jQuery(container).find('.star').eq(i).addClass('on');}
                }
          }).mouseout(function() {
               if ($(this).hasClass('disabled')) { } else { jQuery('.ratings').find('.star').removeClass('on') } ;
          }).click(function(e) {
              var user_choice = jQuery('.ratings').find('.star').index(this);
              var qid = playlist[currentVideo].quiz_q.id;
              var aid = playlist[currentVideo].quiz_q.answers[user_choice].id;
              submitQuizAnswer(qid,aid); //submit their answer to db
              setCookie('wpniuser-' + options.sig.replace(' ','-') + '-' + playlist[currentVideo].systemid,user_choice,100); //remember their choice
              for (i=0;i<=user_choice;i++) { jQuery('.ratings').find('.star').eq(i).addClass('on') };
              jQuery('.ratings').find('.star').addClass('disabled');
          })
      }
      
      function submitQuizAnswer(qid,aid) {
            var qaURL = "http://quiz-washpost-1689366781.us-east-1.elb.amazonaws.com/questions/" + qid + "/results?uid=" + getUserName() + "&answer_id=" + aid;
            $.ajax({
                type: "GET",
                url: qaURL,
                dataType: 'jsonp',
                success: answerSubmitted
            })
      }
      
      function answerSubmitted(data) {
         debug('answer submitted')
         $('p.avg-rating').text('Thank you for rating this video.')
         $('#ratethisprompt').text('you rated this:')
      }
      
      function addRatingsToPlaylist() {
         if (quiz_results) {
            var noq = '';
            var currvideohasratings = false;
            $.each(playlist,function(i,v) {
                  //for each item in the playlist, find the quiz results
                  var quizq = null;
                  $.each(quiz_results,function(qi,qv) {
                      if (v.systemid == qv.explanation) {
                          quizq = v;
                          var rating = showStarRating(i,qv);
                          v.results_inf = qv;
                          if (i == currentVideo) {
                                setRateThisVideo(getRatingsText(rating));
                                currvideohasratings = true;
                          }
                      }
                 // debug (v.headline + ": " + quizq + ",id " + qv.explanation )
                  })
                  if (quizq == null) { noq += v.systemid + "," }
            })
            debug('Currvideohasratings: ' + currvideohasratings)
            if (currvideohasratings == false) {
                jQuery('.ratings').hide();
                $('p.avg-rating').text(' ');
                $('#ratethisprompt').text(' ')
            }
            //debug('videos with no corresponding quiz question: ' + noq)
            
         } else {
            //set timeout if data is not available yet
            setTimeout('addRatingsToPlaylist()',5000);
         }
      }
      
      function setRateThisVideo(rating_txt) {
            //debug('vp_getCookie: ' + vp_getCookie('wpniuser-' + options.sig.replace(' ','-') + '-' + playlist[currentVideo].systemid))
            var user_choice = vp_getCookie('wpniuser-' + options.sig.replace(' ','-') + '-' + playlist[currentVideo].systemid);
            debug('user choice: ' + user_choice)
            if (user_choice) { 
                answerSubmitted(null);
                for (i=0;i<=user_choice;i++) { jQuery('.ratings').find('.star').eq(i).addClass('on') };
                jQuery('.ratings').find('.star').addClass('disabled');
            } else {
                //they haven't voted yet
                //set up ratings for current video    
                jQuery('.ratings').find('.star').removeClass('disabled').removeClass('on');
                $('p.avg-rating').text(rating_txt);
                $('#ratethisprompt').text('rate this video:')
            }
      }
      
        function showStarRating(vidID,resultsData) {
            //find average
           var rating = getVideoRating(vidID,resultsData);
            
            if (rating) { 
                $('.p-item').eq(vidID).append('<img src="http://media.washingtonpost.com/wp-srv/graphics/templates/images/ratings_star_' + Math.round(rating) + '.png" alt="' + Math.round(rating) + ' stars" />');
                $('.p-item').css('height','175px').addClass('show-ratings');
                $('.p-item').find('p').css('margin-bottom','2px');
                if ($('.more-bar').is(':visible')) { $('#video-playlist').css('height', '710px') } 
            }
            
            return rating;
        }
        
        function getRatingsText(rating) {
              if (rating) { 
                return 'Average user rating: ' + rating.toFixed(1);
            } else { 
                return 'No one has voted yet'
            }
        }
        
        function getVideoRating(vidID,resultsData) {
             var total_votes = 0;
            var total_voters = 0;
            $.each(resultsData.answers, function(i,v) {
                //add it to total
                var votes = v.answer_value*v.responses;
                total_votes = total_votes + votes;
                total_voters = total_voters + v.responses;
            })
            
            if (total_votes > 0 && total_voters > 0) { 
                var rating = total_votes/total_voters;
                return rating;
            } else { 
                return null;
            }
            
        }
      
        /////////////////////  USER MANAGEMENT   ///////////////
        
        function vp_getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
        
        function setCookie(c_name,value,exdays) {
            var exdate=new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie=c_name + "=" + c_value;
        }
      
       function getUserName() {
            var username = vp_getCookie("wpniuser");
            if (username) {
               //registered, logged in user
           } else if (vp_getCookie('wpniuser-' + options.sig.replace(' ','-'))) {
               //you have a cookie from this page.. you've done it before!
               username = vp_getCookie('wpniuser-' + options.sig.replace(' ','-'));
               debug('has cookie')
           } else {
               //no? make a new user id and set the cookie
               var dte = new Date()
               username = 'd' + Date.UTC(dte.getFullYear(), dte.getMonth(),dte.getDay(),dte.getUTCHours(),dte.getUTCMinutes(),dte.getUTCSeconds(),dte.getUTCMilliseconds());
               setCookie('wpniuser-' + options.sig.replace(' ','-'),username,100);
               debug('created new cookie');
           }
           debug('USERNAME: ' + username)
           return username;
       }
      
      //////////////// RECENT NEWS /////////////////
      function setHeadlines() {
            $('#moreheads').text('More news')
          var searchterms = options.feed_search_terms;
            var headURL = "https://www.washingtonpost.com/apps/national/proxy/methode/sitesearch/?q=%22" + searchterms + "%22&start=0&rows=10&fq=contenttype:%28%22Article%22%20OR%20%22Blog%22%29&fl=contenturl,contenttype,source,sourcenav,primarysection,section,headline,subheadline,byline,blurb,pubdatetime&wt=json&omitHeader=false&json.wrf=jQuery.processHeadlines"
            $.ajax({
                type: "GET",
                url: headURL,
                dataType: 'jsonp',
                jsonpCallback: 'jQuery.processHeadlines'
            })
      }
      
      jQuery.processHeadlines = function(data) {
            if (data && data.response.numFound == 0) {
                  setHeadlines(theState,true);
            } else if (data) {
                  $('#story-feed').html('');
                  
                  if (data.response.numFound == 1) {
                     $('#moreheads').hide();
                  } else {
                     $('#moreheads').show();
                  }
                  
                  if (data.response.numFound < 2) {
                     $('#story-feed-main-2').hide();
                  } else {
                     $('#story-feed-main-2').show();
                  }
                  
                   if (data.response.numFound < 3) {
                     $('#story-feed-main-3').hide();
                  } else {
                     $('#story-feed-main-3').show();
                  }
                  
                  $.each(data.response.docs, function(idx,val) {
		    if (val.contenttype == 'Article' || val.contenttype == 'Blog')
                       if (idx<3){
                           if (val.headline == undefined || val.headline  == 'undefined') {
                              $('.big-story').eq(idx).html('<h2><a href="' + val.contenturl + '">' + val.subheadline + '</a></h2>')
                           } else if (val.subheadline == undefined || val.subheadline  == 'undefined') {
                              $('.big-story').eq(idx).html('<h2><a href="' + val.contenturl + '">' + val.headline + '</a></h2>')
                           } else {
                              $('.big-story').eq(idx).html('<h2><a href="' + val.contenturl + '">' + val.subheadline +': ' + val.headline + '</a></h2>')
                             }
                           $('.big-story').eq(idx).append('<p class="byline">' + val.byline + '</p>');
                          if (val.blurb != undefined && val.blurb != 'undefined') {  $('.big-story').eq(idx).append('<p>' + val.blurb + '</p>') } 
                           
                       }  else if (val.headline != undefined) {
                          if (val.contenttype.toLowerCase() == 'article' || val.contenttype.toLowerCase() == 'blog' || val.contenttype == undefined || val.contenttype  == 'undefined') {
                             $('#story-feed').append('<li><a href="' + val.contenturl + '">' + val.headline + '</a></li>')
                          } else {
                             $('#story-feed').append('<li><a href="' + val.contenturl + '">' + val.contenttype +': ' + val.headline + '</a></li>')
                          }
                       }
                  })
            } 
      }
      
      //rollover handler
      $.showBox = function(e, dir) {
            var item;
            if (dir == 'back') {
                  item = $('.video-slideshow-nav-left');
                  //$('.video-slideshow-nav-right').hide();
            } else {
                  item = $('.video-slideshow-nav-right')
                  //$('.video-slideshow-nav-left').hide();
            }
          item.show();
      }
      
      $.hideBox = function() {
          $('.video-slideshow-nav-left').hide();
          $('.video-slideshow-nav-right').hide();
      }
      
        
      function getEpoch(datestr) {
			//2012-03-23T18:07:54Z
			var segments = datestr.split('-');
			var year = segments[0];
			var month = segments[1];
			var segments2 = segments[2].split('T')
			var day = segments2[0];
			var segments3 = segments2[1].split(':')
			var hours = segments3[0];
			var minutes = segments3[1];
			var segment4 = segments3[2].split('Z');
			var seconds = segment4[0];
			var date = new Date(year,month,day,hours,minutes,seconds);
			return date;
      }
      
      function setupSectionHash() {
	        var hash = $.History.getHash();
	        if(hash.length > 0 ) {
	            currentVideo = findCurrentVideo(hash);
	            getAndPlayVideo(currentVideo);
	        } else {
	            getAndPlayVideo(currentVideo);
	        }
      }
                      
      
      function findCurrentVideo(hash) {
            var vid = currentVideo;
            var hashIDarr = hash.split('/')
            var hashID = hashIDarr[1];
            $.each(playlist,function(i,v) {
                  if (v.systemid == hashID) {
                        vid = i;
                        return vid;
                  }
            })
            return vid;
      }

      
      ///////////////////////// MANAGE PARAMETERS /////////////////
      
      function getURLParam(strParamName){
            var strReturn = "";
            var strHref = window.location.href;
            if ( strHref.indexOf("?") > -1 ){
              var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
              var aQueryString = strQueryString.split("&");
              for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
                if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
                  var aParam = aQueryString[iParam].split("=");
                  strReturn = aParam[1];
                  break;
                }
              }
            }
            return unescape(strReturn);
      }
              
      function debug(msg) {
        	//window.console && console.log && console.log(msg);
      }
            
}