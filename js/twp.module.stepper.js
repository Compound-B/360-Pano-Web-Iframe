TWP.Module=TWP.Module||{};(function(a){TWP.Module.Stepper=function(f){var c=f;var d=a(c.container);var b={fx:"fade",speed:250,timeout:0,nowrap:false,next:"#next-panel",pager:"#pager-wrap",pagerAnchorBuilder:function(g,h){var j=c.labels?c.labels[g]:(g+1);return'<li><a href="#">'+j+"</a></li>"},before:function(i,h){var g=a(b.next).children(".text");if(a(h).index()===d.children().length-1){g.html("Start over")}else{g.html("Next")}}};var e=function(){if(c.cycle_opts){a.each(c.cycle_opts,function(h,g){b[h]=g})}d.addClass("stepper").cycle(b)};e()}})(jQuery);